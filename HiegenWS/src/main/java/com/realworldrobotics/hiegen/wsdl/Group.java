
package com.realworldrobotics.hiegen.wsdl;

import javax.xml.bind.annotation.*;
import javax.xml.bind.annotation.adapters.CollapsedStringAdapter;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import javax.xml.datatype.XMLGregorianCalendar;
import java.util.ArrayList;
import java.util.List;


/**
 * <p>Java class for Group complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="Group">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="field" type="{urn:hiegen.realworldrobotics.genericform.model}Field" maxOccurs="unbounded"/>
 *       &lt;/sequence>
 *       &lt;attribute name="name" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="conceptID" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="conceptName" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="universalID" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="referenceID" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="dateTaken" type="{urn:hiegen.realworldrobotics.genericform.model}dateTime" />
 *       &lt;attribute name="numRows" type="{http://www.w3.org/2001/XMLSchema}int" />
 *       &lt;attribute name="minDateTime" type="{urn:hiegen.realworldrobotics.genericform.model}dateTime" />
 *       &lt;attribute name="maxDateTime" type="{urn:hiegen.realworldrobotics.genericform.model}dateTime" />
 *       &lt;attribute name="searchString" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="searchConcept" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="listItemID" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="listItemName" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="order" type="{urn:hiegen.realworldrobotics.genericform.common}Order" />
 *       &lt;attribute name="refresh" type="{http://www.w3.org/2001/XMLSchema}boolean" />
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "Group", namespace = "urn:hiegen.realworldrobotics.genericform.model", propOrder = {
    "field"
})
public class Group {

    @XmlElement(required = true)
    protected List<Field> field;
    @XmlAttribute(name = "name")
    protected String name;
    @XmlAttribute(name = "conceptID")
    protected String conceptID;
    @XmlAttribute(name = "conceptName")
    protected String conceptName;
    @XmlAttribute(name = "universalID")
    protected String universalID;
    @XmlAttribute(name = "referenceID")
    protected String referenceID;
    @XmlAttribute(name = "dateTaken")
    protected XMLGregorianCalendar dateTaken;
    @XmlAttribute(name = "numRows")
    protected Integer numRows;
    @XmlAttribute(name = "minDateTime")
    protected XMLGregorianCalendar minDateTime;
    @XmlAttribute(name = "maxDateTime")
    protected XMLGregorianCalendar maxDateTime;
    @XmlAttribute(name = "searchString")
    protected String searchString;
    @XmlAttribute(name = "searchConcept")
    protected String searchConcept;
    @XmlAttribute(name = "listItemID")
    protected String listItemID;
    @XmlAttribute(name = "listItemName")
    protected String listItemName;
    @XmlAttribute(name = "order")
    @XmlJavaTypeAdapter(CollapsedStringAdapter.class)
    protected String order;
    @XmlAttribute(name = "refresh")
    protected Boolean refresh;

    /**
     * Gets the value of the field property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the field property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getField().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link Field }
     * 
     * 
     */
    public List<Field> getField() {
        if (field == null) {
            field = new ArrayList<Field>();
        }
        return this.field;
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
     * Gets the value of the minDateTime property.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getMinDateTime() {
        return minDateTime;
    }

    /**
     * Sets the value of the minDateTime property.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setMinDateTime(XMLGregorianCalendar value) {
        this.minDateTime = value;
    }

    /**
     * Gets the value of the maxDateTime property.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getMaxDateTime() {
        return maxDateTime;
    }

    /**
     * Sets the value of the maxDateTime property.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setMaxDateTime(XMLGregorianCalendar value) {
        this.maxDateTime = value;
    }

    /**
     * Gets the value of the searchString property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSearchString() {
        return searchString;
    }

    /**
     * Sets the value of the searchString property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSearchString(String value) {
        this.searchString = value;
    }

    /**
     * Gets the value of the searchConcept property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSearchConcept() {
        return searchConcept;
    }

    /**
     * Sets the value of the searchConcept property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSearchConcept(String value) {
        this.searchConcept = value;
    }

    /**
     * Gets the value of the listItemID property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getListItemID() {
        return listItemID;
    }

    /**
     * Sets the value of the listItemID property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setListItemID(String value) {
        this.listItemID = value;
    }

    /**
     * Gets the value of the listItemName property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getListItemName() {
        return listItemName;
    }

    /**
     * Sets the value of the listItemName property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setListItemName(String value) {
        this.listItemName = value;
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

}
