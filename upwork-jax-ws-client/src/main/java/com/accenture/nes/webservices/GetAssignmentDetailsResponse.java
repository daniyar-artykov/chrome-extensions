
package com.accenture.nes.webservices;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;
import com.accenture.nes.dto.webservicedto.ivr.GetAssignmentDetailsResponseDTO;


/**
 * <p>Java class for getAssignmentDetailsResponse complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="getAssignmentDetailsResponse">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="return" type="{http://ivr.webservicedto.dto.nes.accenture.com}GetAssignmentDetailsResponseDTO" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "getAssignmentDetailsResponse", propOrder = {
    "_return"
})
public class GetAssignmentDetailsResponse {

    @XmlElement(name = "return")
    protected GetAssignmentDetailsResponseDTO _return;

    /**
     * Gets the value of the return property.
     * 
     * @return
     *     possible object is
     *     {@link GetAssignmentDetailsResponseDTO }
     *     
     */
    public GetAssignmentDetailsResponseDTO getReturn() {
        return _return;
    }

    /**
     * Sets the value of the return property.
     * 
     * @param value
     *     allowed object is
     *     {@link GetAssignmentDetailsResponseDTO }
     *     
     */
    public void setReturn(GetAssignmentDetailsResponseDTO value) {
        this._return = value;
    }

}
