
package com.accenture.nes.webservices;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;
import com.accenture.nes.webservicedto.ivr.GetTaskDetailResponceDTO;


/**
 * <p>Java class for GetTaskDetailsResponse complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="GetTaskDetailsResponse">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="return" type="{http://ivr.webservicedto.nes.accenture.com}GetTaskDetailResponceDTO" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "GetTaskDetailsResponse", propOrder = {
    "_return"
})
public class GetTaskDetailsResponse {

    @XmlElement(name = "return")
    protected GetTaskDetailResponceDTO _return;

    /**
     * Gets the value of the return property.
     * 
     * @return
     *     possible object is
     *     {@link GetTaskDetailResponceDTO }
     *     
     */
    public GetTaskDetailResponceDTO getReturn() {
        return _return;
    }

    /**
     * Sets the value of the return property.
     * 
     * @param value
     *     allowed object is
     *     {@link GetTaskDetailResponceDTO }
     *     
     */
    public void setReturn(GetTaskDetailResponceDTO value) {
        this._return = value;
    }

}
