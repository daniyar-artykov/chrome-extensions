package codebase.util;

import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import javax.crypto.Cipher;
import javax.crypto.CipherInputStream;
import javax.crypto.CipherOutputStream;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESKeySpec;

public class CipherUtilOld {

	public static void main(String args[]) {
		try {
			InputStream ins = new FileInputStream("history/63fc47c4fb654d9fac3bb0894ca8362277bf929f/chatlog-Bob.json");
			FileOutputStream fos = new FileOutputStream("history/63fc47c4fb654d9fac3bb0894ca8362277bf929f/chatlog-Bob.json.decrypted");
//			System.out.println(new String(encryptOrDecrypt("99bc5203694c4618707d8c397a20c3ac7b6cf2d2", Cipher.DECRYPT_MODE, ins)));
			decrypt("99bc5203694c4618707d8c397a20c3ac7b6cf2d2", ins, fos);
			
		} catch(Throwable e) {
			e.printStackTrace();
		}
	}

	public static byte[] encryptOrDecrypt(String key, int mode, InputStream is) throws Throwable {

		DESKeySpec dks = new DESKeySpec(key.getBytes("UTF-8"));
		SecretKeyFactory skf = SecretKeyFactory.getInstance("DES");
		SecretKey desKey = skf.generateSecret(dks);
		Cipher cipher = Cipher.getInstance("DES"); // DES/ECB/PKCS5Padding for SunJCE

		if(Cipher.DECRYPT_MODE == mode) {
			cipher.init(Cipher.DECRYPT_MODE, desKey);
		} else if(Cipher.ENCRYPT_MODE == mode) {
			cipher.init(Cipher.ENCRYPT_MODE, desKey);
		}

		byte[] outputBytes = cipher.doFinal(getBytes(is));

		System.out.println("outputBytes: " + new String(outputBytes));

		return outputBytes;
	}

	public static byte[] encryptOrDecrypt(String key, int mode, byte[] inputBytes) throws Throwable {

		DESKeySpec dks = new DESKeySpec(key.getBytes());
		SecretKeyFactory skf = SecretKeyFactory.getInstance("DES");
		SecretKey desKey = skf.generateSecret(dks);
		Cipher cipher = Cipher.getInstance("DES"); // DES/ECB/PKCS5Padding for SunJCE

		if(Cipher.DECRYPT_MODE == mode) {
			cipher.init(Cipher.DECRYPT_MODE, desKey);
		} else if(Cipher.ENCRYPT_MODE == mode) {
			cipher.init(Cipher.ENCRYPT_MODE, desKey);
		}

		byte[] outputBytes = cipher.doFinal(inputBytes);

		System.out.println("outputBytes: " + new String(outputBytes));

		return outputBytes;
	}

	public static byte[] getBytes(InputStream is) {
		try {
			ByteArrayOutputStream buffer = new ByteArrayOutputStream();
			int nRead;
			byte[] data = new byte[16384];
			while ((nRead = is.read(data, 0, data.length)) != -1) {
				buffer.write(data, 0, nRead);
			}

			buffer.flush();
			System.out.println("byte: " + new String(buffer.toByteArray()));
			return buffer.toByteArray();
		} catch(Exception e) {
			e.printStackTrace();
		}

		return null;
	}

	public static void encrypt(String key, InputStream is, OutputStream os) throws Throwable {
		encryptOrDecrypt(key, Cipher.ENCRYPT_MODE, is, os);
	}

	public static void decrypt(String key, InputStream is, OutputStream os) throws Throwable {
		encryptOrDecrypt(key, Cipher.DECRYPT_MODE, is, os);
	}
	
	public static void encryptOrDecrypt(String key, int mode, InputStream is, OutputStream os) throws Throwable {

		DESKeySpec dks = new DESKeySpec(key.getBytes());
		SecretKeyFactory skf = SecretKeyFactory.getInstance("DES");
		SecretKey desKey = skf.generateSecret(dks);
		Cipher cipher = Cipher.getInstance("DES"); // DES/ECB/PKCS5Padding for SunJCE

		if (mode == Cipher.ENCRYPT_MODE) {
			cipher.init(Cipher.ENCRYPT_MODE, desKey);
			CipherInputStream cis = new CipherInputStream(is, cipher);
			doCopy(cis, os);
		} else if (mode == Cipher.DECRYPT_MODE) {
			cipher.init(Cipher.DECRYPT_MODE, desKey);
			CipherOutputStream cos = new CipherOutputStream(os, cipher);
			doCopy(is, cos);
		}
	}

	public static void doCopy(InputStream is, OutputStream os) throws IOException {
		byte[] bytes = new byte[64];
		int numBytes;
		while ((numBytes = is.read(bytes)) != -1) {
			os.write(bytes, 0, numBytes);
		}
		
		os.flush();
		os.close();
		is.close();
	}
}
