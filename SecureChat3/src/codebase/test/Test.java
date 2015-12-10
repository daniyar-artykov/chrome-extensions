package codebase.test;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.UnknownHostException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.PublicKey;
import java.security.interfaces.RSAPrivateKey;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;

import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonReader;

import codebase.util.CertificateManager;

public class Test {

	public static void main(String args[]) {
		try {
			String message = "test";
			PublicKey serverPublicKey = CertificateManager.getPublicKey("resources/keys/server_pub.pem");
			byte[] encrypted = CertificateManager.encrypt(serverPublicKey, message.getBytes());
			System.out.println(encrypted.length);
			RSAPrivateKey privateKey = CertificateManager.getPrivateKey(new File("resources/keys/server_prv.pk8"));
			byte[] decrypted = CertificateManager.decrypt(privateKey, encrypted);
			System.out.println("\n \n \n \n \n d: " + decrypted.length);
			System.out.println("\n \n \n \n \n \n" + new String(decrypted));
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	
	private static String historyPath = null;

	public static void main3(String args[]) {
		try {
			InputStream ins = new FileInputStream("history/b2311a3d1fd97864e418292c09eb8435b7bac224/chatlog-Alice.json");
			JsonReader jsonReader = Json.createReader(ins);
//			for(JsonValue value : jsonReader.readArray()) {
//				JsonObject obj = (JsonObject) value;
//				System.out.println(obj.get("message"));
//			}
//			System.out.println(jsonReader.readArray());
			JsonArray chatlog = jsonReader.readArray();
			
			JsonArrayBuilder builder = Json.createArrayBuilder();
			for (int i = 0; i < chatlog.size(); i++) {
				builder.add(Json.createObjectBuilder().add("from", chatlog.getJsonObject(i).get("from"))
						.add("to", chatlog.getJsonObject(i).get("to"))
						.add("time", "").add("message", chatlog.getJsonObject(i).get("message")));
				System.out.println(chatlog.getJsonObject(i).get("message").toString().replace("\"", ""));
			}
			JsonArray newl = builder.build();
			chatlog = newl;				
			
			System.out.println(chatlog);
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		//		String salt = BCrypt.gensalt();
		//		System.out.println(salt);
		//		System.out.println("Alice/" + BCrypt.hashpw("mypassA2", "$2a$10$HBY7FWzV3/gVeWBNfRzgFu"));
		//		//$2a$10$HBY7FWzV3/gVeWBNfRzgFu
		//		//$2a$10$HBY7FWzV3/gVeWBNfRzgFuYpGWQaUZJAAtheeEBYnu6rDgJLypGoC
		//		System.out.println("Bob/" + BCrypt.hashpw("Bobspass1", salt));
		//$2a$10$INyPOenxLvTGJEMbmn1rs.
		//$2a$10$INyPOenxLvTGJEMbmn1rs.g0FdoTJQBE4/n1UKYTfHcerycs3jzHG

		//		System.out.println(System.getProperty("java.io.tmpdir"));
		//		String test = "asdasd/";
		//		test += "2";
		//		System.out.println(test);
		//		
		//		try {
		//			Enumeration<NetworkInterface> nis = NetworkInterface.getNetworkInterfaces();
		//			while (nis.hasMoreElements()) {
		//				NetworkInterface ni = nis.nextElement();
		//				System.out.println(ni.getName() + " " + ni.getDisplayName());
		//				String chatLogPath = "history/"; // + ni.getName();
		//				InputStream ins = null;
		//				File f = new File(chatLogPath);
		//				if (f.exists() && !f.isDirectory()) {
		//					try {
		//						ins = new FileInputStream(chatLogPath);
		//					} catch (FileNotFoundException e) {
		//						e.printStackTrace();
		//					}
		//				} else {
		//					try {
		//						f.mkdir();
		////						f.createNewFile();
		////						ins = new FileInputStream(chatLogPath);
		//					} catch (Exception e) {
		//						e.printStackTrace();
		//					}
		//				}
		//				System.out.println(ins);
		//			}
		//		} catch(Exception e) {
		//			e.printStackTrace();
		//		}
		getChatLogPath();
	}


	private static String getChatLogPath() {
		if(historyPath != null) {
			return historyPath;
		}
		List<String> subdirectories = new ArrayList<String>();
		historyPath = "history/";
		File file = new File(historyPath);

		if(!file.exists()) {
			boolean mkdir = file.mkdir();
			System.out.println("mkdir create 0 " + mkdir);
		} 

		String[] names = file.list();

		for(String name : names) {
			if (new File(historyPath + name).isDirectory()) {
				subdirectories.add(name);
			}
		}

		System.out.println(subdirectories);

		try {
			boolean found = false;
			String lastNi = null;
			Enumeration<NetworkInterface> nis = NetworkInterface.getNetworkInterfaces();
			while (nis.hasMoreElements()) {
				NetworkInterface ni = nis.nextElement();
				if(found = (subdirectories.isEmpty() || subdirectories.contains(makeSHA1Hash(ni.getName())))) {
					historyPath += makeSHA1Hash(ni.getName());
					lastNi = null;
					break;
				}
				lastNi = makeSHA1Hash(ni.getName());
			}

			if(!found && lastNi != null) {
				historyPath += lastNi;
			} else if(!found) {
				String hostname = "unknown";
				try {
					InetAddress addr;
					addr = InetAddress.getLocalHost();
					hostname = addr.getHostName();
				} catch (UnknownHostException ex) {
					System.out.println("Hostname can not be resolved");
				}
				historyPath += makeSHA1Hash(hostname);
				if(subdirectories.isEmpty() || !subdirectories.contains(makeSHA1Hash(hostname))) {
					historyPath += makeSHA1Hash(hostname);
				}
			}

			file = new File(historyPath);

			if(!file.exists()) {
				boolean mkdir = file.mkdir();
				System.out.println("mkdir create 1 " + mkdir);
			} 

		} catch(Exception e) {
			e.printStackTrace();
		}

		//return System.getProperty("java.io.tmpdir") + "SecureChat/log/chatlog-" + curUser + ".json";
		historyPath = historyPath + "/chatlog-Alice.json";

		System.out.println("historyPath: " + historyPath);

		return historyPath;
	}

	private static String makeSHA1Hash(String input)
			throws NoSuchAlgorithmException, UnsupportedEncodingException {
		MessageDigest md = MessageDigest.getInstance("SHA1");
		md.reset();
		byte[] buffer = input.getBytes("UTF-8");
		md.update(buffer);
		byte[] digest = md.digest();

		String hexStr = "";
		for (int i = 0; i < digest.length; i++) {
			hexStr +=  Integer.toString( ( digest[i] & 0xff ) + 0x100, 16).substring( 1 );
		}
		return hexStr;
	}
}
