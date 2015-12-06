
package com.accenture.nes.webservices;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;
import com.accenture.nes.dto.webservicedto.ivr.ResetPasswordServiceRequestDTO;


/**
 * <p>Java class for resetPassword complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="resetPassword">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="resetPasswordeReqDTO" type="{http://ivr.webservicedto.dto.nes.accenture.com}ResetPasswordServiceRequestDTO" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "resetPassword", propOrder = {
    "resetPasswordeReqDTO"
})
public class ResetPassword {

    protected ResetPasswordServiceRequestDTO resetPasswordeReqDTO;

    /**
     * Gets the value of the resetPasswordeReqDTO property.
     * 
     * @return
     *     possible object is
     *     {@link ResetPasswordServiceRequestDTO }
     *     
     */
    public ResetPasswordServiceRequestDTO getResetPasswordeReqDTO() {
        return resetPasswordeReqDTO;
    }

    /**
     * Sets the value of the resetPasswordeReqDTO property.
     * 
     * @param value
     *     allowed object is
     *     {@link ResetPasswordServiceRequestDTO }
     *     
     */
    public void setResetPasswordeReqDTO(ResetPasswordServiceRequestDTO value) {
        this.resetPasswordeReqDTO = value;
    }

}
