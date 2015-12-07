
package com.realworldrobotics.hiegen.wsdl;

import javax.xml.bind.annotation.*;
import javax.xml.datatype.XMLGregorianCalendar;
import java.util.ArrayList;
import java.util.List;


/**
 * <p>Java class for FormMetaData complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="FormMetaData">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="formInstanceId">
 *           &lt;complexType>
 *             &lt;simpleContent>
 *               &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
 *                 &lt;attribute name="ConceptName" type="{http://www.w3.org/2001/XMLSchema}string" />
 *               &lt;/extension>
 *             &lt;/simpleContent>
 *           &lt;/complexType>
 *         &lt;/element>
 *         &lt;element name="formInstanceVersion">
 *           &lt;complexType>
 *             &lt;simpleContent>
 *               &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
 *                 &lt;attribute name="ConceptName" type="{http://www.w3.org/2001/XMLSchema}string" />
 *               &lt;/extension>
 *             &lt;/simpleContent>
 *           &lt;/complexType>
 *         &lt;/element>
 *         &lt;element name="formInstanceCreationTimeStamp">
 *           &lt;complexType>
 *             &lt;simpleContent>
 *               &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>dateTime">
 *                 &lt;attribute name="ConceptName" type="{http://www.w3.org/2001/XMLSchema}string" />
 *               &lt;/extension>
 *             &lt;/simpleContent>
 *           &lt;/complexType>
 *         &lt;/element>
 *         &lt;element name="formInstanceOperationMode" minOccurs="0">
 *           &lt;complexType>
 *             &lt;simpleContent>
 *               &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
 *                 &lt;attribute name="ConceptName" type="{http://www.w3.org/2001/XMLSchema}string" />
 *               &lt;/extension>
 *             &lt;/simpleContent>
 *           &lt;/complexType>
 *         &lt;/element>
 *         &lt;element name="formInstanceDescription" minOccurs="0">
 *           &lt;complexType>
 *             &lt;simpleContent>
 *               &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
 *                 &lt;attribute name="ConceptName" type="{http://www.w3.org/2001/XMLSchema}string" />
 *               &lt;/extension>
 *             &lt;/simpleContent>
 *           &lt;/complexType>
 *         &lt;/element>
 *         &lt;element name="formDefinitionId">
 *           &lt;complexType>
 *             &lt;simpleContent>
 *               &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
 *                 &lt;attribute name="ConceptName" type="{http://www.w3.org/2001/XMLSchema}string" />
 *               &lt;/extension>
 *             &lt;/simpleContent>
 *           &lt;/complexType>
 *         &lt;/element>
 *         &lt;element name="formDefinitionVersion">
 *           &lt;complexType>
 *             &lt;simpleContent>
 *               &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
 *                 &lt;attribute name="ConceptName" type="{http://www.w3.org/2001/XMLSchema}string" />
 *               &lt;/extension>
 *             &lt;/simpleContent>
 *           &lt;/complexType>
 *         &lt;/element>
 *         &lt;element name="formDefinitionDescription" minOccurs="0">
 *           &lt;complexType>
 *             &lt;simpleContent>
 *               &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
 *                 &lt;attribute name="ConceptName" type="{http://www.w3.org/2001/XMLSchema}string" />
 *               &lt;/extension>
 *             &lt;/simpleContent>
 *           &lt;/complexType>
 *         &lt;/element>
 *         &lt;element name="formDefinitionTitle">
 *           &lt;complexType>
 *             &lt;simpleContent>
 *               &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
 *                 &lt;attribute name="ConceptName" type="{http://www.w3.org/2001/XMLSchema}string" />
 *               &lt;/extension>
 *             &lt;/simpleContent>
 *           &lt;/complexType>
 *         &lt;/element>
 *         &lt;element name="encryptedFlag" minOccurs="0">
 *           &lt;complexType>
 *             &lt;simpleContent>
 *               &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
 *                 &lt;attribute name="ConceptName" type="{http://www.w3.org/2001/XMLSchema}string" />
 *               &lt;/extension>
 *             &lt;/simpleContent>
 *           &lt;/complexType>
 *         &lt;/element>
 *         &lt;element name="signatures" minOccurs="0">
 *           &lt;complexType>
 *             &lt;simpleContent>
 *               &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
 *                 &lt;attribute name="ConceptName" type="{http://www.w3.org/2001/XMLSchema}string" />
 *               &lt;/extension>
 *             &lt;/simpleContent>
 *           &lt;/complexType>
 *         &lt;/element>
 *         &lt;element name="recipientAccount" minOccurs="0">
 *           &lt;complexType>
 *             &lt;simpleContent>
 *               &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
 *                 &lt;attribute name="ConceptName" type="{http://www.w3.org/2001/XMLSchema}string" />
 *               &lt;/extension>
 *             &lt;/simpleContent>
 *           &lt;/complexType>
 *         &lt;/element>
 *         &lt;element name="copyToRecipientAccounts" minOccurs="0">
 *           &lt;complexType>
 *             &lt;complexContent>
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                 &lt;sequence>
 *                   &lt;element name="ccRecipientAccount" maxOccurs="unbounded" minOccurs="0">
 *                     &lt;complexType>
 *                       &lt;simpleContent>
 *                         &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
 *                           &lt;attribute name="ConceptName" type="{http://www.w3.org/2001/XMLSchema}string" />
 *                         &lt;/extension>
 *                       &lt;/simpleContent>
 *                     &lt;/complexType>
 *                   &lt;/element>
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
@XmlType(name = "FormMetaData", namespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formInstanceMeta", propOrder = {
    "formInstanceId",
    "formInstanceVersion",
    "formInstanceCreationTimeStamp",
    "formInstanceOperationMode",
    "formInstanceDescription",
    "formDefinitionId",
    "formDefinitionVersion",
    "formDefinitionDescription",
    "formDefinitionTitle",
    "encryptedFlag",
    "signatures",
    "recipientAccount",
    "copyToRecipientAccounts"
})
public class FormMetaData {

    @XmlElement(required = true)
    protected FormMetaData.FormInstanceId formInstanceId;
    @XmlElement(required = true)
    protected FormMetaData.FormInstanceVersion formInstanceVersion;
    @XmlElement(required = true)
    protected FormMetaData.FormInstanceCreationTimeStamp formInstanceCreationTimeStamp;
    protected FormMetaData.FormInstanceOperationMode formInstanceOperationMode;
    protected FormMetaData.FormInstanceDescription formInstanceDescription;
    @XmlElement(required = true)
    protected FormMetaData.FormDefinitionId formDefinitionId;
    @XmlElement(required = true)
    protected FormMetaData.FormDefinitionVersion formDefinitionVersion;
    protected FormMetaData.FormDefinitionDescription formDefinitionDescription;
    @XmlElement(required = true)
    protected FormMetaData.FormDefinitionTitle formDefinitionTitle;
    protected FormMetaData.EncryptedFlag encryptedFlag;
    protected FormMetaData.Signatures signatures;
    protected FormMetaData.RecipientAccount recipientAccount;
    protected FormMetaData.CopyToRecipientAccounts copyToRecipientAccounts;

    /**
     * Gets the value of the formInstanceId property.
     * 
     * @return
     *     possible object is
     *     {@link FormMetaData.FormInstanceId }
     *     
     */
    public FormMetaData.FormInstanceId getFormInstanceId() {
        return formInstanceId;
    }

    /**
     * Sets the value of the formInstanceId property.
     * 
     * @param value
     *     allowed object is
     *     {@link FormMetaData.FormInstanceId }
     *     
     */
    public void setFormInstanceId(FormMetaData.FormInstanceId value) {
        this.formInstanceId = value;
    }

    /**
     * Gets the value of the formInstanceVersion property.
     * 
     * @return
     *     possible object is
     *     {@link FormMetaData.FormInstanceVersion }
     *     
     */
    public FormMetaData.FormInstanceVersion getFormInstanceVersion() {
        return formInstanceVersion;
    }

    /**
     * Sets the value of the formInstanceVersion property.
     * 
     * @param value
     *     allowed object is
     *     {@link FormMetaData.FormInstanceVersion }
     *     
     */
    public void setFormInstanceVersion(FormMetaData.FormInstanceVersion value) {
        this.formInstanceVersion = value;
    }

    /**
     * Gets the value of the formInstanceCreationTimeStamp property.
     * 
     * @return
     *     possible object is
     *     {@link FormMetaData.FormInstanceCreationTimeStamp }
     *     
     */
    public FormMetaData.FormInstanceCreationTimeStamp getFormInstanceCreationTimeStamp() {
        return formInstanceCreationTimeStamp;
    }

    /**
     * Sets the value of the formInstanceCreationTimeStamp property.
     * 
     * @param value
     *     allowed object is
     *     {@link FormMetaData.FormInstanceCreationTimeStamp }
     *     
     */
    public void setFormInstanceCreationTimeStamp(FormMetaData.FormInstanceCreationTimeStamp value) {
        this.formInstanceCreationTimeStamp = value;
    }

    /**
     * Gets the value of the formInstanceOperationMode property.
     * 
     * @return
     *     possible object is
     *     {@link FormMetaData.FormInstanceOperationMode }
     *     
     */
    public FormMetaData.FormInstanceOperationMode getFormInstanceOperationMode() {
        return formInstanceOperationMode;
    }

    /**
     * Sets the value of the formInstanceOperationMode property.
     * 
     * @param value
     *     allowed object is
     *     {@link FormMetaData.FormInstanceOperationMode }
     *     
     */
    public void setFormInstanceOperationMode(FormMetaData.FormInstanceOperationMode value) {
        this.formInstanceOperationMode = value;
    }

    /**
     * Gets the value of the formInstanceDescription property.
     * 
     * @return
     *     possible object is
     *     {@link FormMetaData.FormInstanceDescription }
     *     
     */
    public FormMetaData.FormInstanceDescription getFormInstanceDescription() {
        return formInstanceDescription;
    }

    /**
     * Sets the value of the formInstanceDescription property.
     * 
     * @param value
     *     allowed object is
     *     {@link FormMetaData.FormInstanceDescription }
     *     
     */
    public void setFormInstanceDescription(FormMetaData.FormInstanceDescription value) {
        this.formInstanceDescription = value;
    }

    /**
     * Gets the value of the formDefinitionId property.
     * 
     * @return
     *     possible object is
     *     {@link FormMetaData.FormDefinitionId }
     *     
     */
    public FormMetaData.FormDefinitionId getFormDefinitionId() {
        return formDefinitionId;
    }

    /**
     * Sets the value of the formDefinitionId property.
     * 
     * @param value
     *     allowed object is
     *     {@link FormMetaData.FormDefinitionId }
     *     
     */
    public void setFormDefinitionId(FormMetaData.FormDefinitionId value) {
        this.formDefinitionId = value;
    }

    /**
     * Gets the value of the formDefinitionVersion property.
     * 
     * @return
     *     possible object is
     *     {@link FormMetaData.FormDefinitionVersion }
     *     
     */
    public FormMetaData.FormDefinitionVersion getFormDefinitionVersion() {
        return formDefinitionVersion;
    }

    /**
     * Sets the value of the formDefinitionVersion property.
     * 
     * @param value
     *     allowed object is
     *     {@link FormMetaData.FormDefinitionVersion }
     *     
     */
    public void setFormDefinitionVersion(FormMetaData.FormDefinitionVersion value) {
        this.formDefinitionVersion = value;
    }

    /**
     * Gets the value of the formDefinitionDescription property.
     * 
     * @return
     *     possible object is
     *     {@link FormMetaData.FormDefinitionDescription }
     *     
     */
    public FormMetaData.FormDefinitionDescription getFormDefinitionDescription() {
        return formDefinitionDescription;
    }

    /**
     * Sets the value of the formDefinitionDescription property.
     * 
     * @param value
     *     allowed object is
     *     {@link FormMetaData.FormDefinitionDescription }
     *     
     */
    public void setFormDefinitionDescription(FormMetaData.FormDefinitionDescription value) {
        this.formDefinitionDescription = value;
    }

    /**
     * Gets the value of the formDefinitionTitle property.
     * 
     * @return
     *     possible object is
     *     {@link FormMetaData.FormDefinitionTitle }
     *     
     */
    public FormMetaData.FormDefinitionTitle getFormDefinitionTitle() {
        return formDefinitionTitle;
    }

    /**
     * Sets the value of the formDefinitionTitle property.
     * 
     * @param value
     *     allowed object is
     *     {@link FormMetaData.FormDefinitionTitle }
     *     
     */
    public void setFormDefinitionTitle(FormMetaData.FormDefinitionTitle value) {
        this.formDefinitionTitle = value;
    }

    /**
     * Gets the value of the encryptedFlag property.
     * 
     * @return
     *     possible object is
     *     {@link FormMetaData.EncryptedFlag }
     *     
     */
    public FormMetaData.EncryptedFlag getEncryptedFlag() {
        return encryptedFlag;
    }

    /**
     * Sets the value of the encryptedFlag property.
     * 
     * @param value
     *     allowed object is
     *     {@link FormMetaData.EncryptedFlag }
     *     
     */
    public void setEncryptedFlag(FormMetaData.EncryptedFlag value) {
        this.encryptedFlag = value;
    }

    /**
     * Gets the value of the signatures property.
     * 
     * @return
     *     possible object is
     *     {@link FormMetaData.Signatures }
     *     
     */
    public FormMetaData.Signatures getSignatures() {
        return signatures;
    }

    /**
     * Sets the value of the signatures property.
     * 
     * @param value
     *     allowed object is
     *     {@link FormMetaData.Signatures }
     *     
     */
    public void setSignatures(FormMetaData.Signatures value) {
        this.signatures = value;
    }

    /**
     * Gets the value of the recipientAccount property.
     * 
     * @return
     *     possible object is
     *     {@link FormMetaData.RecipientAccount }
     *     
     */
    public FormMetaData.RecipientAccount getRecipientAccount() {
        return recipientAccount;
    }

    /**
     * Sets the value of the recipientAccount property.
     * 
     * @param value
     *     allowed object is
     *     {@link FormMetaData.RecipientAccount }
     *     
     */
    public void setRecipientAccount(FormMetaData.RecipientAccount value) {
        this.recipientAccount = value;
    }

    /**
     * Gets the value of the copyToRecipientAccounts property.
     * 
     * @return
     *     possible object is
     *     {@link FormMetaData.CopyToRecipientAccounts }
     *     
     */
    public FormMetaData.CopyToRecipientAccounts getCopyToRecipientAccounts() {
        return copyToRecipientAccounts;
    }

    /**
     * Sets the value of the copyToRecipientAccounts property.
     * 
     * @param value
     *     allowed object is
     *     {@link FormMetaData.CopyToRecipientAccounts }
     *     
     */
    public void setCopyToRecipientAccounts(FormMetaData.CopyToRecipientAccounts value) {
        this.copyToRecipientAccounts = value;
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
     *         &lt;element name="ccRecipientAccount" maxOccurs="unbounded" minOccurs="0">
     *           &lt;complexType>
     *             &lt;simpleContent>
     *               &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
     *                 &lt;attribute name="ConceptName" type="{http://www.w3.org/2001/XMLSchema}string" />
     *               &lt;/extension>
     *             &lt;/simpleContent>
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
    @XmlType(name = "", propOrder = {
        "ccRecipientAccount"
    })
    public static class CopyToRecipientAccounts {

        @XmlElement(namespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formInstanceMeta")
        protected List<FormMetaData.CopyToRecipientAccounts.CcRecipientAccount> ccRecipientAccount;

        /**
         * Gets the value of the ccRecipientAccount property.
         * 
         * <p>
         * This accessor method returns a reference to the live list,
         * not a snapshot. Therefore any modification you make to the
         * returned list will be present inside the JAXB object.
         * This is why there is not a <CODE>set</CODE> method for the ccRecipientAccount property.
         * 
         * <p>
         * For example, to add a new item, do as follows:
         * <pre>
         *    getCcRecipientAccount().add(newItem);
         * </pre>
         * 
         * 
         * <p>
         * Objects of the following type(s) are allowed in the list
         * {@link FormMetaData.CopyToRecipientAccounts.CcRecipientAccount }
         * 
         * 
         */
        public List<FormMetaData.CopyToRecipientAccounts.CcRecipientAccount> getCcRecipientAccount() {
            if (ccRecipientAccount == null) {
                ccRecipientAccount = new ArrayList<FormMetaData.CopyToRecipientAccounts.CcRecipientAccount>();
            }
            return this.ccRecipientAccount;
        }


        /**
         * <p>Java class for anonymous complex type.
         * 
         * <p>The following schema fragment specifies the expected content contained within this class.
         * 
         * <pre>
         * &lt;complexType>
         *   &lt;simpleContent>
         *     &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
         *       &lt;attribute name="ConceptName" type="{http://www.w3.org/2001/XMLSchema}string" />
         *     &lt;/extension>
         *   &lt;/simpleContent>
         * &lt;/complexType>
         * </pre>
         * 
         * 
         */
        @XmlAccessorType(XmlAccessType.FIELD)
        @XmlType(name = "", propOrder = {
            "value"
        })
        public static class CcRecipientAccount {

            @XmlValue
            protected String value;
            @XmlAttribute(name = "ConceptName")
            protected String conceptName;

            /**
             * Gets the value of the value property.
             * 
             * @return
             *     possible object is
             *     {@link String }
             *     
             */
            public String getValue() {
                return value;
            }

            /**
             * Sets the value of the value property.
             * 
             * @param value
             *     allowed object is
             *     {@link String }
             *     
             */
            public void setValue(String value) {
                this.value = value;
            }

            /**
             * Gets the value of the conceptName property.
             * 
             * @return
             *     possible object is
             *     {@link String }
             *     
             */
            public String getConceptName() {
                return conceptName;
            }

            /**
             * Sets the value of the conceptName property.
             * 
             * @param value
             *     allowed object is
             *     {@link String }
             *     
             */
            public void setConceptName(String value) {
                this.conceptName = value;
            }

        }

    }


    /**
     * <p>Java class for anonymous complex type.
     * 
     * <p>The following schema fragment specifies the expected content contained within this class.
     * 
     * <pre>
     * &lt;complexType>
     *   &lt;simpleContent>
     *     &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
     *       &lt;attribute name="ConceptName" type="{http://www.w3.org/2001/XMLSchema}string" />
     *     &lt;/extension>
     *   &lt;/simpleContent>
     * &lt;/complexType>
     * </pre>
     * 
     * 
     */
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "", propOrder = {
        "value"
    })
    public static class EncryptedFlag {

        @XmlValue
        protected String value;
        @XmlAttribute(name = "ConceptName")
        protected String conceptName;

        /**
         * Gets the value of the value property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getValue() {
            return value;
        }

        /**
         * Sets the value of the value property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setValue(String value) {
            this.value = value;
        }

        /**
         * Gets the value of the conceptName property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getConceptName() {
            return conceptName;
        }

        /**
         * Sets the value of the conceptName property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setConceptName(String value) {
            this.conceptName = value;
        }

    }


    /**
     * <p>Java class for anonymous complex type.
     * 
     * <p>The following schema fragment specifies the expected content contained within this class.
     * 
     * <pre>
     * &lt;complexType>
     *   &lt;simpleContent>
     *     &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
     *       &lt;attribute name="ConceptName" type="{http://www.w3.org/2001/XMLSchema}string" />
     *     &lt;/extension>
     *   &lt;/simpleContent>
     * &lt;/complexType>
     * </pre>
     * 
     * 
     */
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "", propOrder = {
        "value"
    })
    public static class FormDefinitionDescription {

        @XmlValue
        protected String value;
        @XmlAttribute(name = "ConceptName")
        protected String conceptName;

        /**
         * Gets the value of the value property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getValue() {
            return value;
        }

        /**
         * Sets the value of the value property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setValue(String value) {
            this.value = value;
        }

        /**
         * Gets the value of the conceptName property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getConceptName() {
            return conceptName;
        }

        /**
         * Sets the value of the conceptName property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setConceptName(String value) {
            this.conceptName = value;
        }

    }


    /**
     * <p>Java class for anonymous complex type.
     * 
     * <p>The following schema fragment specifies the expected content contained within this class.
     * 
     * <pre>
     * &lt;complexType>
     *   &lt;simpleContent>
     *     &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
     *       &lt;attribute name="ConceptName" type="{http://www.w3.org/2001/XMLSchema}string" />
     *     &lt;/extension>
     *   &lt;/simpleContent>
     * &lt;/complexType>
     * </pre>
     * 
     * 
     */
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "", propOrder = {
        "value"
    })
    public static class FormDefinitionId {

        @XmlValue
        protected String value;
        @XmlAttribute(name = "ConceptName")
        protected String conceptName;

        /**
         * Gets the value of the value property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getValue() {
            return value;
        }

        /**
         * Sets the value of the value property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setValue(String value) {
            this.value = value;
        }

        /**
         * Gets the value of the conceptName property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getConceptName() {
            return conceptName;
        }

        /**
         * Sets the value of the conceptName property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setConceptName(String value) {
            this.conceptName = value;
        }

    }


    /**
     * <p>Java class for anonymous complex type.
     * 
     * <p>The following schema fragment specifies the expected content contained within this class.
     * 
     * <pre>
     * &lt;complexType>
     *   &lt;simpleContent>
     *     &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
     *       &lt;attribute name="ConceptName" type="{http://www.w3.org/2001/XMLSchema}string" />
     *     &lt;/extension>
     *   &lt;/simpleContent>
     * &lt;/complexType>
     * </pre>
     * 
     * 
     */
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "", propOrder = {
        "value"
    })
    public static class FormDefinitionTitle {

        @XmlValue
        protected String value;
        @XmlAttribute(name = "ConceptName")
        protected String conceptName;

        /**
         * Gets the value of the value property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getValue() {
            return value;
        }

        /**
         * Sets the value of the value property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setValue(String value) {
            this.value = value;
        }

        /**
         * Gets the value of the conceptName property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getConceptName() {
            return conceptName;
        }

        /**
         * Sets the value of the conceptName property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setConceptName(String value) {
            this.conceptName = value;
        }

    }


    /**
     * <p>Java class for anonymous complex type.
     * 
     * <p>The following schema fragment specifies the expected content contained within this class.
     * 
     * <pre>
     * &lt;complexType>
     *   &lt;simpleContent>
     *     &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
     *       &lt;attribute name="ConceptName" type="{http://www.w3.org/2001/XMLSchema}string" />
     *     &lt;/extension>
     *   &lt;/simpleContent>
     * &lt;/complexType>
     * </pre>
     * 
     * 
     */
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "", propOrder = {
        "value"
    })
    public static class FormDefinitionVersion {

        @XmlValue
        protected String value;
        @XmlAttribute(name = "ConceptName")
        protected String conceptName;

        /**
         * Gets the value of the value property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getValue() {
            return value;
        }

        /**
         * Sets the value of the value property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setValue(String value) {
            this.value = value;
        }

        /**
         * Gets the value of the conceptName property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getConceptName() {
            return conceptName;
        }

        /**
         * Sets the value of the conceptName property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setConceptName(String value) {
            this.conceptName = value;
        }

    }


    /**
     * <p>Java class for anonymous complex type.
     * 
     * <p>The following schema fragment specifies the expected content contained within this class.
     * 
     * <pre>
     * &lt;complexType>
     *   &lt;simpleContent>
     *     &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>dateTime">
     *       &lt;attribute name="ConceptName" type="{http://www.w3.org/2001/XMLSchema}string" />
     *     &lt;/extension>
     *   &lt;/simpleContent>
     * &lt;/complexType>
     * </pre>
     * 
     * 
     */
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "", propOrder = {
        "value"
    })
    public static class FormInstanceCreationTimeStamp {

        @XmlValue
        @XmlSchemaType(name = "dateTime")
        protected XMLGregorianCalendar value;
        @XmlAttribute(name = "ConceptName")
        protected String conceptName;

        /**
         * Gets the value of the value property.
         * 
         * @return
         *     possible object is
         *     {@link XMLGregorianCalendar }
         *     
         */
        public XMLGregorianCalendar getValue() {
            return value;
        }

        /**
         * Sets the value of the value property.
         * 
         * @param value
         *     allowed object is
         *     {@link XMLGregorianCalendar }
         *     
         */
        public void setValue(XMLGregorianCalendar value) {
            this.value = value;
        }

        /**
         * Gets the value of the conceptName property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getConceptName() {
            return conceptName;
        }

        /**
         * Sets the value of the conceptName property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setConceptName(String value) {
            this.conceptName = value;
        }

    }


    /**
     * <p>Java class for anonymous complex type.
     * 
     * <p>The following schema fragment specifies the expected content contained within this class.
     * 
     * <pre>
     * &lt;complexType>
     *   &lt;simpleContent>
     *     &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
     *       &lt;attribute name="ConceptName" type="{http://www.w3.org/2001/XMLSchema}string" />
     *     &lt;/extension>
     *   &lt;/simpleContent>
     * &lt;/complexType>
     * </pre>
     * 
     * 
     */
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "", propOrder = {
        "value"
    })
    public static class FormInstanceDescription {

        @XmlValue
        protected String value;
        @XmlAttribute(name = "ConceptName")
        protected String conceptName;

        /**
         * Gets the value of the value property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getValue() {
            return value;
        }

        /**
         * Sets the value of the value property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setValue(String value) {
            this.value = value;
        }

        /**
         * Gets the value of the conceptName property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getConceptName() {
            return conceptName;
        }

        /**
         * Sets the value of the conceptName property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setConceptName(String value) {
            this.conceptName = value;
        }

    }


    /**
     * <p>Java class for anonymous complex type.
     * 
     * <p>The following schema fragment specifies the expected content contained within this class.
     * 
     * <pre>
     * &lt;complexType>
     *   &lt;simpleContent>
     *     &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
     *       &lt;attribute name="ConceptName" type="{http://www.w3.org/2001/XMLSchema}string" />
     *     &lt;/extension>
     *   &lt;/simpleContent>
     * &lt;/complexType>
     * </pre>
     * 
     * 
     */
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "", propOrder = {
        "value"
    })
    public static class FormInstanceId {

        @XmlValue
        protected String value;
        @XmlAttribute(name = "ConceptName")
        protected String conceptName;

        /**
         * Gets the value of the value property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getValue() {
            return value;
        }

        /**
         * Sets the value of the value property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setValue(String value) {
            this.value = value;
        }

        /**
         * Gets the value of the conceptName property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getConceptName() {
            return conceptName;
        }

        /**
         * Sets the value of the conceptName property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setConceptName(String value) {
            this.conceptName = value;
        }

    }


    /**
     * <p>Java class for anonymous complex type.
     * 
     * <p>The following schema fragment specifies the expected content contained within this class.
     * 
     * <pre>
     * &lt;complexType>
     *   &lt;simpleContent>
     *     &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
     *       &lt;attribute name="ConceptName" type="{http://www.w3.org/2001/XMLSchema}string" />
     *     &lt;/extension>
     *   &lt;/simpleContent>
     * &lt;/complexType>
     * </pre>
     * 
     * 
     */
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "", propOrder = {
        "value"
    })
    public static class FormInstanceOperationMode {

        @XmlValue
        protected String value;
        @XmlAttribute(name = "ConceptName")
        protected String conceptName;

        /**
         * Gets the value of the value property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getValue() {
            return value;
        }

        /**
         * Sets the value of the value property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setValue(String value) {
            this.value = value;
        }

        /**
         * Gets the value of the conceptName property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getConceptName() {
            return conceptName;
        }

        /**
         * Sets the value of the conceptName property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setConceptName(String value) {
            this.conceptName = value;
        }

    }


    /**
     * <p>Java class for anonymous complex type.
     * 
     * <p>The following schema fragment specifies the expected content contained within this class.
     * 
     * <pre>
     * &lt;complexType>
     *   &lt;simpleContent>
     *     &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
     *       &lt;attribute name="ConceptName" type="{http://www.w3.org/2001/XMLSchema}string" />
     *     &lt;/extension>
     *   &lt;/simpleContent>
     * &lt;/complexType>
     * </pre>
     * 
     * 
     */
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "", propOrder = {
        "value"
    })
    public static class FormInstanceVersion {

        @XmlValue
        protected String value;
        @XmlAttribute(name = "ConceptName")
        protected String conceptName;

        /**
         * Gets the value of the value property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getValue() {
            return value;
        }

        /**
         * Sets the value of the value property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setValue(String value) {
            this.value = value;
        }

        /**
         * Gets the value of the conceptName property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getConceptName() {
            return conceptName;
        }

        /**
         * Sets the value of the conceptName property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setConceptName(String value) {
            this.conceptName = value;
        }

    }


    /**
     * <p>Java class for anonymous complex type.
     * 
     * <p>The following schema fragment specifies the expected content contained within this class.
     * 
     * <pre>
     * &lt;complexType>
     *   &lt;simpleContent>
     *     &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
     *       &lt;attribute name="ConceptName" type="{http://www.w3.org/2001/XMLSchema}string" />
     *     &lt;/extension>
     *   &lt;/simpleContent>
     * &lt;/complexType>
     * </pre>
     * 
     * 
     */
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "", propOrder = {
        "value"
    })
    public static class RecipientAccount {

        @XmlValue
        protected String value;
        @XmlAttribute(name = "ConceptName")
        protected String conceptName;

        /**
         * Gets the value of the value property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getValue() {
            return value;
        }

        /**
         * Sets the value of the value property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setValue(String value) {
            this.value = value;
        }

        /**
         * Gets the value of the conceptName property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getConceptName() {
            return conceptName;
        }

        /**
         * Sets the value of the conceptName property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setConceptName(String value) {
            this.conceptName = value;
        }

    }


    /**
     * <p>Java class for anonymous complex type.
     * 
     * <p>The following schema fragment specifies the expected content contained within this class.
     * 
     * <pre>
     * &lt;complexType>
     *   &lt;simpleContent>
     *     &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
     *       &lt;attribute name="ConceptName" type="{http://www.w3.org/2001/XMLSchema}string" />
     *     &lt;/extension>
     *   &lt;/simpleContent>
     * &lt;/complexType>
     * </pre>
     * 
     * 
     */
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "", propOrder = {
        "value"
    })
    public static class Signatures {

        @XmlValue
        protected String value;
        @XmlAttribute(name = "ConceptName")
        protected String conceptName;

        /**
         * Gets the value of the value property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getValue() {
            return value;
        }

        /**
         * Sets the value of the value property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setValue(String value) {
            this.value = value;
        }

        /**
         * Gets the value of the conceptName property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getConceptName() {
            return conceptName;
        }

        /**
         * Sets the value of the conceptName property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setConceptName(String value) {
            this.conceptName = value;
        }

    }

}
