
package com.realworldrobotics.hiegen.wsdl;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;
import javax.xml.bind.annotation.adapters.CollapsedStringAdapter;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;


/**
 * <p>Java class for GetSessionResponse complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="GetSessionResponse">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="sessionSet" type="{http://www.w3.org/2001/XMLSchema}boolean"/>
 *         &lt;element name="sessionKey" type="{http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession}SessionKey" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "GetSessionResponse", propOrder = {
    "sessionSet",
    "sessionKey"
})
public class GetSessionResponse {

    protected boolean sessionSet;
    @XmlJavaTypeAdapter(CollapsedStringAdapter.class)
    protected String sessionKey;

    /**
     * Gets the value of the sessionSet property.
     * 
     */
    public boolean isSessionSet() {
        return sessionSet;
    }

    /**
     * Sets the value of the sessionSet property.
     * 
     */
    public void setSessionSet(boolean value) {
        this.sessionSet = value;
    }

    /**
     * Gets the value of the sessionKey property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSessionKey() {
        return sessionKey;
    }

    /**
     * Sets the value of the sessionKey property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSessionKey(String value) {
        this.sessionKey = value;
    }

}
