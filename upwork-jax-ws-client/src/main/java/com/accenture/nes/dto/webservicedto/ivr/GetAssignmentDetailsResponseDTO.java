
package com.accenture.nes.dto.webservicedto.ivr;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;
import com.accenture.nes.util.BaseResponseDTO;
import com.accenture.nes.webservices.ObligationDetails;


/**
 * <p>Java class for GetAssignmentDetailsResponseDTO complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="GetAssignmentDetailsResponseDTO">
 *   &lt;complexContent>
 *     &lt;extension base="{http://util.nes.accenture.com}baseResponseDTO">
 *       &lt;sequence>
 *         &lt;element name="messageCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="obligationDetails" type="{http://webservices.nes.accenture.com/}obligationDetails" maxOccurs="unbounded" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/extension>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "GetAssignmentDetailsResponseDTO", propOrder = {
    "messageCode",
    "obligationDetails"
})
public class GetAssignmentDetailsResponseDTO
    extends BaseResponseDTO
{

    protected String messageCode;
    @XmlElement(nillable = true)
    protected List<ObligationDetails> obligationDetails;

    /**
     * Gets the value of the messageCode property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMessageCode() {
        return messageCode;
    }

    /**
     * Sets the value of the messageCode property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMessageCode(String value) {
        this.messageCode = value;
    }

    /**
     * Gets the value of the obligationDetails property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the obligationDetails property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getObligationDetails().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link ObligationDetails }
     * 
     * 
     */
    public List<ObligationDetails> getObligationDetails() {
        if (obligationDetails == null) {
            obligationDetails = new ArrayList<ObligationDetails>();
        }
        return this.obligationDetails;
    }

}
