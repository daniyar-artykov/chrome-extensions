
package com.realworldrobotics.hiegen.wsdl;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for FormData complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="FormData">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="formMetaData" type="{http://www.hiegen.realworldrobotics/hiegenforms/1.1/formInstanceMeta}FormMetaData"/>
 *         &lt;element name="submittedData" type="{urn:hiegen.realworldrobotics.genericform.model}Form"/>
 *         &lt;element name="responseData" minOccurs="0">
 *           &lt;complexType>
 *             &lt;complexContent>
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                 &lt;sequence>
 *                   &lt;element name="applicationResponseCode" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *                   &lt;element name="applicationResponseMessage" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *                   &lt;element name="receivingSystemId" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *                   &lt;sequence minOccurs="0">
 *                     &lt;element name="actionId" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *                     &lt;element name="actionContainer" type="{http://www.w3.org/2001/XMLSchema}anyType"/>
 *                   &lt;/sequence>
 *                   &lt;element name="data" type="{http://www.w3.org/2001/XMLSchema}anyType" minOccurs="0"/>
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
@XmlType(name = "FormData", namespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formInstanceMeta", propOrder = {
    "formMetaData",
    "submittedData",
    "responseData"
})
public class FormData {

    @XmlElement(required = true)
    protected FormMetaData formMetaData;
    @XmlElement(required = true)
    protected Form submittedData;
    protected FormData.ResponseData responseData;

    /**
     * Gets the value of the formMetaData property.
     * 
     * @return
     *     possible object is
     *     {@link FormMetaData }
     *     
     */
    public FormMetaData getFormMetaData() {
        return formMetaData;
    }

    /**
     * Sets the value of the formMetaData property.
     * 
     * @param value
     *     allowed object is
     *     {@link FormMetaData }
     *     
     */
    public void setFormMetaData(FormMetaData value) {
        this.formMetaData = value;
    }

    /**
     * Gets the value of the submittedData property.
     * 
     * @return
     *     possible object is
     *     {@link Form }
     *     
     */
    public Form getSubmittedData() {
        return submittedData;
    }

    /**
     * Sets the value of the submittedData property.
     * 
     * @param value
     *     allowed object is
     *     {@link Form }
     *     
     */
    public void setSubmittedData(Form value) {
        this.submittedData = value;
    }

    /**
     * Gets the value of the responseData property.
     * 
     * @return
     *     possible object is
     *     {@link FormData.ResponseData }
     *     
     */
    public FormData.ResponseData getResponseData() {
        return responseData;
    }

    /**
     * Sets the value of the responseData property.
     * 
     * @param value
     *     allowed object is
     *     {@link FormData.ResponseData }
     *     
     */
    public void setResponseData(FormData.ResponseData value) {
        this.responseData = value;
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
     *         &lt;element name="applicationResponseCode" type="{http://www.w3.org/2001/XMLSchema}string"/>
     *         &lt;element name="applicationResponseMessage" type="{http://www.w3.org/2001/XMLSchema}string"/>
     *         &lt;element name="receivingSystemId" type="{http://www.w3.org/2001/XMLSchema}string"/>
     *         &lt;sequence minOccurs="0">
     *           &lt;element name="actionId" type="{http://www.w3.org/2001/XMLSchema}string"/>
     *           &lt;element name="actionContainer" type="{http://www.w3.org/2001/XMLSchema}anyType"/>
     *         &lt;/sequence>
     *         &lt;element name="data" type="{http://www.w3.org/2001/XMLSchema}anyType" minOccurs="0"/>
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
        "applicationResponseCode",
        "applicationResponseMessage",
        "receivingSystemId",
        "actionId",
        "actionContainer",
        "data"
    })
    public static class ResponseData {

        @XmlElement(namespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formInstanceMeta", required = true)
        protected String applicationResponseCode;
        @XmlElement(namespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formInstanceMeta", required = true)
        protected String applicationResponseMessage;
        @XmlElement(namespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formInstanceMeta", required = true)
        protected String receivingSystemId;
        @XmlElement(namespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formInstanceMeta")
        protected String actionId;
        @XmlElement(namespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formInstanceMeta")
        protected Object actionContainer;
        @XmlElement(namespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formInstanceMeta")
        protected Object data;

        /**
         * Gets the value of the applicationResponseCode property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getApplicationResponseCode() {
            return applicationResponseCode;
        }

        /**
         * Sets the value of the applicationResponseCode property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setApplicationResponseCode(String value) {
            this.applicationResponseCode = value;
        }

        /**
         * Gets the value of the applicationResponseMessage property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getApplicationResponseMessage() {
            return applicationResponseMessage;
        }

        /**
         * Sets the value of the applicationResponseMessage property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setApplicationResponseMessage(String value) {
            this.applicationResponseMessage = value;
        }

        /**
         * Gets the value of the receivingSystemId property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getReceivingSystemId() {
            return receivingSystemId;
        }

        /**
         * Sets the value of the receivingSystemId property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setReceivingSystemId(String value) {
            this.receivingSystemId = value;
        }

        /**
         * Gets the value of the actionId property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getActionId() {
            return actionId;
        }

        /**
         * Sets the value of the actionId property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setActionId(String value) {
            this.actionId = value;
        }

        /**
         * Gets the value of the actionContainer property.
         * 
         * @return
         *     possible object is
         *     {@link Object }
         *     
         */
        public Object getActionContainer() {
            return actionContainer;
        }

        /**
         * Sets the value of the actionContainer property.
         * 
         * @param value
         *     allowed object is
         *     {@link Object }
         *     
         */
        public void setActionContainer(Object value) {
            this.actionContainer = value;
        }

        /**
         * Gets the value of the data property.
         * 
         * @return
         *     possible object is
         *     {@link Object }
         *     
         */
        public Object getData() {
            return data;
        }

        /**
         * Sets the value of the data property.
         * 
         * @param value
         *     allowed object is
         *     {@link Object }
         *     
         */
        public void setData(Object value) {
            this.data = value;
        }

    }

}
