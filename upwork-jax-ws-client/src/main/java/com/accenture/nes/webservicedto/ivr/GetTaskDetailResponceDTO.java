
package com.accenture.nes.webservicedto.ivr;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;
import com.accenture.nes.util.BaseResponseDTO;


/**
 * <p>Java class for GetTaskDetailResponceDTO complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="GetTaskDetailResponceDTO">
 *   &lt;complexContent>
 *     &lt;extension base="{http://util.nes.accenture.com}baseResponseDTO">
 *       &lt;sequence>
 *         &lt;element name="dueDate" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="messageCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="nextUpcomingGoal" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="nextUpcomingMilestone" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="nextUpcomingtask" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="status" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/extension>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "GetTaskDetailResponceDTO", propOrder = {
    "dueDate",
    "messageCode",
    "nextUpcomingGoal",
    "nextUpcomingMilestone",
    "nextUpcomingtask",
    "status"
})
public class GetTaskDetailResponceDTO
    extends BaseResponseDTO
{

    protected String dueDate;
    protected String messageCode;
    protected String nextUpcomingGoal;
    protected String nextUpcomingMilestone;
    protected String nextUpcomingtask;
    protected String status;

    /**
     * Gets the value of the dueDate property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDueDate() {
        return dueDate;
    }

    /**
     * Sets the value of the dueDate property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDueDate(String value) {
        this.dueDate = value;
    }

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
     * Gets the value of the nextUpcomingGoal property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNextUpcomingGoal() {
        return nextUpcomingGoal;
    }

    /**
     * Sets the value of the nextUpcomingGoal property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNextUpcomingGoal(String value) {
        this.nextUpcomingGoal = value;
    }

    /**
     * Gets the value of the nextUpcomingMilestone property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNextUpcomingMilestone() {
        return nextUpcomingMilestone;
    }

    /**
     * Sets the value of the nextUpcomingMilestone property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNextUpcomingMilestone(String value) {
        this.nextUpcomingMilestone = value;
    }

    /**
     * Gets the value of the nextUpcomingtask property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNextUpcomingtask() {
        return nextUpcomingtask;
    }

    /**
     * Sets the value of the nextUpcomingtask property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNextUpcomingtask(String value) {
        this.nextUpcomingtask = value;
    }

    /**
     * Gets the value of the status property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getStatus() {
        return status;
    }

    /**
     * Sets the value of the status property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setStatus(String value) {
        this.status = value;
    }

}
