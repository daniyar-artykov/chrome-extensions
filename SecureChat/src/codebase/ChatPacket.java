package codebase;

/**
 * ChatPacket defines the data structure with which all the network packets are organized.
 * You can replace it with your own one(s).
 * 
 * For instance, data packets are better represented in C/C++ structures/unions. 
 * If regular Java objects are used they have to first serialized to fit in UDP packets (byte[]).
 * 
 * 
 * This plaintext codebase uses a simple structure that might NOT satisfy your requirements.
 *
 */
public class ChatPacket implements java.io.Serializable{
	private static final long serialVersionUID = 1L;
	public ChatRequest request;
	public String uid;
	public String salt;
	public String password;
	public String success;
	byte[] data;
}
