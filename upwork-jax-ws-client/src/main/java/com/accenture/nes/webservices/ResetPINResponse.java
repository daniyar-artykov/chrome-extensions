
package com.accenture.nes.webservices;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;
import com.accenture.nes.webservicedto.ivr.ResetPinResponseDTO;


/**
 * <p>Java class for resetPINResponse complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="resetPINResponse">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="return" type="{http://ivr.webservicedto.nes.accenture.com}ResetPinResponseDTO" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "resetPINResponse", propOrder = {
    "_return"
})
public class ResetPINResponse {

    @XmlElement(name = "return")
    protected ResetPinResponseDTO _return;

    /**
     * Gets the value of the return property.
     * 
     * @return
     *     possible object is
     *     {@link ResetPinResponseDTO }
     *     
     */
    public ResetPinResponseDTO getReturn() {
        return _return;
    }

    /**
     * Sets the value of the return property.
     * 
     * @param value
     *     allowed object is
     *     {@link ResetPinResponseDTO }
     *     
     */
    public void setReturn(ResetPinResponseDTO value) {
        this._return = value;
    }

}
