
package com.upwork.test;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "Security")
public class SecurityHeader {

	@XmlAttribute(name = "mustUnderstand", namespace = "http://www.w3.org/2003/05/soap-envelope")
	protected String mustUnderstand;

	@XmlElement(name = "UsernameToken", namespace = "http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd")
	protected UsernameTokenHeader usernameToken;
	
	public String getMustUnderstand() {
		return mustUnderstand;
	}
	
	public UsernameTokenHeader getUsernameToken() {
		return usernameToken;
	}

	public void setUsernameToken(UsernameTokenHeader usernameToken) {
		this.usernameToken = usernameToken;
	}

	public void setMustUnderstand(String mustUnderstand) {
		this.mustUnderstand = mustUnderstand;
	}
	
	
}
