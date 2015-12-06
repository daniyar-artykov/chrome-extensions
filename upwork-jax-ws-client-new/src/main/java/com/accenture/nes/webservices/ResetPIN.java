
package com.accenture.nes.webservices;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;
import com.accenture.nes.dto.webservicedto.ivr.ResetPinRequestDTO;


/**
 * <p>Java class for resetPIN complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="resetPIN">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="requestpinRequestDTO" type="{http://ivr.webservicedto.dto.nes.accenture.com}ResetPinRequestDTO" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "resetPIN", propOrder = {
    "requestpinRequestDTO"
})
public class ResetPIN {

    protected ResetPinRequestDTO requestpinRequestDTO;

    /**
     * Gets the value of the requestpinRequestDTO property.
     * 
     * @return
     *     possible object is
     *     {@link ResetPinRequestDTO }
     *     
     */
    public ResetPinRequestDTO getRequestpinRequestDTO() {
        return requestpinRequestDTO;
    }

    /**
     * Sets the value of the requestpinRequestDTO property.
     * 
     * @param value
     *     allowed object is
     *     {@link ResetPinRequestDTO }
     *     
     */
    public void setRequestpinRequestDTO(ResetPinRequestDTO value) {
        this.requestpinRequestDTO = value;
    }

}
