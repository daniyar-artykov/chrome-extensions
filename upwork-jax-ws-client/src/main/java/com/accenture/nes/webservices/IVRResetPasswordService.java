
package com.accenture.nes.webservices;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.logging.Logger;
import javax.xml.namespace.QName;
import javax.xml.ws.Service;
import javax.xml.ws.WebEndpoint;
import javax.xml.ws.WebServiceClient;
import javax.xml.ws.WebServiceFeature;


/**
 * This class was generated by the JAX-WS RI.
 * JAX-WS RI 2.1.6 in JDK 6
 * Generated source version: 2.1
 * 
 */
@WebServiceClient(name = "IVRResetPasswordService", targetNamespace = "http://webservices.nes.accenture.com", wsdlLocation = "file:/home/abhayk/workspaces/jar/Solexjar/IVRResetPasswordService.wsdl")
public class IVRResetPasswordService
    extends Service
{

    private final static URL IVRRESETPASSWORDSERVICE_WSDL_LOCATION;
    private final static Logger logger = Logger.getLogger(com.accenture.nes.webservices.IVRResetPasswordService.class.getName());

    static {
        URL url = null;
        try {
            URL baseUrl;
            baseUrl = com.accenture.nes.webservices.IVRResetPasswordService.class.getResource(".");
            url = new URL(baseUrl, "file:/home/abhayk/workspaces/jar/Solexjar/IVRResetPasswordService.wsdl");
        } catch (MalformedURLException e) {
            logger.warning("Failed to create URL for the wsdl Location: 'file:/home/abhayk/workspaces/jar/Solexjar/IVRResetPasswordService.wsdl', retrying as a local file");
            logger.warning(e.getMessage());
        }
        IVRRESETPASSWORDSERVICE_WSDL_LOCATION = url;
    }

    public IVRResetPasswordService(URL wsdlLocation, QName serviceName) {
        super(wsdlLocation, serviceName);
    }

    public IVRResetPasswordService() {
        super(IVRRESETPASSWORDSERVICE_WSDL_LOCATION, new QName("http://webservices.nes.accenture.com", "IVRResetPasswordService"));
    }

    /**
     * 
     * @return
     *     returns IIVRResetPasswordService
     */
    @WebEndpoint(name = "IVRResetPasswordServiceImplPort")
    public IIVRResetPasswordService getIVRResetPasswordServiceImplPort() {
        return super.getPort(new QName("http://webservices.nes.accenture.com", "IVRResetPasswordServiceImplPort"), IIVRResetPasswordService.class);
    }

    /**
     * 
     * @param features
     *     A list of {@link javax.xml.ws.WebServiceFeature} to configure on the proxy.  Supported features not in the <code>features</code> parameter will have their default values.
     * @return
     *     returns IIVRResetPasswordService
     */
    @WebEndpoint(name = "IVRResetPasswordServiceImplPort")
    public IIVRResetPasswordService getIVRResetPasswordServiceImplPort(WebServiceFeature... features) {
        return super.getPort(new QName("http://webservices.nes.accenture.com", "IVRResetPasswordServiceImplPort"), IIVRResetPasswordService.class, features);
    }

}