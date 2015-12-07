
package com.realworldrobotics.hiegen.wsdl;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;
import javax.xml.bind.annotation.adapters.CollapsedStringAdapter;
import javax.xml.bind.annotation.adapters.NormalizedStringAdapter;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;


/**
 * <p>Java class for GetFormViewResponse complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="GetFormViewResponse">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="return">
 *           &lt;complexType>
 *             &lt;complexContent>
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                 &lt;sequence>
 *                   &lt;element name="resumePath" type="{http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession}ResumePath" minOccurs="0"/>
 *                   &lt;element name="dataContainer" type="{http://www.hiegen.realworldrobotics/hiegenforms/1.1/formInstanceMeta}FormData"/>
 *                   &lt;element name="view" type="{http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession}View" minOccurs="0"/>
 *                   &lt;element name="viewType" type="{http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession}ViewType" minOccurs="0"/>
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
@XmlType(name = "GetFormViewResponse", propOrder = {
    "_return"
})
public class GetFormViewResponse {

    @XmlElement(name = "return", required = true)
    protected GetFormViewResponse.Return _return;

    /**
     * Gets the value of the return property.
     * 
     * @return
     *     possible object is
     *     {@link GetFormViewResponse.Return }
     *     
     */
    public GetFormViewResponse.Return getReturn() {
        return _return;
    }

    /**
     * Sets the value of the return property.
     * 
     * @param value
     *     allowed object is
     *     {@link GetFormViewResponse.Return }
     *     
     */
    public void setReturn(GetFormViewResponse.Return value) {
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
     *         &lt;element name="resumePath" type="{http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession}ResumePath" minOccurs="0"/>
     *         &lt;element name="dataContainer" type="{http://www.hiegen.realworldrobotics/hiegenforms/1.1/formInstanceMeta}FormData"/>
     *         &lt;element name="view" type="{http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession}View" minOccurs="0"/>
     *         &lt;element name="viewType" type="{http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession}ViewType" minOccurs="0"/>
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
        "resumePath",
        "dataContainer",
        "view",
        "viewType"
    })
    public static class Return {

        @XmlJavaTypeAdapter(CollapsedStringAdapter.class)
        protected String resumePath;
        @XmlElement(required = true)
        protected FormData dataContainer;
        protected String view;
        @XmlJavaTypeAdapter(NormalizedStringAdapter.class)
        protected String viewType;

        /**
         * Gets the value of the resumePath property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getResumePath() {
            return resumePath;
        }

        /**
         * Sets the value of the resumePath property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setResumePath(String value) {
            this.resumePath = value;
        }

        /**
         * Gets the value of the dataContainer property.
         * 
         * @return
         *     possible object is
         *     {@link FormData }
         *     
         */
        public FormData getDataContainer() {
            return dataContainer;
        }

        /**
         * Sets the value of the dataContainer property.
         * 
         * @param value
         *     allowed object is
         *     {@link FormData }
         *     
         */
        public void setDataContainer(FormData value) {
            this.dataContainer = value;
        }

        /**
         * Gets the value of the view property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getView() {
            return view;
        }

        /**
         * Sets the value of the view property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setView(String value) {
            this.view = value;
        }

        /**
         * Gets the value of the viewType property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getViewType() {
            return viewType;
        }

        /**
         * Sets the value of the viewType property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setViewType(String value) {
            this.viewType = value;
        }

    }

}
