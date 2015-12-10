package codebase.util;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;
import java.security.interfaces.RSAPrivateKey;
import java.security.spec.KeySpec;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;

import javax.crypto.Cipher;
import javax.naming.ldap.LdapName;
import javax.naming.ldap.Rdn;
import javax.xml.bind.DatatypeConverter;

import org.apache.commons.codec.binary.Base64;

public class CertificateManager {

	public static X509Certificate getCertificate(File file) {
		X509Certificate cert = null;
		try {
			CertificateFactory cf = CertificateFactory.getInstance("X.509");   
			FileInputStream finStream = new FileInputStream(file); 
			cert = (X509Certificate)cf.generateCertificate(finStream);

			System.out.println("cert found: " + DatatypeConverter.printBase64Binary(cert.getEncoded()));

		} catch(Exception e) {
			e.printStackTrace();
		}

		return cert;
	}

	public static boolean validateCert(X509Certificate clientCert, String uid) {
		boolean valid = false;
		try {   //Not your CA's. Check if it has been signed by CA
			PublicKey rootCAPublicKey = getPublicKey("resources/keys/MyRoot_pub.pem");
			clientCert.verify(rootCAPublicKey);
			System.out.println("verified");
			valid = true;
		} catch(Exception e) {
			System.out.println("Certificate not trusted");
			return false;
		}

		try {
			clientCert.checkValidity();
			System.out.println("valid");
			valid = true;
		} catch(Exception e) {
			System.out.println("Certificate not trusted. It has expired");
			return false;
		}
		try {
			String dn = clientCert.getSubjectX500Principal().getName();
			LdapName ldapDN = new LdapName(dn);
			String cn = null;
			for(Rdn rdn: ldapDN.getRdns()) {
				if("CN".equals(rdn.getType())) {
					cn = (String) rdn.getValue();
				}
			}
			if(cn == null) {
				System.out.println("Certificate not trusted. CN could n't find!");
				return false;
			} else if (cn.equals(uid)) {
				valid = true;
			} else {
				System.out.println("Certificate not trusted. CN didn't match!");
				return false;
			}
		} catch(Exception e) {
			System.out.println("Certificate not trusted. It has expired");
			return false;
		}

		System.out.println("valid: " + valid);

		return valid;
	}

	public static PublicKey getPublicKey(String path) {
		PublicKey publicKey = null;
		try {
			InputStream is = new FileInputStream(path);
			ByteArrayOutputStream buffer = new ByteArrayOutputStream();
			KeyFactory keyFactory = KeyFactory.getInstance("RSA");
			int nRead;
			byte [] pubKeyBytes = new byte[is.available()];
			while ((nRead = is.read(pubKeyBytes, 0, pubKeyBytes.length)) != -1) {
				buffer.write(pubKeyBytes, 0, nRead);
			}
			buffer.flush();
			is.close();
			String pubKey = new String(pubKeyBytes, "UTF-8");
			pubKey = pubKey.replaceAll("(-+BEGIN PUBLIC KEY-+\\r?\\n|-+END PUBLIC KEY-+\\r?\\n?)", "");
			X509EncodedKeySpec spec = new X509EncodedKeySpec(Base64.decodeBase64(pubKey));
			publicKey = keyFactory.generatePublic(spec);

		} catch(Exception e) {
			e.printStackTrace();
		}

		return publicKey;
	}

	public static RSAPrivateKey getPrivateKey(File file) {
		RSAPrivateKey privateKey = null;
		try {
			InputStream is = new FileInputStream(file);

			ByteArrayOutputStream buffer = new ByteArrayOutputStream();

			int nRead;
			byte[] privKeyBytes = new byte[is.available()];

			while ((nRead = is.read(privKeyBytes, 0, privKeyBytes.length)) != -1) {
				buffer.write(privKeyBytes, 0, nRead);
			}

			buffer.flush();
			is.close();

			KeyFactory keyFactory = KeyFactory.getInstance("RSA");
			KeySpec ks = new PKCS8EncodedKeySpec(privKeyBytes);
			privateKey = (RSAPrivateKey) keyFactory.generatePrivate(ks);

		} catch(Exception e) {
			e.printStackTrace();
		}

		return privateKey;
	}

	public static String getPublicKeyString(String path) {
		String pubKey = null;
		try {
			InputStream is = new FileInputStream(path);
			ByteArrayOutputStream buffer = new ByteArrayOutputStream();
			int nRead;
			byte [] pubKeyBytes = new byte[is.available()];
			while ((nRead = is.read(pubKeyBytes, 0, pubKeyBytes.length)) != -1) {
				buffer.write(pubKeyBytes, 0, nRead);
			}
			buffer.flush();
			is.close();
			pubKey = new String(pubKeyBytes, "UTF-8");
			pubKey = pubKey.replaceAll("(-+BEGIN PUBLIC KEY-+\\r?\\n|-+END PUBLIC KEY-+\\r?\\n?)", "");

		} catch(Exception e) {
			e.printStackTrace();
		}

		return pubKey;
	}

	public static byte[] encrypt(PublicKey publicKey, byte[] origin) {
		byte[] encrypted = null;
		try {
			Cipher cipher = Cipher.getInstance("RSA/ECB/NoPadding");
			cipher.init(Cipher.ENCRYPT_MODE, publicKey);
			encrypted = cipher.doFinal(origin);
			System.out.println("e: " + encrypted.length);
			
			if(encrypted != null && encrypted.length > 0) {
				encrypted = Base64.encodeBase64(encrypted);
			}
			
//			RSAPrivateKey pk = getPrivateKey(new File("resources/keys/server_prv.pk8"));
//			
//			byte []decrypted = decrypt(pk, encrypted);
//
//			System.out.println("d: " + decrypted.length);
//
//			System.out.println("decrypted: " + new String(decrypted));
			
		} catch(Exception e) {
			e.printStackTrace();
		}

		return encrypted;
	}
	
	public static byte[] encrypt(X509Certificate cert, byte[] origin) {
		byte[] encrypted = null;
		try {
			byte[] encoded = cert.getPublicKey().getEncoded();
			X509EncodedKeySpec spec = new X509EncodedKeySpec(encoded);
			KeyFactory keyFactory = KeyFactory.getInstance("RSA");
			PublicKey publicKey = keyFactory.generatePublic(spec);
			
			Cipher cipher = Cipher.getInstance("RSA/ECB/NoPadding");
			cipher.init(Cipher.ENCRYPT_MODE, publicKey);
			encrypted = cipher.doFinal(origin);
			System.out.println("encrypted msg: " + new String(encrypted));

			if(encrypted != null && encrypted.length > 0) {
				encrypted = Base64.encodeBase64(encrypted);
			}
			
		} catch(Exception e) {
			e.printStackTrace();
		}

		return encrypted;
	}
	
	public static byte[] decrypt(PrivateKey privateKey, byte[] encrypted) {
		byte[] decrypted = null;
		try {
			Cipher cipher = Cipher.getInstance("RSA/ECB/NoPadding");
			cipher.init(Cipher.DECRYPT_MODE, privateKey);
			decrypted = cipher.doFinal(Base64.decodeBase64(encrypted));
		} catch(Exception e) {
			e.printStackTrace();
		}

		return decrypted;
	}
}
