
package com.upwork.test;

import java.math.BigDecimal;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.bind.annotation.XmlType;
import javax.xml.datatype.XMLGregorianCalendar;


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
 *         &lt;element name="Assertion">
 *           &lt;complexType>
 *             &lt;complexContent>
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                 &lt;sequence>
 *                   &lt;element name="Issuer" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *                   &lt;element name="ds:Signature">
 *                     &lt;complexType>
 *                       &lt;complexContent>
 *                         &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                           &lt;sequence>
 *                             &lt;element name="ds:SignedInfo">
 *                               &lt;complexType>
 *                                 &lt;complexContent>
 *                                   &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                                     &lt;sequence>
 *                                       &lt;element name="ds:CanonicalizationMethod">
 *                                         &lt;complexType>
 *                                           &lt;complexContent>
 *                                             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                                               &lt;attribute name="Algorithm" type="{http://www.w3.org/2001/XMLSchema}string" />
 *                                             &lt;/restriction>
 *                                           &lt;/complexContent>
 *                                         &lt;/complexType>
 *                                       &lt;/element>
 *                                       &lt;element name="ds:SignatureMethod">
 *                                         &lt;complexType>
 *                                           &lt;complexContent>
 *                                             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                                               &lt;attribute name="Algorithm" type="{http://www.w3.org/2001/XMLSchema}string" />
 *                                             &lt;/restriction>
 *                                           &lt;/complexContent>
 *                                         &lt;/complexType>
 *                                       &lt;/element>
 *                                       &lt;element name="ds:Reference">
 *                                         &lt;complexType>
 *                                           &lt;complexContent>
 *                                             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                                               &lt;sequence>
 *                                                 &lt;element name="ds:Transforms">
 *                                                   &lt;complexType>
 *                                                     &lt;complexContent>
 *                                                       &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                                                         &lt;sequence>
 *                                                           &lt;element name="ds:Transform">
 *                                                             &lt;complexType>
 *                                                               &lt;complexContent>
 *                                                                 &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                                                                   &lt;attribute name="Algorithm" type="{http://www.w3.org/2001/XMLSchema}string" />
 *                                                                 &lt;/restriction>
 *                                                               &lt;/complexContent>
 *                                                             &lt;/complexType>
 *                                                           &lt;/element>
 *                                                         &lt;/sequence>
 *                                                       &lt;/restriction>
 *                                                     &lt;/complexContent>
 *                                                   &lt;/complexType>
 *                                                 &lt;/element>
 *                                                 &lt;element name="ds:DigestMethod">
 *                                                   &lt;complexType>
 *                                                     &lt;complexContent>
 *                                                       &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                                                         &lt;attribute name="Algorithm" type="{http://www.w3.org/2001/XMLSchema}string" />
 *                                                       &lt;/restriction>
 *                                                     &lt;/complexContent>
 *                                                   &lt;/complexType>
 *                                                 &lt;/element>
 *                                                 &lt;element name="ds:DigestValue" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *                                               &lt;/sequence>
 *                                               &lt;attribute name="URI" type="{http://www.w3.org/2001/XMLSchema}string" />
 *                                             &lt;/restriction>
 *                                           &lt;/complexContent>
 *                                         &lt;/complexType>
 *                                       &lt;/element>
 *                                     &lt;/sequence>
 *                                   &lt;/restriction>
 *                                 &lt;/complexContent>
 *                               &lt;/complexType>
 *                             &lt;/element>
 *                             &lt;element name="ds:SignatureValue" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *                             &lt;element name="KeyInfo">
 *                               &lt;complexType>
 *                                 &lt;complexContent>
 *                                   &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                                     &lt;sequence>
 *                                       &lt;element name="ds:X509Data">
 *                                         &lt;complexType>
 *                                           &lt;complexContent>
 *                                             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                                               &lt;sequence>
 *                                                 &lt;element name="ds:X509Certificate" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *                                               &lt;/sequence>
 *                                             &lt;/restriction>
 *                                           &lt;/complexContent>
 *                                         &lt;/complexType>
 *                                       &lt;/element>
 *                                     &lt;/sequence>
 *                                   &lt;/restriction>
 *                                 &lt;/complexContent>
 *                               &lt;/complexType>
 *                             &lt;/element>
 *                           &lt;/sequence>
 *                         &lt;/restriction>
 *                       &lt;/complexContent>
 *                     &lt;/complexType>
 *                   &lt;/element>
 *                   &lt;element name="Subject">
 *                     &lt;complexType>
 *                       &lt;complexContent>
 *                         &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                           &lt;sequence>
 *                             &lt;element name="SubjectConfirmation">
 *                               &lt;complexType>
 *                                 &lt;complexContent>
 *                                   &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                                     &lt;sequence>
 *                                       &lt;element name="SubjectConfirmationData">
 *                                         &lt;complexType>
 *                                           &lt;complexContent>
 *                                             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                                               &lt;attribute name="NotOnOrAfter" type="{http://www.w3.org/2001/XMLSchema}dateTime" />
 *                                             &lt;/restriction>
 *                                           &lt;/complexContent>
 *                                         &lt;/complexType>
 *                                       &lt;/element>
 *                                     &lt;/sequence>
 *                                     &lt;attribute name="Method" type="{http://www.w3.org/2001/XMLSchema}string" />
 *                                   &lt;/restriction>
 *                                 &lt;/complexContent>
 *                               &lt;/complexType>
 *                             &lt;/element>
 *                           &lt;/sequence>
 *                         &lt;/restriction>
 *                       &lt;/complexContent>
 *                     &lt;/complexType>
 *                   &lt;/element>
 *                   &lt;element name="Conditions">
 *                     &lt;complexType>
 *                       &lt;complexContent>
 *                         &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                           &lt;sequence>
 *                             &lt;element name="AudienceRestriction">
 *                               &lt;complexType>
 *                                 &lt;complexContent>
 *                                   &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                                     &lt;sequence>
 *                                       &lt;element name="Audience" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *                                     &lt;/sequence>
 *                                   &lt;/restriction>
 *                                 &lt;/complexContent>
 *                               &lt;/complexType>
 *                             &lt;/element>
 *                           &lt;/sequence>
 *                           &lt;attribute name="NotBefore" type="{http://www.w3.org/2001/XMLSchema}dateTime" />
 *                           &lt;attribute name="NotOnOrAfter" type="{http://www.w3.org/2001/XMLSchema}dateTime" />
 *                         &lt;/restriction>
 *                       &lt;/complexContent>
 *                     &lt;/complexType>
 *                   &lt;/element>
 *                   &lt;element name="AttributeStatement">
 *                     &lt;complexType>
 *                       &lt;complexContent>
 *                         &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                           &lt;sequence>
 *                             &lt;element name="Attribute">
 *                               &lt;complexType>
 *                                 &lt;complexContent>
 *                                   &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                                     &lt;sequence>
 *                                       &lt;element name="AttributeValue" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *                                     &lt;/sequence>
 *                                     &lt;attribute name="Name" type="{http://www.w3.org/2001/XMLSchema}string" />
 *                                   &lt;/restriction>
 *                                 &lt;/complexContent>
 *                               &lt;/complexType>
 *                             &lt;/element>
 *                           &lt;/sequence>
 *                         &lt;/restriction>
 *                       &lt;/complexContent>
 *                     &lt;/complexType>
 *                   &lt;/element>
 *                   &lt;element name="AuthnStatement">
 *                     &lt;complexType>
 *                       &lt;complexContent>
 *                         &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                           &lt;sequence>
 *                             &lt;element name="AuthnContext">
 *                               &lt;complexType>
 *                                 &lt;complexContent>
 *                                   &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                                     &lt;sequence>
 *                                       &lt;element name="AuthnContextClassRef" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *                                     &lt;/sequence>
 *                                   &lt;/restriction>
 *                                 &lt;/complexContent>
 *                               &lt;/complexType>
 *                             &lt;/element>
 *                           &lt;/sequence>
 *                           &lt;attribute name="AuthnInstant" type="{http://www.w3.org/2001/XMLSchema}dateTime" />
 *                         &lt;/restriction>
 *                       &lt;/complexContent>
 *                     &lt;/complexType>
 *                   &lt;/element>
 *                 &lt;/sequence>
 *                 &lt;attribute name="ID" type="{http://www.w3.org/2001/XMLSchema}string" />
 *                 &lt;attribute name="IssueInstant" type="{http://www.w3.org/2001/XMLSchema}dateTime" />
 *                 &lt;attribute name="Version" type="{http://www.w3.org/2001/XMLSchema}decimal" />
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
@XmlType(name = "", propOrder = {
    "assertion"
})
@XmlRootElement(name = "wsse:Security", namespace = "")
public class WsseSecurity {

    @XmlElement(name = "Assertion", required = true)
    protected WsseSecurity.Assertion assertion;

    /**
     * Gets the value of the assertion property.
     * 
     * @return
     *     possible object is
     *     {@link WsseSecurity.Assertion }
     *     
     */
    public WsseSecurity.Assertion getAssertion() {
        return assertion;
    }

    /**
     * Sets the value of the assertion property.
     * 
     * @param value
     *     allowed object is
     *     {@link WsseSecurity.Assertion }
     *     
     */
    public void setAssertion(WsseSecurity.Assertion value) {
        this.assertion = value;
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
     *         &lt;element name="Issuer" type="{http://www.w3.org/2001/XMLSchema}string"/>
     *         &lt;element name="ds:Signature">
     *           &lt;complexType>
     *             &lt;complexContent>
     *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *                 &lt;sequence>
     *                   &lt;element name="ds:SignedInfo">
     *                     &lt;complexType>
     *                       &lt;complexContent>
     *                         &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *                           &lt;sequence>
     *                             &lt;element name="ds:CanonicalizationMethod">
     *                               &lt;complexType>
     *                                 &lt;complexContent>
     *                                   &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *                                     &lt;attribute name="Algorithm" type="{http://www.w3.org/2001/XMLSchema}string" />
     *                                   &lt;/restriction>
     *                                 &lt;/complexContent>
     *                               &lt;/complexType>
     *                             &lt;/element>
     *                             &lt;element name="ds:SignatureMethod">
     *                               &lt;complexType>
     *                                 &lt;complexContent>
     *                                   &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *                                     &lt;attribute name="Algorithm" type="{http://www.w3.org/2001/XMLSchema}string" />
     *                                   &lt;/restriction>
     *                                 &lt;/complexContent>
     *                               &lt;/complexType>
     *                             &lt;/element>
     *                             &lt;element name="ds:Reference">
     *                               &lt;complexType>
     *                                 &lt;complexContent>
     *                                   &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *                                     &lt;sequence>
     *                                       &lt;element name="ds:Transforms">
     *                                         &lt;complexType>
     *                                           &lt;complexContent>
     *                                             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *                                               &lt;sequence>
     *                                                 &lt;element name="ds:Transform">
     *                                                   &lt;complexType>
     *                                                     &lt;complexContent>
     *                                                       &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *                                                         &lt;attribute name="Algorithm" type="{http://www.w3.org/2001/XMLSchema}string" />
     *                                                       &lt;/restriction>
     *                                                     &lt;/complexContent>
     *                                                   &lt;/complexType>
     *                                                 &lt;/element>
     *                                               &lt;/sequence>
     *                                             &lt;/restriction>
     *                                           &lt;/complexContent>
     *                                         &lt;/complexType>
     *                                       &lt;/element>
     *                                       &lt;element name="ds:DigestMethod">
     *                                         &lt;complexType>
     *                                           &lt;complexContent>
     *                                             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *                                               &lt;attribute name="Algorithm" type="{http://www.w3.org/2001/XMLSchema}string" />
     *                                             &lt;/restriction>
     *                                           &lt;/complexContent>
     *                                         &lt;/complexType>
     *                                       &lt;/element>
     *                                       &lt;element name="ds:DigestValue" type="{http://www.w3.org/2001/XMLSchema}string"/>
     *                                     &lt;/sequence>
     *                                     &lt;attribute name="URI" type="{http://www.w3.org/2001/XMLSchema}string" />
     *                                   &lt;/restriction>
     *                                 &lt;/complexContent>
     *                               &lt;/complexType>
     *                             &lt;/element>
     *                           &lt;/sequence>
     *                         &lt;/restriction>
     *                       &lt;/complexContent>
     *                     &lt;/complexType>
     *                   &lt;/element>
     *                   &lt;element name="ds:SignatureValue" type="{http://www.w3.org/2001/XMLSchema}string"/>
     *                   &lt;element name="KeyInfo">
     *                     &lt;complexType>
     *                       &lt;complexContent>
     *                         &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *                           &lt;sequence>
     *                             &lt;element name="ds:X509Data">
     *                               &lt;complexType>
     *                                 &lt;complexContent>
     *                                   &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *                                     &lt;sequence>
     *                                       &lt;element name="ds:X509Certificate" type="{http://www.w3.org/2001/XMLSchema}string"/>
     *                                     &lt;/sequence>
     *                                   &lt;/restriction>
     *                                 &lt;/complexContent>
     *                               &lt;/complexType>
     *                             &lt;/element>
     *                           &lt;/sequence>
     *                         &lt;/restriction>
     *                       &lt;/complexContent>
     *                     &lt;/complexType>
     *                   &lt;/element>
     *                 &lt;/sequence>
     *               &lt;/restriction>
     *             &lt;/complexContent>
     *           &lt;/complexType>
     *         &lt;/element>
     *         &lt;element name="Subject">
     *           &lt;complexType>
     *             &lt;complexContent>
     *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *                 &lt;sequence>
     *                   &lt;element name="SubjectConfirmation">
     *                     &lt;complexType>
     *                       &lt;complexContent>
     *                         &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *                           &lt;sequence>
     *                             &lt;element name="SubjectConfirmationData">
     *                               &lt;complexType>
     *                                 &lt;complexContent>
     *                                   &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *                                     &lt;attribute name="NotOnOrAfter" type="{http://www.w3.org/2001/XMLSchema}dateTime" />
     *                                   &lt;/restriction>
     *                                 &lt;/complexContent>
     *                               &lt;/complexType>
     *                             &lt;/element>
     *                           &lt;/sequence>
     *                           &lt;attribute name="Method" type="{http://www.w3.org/2001/XMLSchema}string" />
     *                         &lt;/restriction>
     *                       &lt;/complexContent>
     *                     &lt;/complexType>
     *                   &lt;/element>
     *                 &lt;/sequence>
     *               &lt;/restriction>
     *             &lt;/complexContent>
     *           &lt;/complexType>
     *         &lt;/element>
     *         &lt;element name="Conditions">
     *           &lt;complexType>
     *             &lt;complexContent>
     *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *                 &lt;sequence>
     *                   &lt;element name="AudienceRestriction">
     *                     &lt;complexType>
     *                       &lt;complexContent>
     *                         &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *                           &lt;sequence>
     *                             &lt;element name="Audience" type="{http://www.w3.org/2001/XMLSchema}string"/>
     *                           &lt;/sequence>
     *                         &lt;/restriction>
     *                       &lt;/complexContent>
     *                     &lt;/complexType>
     *                   &lt;/element>
     *                 &lt;/sequence>
     *                 &lt;attribute name="NotBefore" type="{http://www.w3.org/2001/XMLSchema}dateTime" />
     *                 &lt;attribute name="NotOnOrAfter" type="{http://www.w3.org/2001/XMLSchema}dateTime" />
     *               &lt;/restriction>
     *             &lt;/complexContent>
     *           &lt;/complexType>
     *         &lt;/element>
     *         &lt;element name="AttributeStatement">
     *           &lt;complexType>
     *             &lt;complexContent>
     *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *                 &lt;sequence>
     *                   &lt;element name="Attribute">
     *                     &lt;complexType>
     *                       &lt;complexContent>
     *                         &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *                           &lt;sequence>
     *                             &lt;element name="AttributeValue" type="{http://www.w3.org/2001/XMLSchema}string"/>
     *                           &lt;/sequence>
     *                           &lt;attribute name="Name" type="{http://www.w3.org/2001/XMLSchema}string" />
     *                         &lt;/restriction>
     *                       &lt;/complexContent>
     *                     &lt;/complexType>
     *                   &lt;/element>
     *                 &lt;/sequence>
     *               &lt;/restriction>
     *             &lt;/complexContent>
     *           &lt;/complexType>
     *         &lt;/element>
     *         &lt;element name="AuthnStatement">
     *           &lt;complexType>
     *             &lt;complexContent>
     *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *                 &lt;sequence>
     *                   &lt;element name="AuthnContext">
     *                     &lt;complexType>
     *                       &lt;complexContent>
     *                         &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *                           &lt;sequence>
     *                             &lt;element name="AuthnContextClassRef" type="{http://www.w3.org/2001/XMLSchema}string"/>
     *                           &lt;/sequence>
     *                         &lt;/restriction>
     *                       &lt;/complexContent>
     *                     &lt;/complexType>
     *                   &lt;/element>
     *                 &lt;/sequence>
     *                 &lt;attribute name="AuthnInstant" type="{http://www.w3.org/2001/XMLSchema}dateTime" />
     *               &lt;/restriction>
     *             &lt;/complexContent>
     *           &lt;/complexType>
     *         &lt;/element>
     *       &lt;/sequence>
     *       &lt;attribute name="ID" type="{http://www.w3.org/2001/XMLSchema}string" />
     *       &lt;attribute name="IssueInstant" type="{http://www.w3.org/2001/XMLSchema}dateTime" />
     *       &lt;attribute name="Version" type="{http://www.w3.org/2001/XMLSchema}decimal" />
     *     &lt;/restriction>
     *   &lt;/complexContent>
     * &lt;/complexType>
     * </pre>
     * 
     * 
     */
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "", propOrder = {
        "issuer",
        "dsSignature",
        "subject",
        "conditions",
        "attributeStatement",
        "authnStatement"
    })
    public static class Assertion {

        @XmlElement(name = "Issuer", required = true)
        protected String issuer;
        @XmlElement(name = "ds:Signature", required = true)
        protected WsseSecurity.Assertion.DsSignature dsSignature;
        @XmlElement(name = "Subject", required = true)
        protected WsseSecurity.Assertion.Subject subject;
        @XmlElement(name = "Conditions", required = true)
        protected WsseSecurity.Assertion.Conditions conditions;
        @XmlElement(name = "AttributeStatement", required = true)
        protected WsseSecurity.Assertion.AttributeStatement attributeStatement;
        @XmlElement(name = "AuthnStatement", required = true)
        protected WsseSecurity.Assertion.AuthnStatement authnStatement;
        @XmlAttribute(name = "ID")
        protected String id;
        @XmlAttribute(name = "IssueInstant")
        @XmlSchemaType(name = "dateTime")
        protected XMLGregorianCalendar issueInstant;
        @XmlAttribute(name = "Version")
        protected BigDecimal version;

        /**
         * Gets the value of the issuer property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getIssuer() {
            return issuer;
        }

        /**
         * Sets the value of the issuer property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setIssuer(String value) {
            this.issuer = value;
        }

        /**
         * Gets the value of the dsSignature property.
         * 
         * @return
         *     possible object is
         *     {@link WsseSecurity.Assertion.DsSignature }
         *     
         */
        public WsseSecurity.Assertion.DsSignature getDsSignature() {
            return dsSignature;
        }

        /**
         * Sets the value of the dsSignature property.
         * 
         * @param value
         *     allowed object is
         *     {@link WsseSecurity.Assertion.DsSignature }
         *     
         */
        public void setDsSignature(WsseSecurity.Assertion.DsSignature value) {
            this.dsSignature = value;
        }

        /**
         * Gets the value of the subject property.
         * 
         * @return
         *     possible object is
         *     {@link WsseSecurity.Assertion.Subject }
         *     
         */
        public WsseSecurity.Assertion.Subject getSubject() {
            return subject;
        }

        /**
         * Sets the value of the subject property.
         * 
         * @param value
         *     allowed object is
         *     {@link WsseSecurity.Assertion.Subject }
         *     
         */
        public void setSubject(WsseSecurity.Assertion.Subject value) {
            this.subject = value;
        }

        /**
         * Gets the value of the conditions property.
         * 
         * @return
         *     possible object is
         *     {@link WsseSecurity.Assertion.Conditions }
         *     
         */
        public WsseSecurity.Assertion.Conditions getConditions() {
            return conditions;
        }

        /**
         * Sets the value of the conditions property.
         * 
         * @param value
         *     allowed object is
         *     {@link WsseSecurity.Assertion.Conditions }
         *     
         */
        public void setConditions(WsseSecurity.Assertion.Conditions value) {
            this.conditions = value;
        }

        /**
         * Gets the value of the attributeStatement property.
         * 
         * @return
         *     possible object is
         *     {@link WsseSecurity.Assertion.AttributeStatement }
         *     
         */
        public WsseSecurity.Assertion.AttributeStatement getAttributeStatement() {
            return attributeStatement;
        }

        /**
         * Sets the value of the attributeStatement property.
         * 
         * @param value
         *     allowed object is
         *     {@link WsseSecurity.Assertion.AttributeStatement }
         *     
         */
        public void setAttributeStatement(WsseSecurity.Assertion.AttributeStatement value) {
            this.attributeStatement = value;
        }

        /**
         * Gets the value of the authnStatement property.
         * 
         * @return
         *     possible object is
         *     {@link WsseSecurity.Assertion.AuthnStatement }
         *     
         */
        public WsseSecurity.Assertion.AuthnStatement getAuthnStatement() {
            return authnStatement;
        }

        /**
         * Sets the value of the authnStatement property.
         * 
         * @param value
         *     allowed object is
         *     {@link WsseSecurity.Assertion.AuthnStatement }
         *     
         */
        public void setAuthnStatement(WsseSecurity.Assertion.AuthnStatement value) {
            this.authnStatement = value;
        }

        /**
         * Gets the value of the id property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getID() {
            return id;
        }

        /**
         * Sets the value of the id property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setID(String value) {
            this.id = value;
        }

        /**
         * Gets the value of the issueInstant property.
         * 
         * @return
         *     possible object is
         *     {@link XMLGregorianCalendar }
         *     
         */
        public XMLGregorianCalendar getIssueInstant() {
            return issueInstant;
        }

        /**
         * Sets the value of the issueInstant property.
         * 
         * @param value
         *     allowed object is
         *     {@link XMLGregorianCalendar }
         *     
         */
        public void setIssueInstant(XMLGregorianCalendar value) {
            this.issueInstant = value;
        }

        /**
         * Gets the value of the version property.
         * 
         * @return
         *     possible object is
         *     {@link BigDecimal }
         *     
         */
        public BigDecimal getVersion() {
            return version;
        }

        /**
         * Sets the value of the version property.
         * 
         * @param value
         *     allowed object is
         *     {@link BigDecimal }
         *     
         */
        public void setVersion(BigDecimal value) {
            this.version = value;
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
         *         &lt;element name="Attribute">
         *           &lt;complexType>
         *             &lt;complexContent>
         *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
         *                 &lt;sequence>
         *                   &lt;element name="AttributeValue" type="{http://www.w3.org/2001/XMLSchema}string"/>
         *                 &lt;/sequence>
         *                 &lt;attribute name="Name" type="{http://www.w3.org/2001/XMLSchema}string" />
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
        @XmlType(name = "", propOrder = {
            "attribute"
        })
        public static class AttributeStatement {

            @XmlElement(name = "Attribute", required = true)
            protected WsseSecurity.Assertion.AttributeStatement.Attribute attribute;

            /**
             * Gets the value of the attribute property.
             * 
             * @return
             *     possible object is
             *     {@link WsseSecurity.Assertion.AttributeStatement.Attribute }
             *     
             */
            public WsseSecurity.Assertion.AttributeStatement.Attribute getAttribute() {
                return attribute;
            }

            /**
             * Sets the value of the attribute property.
             * 
             * @param value
             *     allowed object is
             *     {@link WsseSecurity.Assertion.AttributeStatement.Attribute }
             *     
             */
            public void setAttribute(WsseSecurity.Assertion.AttributeStatement.Attribute value) {
                this.attribute = value;
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
             *         &lt;element name="AttributeValue" type="{http://www.w3.org/2001/XMLSchema}string"/>
             *       &lt;/sequence>
             *       &lt;attribute name="Name" type="{http://www.w3.org/2001/XMLSchema}string" />
             *     &lt;/restriction>
             *   &lt;/complexContent>
             * &lt;/complexType>
             * </pre>
             * 
             * 
             */
            @XmlAccessorType(XmlAccessType.FIELD)
            @XmlType(name = "", propOrder = {
                "attributeValue"
            })
            public static class Attribute {

                @XmlElement(name = "AttributeValue", required = true)
                protected String attributeValue;
                @XmlAttribute(name = "Name")
                protected String name;

                /**
                 * Gets the value of the attributeValue property.
                 * 
                 * @return
                 *     possible object is
                 *     {@link String }
                 *     
                 */
                public String getAttributeValue() {
                    return attributeValue;
                }

                /**
                 * Sets the value of the attributeValue property.
                 * 
                 * @param value
                 *     allowed object is
                 *     {@link String }
                 *     
                 */
                public void setAttributeValue(String value) {
                    this.attributeValue = value;
                }

                /**
                 * Gets the value of the name property.
                 * 
                 * @return
                 *     possible object is
                 *     {@link String }
                 *     
                 */
                public String getName() {
                    return name;
                }

                /**
                 * Sets the value of the name property.
                 * 
                 * @param value
                 *     allowed object is
                 *     {@link String }
                 *     
                 */
                public void setName(String value) {
                    this.name = value;
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
         *   &lt;complexContent>
         *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
         *       &lt;sequence>
         *         &lt;element name="AuthnContext">
         *           &lt;complexType>
         *             &lt;complexContent>
         *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
         *                 &lt;sequence>
         *                   &lt;element name="AuthnContextClassRef" type="{http://www.w3.org/2001/XMLSchema}string"/>
         *                 &lt;/sequence>
         *               &lt;/restriction>
         *             &lt;/complexContent>
         *           &lt;/complexType>
         *         &lt;/element>
         *       &lt;/sequence>
         *       &lt;attribute name="AuthnInstant" type="{http://www.w3.org/2001/XMLSchema}dateTime" />
         *     &lt;/restriction>
         *   &lt;/complexContent>
         * &lt;/complexType>
         * </pre>
         * 
         * 
         */
        @XmlAccessorType(XmlAccessType.FIELD)
        @XmlType(name = "", propOrder = {
            "authnContext"
        })
        public static class AuthnStatement {

            @XmlElement(name = "AuthnContext", required = true)
            protected WsseSecurity.Assertion.AuthnStatement.AuthnContext authnContext;
            @XmlAttribute(name = "AuthnInstant")
            @XmlSchemaType(name = "dateTime")
            protected XMLGregorianCalendar authnInstant;

            /**
             * Gets the value of the authnContext property.
             * 
             * @return
             *     possible object is
             *     {@link WsseSecurity.Assertion.AuthnStatement.AuthnContext }
             *     
             */
            public WsseSecurity.Assertion.AuthnStatement.AuthnContext getAuthnContext() {
                return authnContext;
            }

            /**
             * Sets the value of the authnContext property.
             * 
             * @param value
             *     allowed object is
             *     {@link WsseSecurity.Assertion.AuthnStatement.AuthnContext }
             *     
             */
            public void setAuthnContext(WsseSecurity.Assertion.AuthnStatement.AuthnContext value) {
                this.authnContext = value;
            }

            /**
             * Gets the value of the authnInstant property.
             * 
             * @return
             *     possible object is
             *     {@link XMLGregorianCalendar }
             *     
             */
            public XMLGregorianCalendar getAuthnInstant() {
                return authnInstant;
            }

            /**
             * Sets the value of the authnInstant property.
             * 
             * @param value
             *     allowed object is
             *     {@link XMLGregorianCalendar }
             *     
             */
            public void setAuthnInstant(XMLGregorianCalendar value) {
                this.authnInstant = value;
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
             *         &lt;element name="AuthnContextClassRef" type="{http://www.w3.org/2001/XMLSchema}string"/>
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
                "authnContextClassRef"
            })
            public static class AuthnContext {

                @XmlElement(name = "AuthnContextClassRef", required = true)
                protected String authnContextClassRef;

                /**
                 * Gets the value of the authnContextClassRef property.
                 * 
                 * @return
                 *     possible object is
                 *     {@link String }
                 *     
                 */
                public String getAuthnContextClassRef() {
                    return authnContextClassRef;
                }

                /**
                 * Sets the value of the authnContextClassRef property.
                 * 
                 * @param value
                 *     allowed object is
                 *     {@link String }
                 *     
                 */
                public void setAuthnContextClassRef(String value) {
                    this.authnContextClassRef = value;
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
         *   &lt;complexContent>
         *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
         *       &lt;sequence>
         *         &lt;element name="AudienceRestriction">
         *           &lt;complexType>
         *             &lt;complexContent>
         *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
         *                 &lt;sequence>
         *                   &lt;element name="Audience" type="{http://www.w3.org/2001/XMLSchema}string"/>
         *                 &lt;/sequence>
         *               &lt;/restriction>
         *             &lt;/complexContent>
         *           &lt;/complexType>
         *         &lt;/element>
         *       &lt;/sequence>
         *       &lt;attribute name="NotBefore" type="{http://www.w3.org/2001/XMLSchema}dateTime" />
         *       &lt;attribute name="NotOnOrAfter" type="{http://www.w3.org/2001/XMLSchema}dateTime" />
         *     &lt;/restriction>
         *   &lt;/complexContent>
         * &lt;/complexType>
         * </pre>
         * 
         * 
         */
        @XmlAccessorType(XmlAccessType.FIELD)
        @XmlType(name = "", propOrder = {
            "audienceRestriction"
        })
        public static class Conditions {

            @XmlElement(name = "AudienceRestriction", required = true)
            protected WsseSecurity.Assertion.Conditions.AudienceRestriction audienceRestriction;
            @XmlAttribute(name = "NotBefore")
            @XmlSchemaType(name = "dateTime")
            protected XMLGregorianCalendar notBefore;
            @XmlAttribute(name = "NotOnOrAfter")
            @XmlSchemaType(name = "dateTime")
            protected XMLGregorianCalendar notOnOrAfter;

            /**
             * Gets the value of the audienceRestriction property.
             * 
             * @return
             *     possible object is
             *     {@link WsseSecurity.Assertion.Conditions.AudienceRestriction }
             *     
             */
            public WsseSecurity.Assertion.Conditions.AudienceRestriction getAudienceRestriction() {
                return audienceRestriction;
            }

            /**
             * Sets the value of the audienceRestriction property.
             * 
             * @param value
             *     allowed object is
             *     {@link WsseSecurity.Assertion.Conditions.AudienceRestriction }
             *     
             */
            public void setAudienceRestriction(WsseSecurity.Assertion.Conditions.AudienceRestriction value) {
                this.audienceRestriction = value;
            }

            /**
             * Gets the value of the notBefore property.
             * 
             * @return
             *     possible object is
             *     {@link XMLGregorianCalendar }
             *     
             */
            public XMLGregorianCalendar getNotBefore() {
                return notBefore;
            }

            /**
             * Sets the value of the notBefore property.
             * 
             * @param value
             *     allowed object is
             *     {@link XMLGregorianCalendar }
             *     
             */
            public void setNotBefore(XMLGregorianCalendar value) {
                this.notBefore = value;
            }

            /**
             * Gets the value of the notOnOrAfter property.
             * 
             * @return
             *     possible object is
             *     {@link XMLGregorianCalendar }
             *     
             */
            public XMLGregorianCalendar getNotOnOrAfter() {
                return notOnOrAfter;
            }

            /**
             * Sets the value of the notOnOrAfter property.
             * 
             * @param value
             *     allowed object is
             *     {@link XMLGregorianCalendar }
             *     
             */
            public void setNotOnOrAfter(XMLGregorianCalendar value) {
                this.notOnOrAfter = value;
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
             *         &lt;element name="Audience" type="{http://www.w3.org/2001/XMLSchema}string"/>
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
                "audience"
            })
            public static class AudienceRestriction {

                @XmlElement(name = "Audience", required = true)
                protected String audience;

                /**
                 * Gets the value of the audience property.
                 * 
                 * @return
                 *     possible object is
                 *     {@link String }
                 *     
                 */
                public String getAudience() {
                    return audience;
                }

                /**
                 * Sets the value of the audience property.
                 * 
                 * @param value
                 *     allowed object is
                 *     {@link String }
                 *     
                 */
                public void setAudience(String value) {
                    this.audience = value;
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
         *   &lt;complexContent>
         *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
         *       &lt;sequence>
         *         &lt;element name="ds:SignedInfo">
         *           &lt;complexType>
         *             &lt;complexContent>
         *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
         *                 &lt;sequence>
         *                   &lt;element name="ds:CanonicalizationMethod">
         *                     &lt;complexType>
         *                       &lt;complexContent>
         *                         &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
         *                           &lt;attribute name="Algorithm" type="{http://www.w3.org/2001/XMLSchema}string" />
         *                         &lt;/restriction>
         *                       &lt;/complexContent>
         *                     &lt;/complexType>
         *                   &lt;/element>
         *                   &lt;element name="ds:SignatureMethod">
         *                     &lt;complexType>
         *                       &lt;complexContent>
         *                         &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
         *                           &lt;attribute name="Algorithm" type="{http://www.w3.org/2001/XMLSchema}string" />
         *                         &lt;/restriction>
         *                       &lt;/complexContent>
         *                     &lt;/complexType>
         *                   &lt;/element>
         *                   &lt;element name="ds:Reference">
         *                     &lt;complexType>
         *                       &lt;complexContent>
         *                         &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
         *                           &lt;sequence>
         *                             &lt;element name="ds:Transforms">
         *                               &lt;complexType>
         *                                 &lt;complexContent>
         *                                   &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
         *                                     &lt;sequence>
         *                                       &lt;element name="ds:Transform">
         *                                         &lt;complexType>
         *                                           &lt;complexContent>
         *                                             &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
         *                                               &lt;attribute name="Algorithm" type="{http://www.w3.org/2001/XMLSchema}string" />
         *                                             &lt;/restriction>
         *                                           &lt;/complexContent>
         *                                         &lt;/complexType>
         *                                       &lt;/element>
         *                                     &lt;/sequence>
         *                                   &lt;/restriction>
         *                                 &lt;/complexContent>
         *                               &lt;/complexType>
         *                             &lt;/element>
         *                             &lt;element name="ds:DigestMethod">
         *                               &lt;complexType>
         *                                 &lt;complexContent>
         *                                   &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
         *                                     &lt;attribute name="Algorithm" type="{http://www.w3.org/2001/XMLSchema}string" />
         *                                   &lt;/restriction>
         *                                 &lt;/complexContent>
         *                               &lt;/complexType>
         *                             &lt;/element>
         *                             &lt;element name="ds:DigestValue" type="{http://www.w3.org/2001/XMLSchema}string"/>
         *                           &lt;/sequence>
         *                           &lt;attribute name="URI" type="{http://www.w3.org/2001/XMLSchema}string" />
         *                         &lt;/restriction>
         *                       &lt;/complexContent>
         *                     &lt;/complexType>
         *                   &lt;/element>
         *                 &lt;/sequence>
         *               &lt;/restriction>
         *             &lt;/complexContent>
         *           &lt;/complexType>
         *         &lt;/element>
         *         &lt;element name="ds:SignatureValue" type="{http://www.w3.org/2001/XMLSchema}string"/>
         *         &lt;element name="KeyInfo">
         *           &lt;complexType>
         *             &lt;complexContent>
         *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
         *                 &lt;sequence>
         *                   &lt;element name="ds:X509Data">
         *                     &lt;complexType>
         *                       &lt;complexContent>
         *                         &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
         *                           &lt;sequence>
         *                             &lt;element name="ds:X509Certificate" type="{http://www.w3.org/2001/XMLSchema}string"/>
         *                           &lt;/sequence>
         *                         &lt;/restriction>
         *                       &lt;/complexContent>
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
        @XmlType(name = "", propOrder = {
            "dsSignedInfo",
            "dsSignatureValue",
            "keyInfo"
        })
        public static class DsSignature {

            @XmlElement(name = "ds:SignedInfo", required = true)
            protected WsseSecurity.Assertion.DsSignature.DsSignedInfo dsSignedInfo;
            @XmlElement(name = "ds:SignatureValue", required = true)
            protected String dsSignatureValue;
            @XmlElement(name = "KeyInfo", required = true)
            protected WsseSecurity.Assertion.DsSignature.KeyInfo keyInfo;

            /**
             * Gets the value of the dsSignedInfo property.
             * 
             * @return
             *     possible object is
             *     {@link WsseSecurity.Assertion.DsSignature.DsSignedInfo }
             *     
             */
            public WsseSecurity.Assertion.DsSignature.DsSignedInfo getDsSignedInfo() {
                return dsSignedInfo;
            }

            /**
             * Sets the value of the dsSignedInfo property.
             * 
             * @param value
             *     allowed object is
             *     {@link WsseSecurity.Assertion.DsSignature.DsSignedInfo }
             *     
             */
            public void setDsSignedInfo(WsseSecurity.Assertion.DsSignature.DsSignedInfo value) {
                this.dsSignedInfo = value;
            }

            /**
             * Gets the value of the dsSignatureValue property.
             * 
             * @return
             *     possible object is
             *     {@link String }
             *     
             */
            public String getDsSignatureValue() {
                return dsSignatureValue;
            }

            /**
             * Sets the value of the dsSignatureValue property.
             * 
             * @param value
             *     allowed object is
             *     {@link String }
             *     
             */
            public void setDsSignatureValue(String value) {
                this.dsSignatureValue = value;
            }

            /**
             * Gets the value of the keyInfo property.
             * 
             * @return
             *     possible object is
             *     {@link WsseSecurity.Assertion.DsSignature.KeyInfo }
             *     
             */
            public WsseSecurity.Assertion.DsSignature.KeyInfo getKeyInfo() {
                return keyInfo;
            }

            /**
             * Sets the value of the keyInfo property.
             * 
             * @param value
             *     allowed object is
             *     {@link WsseSecurity.Assertion.DsSignature.KeyInfo }
             *     
             */
            public void setKeyInfo(WsseSecurity.Assertion.DsSignature.KeyInfo value) {
                this.keyInfo = value;
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
             *         &lt;element name="ds:CanonicalizationMethod">
             *           &lt;complexType>
             *             &lt;complexContent>
             *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
             *                 &lt;attribute name="Algorithm" type="{http://www.w3.org/2001/XMLSchema}string" />
             *               &lt;/restriction>
             *             &lt;/complexContent>
             *           &lt;/complexType>
             *         &lt;/element>
             *         &lt;element name="ds:SignatureMethod">
             *           &lt;complexType>
             *             &lt;complexContent>
             *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
             *                 &lt;attribute name="Algorithm" type="{http://www.w3.org/2001/XMLSchema}string" />
             *               &lt;/restriction>
             *             &lt;/complexContent>
             *           &lt;/complexType>
             *         &lt;/element>
             *         &lt;element name="ds:Reference">
             *           &lt;complexType>
             *             &lt;complexContent>
             *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
             *                 &lt;sequence>
             *                   &lt;element name="ds:Transforms">
             *                     &lt;complexType>
             *                       &lt;complexContent>
             *                         &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
             *                           &lt;sequence>
             *                             &lt;element name="ds:Transform">
             *                               &lt;complexType>
             *                                 &lt;complexContent>
             *                                   &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
             *                                     &lt;attribute name="Algorithm" type="{http://www.w3.org/2001/XMLSchema}string" />
             *                                   &lt;/restriction>
             *                                 &lt;/complexContent>
             *                               &lt;/complexType>
             *                             &lt;/element>
             *                           &lt;/sequence>
             *                         &lt;/restriction>
             *                       &lt;/complexContent>
             *                     &lt;/complexType>
             *                   &lt;/element>
             *                   &lt;element name="ds:DigestMethod">
             *                     &lt;complexType>
             *                       &lt;complexContent>
             *                         &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
             *                           &lt;attribute name="Algorithm" type="{http://www.w3.org/2001/XMLSchema}string" />
             *                         &lt;/restriction>
             *                       &lt;/complexContent>
             *                     &lt;/complexType>
             *                   &lt;/element>
             *                   &lt;element name="ds:DigestValue" type="{http://www.w3.org/2001/XMLSchema}string"/>
             *                 &lt;/sequence>
             *                 &lt;attribute name="URI" type="{http://www.w3.org/2001/XMLSchema}string" />
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
            @XmlType(name = "", propOrder = {
                "dsCanonicalizationMethod",
                "dsSignatureMethod",
                "dsReference"
            })
            public static class DsSignedInfo {

                @XmlElement(name = "ds:CanonicalizationMethod", required = true)
                protected WsseSecurity.Assertion.DsSignature.DsSignedInfo.DsCanonicalizationMethod dsCanonicalizationMethod;
                @XmlElement(name = "ds:SignatureMethod", required = true)
                protected WsseSecurity.Assertion.DsSignature.DsSignedInfo.DsSignatureMethod dsSignatureMethod;
                @XmlElement(name = "ds:Reference", required = true)
                protected WsseSecurity.Assertion.DsSignature.DsSignedInfo.DsReference dsReference;

                /**
                 * Gets the value of the dsCanonicalizationMethod property.
                 * 
                 * @return
                 *     possible object is
                 *     {@link WsseSecurity.Assertion.DsSignature.DsSignedInfo.DsCanonicalizationMethod }
                 *     
                 */
                public WsseSecurity.Assertion.DsSignature.DsSignedInfo.DsCanonicalizationMethod getDsCanonicalizationMethod() {
                    return dsCanonicalizationMethod;
                }

                /**
                 * Sets the value of the dsCanonicalizationMethod property.
                 * 
                 * @param value
                 *     allowed object is
                 *     {@link WsseSecurity.Assertion.DsSignature.DsSignedInfo.DsCanonicalizationMethod }
                 *     
                 */
                public void setDsCanonicalizationMethod(WsseSecurity.Assertion.DsSignature.DsSignedInfo.DsCanonicalizationMethod value) {
                    this.dsCanonicalizationMethod = value;
                }

                /**
                 * Gets the value of the dsSignatureMethod property.
                 * 
                 * @return
                 *     possible object is
                 *     {@link WsseSecurity.Assertion.DsSignature.DsSignedInfo.DsSignatureMethod }
                 *     
                 */
                public WsseSecurity.Assertion.DsSignature.DsSignedInfo.DsSignatureMethod getDsSignatureMethod() {
                    return dsSignatureMethod;
                }

                /**
                 * Sets the value of the dsSignatureMethod property.
                 * 
                 * @param value
                 *     allowed object is
                 *     {@link WsseSecurity.Assertion.DsSignature.DsSignedInfo.DsSignatureMethod }
                 *     
                 */
                public void setDsSignatureMethod(WsseSecurity.Assertion.DsSignature.DsSignedInfo.DsSignatureMethod value) {
                    this.dsSignatureMethod = value;
                }

                /**
                 * Gets the value of the dsReference property.
                 * 
                 * @return
                 *     possible object is
                 *     {@link WsseSecurity.Assertion.DsSignature.DsSignedInfo.DsReference }
                 *     
                 */
                public WsseSecurity.Assertion.DsSignature.DsSignedInfo.DsReference getDsReference() {
                    return dsReference;
                }

                /**
                 * Sets the value of the dsReference property.
                 * 
                 * @param value
                 *     allowed object is
                 *     {@link WsseSecurity.Assertion.DsSignature.DsSignedInfo.DsReference }
                 *     
                 */
                public void setDsReference(WsseSecurity.Assertion.DsSignature.DsSignedInfo.DsReference value) {
                    this.dsReference = value;
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
                 *       &lt;attribute name="Algorithm" type="{http://www.w3.org/2001/XMLSchema}string" />
                 *     &lt;/restriction>
                 *   &lt;/complexContent>
                 * &lt;/complexType>
                 * </pre>
                 * 
                 * 
                 */
                @XmlAccessorType(XmlAccessType.FIELD)
                @XmlType(name = "")
                public static class DsCanonicalizationMethod {

                    @XmlAttribute(name = "Algorithm")
                    protected String algorithm;

                    /**
                     * Gets the value of the algorithm property.
                     * 
                     * @return
                     *     possible object is
                     *     {@link String }
                     *     
                     */
                    public String getAlgorithm() {
                        return algorithm;
                    }

                    /**
                     * Sets the value of the algorithm property.
                     * 
                     * @param value
                     *     allowed object is
                     *     {@link String }
                     *     
                     */
                    public void setAlgorithm(String value) {
                        this.algorithm = value;
                    }

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
                 *         &lt;element name="ds:Transforms">
                 *           &lt;complexType>
                 *             &lt;complexContent>
                 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
                 *                 &lt;sequence>
                 *                   &lt;element name="ds:Transform">
                 *                     &lt;complexType>
                 *                       &lt;complexContent>
                 *                         &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
                 *                           &lt;attribute name="Algorithm" type="{http://www.w3.org/2001/XMLSchema}string" />
                 *                         &lt;/restriction>
                 *                       &lt;/complexContent>
                 *                     &lt;/complexType>
                 *                   &lt;/element>
                 *                 &lt;/sequence>
                 *               &lt;/restriction>
                 *             &lt;/complexContent>
                 *           &lt;/complexType>
                 *         &lt;/element>
                 *         &lt;element name="ds:DigestMethod">
                 *           &lt;complexType>
                 *             &lt;complexContent>
                 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
                 *                 &lt;attribute name="Algorithm" type="{http://www.w3.org/2001/XMLSchema}string" />
                 *               &lt;/restriction>
                 *             &lt;/complexContent>
                 *           &lt;/complexType>
                 *         &lt;/element>
                 *         &lt;element name="ds:DigestValue" type="{http://www.w3.org/2001/XMLSchema}string"/>
                 *       &lt;/sequence>
                 *       &lt;attribute name="URI" type="{http://www.w3.org/2001/XMLSchema}string" />
                 *     &lt;/restriction>
                 *   &lt;/complexContent>
                 * &lt;/complexType>
                 * </pre>
                 * 
                 * 
                 */
                @XmlAccessorType(XmlAccessType.FIELD)
                @XmlType(name = "", propOrder = {
                    "dsTransforms",
                    "dsDigestMethod",
                    "dsDigestValue"
                })
                public static class DsReference {

                    @XmlElement(name = "ds:Transforms", required = true)
                    protected WsseSecurity.Assertion.DsSignature.DsSignedInfo.DsReference.DsTransforms dsTransforms;
                    @XmlElement(name = "ds:DigestMethod", required = true)
                    protected WsseSecurity.Assertion.DsSignature.DsSignedInfo.DsReference.DsDigestMethod dsDigestMethod;
                    @XmlElement(name = "ds:DigestValue", required = true)
                    protected String dsDigestValue;
                    @XmlAttribute(name = "URI")
                    protected String uri;

                    /**
                     * Gets the value of the dsTransforms property.
                     * 
                     * @return
                     *     possible object is
                     *     {@link WsseSecurity.Assertion.DsSignature.DsSignedInfo.DsReference.DsTransforms }
                     *     
                     */
                    public WsseSecurity.Assertion.DsSignature.DsSignedInfo.DsReference.DsTransforms getDsTransforms() {
                        return dsTransforms;
                    }

                    /**
                     * Sets the value of the dsTransforms property.
                     * 
                     * @param value
                     *     allowed object is
                     *     {@link WsseSecurity.Assertion.DsSignature.DsSignedInfo.DsReference.DsTransforms }
                     *     
                     */
                    public void setDsTransforms(WsseSecurity.Assertion.DsSignature.DsSignedInfo.DsReference.DsTransforms value) {
                        this.dsTransforms = value;
                    }

                    /**
                     * Gets the value of the dsDigestMethod property.
                     * 
                     * @return
                     *     possible object is
                     *     {@link WsseSecurity.Assertion.DsSignature.DsSignedInfo.DsReference.DsDigestMethod }
                     *     
                     */
                    public WsseSecurity.Assertion.DsSignature.DsSignedInfo.DsReference.DsDigestMethod getDsDigestMethod() {
                        return dsDigestMethod;
                    }

                    /**
                     * Sets the value of the dsDigestMethod property.
                     * 
                     * @param value
                     *     allowed object is
                     *     {@link WsseSecurity.Assertion.DsSignature.DsSignedInfo.DsReference.DsDigestMethod }
                     *     
                     */
                    public void setDsDigestMethod(WsseSecurity.Assertion.DsSignature.DsSignedInfo.DsReference.DsDigestMethod value) {
                        this.dsDigestMethod = value;
                    }

                    /**
                     * Gets the value of the dsDigestValue property.
                     * 
                     * @return
                     *     possible object is
                     *     {@link String }
                     *     
                     */
                    public String getDsDigestValue() {
                        return dsDigestValue;
                    }

                    /**
                     * Sets the value of the dsDigestValue property.
                     * 
                     * @param value
                     *     allowed object is
                     *     {@link String }
                     *     
                     */
                    public void setDsDigestValue(String value) {
                        this.dsDigestValue = value;
                    }

                    /**
                     * Gets the value of the uri property.
                     * 
                     * @return
                     *     possible object is
                     *     {@link String }
                     *     
                     */
                    public String getURI() {
                        return uri;
                    }

                    /**
                     * Sets the value of the uri property.
                     * 
                     * @param value
                     *     allowed object is
                     *     {@link String }
                     *     
                     */
                    public void setURI(String value) {
                        this.uri = value;
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
                     *       &lt;attribute name="Algorithm" type="{http://www.w3.org/2001/XMLSchema}string" />
                     *     &lt;/restriction>
                     *   &lt;/complexContent>
                     * &lt;/complexType>
                     * </pre>
                     * 
                     * 
                     */
                    @XmlAccessorType(XmlAccessType.FIELD)
                    @XmlType(name = "")
                    public static class DsDigestMethod {

                        @XmlAttribute(name = "Algorithm")
                        protected String algorithm;

                        /**
                         * Gets the value of the algorithm property.
                         * 
                         * @return
                         *     possible object is
                         *     {@link String }
                         *     
                         */
                        public String getAlgorithm() {
                            return algorithm;
                        }

                        /**
                         * Sets the value of the algorithm property.
                         * 
                         * @param value
                         *     allowed object is
                         *     {@link String }
                         *     
                         */
                        public void setAlgorithm(String value) {
                            this.algorithm = value;
                        }

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
                     *         &lt;element name="ds:Transform">
                     *           &lt;complexType>
                     *             &lt;complexContent>
                     *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
                     *                 &lt;attribute name="Algorithm" type="{http://www.w3.org/2001/XMLSchema}string" />
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
                    @XmlType(name = "", propOrder = {
                        "dsTransform"
                    })
                    public static class DsTransforms {

                        @XmlElement(name = "ds:Transform", required = true)
                        protected WsseSecurity.Assertion.DsSignature.DsSignedInfo.DsReference.DsTransforms.DsTransform dsTransform;

                        /**
                         * Gets the value of the dsTransform property.
                         * 
                         * @return
                         *     possible object is
                         *     {@link WsseSecurity.Assertion.DsSignature.DsSignedInfo.DsReference.DsTransforms.DsTransform }
                         *     
                         */
                        public WsseSecurity.Assertion.DsSignature.DsSignedInfo.DsReference.DsTransforms.DsTransform getDsTransform() {
                            return dsTransform;
                        }

                        /**
                         * Sets the value of the dsTransform property.
                         * 
                         * @param value
                         *     allowed object is
                         *     {@link WsseSecurity.Assertion.DsSignature.DsSignedInfo.DsReference.DsTransforms.DsTransform }
                         *     
                         */
                        public void setDsTransform(WsseSecurity.Assertion.DsSignature.DsSignedInfo.DsReference.DsTransforms.DsTransform value) {
                            this.dsTransform = value;
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
                         *       &lt;attribute name="Algorithm" type="{http://www.w3.org/2001/XMLSchema}string" />
                         *     &lt;/restriction>
                         *   &lt;/complexContent>
                         * &lt;/complexType>
                         * </pre>
                         * 
                         * 
                         */
                        @XmlAccessorType(XmlAccessType.FIELD)
                        @XmlType(name = "")
                        public static class DsTransform {

                            @XmlAttribute(name = "Algorithm")
                            protected String algorithm;

                            /**
                             * Gets the value of the algorithm property.
                             * 
                             * @return
                             *     possible object is
                             *     {@link String }
                             *     
                             */
                            public String getAlgorithm() {
                                return algorithm;
                            }

                            /**
                             * Sets the value of the algorithm property.
                             * 
                             * @param value
                             *     allowed object is
                             *     {@link String }
                             *     
                             */
                            public void setAlgorithm(String value) {
                                this.algorithm = value;
                            }

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
                 *   &lt;complexContent>
                 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
                 *       &lt;attribute name="Algorithm" type="{http://www.w3.org/2001/XMLSchema}string" />
                 *     &lt;/restriction>
                 *   &lt;/complexContent>
                 * &lt;/complexType>
                 * </pre>
                 * 
                 * 
                 */
                @XmlAccessorType(XmlAccessType.FIELD)
                @XmlType(name = "")
                public static class DsSignatureMethod {

                    @XmlAttribute(name = "Algorithm")
                    protected String algorithm;

                    /**
                     * Gets the value of the algorithm property.
                     * 
                     * @return
                     *     possible object is
                     *     {@link String }
                     *     
                     */
                    public String getAlgorithm() {
                        return algorithm;
                    }

                    /**
                     * Sets the value of the algorithm property.
                     * 
                     * @param value
                     *     allowed object is
                     *     {@link String }
                     *     
                     */
                    public void setAlgorithm(String value) {
                        this.algorithm = value;
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
             *   &lt;complexContent>
             *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
             *       &lt;sequence>
             *         &lt;element name="ds:X509Data">
             *           &lt;complexType>
             *             &lt;complexContent>
             *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
             *                 &lt;sequence>
             *                   &lt;element name="ds:X509Certificate" type="{http://www.w3.org/2001/XMLSchema}string"/>
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
            @XmlType(name = "", propOrder = {
                "dsX509Data"
            })
            public static class KeyInfo {

                @XmlElement(name = "ds:X509Data", required = true)
                protected WsseSecurity.Assertion.DsSignature.KeyInfo.DsX509Data dsX509Data;

                /**
                 * Gets the value of the dsX509Data property.
                 * 
                 * @return
                 *     possible object is
                 *     {@link WsseSecurity.Assertion.DsSignature.KeyInfo.DsX509Data }
                 *     
                 */
                public WsseSecurity.Assertion.DsSignature.KeyInfo.DsX509Data getDsX509Data() {
                    return dsX509Data;
                }

                /**
                 * Sets the value of the dsX509Data property.
                 * 
                 * @param value
                 *     allowed object is
                 *     {@link WsseSecurity.Assertion.DsSignature.KeyInfo.DsX509Data }
                 *     
                 */
                public void setDsX509Data(WsseSecurity.Assertion.DsSignature.KeyInfo.DsX509Data value) {
                    this.dsX509Data = value;
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
                 *         &lt;element name="ds:X509Certificate" type="{http://www.w3.org/2001/XMLSchema}string"/>
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
                    "dsX509Certificate"
                })
                public static class DsX509Data {

                    @XmlElement(name = "ds:X509Certificate", required = true)
                    protected String dsX509Certificate;

                    /**
                     * Gets the value of the dsX509Certificate property.
                     * 
                     * @return
                     *     possible object is
                     *     {@link String }
                     *     
                     */
                    public String getDsX509Certificate() {
                        return dsX509Certificate;
                    }

                    /**
                     * Sets the value of the dsX509Certificate property.
                     * 
                     * @param value
                     *     allowed object is
                     *     {@link String }
                     *     
                     */
                    public void setDsX509Certificate(String value) {
                        this.dsX509Certificate = value;
                    }

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
         *   &lt;complexContent>
         *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
         *       &lt;sequence>
         *         &lt;element name="SubjectConfirmation">
         *           &lt;complexType>
         *             &lt;complexContent>
         *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
         *                 &lt;sequence>
         *                   &lt;element name="SubjectConfirmationData">
         *                     &lt;complexType>
         *                       &lt;complexContent>
         *                         &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
         *                           &lt;attribute name="NotOnOrAfter" type="{http://www.w3.org/2001/XMLSchema}dateTime" />
         *                         &lt;/restriction>
         *                       &lt;/complexContent>
         *                     &lt;/complexType>
         *                   &lt;/element>
         *                 &lt;/sequence>
         *                 &lt;attribute name="Method" type="{http://www.w3.org/2001/XMLSchema}string" />
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
        @XmlType(name = "", propOrder = {
            "subjectConfirmation"
        })
        public static class Subject {

            @XmlElement(name = "SubjectConfirmation", required = true)
            protected WsseSecurity.Assertion.Subject.SubjectConfirmation subjectConfirmation;

            /**
             * Gets the value of the subjectConfirmation property.
             * 
             * @return
             *     possible object is
             *     {@link WsseSecurity.Assertion.Subject.SubjectConfirmation }
             *     
             */
            public WsseSecurity.Assertion.Subject.SubjectConfirmation getSubjectConfirmation() {
                return subjectConfirmation;
            }

            /**
             * Sets the value of the subjectConfirmation property.
             * 
             * @param value
             *     allowed object is
             *     {@link WsseSecurity.Assertion.Subject.SubjectConfirmation }
             *     
             */
            public void setSubjectConfirmation(WsseSecurity.Assertion.Subject.SubjectConfirmation value) {
                this.subjectConfirmation = value;
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
             *         &lt;element name="SubjectConfirmationData">
             *           &lt;complexType>
             *             &lt;complexContent>
             *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
             *                 &lt;attribute name="NotOnOrAfter" type="{http://www.w3.org/2001/XMLSchema}dateTime" />
             *               &lt;/restriction>
             *             &lt;/complexContent>
             *           &lt;/complexType>
             *         &lt;/element>
             *       &lt;/sequence>
             *       &lt;attribute name="Method" type="{http://www.w3.org/2001/XMLSchema}string" />
             *     &lt;/restriction>
             *   &lt;/complexContent>
             * &lt;/complexType>
             * </pre>
             * 
             * 
             */
            @XmlAccessorType(XmlAccessType.FIELD)
            @XmlType(name = "", propOrder = {
                "subjectConfirmationData"
            })
            public static class SubjectConfirmation {

                @XmlElement(name = "SubjectConfirmationData", required = true)
                protected WsseSecurity.Assertion.Subject.SubjectConfirmation.SubjectConfirmationData subjectConfirmationData;
                @XmlAttribute(name = "Method")
                protected String method;

                /**
                 * Gets the value of the subjectConfirmationData property.
                 * 
                 * @return
                 *     possible object is
                 *     {@link WsseSecurity.Assertion.Subject.SubjectConfirmation.SubjectConfirmationData }
                 *     
                 */
                public WsseSecurity.Assertion.Subject.SubjectConfirmation.SubjectConfirmationData getSubjectConfirmationData() {
                    return subjectConfirmationData;
                }

                /**
                 * Sets the value of the subjectConfirmationData property.
                 * 
                 * @param value
                 *     allowed object is
                 *     {@link WsseSecurity.Assertion.Subject.SubjectConfirmation.SubjectConfirmationData }
                 *     
                 */
                public void setSubjectConfirmationData(WsseSecurity.Assertion.Subject.SubjectConfirmation.SubjectConfirmationData value) {
                    this.subjectConfirmationData = value;
                }

                /**
                 * Gets the value of the method property.
                 * 
                 * @return
                 *     possible object is
                 *     {@link String }
                 *     
                 */
                public String getMethod() {
                    return method;
                }

                /**
                 * Sets the value of the method property.
                 * 
                 * @param value
                 *     allowed object is
                 *     {@link String }
                 *     
                 */
                public void setMethod(String value) {
                    this.method = value;
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
                 *       &lt;attribute name="NotOnOrAfter" type="{http://www.w3.org/2001/XMLSchema}dateTime" />
                 *     &lt;/restriction>
                 *   &lt;/complexContent>
                 * &lt;/complexType>
                 * </pre>
                 * 
                 * 
                 */
                @XmlAccessorType(XmlAccessType.FIELD)
                @XmlType(name = "")
                public static class SubjectConfirmationData {

                    @XmlAttribute(name = "NotOnOrAfter")
                    @XmlSchemaType(name = "dateTime")
                    protected XMLGregorianCalendar notOnOrAfter;

                    /**
                     * Gets the value of the notOnOrAfter property.
                     * 
                     * @return
                     *     possible object is
                     *     {@link XMLGregorianCalendar }
                     *     
                     */
                    public XMLGregorianCalendar getNotOnOrAfter() {
                        return notOnOrAfter;
                    }

                    /**
                     * Sets the value of the notOnOrAfter property.
                     * 
                     * @param value
                     *     allowed object is
                     *     {@link XMLGregorianCalendar }
                     *     
                     */
                    public void setNotOnOrAfter(XMLGregorianCalendar value) {
                        this.notOnOrAfter = value;
                    }

                }

            }

        }

    }

}
