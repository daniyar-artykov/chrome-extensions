
package com.accenture.nes.dto.webservicedto.ivr;

import javax.xml.bind.annotation.XmlRegistry;

import com.upwork.test.AuthorizeUserRequestDTO;


/**
 * This object contains factory methods for each 
 * Java content interface and Java element interface 
 * generated in the com.accenture.nes.dto.webservicedto.ivr package. 
 * <p>An ObjectFactory allows you to programatically 
 * construct new instances of the Java representation 
 * for XML content. The Java representation of XML 
 * content can consist of schema derived interfaces 
 * and classes representing the binding of schema 
 * type definitions, element declarations and model 
 * groups.  Factory methods for each of these are 
 * provided in this class.
 * 
 */
@XmlRegistry
public class ObjectFactory {


    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: com.accenture.nes.dto.webservicedto.ivr
     * 
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link AuthorizeUserRequestDTO }
     * 
     */
    public AuthorizeUserRequestDTO createAuthorizeUserRequestDTO() {
        return new AuthorizeUserRequestDTO();
    }

    /**
     * Create an instance of {@link ResetPinRequestDTO }
     * 
     */
    public ResetPinRequestDTO createResetPinRequestDTO() {
        return new ResetPinRequestDTO();
    }

}
