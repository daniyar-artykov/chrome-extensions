
package com.realworldrobotics.hiegen.wsdl;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlType;
import javax.xml.bind.annotation.adapters.CollapsedStringAdapter;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import javax.xml.datatype.XMLGregorianCalendar;


/**
 * <p>Java class for Field complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="Field">
 *   &lt;simpleContent>
 *     &lt;extension base="&lt;urn:hiegen.realworldrobotics.genericform.model>FieldBase">
 *       &lt;attribute name="name" use="required" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="conceptID" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="conceptName" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="universalID" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="dataType" type="{urn:hiegen.realworldrobotics.genericform.common}DataType" />
 *       &lt;attribute name="referenceID" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="dateTaken" type="{urn:hiegen.realworldrobotics.genericform.model}dateTime" />
 *       &lt;attribute name="qualifierID" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="qualifierName" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="refresh" type="{http://www.w3.org/2001/XMLSchema}boolean" />
 *       &lt;attribute name="numRows" type="{http://www.w3.org/2001/XMLSchema}int" />
 *       &lt;attribute name="order" type="{urn:hiegen.realworldrobotics.genericform.common}Order" />
 *     &lt;/extension>
 *   &lt;/simpleContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "Field", namespace = "urn:hiegen.realworldrobotics.genericform.model")
public class Field
    extends FieldBase
{

    @XmlAttribute(name = "name", required = true)
    protected String name;
    @XmlAttribute(name = "conceptID")
    protected String conceptID;
    @XmlAttribute(name = "conceptName")
    protected String conceptName;
    @XmlAttribute(name = "universalID")
    protected String universalID;
    @XmlAttribute(name = "dataType")
    protected DataType dataType;
    @XmlAttribute(name = "referenceID")
    protected String referenceID;
    @XmlAttribute(name = "dateTaken")
    protected XMLGregorianCalendar dateTaken;
    @XmlAttribute(name = "qualifierID")
    protected String qualifierID;
    @XmlAttribute(name = "qualifierName")
    protected String qualifierName;
    @XmlAttribute(name = "refresh")
    protected Boolean refresh;
    @XmlAttribute(name = "numRows")
    protected Integer numRows;
    @XmlAttribute(name = "order")
    @XmlJavaTypeAdapter(CollapsedStringAdapter.class)
    protected String order;

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

    /**
     * Gets the value of the conceptID property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getConceptID() {
        return conceptID;
    }

    /**
     * Sets the value of the conceptID property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setConceptID(String value) {
        this.conceptID = value;
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

    /**
     * Gets the value of the universalID property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getUniversalID() {
        return universalID;
    }

    /**
     * Sets the value of the universalID property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setUniversalID(String value) {
        this.universalID = value;
    }

    /**
     * Gets the value of the dataType property.
     * 
     * @return
     *     possible object is
     *     {@link DataType }
     *     
     */
    public DataType getDataType() {
        return dataType;
    }

    /**
     * Sets the value of the dataType property.
     * 
     * @param value
     *     allowed object is
     *     {@link DataType }
     *     
     */
    public void setDataType(DataType value) {
        this.dataType = value;
    }

    /**
     * Gets the value of the referenceID property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getReferenceID() {
        return referenceID;
    }

    /**
     * Sets the value of the referenceID property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setReferenceID(String value) {
        this.referenceID = value;
    }

    /**
     * Gets the value of the dateTaken property.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getDateTaken() {
        return dateTaken;
    }

    /**
     * Sets the value of the dateTaken property.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setDateTaken(XMLGregorianCalendar value) {
        this.dateTaken = value;
    }

    /**
     * Gets the value of the qualifierID property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getQualifierID() {
        return qualifierID;
    }

    /**
     * Sets the value of the qualifierID property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setQualifierID(String value) {
        this.qualifierID = value;
    }

    /**
     * Gets the value of the qualifierName property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getQualifierName() {
        return qualifierName;
    }

    /**
     * Sets the value of the qualifierName property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setQualifierName(String value) {
        this.qualifierName = value;
    }

    /**
     * Gets the value of the refresh property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isRefresh() {
        return refresh;
    }

    /**
     * Sets the value of the refresh property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setRefresh(Boolean value) {
        this.refresh = value;
    }

    /**
     * Gets the value of the numRows property.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getNumRows() {
        return numRows;
    }

    /**
     * Sets the value of the numRows property.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setNumRows(Integer value) {
        this.numRows = value;
    }

    /**
     * Gets the value of the order property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getOrder() {
        return order;
    }

    /**
     * Sets the value of the order property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setOrder(String value) {
        this.order = value;
    }

}
