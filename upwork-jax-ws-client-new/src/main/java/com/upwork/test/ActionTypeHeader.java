
package com.upwork.test;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlType;
import javax.xml.bind.annotation.XmlValue;


@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "Action")
public class ActionTypeHeader {

	//	@XmlValue
	//	protected String messageId;
	//	public String getMessageId() {
	//		return messageId;
	//	}
	//
	//	public void setMessageId(String messageId) {
	//		this.messageId = messageId;
	//	}
	@XmlAttribute(name = "mustUnderstand", namespace = "http://www.w3.org/2003/05/soap-envelope")
	protected String mustUnderstand;
	@XmlValue
	protected String action;
	public String getMustUnderstand() {
		return mustUnderstand;
	}
	public void setMustUnderstand(String mustUnderstand) {
		this.mustUnderstand = mustUnderstand;
	}
	public String getAction() {
		return action;
	}
	public void setAction(String action) {
		this.action = action;
	}


}
