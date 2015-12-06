
package com.accenture.nes.webservices;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for ticketDetailsResponseDto complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ticketDetailsResponseDto">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="createdDate" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ticketDescription" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ticketID" type="{http://www.w3.org/2001/XMLSchema}long"/>
 *         &lt;element name="ticketStatus" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ticketDetailsResponseDto", propOrder = {
    "createdDate",
    "ticketDescription",
    "ticketID",
    "ticketStatus"
})
public class TicketDetailsResponseDto {

    protected String createdDate;
    protected String ticketDescription;
    protected long ticketID;
    protected String ticketStatus;

    /**
     * Gets the value of the createdDate property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCreatedDate() {
        return createdDate;
    }

    /**
     * Sets the value of the createdDate property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCreatedDate(String value) {
        this.createdDate = value;
    }

    /**
     * Gets the value of the ticketDescription property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTicketDescription() {
        return ticketDescription;
    }

    /**
     * Sets the value of the ticketDescription property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTicketDescription(String value) {
        this.ticketDescription = value;
    }

    /**
     * Gets the value of the ticketID property.
     * 
     */
    public long getTicketID() {
        return ticketID;
    }

    /**
     * Sets the value of the ticketID property.
     * 
     */
    public void setTicketID(long value) {
        this.ticketID = value;
    }

    /**
     * Gets the value of the ticketStatus property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTicketStatus() {
        return ticketStatus;
    }

    /**
     * Sets the value of the ticketStatus property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTicketStatus(String value) {
        this.ticketStatus = value;
    }

}
