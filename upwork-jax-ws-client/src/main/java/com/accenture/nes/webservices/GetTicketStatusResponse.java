
package com.accenture.nes.webservices;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;
import com.accenture.nes.webservicedto.ivr.GetTicketStatusResponceDTO;


/**
 * <p>Java class for getTicketStatusResponse complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="getTicketStatusResponse">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="return" type="{http://ivr.webservicedto.nes.accenture.com}GetTicketStatusResponceDTO" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "getTicketStatusResponse", propOrder = {
    "_return"
})
public class GetTicketStatusResponse {

    @XmlElement(name = "return")
    protected GetTicketStatusResponceDTO _return;

    /**
     * Gets the value of the return property.
     * 
     * @return
     *     possible object is
     *     {@link GetTicketStatusResponceDTO }
     *     
     */
    public GetTicketStatusResponceDTO getReturn() {
        return _return;
    }

    /**
     * Sets the value of the return property.
     * 
     * @param value
     *     allowed object is
     *     {@link GetTicketStatusResponceDTO }
     *     
     */
    public void setReturn(GetTicketStatusResponceDTO value) {
        this._return = value;
    }

}
