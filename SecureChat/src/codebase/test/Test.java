package codebase.test;

import codebase.util.BCrypt;

public class Test {

	public static void main(String args[]) {
		System.out.println("Alice/" + BCrypt.hashpw("mypassA2", BCrypt.gensalt()));
		System.out.println("Bob/" + BCrypt.hashpw("Bobspass1", BCrypt.gensalt()));
		
		System.out.println(System.getProperty("java.io.tmpdir"));
	}
}
