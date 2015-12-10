package com.upwork.axis2_client.test;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.upwork.axis2_client.SecurityTokenServiceStub;

public class Test {

	private static final Logger LOG = LoggerFactory.getLogger(Test.class);

	public static void main(String args[]) {
		try {
			SecurityTokenServiceStub stub = new SecurityTokenServiceStub();
			stub.trustFeb2005IssueAsync(null);
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}
	}
}