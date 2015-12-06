
package com.accenture.nes.webservices;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;
import com.accenture.nes.dto.webservicedto.ivr.GetTicketStatusRequestDTO;


/**
 * <p>Java class for getTicketStatus complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="getTicketStatus">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="getTicketStatusRequestDTO" type="{http://ivr.webservicedto.dto.nes.accenture.com}GetTicketStatusRequestDTO" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "getTicketStatus", propOrder = {
    "getTicketStatusRequestDTO"
})
public class GetTicketStatus {

    protected GetTicketStatusRequestDTO getTicketStatusRequestDTO;

    /**
     * Gets the value of the getTicketStatusRequestDTO property.
     * 
     * @return
     *     possible object is
     *     {@link GetTicketStatusRequestDTO }
     *     
     */
    public GetTicketStatusRequestDTO getGetTicketStatusRequestDTO() {
        return getTicketStatusRequestDTO;
    }

    /**
     * Sets the value of the getTicketStatusRequestDTO property.
     * 
     * @param value
     *     allowed object is
     *     {@link GetTicketStatusRequestDTO }
     *     
     */
    public void setGetTicketStatusRequestDTO(GetTicketStatusRequestDTO value) {
        this.getTicketStatusRequestDTO = value;
    }

}
