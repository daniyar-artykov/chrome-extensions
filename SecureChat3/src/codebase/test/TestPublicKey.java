package codebase.test;

import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.InputStream;
import java.security.KeyFactory;
import java.security.PublicKey;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;
import java.security.interfaces.RSAPrivateKey;
import java.security.spec.KeySpec;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;

import javax.crypto.Cipher;

import org.apache.commons.codec.binary.Base64;

public class TestPublicKey {

	public static void main(String args[]) {
		try {
			CertificateFactory cf = CertificateFactory.getInstance("X.509");
			FileInputStream finStream = new FileInputStream("resources/keys/bob.crt"); 
			X509Certificate clientCert = (X509Certificate)cf.generateCertificate(finStream);
			
			byte[] encoded = clientCert.getPublicKey().getEncoded();
			System.out.println(new String(Base64.encodeBase64(encoded)));
			X509EncodedKeySpec spec = new X509EncodedKeySpec(encoded);
			KeyFactory keyFactory = KeyFactory.getInstance("RSA");
			PublicKey publicKey = keyFactory.generatePublic(spec);
			
			System.out.println("asdasd 1 " + publicKey);

			String test = "test";

			Cipher cipher = Cipher.getInstance("RSA/ECB/NoPadding");
			cipher.init(Cipher.ENCRYPT_MODE, publicKey);

			byte[] cipherData = cipher.doFinal(test.getBytes("UTF8"));

			System.out.println(new String(cipherData));

//			FileInputStream finStream = new FileInputStream("resources/keys/bob.crt"); 
//			X509Certificate clientCert = (X509Certificate)cf.generateCertificate(finStream);
//			cipher.init(Cipher.DECRYPT_MODE, clientCert);
			
			RSAPrivateKey privateKey = getPrivateKey("resources/keys/bob_prv.pk8");
			cipher.init(Cipher.DECRYPT_MODE, privateKey);
			byte[] decryptedData = cipher.doFinal(cipherData);
			System.out.println("dec: " + new String(decryptedData).trim());

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
