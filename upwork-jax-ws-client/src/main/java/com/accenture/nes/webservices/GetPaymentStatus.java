
package com.accenture.nes.webservices;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;
import com.accenture.nes.dto.webservicedto.ivr.GetPaymentStatusRequestDTO;


/**
 * <p>Java class for GetPaymentStatus complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="GetPaymentStatus">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="getPaymentStatusRequestDTO" type="{http://ivr.webservicedto.dto.nes.accenture.com}GetPaymentStatusRequestDTO" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "GetPaymentStatus", propOrder = {
    "getPaymentStatusRequestDTO"
})
public class GetPaymentStatus {

    protected GetPaymentStatusRequestDTO getPaymentStatusRequestDTO;

    /**
     * Gets the value of the getPaymentStatusRequestDTO property.
     * 
     * @return
     *     possible object is
     *     {@link GetPaymentStatusRequestDTO }
     *     
     */
    public GetPaymentStatusRequestDTO getGetPaymentStatusRequestDTO() {
        return getPaymentStatusRequestDTO;
    }

    /**
     * Sets the value of the getPaymentStatusRequestDTO property.
     * 
     * @param value
     *     allowed object is
     *     {@link GetPaymentStatusRequestDTO }
     *     
     */
    public void setGetPaymentStatusRequestDTO(GetPaymentStatusRequestDTO value) {
        this.getPaymentStatusRequestDTO = value;
    }

}
