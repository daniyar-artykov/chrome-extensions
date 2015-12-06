package com.accenture.nes.dto.webservicedto.ivr;

import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlType;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "Reference")
public class Reference {

	@XmlAttribute(name = "URI")
	protected String uri;

    @XmlElementWrapper
	@XmlElement(name = "Transforms")
	protected List<Transform> transforms;
	
	@XmlElement(name = "DigestMethod")
	protected DigestMethod digestMethod;
	
	@XmlElement(name = "DigestValue")
	protected String digestValue;

	public String getUri() {
		return uri;
	}

	public void setUri(String uri) {
		this.uri = uri;
	}

	public List<Transform> getTransforms() {
		return transforms;
	}

	public void setTransforms(List<Transform> transforms) {
		this.transforms = transforms;
	}

	public DigestMethod getDigestMethod() {
		return digestMethod;
	}

	public void setDigestMethod(DigestMethod digestMethod) {
		this.digestMethod = digestMethod;
	}

	public String getDigestValue() {
		return digestValue;
	}

	public void setDigestValue(String digestValue) {
		this.digestValue = digestValue;
	}
}
