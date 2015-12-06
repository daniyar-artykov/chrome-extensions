
package com.accenture.nes.webservices;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;
import com.accenture.nes.dto.webservicedto.ivr.GetProgramStatusRequestDTO;


/**
 * <p>Java class for getProgramStatus complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="getProgramStatus">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="getProgramStatusRequestDTO" type="{http://ivr.webservicedto.dto.nes.accenture.com}GetProgramStatusRequestDTO" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "getProgramStatus", propOrder = {
    "getProgramStatusRequestDTO"
})
public class GetProgramStatus {

    protected GetProgramStatusRequestDTO getProgramStatusRequestDTO;

    /**
     * Gets the value of the getProgramStatusRequestDTO property.
     * 
     * @return
     *     possible object is
     *     {@link GetProgramStatusRequestDTO }
     *     
     */
    public GetProgramStatusRequestDTO getGetProgramStatusRequestDTO() {
        return getProgramStatusRequestDTO;
    }

    /**
     * Sets the value of the getProgramStatusRequestDTO property.
     * 
     * @param value
     *     allowed object is
     *     {@link GetProgramStatusRequestDTO }
     *     
     */
    public void setGetProgramStatusRequestDTO(GetProgramStatusRequestDTO value) {
        this.getProgramStatusRequestDTO = value;
    }

}
