
package com.upwork.test;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;
import javax.xml.bind.annotation.XmlValue;


@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "VsDebuggerCausalityData")
public class VsDebuggerCausalityData {

	public VsDebuggerCausalityData() {
		
	}
	
	public VsDebuggerCausalityData(String text) {
		this.text = text;
	}
	
	@XmlValue
	protected String text;

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}
}
