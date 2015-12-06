
package com.accenture.nes.dto.webservicedto.ivr;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for GetJPCAttachmentDetailsRequestDTO complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="GetJPCAttachmentDetailsRequestDTO">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="languageKey" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/>
 *         &lt;element name="selfServiceCategory" type="{http://www.w3.org/2001/XMLSchema}int"/>
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
@XmlType(name = "GetJPCAttachmentDetailsRequestDTO", propOrder = {
    "languageKey",
    "selfServiceCategory",
    "uniqueId"
})
public class GetJPCAttachmentDetailsRequestDTO {

    protected Long languageKey;
    protected int selfServiceCategory;
    protected Long uniqueId;

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
