package codebase;

import infrastructure.ChatClient;

import java.io.BufferedWriter;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.ObjectInput;
import java.io.ObjectInputStream;
import java.io.ObjectOutput;
import java.io.ObjectOutputStream;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.io.Writer;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.UnknownHostException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;

import javax.crypto.Cipher;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonReader;

import codebase.util.BCrypt;
import codebase.util.CipherUtil;
import codebase.util.CipherUtilOld;

/**
 * ChatClient implements the fundamental communication capabilities for your
 * server, but it does not take care of the semantics of the payload it carries.
 * 
 * Here MyChatClient (of your choice) extends it and implements the actual
 * client-side protocol. It must be replaced with/adapted for your designed
 * protocol.
 *
 * Note that A and B are distinguished by the boolean value with the
 * constructor.
 */
class MyChatClient extends ChatClient {

	MyChatClient(boolean IsA) { // This is the minimum constructor you must
		// preserve
		super(IsA); // IsA indicates whether it's client A or B
		startComm(); // starts the communication
	}

	/** The current user that is logged in on this client **/
	public String curUser = "";

	/** The Json array storing the internal history state */
	JsonArray chatlog;

	private String curUserPwd = null;
	private String historyPath = null;
	private String key = null;

	/**
	 * Actions received from UI
	 */

	/**
	 * Someone clicks on the "Login" button
	 */
	public void LoginRequestReceived(String uid, String pwd) {
		// request to the server to check user and if user exist then get encrypted salt
		ChatPacket p = new ChatPacket();
		p.request = ChatRequest.LOGIN_STEP_1;
		p.uid = uid;
		curUserPwd = pwd;

		SerializeNSend(p);

	}

	/**
	 * Callback invoked when the certificate file is selected
	 * @param path Selected certificate file's path
	 */
	public void FileLocationReceivedCert(File path) {
		// TODO
	}

	/**
	 * Callback invoked when the private key file is selected
	 * @param path Selected private key file's path
	 */
	public void FileLocationReceivedPriv(File path) {
		// TODO 
	}

	/**
	 * Callback invoked when an authentication mode is selected. 
	 * @param IsPWD True if password-based (false if certificate-based).
	 */
	public void ReceivedMode(boolean IsPWD) {
		// TODO
	}


	/**
	 * Someone clicks on the "Logout" button
	 */
	public void LogoutRequestReceived() {
		ChatPacket p = new ChatPacket();
		p.request = ChatRequest.LOGOUT;

		SerializeNSend(p);
	}

	/**
	 * Someone clicks on the "Send" button
	 * @param message Message to be sent (user's level)
	 */
	public void ChatRequestReceived(byte[] message) {
		ChatPacket p = new ChatPacket();
		p.request = ChatRequest.CHAT;
		p.uid = curUser;
		p.data = message;
		SerializeNSend(p);
	}

	/**
	 * Methods for updating UI
	 */

	/**
	 * This will refresh the messages on the UI with the Json array chatlog
	 */
	void RefreshList() {
		String[] list = new String[chatlog.size()];
		for (int i = 0; i < chatlog.size(); i++) {
			String from = chatlog.getJsonObject(i).getString("from");
			String to = chatlog.getJsonObject(i).getString("to");
			String message = chatlog.getJsonObject(i).getString("message");
			list[i] = (from + "->" + to + ": " + message);
		}
		UpdateMessages(list);
	}

	/**
	 * Methods invoked by the network stack
	 */

	/**
	 * Callback invoked when a packet has been received from the server
	 * (as the client only talks with the server, but not the other client)
	 * @param buf Incoming message
	 */
	public void PacketfromServer(byte[] buf) {
		ByteArrayInputStream is = new ByteArrayInputStream(buf);
		ObjectInput in = null;
		try {
			in = new ObjectInputStream(is);
			Object o = in.readObject();
			ChatPacket p = (ChatPacket) o;

			// if step is LOGIN_STEP_1 (requested encrypted salt)
			if (p.request == ChatRequest.RESPONSE && p.success.equals("LOGIN_STEP_1")) {

				System.out.println("CLIENT LOGIN_STEP_1");
				System.out.println("salt: " + p.salt);
				ChatPacket p2 = new ChatPacket();
				p2.request = ChatRequest.LOGIN;
				p2.uid = p.uid;
				// create encrypted password using BCrypt and encrypted salt
				if(curUserPwd != null) {
					p2.password = BCrypt.hashpw(curUserPwd, p.salt);
				}
				//				curUserPwd = null;
				System.out.println("password: " + p2.password);

				SerializeNSend(p2);
			} else if (p.request == ChatRequest.RESPONSE && p.success.equals("LOGIN")) {
				// This indicates a successful login
				curUser = p.uid;
				try {
					key = makeSHA1Hash(p.salt + "|" + p.uid + "|" + curUserPwd);
					System.out.println("key: " + key);
				} catch(Exception e) {
					e.printStackTrace();
				}
				// Time to load the chatlog
				InputStream ins = null;
				FileInputStream fis = null;
				FileOutputStream fos = null;
				JsonReader jsonReader;
				File f = new File(this.getChatLogPath());
				if (f.exists() && !f.isDirectory()) {
					try {
						ins = new FileInputStream(this.getChatLogPath());
						if(ins.available() == 0) {
							Writer writer = null;
							try {
								f.createNewFile();
								writer = new BufferedWriter(new OutputStreamWriter(
										new FileOutputStream(f), "utf-8"));
								writer.write(new String(CipherUtilOld.encryptOrDecrypt(key, Cipher.DECRYPT_MODE, "[]".getBytes("UTF-8"))));
							} catch (Throwable ex) {
								ex.printStackTrace();
							} finally {
								try {writer.close(); ins.close();} catch (Exception ex) {/*ignore*/}
							}
						}
						fis = new FileInputStream(this.getChatLogPath());
						fos = new FileOutputStream(this.getChatLogPath() + ".decrypted");
						System.out.println(ins);
						try {
							CipherUtil.decrypt(key, fis, fos);
							ins = new FileInputStream(this.getChatLogPath() + ".decrypted");
							File file = new File(this.getChatLogPath() + ".decrypted");
							boolean deleted = file.delete();
							System.out.println("deleted: " + deleted);
							jsonReader = Json.createReader(ins);
							chatlog = jsonReader.readArray();
							System.out.println(chatlog);
						} catch(Throwable e) {
							e.printStackTrace();
						}
					} catch (FileNotFoundException e) {
						System.err.println("Chatlog file could not be opened.");
					}
				} else {
					try {
						//							f.createNewFile();
						fos = new FileOutputStream(this.getChatLogPath() + ".blank");
						byte[] contentInBytes = "[]".getBytes();
						fos.write(contentInBytes);
						fos.flush();
						fos.close();

						fis = new FileInputStream(this.getChatLogPath() + ".blank");
						fos = new FileOutputStream(this.getChatLogPath());

						CipherUtil.encrypt(key, fis, fos);
						ins = new FileInputStream(this.getChatLogPath());
						chatlog = Json.createArrayBuilder().build();
					} catch (Throwable e) {
						System.err.println("Chatlog file could not be created or opened.");
						e.printStackTrace();
					}
				}

				RefreshList();

			} else if (p.request == ChatRequest.RESPONSE && p.success.equals("LOGOUT")) {
				// Logged out, save chat log and clear messages on the UI
				SaveChatHistory();
				curUser = "";
				UpdateMessages(null);
			} else if (p.request == ChatRequest.CHAT && !curUser.equals("")) {
				// A new chat message received
				Add1Message(p.uid, curUser, p.data);
			} else if (p.request == ChatRequest.CHAT_ACK && !curUser.equals("")) {
				// This was sent by us and now it's confirmed by the server, add
				// it to chat history
				Add1Message(curUser, p.uid, p.data);
			}
		} catch (IOException e) {
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}

	}

	/**
	 * Gives the path of the local chat history file (user-based)
	 */
	private String getChatLogPath() {
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

		historyPath = historyPath + "/chatlog-" + curUser + ".json";
		System.out.println("historyPath: " + historyPath);

		return historyPath;
	}

	/**
	 * Methods dealing with local processing
	 */

	/**
	 * This method saves the Json array storing the chat log back to file
	 */
	public void SaveChatHistory() {
		if (curUser.equals(""))
			return;
		try {
			// The chatlog file is named after both the client and the user
			// logged in


			//			JsonWriter writer = Json.createWriter(out);
			//			writer.writeArray(chatlog);
			System.out.println("chatlog: " + chatlog.toString());
			//			byte[] encrypted = CipherUtilOld.encryptOrDecrypt(key, Cipher.ENCRYPT_MODE, chatlog.toString().getBytes("UTF-8"));

			InputStream fis = new ByteArrayInputStream(chatlog.toString().getBytes("UTF-8"));
			FileOutputStream fos = new FileOutputStream(this.getChatLogPath());

			CipherUtil.encrypt(key, fis, fos);

			//			OutputStream out = new FileOutputStream(this.getChatLogPath());
			//			
			//			out.write(encrypted);
			//			out.flush();
			//			out.close();
			//			writer.close();
		} catch (Throwable e) {
			e.printStackTrace();
		}

	}

	/**
	 * Similar to the one in MyChatServer, serializes and send the Java object
	 * @param p ChatPacket to serialize and send
	 */
	private void SerializeNSend(ChatPacket p) {
		ByteArrayOutputStream os = new ByteArrayOutputStream();
		ObjectOutput out = null;
		try {
			out = new ObjectOutputStream(os);
			out.writeObject(p);
			byte[] packet = os.toByteArray();
			SendtoServer(packet);
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				out.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
			try {
				os.close();
			} catch (IOException e) {
				e.printStackTrace();
			}

		}
	}

	/**
	 * Adds a message to the internal's client state 
	 * @param from From whom the message comes from
	 * @param to To whom the messaged is addressed
	 * @param buf Message
	 */
	private void Add1Message(String from, String to, byte[] buf) {
		JsonArrayBuilder builder = Json.createArrayBuilder();
		for (int i = 0; i < chatlog.size(); i++) {
			builder.add(chatlog.getJsonObject(i));
		}
		try {
			builder.add(Json.createObjectBuilder().add("from", from).add("to", to).add("time", "").add("message",
					new String(buf, "UTF-8")));
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		JsonArray newl = builder.build();
		chatlog = newl;
		RefreshList();

	}

	private String makeSHA1Hash(String input)
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
