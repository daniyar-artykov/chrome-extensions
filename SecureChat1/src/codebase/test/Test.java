package codebase.test;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.UnknownHostException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;

public class Test {

	private static String historyPath = null;
	
	public static void main(String args[]) {
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
