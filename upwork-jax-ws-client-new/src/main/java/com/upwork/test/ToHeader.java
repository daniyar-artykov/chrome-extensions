
package com.upwork.test;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlType;
import javax.xml.bind.annotation.XmlValue;


@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "To")
public class ToHeader {

	@XmlAttribute(name = "mustUnderstand", namespace = "http://www.w3.org/2003/05/soap-envelope")
	protected String mustUnderstand;
	@XmlValue
	protected String text;
	
	public String getMustUnderstand() {
		return mustUnderstand;
	}
	public void setMustUnderstand(String mustUnderstand) {
		this.mustUnderstand = mustUnderstand;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
}
