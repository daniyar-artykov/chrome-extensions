/**
 * Copyright (c) 2015 Drishti-Soft Solutions Pvt. Ltd.
 *
 * @author: abhayk
 * Date:  Jul 3, 2015
 */
package com.solex.test;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;
import java.util.logging.Logger;

import javax.xml.namespace.QName;

import org.oasis_open.docs.ws_sx.ws_trust._200512.ActionTypeHeader;
import org.oasis_open.docs.ws_sx.ws_trust._200512.MessageIdHeader;
import org.oasis_open.docs.ws_sx.ws_trust._200512.ReplyToHeader;
import org.oasis_open.docs.ws_sx.ws_trust._200512.RequestSecurityTokenResponseCollectionType;
import org.oasis_open.docs.ws_sx.ws_trust._200512.RequestSecurityTokenResponseType;
import org.oasis_open.docs.ws_sx.ws_trust._200512.RequestSecurityTokenType;
import org.oasis_open.docs.ws_sx.ws_trust._200512.SecurityHeader;
import org.oasis_open.docs.ws_sx.ws_trust._200512.ToHeader;
import org.oasis_open.docs.ws_sx.ws_trust._200512.UsernameTokenHeader;
import org.oasis_open.docs.ws_sx.ws_trust._200512.VsDebuggerCausalityData;

import com.accenture.nes.dto.webservicedto.ivr.AuthorizeUserRequestDTO;
import com.accenture.nes.dto.webservicedto.ivr.header.WsseSecurity;
import com.accenture.nes.dto.webservicedto.ivr.header.WsseSecurity.Assertion;
import com.accenture.nes.webservicedto.ivr.AuthorizeUserResponseDTO;
import com.accenture.nes.webservices.IIVRUserManagementService;
import com.accenture.nes.webservices.IVRUserManagementService;
import com.microsoft.schemas.ws._2008._06.identity.securitytokenservice.IWSTrust13Async;
import com.microsoft.schemas.ws._2008._06.identity.securitytokenservice.SecurityTokenService;

/**
 *
 */
public class MainSolex {
	private static final Logger logger = Logger.getLogger(MainSolex.class.getName());

	public static void main(String[] args) {

		System.setProperty("com.sun.xml.ws.transport.http.client.HttpTransportPipe.dump", "true");
		System.setProperty("com.sun.xml.internal.ws.transport.http.client.HttpTransportPipe.dump", "true");
		System.setProperty("com.sun.xml.ws.transport.http.HttpAdapter.dump", "true");
		System.setProperty("com.sun.xml.internal.ws.transport.http.HttpAdapter.dump", "true");

		URL url = null;
		try {
			url = new URL("http://localhost:8080/localhost?WSDL");
			//			url = new URL("http://localhost:8081/IVR?WSDL");
			//sample location path can be file:///home/abc/IVRUserManagementServiceImplPort.wsdl
		} catch (MalformedURLException e) {
			logger.severe("Unable to create URL for for passed wsdl Location");
			logger.severe(e.getMessage());
		}

		QName qname = new QName("http://schemas.microsoft.com/ws/2008/06/identity/securitytokenservice", "SecurityTokenService");
		SecurityTokenService stService = new SecurityTokenService(url, qname);
		IWSTrust13Async trust13Async = stService.getCertificateWSTrustBindingIWSTrust13Async();
		RequestSecurityTokenType requestToken = new RequestSecurityTokenType(); 
//		requestToken.setContext("test");

		//		BindingProvider provider = (BindingProvider) trust13Async;
		//		Binding binding = provider.getBinding();
		//		String xmlString = "<a:Action s:mustUnderstand=\"1\">http://docs.oasis-open.org/ws-sx/ws-trust/200512/RST/Issue</a:Action><a:MessageID>urn:uuid:e01d8a0e-f169-4cb8-9587-c964de542a30</a:MessageID><a:ReplyTo><a:Address>http://www.w3.org/2005/08/addressing/anonymous</a:Address></a:ReplyTo><VsDebuggerCausalityData xmlns=\"http://schemas.microsoft.com/vstudio/diagnostics/servicemodelsink\">uIDPox7qbcwXb+NFkG8FI4LiN7QAAAAApgNa0rNL+Eu9x08ZJr+6IxzYsy9hRWFEtxa4wjA7dqYACQAA</VsDebuggerCausalityData><a:To s:mustUnderstand=\"1\">https://adfs.preprod.nes/adfs/services/trust/13/UsernameMixed</a:To><o:Security s:mustUnderstand=\"1\" xmlns:o=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\"><o:UsernameToken u:Id=\"uuid-43e22322-edd1-44a9-9228-4d173daf5875-1\"><o:Username>preproduser1</o:Username><o:Password Type=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText\">Password1</o:Password></o:UsernameToken></o:Security>";
		//		List<Handler> handlerChain = new ArrayList<Handler>();
		//		handlerChain.add(new HeaderHandler(xmlString));
		//		binding.setHandlerChain(handlerChain);
		// sl$123123

		ActionTypeHeader actionHeader = new ActionTypeHeader();
		actionHeader.setMustUnderstand("1");
		actionHeader.setAction("http://docs.oasis-open.org/ws-sx/ws-trust/200512/RST/Issue");
		MessageIdHeader midHeader = new MessageIdHeader("urn:uuid:e01d8a0e-f169-4cb8-9587-c964de542a30");
		ReplyToHeader replyTo = new ReplyToHeader();
		replyTo.setAddress("http://www.w3.org/2005/08/addressing/anonymous");
		VsDebuggerCausalityData vsDebugger = new VsDebuggerCausalityData("uIDPox7qbcwXb+NFkG8FI4LiN7QAAAAApgNa0rNL+Eu9x08ZJr+6IxzYsy9hRWFEtxa4wjA7dqYACQAA");
		ToHeader toHeader = new ToHeader();
		toHeader.setMustUnderstand("1");
		toHeader.setText("https://adfs.preprod.nes/adfs/services/trust/13/UsernameMixed");
		SecurityHeader security = new SecurityHeader();
		UsernameTokenHeader usernameToken = new UsernameTokenHeader();
		usernameToken.setId("uuid-43e22322-edd1-44a9-9228-4d173daf5875-1");
		usernameToken.setUsername("preproduser1");
		usernameToken.setPassword("Password1");
		security.setMustUnderstand("1");
		security.setUsernameToken(usernameToken);

		RequestSecurityTokenResponseCollectionType rsp = 
				trust13Async.trust13IssueAsync(actionHeader, midHeader, replyTo, vsDebugger, toHeader, security, requestToken);
		List<RequestSecurityTokenResponseType> listRsp = rsp.getRequestSecurityTokenResponse();
		
		

	}

	private static void callIVR() {
		URL url = null;
		try {
			url = new URL("http://localhost:8081/IVR?WSDL");

			//sample location path can be file:///home/abc/IVRUserManagementServiceImplPort.wsdl
		} catch (MalformedURLException e) {
			logger.severe("Unable to create URL for for passed wsdl Location");
			logger.severe(e.getMessage());
		}

		QName qname = new QName("http://webservices.nes.accenture.com", "IVRUserManagementService");
		IVRUserManagementService soap = new IVRUserManagementService(url, qname);
		IIVRUserManagementService userManagementService = soap.getIVRUserManagementServiceImplPort();

		WsseSecurity header = new WsseSecurity();
		Assertion assertion = new Assertion();
		assertion.setID("_53b1f678-f52f-4bc1-94e3-3c776baa7138");

		header.setAssertion(assertion);

		AuthorizeUserRequestDTO request = new AuthorizeUserRequestDTO();
		request.setEstablishmentID("32434");
		request.setLanguageKey(232L);
		request.setTelephone("2312");
		request.setUniqueID(43333L);

		AuthorizeUserResponseDTO response = 
				userManagementService.authorizeUser(header, request);
		System.out.println(response.toString());
	}

}
