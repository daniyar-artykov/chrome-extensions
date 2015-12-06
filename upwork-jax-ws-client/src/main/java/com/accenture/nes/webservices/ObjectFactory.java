
package com.accenture.nes.webservices;

import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlElementDecl;
import javax.xml.bind.annotation.XmlRegistry;
import javax.xml.namespace.QName;


/**
 * This object contains factory methods for each 
 * Java content interface and Java element interface 
 * generated in the com.accenture.nes.webservices package. 
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

    private final static QName _ResetPIN_QNAME = new QName("http://webservices.nes.accenture.com/", "resetPIN");
    private final static QName _AuthorizeUserResponse_QNAME = new QName("http://webservices.nes.accenture.com/", "authorizeUserResponse");
    private final static QName _ResetPINResponse_QNAME = new QName("http://webservices.nes.accenture.com/", "resetPINResponse");
    private final static QName _AuthorizeUser_QNAME = new QName("http://webservices.nes.accenture.com/", "authorizeUser");

    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: com.accenture.nes.webservices
     * 
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link AuthorizeUser }
     * 
     */
    public AuthorizeUser createAuthorizeUser() {
        return new AuthorizeUser();
    }

    /**
     * Create an instance of {@link AuthorizeUserResponse }
     * 
     */
    public AuthorizeUserResponse createAuthorizeUserResponse() {
        return new AuthorizeUserResponse();
    }

    /**
     * Create an instance of {@link ResetPIN }
     * 
     */
    public ResetPIN createResetPIN() {
        return new ResetPIN();
    }

    /**
     * Create an instance of {@link ResetPINResponse }
     * 
     */
    public ResetPINResponse createResetPINResponse() {
        return new ResetPINResponse();
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link ResetPIN }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://webservices.nes.accenture.com/", name = "resetPIN")
    public JAXBElement<ResetPIN> createResetPIN(ResetPIN value) {
        return new JAXBElement<ResetPIN>(_ResetPIN_QNAME, ResetPIN.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link AuthorizeUserResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://webservices.nes.accenture.com/", name = "authorizeUserResponse")
    public JAXBElement<AuthorizeUserResponse> createAuthorizeUserResponse(AuthorizeUserResponse value) {
        return new JAXBElement<AuthorizeUserResponse>(_AuthorizeUserResponse_QNAME, AuthorizeUserResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link ResetPINResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://webservices.nes.accenture.com/", name = "resetPINResponse")
    public JAXBElement<ResetPINResponse> createResetPINResponse(ResetPINResponse value) {
        return new JAXBElement<ResetPINResponse>(_ResetPINResponse_QNAME, ResetPINResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link AuthorizeUser }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://webservices.nes.accenture.com/", name = "authorizeUser")
    public JAXBElement<AuthorizeUser> createAuthorizeUser(AuthorizeUser value) {
        return new JAXBElement<AuthorizeUser>(_AuthorizeUser_QNAME, AuthorizeUser.class, null, value);
    }

}
