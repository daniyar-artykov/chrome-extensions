
package com.realworldrobotics.hiegen.wsdl;

import javax.xml.bind.annotation.*;


/**
 * <p>Java class for FieldBase complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="FieldBase">
 *   &lt;simpleContent>
 *     &lt;extension base="&lt;urn:hiegen.realworldrobotics.genericform.model>fieldValue">
 *     &lt;/extension>
 *   &lt;/simpleContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "FieldBase", namespace = "urn:hiegen.realworldrobotics.genericform.model", propOrder = {
    "value"
})
@XmlSeeAlso({
    Field.class
})
public abstract class FieldBase {

    @XmlValue
    protected String value;

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

}
