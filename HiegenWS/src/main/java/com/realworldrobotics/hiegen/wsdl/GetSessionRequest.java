
package com.realworldrobotics.hiegen.wsdl;

import javax.xml.bind.annotation.*;
import javax.xml.bind.annotation.adapters.NormalizedStringAdapter;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;


/**
 * <p>Java class for GetSessionRequest complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="GetSessionRequest">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="formEngineDescription" type="{http://www.w3.org/2001/XMLSchema}normalizedString"/>
 *         &lt;element name="formPublisherDescription" type="{http://www.w3.org/2001/XMLSchema}normalizedString"/>
 *         &lt;element name="sessionIntentDescription" type="{http://www.w3.org/2001/XMLSchema}normalizedString"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "GetSessionRequest", propOrder = {
    "formEngineDescription",
    "formPublisherDescription",
    "sessionIntentDescription"
})
public class GetSessionRequest {

    @XmlElement(required = true)
    @XmlJavaTypeAdapter(NormalizedStringAdapter.class)
    @XmlSchemaType(name = "normalizedString")
    protected String formEngineDescription;
    @XmlElement(required = true)
    @XmlJavaTypeAdapter(NormalizedStringAdapter.class)
    @XmlSchemaType(name = "normalizedString")
    protected String formPublisherDescription;
    @XmlElement(required = true)
    @XmlJavaTypeAdapter(NormalizedStringAdapter.class)
    @XmlSchemaType(name = "normalizedString")
    protected String sessionIntentDescription;

    /**
     * Gets the value of the formEngineDescription property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getFormEngineDescription() {
        return formEngineDescription;
    }

    /**
     * Sets the value of the formEngineDescription property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setFormEngineDescription(String value) {
        this.formEngineDescription = value;
    }

    /**
     * Gets the value of the formPublisherDescription property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getFormPublisherDescription() {
        return formPublisherDescription;
    }

    /**
     * Sets the value of the formPublisherDescription property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setFormPublisherDescription(String value) {
        this.formPublisherDescription = value;
    }

    /**
     * Gets the value of the sessionIntentDescription property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSessionIntentDescription() {
        return sessionIntentDescription;
    }

    /**
     * Sets the value of the sessionIntentDescription property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSessionIntentDescription(String value) {
        this.sessionIntentDescription = value;
    }

}
