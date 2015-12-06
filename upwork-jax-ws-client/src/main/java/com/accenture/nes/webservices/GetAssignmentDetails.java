
package com.accenture.nes.webservices;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;
import com.accenture.nes.dto.webservicedto.ivr.GetAssignmentDetailsRequestDTO;


/**
 * <p>Java class for getAssignmentDetails complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="getAssignmentDetails">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="getAssignmentDetailsRequestDTO" type="{http://ivr.webservicedto.dto.nes.accenture.com}GetAssignmentDetailsRequestDTO" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "getAssignmentDetails", propOrder = {
    "getAssignmentDetailsRequestDTO"
})
public class GetAssignmentDetails {

    protected GetAssignmentDetailsRequestDTO getAssignmentDetailsRequestDTO;

    /**
     * Gets the value of the getAssignmentDetailsRequestDTO property.
     * 
     * @return
     *     possible object is
     *     {@link GetAssignmentDetailsRequestDTO }
     *     
     */
    public GetAssignmentDetailsRequestDTO getGetAssignmentDetailsRequestDTO() {
        return getAssignmentDetailsRequestDTO;
    }

    /**
     * Sets the value of the getAssignmentDetailsRequestDTO property.
     * 
     * @param value
     *     allowed object is
     *     {@link GetAssignmentDetailsRequestDTO }
     *     
     */
    public void setGetAssignmentDetailsRequestDTO(GetAssignmentDetailsRequestDTO value) {
        this.getAssignmentDetailsRequestDTO = value;
    }

}
