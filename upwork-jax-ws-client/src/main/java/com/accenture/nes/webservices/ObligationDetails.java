
package com.accenture.nes.webservices;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for obligationDetails complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="obligationDetails">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="assgimentStatus" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="assignmentCategory" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="assignmentSubject" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="dueDate" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "obligationDetails", propOrder = {
    "assgimentStatus",
    "assignmentCategory",
    "assignmentSubject",
    "dueDate"
})
public class ObligationDetails {

    protected String assgimentStatus;
    protected String assignmentCategory;
    protected String assignmentSubject;
    protected String dueDate;

    /**
     * Gets the value of the assgimentStatus property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAssgimentStatus() {
        return assgimentStatus;
    }

    /**
     * Sets the value of the assgimentStatus property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAssgimentStatus(String value) {
        this.assgimentStatus = value;
    }

    /**
     * Gets the value of the assignmentCategory property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAssignmentCategory() {
        return assignmentCategory;
    }

    /**
     * Sets the value of the assignmentCategory property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAssignmentCategory(String value) {
        this.assignmentCategory = value;
    }

    /**
     * Gets the value of the assignmentSubject property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAssignmentSubject() {
        return assignmentSubject;
    }

    /**
     * Sets the value of the assignmentSubject property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAssignmentSubject(String value) {
        this.assignmentSubject = value;
    }

    /**
     * Gets the value of the dueDate property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDueDate() {
        return dueDate;
    }

    /**
     * Sets the value of the dueDate property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDueDate(String value) {
        this.dueDate = value;
    }

}
