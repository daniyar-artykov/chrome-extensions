
package org.xmlsoap.schemas.ws._2005._02.trust;

import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlElementDecl;
import javax.xml.bind.annotation.XmlRegistry;
import javax.xml.namespace.QName;


/**
 * This object contains factory methods for each 
 * Java content interface and Java element interface 
 * generated in the org.xmlsoap.schemas.ws._2005._02.trust package. 
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

    private final static QName _RequestSecurityToken_QNAME = new QName("http://schemas.xmlsoap.org/ws/2005/02/trust", "RequestSecurityToken");
    private final static QName _RequestSecurityTokenResponse_QNAME = new QName("http://schemas.xmlsoap.org/ws/2005/02/trust", "RequestSecurityTokenResponse");

    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: org.xmlsoap.schemas.ws._2005._02.trust
     * 
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link RequestSecurityTokenType }
     * 
     */
    public RequestSecurityTokenType createRequestSecurityTokenType() {
        return new RequestSecurityTokenType();
    }

    /**
     * Create an instance of {@link RequestSecurityTokenResponseType }
     * 
     */
    public RequestSecurityTokenResponseType createRequestSecurityTokenResponseType() {
        return new RequestSecurityTokenResponseType();
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link RequestSecurityTokenType }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://schemas.xmlsoap.org/ws/2005/02/trust", name = "RequestSecurityToken")
    public JAXBElement<RequestSecurityTokenType> createRequestSecurityToken(RequestSecurityTokenType value) {
        return new JAXBElement<RequestSecurityTokenType>(_RequestSecurityToken_QNAME, RequestSecurityTokenType.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link RequestSecurityTokenResponseType }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://schemas.xmlsoap.org/ws/2005/02/trust", name = "RequestSecurityTokenResponse")
    public JAXBElement<RequestSecurityTokenResponseType> createRequestSecurityTokenResponse(RequestSecurityTokenResponseType value) {
        return new JAXBElement<RequestSecurityTokenResponseType>(_RequestSecurityTokenResponse_QNAME, RequestSecurityTokenResponseType.class, null, value);
    }

}
