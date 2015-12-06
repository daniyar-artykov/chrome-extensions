/**
 * Copyright (c) 2015 Drishti-Soft Solutions Pvt. Ltd.
 *
 * @author: abhayk
 * Date:  Jul 3, 2015
 */
package com.solex.test;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import javax.xml.namespace.QName;
import javax.xml.ws.Binding;
import javax.xml.ws.BindingProvider;
import javax.xml.ws.handler.Handler;

import org.oasis_open.docs.ws_sx.ws_trust._200512.RequestSecurityTokenResponseCollectionType;
import org.oasis_open.docs.ws_sx.ws_trust._200512.RequestSecurityTokenResponseType;
import org.oasis_open.docs.ws_sx.ws_trust._200512.RequestSecurityTokenType;

import com.accenture.nes.dto.webservicedto.ivr.AuthorizeUserRequestDTO;
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
			url = new URL("classpath:adfs.wsdl");

			//sample location path can be file:///home/abc/IVRUserManagementServiceImplPort.wsdl
		} catch (MalformedURLException e) {
			logger.severe("Unable to create URL for for passed wsdl Location");
			logger.severe(e.getMessage());
		}

		QName qname = new QName("http://webservices.nes.accenture.com", "IVRUserManagementService");
		SecurityTokenService stService = new SecurityTokenService(url, qname);
		IWSTrust13Async trust13Async = stService.getCertificateWSTrustBindingIWSTrust13Async();
		RequestSecurityTokenType requestToken = new RequestSecurityTokenType(); 
		requestToken.setContext("");
		RequestSecurityTokenResponseCollectionType rsp = 
				trust13Async.trust13IssueAsync(requestToken);
		List<RequestSecurityTokenResponseType> listRsp = rsp.getRequestSecurityTokenResponse();
		

		qname = new QName("http://webservices.nes.accenture.com", "IVRUserManagementService");
		IVRUserManagementService soap = new IVRUserManagementService(url, qname);
		IIVRUserManagementService userManagementService = soap.getIVRUserManagementServiceImplPort();
		AuthorizeUserRequestDTO request = new AuthorizeUserRequestDTO();
		request.setEstablishmentID("32434");
		request.setLanguageKey(232L);
		request.setTelephone(4454L);
		request.setUniqueID(43333L);

		BindingProvider provider = (BindingProvider)userManagementService;
		Binding binding = provider.getBinding();
		String xmlString = null;
		List<Handler> handlerChain = new ArrayList<Handler>();
		handlerChain.add(new HeaderHandler(xmlString));

		binding.setHandlerChain(handlerChain);
		AuthorizeUserResponseDTO response = userManagementService.authorizeUser(request);
		System.out.println(response.toString());
	}

}
