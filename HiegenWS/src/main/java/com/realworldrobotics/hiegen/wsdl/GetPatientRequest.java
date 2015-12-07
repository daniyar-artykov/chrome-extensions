
package com.realworldrobotics.hiegen.wsdl;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;
import javax.xml.bind.annotation.adapters.CollapsedStringAdapter;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;


/**
 * <p>Java class for GetPatientRequest complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="GetPatientRequest">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="sessionKey" type="{http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession}SessionKey"/>
 *         &lt;element name="patientSearchSummary" type="{http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession}PatientSummary"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "GetPatientRequest", propOrder = {
    "sessionKey",
    "patientSearchSummary"
})
public class GetPatientRequest {

    @XmlElement(required = true)
    @XmlJavaTypeAdapter(CollapsedStringAdapter.class)
    protected String sessionKey;
    @XmlElement(required = true)
    protected PatientSummary patientSearchSummary;

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
     * Gets the value of the patientSearchSummary property.
     * 
     * @return
     *     possible object is
     *     {@link PatientSummary }
     *     
     */
    public PatientSummary getPatientSearchSummary() {
        return patientSearchSummary;
    }

    /**
     * Sets the value of the patientSearchSummary property.
     * 
     * @param value
     *     allowed object is
     *     {@link PatientSummary }
     *     
     */
    public void setPatientSearchSummary(PatientSummary value) {
        this.patientSearchSummary = value;
    }

}
