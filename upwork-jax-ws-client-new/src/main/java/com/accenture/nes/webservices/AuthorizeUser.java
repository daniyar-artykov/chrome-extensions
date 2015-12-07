
package com.accenture.nes.webservices;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;

import com.upwork.test.AuthorizeUserRequestDTO;


/**
 * <p>Java class for authorizeUser complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="authorizeUser">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="authorizeUserRequestDTO" type="{http://ivr.webservicedto.dto.nes.accenture.com}AuthorizeUserRequestDTO" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "authorizeUser", propOrder = {
    "authorizeUserRequestDTO"
})
public class AuthorizeUser {

    protected AuthorizeUserRequestDTO authorizeUserRequestDTO;

    /**
     * Gets the value of the authorizeUserRequestDTO property.
     * 
     * @return
     *     possible object is
     *     {@link AuthorizeUserRequestDTO }
     *     
     */
    public AuthorizeUserRequestDTO getAuthorizeUserRequestDTO() {
        return authorizeUserRequestDTO;
    }

    /**
     * Sets the value of the authorizeUserRequestDTO property.
     * 
     * @param value
     *     allowed object is
     *     {@link AuthorizeUserRequestDTO }
     *     
     */
    public void setAuthorizeUserRequestDTO(AuthorizeUserRequestDTO value) {
        this.authorizeUserRequestDTO = value;
    }

}
