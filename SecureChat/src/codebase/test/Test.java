package codebase.test;

import codebase.util.BCrypt;

public class Test {

	public static void main(String args[]) {
		String salt = BCrypt.gensalt();
		System.out.println(salt);
		System.out.println("Alice/" + BCrypt.hashpw("mypassA2", "$2a$10$HBY7FWzV3/gVeWBNfRzgFu"));
		//$2a$10$HBY7FWzV3/gVeWBNfRzgFu
		//$2a$10$HBY7FWzV3/gVeWBNfRzgFuYpGWQaUZJAAtheeEBYnu6rDgJLypGoC
		System.out.println("Bob/" + BCrypt.hashpw("Bobspass1", salt));
		//$2a$10$INyPOenxLvTGJEMbmn1rs.
		//$2a$10$INyPOenxLvTGJEMbmn1rs.g0FdoTJQBE4/n1UKYTfHcerycs3jzHG

		System.out.println(System.getProperty("java.io.tmpdir"));
	}
}
