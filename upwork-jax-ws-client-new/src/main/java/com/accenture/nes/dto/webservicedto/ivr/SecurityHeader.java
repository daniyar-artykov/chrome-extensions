package com.accenture.nes.dto.webservicedto.ivr;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "Security")
public class SecurityHeader {

	@XmlElement(name = "Assertion")
	protected AssertionHeader assertion;

	public AssertionHeader getAssertion() {
		return assertion;
	}

	public void setAssertion(AssertionHeader assertion) {
		this.assertion = assertion;
	}	
}
