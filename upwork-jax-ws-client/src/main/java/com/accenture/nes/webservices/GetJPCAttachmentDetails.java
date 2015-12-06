
package com.accenture.nes.webservices;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;
import com.accenture.nes.dto.webservicedto.ivr.GetJPCAttachmentDetailsRequestDTO;


/**
 * <p>Java class for getJPCAttachmentDetails complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="getJPCAttachmentDetails">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="getJPCAttachmentDetailsRequestDTO" type="{http://ivr.webservicedto.dto.nes.accenture.com}GetJPCAttachmentDetailsRequestDTO" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "getJPCAttachmentDetails", propOrder = {
    "getJPCAttachmentDetailsRequestDTO"
})
public class GetJPCAttachmentDetails {

    protected GetJPCAttachmentDetailsRequestDTO getJPCAttachmentDetailsRequestDTO;

    /**
     * Gets the value of the getJPCAttachmentDetailsRequestDTO property.
     * 
     * @return
     *     possible object is
     *     {@link GetJPCAttachmentDetailsRequestDTO }
     *     
     */
    public GetJPCAttachmentDetailsRequestDTO getGetJPCAttachmentDetailsRequestDTO() {
        return getJPCAttachmentDetailsRequestDTO;
    }

    /**
     * Sets the value of the getJPCAttachmentDetailsRequestDTO property.
     * 
     * @param value
     *     allowed object is
     *     {@link GetJPCAttachmentDetailsRequestDTO }
     *     
     */
    public void setGetJPCAttachmentDetailsRequestDTO(GetJPCAttachmentDetailsRequestDTO value) {
        this.getJPCAttachmentDetailsRequestDTO = value;
    }

}
