package com.accenture.nes.dto.webservicedto.ivr;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "SignedInfo")
public class SignedInfo {
	
	@XmlElement(name = "CanonicalizationMethod")
	protected CanonicalizationMethod cannonMethod;
	
	@XmlElement(name = "SignatureMethod")
	protected SignatureMethod signatureMethod;

	@XmlElement(name = "Reference")
	protected Reference reference;

	public CanonicalizationMethod getCannonMethod() {
		return cannonMethod;
	}

	public void setCannonMethod(CanonicalizationMethod cannonMethod) {
		this.cannonMethod = cannonMethod;
	}

	public SignatureMethod getSignatureMethod() {
		return signatureMethod;
	}

	public void setSignatureMethod(SignatureMethod signatureMethod) {
		this.signatureMethod = signatureMethod;
	}

	public Reference getReference() {
		return reference;
	}

	public void setReference(Reference reference) {
		this.reference = reference;
	}
}
