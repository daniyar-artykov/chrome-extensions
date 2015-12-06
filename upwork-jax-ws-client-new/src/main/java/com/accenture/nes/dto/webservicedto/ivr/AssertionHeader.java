package com.accenture.nes.dto.webservicedto.ivr;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "Assertion")
public class AssertionHeader {
	
	@XmlAttribute(name = "ID")
	protected String id;
	
	@XmlAttribute(name = "IssueInstant")
	protected String issueInstant;
	
	@XmlAttribute(name = "Version")
	protected String version;
	
	@XmlElement(name = "Issuer")
	protected String issuer;
	
	@XmlElement(name = "Signature")
	protected Signature signature;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getIssueInstant() {
		return issueInstant;
	}

	public void setIssueInstant(String issueInstant) {
		this.issueInstant = issueInstant;
	}

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	public String getIssuer() {
		return issuer;
	}

	public void setIssuer(String issuer) {
		this.issuer = issuer;
	}

	public Signature getSignature() {
		return signature;
	}

	public void setSignature(Signature signature) {
		this.signature = signature;
	}	
	
	
}
