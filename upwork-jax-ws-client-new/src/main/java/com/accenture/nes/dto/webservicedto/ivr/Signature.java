package com.accenture.nes.dto.webservicedto.ivr;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "Signature")
public class Signature {

	@XmlElement(name = "SignedInfo")
	protected SignedInfo signedInfo;

	@XmlElement(name = "SignatureValue")
	protected String signatureValue;
	
	
	
}
