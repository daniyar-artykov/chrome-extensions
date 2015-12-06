
package com.accenture.nes.webservices;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;
import com.accenture.nes.dto.webservicedto.ivr.GetTaskDetailRequestDTO;


/**
 * <p>Java class for GetTaskDetails complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="GetTaskDetails">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="getTaskDetailRequestDTO" type="{http://ivr.webservicedto.dto.nes.accenture.com}GetTaskDetailRequestDTO" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "GetTaskDetails", propOrder = {
    "getTaskDetailRequestDTO"
})
public class GetTaskDetails {

    protected GetTaskDetailRequestDTO getTaskDetailRequestDTO;

    /**
     * Gets the value of the getTaskDetailRequestDTO property.
     * 
     * @return
     *     possible object is
     *     {@link GetTaskDetailRequestDTO }
     *     
     */
    public GetTaskDetailRequestDTO getGetTaskDetailRequestDTO() {
        return getTaskDetailRequestDTO;
    }

    /**
     * Sets the value of the getTaskDetailRequestDTO property.
     * 
     * @param value
     *     allowed object is
     *     {@link GetTaskDetailRequestDTO }
     *     
     */
    public void setGetTaskDetailRequestDTO(GetTaskDetailRequestDTO value) {
        this.getTaskDetailRequestDTO = value;
    }

}
