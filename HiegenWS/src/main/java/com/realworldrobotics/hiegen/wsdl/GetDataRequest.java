
package com.realworldrobotics.hiegen.wsdl;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;
import javax.xml.bind.annotation.adapters.CollapsedStringAdapter;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;


/**
 * <p>Java class for GetDataRequest complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="GetDataRequest">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="sessionKey" type="{http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession}SessionKey"/>
 *         &lt;element name="dataContainer" type="{http://www.hiegen.realworldrobotics/hiegenforms/1.1/formInstanceMeta}FormData"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "GetDataRequest", propOrder = {
    "sessionKey",
    "dataContainer"
})
public class GetDataRequest {

    @XmlElement(required = true)
    @XmlJavaTypeAdapter(CollapsedStringAdapter.class)
    protected String sessionKey;
    @XmlElement(required = true)
    protected FormData dataContainer;

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

    /**
     * Gets the value of the dataContainer property.
     * 
     * @return
     *     possible object is
     *     {@link FormData }
     *     
     */
    public FormData getDataContainer() {
        return dataContainer;
    }

    /**
     * Sets the value of the dataContainer property.
     * 
     * @param value
     *     allowed object is
     *     {@link FormData }
     *     
     */
    public void setDataContainer(FormData value) {
        this.dataContainer = value;
    }

}
