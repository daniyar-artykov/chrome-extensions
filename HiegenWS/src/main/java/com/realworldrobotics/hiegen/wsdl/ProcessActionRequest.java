
package com.realworldrobotics.hiegen.wsdl;

import javax.xml.bind.annotation.*;
import javax.xml.bind.annotation.adapters.CollapsedStringAdapter;
import javax.xml.bind.annotation.adapters.NormalizedStringAdapter;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;


/**
 * <p>Java class for ProcessActionRequest complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ProcessActionRequest">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="sessionKey" type="{http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession}SessionKey"/>
 *         &lt;element name="actionId" type="{http://www.w3.org/2001/XMLSchema}normalizedString"/>
 *         &lt;element name="actionContainer" type="{http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession}ActionContainer"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ProcessActionRequest", propOrder = {
    "sessionKey",
    "actionId",
    "actionContainer"
})
public class ProcessActionRequest {

    @XmlElement(required = true)
    @XmlJavaTypeAdapter(CollapsedStringAdapter.class)
    protected String sessionKey;
    @XmlElement(required = true)
    @XmlJavaTypeAdapter(NormalizedStringAdapter.class)
    @XmlSchemaType(name = "normalizedString")
    protected String actionId;
    @XmlElement(required = true)
    protected ActionContainer actionContainer;

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
     * Gets the value of the actionId property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getActionId() {
        return actionId;
    }

    /**
     * Sets the value of the actionId property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setActionId(String value) {
        this.actionId = value;
    }

    /**
     * Gets the value of the actionContainer property.
     * 
     * @return
     *     possible object is
     *     {@link ActionContainer }
     *     
     */
    public ActionContainer getActionContainer() {
        return actionContainer;
    }

    /**
     * Sets the value of the actionContainer property.
     * 
     * @param value
     *     allowed object is
     *     {@link ActionContainer }
     *     
     */
    public void setActionContainer(ActionContainer value) {
        this.actionContainer = value;
    }

}
