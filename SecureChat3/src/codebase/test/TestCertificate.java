package codebase.test;

import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.InputStream;
import java.security.KeyFactory;
import java.security.PublicKey;
import java.security.cert.CertificateException;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;
import java.security.interfaces.RSAPrivateKey;
import java.security.spec.KeySpec;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;

import javax.naming.ldap.LdapName;
import javax.naming.ldap.Rdn;
import javax.xml.bind.DatatypeConverter;

import org.apache.commons.codec.binary.Base64;

public class TestCertificate {
	
	public static void main(String args[]) {
		
	}
	

	public static void main2(String args[]) {
		try {
			CertificateFactory cf = CertificateFactory.getInstance("X.509");   
			PublicKey publicKey = getPublicKey("resources/keys/MyRoot_pub.pem");
			FileInputStream finStream = new FileInputStream("resources/keys/alice.crt"); 
			X509Certificate clientCert = (X509Certificate)cf.generateCertificate(finStream);

			System.out.println(DatatypeConverter.printBase64Binary(clientCert.getEncoded()));

			try {   //Not your CA's. Check if it has been signed by your CA
				clientCert.verify(publicKey);
				System.out.println("verified");
			} catch(Exception e) {   
				throw new CertificateException("Certificate not trusted",e);
			}

			try {
				clientCert.checkValidity();
				System.out.println("valid");
			} catch(Exception e) {
				throw new CertificateException("Certificate not trusted. It has expired",e);
			}  

			try {
				String dn = clientCert.getSubjectX500Principal().getName();
				String uid = "Alice";
				LdapName ldapDN = new LdapName(dn);
				String cn = null;
				for(Rdn rdn: ldapDN.getRdns()) {
					if("CN".equals(rdn.getType())) {
						cn = (String) rdn.getValue();
					}
				}
				if(cn == null) {
					System.out.println("Certificate not trusted. CN could n't find!");
				} else if (cn.equals(uid)) {
					System.out.println("TURSTED!!!");
				} else {
					System.out.println("Certificate not trusted. CN didn't match!");
				}
			} catch(Exception e) {
				System.out.println("Certificate not trusted. It has expired");
			}
		} catch(Exception e) {
			e.printStackTrace();
		}
	}

	private static void checkPrivateKey() {
		try {
			PublicKey publicKey = getPublicKey("resources/keys/MyRoot.pem");
			RSAPrivateKey privateKey = getPrivateKey("resources/keys/alice_prv.pk8");


		} catch(Exception e) {
			e.printStackTrace();
		}
	}

	private static void checkCert() {
		try {
			CertificateFactory cf = CertificateFactory.getInstance("X.509");   
			FileInputStream finStream = new FileInputStream("resources/keys/MyRoot.crt"); 
			X509Certificate rootCert = (X509Certificate)cf.generateCertificate(finStream);

			System.out.println(DatatypeConverter.printBase64Binary(rootCert.getEncoded()));

			finStream = new FileInputStream("resources/keys/alice.crt"); 
			X509Certificate clientCert = (X509Certificate)cf.generateCertificate(finStream);

			System.out.println(DatatypeConverter.printBase64Binary(clientCert.getEncoded()));

			try {   //Not your CA's. Check if it has been signed by your CA
				clientCert.verify(rootCert.getPublicKey());
				System.out.println("verified");
			} catch(Exception e) {   
				throw new CertificateException("Certificate not trusted",e);
			}

			try {
				clientCert.checkValidity();
				System.out.println("valid");
			} catch(Exception e) {
				throw new CertificateException("Certificate not trusted. It has expired",e);
			}  
		} catch(Exception e) {
			e.printStackTrace();
		}
	}

	private static PublicKey getPublicKey(String path) {
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

	private static RSAPrivateKey getPrivateKey(String path) {
		RSAPrivateKey privateKey = null;
		try {
			InputStream is = new FileInputStream(path);

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
}
