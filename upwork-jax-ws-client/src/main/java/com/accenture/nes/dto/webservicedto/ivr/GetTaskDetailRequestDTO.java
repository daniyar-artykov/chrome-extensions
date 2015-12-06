
package com.accenture.nes.dto.webservicedto.ivr;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for GetTaskDetailRequestDTO complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="GetTaskDetailRequestDTO">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="isEmployer" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="languageKey" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="selfServiceCategory" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
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
@XmlType(name = "GetTaskDetailRequestDTO", propOrder = {
    "isEmployer",
    "languageKey",
    "selfServiceCategory",
    "uniqueId"
})
public class GetTaskDetailRequestDTO {

    protected Long isEmployer;
    protected Long languageKey;
    protected Long selfServiceCategory;
    protected Long uniqueId;

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
     * Gets the value of the selfServiceCategory property.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getSelfServiceCategory() {
        return selfServiceCategory;
    }

    /**
     * Sets the value of the selfServiceCategory property.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setSelfServiceCategory(Long value) {
        this.selfServiceCategory = value;
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
