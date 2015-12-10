package codebase;

import java.awt.EventQueue;
import infrastructure.SecureChat;

/**
 * This is where you integrate the three classes. Only one instance is allowed
 * for each of them and it has be be registered explicitly as below. As the main
 * entry, you are not encouraged to put much logic here.
 * 
 * Class names are arbitrary as long as clear comments are provided.
 *
 */
public class MySecureChat {

	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				// This is the infrastructure you are not supposed to modify
				try {
					SecureChat window = new SecureChat();
					MyChatServer myserver = new MyChatServer();
					MyChatClient a = new MyChatClient(true);
					MyChatClient b = new MyChatClient(false);
					window.RegisterServer(myserver);
					window.RegisterClientA(a);
					window.RegisterClientB(b);

				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}

}
