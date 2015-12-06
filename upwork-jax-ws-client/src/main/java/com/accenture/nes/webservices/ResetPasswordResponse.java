
package com.accenture.nes.webservices;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;
import com.accenture.nes.dto.webservicedto.ivr.ResetPasswordServiceResponseDTO;


/**
 * <p>Java class for resetPasswordResponse complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="resetPasswordResponse">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="return" type="{http://ivr.webservicedto.dto.nes.accenture.com}ResetPasswordServiceResponseDTO" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "resetPasswordResponse", propOrder = {
    "_return"
})
public class ResetPasswordResponse {

    @XmlElement(name = "return")
    protected ResetPasswordServiceResponseDTO _return;

    /**
     * Gets the value of the return property.
     * 
     * @return
     *     possible object is
     *     {@link ResetPasswordServiceResponseDTO }
     *     
     */
    public ResetPasswordServiceResponseDTO getReturn() {
        return _return;
    }

    /**
     * Sets the value of the return property.
     * 
     * @param value
     *     allowed object is
     *     {@link ResetPasswordServiceResponseDTO }
     *     
     */
    public void setReturn(ResetPasswordServiceResponseDTO value) {
        this._return = value;
    }

}
