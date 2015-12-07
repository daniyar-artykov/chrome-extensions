
package com.realworldrobotics.hiegen.wsdl;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;
import java.math.BigInteger;


/**
 * <p>Java class for GetPatientResponse complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="GetPatientResponse">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="patientSummaryCount" type="{http://www.w3.org/2001/XMLSchema}integer"/>
 *         &lt;element name="patientSummaryList" type="{http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession}PatientSummary" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "GetPatientResponse", propOrder = {
    "patientSummaryCount",
    "patientSummaryList"
})
public class GetPatientResponse {

    @XmlElement(required = true)
    protected BigInteger patientSummaryCount;
    protected PatientSummary patientSummaryList;

    /**
     * Gets the value of the patientSummaryCount property.
     * 
     * @return
     *     possible object is
     *     {@link BigInteger }
     *     
     */
    public BigInteger getPatientSummaryCount() {
        return patientSummaryCount;
    }

    /**
     * Sets the value of the patientSummaryCount property.
     * 
     * @param value
     *     allowed object is
     *     {@link BigInteger }
     *     
     */
    public void setPatientSummaryCount(BigInteger value) {
        this.patientSummaryCount = value;
    }

    /**
     * Gets the value of the patientSummaryList property.
     * 
     * @return
     *     possible object is
     *     {@link PatientSummary }
     *     
     */
    public PatientSummary getPatientSummaryList() {
        return patientSummaryList;
    }

    /**
     * Sets the value of the patientSummaryList property.
     * 
     * @param value
     *     allowed object is
     *     {@link PatientSummary }
     *     
     */
    public void setPatientSummaryList(PatientSummary value) {
        this.patientSummaryList = value;
    }

}
