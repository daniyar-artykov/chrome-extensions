
package com.accenture.nes.dto.webservicedto.ivr;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for ResetPinRequestDTO complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ResetPinRequestDTO">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="dateOfBirth" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="establishmentId" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="isEmployer" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="languageKey" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="selfServicecategory" type="{http://www.w3.org/2001/XMLSchema}int"/>
 *         &lt;element name="uniqueId" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ResetPinRequestDTO", propOrder = {
    "dateOfBirth",
    "establishmentId",
    "isEmployer",
    "languageKey",
    "selfServicecategory",
    "uniqueId"
})
public class ResetPinRequestDTO {

    protected String dateOfBirth;
    protected String establishmentId;
    protected Long isEmployer;
    protected Long languageKey;
    protected int selfServicecategory;
    protected Long uniqueId;

    /**
     * Gets the value of the dateOfBirth property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDateOfBirth() {
        return dateOfBirth;
    }

    /**
     * Sets the value of the dateOfBirth property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDateOfBirth(String value) {
        this.dateOfBirth = value;
    }

    /**
     * Gets the value of the establishmentId property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getEstablishmentId() {
        return establishmentId;
    }

    /**
     * Sets the value of the establishmentId property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setEstablishmentId(String value) {
        this.establishmentId = value;
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
     * Gets the value of the languageKey property.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getLanguageKey() {
        return languageKey;
    }

    /**
     * Sets the value of the languageKey property.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setLanguageKey(Long value) {
        this.languageKey = value;
    }

    /**
     * Gets the value of the selfServicecategory property.
     * 
     */
    public int getSelfServicecategory() {
        return selfServicecategory;
    }

    /**
     * Sets the value of the selfServicecategory property.
     * 
     */
    public void setSelfServicecategory(int value) {
        this.selfServicecategory = value;
    }

    /**
     * Gets the value of the uniqueId property.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getUniqueId() {
        return uniqueId;
    }

    /**
     * Sets the value of the uniqueId property.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setUniqueId(Long value) {
        this.uniqueId = value;
    }

}
