
package com.accenture.nes.dto.webservicedto.ivr;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for ResetPasswordServiceRequestDTO complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ResetPasswordServiceRequestDTO">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="establishmentID" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="isEmployer" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="languagKey" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="selfServiceCategory" type="{http://www.w3.org/2001/XMLSchema}int"/>
 *         &lt;element name="uniqueID" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ResetPasswordServiceRequestDTO", propOrder = {
    "establishmentID",
    "isEmployer",
    "languagKey",
    "selfServiceCategory",
    "uniqueID"
})
public class ResetPasswordServiceRequestDTO {

    protected String establishmentID;
    protected Long isEmployer;
    protected Long languagKey;
    protected int selfServiceCategory;
    protected Long uniqueID;

    /**
     * Gets the value of the establishmentID property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getEstablishmentID() {
        return establishmentID;
    }

    /**
     * Sets the value of the establishmentID property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setEstablishmentID(String value) {
        this.establishmentID = value;
    }

    /**
     * Gets the value of the isEmployer property.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getIsEmployer() {
        return isEmployer;
    }

    /**
     * Sets the value of the isEmployer property.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setIsEmployer(Long value) {
        this.isEmployer = value;
    }

    /**
     * Gets the value of the languagKey property.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getLanguagKey() {
        return languagKey;
    }

    /**
     * Sets the value of the languagKey property.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setLanguagKey(Long value) {
        this.languagKey = value;
    }

    /**
     * Gets the value of the selfServiceCategory property.
     * 
     */
    public int getSelfServiceCategory() {
        return selfServiceCategory;
    }

    /**
     * Sets the value of the selfServiceCategory property.
     * 
     */
    public void setSelfServiceCategory(int value) {
        this.selfServiceCategory = value;
    }

    /**
     * Gets the value of the uniqueID property.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getUniqueID() {
        return uniqueID;
    }

    /**
     * Sets the value of the uniqueID property.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setUniqueID(Long value) {
        this.uniqueID = value;
    }

}
