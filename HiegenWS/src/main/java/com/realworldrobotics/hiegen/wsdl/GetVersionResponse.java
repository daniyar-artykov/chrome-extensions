
package com.realworldrobotics.hiegen.wsdl;

import javax.xml.bind.annotation.*;
import javax.xml.bind.annotation.adapters.NormalizedStringAdapter;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import java.math.BigDecimal;


/**
 * <p>Java class for GetVersionResponse complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="GetVersionResponse">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="return">
 *           &lt;complexType>
 *             &lt;complexContent>
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                 &lt;sequence>
 *                   &lt;element name="application" type="{http://www.w3.org/2001/XMLSchema}normalizedString"/>
 *                   &lt;element name="applicationVersion" type="{http://www.w3.org/2001/XMLSchema}normalizedString"/>
 *                   &lt;element name="interfaceVersion" type="{http://www.w3.org/2001/XMLSchema}decimal"/>
 *                   &lt;element name="dictionaryVersion" type="{http://www.w3.org/2001/XMLSchema}decimal" minOccurs="0"/>
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
@XmlType(name = "GetVersionResponse", propOrder = {
    "_return"
})
public class GetVersionResponse {

    @XmlElement(name = "return", required = true)
    protected GetVersionResponse.Return _return;

    /**
     * Gets the value of the return property.
     * 
     * @return
     *     possible object is
     *     {@link GetVersionResponse.Return }
     *     
     */
    public GetVersionResponse.Return getReturn() {
        return _return;
    }

    /**
     * Sets the value of the return property.
     * 
     * @param value
     *     allowed object is
     *     {@link GetVersionResponse.Return }
     *     
     */
    public void setReturn(GetVersionResponse.Return value) {
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
     *         &lt;element name="application" type="{http://www.w3.org/2001/XMLSchema}normalizedString"/>
     *         &lt;element name="applicationVersion" type="{http://www.w3.org/2001/XMLSchema}normalizedString"/>
     *         &lt;element name="interfaceVersion" type="{http://www.w3.org/2001/XMLSchema}decimal"/>
     *         &lt;element name="dictionaryVersion" type="{http://www.w3.org/2001/XMLSchema}decimal" minOccurs="0"/>
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
        "application",
        "applicationVersion",
        "interfaceVersion",
        "dictionaryVersion"
    })
    public static class Return {

        @XmlElement(required = true)
        @XmlJavaTypeAdapter(NormalizedStringAdapter.class)
        @XmlSchemaType(name = "normalizedString")
        protected String application;
        @XmlElement(required = true)
        @XmlJavaTypeAdapter(NormalizedStringAdapter.class)
        @XmlSchemaType(name = "normalizedString")
        protected String applicationVersion;
        @XmlElement(required = true)
        protected BigDecimal interfaceVersion;
        protected BigDecimal dictionaryVersion;

        /**
         * Gets the value of the application property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getApplication() {
            return application;
        }

        /**
         * Sets the value of the application property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setApplication(String value) {
            this.application = value;
        }

        /**
         * Gets the value of the applicationVersion property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getApplicationVersion() {
            return applicationVersion;
        }

        /**
         * Sets the value of the applicationVersion property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setApplicationVersion(String value) {
            this.applicationVersion = value;
        }

        /**
         * Gets the value of the interfaceVersion property.
         * 
         * @return
         *     possible object is
         *     {@link BigDecimal }
         *     
         */
        public BigDecimal getInterfaceVersion() {
            return interfaceVersion;
        }

        /**
         * Sets the value of the interfaceVersion property.
         * 
         * @param value
         *     allowed object is
         *     {@link BigDecimal }
         *     
         */
        public void setInterfaceVersion(BigDecimal value) {
            this.interfaceVersion = value;
        }

        /**
         * Gets the value of the dictionaryVersion property.
         * 
         * @return
         *     possible object is
         *     {@link BigDecimal }
         *     
         */
        public BigDecimal getDictionaryVersion() {
            return dictionaryVersion;
        }

        /**
         * Sets the value of the dictionaryVersion property.
         * 
         * @param value
         *     allowed object is
         *     {@link BigDecimal }
         *     
         */
        public void setDictionaryVersion(BigDecimal value) {
            this.dictionaryVersion = value;
        }

    }

}
