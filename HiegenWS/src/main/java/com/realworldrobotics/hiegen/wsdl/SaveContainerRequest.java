
package com.realworldrobotics.hiegen.wsdl;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;
import javax.xml.bind.annotation.adapters.CollapsedStringAdapter;
import javax.xml.bind.annotation.adapters.NormalizedStringAdapter;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;


/**
 * <p>Java class for SaveContainerRequest complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="SaveContainerRequest">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="sessionKey" type="{http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession}SessionKey"/>
 *         &lt;element name="resumePath" type="{http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession}ResumePath" minOccurs="0"/>
 *         &lt;element name="dataContainer" type="{http://www.hiegen.realworldrobotics/hiegenforms/1.1/formInstanceMeta}FormData"/>
 *         &lt;element name="view" type="{http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession}View" minOccurs="0"/>
 *         &lt;element name="viewType" type="{http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession}ViewType" minOccurs="0"/>
 *         &lt;element name="viewSignature" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="completed" type="{http://www.w3.org/2001/XMLSchema}boolean"/>
 *         &lt;element name="continueSession" type="{http://www.w3.org/2001/XMLSchema}boolean" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "SaveContainerRequest", propOrder = {
    "sessionKey",
    "resumePath",
    "dataContainer",
    "view",
    "viewType",
    "viewSignature",
    "completed",
    "continueSession"
})
public class SaveContainerRequest {

    @XmlElement(required = true)
    @XmlJavaTypeAdapter(CollapsedStringAdapter.class)
    protected String sessionKey;
    @XmlJavaTypeAdapter(CollapsedStringAdapter.class)
    protected String resumePath;
    @XmlElement(required = true)
    protected FormData dataContainer;
    protected String view;
    @XmlJavaTypeAdapter(NormalizedStringAdapter.class)
    protected String viewType;
    protected String viewSignature;
    protected boolean completed;
    protected Boolean continueSession;

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
     * Gets the value of the resumePath property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getResumePath() {
        return resumePath;
    }

    /**
     * Sets the value of the resumePath property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setResumePath(String value) {
        this.resumePath = value;
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

    /**
     * Gets the value of the view property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getView() {
        return view;
    }

    /**
     * Sets the value of the view property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setView(String value) {
        this.view = value;
    }

    /**
     * Gets the value of the viewType property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getViewType() {
        return viewType;
    }

    /**
     * Sets the value of the viewType property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setViewType(String value) {
        this.viewType = value;
    }

    /**
     * Gets the value of the viewSignature property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getViewSignature() {
        return viewSignature;
    }

    /**
     * Sets the value of the viewSignature property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setViewSignature(String value) {
        this.viewSignature = value;
    }

    /**
     * Gets the value of the completed property.
     * 
     */
    public boolean isCompleted() {
        return completed;
    }

    /**
     * Sets the value of the completed property.
     * 
     */
    public void setCompleted(boolean value) {
        this.completed = value;
    }

    /**
     * Gets the value of the continueSession property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isContinueSession() {
        return continueSession;
    }

    /**
     * Sets the value of the continueSession property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setContinueSession(Boolean value) {
        this.continueSession = value;
    }

}
