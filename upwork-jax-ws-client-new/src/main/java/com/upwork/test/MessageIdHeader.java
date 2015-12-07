
package com.upwork.test;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;
import javax.xml.bind.annotation.XmlValue;


@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "MessageID")
public class MessageIdHeader {

	public MessageIdHeader() {
		
	}
	
	public MessageIdHeader(String msgId) {
		this.messageId = msgId;
	}
	
	@XmlValue
	protected String messageId;
	public String getMessageId() {
		return messageId;
	}

	public void setMessageId(String messageId) {
		this.messageId = messageId;
	}
}
