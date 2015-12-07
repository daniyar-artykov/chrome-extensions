
package com.realworldrobotics.hiegen.wsdl;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;
import javax.xml.bind.annotation.adapters.NormalizedStringAdapter;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;


/**
 * <p>Java class for GetDeliveryOptionsResponse complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="GetDeliveryOptionsResponse">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="return">
 *           &lt;complexType>
 *             &lt;complexContent>
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                 &lt;sequence>
 *                   &lt;element name="URL" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *                   &lt;element name="messageID" minOccurs="0">
 *                     &lt;simpleType>
 *                       &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *                         &lt;maxLength value="100"/>
 *                       &lt;/restriction>
 *                     &lt;/simpleType>
 *                   &lt;/element>
 *                   &lt;element name="recipientAccount" type="{http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession}AccountId" minOccurs="0"/>
 *                   &lt;element name="senderAccount" type="{http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession}AccountId" minOccurs="0"/>
 *                   &lt;element name="senderPassword" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *                 &lt;/sequence>
 *               &lt;/restriction>
 *             &lt;/complexContent>
 *           &lt;/complexType>
 *         &lt;/element>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "GetDeliveryOptionsResponse", propOrder = {
    "_return"
})
public class GetDeliveryOptionsResponse {

    @XmlElement(name = "return", required = true)
    protected GetDeliveryOptionsResponse.Return _return;

    /**
     * Gets the value of the return property.
     * 
     * @return
     *     possible object is
     *     {@link GetDeliveryOptionsResponse.Return }
     *     
     */
    public GetDeliveryOptionsResponse.Return getReturn() {
        return _return;
    }

    /**
     * Sets the value of the return property.
     * 
     * @param value
     *     allowed object is
     *     {@link GetDeliveryOptionsResponse.Return }
     *     
     */
    public void setReturn(GetDeliveryOptionsResponse.Return value) {
        this._return = value;
    }


    /**
     * <p>Java class for anonymous complex type.
     * 
     * <p>The following schema fragment specifies the expected content contained within this class.
     * 
     * <pre>
     * &lt;complexType>
     *   &lt;complexContent>
     *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *       &lt;sequence>
     *         &lt;element name="URL" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
     *         &lt;element name="messageID" minOccurs="0">
     *           &lt;simpleType>
     *             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
     *               &lt;maxLength value="100"/>
     *             &lt;/restriction>
     *           &lt;/simpleType>
     *         &lt;/element>
     *         &lt;element name="recipientAccount" type="{http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession}AccountId" minOccurs="0"/>
     *         &lt;element name="senderAccount" type="{http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession}AccountId" minOccurs="0"/>
     *         &lt;element name="senderPassword" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
     *       &lt;/sequence>
     *     &lt;/restriction>
     *   &lt;/complexContent>
     * &lt;/complexType>
     * </pre>
     * 
     * 
     */
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "", propOrder = {
        "url",
        "messageID",
        "recipientAccount",
        "senderAccount",
        "senderPassword"
    })
    public static class Return {

        @XmlElement(name = "URL")
        protected String url;
        protected String messageID;
        @XmlJavaTypeAdapter(NormalizedStringAdapter.class)
        protected String recipientAccount;
        @XmlJavaTypeAdapter(NormalizedStringAdapter.class)
        protected String senderAccount;
        protected String senderPassword;

        /**
         * Gets the value of the url property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getURL() {
            return url;
        }

        /**
         * Sets the value of the url property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setURL(String value) {
            this.url = value;
        }

        /**
         * Gets the value of the messageID property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getMessageID() {
            return messageID;
        }

        /**
         * Sets the value of the messageID property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setMessageID(String value) {
            this.messageID = value;
        }

        /**
         * Gets the value of the recipientAccount property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getRecipientAccount() {
            return recipientAccount;
        }

        /**
         * Sets the value of the recipientAccount property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setRecipientAccount(String value) {
            this.recipientAccount = value;
        }

        /**
         * Gets the value of the senderAccount property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getSenderAccount() {
            return senderAccount;
        }

        /**
         * Sets the value of the senderAccount property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setSenderAccount(String value) {
            this.senderAccount = value;
        }

        /**
         * Gets the value of the senderPassword property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getSenderPassword() {
            return senderPassword;
        }

        /**
         * Sets the value of the senderPassword property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setSenderPassword(String value) {
            this.senderPassword = value;
        }

    }

}
