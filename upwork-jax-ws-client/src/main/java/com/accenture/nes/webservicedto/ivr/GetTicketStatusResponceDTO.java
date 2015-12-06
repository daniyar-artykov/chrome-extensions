
package com.accenture.nes.webservicedto.ivr;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;
import com.accenture.nes.util.BaseResponseDTO;
import com.accenture.nes.webservices.TicketDetailsResponseDto;


/**
 * <p>Java class for GetTicketStatusResponceDTO complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="GetTicketStatusResponceDTO">
 *   &lt;complexContent>
 *     &lt;extension base="{http://util.nes.accenture.com}baseResponseDTO">
 *       &lt;sequence>
 *         &lt;element name="messageCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ticketResponseDtos" type="{http://webservices.nes.accenture.com/}ticketDetailsResponseDto" maxOccurs="unbounded" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/extension>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "GetTicketStatusResponceDTO", propOrder = {
    "messageCode",
    "ticketResponseDtos"
})
public class GetTicketStatusResponceDTO
    extends BaseResponseDTO
{

    protected String messageCode;
    @XmlElement(nillable = true)
    protected List<TicketDetailsResponseDto> ticketResponseDtos;

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
     * Gets the value of the ticketResponseDtos property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the ticketResponseDtos property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getTicketResponseDtos().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link TicketDetailsResponseDto }
     * 
     * 
     */
    public List<TicketDetailsResponseDto> getTicketResponseDtos() {
        if (ticketResponseDtos == null) {
            ticketResponseDtos = new ArrayList<TicketDetailsResponseDto>();
        }
        return this.ticketResponseDtos;
    }

}
