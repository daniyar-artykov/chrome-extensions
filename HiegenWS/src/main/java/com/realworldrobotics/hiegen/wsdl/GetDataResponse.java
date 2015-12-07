
package com.realworldrobotics.hiegen.wsdl;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for GetDataResponse complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="GetDataResponse">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="return">
 *           &lt;complexType>
 *             &lt;complexContent>
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                 &lt;sequence>
 *                   &lt;element name="dataContainer" type="{http://www.hiegen.realworldrobotics/hiegenforms/1.1/formInstanceMeta}FormData"/>
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
@XmlType(name = "GetDataResponse", propOrder = {
    "_return"
})
public class GetDataResponse {

    @XmlElement(name = "return", required = true)
    protected GetDataResponse.Return _return;

    /**
     * Gets the value of the return property.
     * 
     * @return
     *     possible object is
     *     {@link GetDataResponse.Return }
     *     
     */
    public GetDataResponse.Return getReturn() {
        return _return;
    }

    /**
     * Sets the value of the return property.
     * 
     * @param value
     *     allowed object is
     *     {@link GetDataResponse.Return }
     *     
     */
    public void setReturn(GetDataResponse.Return value) {
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
     *         &lt;element name="dataContainer" type="{http://www.hiegen.realworldrobotics/hiegenforms/1.1/formInstanceMeta}FormData"/>
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
        "dataContainer"
    })
    public static class Return {

        @XmlElement(required = true)
        protected FormData dataContainer;

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

    }

}
