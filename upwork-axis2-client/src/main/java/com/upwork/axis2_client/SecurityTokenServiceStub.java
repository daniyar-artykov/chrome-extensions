
/**
 * SecurityTokenServiceStub.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis2 version: 1.6.2  Built on : Apr 17, 2012 (05:33:49 IST)
 */
package com.upwork.axis2_client;



/*
 *  SecurityTokenServiceStub java implementation
 */


public class SecurityTokenServiceStub extends org.apache.axis2.client.Stub
{
	protected org.apache.axis2.description.AxisOperation[] _operations;

	//hashmaps to keep the fault mapping
	private java.util.HashMap faultExceptionNameMap = new java.util.HashMap();
	private java.util.HashMap faultExceptionClassNameMap = new java.util.HashMap();
	private java.util.HashMap faultMessageMap = new java.util.HashMap();

	private static int counter = 0;

	private static synchronized java.lang.String getUniqueSuffix(){
		// reset the counter if it is greater than 99999
		if (counter > 99999){
			counter = 0;
		}
		counter = counter + 1; 
		return java.lang.Long.toString(java.lang.System.currentTimeMillis()) + "_" + counter;
	}


	private void populateAxisService() throws org.apache.axis2.AxisFault {

		//creating the Service with a unique name
		_service = new org.apache.axis2.description.AxisService("SecurityTokenService" + getUniqueSuffix());
		addAnonymousOperations();

		//creating the operations
		org.apache.axis2.description.AxisOperation __operation;

		_operations = new org.apache.axis2.description.AxisOperation[1];

		__operation = new org.apache.axis2.description.OutInAxisOperation();


		__operation.setName(new javax.xml.namespace.QName("http://schemas.microsoft.com/ws/2008/06/identity/securitytokenservice", "trustFeb2005IssueAsync"));
		_service.addOperation(__operation);



		(__operation).getMessage(org.apache.axis2.wsdl.WSDLConstants.MESSAGE_LABEL_OUT_VALUE).getPolicySubject().attachPolicy(getPolicy("<wsp:Policy wsu:Id=\"CustomBinding_IWSTrustFeb2005Async1_policy\" xmlns:wsp=\"http://schemas.xmlsoap.org/ws/2004/09/policy\" xmlns:wsu=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\"><wsp:ExactlyOne><wsp:All><sp:TransportBinding xmlns:sp=\"http://schemas.xmlsoap.org/ws/2005/07/securitypolicy\"><wsp:Policy xmlns:wsp=\"http://schemas.xmlsoap.org/ws/2004/09/policy\"><sp:TransportToken><wsp:Policy xmlns:wsp=\"http://schemas.xmlsoap.org/ws/2004/09/policy\"><sp:HttpsToken RequireClientCertificate=\"false\"></sp:HttpsToken></wsp:Policy></sp:TransportToken><sp:AlgorithmSuite><wsp:Policy xmlns:wsp=\"http://schemas.xmlsoap.org/ws/2004/09/policy\"><sp:Basic128 /></wsp:Policy></sp:AlgorithmSuite><sp:Layout><wsp:Policy xmlns:wsp=\"http://schemas.xmlsoap.org/ws/2004/09/policy\"><sp:Strict /></wsp:Policy></sp:Layout><sp:IncludeTimestamp /></wsp:Policy></sp:TransportBinding><sp:EndorsingSupportingTokens xmlns:sp=\"http://schemas.xmlsoap.org/ws/2005/07/securitypolicy\"><wsp:Policy xmlns:wsp=\"http://schemas.xmlsoap.org/ws/2004/09/policy\"><sp:KerberosToken><wsp:Policy xmlns:wsp=\"http://schemas.xmlsoap.org/ws/2004/09/policy\"><sp:WssGssKerberosV5ApReqToken11 /></wsp:Policy></sp:KerberosToken><mssp:RsaToken wsp:Optional=\"true\" sp:IncludeToken=\"http://schemas.xmlsoap.org/ws/2005/07/securitypolicy/IncludeToken/Never\" xmlns:mssp=\"http://schemas.microsoft.com/ws/2005/07/securitypolicy\"></mssp:RsaToken><sp:SignedParts>\n							<sp:Header Name=\"To\" Namespace=\"http://www.w3.org/2005/08/addressing\" />\n						</sp:SignedParts></wsp:Policy></sp:EndorsingSupportingTokens><sp:Wss11 xmlns:sp=\"http://schemas.xmlsoap.org/ws/2005/07/securitypolicy\"><wsp:Policy xmlns:wsp=\"http://schemas.xmlsoap.org/ws/2004/09/policy\"><sp:MustSupportRefKeyIdentifier /><sp:MustSupportRefIssuerSerial /><sp:MustSupportRefThumbprint /><sp:MustSupportRefEncryptedKey /></wsp:Policy></sp:Wss11><sp:Trust10 xmlns:sp=\"http://schemas.xmlsoap.org/ws/2005/07/securitypolicy\"><wsp:Policy xmlns:wsp=\"http://schemas.xmlsoap.org/ws/2004/09/policy\"><sp:MustSupportIssuedTokens /><sp:RequireClientEntropy /><sp:RequireServerEntropy /></wsp:Policy></sp:Trust10><wsaw:UsingAddressing xmlns:wsaw=\"http://www.w3.org/2006/05/addressing/wsdl\"></wsaw:UsingAddressing></wsp:All></wsp:ExactlyOne></wsp:Policy>"));

		(__operation).getMessage(org.apache.axis2.wsdl.WSDLConstants.MESSAGE_LABEL_IN_VALUE).getPolicySubject().attachPolicy(getPolicy("<wsp:Policy wsu:Id=\"CustomBinding_IWSTrustFeb2005Async1_policy\" xmlns:wsp=\"http://schemas.xmlsoap.org/ws/2004/09/policy\" xmlns:wsu=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\"><wsp:ExactlyOne><wsp:All><sp:TransportBinding xmlns:sp=\"http://schemas.xmlsoap.org/ws/2005/07/securitypolicy\"><wsp:Policy xmlns:wsp=\"http://schemas.xmlsoap.org/ws/2004/09/policy\"><sp:TransportToken><wsp:Policy xmlns:wsp=\"http://schemas.xmlsoap.org/ws/2004/09/policy\"><sp:HttpsToken RequireClientCertificate=\"false\"></sp:HttpsToken></wsp:Policy></sp:TransportToken><sp:AlgorithmSuite><wsp:Policy xmlns:wsp=\"http://schemas.xmlsoap.org/ws/2004/09/policy\"><sp:Basic128 /></wsp:Policy></sp:AlgorithmSuite><sp:Layout><wsp:Policy xmlns:wsp=\"http://schemas.xmlsoap.org/ws/2004/09/policy\"><sp:Strict /></wsp:Policy></sp:Layout><sp:IncludeTimestamp /></wsp:Policy></sp:TransportBinding><sp:EndorsingSupportingTokens xmlns:sp=\"http://schemas.xmlsoap.org/ws/2005/07/securitypolicy\"><wsp:Policy xmlns:wsp=\"http://schemas.xmlsoap.org/ws/2004/09/policy\"><sp:KerberosToken><wsp:Policy xmlns:wsp=\"http://schemas.xmlsoap.org/ws/2004/09/policy\"><sp:WssGssKerberosV5ApReqToken11 /></wsp:Policy></sp:KerberosToken><mssp:RsaToken wsp:Optional=\"true\" sp:IncludeToken=\"http://schemas.xmlsoap.org/ws/2005/07/securitypolicy/IncludeToken/Never\" xmlns:mssp=\"http://schemas.microsoft.com/ws/2005/07/securitypolicy\"></mssp:RsaToken><sp:SignedParts>\n							<sp:Header Name=\"To\" Namespace=\"http://www.w3.org/2005/08/addressing\" />\n						</sp:SignedParts></wsp:Policy></sp:EndorsingSupportingTokens><sp:Wss11 xmlns:sp=\"http://schemas.xmlsoap.org/ws/2005/07/securitypolicy\"><wsp:Policy xmlns:wsp=\"http://schemas.xmlsoap.org/ws/2004/09/policy\"><sp:MustSupportRefKeyIdentifier /><sp:MustSupportRefIssuerSerial /><sp:MustSupportRefThumbprint /><sp:MustSupportRefEncryptedKey /></wsp:Policy></sp:Wss11><sp:Trust10 xmlns:sp=\"http://schemas.xmlsoap.org/ws/2005/07/securitypolicy\"><wsp:Policy xmlns:wsp=\"http://schemas.xmlsoap.org/ws/2004/09/policy\"><sp:MustSupportIssuedTokens /><sp:RequireClientEntropy /><sp:RequireServerEntropy /></wsp:Policy></sp:Trust10><wsaw:UsingAddressing xmlns:wsaw=\"http://www.w3.org/2006/05/addressing/wsdl\"></wsaw:UsingAddressing></wsp:All></wsp:ExactlyOne></wsp:Policy>"));


		_operations[0]=__operation;


	}

	//populates the faults
	private void populateFaults(){



	}

	/**
	 *Constructor that takes in a configContext
	 */

	public SecurityTokenServiceStub(org.apache.axis2.context.ConfigurationContext configurationContext,
			java.lang.String targetEndpoint)
					throws org.apache.axis2.AxisFault {
		this(configurationContext,targetEndpoint,false);
	}


	/**
	 * Constructor that takes in a configContext  and useseperate listner
	 */
	public SecurityTokenServiceStub(org.apache.axis2.context.ConfigurationContext configurationContext,
			java.lang.String targetEndpoint, boolean useSeparateListener)
					throws org.apache.axis2.AxisFault {
		//To populate AxisService
		populateAxisService();
		populateFaults();

		_serviceClient = new org.apache.axis2.client.ServiceClient(configurationContext,_service);

		_service.applyPolicy();


		_serviceClient.getOptions().setTo(new org.apache.axis2.addressing.EndpointReference(
				targetEndpoint));
		_serviceClient.getOptions().setUseSeparateListener(useSeparateListener);

		//Set the soap version
		_serviceClient.getOptions().setSoapVersionURI(org.apache.axiom.soap.SOAP12Constants.SOAP_ENVELOPE_NAMESPACE_URI);


	}

	/**
	 * Default Constructor
	 */
	public SecurityTokenServiceStub(org.apache.axis2.context.ConfigurationContext configurationContext) throws org.apache.axis2.AxisFault {

		this(configurationContext,"https://adfs.preprod.nes/adfs/services/trust/2005/kerberosmixed" );

	}

	/**
	 * Default Constructor
	 */
	public SecurityTokenServiceStub() throws org.apache.axis2.AxisFault {

		this("https://adfs.preprod.nes/adfs/services/trust/2005/kerberosmixed" );

	}

	/**
	 * Constructor taking the target endpoint
	 */
	public SecurityTokenServiceStub(java.lang.String targetEndpoint) throws org.apache.axis2.AxisFault {
		this(null,targetEndpoint);
	}




	/**
	 * Auto generated method signature
	 * 
	 * @see com.upwork.axis2_client.SecurityTokenService#trustFeb2005IssueAsync
	 * @param requestSecurityToken0

	 */



	public  com.upwork.axis2_client.SecurityTokenServiceStub.RequestSecurityTokenResponse trustFeb2005IssueAsync(

			com.upwork.axis2_client.SecurityTokenServiceStub.RequestSecurityToken requestSecurityToken0)


					throws java.rmi.RemoteException

	{
		org.apache.axis2.context.MessageContext _messageContext = null;
		try{
			org.apache.axis2.client.OperationClient _operationClient = _serviceClient.createClient(_operations[0].getName());
			_operationClient.getOptions().setAction("http://schemas.xmlsoap.org/ws/2005/02/trust/RST/Issue");
			_operationClient.getOptions().setExceptionToBeThrownOnSOAPFault(true);



			addPropertyToOperationClient(_operationClient,org.apache.axis2.description.WSDL2Constants.ATTR_WHTTP_QUERY_PARAMETER_SEPARATOR,"&");


			// create a message context
			_messageContext = new org.apache.axis2.context.MessageContext();



			// create SOAP envelope with that payload
			org.apache.axiom.soap.SOAPEnvelope env = null;


			env = toEnvelope(getFactory(_operationClient.getOptions().getSoapVersionURI()),
					requestSecurityToken0,
					optimizeContent(new javax.xml.namespace.QName("http://schemas.microsoft.com/ws/2008/06/identity/securitytokenservice",
							"trustFeb2005IssueAsync")), new javax.xml.namespace.QName("http://schemas.microsoft.com/ws/2008/06/identity/securitytokenservice",
									"trustFeb2005IssueAsync"));

			//adding SOAP soap_headers
			_serviceClient.addHeadersToEnvelope(env);
			// set the message context with that soap envelope
			_messageContext.setEnvelope(env);

			// add the message contxt to the operation client
			_operationClient.addMessageContext(_messageContext);

			//execute the operation client
			_operationClient.execute(true);


			org.apache.axis2.context.MessageContext _returnMessageContext = _operationClient.getMessageContext(
					org.apache.axis2.wsdl.WSDLConstants.MESSAGE_LABEL_IN_VALUE);
			org.apache.axiom.soap.SOAPEnvelope _returnEnv = _returnMessageContext.getEnvelope();


			java.lang.Object object = fromOM(
					_returnEnv.getBody().getFirstElement() ,
					com.upwork.axis2_client.SecurityTokenServiceStub.RequestSecurityTokenResponse.class,
					getEnvelopeNamespaces(_returnEnv));


			return (com.upwork.axis2_client.SecurityTokenServiceStub.RequestSecurityTokenResponse)object;

		}catch(org.apache.axis2.AxisFault f){

			org.apache.axiom.om.OMElement faultElt = f.getDetail();
			if (faultElt!=null){
				if (faultExceptionNameMap.containsKey(new org.apache.axis2.client.FaultMapKey(faultElt.getQName(),"TrustFeb2005IssueAsync"))){
					//make the fault by reflection
					try{
						java.lang.String exceptionClassName = (java.lang.String)faultExceptionClassNameMap.get(new org.apache.axis2.client.FaultMapKey(faultElt.getQName(),"TrustFeb2005IssueAsync"));
						java.lang.Class exceptionClass = java.lang.Class.forName(exceptionClassName);
						java.lang.reflect.Constructor constructor = exceptionClass.getConstructor(String.class);
						java.lang.Exception ex = (java.lang.Exception) constructor.newInstance(f.getMessage());
						//message class
						java.lang.String messageClassName = (java.lang.String)faultMessageMap.get(new org.apache.axis2.client.FaultMapKey(faultElt.getQName(),"TrustFeb2005IssueAsync"));
						java.lang.Class messageClass = java.lang.Class.forName(messageClassName);
						java.lang.Object messageObject = fromOM(faultElt,messageClass,null);
						java.lang.reflect.Method m = exceptionClass.getMethod("setFaultMessage",
								new java.lang.Class[]{messageClass});
						m.invoke(ex,new java.lang.Object[]{messageObject});


						throw new java.rmi.RemoteException(ex.getMessage(), ex);
					}catch(java.lang.ClassCastException e){
						// we cannot intantiate the class - throw the original Axis fault
						throw f;
					} catch (java.lang.ClassNotFoundException e) {
						// we cannot intantiate the class - throw the original Axis fault
						throw f;
					}catch (java.lang.NoSuchMethodException e) {
						// we cannot intantiate the class - throw the original Axis fault
						throw f;
					} catch (java.lang.reflect.InvocationTargetException e) {
						// we cannot intantiate the class - throw the original Axis fault
						throw f;
					}  catch (java.lang.IllegalAccessException e) {
						// we cannot intantiate the class - throw the original Axis fault
						throw f;
					}   catch (java.lang.InstantiationException e) {
						// we cannot intantiate the class - throw the original Axis fault
						throw f;
					}
				}else{
					throw f;
				}
			}else{
				throw f;
			}
		} finally {
			if (_messageContext.getTransportOut() != null) {
				_messageContext.getTransportOut().getSender().cleanup(_messageContext);
			}
		}
	}

	/**
	 * Auto generated method signature for Asynchronous Invocations
	 * 
	 * @see com.upwork.axis2_client.SecurityTokenService#starttrustFeb2005IssueAsync
	 * @param requestSecurityToken0

	 */
	public  void starttrustFeb2005IssueAsync(

			com.upwork.axis2_client.SecurityTokenServiceStub.RequestSecurityToken requestSecurityToken0,

			final com.upwork.axis2_client.SecurityTokenServiceCallbackHandler callback)

					throws java.rmi.RemoteException{

		org.apache.axis2.client.OperationClient _operationClient = _serviceClient.createClient(_operations[0].getName());
		_operationClient.getOptions().setAction("http://schemas.xmlsoap.org/ws/2005/02/trust/RST/Issue");
		_operationClient.getOptions().setExceptionToBeThrownOnSOAPFault(true);



		addPropertyToOperationClient(_operationClient,org.apache.axis2.description.WSDL2Constants.ATTR_WHTTP_QUERY_PARAMETER_SEPARATOR,"&");



		// create SOAP envelope with that payload
		org.apache.axiom.soap.SOAPEnvelope env=null;
		final org.apache.axis2.context.MessageContext _messageContext = new org.apache.axis2.context.MessageContext();


		//Style is Doc.


		env = toEnvelope(getFactory(_operationClient.getOptions().getSoapVersionURI()),
				requestSecurityToken0,
				optimizeContent(new javax.xml.namespace.QName("http://schemas.microsoft.com/ws/2008/06/identity/securitytokenservice",
						"trustFeb2005IssueAsync")), new javax.xml.namespace.QName("http://schemas.microsoft.com/ws/2008/06/identity/securitytokenservice",
								"trustFeb2005IssueAsync"));

		// adding SOAP soap_headers
		_serviceClient.addHeadersToEnvelope(env);
		// create message context with that soap envelope
		_messageContext.setEnvelope(env);

		// add the message context to the operation client
		_operationClient.addMessageContext(_messageContext);



		_operationClient.setCallback(new org.apache.axis2.client.async.AxisCallback() {
			public void onMessage(org.apache.axis2.context.MessageContext resultContext) {
				try {
					org.apache.axiom.soap.SOAPEnvelope resultEnv = resultContext.getEnvelope();

					java.lang.Object object = fromOM(resultEnv.getBody().getFirstElement(),
							com.upwork.axis2_client.SecurityTokenServiceStub.RequestSecurityTokenResponse.class,
							getEnvelopeNamespaces(resultEnv));
					callback.receiveResulttrustFeb2005IssueAsync(
							(com.upwork.axis2_client.SecurityTokenServiceStub.RequestSecurityTokenResponse)object);

				} catch (org.apache.axis2.AxisFault e) {
					callback.receiveErrortrustFeb2005IssueAsync(e);
				}
			}

			public void onError(java.lang.Exception error) {
				if (error instanceof org.apache.axis2.AxisFault) {
					org.apache.axis2.AxisFault f = (org.apache.axis2.AxisFault) error;
					org.apache.axiom.om.OMElement faultElt = f.getDetail();
					if (faultElt!=null){
						if (faultExceptionNameMap.containsKey(new org.apache.axis2.client.FaultMapKey(faultElt.getQName(),"TrustFeb2005IssueAsync"))){
							//make the fault by reflection
							try{
								java.lang.String exceptionClassName = (java.lang.String)faultExceptionClassNameMap.get(new org.apache.axis2.client.FaultMapKey(faultElt.getQName(),"TrustFeb2005IssueAsync"));
								java.lang.Class exceptionClass = java.lang.Class.forName(exceptionClassName);
								java.lang.reflect.Constructor constructor = exceptionClass.getConstructor(String.class);
								java.lang.Exception ex = (java.lang.Exception) constructor.newInstance(f.getMessage());
								//message class
								java.lang.String messageClassName = (java.lang.String)faultMessageMap.get(new org.apache.axis2.client.FaultMapKey(faultElt.getQName(),"TrustFeb2005IssueAsync"));
								java.lang.Class messageClass = java.lang.Class.forName(messageClassName);
								java.lang.Object messageObject = fromOM(faultElt,messageClass,null);
								java.lang.reflect.Method m = exceptionClass.getMethod("setFaultMessage",
										new java.lang.Class[]{messageClass});
								m.invoke(ex,new java.lang.Object[]{messageObject});


								callback.receiveErrortrustFeb2005IssueAsync(new java.rmi.RemoteException(ex.getMessage(), ex));
							} catch(java.lang.ClassCastException e){
								// we cannot intantiate the class - throw the original Axis fault
								callback.receiveErrortrustFeb2005IssueAsync(f);
							} catch (java.lang.ClassNotFoundException e) {
								// we cannot intantiate the class - throw the original Axis fault
								callback.receiveErrortrustFeb2005IssueAsync(f);
							} catch (java.lang.NoSuchMethodException e) {
								// we cannot intantiate the class - throw the original Axis fault
								callback.receiveErrortrustFeb2005IssueAsync(f);
							} catch (java.lang.reflect.InvocationTargetException e) {
								// we cannot intantiate the class - throw the original Axis fault
								callback.receiveErrortrustFeb2005IssueAsync(f);
							} catch (java.lang.IllegalAccessException e) {
								// we cannot intantiate the class - throw the original Axis fault
								callback.receiveErrortrustFeb2005IssueAsync(f);
							} catch (java.lang.InstantiationException e) {
								// we cannot intantiate the class - throw the original Axis fault
								callback.receiveErrortrustFeb2005IssueAsync(f);
							} catch (org.apache.axis2.AxisFault e) {
								// we cannot intantiate the class - throw the original Axis fault
								callback.receiveErrortrustFeb2005IssueAsync(f);
							}
						} else {
							callback.receiveErrortrustFeb2005IssueAsync(f);
						}
					} else {
						callback.receiveErrortrustFeb2005IssueAsync(f);
					}
				} else {
					callback.receiveErrortrustFeb2005IssueAsync(error);
				}
			}

			public void onFault(org.apache.axis2.context.MessageContext faultContext) {
				org.apache.axis2.AxisFault fault = org.apache.axis2.util.Utils.getInboundFaultFromMessageContext(faultContext);
				onError(fault);
			}

			public void onComplete() {
				try {
					_messageContext.getTransportOut().getSender().cleanup(_messageContext);
				} catch (org.apache.axis2.AxisFault axisFault) {
					callback.receiveErrortrustFeb2005IssueAsync(axisFault);
				}
			}
		});


		org.apache.axis2.util.CallbackReceiver _callbackReceiver = null;
		if ( _operations[0].getMessageReceiver()==null &&  _operationClient.getOptions().isUseSeparateListener()) {
			_callbackReceiver = new org.apache.axis2.util.CallbackReceiver();
			_operations[0].setMessageReceiver(
					_callbackReceiver);
		}

		//execute the operation client
		_operationClient.execute(false);

	}



	/**
	 *  A utility method that copies the namepaces from the SOAPEnvelope
	 */
	private java.util.Map getEnvelopeNamespaces(org.apache.axiom.soap.SOAPEnvelope env){
		java.util.Map returnMap = new java.util.HashMap();
		java.util.Iterator namespaceIterator = env.getAllDeclaredNamespaces();
		while (namespaceIterator.hasNext()) {
			org.apache.axiom.om.OMNamespace ns = (org.apache.axiom.om.OMNamespace) namespaceIterator.next();
			returnMap.put(ns.getPrefix(),ns.getNamespaceURI());
		}
		return returnMap;
	}


	////////////////////////////////////////////////////////////////////////

	private static org.apache.neethi.Policy getPolicy (java.lang.String policyString) {
		return org.apache.neethi.PolicyEngine.getPolicy(org.apache.axiom.om.OMXMLBuilderFactory.createOMBuilder(
				new java.io.StringReader(policyString)).getDocument().getXMLStreamReader(false));
	}

	/////////////////////////////////////////////////////////////////////////



	private javax.xml.namespace.QName[] opNameArray = null;
	private boolean optimizeContent(javax.xml.namespace.QName opName) {


		if (opNameArray == null) {
			return false;
		}
		for (int i = 0; i < opNameArray.length; i++) {
			if (opName.equals(opNameArray[i])) {
				return true;   
			}
		}
		return false;
	}
	//https://adfs.preprod.nes/adfs/services/trust/2005/kerberosmixed
	public static class RequestSecurityToken
	implements org.apache.axis2.databinding.ADBBean{

		public static final javax.xml.namespace.QName MY_QNAME = new javax.xml.namespace.QName(
				"http://schemas.xmlsoap.org/ws/2005/02/trust",
				"RequestSecurityToken",
				"ns1");



		/**
		 * field for RequestSecurityToken
		 */


		protected RequestSecurityTokenType localRequestSecurityToken ;


		/**
		 * Auto generated getter method
		 * @return RequestSecurityTokenType
		 */
		public  RequestSecurityTokenType getRequestSecurityToken(){
			return localRequestSecurityToken;
		}



		/**
		 * Auto generated setter method
		 * @param param RequestSecurityToken
		 */
		public void setRequestSecurityToken(RequestSecurityTokenType param){

			this.localRequestSecurityToken=param;


		}




		/**
		 *
		 * @param parentQName
		 * @param factory
		 * @return org.apache.axiom.om.OMElement
		 */
		public org.apache.axiom.om.OMElement getOMElement (
				final javax.xml.namespace.QName parentQName,
				final org.apache.axiom.om.OMFactory factory) throws org.apache.axis2.databinding.ADBException{



			org.apache.axiom.om.OMDataSource dataSource =
					new org.apache.axis2.databinding.ADBDataSource(this,MY_QNAME);
			return factory.createOMElement(dataSource,MY_QNAME);

		}

		public void serialize(final javax.xml.namespace.QName parentQName,
				javax.xml.stream.XMLStreamWriter xmlWriter)
						throws javax.xml.stream.XMLStreamException, org.apache.axis2.databinding.ADBException{
			serialize(parentQName,xmlWriter,false);
		}

		public void serialize(final javax.xml.namespace.QName parentQName,
				javax.xml.stream.XMLStreamWriter xmlWriter,
				boolean serializeType)
						throws javax.xml.stream.XMLStreamException, org.apache.axis2.databinding.ADBException{


			//We can safely assume an element has only one type associated with it

			if (localRequestSecurityToken==null){
				throw new org.apache.axis2.databinding.ADBException("RequestSecurityToken cannot be null!");
			}
			localRequestSecurityToken.serialize(MY_QNAME,xmlWriter);


		}

		private static java.lang.String generatePrefix(java.lang.String namespace) {
			if(namespace.equals("http://schemas.xmlsoap.org/ws/2005/02/trust")){
				return "ns1";
			}
			return org.apache.axis2.databinding.utils.BeanUtil.getUniquePrefix();
		}

		/**
		 * Utility method to write an element start tag.
		 */
		private void writeStartElement(java.lang.String prefix, java.lang.String namespace, java.lang.String localPart,
				javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException {
			java.lang.String writerPrefix = xmlWriter.getPrefix(namespace);
			if (writerPrefix != null) {
				xmlWriter.writeStartElement(namespace, localPart);
			} else {
				if (namespace.length() == 0) {
					prefix = "";
				} else if (prefix == null) {
					prefix = generatePrefix(namespace);
				}

				xmlWriter.writeStartElement(prefix, localPart, namespace);
				xmlWriter.writeNamespace(prefix, namespace);
				xmlWriter.setPrefix(prefix, namespace);
			}
		}

		/**
		 * Util method to write an attribute with the ns prefix
		 */
		private void writeAttribute(java.lang.String prefix,java.lang.String namespace,java.lang.String attName,
				java.lang.String attValue,javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException{
			if (xmlWriter.getPrefix(namespace) == null) {
				xmlWriter.writeNamespace(prefix, namespace);
				xmlWriter.setPrefix(prefix, namespace);
			}
			xmlWriter.writeAttribute(namespace,attName,attValue);
		}

		/**
		 * Util method to write an attribute without the ns prefix
		 */
		private void writeAttribute(java.lang.String namespace,java.lang.String attName,
				java.lang.String attValue,javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException{
			if (namespace.equals("")) {
				xmlWriter.writeAttribute(attName,attValue);
			} else {
				registerPrefix(xmlWriter, namespace);
				xmlWriter.writeAttribute(namespace,attName,attValue);
			}
		}


		/**
		 * Util method to write an attribute without the ns prefix
		 */
		private void writeQNameAttribute(java.lang.String namespace, java.lang.String attName,
				javax.xml.namespace.QName qname, javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException {

			java.lang.String attributeNamespace = qname.getNamespaceURI();
			java.lang.String attributePrefix = xmlWriter.getPrefix(attributeNamespace);
			if (attributePrefix == null) {
				attributePrefix = registerPrefix(xmlWriter, attributeNamespace);
			}
			java.lang.String attributeValue;
			if (attributePrefix.trim().length() > 0) {
				attributeValue = attributePrefix + ":" + qname.getLocalPart();
			} else {
				attributeValue = qname.getLocalPart();
			}

			if (namespace.equals("")) {
				xmlWriter.writeAttribute(attName, attributeValue);
			} else {
				registerPrefix(xmlWriter, namespace);
				xmlWriter.writeAttribute(namespace, attName, attributeValue);
			}
		}
		/**
		 *  method to handle Qnames
		 */

		private void writeQName(javax.xml.namespace.QName qname,
				javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException {
			java.lang.String namespaceURI = qname.getNamespaceURI();
			if (namespaceURI != null) {
				java.lang.String prefix = xmlWriter.getPrefix(namespaceURI);
				if (prefix == null) {
					prefix = generatePrefix(namespaceURI);
					xmlWriter.writeNamespace(prefix, namespaceURI);
					xmlWriter.setPrefix(prefix,namespaceURI);
				}

				if (prefix.trim().length() > 0){
					xmlWriter.writeCharacters(prefix + ":" + org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qname));
				} else {
					// i.e this is the default namespace
					xmlWriter.writeCharacters(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qname));
				}

			} else {
				xmlWriter.writeCharacters(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qname));
			}
		}

		private void writeQNames(javax.xml.namespace.QName[] qnames,
				javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException {

			if (qnames != null) {
				// we have to store this data until last moment since it is not possible to write any
				// namespace data after writing the charactor data
				java.lang.StringBuffer stringToWrite = new java.lang.StringBuffer();
				java.lang.String namespaceURI = null;
				java.lang.String prefix = null;

				for (int i = 0; i < qnames.length; i++) {
					if (i > 0) {
						stringToWrite.append(" ");
					}
					namespaceURI = qnames[i].getNamespaceURI();
					if (namespaceURI != null) {
						prefix = xmlWriter.getPrefix(namespaceURI);
						if ((prefix == null) || (prefix.length() == 0)) {
							prefix = generatePrefix(namespaceURI);
							xmlWriter.writeNamespace(prefix, namespaceURI);
							xmlWriter.setPrefix(prefix,namespaceURI);
						}

						if (prefix.trim().length() > 0){
							stringToWrite.append(prefix).append(":").append(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qnames[i]));
						} else {
							stringToWrite.append(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qnames[i]));
						}
					} else {
						stringToWrite.append(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qnames[i]));
					}
				}
				xmlWriter.writeCharacters(stringToWrite.toString());
			}

		}


		/**
		 * Register a namespace prefix
		 */
		private java.lang.String registerPrefix(javax.xml.stream.XMLStreamWriter xmlWriter, java.lang.String namespace) throws javax.xml.stream.XMLStreamException {
			java.lang.String prefix = xmlWriter.getPrefix(namespace);
			if (prefix == null) {
				prefix = generatePrefix(namespace);
				javax.xml.namespace.NamespaceContext nsContext = xmlWriter.getNamespaceContext();
				while (true) {
					java.lang.String uri = nsContext.getNamespaceURI(prefix);
					if (uri == null || uri.length() == 0) {
						break;
					}
					prefix = org.apache.axis2.databinding.utils.BeanUtil.getUniquePrefix();
				}
				xmlWriter.writeNamespace(prefix, namespace);
				xmlWriter.setPrefix(prefix, namespace);
			}
			return prefix;
		}



		/**
		 * databinding method to get an XML representation of this object
		 *
		 */
		public javax.xml.stream.XMLStreamReader getPullParser(javax.xml.namespace.QName qName)
				throws org.apache.axis2.databinding.ADBException{




			//We can safely assume an element has only one type associated with it
			return localRequestSecurityToken.getPullParser(MY_QNAME);

		}



		/**
		 *  Factory class that keeps the parse method
		 */
		public static class Factory{




			/**
			 * static method to create the object
			 * Precondition:  If this object is an element, the current or next start element starts this object and any intervening reader events are ignorable
			 *                If this object is not an element, it is a complex type and the reader is at the event just after the outer start element
			 * Postcondition: If this object is an element, the reader is positioned at its end element
			 *                If this object is a complex type, the reader is positioned at the end element of its outer element
			 */
			public static RequestSecurityToken parse(javax.xml.stream.XMLStreamReader reader) throws java.lang.Exception{
				RequestSecurityToken object =
						new RequestSecurityToken();

				int event;
				java.lang.String nillableValue = null;
				java.lang.String prefix ="";
				java.lang.String namespaceuri ="";
				try {

					while (!reader.isStartElement() && !reader.isEndElement())
						reader.next();




					// Note all attributes that were handled. Used to differ normal attributes
					// from anyAttributes.
					java.util.Vector handledAttributes = new java.util.Vector();



					while(!reader.isEndElement()) {
						if (reader.isStartElement() ){

							if (reader.isStartElement() && new javax.xml.namespace.QName("http://schemas.xmlsoap.org/ws/2005/02/trust","RequestSecurityToken").equals(reader.getName())){

								object.setRequestSecurityToken(RequestSecurityTokenType.Factory.parse(reader));

							}  // End of if for expected property start element

							else{
								// A start element we are not expecting indicates an invalid parameter was passed
								throw new org.apache.axis2.databinding.ADBException("Unexpected subelement " + reader.getName());
							}

						} else {
							reader.next();
						}  
					}  // end of while loop




				} catch (javax.xml.stream.XMLStreamException e) {
					throw new java.lang.Exception(e);
				}

				return object;
			}

		}//end of factory class



	}


	public static class RequestSecurityTokenResponse
	implements org.apache.axis2.databinding.ADBBean{

		public static final javax.xml.namespace.QName MY_QNAME = new javax.xml.namespace.QName(
				"http://schemas.xmlsoap.org/ws/2005/02/trust",
				"RequestSecurityTokenResponse",
				"ns1");



		/**
		 * field for RequestSecurityTokenResponse
		 */


		protected RequestSecurityTokenResponseType localRequestSecurityTokenResponse ;


		/**
		 * Auto generated getter method
		 * @return RequestSecurityTokenResponseType
		 */
		public  RequestSecurityTokenResponseType getRequestSecurityTokenResponse(){
			return localRequestSecurityTokenResponse;
		}



		/**
		 * Auto generated setter method
		 * @param param RequestSecurityTokenResponse
		 */
		public void setRequestSecurityTokenResponse(RequestSecurityTokenResponseType param){

			this.localRequestSecurityTokenResponse=param;


		}




		/**
		 *
		 * @param parentQName
		 * @param factory
		 * @return org.apache.axiom.om.OMElement
		 */
		public org.apache.axiom.om.OMElement getOMElement (
				final javax.xml.namespace.QName parentQName,
				final org.apache.axiom.om.OMFactory factory) throws org.apache.axis2.databinding.ADBException{



			org.apache.axiom.om.OMDataSource dataSource =
					new org.apache.axis2.databinding.ADBDataSource(this,MY_QNAME);
			return factory.createOMElement(dataSource,MY_QNAME);

		}

		public void serialize(final javax.xml.namespace.QName parentQName,
				javax.xml.stream.XMLStreamWriter xmlWriter)
						throws javax.xml.stream.XMLStreamException, org.apache.axis2.databinding.ADBException{
			serialize(parentQName,xmlWriter,false);
		}

		public void serialize(final javax.xml.namespace.QName parentQName,
				javax.xml.stream.XMLStreamWriter xmlWriter,
				boolean serializeType)
						throws javax.xml.stream.XMLStreamException, org.apache.axis2.databinding.ADBException{


			//We can safely assume an element has only one type associated with it

			if (localRequestSecurityTokenResponse==null){
				throw new org.apache.axis2.databinding.ADBException("RequestSecurityTokenResponse cannot be null!");
			}
			localRequestSecurityTokenResponse.serialize(MY_QNAME,xmlWriter);


		}

		private static java.lang.String generatePrefix(java.lang.String namespace) {
			if(namespace.equals("http://schemas.xmlsoap.org/ws/2005/02/trust")){
				return "ns1";
			}
			return org.apache.axis2.databinding.utils.BeanUtil.getUniquePrefix();
		}

		/**
		 * Utility method to write an element start tag.
		 */
		private void writeStartElement(java.lang.String prefix, java.lang.String namespace, java.lang.String localPart,
				javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException {
			java.lang.String writerPrefix = xmlWriter.getPrefix(namespace);
			if (writerPrefix != null) {
				xmlWriter.writeStartElement(namespace, localPart);
			} else {
				if (namespace.length() == 0) {
					prefix = "";
				} else if (prefix == null) {
					prefix = generatePrefix(namespace);
				}

				xmlWriter.writeStartElement(prefix, localPart, namespace);
				xmlWriter.writeNamespace(prefix, namespace);
				xmlWriter.setPrefix(prefix, namespace);
			}
		}

		/**
		 * Util method to write an attribute with the ns prefix
		 */
		private void writeAttribute(java.lang.String prefix,java.lang.String namespace,java.lang.String attName,
				java.lang.String attValue,javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException{
			if (xmlWriter.getPrefix(namespace) == null) {
				xmlWriter.writeNamespace(prefix, namespace);
				xmlWriter.setPrefix(prefix, namespace);
			}
			xmlWriter.writeAttribute(namespace,attName,attValue);
		}

		/**
		 * Util method to write an attribute without the ns prefix
		 */
		private void writeAttribute(java.lang.String namespace,java.lang.String attName,
				java.lang.String attValue,javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException{
			if (namespace.equals("")) {
				xmlWriter.writeAttribute(attName,attValue);
			} else {
				registerPrefix(xmlWriter, namespace);
				xmlWriter.writeAttribute(namespace,attName,attValue);
			}
		}


		/**
		 * Util method to write an attribute without the ns prefix
		 */
		private void writeQNameAttribute(java.lang.String namespace, java.lang.String attName,
				javax.xml.namespace.QName qname, javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException {

			java.lang.String attributeNamespace = qname.getNamespaceURI();
			java.lang.String attributePrefix = xmlWriter.getPrefix(attributeNamespace);
			if (attributePrefix == null) {
				attributePrefix = registerPrefix(xmlWriter, attributeNamespace);
			}
			java.lang.String attributeValue;
			if (attributePrefix.trim().length() > 0) {
				attributeValue = attributePrefix + ":" + qname.getLocalPart();
			} else {
				attributeValue = qname.getLocalPart();
			}

			if (namespace.equals("")) {
				xmlWriter.writeAttribute(attName, attributeValue);
			} else {
				registerPrefix(xmlWriter, namespace);
				xmlWriter.writeAttribute(namespace, attName, attributeValue);
			}
		}
		/**
		 *  method to handle Qnames
		 */

		private void writeQName(javax.xml.namespace.QName qname,
				javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException {
			java.lang.String namespaceURI = qname.getNamespaceURI();
			if (namespaceURI != null) {
				java.lang.String prefix = xmlWriter.getPrefix(namespaceURI);
				if (prefix == null) {
					prefix = generatePrefix(namespaceURI);
					xmlWriter.writeNamespace(prefix, namespaceURI);
					xmlWriter.setPrefix(prefix,namespaceURI);
				}

				if (prefix.trim().length() > 0){
					xmlWriter.writeCharacters(prefix + ":" + org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qname));
				} else {
					// i.e this is the default namespace
					xmlWriter.writeCharacters(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qname));
				}

			} else {
				xmlWriter.writeCharacters(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qname));
			}
		}

		private void writeQNames(javax.xml.namespace.QName[] qnames,
				javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException {

			if (qnames != null) {
				// we have to store this data until last moment since it is not possible to write any
				// namespace data after writing the charactor data
				java.lang.StringBuffer stringToWrite = new java.lang.StringBuffer();
				java.lang.String namespaceURI = null;
				java.lang.String prefix = null;

				for (int i = 0; i < qnames.length; i++) {
					if (i > 0) {
						stringToWrite.append(" ");
					}
					namespaceURI = qnames[i].getNamespaceURI();
					if (namespaceURI != null) {
						prefix = xmlWriter.getPrefix(namespaceURI);
						if ((prefix == null) || (prefix.length() == 0)) {
							prefix = generatePrefix(namespaceURI);
							xmlWriter.writeNamespace(prefix, namespaceURI);
							xmlWriter.setPrefix(prefix,namespaceURI);
						}

						if (prefix.trim().length() > 0){
							stringToWrite.append(prefix).append(":").append(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qnames[i]));
						} else {
							stringToWrite.append(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qnames[i]));
						}
					} else {
						stringToWrite.append(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qnames[i]));
					}
				}
				xmlWriter.writeCharacters(stringToWrite.toString());
			}

		}


		/**
		 * Register a namespace prefix
		 */
		private java.lang.String registerPrefix(javax.xml.stream.XMLStreamWriter xmlWriter, java.lang.String namespace) throws javax.xml.stream.XMLStreamException {
			java.lang.String prefix = xmlWriter.getPrefix(namespace);
			if (prefix == null) {
				prefix = generatePrefix(namespace);
				javax.xml.namespace.NamespaceContext nsContext = xmlWriter.getNamespaceContext();
				while (true) {
					java.lang.String uri = nsContext.getNamespaceURI(prefix);
					if (uri == null || uri.length() == 0) {
						break;
					}
					prefix = org.apache.axis2.databinding.utils.BeanUtil.getUniquePrefix();
				}
				xmlWriter.writeNamespace(prefix, namespace);
				xmlWriter.setPrefix(prefix, namespace);
			}
			return prefix;
		}



		/**
		 * databinding method to get an XML representation of this object
		 *
		 */
		public javax.xml.stream.XMLStreamReader getPullParser(javax.xml.namespace.QName qName)
				throws org.apache.axis2.databinding.ADBException{




			//We can safely assume an element has only one type associated with it
			return localRequestSecurityTokenResponse.getPullParser(MY_QNAME);

		}



		/**
		 *  Factory class that keeps the parse method
		 */
		public static class Factory{




			/**
			 * static method to create the object
			 * Precondition:  If this object is an element, the current or next start element starts this object and any intervening reader events are ignorable
			 *                If this object is not an element, it is a complex type and the reader is at the event just after the outer start element
			 * Postcondition: If this object is an element, the reader is positioned at its end element
			 *                If this object is a complex type, the reader is positioned at the end element of its outer element
			 */
			public static RequestSecurityTokenResponse parse(javax.xml.stream.XMLStreamReader reader) throws java.lang.Exception{
				RequestSecurityTokenResponse object =
						new RequestSecurityTokenResponse();

				int event;
				java.lang.String nillableValue = null;
				java.lang.String prefix ="";
				java.lang.String namespaceuri ="";
				try {

					while (!reader.isStartElement() && !reader.isEndElement())
						reader.next();




					// Note all attributes that were handled. Used to differ normal attributes
					// from anyAttributes.
					java.util.Vector handledAttributes = new java.util.Vector();



					while(!reader.isEndElement()) {
						if (reader.isStartElement() ){

							if (reader.isStartElement() && new javax.xml.namespace.QName("http://schemas.xmlsoap.org/ws/2005/02/trust","RequestSecurityTokenResponse").equals(reader.getName())){

								object.setRequestSecurityTokenResponse(RequestSecurityTokenResponseType.Factory.parse(reader));

							}  // End of if for expected property start element

							else{
								// A start element we are not expecting indicates an invalid parameter was passed
								throw new org.apache.axis2.databinding.ADBException("Unexpected subelement " + reader.getName());
							}

						} else {
							reader.next();
						}  
					}  // end of while loop




				} catch (javax.xml.stream.XMLStreamException e) {
					throw new java.lang.Exception(e);
				}

				return object;
			}

		}//end of factory class



	}


	public static class RequestSecurityTokenResponseType
	implements org.apache.axis2.databinding.ADBBean{
		/* This type was generated from the piece of schema that had
                name = RequestSecurityTokenResponseType
                Namespace URI = http://schemas.xmlsoap.org/ws/2005/02/trust
                Namespace Prefix = ns1
		 */


		/**
		 * field for RequestSecurityTokenResponseTypeChoice
		 * This was an Array!
		 */


		protected RequestSecurityTokenResponseTypeChoice[] localRequestSecurityTokenResponseTypeChoice ;

		/*  This tracker boolean wil be used to detect whether the user called the set method
		 *   for this attribute. It will be used to determine whether to include this field
		 *   in the serialized XML
		 */
		protected boolean localRequestSecurityTokenResponseTypeChoiceTracker = false ;

		public boolean isRequestSecurityTokenResponseTypeChoiceSpecified(){
			return localRequestSecurityTokenResponseTypeChoiceTracker;
		}



		/**
		 * Auto generated getter method
		 * @return RequestSecurityTokenResponseTypeChoice[]
		 */
		public  RequestSecurityTokenResponseTypeChoice[] getRequestSecurityTokenResponseTypeChoice(){
			return localRequestSecurityTokenResponseTypeChoice;
		}






		/**
		 * validate the array for RequestSecurityTokenResponseTypeChoice
		 */
		protected void validateRequestSecurityTokenResponseTypeChoice(RequestSecurityTokenResponseTypeChoice[] param){

		}


		/**
		 * Auto generated setter method
		 * @param param RequestSecurityTokenResponseTypeChoice
		 */
		public void setRequestSecurityTokenResponseTypeChoice(RequestSecurityTokenResponseTypeChoice[] param){

			validateRequestSecurityTokenResponseTypeChoice(param);

			localRequestSecurityTokenResponseTypeChoiceTracker = param != null;

			this.localRequestSecurityTokenResponseTypeChoice=param;
		}



		/**
		 * Auto generated add method for the array for convenience
		 * @param param RequestSecurityTokenResponseTypeChoice
		 */
		public void addRequestSecurityTokenResponseTypeChoice(RequestSecurityTokenResponseTypeChoice param){
			if (localRequestSecurityTokenResponseTypeChoice == null){
				localRequestSecurityTokenResponseTypeChoice = new RequestSecurityTokenResponseTypeChoice[]{};
			}


			//update the setting tracker
			localRequestSecurityTokenResponseTypeChoiceTracker = true;


			java.util.List list =
					org.apache.axis2.databinding.utils.ConverterUtil.toList(localRequestSecurityTokenResponseTypeChoice);
			list.add(param);
			this.localRequestSecurityTokenResponseTypeChoice =
					(RequestSecurityTokenResponseTypeChoice[])list.toArray(
							new RequestSecurityTokenResponseTypeChoice[list.size()]);

		}


		/**
		 * field for Context
		 * This was an Attribute!
		 */


		protected org.apache.axis2.databinding.types.URI localContext ;


		/**
		 * Auto generated getter method
		 * @return org.apache.axis2.databinding.types.URI
		 */
		public  org.apache.axis2.databinding.types.URI getContext(){
			return localContext;
		}



		/**
		 * Auto generated setter method
		 * @param param Context
		 */
		public void setContext(org.apache.axis2.databinding.types.URI param){

			this.localContext=param;


		}


		/**
		 * field for ExtraAttributes
		 * This was an Attribute!
		 * This was an Array!
		 */


		protected org.apache.axiom.om.OMAttribute[] localExtraAttributes ;


		/**
		 * Auto generated getter method
		 * @return org.apache.axiom.om.OMAttribute[]
		 */
		public  org.apache.axiom.om.OMAttribute[] getExtraAttributes(){
			return localExtraAttributes;
		}






		/**
		 * validate the array for ExtraAttributes
		 */
		protected void validateExtraAttributes(org.apache.axiom.om.OMAttribute[] param){

			if ((param != null) && (param.length > 1)){
				throw new java.lang.RuntimeException();
			}

			if ((param != null) && (param.length < 1)){
				throw new java.lang.RuntimeException();
			}

		}


		/**
		 * Auto generated setter method
		 * @param param ExtraAttributes
		 */
		public void setExtraAttributes(org.apache.axiom.om.OMAttribute[] param){

			validateExtraAttributes(param);


			this.localExtraAttributes=param;
		}



		/**
		 * Auto generated add method for the array for convenience
		 * @param param org.apache.axiom.om.OMAttribute
		 */
		public void addExtraAttributes(org.apache.axiom.om.OMAttribute param){
			if (localExtraAttributes == null){
				localExtraAttributes = new org.apache.axiom.om.OMAttribute[]{};
			}



			java.util.List list =
					org.apache.axis2.databinding.utils.ConverterUtil.toList(localExtraAttributes);
			list.add(param);
			this.localExtraAttributes =
					(org.apache.axiom.om.OMAttribute[])list.toArray(
							new org.apache.axiom.om.OMAttribute[list.size()]);

		}




		/**
		 *
		 * @param parentQName
		 * @param factory
		 * @return org.apache.axiom.om.OMElement
		 */
		public org.apache.axiom.om.OMElement getOMElement (
				final javax.xml.namespace.QName parentQName,
				final org.apache.axiom.om.OMFactory factory) throws org.apache.axis2.databinding.ADBException{



			org.apache.axiom.om.OMDataSource dataSource =
					new org.apache.axis2.databinding.ADBDataSource(this,parentQName);
			return factory.createOMElement(dataSource,parentQName);

		}

		public void serialize(final javax.xml.namespace.QName parentQName,
				javax.xml.stream.XMLStreamWriter xmlWriter)
						throws javax.xml.stream.XMLStreamException, org.apache.axis2.databinding.ADBException{
			serialize(parentQName,xmlWriter,false);
		}

		public void serialize(final javax.xml.namespace.QName parentQName,
				javax.xml.stream.XMLStreamWriter xmlWriter,
				boolean serializeType)
						throws javax.xml.stream.XMLStreamException, org.apache.axis2.databinding.ADBException{




			java.lang.String prefix = null;
			java.lang.String namespace = null;


			prefix = parentQName.getPrefix();
			namespace = parentQName.getNamespaceURI();
			writeStartElement(prefix, namespace, parentQName.getLocalPart(), xmlWriter);

			if (serializeType){


				java.lang.String namespacePrefix = registerPrefix(xmlWriter,"http://schemas.xmlsoap.org/ws/2005/02/trust");
				if ((namespacePrefix != null) && (namespacePrefix.trim().length() > 0)){
					writeAttribute("xsi","http://www.w3.org/2001/XMLSchema-instance","type",
							namespacePrefix+":RequestSecurityTokenResponseType",
							xmlWriter);
				} else {
					writeAttribute("xsi","http://www.w3.org/2001/XMLSchema-instance","type",
							"RequestSecurityTokenResponseType",
							xmlWriter);
				}


			}

			if (localContext != null){

				writeAttribute("",
						"Context",
						org.apache.axis2.databinding.utils.ConverterUtil.convertToString(localContext), xmlWriter);


			}

			if (localExtraAttributes != null) {
				for (int i=0;i <localExtraAttributes.length;i++){
					writeAttribute(localExtraAttributes[i].getNamespace().getName(),
							localExtraAttributes[i].getLocalName(),
							localExtraAttributes[i].getAttributeValue(),xmlWriter);
				}
			}
			if (localRequestSecurityTokenResponseTypeChoiceTracker){

				if (localRequestSecurityTokenResponseTypeChoice!=null){
					for (int i = 0;i < localRequestSecurityTokenResponseTypeChoice.length;i++){
						if (localRequestSecurityTokenResponseTypeChoice[i] != null){
							localRequestSecurityTokenResponseTypeChoice[i].serialize(null,xmlWriter);
						} else {

							// we don't have to do any thing since minOccures is zero

						}

					}
				} else {
					throw new org.apache.axis2.databinding.ADBException("RequestSecurityTokenResponseTypeChoice cannot be null!!");
				}
			}
			xmlWriter.writeEndElement();


		}

		private static java.lang.String generatePrefix(java.lang.String namespace) {
			if(namespace.equals("http://schemas.xmlsoap.org/ws/2005/02/trust")){
				return "ns1";
			}
			return org.apache.axis2.databinding.utils.BeanUtil.getUniquePrefix();
		}

		/**
		 * Utility method to write an element start tag.
		 */
		private void writeStartElement(java.lang.String prefix, java.lang.String namespace, java.lang.String localPart,
				javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException {
			java.lang.String writerPrefix = xmlWriter.getPrefix(namespace);
			if (writerPrefix != null) {
				xmlWriter.writeStartElement(namespace, localPart);
			} else {
				if (namespace.length() == 0) {
					prefix = "";
				} else if (prefix == null) {
					prefix = generatePrefix(namespace);
				}

				xmlWriter.writeStartElement(prefix, localPart, namespace);
				xmlWriter.writeNamespace(prefix, namespace);
				xmlWriter.setPrefix(prefix, namespace);
			}
		}

		/**
		 * Util method to write an attribute with the ns prefix
		 */
		private void writeAttribute(java.lang.String prefix,java.lang.String namespace,java.lang.String attName,
				java.lang.String attValue,javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException{
			if (xmlWriter.getPrefix(namespace) == null) {
				xmlWriter.writeNamespace(prefix, namespace);
				xmlWriter.setPrefix(prefix, namespace);
			}
			xmlWriter.writeAttribute(namespace,attName,attValue);
		}

		/**
		 * Util method to write an attribute without the ns prefix
		 */
		private void writeAttribute(java.lang.String namespace,java.lang.String attName,
				java.lang.String attValue,javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException{
			if (namespace.equals("")) {
				xmlWriter.writeAttribute(attName,attValue);
			} else {
				registerPrefix(xmlWriter, namespace);
				xmlWriter.writeAttribute(namespace,attName,attValue);
			}
		}


		/**
		 * Util method to write an attribute without the ns prefix
		 */
		private void writeQNameAttribute(java.lang.String namespace, java.lang.String attName,
				javax.xml.namespace.QName qname, javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException {

			java.lang.String attributeNamespace = qname.getNamespaceURI();
			java.lang.String attributePrefix = xmlWriter.getPrefix(attributeNamespace);
			if (attributePrefix == null) {
				attributePrefix = registerPrefix(xmlWriter, attributeNamespace);
			}
			java.lang.String attributeValue;
			if (attributePrefix.trim().length() > 0) {
				attributeValue = attributePrefix + ":" + qname.getLocalPart();
			} else {
				attributeValue = qname.getLocalPart();
			}

			if (namespace.equals("")) {
				xmlWriter.writeAttribute(attName, attributeValue);
			} else {
				registerPrefix(xmlWriter, namespace);
				xmlWriter.writeAttribute(namespace, attName, attributeValue);
			}
		}
		/**
		 *  method to handle Qnames
		 */

		private void writeQName(javax.xml.namespace.QName qname,
				javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException {
			java.lang.String namespaceURI = qname.getNamespaceURI();
			if (namespaceURI != null) {
				java.lang.String prefix = xmlWriter.getPrefix(namespaceURI);
				if (prefix == null) {
					prefix = generatePrefix(namespaceURI);
					xmlWriter.writeNamespace(prefix, namespaceURI);
					xmlWriter.setPrefix(prefix,namespaceURI);
				}

				if (prefix.trim().length() > 0){
					xmlWriter.writeCharacters(prefix + ":" + org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qname));
				} else {
					// i.e this is the default namespace
					xmlWriter.writeCharacters(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qname));
				}

			} else {
				xmlWriter.writeCharacters(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qname));
			}
		}

		private void writeQNames(javax.xml.namespace.QName[] qnames,
				javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException {

			if (qnames != null) {
				// we have to store this data until last moment since it is not possible to write any
				// namespace data after writing the charactor data
				java.lang.StringBuffer stringToWrite = new java.lang.StringBuffer();
				java.lang.String namespaceURI = null;
				java.lang.String prefix = null;

				for (int i = 0; i < qnames.length; i++) {
					if (i > 0) {
						stringToWrite.append(" ");
					}
					namespaceURI = qnames[i].getNamespaceURI();
					if (namespaceURI != null) {
						prefix = xmlWriter.getPrefix(namespaceURI);
						if ((prefix == null) || (prefix.length() == 0)) {
							prefix = generatePrefix(namespaceURI);
							xmlWriter.writeNamespace(prefix, namespaceURI);
							xmlWriter.setPrefix(prefix,namespaceURI);
						}

						if (prefix.trim().length() > 0){
							stringToWrite.append(prefix).append(":").append(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qnames[i]));
						} else {
							stringToWrite.append(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qnames[i]));
						}
					} else {
						stringToWrite.append(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qnames[i]));
					}
				}
				xmlWriter.writeCharacters(stringToWrite.toString());
			}

		}


		/**
		 * Register a namespace prefix
		 */
		private java.lang.String registerPrefix(javax.xml.stream.XMLStreamWriter xmlWriter, java.lang.String namespace) throws javax.xml.stream.XMLStreamException {
			java.lang.String prefix = xmlWriter.getPrefix(namespace);
			if (prefix == null) {
				prefix = generatePrefix(namespace);
				javax.xml.namespace.NamespaceContext nsContext = xmlWriter.getNamespaceContext();
				while (true) {
					java.lang.String uri = nsContext.getNamespaceURI(prefix);
					if (uri == null || uri.length() == 0) {
						break;
					}
					prefix = org.apache.axis2.databinding.utils.BeanUtil.getUniquePrefix();
				}
				xmlWriter.writeNamespace(prefix, namespace);
				xmlWriter.setPrefix(prefix, namespace);
			}
			return prefix;
		}



		/**
		 * databinding method to get an XML representation of this object
		 *
		 */
		public javax.xml.stream.XMLStreamReader getPullParser(javax.xml.namespace.QName qName)
				throws org.apache.axis2.databinding.ADBException{



			java.util.ArrayList elementList = new java.util.ArrayList();
			java.util.ArrayList attribList = new java.util.ArrayList();

			if (localRequestSecurityTokenResponseTypeChoiceTracker){
				if (localRequestSecurityTokenResponseTypeChoice!=null) {
					for (int i = 0;i < localRequestSecurityTokenResponseTypeChoice.length;i++){

						if (localRequestSecurityTokenResponseTypeChoice[i] != null){
							elementList.add(new javax.xml.namespace.QName("http://schemas.xmlsoap.org/ws/2005/02/trust",
									"RequestSecurityTokenResponseTypeChoice"));
							elementList.add(localRequestSecurityTokenResponseTypeChoice[i]);
						} else {

							// nothing to do

						}

					}
				} else {

					throw new org.apache.axis2.databinding.ADBException("RequestSecurityTokenResponseTypeChoice cannot be null!!");

				}

			}
			attribList.add(
					new javax.xml.namespace.QName("","Context"));

			attribList.add(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(localContext));

			for (int i=0;i <localExtraAttributes.length;i++){
				attribList.add(org.apache.axis2.databinding.utils.Constants.OM_ATTRIBUTE_KEY);
				attribList.add(localExtraAttributes[i]);
			}


			return new org.apache.axis2.databinding.utils.reader.ADBXMLStreamReaderImpl(qName, elementList.toArray(), attribList.toArray());



		}



		/**
		 *  Factory class that keeps the parse method
		 */
		public static class Factory{




			/**
			 * static method to create the object
			 * Precondition:  If this object is an element, the current or next start element starts this object and any intervening reader events are ignorable
			 *                If this object is not an element, it is a complex type and the reader is at the event just after the outer start element
			 * Postcondition: If this object is an element, the reader is positioned at its end element
			 *                If this object is a complex type, the reader is positioned at the end element of its outer element
			 */
			public static RequestSecurityTokenResponseType parse(javax.xml.stream.XMLStreamReader reader) throws java.lang.Exception{
				RequestSecurityTokenResponseType object =
						new RequestSecurityTokenResponseType();

				int event;
				java.lang.String nillableValue = null;
				java.lang.String prefix ="";
				java.lang.String namespaceuri ="";
				try {

					while (!reader.isStartElement() && !reader.isEndElement())
						reader.next();


					if (reader.getAttributeValue("http://www.w3.org/2001/XMLSchema-instance","type")!=null){
						java.lang.String fullTypeName = reader.getAttributeValue("http://www.w3.org/2001/XMLSchema-instance",
								"type");
						if (fullTypeName!=null){
							java.lang.String nsPrefix = null;
							if (fullTypeName.indexOf(":") > -1){
								nsPrefix = fullTypeName.substring(0,fullTypeName.indexOf(":"));
							}
							nsPrefix = nsPrefix==null?"":nsPrefix;

							java.lang.String type = fullTypeName.substring(fullTypeName.indexOf(":")+1);

							if (!"RequestSecurityTokenResponseType".equals(type)){
								//find namespace for the prefix
								java.lang.String nsUri = reader.getNamespaceContext().getNamespaceURI(nsPrefix);
								return (RequestSecurityTokenResponseType)ExtensionMapper.getTypeObject(
										nsUri,type,reader);
							}


						}


					}




					// Note all attributes that were handled. Used to differ normal attributes
					// from anyAttributes.
					java.util.Vector handledAttributes = new java.util.Vector();



					// handle attribute "Context"
					java.lang.String tempAttribContext =

							reader.getAttributeValue(null,"Context");

					if (tempAttribContext!=null){
						java.lang.String content = tempAttribContext;

						object.setContext(
								org.apache.axis2.databinding.utils.ConverterUtil.convertToAnyURI(tempAttribContext));

					} else {

					}
					handledAttributes.add("Context");

					// now run through all any or extra attributes
					// which were not reflected until now
					for (int i=0; i < reader.getAttributeCount(); i++) {
						if (!handledAttributes.contains(reader.getAttributeLocalName(i))) {
							// this is an anyAttribute and we create
							// an OMAttribute for this
							org.apache.axiom.om.OMFactory factory = org.apache.axiom.om.OMAbstractFactory.getOMFactory();
							org.apache.axiom.om.OMAttribute attr =
									factory.createOMAttribute(
											reader.getAttributeLocalName(i),
											factory.createOMNamespace(
													reader.getAttributeNamespace(i), reader.getAttributePrefix(i)),
													reader.getAttributeValue(i));

							// and add it to the extra attributes

							object.addExtraAttributes(attr);


						}
					}


					reader.next();

					java.util.ArrayList list1 = new java.util.ArrayList();


					while (!reader.isStartElement() && !reader.isEndElement()) reader.next();


					try{

						if (reader.isStartElement() ){



							// Process the array and step past its final element's end.
							list1.add(RequestSecurityTokenResponseTypeChoice.Factory.parse(reader));
							//loop until we find a start element that is not part of this array
							boolean loopDone1 = false;
							while(!loopDone1){

								// Step to next element event.
								while (!reader.isStartElement() && !reader.isEndElement())
									reader.next();
								if (reader.isEndElement()){
									//two continuous end elements means we are exiting the xml structure
									loopDone1 = true;
								} else {
									list1.add(RequestSecurityTokenResponseTypeChoice.Factory.parse(reader));
								}
							}
							// call the converter utility  to convert and set the array
							object.setRequestSecurityTokenResponseTypeChoice((RequestSecurityTokenResponseTypeChoice[])
									org.apache.axis2.databinding.utils.ConverterUtil.convertToArray(
											RequestSecurityTokenResponseTypeChoice.class,
											list1));


						}  // End of if for expected property start element

						else {

						}


					} catch (java.lang.Exception e) {}

					while (!reader.isStartElement() && !reader.isEndElement())
						reader.next();

					if (reader.isStartElement())
						// A start element we are not expecting indicates a trailing invalid property
						throw new org.apache.axis2.databinding.ADBException("Unexpected subelement " + reader.getName());




				} catch (javax.xml.stream.XMLStreamException e) {
					throw new java.lang.Exception(e);
				}

				return object;
			}

		}//end of factory class



	}


	public static class RequestSecurityTokenTypeChoice
	implements org.apache.axis2.databinding.ADBBean{
		/* This type was generated from the piece of schema that had
                name = RequestSecurityTokenTypeChoice
                Namespace URI = http://schemas.xmlsoap.org/ws/2005/02/trust
                Namespace Prefix = ns1
		 */

		/** Whenever a new property is set ensure all others are unset
		 *  There can be only one choice and the last one wins
		 */
		private void clearAllSettingTrackers() {

			localExtraElementTracker = false;

		}


		/**
		 * field for ExtraElement
		 * This was an Array!
		 */


		protected org.apache.axiom.om.OMElement[] localExtraElement ;

		/*  This tracker boolean wil be used to detect whether the user called the set method
		 *   for this attribute. It will be used to determine whether to include this field
		 *   in the serialized XML
		 */
		protected boolean localExtraElementTracker = false ;

		public boolean isExtraElementSpecified(){
			return localExtraElementTracker;
		}



		/**
		 * Auto generated getter method
		 * @return org.apache.axiom.om.OMElement[]
		 */
		public  org.apache.axiom.om.OMElement[] getExtraElement(){
			return localExtraElement;
		}






		/**
		 * validate the array for ExtraElement
		 */
		protected void validateExtraElement(org.apache.axiom.om.OMElement[] param){

		}


		/**
		 * Auto generated setter method
		 * @param param ExtraElement
		 */
		public void setExtraElement(org.apache.axiom.om.OMElement[] param){

			validateExtraElement(param);


			clearAllSettingTrackers();
			localExtraElementTracker = param != null;

			this.localExtraElement=param;
		}



		/**
		 * Auto generated add method for the array for convenience
		 * @param param org.apache.axiom.om.OMElement
		 */
		public void addExtraElement(org.apache.axiom.om.OMElement param){
			if (localExtraElement == null){
				localExtraElement = new org.apache.axiom.om.OMElement[]{};
			}


			clearAllSettingTrackers();

			//update the setting tracker
			localExtraElementTracker = true;


			java.util.List list =
					org.apache.axis2.databinding.utils.ConverterUtil.toList(localExtraElement);
			list.add(param);
			this.localExtraElement =
					(org.apache.axiom.om.OMElement[])list.toArray(
							new org.apache.axiom.om.OMElement[list.size()]);

		}




		/**
		 *
		 * @param parentQName
		 * @param factory
		 * @return org.apache.axiom.om.OMElement
		 */
		public org.apache.axiom.om.OMElement getOMElement (
				final javax.xml.namespace.QName parentQName,
				final org.apache.axiom.om.OMFactory factory) throws org.apache.axis2.databinding.ADBException{



			org.apache.axiom.om.OMDataSource dataSource =
					new org.apache.axis2.databinding.ADBDataSource(this,parentQName);
			return factory.createOMElement(dataSource,parentQName);

		}

		public void serialize(final javax.xml.namespace.QName parentQName,
				javax.xml.stream.XMLStreamWriter xmlWriter)
						throws javax.xml.stream.XMLStreamException, org.apache.axis2.databinding.ADBException{
			serialize(parentQName,xmlWriter,false);
		}

		public void serialize(final javax.xml.namespace.QName parentQName,
				javax.xml.stream.XMLStreamWriter xmlWriter,
				boolean serializeType)
						throws javax.xml.stream.XMLStreamException, org.apache.axis2.databinding.ADBException{




			java.lang.String prefix = null;
			java.lang.String namespace = null;

			if (serializeType){


				java.lang.String namespacePrefix = registerPrefix(xmlWriter,"http://schemas.xmlsoap.org/ws/2005/02/trust");
				if ((namespacePrefix != null) && (namespacePrefix.trim().length() > 0)){
					writeAttribute("xsi","http://www.w3.org/2001/XMLSchema-instance","type",
							namespacePrefix+":RequestSecurityTokenTypeChoice",
							xmlWriter);
				} else {
					writeAttribute("xsi","http://www.w3.org/2001/XMLSchema-instance","type",
							"RequestSecurityTokenTypeChoice",
							xmlWriter);
				}


			}
			if (localExtraElementTracker){

				if (localExtraElement != null){
					for (int i = 0;i < localExtraElement.length;i++){
						if (localExtraElement[i] != null){
							localExtraElement[i].serialize(xmlWriter);
						} else {

							// we have to do nothing since minOccures zero

						}
					}
				} else {
					throw new org.apache.axis2.databinding.ADBException("extraElement cannot be null!!");
				}
			}

		}

		private static java.lang.String generatePrefix(java.lang.String namespace) {
			if(namespace.equals("http://schemas.xmlsoap.org/ws/2005/02/trust")){
				return "ns1";
			}
			return org.apache.axis2.databinding.utils.BeanUtil.getUniquePrefix();
		}

		/**
		 * Utility method to write an element start tag.
		 */
		private void writeStartElement(java.lang.String prefix, java.lang.String namespace, java.lang.String localPart,
				javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException {
			java.lang.String writerPrefix = xmlWriter.getPrefix(namespace);
			if (writerPrefix != null) {
				xmlWriter.writeStartElement(namespace, localPart);
			} else {
				if (namespace.length() == 0) {
					prefix = "";
				} else if (prefix == null) {
					prefix = generatePrefix(namespace);
				}

				xmlWriter.writeStartElement(prefix, localPart, namespace);
				xmlWriter.writeNamespace(prefix, namespace);
				xmlWriter.setPrefix(prefix, namespace);
			}
		}

		/**
		 * Util method to write an attribute with the ns prefix
		 */
		private void writeAttribute(java.lang.String prefix,java.lang.String namespace,java.lang.String attName,
				java.lang.String attValue,javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException{
			if (xmlWriter.getPrefix(namespace) == null) {
				xmlWriter.writeNamespace(prefix, namespace);
				xmlWriter.setPrefix(prefix, namespace);
			}
			xmlWriter.writeAttribute(namespace,attName,attValue);
		}

		/**
		 * Util method to write an attribute without the ns prefix
		 */
		private void writeAttribute(java.lang.String namespace,java.lang.String attName,
				java.lang.String attValue,javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException{
			if (namespace.equals("")) {
				xmlWriter.writeAttribute(attName,attValue);
			} else {
				registerPrefix(xmlWriter, namespace);
				xmlWriter.writeAttribute(namespace,attName,attValue);
			}
		}


		/**
		 * Util method to write an attribute without the ns prefix
		 */
		private void writeQNameAttribute(java.lang.String namespace, java.lang.String attName,
				javax.xml.namespace.QName qname, javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException {

			java.lang.String attributeNamespace = qname.getNamespaceURI();
			java.lang.String attributePrefix = xmlWriter.getPrefix(attributeNamespace);
			if (attributePrefix == null) {
				attributePrefix = registerPrefix(xmlWriter, attributeNamespace);
			}
			java.lang.String attributeValue;
			if (attributePrefix.trim().length() > 0) {
				attributeValue = attributePrefix + ":" + qname.getLocalPart();
			} else {
				attributeValue = qname.getLocalPart();
			}

			if (namespace.equals("")) {
				xmlWriter.writeAttribute(attName, attributeValue);
			} else {
				registerPrefix(xmlWriter, namespace);
				xmlWriter.writeAttribute(namespace, attName, attributeValue);
			}
		}
		/**
		 *  method to handle Qnames
		 */

		private void writeQName(javax.xml.namespace.QName qname,
				javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException {
			java.lang.String namespaceURI = qname.getNamespaceURI();
			if (namespaceURI != null) {
				java.lang.String prefix = xmlWriter.getPrefix(namespaceURI);
				if (prefix == null) {
					prefix = generatePrefix(namespaceURI);
					xmlWriter.writeNamespace(prefix, namespaceURI);
					xmlWriter.setPrefix(prefix,namespaceURI);
				}

				if (prefix.trim().length() > 0){
					xmlWriter.writeCharacters(prefix + ":" + org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qname));
				} else {
					// i.e this is the default namespace
					xmlWriter.writeCharacters(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qname));
				}

			} else {
				xmlWriter.writeCharacters(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qname));
			}
		}

		private void writeQNames(javax.xml.namespace.QName[] qnames,
				javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException {

			if (qnames != null) {
				// we have to store this data until last moment since it is not possible to write any
				// namespace data after writing the charactor data
				java.lang.StringBuffer stringToWrite = new java.lang.StringBuffer();
				java.lang.String namespaceURI = null;
				java.lang.String prefix = null;

				for (int i = 0; i < qnames.length; i++) {
					if (i > 0) {
						stringToWrite.append(" ");
					}
					namespaceURI = qnames[i].getNamespaceURI();
					if (namespaceURI != null) {
						prefix = xmlWriter.getPrefix(namespaceURI);
						if ((prefix == null) || (prefix.length() == 0)) {
							prefix = generatePrefix(namespaceURI);
							xmlWriter.writeNamespace(prefix, namespaceURI);
							xmlWriter.setPrefix(prefix,namespaceURI);
						}

						if (prefix.trim().length() > 0){
							stringToWrite.append(prefix).append(":").append(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qnames[i]));
						} else {
							stringToWrite.append(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qnames[i]));
						}
					} else {
						stringToWrite.append(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qnames[i]));
					}
				}
				xmlWriter.writeCharacters(stringToWrite.toString());
			}

		}


		/**
		 * Register a namespace prefix
		 */
		private java.lang.String registerPrefix(javax.xml.stream.XMLStreamWriter xmlWriter, java.lang.String namespace) throws javax.xml.stream.XMLStreamException {
			java.lang.String prefix = xmlWriter.getPrefix(namespace);
			if (prefix == null) {
				prefix = generatePrefix(namespace);
				javax.xml.namespace.NamespaceContext nsContext = xmlWriter.getNamespaceContext();
				while (true) {
					java.lang.String uri = nsContext.getNamespaceURI(prefix);
					if (uri == null || uri.length() == 0) {
						break;
					}
					prefix = org.apache.axis2.databinding.utils.BeanUtil.getUniquePrefix();
				}
				xmlWriter.writeNamespace(prefix, namespace);
				xmlWriter.setPrefix(prefix, namespace);
			}
			return prefix;
		}



		/**
		 * databinding method to get an XML representation of this object
		 *
		 */
		public javax.xml.stream.XMLStreamReader getPullParser(javax.xml.namespace.QName qName)
				throws org.apache.axis2.databinding.ADBException{



			java.util.ArrayList elementList = new java.util.ArrayList();
			java.util.ArrayList attribList = new java.util.ArrayList();

			if (localExtraElementTracker){
				if (localExtraElement != null) {
					for (int i = 0;i < localExtraElement.length;i++){
						if (localExtraElement[i] != null){
							elementList.add(new javax.xml.namespace.QName("",
									"extraElement"));
							elementList.add(
									org.apache.axis2.databinding.utils.ConverterUtil.convertToString(localExtraElement[i]));
						} else {

							// have to do nothing

						}

					}
				} else {
					throw new org.apache.axis2.databinding.ADBException("extraElement cannot be null!!");
				}
			}

			return new org.apache.axis2.databinding.utils.reader.ADBXMLStreamReaderImpl(qName, elementList.toArray(), attribList.toArray());



		}



		/**
		 *  Factory class that keeps the parse method
		 */
		public static class Factory{




			/**
			 * static method to create the object
			 * Precondition:  If this object is an element, the current or next start element starts this object and any intervening reader events are ignorable
			 *                If this object is not an element, it is a complex type and the reader is at the event just after the outer start element
			 * Postcondition: If this object is an element, the reader is positioned at its end element
			 *                If this object is a complex type, the reader is positioned at the end element of its outer element
			 */
			public static RequestSecurityTokenTypeChoice parse(javax.xml.stream.XMLStreamReader reader) throws java.lang.Exception{
				RequestSecurityTokenTypeChoice object =
						new RequestSecurityTokenTypeChoice();

				int event;
				java.lang.String nillableValue = null;
				java.lang.String prefix ="";
				java.lang.String namespaceuri ="";
				try {

					while (!reader.isStartElement() && !reader.isEndElement())
						reader.next();




					// Note all attributes that were handled. Used to differ normal attributes
					// from anyAttributes.
					java.util.Vector handledAttributes = new java.util.Vector();



					java.util.ArrayList list1 = new java.util.ArrayList();

					if (reader.isStartElement()){



						// Process the array and step past its final element's end.

						boolean loopDone1=false;

						while (!loopDone1){
							event = reader.getEventType();
							if (javax.xml.stream.XMLStreamConstants.START_ELEMENT == event){

								// We need to wrap the reader so that it produces a fake START_DOCUEMENT event
								org.apache.axis2.databinding.utils.NamedStaxOMBuilder builder1
								= new org.apache.axis2.databinding.utils.NamedStaxOMBuilder(
										new org.apache.axis2.util.StreamWrapper(reader), reader.getName());

								list1.add(builder1.getOMElement());
								reader.next();
								if (reader.isEndElement()) {
									// we have two countinuos end elements
									loopDone1 = true;
								}

							}else if (javax.xml.stream.XMLStreamConstants.END_ELEMENT == event){
								loopDone1 = true;
							}else{
								reader.next();
							}

						}


						object.setExtraElement((org.apache.axiom.om.OMElement[])
								org.apache.axis2.databinding.utils.ConverterUtil.convertToArray(
										org.apache.axiom.om.OMElement.class,list1));

					}  // End of if for expected property start element




				} catch (javax.xml.stream.XMLStreamException e) {
					throw new java.lang.Exception(e);
				}

				return object;
			}

		}//end of factory class



	}


	public static class RequestSecurityTokenResponseTypeChoiceE
	implements org.apache.axis2.databinding.ADBBean{
		/* This type was generated from the piece of schema that had
                name = RequestSecurityTokenResponseTypeChoice
                Namespace URI = http://docs.oasis-open.org/ws-sx/ws-trust/200512
                Namespace Prefix = ns2
		 */

		/** Whenever a new property is set ensure all others are unset
		 *  There can be only one choice and the last one wins
		 */
		private void clearAllSettingTrackers() {

			localExtraElementTracker = false;

		}


		/**
		 * field for ExtraElement
		 * This was an Array!
		 */


		protected org.apache.axiom.om.OMElement[] localExtraElement ;

		/*  This tracker boolean wil be used to detect whether the user called the set method
		 *   for this attribute. It will be used to determine whether to include this field
		 *   in the serialized XML
		 */
		protected boolean localExtraElementTracker = false ;

		public boolean isExtraElementSpecified(){
			return localExtraElementTracker;
		}



		/**
		 * Auto generated getter method
		 * @return org.apache.axiom.om.OMElement[]
		 */
		public  org.apache.axiom.om.OMElement[] getExtraElement(){
			return localExtraElement;
		}






		/**
		 * validate the array for ExtraElement
		 */
		protected void validateExtraElement(org.apache.axiom.om.OMElement[] param){

		}


		/**
		 * Auto generated setter method
		 * @param param ExtraElement
		 */
		public void setExtraElement(org.apache.axiom.om.OMElement[] param){

			validateExtraElement(param);


			clearAllSettingTrackers();
			localExtraElementTracker = param != null;

			this.localExtraElement=param;
		}



		/**
		 * Auto generated add method for the array for convenience
		 * @param param org.apache.axiom.om.OMElement
		 */
		public void addExtraElement(org.apache.axiom.om.OMElement param){
			if (localExtraElement == null){
				localExtraElement = new org.apache.axiom.om.OMElement[]{};
			}


			clearAllSettingTrackers();

			//update the setting tracker
			localExtraElementTracker = true;


			java.util.List list =
					org.apache.axis2.databinding.utils.ConverterUtil.toList(localExtraElement);
			list.add(param);
			this.localExtraElement =
					(org.apache.axiom.om.OMElement[])list.toArray(
							new org.apache.axiom.om.OMElement[list.size()]);

		}




		/**
		 *
		 * @param parentQName
		 * @param factory
		 * @return org.apache.axiom.om.OMElement
		 */
		public org.apache.axiom.om.OMElement getOMElement (
				final javax.xml.namespace.QName parentQName,
				final org.apache.axiom.om.OMFactory factory) throws org.apache.axis2.databinding.ADBException{



			org.apache.axiom.om.OMDataSource dataSource =
					new org.apache.axis2.databinding.ADBDataSource(this,parentQName);
			return factory.createOMElement(dataSource,parentQName);

		}

		public void serialize(final javax.xml.namespace.QName parentQName,
				javax.xml.stream.XMLStreamWriter xmlWriter)
						throws javax.xml.stream.XMLStreamException, org.apache.axis2.databinding.ADBException{
			serialize(parentQName,xmlWriter,false);
		}

		public void serialize(final javax.xml.namespace.QName parentQName,
				javax.xml.stream.XMLStreamWriter xmlWriter,
				boolean serializeType)
						throws javax.xml.stream.XMLStreamException, org.apache.axis2.databinding.ADBException{




			java.lang.String prefix = null;
			java.lang.String namespace = null;

			if (serializeType){


				java.lang.String namespacePrefix = registerPrefix(xmlWriter,"http://docs.oasis-open.org/ws-sx/ws-trust/200512");
				if ((namespacePrefix != null) && (namespacePrefix.trim().length() > 0)){
					writeAttribute("xsi","http://www.w3.org/2001/XMLSchema-instance","type",
							namespacePrefix+":RequestSecurityTokenResponseTypeChoice",
							xmlWriter);
				} else {
					writeAttribute("xsi","http://www.w3.org/2001/XMLSchema-instance","type",
							"RequestSecurityTokenResponseTypeChoice",
							xmlWriter);
				}


			}
			if (localExtraElementTracker){

				if (localExtraElement != null){
					for (int i = 0;i < localExtraElement.length;i++){
						if (localExtraElement[i] != null){
							localExtraElement[i].serialize(xmlWriter);
						} else {

							// we have to do nothing since minOccures zero

						}
					}
				} else {
					throw new org.apache.axis2.databinding.ADBException("extraElement cannot be null!!");
				}
			}

		}

		private static java.lang.String generatePrefix(java.lang.String namespace) {
			if(namespace.equals("http://docs.oasis-open.org/ws-sx/ws-trust/200512")){
				return "ns2";
			}
			return org.apache.axis2.databinding.utils.BeanUtil.getUniquePrefix();
		}

		/**
		 * Utility method to write an element start tag.
		 */
		private void writeStartElement(java.lang.String prefix, java.lang.String namespace, java.lang.String localPart,
				javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException {
			java.lang.String writerPrefix = xmlWriter.getPrefix(namespace);
			if (writerPrefix != null) {
				xmlWriter.writeStartElement(namespace, localPart);
			} else {
				if (namespace.length() == 0) {
					prefix = "";
				} else if (prefix == null) {
					prefix = generatePrefix(namespace);
				}

				xmlWriter.writeStartElement(prefix, localPart, namespace);
				xmlWriter.writeNamespace(prefix, namespace);
				xmlWriter.setPrefix(prefix, namespace);
			}
		}

		/**
		 * Util method to write an attribute with the ns prefix
		 */
		private void writeAttribute(java.lang.String prefix,java.lang.String namespace,java.lang.String attName,
				java.lang.String attValue,javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException{
			if (xmlWriter.getPrefix(namespace) == null) {
				xmlWriter.writeNamespace(prefix, namespace);
				xmlWriter.setPrefix(prefix, namespace);
			}
			xmlWriter.writeAttribute(namespace,attName,attValue);
		}

		/**
		 * Util method to write an attribute without the ns prefix
		 */
		private void writeAttribute(java.lang.String namespace,java.lang.String attName,
				java.lang.String attValue,javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException{
			if (namespace.equals("")) {
				xmlWriter.writeAttribute(attName,attValue);
			} else {
				registerPrefix(xmlWriter, namespace);
				xmlWriter.writeAttribute(namespace,attName,attValue);
			}
		}


		/**
		 * Util method to write an attribute without the ns prefix
		 */
		private void writeQNameAttribute(java.lang.String namespace, java.lang.String attName,
				javax.xml.namespace.QName qname, javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException {

			java.lang.String attributeNamespace = qname.getNamespaceURI();
			java.lang.String attributePrefix = xmlWriter.getPrefix(attributeNamespace);
			if (attributePrefix == null) {
				attributePrefix = registerPrefix(xmlWriter, attributeNamespace);
			}
			java.lang.String attributeValue;
			if (attributePrefix.trim().length() > 0) {
				attributeValue = attributePrefix + ":" + qname.getLocalPart();
			} else {
				attributeValue = qname.getLocalPart();
			}

			if (namespace.equals("")) {
				xmlWriter.writeAttribute(attName, attributeValue);
			} else {
				registerPrefix(xmlWriter, namespace);
				xmlWriter.writeAttribute(namespace, attName, attributeValue);
			}
		}
		/**
		 *  method to handle Qnames
		 */

		private void writeQName(javax.xml.namespace.QName qname,
				javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException {
			java.lang.String namespaceURI = qname.getNamespaceURI();
			if (namespaceURI != null) {
				java.lang.String prefix = xmlWriter.getPrefix(namespaceURI);
				if (prefix == null) {
					prefix = generatePrefix(namespaceURI);
					xmlWriter.writeNamespace(prefix, namespaceURI);
					xmlWriter.setPrefix(prefix,namespaceURI);
				}

				if (prefix.trim().length() > 0){
					xmlWriter.writeCharacters(prefix + ":" + org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qname));
				} else {
					// i.e this is the default namespace
					xmlWriter.writeCharacters(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qname));
				}

			} else {
				xmlWriter.writeCharacters(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qname));
			}
		}

		private void writeQNames(javax.xml.namespace.QName[] qnames,
				javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException {

			if (qnames != null) {
				// we have to store this data until last moment since it is not possible to write any
				// namespace data after writing the charactor data
				java.lang.StringBuffer stringToWrite = new java.lang.StringBuffer();
				java.lang.String namespaceURI = null;
				java.lang.String prefix = null;

				for (int i = 0; i < qnames.length; i++) {
					if (i > 0) {
						stringToWrite.append(" ");
					}
					namespaceURI = qnames[i].getNamespaceURI();
					if (namespaceURI != null) {
						prefix = xmlWriter.getPrefix(namespaceURI);
						if ((prefix == null) || (prefix.length() == 0)) {
							prefix = generatePrefix(namespaceURI);
							xmlWriter.writeNamespace(prefix, namespaceURI);
							xmlWriter.setPrefix(prefix,namespaceURI);
						}

						if (prefix.trim().length() > 0){
							stringToWrite.append(prefix).append(":").append(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qnames[i]));
						} else {
							stringToWrite.append(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qnames[i]));
						}
					} else {
						stringToWrite.append(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qnames[i]));
					}
				}
				xmlWriter.writeCharacters(stringToWrite.toString());
			}

		}


		/**
		 * Register a namespace prefix
		 */
		private java.lang.String registerPrefix(javax.xml.stream.XMLStreamWriter xmlWriter, java.lang.String namespace) throws javax.xml.stream.XMLStreamException {
			java.lang.String prefix = xmlWriter.getPrefix(namespace);
			if (prefix == null) {
				prefix = generatePrefix(namespace);
				javax.xml.namespace.NamespaceContext nsContext = xmlWriter.getNamespaceContext();
				while (true) {
					java.lang.String uri = nsContext.getNamespaceURI(prefix);
					if (uri == null || uri.length() == 0) {
						break;
					}
					prefix = org.apache.axis2.databinding.utils.BeanUtil.getUniquePrefix();
				}
				xmlWriter.writeNamespace(prefix, namespace);
				xmlWriter.setPrefix(prefix, namespace);
			}
			return prefix;
		}



		/**
		 * databinding method to get an XML representation of this object
		 *
		 */
		public javax.xml.stream.XMLStreamReader getPullParser(javax.xml.namespace.QName qName)
				throws org.apache.axis2.databinding.ADBException{



			java.util.ArrayList elementList = new java.util.ArrayList();
			java.util.ArrayList attribList = new java.util.ArrayList();

			if (localExtraElementTracker){
				if (localExtraElement != null) {
					for (int i = 0;i < localExtraElement.length;i++){
						if (localExtraElement[i] != null){
							elementList.add(new javax.xml.namespace.QName("",
									"extraElement"));
							elementList.add(
									org.apache.axis2.databinding.utils.ConverterUtil.convertToString(localExtraElement[i]));
						} else {

							// have to do nothing

						}

					}
				} else {
					throw new org.apache.axis2.databinding.ADBException("extraElement cannot be null!!");
				}
			}

			return new org.apache.axis2.databinding.utils.reader.ADBXMLStreamReaderImpl(qName, elementList.toArray(), attribList.toArray());



		}



		/**
		 *  Factory class that keeps the parse method
		 */
		public static class Factory{




			/**
			 * static method to create the object
			 * Precondition:  If this object is an element, the current or next start element starts this object and any intervening reader events are ignorable
			 *                If this object is not an element, it is a complex type and the reader is at the event just after the outer start element
			 * Postcondition: If this object is an element, the reader is positioned at its end element
			 *                If this object is a complex type, the reader is positioned at the end element of its outer element
			 */
			public static RequestSecurityTokenResponseTypeChoiceE parse(javax.xml.stream.XMLStreamReader reader) throws java.lang.Exception{
				RequestSecurityTokenResponseTypeChoiceE object =
						new RequestSecurityTokenResponseTypeChoiceE();

				int event;
				java.lang.String nillableValue = null;
				java.lang.String prefix ="";
				java.lang.String namespaceuri ="";
				try {

					while (!reader.isStartElement() && !reader.isEndElement())
						reader.next();




					// Note all attributes that were handled. Used to differ normal attributes
					// from anyAttributes.
					java.util.Vector handledAttributes = new java.util.Vector();



					java.util.ArrayList list1 = new java.util.ArrayList();

					if (reader.isStartElement()){



						// Process the array and step past its final element's end.

						boolean loopDone1=false;

						while (!loopDone1){
							event = reader.getEventType();
							if (javax.xml.stream.XMLStreamConstants.START_ELEMENT == event){

								// We need to wrap the reader so that it produces a fake START_DOCUEMENT event
								org.apache.axis2.databinding.utils.NamedStaxOMBuilder builder1
								= new org.apache.axis2.databinding.utils.NamedStaxOMBuilder(
										new org.apache.axis2.util.StreamWrapper(reader), reader.getName());

								list1.add(builder1.getOMElement());
								reader.next();
								if (reader.isEndElement()) {
									// we have two countinuos end elements
									loopDone1 = true;
								}

							}else if (javax.xml.stream.XMLStreamConstants.END_ELEMENT == event){
								loopDone1 = true;
							}else{
								reader.next();
							}

						}


						object.setExtraElement((org.apache.axiom.om.OMElement[])
								org.apache.axis2.databinding.utils.ConverterUtil.convertToArray(
										org.apache.axiom.om.OMElement.class,list1));

					}  // End of if for expected property start element




				} catch (javax.xml.stream.XMLStreamException e) {
					throw new java.lang.Exception(e);
				}

				return object;
			}

		}//end of factory class



	}


	public static class RequestSecurityTokenResponseCollectionType
	implements org.apache.axis2.databinding.ADBBean{
		/* This type was generated from the piece of schema that had
                name = RequestSecurityTokenResponseCollectionType
                Namespace URI = http://docs.oasis-open.org/ws-sx/ws-trust/200512
                Namespace Prefix = ns2
		 */


		/**
		 * field for RequestSecurityTokenResponse
		 * This was an Array!
		 */


		protected RequestSecurityTokenResponseTypeE[] localRequestSecurityTokenResponse ;


		/**
		 * Auto generated getter method
		 * @return RequestSecurityTokenResponseTypeE[]
		 */
		public  RequestSecurityTokenResponseTypeE[] getRequestSecurityTokenResponse(){
			return localRequestSecurityTokenResponse;
		}






		/**
		 * validate the array for RequestSecurityTokenResponse
		 */
		protected void validateRequestSecurityTokenResponse(RequestSecurityTokenResponseTypeE[] param){

			if ((param != null) && (param.length < 1)){
				throw new java.lang.RuntimeException();
			}

		}


		/**
		 * Auto generated setter method
		 * @param param RequestSecurityTokenResponse
		 */
		public void setRequestSecurityTokenResponse(RequestSecurityTokenResponseTypeE[] param){

			validateRequestSecurityTokenResponse(param);


			this.localRequestSecurityTokenResponse=param;
		}



		/**
		 * Auto generated add method for the array for convenience
		 * @param param RequestSecurityTokenResponseTypeE
		 */
		public void addRequestSecurityTokenResponse(RequestSecurityTokenResponseTypeE param){
			if (localRequestSecurityTokenResponse == null){
				localRequestSecurityTokenResponse = new RequestSecurityTokenResponseTypeE[]{};
			}



			java.util.List list =
					org.apache.axis2.databinding.utils.ConverterUtil.toList(localRequestSecurityTokenResponse);
			list.add(param);
			this.localRequestSecurityTokenResponse =
					(RequestSecurityTokenResponseTypeE[])list.toArray(
							new RequestSecurityTokenResponseTypeE[list.size()]);

		}


		/**
		 * field for ExtraAttributes
		 * This was an Attribute!
		 * This was an Array!
		 */


		protected org.apache.axiom.om.OMAttribute[] localExtraAttributes ;


		/**
		 * Auto generated getter method
		 * @return org.apache.axiom.om.OMAttribute[]
		 */
		public  org.apache.axiom.om.OMAttribute[] getExtraAttributes(){
			return localExtraAttributes;
		}






		/**
		 * validate the array for ExtraAttributes
		 */
		protected void validateExtraAttributes(org.apache.axiom.om.OMAttribute[] param){

			if ((param != null) && (param.length > 1)){
				throw new java.lang.RuntimeException();
			}

			if ((param != null) && (param.length < 1)){
				throw new java.lang.RuntimeException();
			}

		}


		/**
		 * Auto generated setter method
		 * @param param ExtraAttributes
		 */
		public void setExtraAttributes(org.apache.axiom.om.OMAttribute[] param){

			validateExtraAttributes(param);


			this.localExtraAttributes=param;
		}



		/**
		 * Auto generated add method for the array for convenience
		 * @param param org.apache.axiom.om.OMAttribute
		 */
		public void addExtraAttributes(org.apache.axiom.om.OMAttribute param){
			if (localExtraAttributes == null){
				localExtraAttributes = new org.apache.axiom.om.OMAttribute[]{};
			}



			java.util.List list =
					org.apache.axis2.databinding.utils.ConverterUtil.toList(localExtraAttributes);
			list.add(param);
			this.localExtraAttributes =
					(org.apache.axiom.om.OMAttribute[])list.toArray(
							new org.apache.axiom.om.OMAttribute[list.size()]);

		}




		/**
		 *
		 * @param parentQName
		 * @param factory
		 * @return org.apache.axiom.om.OMElement
		 */
		public org.apache.axiom.om.OMElement getOMElement (
				final javax.xml.namespace.QName parentQName,
				final org.apache.axiom.om.OMFactory factory) throws org.apache.axis2.databinding.ADBException{



			org.apache.axiom.om.OMDataSource dataSource =
					new org.apache.axis2.databinding.ADBDataSource(this,parentQName);
			return factory.createOMElement(dataSource,parentQName);

		}

		public void serialize(final javax.xml.namespace.QName parentQName,
				javax.xml.stream.XMLStreamWriter xmlWriter)
						throws javax.xml.stream.XMLStreamException, org.apache.axis2.databinding.ADBException{
			serialize(parentQName,xmlWriter,false);
		}

		public void serialize(final javax.xml.namespace.QName parentQName,
				javax.xml.stream.XMLStreamWriter xmlWriter,
				boolean serializeType)
						throws javax.xml.stream.XMLStreamException, org.apache.axis2.databinding.ADBException{




			java.lang.String prefix = null;
			java.lang.String namespace = null;


			prefix = parentQName.getPrefix();
			namespace = parentQName.getNamespaceURI();
			writeStartElement(prefix, namespace, parentQName.getLocalPart(), xmlWriter);

			if (serializeType){


				java.lang.String namespacePrefix = registerPrefix(xmlWriter,"http://docs.oasis-open.org/ws-sx/ws-trust/200512");
				if ((namespacePrefix != null) && (namespacePrefix.trim().length() > 0)){
					writeAttribute("xsi","http://www.w3.org/2001/XMLSchema-instance","type",
							namespacePrefix+":RequestSecurityTokenResponseCollectionType",
							xmlWriter);
				} else {
					writeAttribute("xsi","http://www.w3.org/2001/XMLSchema-instance","type",
							"RequestSecurityTokenResponseCollectionType",
							xmlWriter);
				}


			}

			if (localExtraAttributes != null) {
				for (int i=0;i <localExtraAttributes.length;i++){
					writeAttribute(localExtraAttributes[i].getNamespace().getName(),
							localExtraAttributes[i].getLocalName(),
							localExtraAttributes[i].getAttributeValue(),xmlWriter);
				}
			}

			if (localRequestSecurityTokenResponse!=null){
				for (int i = 0;i < localRequestSecurityTokenResponse.length;i++){
					if (localRequestSecurityTokenResponse[i] != null){
						localRequestSecurityTokenResponse[i].serialize(new javax.xml.namespace.QName("http://docs.oasis-open.org/ws-sx/ws-trust/200512","RequestSecurityTokenResponse"),
								xmlWriter);
					} else {

						throw new org.apache.axis2.databinding.ADBException("RequestSecurityTokenResponse cannot be null!!");

					}

				}
			} else {

				throw new org.apache.axis2.databinding.ADBException("RequestSecurityTokenResponse cannot be null!!");

			}

			xmlWriter.writeEndElement();


		}

		private static java.lang.String generatePrefix(java.lang.String namespace) {
			if(namespace.equals("http://docs.oasis-open.org/ws-sx/ws-trust/200512")){
				return "ns2";
			}
			return org.apache.axis2.databinding.utils.BeanUtil.getUniquePrefix();
		}

		/**
		 * Utility method to write an element start tag.
		 */
		private void writeStartElement(java.lang.String prefix, java.lang.String namespace, java.lang.String localPart,
				javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException {
			java.lang.String writerPrefix = xmlWriter.getPrefix(namespace);
			if (writerPrefix != null) {
				xmlWriter.writeStartElement(namespace, localPart);
			} else {
				if (namespace.length() == 0) {
					prefix = "";
				} else if (prefix == null) {
					prefix = generatePrefix(namespace);
				}

				xmlWriter.writeStartElement(prefix, localPart, namespace);
				xmlWriter.writeNamespace(prefix, namespace);
				xmlWriter.setPrefix(prefix, namespace);
			}
		}

		/**
		 * Util method to write an attribute with the ns prefix
		 */
		private void writeAttribute(java.lang.String prefix,java.lang.String namespace,java.lang.String attName,
				java.lang.String attValue,javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException{
			if (xmlWriter.getPrefix(namespace) == null) {
				xmlWriter.writeNamespace(prefix, namespace);
				xmlWriter.setPrefix(prefix, namespace);
			}
			xmlWriter.writeAttribute(namespace,attName,attValue);
		}

		/**
		 * Util method to write an attribute without the ns prefix
		 */
		private void writeAttribute(java.lang.String namespace,java.lang.String attName,
				java.lang.String attValue,javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException{
			if (namespace.equals("")) {
				xmlWriter.writeAttribute(attName,attValue);
			} else {
				registerPrefix(xmlWriter, namespace);
				xmlWriter.writeAttribute(namespace,attName,attValue);
			}
		}


		/**
		 * Util method to write an attribute without the ns prefix
		 */
		private void writeQNameAttribute(java.lang.String namespace, java.lang.String attName,
				javax.xml.namespace.QName qname, javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException {

			java.lang.String attributeNamespace = qname.getNamespaceURI();
			java.lang.String attributePrefix = xmlWriter.getPrefix(attributeNamespace);
			if (attributePrefix == null) {
				attributePrefix = registerPrefix(xmlWriter, attributeNamespace);
			}
			java.lang.String attributeValue;
			if (attributePrefix.trim().length() > 0) {
				attributeValue = attributePrefix + ":" + qname.getLocalPart();
			} else {
				attributeValue = qname.getLocalPart();
			}

			if (namespace.equals("")) {
				xmlWriter.writeAttribute(attName, attributeValue);
			} else {
				registerPrefix(xmlWriter, namespace);
				xmlWriter.writeAttribute(namespace, attName, attributeValue);
			}
		}
		/**
		 *  method to handle Qnames
		 */

		private void writeQName(javax.xml.namespace.QName qname,
				javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException {
			java.lang.String namespaceURI = qname.getNamespaceURI();
			if (namespaceURI != null) {
				java.lang.String prefix = xmlWriter.getPrefix(namespaceURI);
				if (prefix == null) {
					prefix = generatePrefix(namespaceURI);
					xmlWriter.writeNamespace(prefix, namespaceURI);
					xmlWriter.setPrefix(prefix,namespaceURI);
				}

				if (prefix.trim().length() > 0){
					xmlWriter.writeCharacters(prefix + ":" + org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qname));
				} else {
					// i.e this is the default namespace
					xmlWriter.writeCharacters(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qname));
				}

			} else {
				xmlWriter.writeCharacters(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qname));
			}
		}

		private void writeQNames(javax.xml.namespace.QName[] qnames,
				javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException {

			if (qnames != null) {
				// we have to store this data until last moment since it is not possible to write any
				// namespace data after writing the charactor data
				java.lang.StringBuffer stringToWrite = new java.lang.StringBuffer();
				java.lang.String namespaceURI = null;
				java.lang.String prefix = null;

				for (int i = 0; i < qnames.length; i++) {
					if (i > 0) {
						stringToWrite.append(" ");
					}
					namespaceURI = qnames[i].getNamespaceURI();
					if (namespaceURI != null) {
						prefix = xmlWriter.getPrefix(namespaceURI);
						if ((prefix == null) || (prefix.length() == 0)) {
							prefix = generatePrefix(namespaceURI);
							xmlWriter.writeNamespace(prefix, namespaceURI);
							xmlWriter.setPrefix(prefix,namespaceURI);
						}

						if (prefix.trim().length() > 0){
							stringToWrite.append(prefix).append(":").append(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qnames[i]));
						} else {
							stringToWrite.append(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qnames[i]));
						}
					} else {
						stringToWrite.append(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qnames[i]));
					}
				}
				xmlWriter.writeCharacters(stringToWrite.toString());
			}

		}


		/**
		 * Register a namespace prefix
		 */
		private java.lang.String registerPrefix(javax.xml.stream.XMLStreamWriter xmlWriter, java.lang.String namespace) throws javax.xml.stream.XMLStreamException {
			java.lang.String prefix = xmlWriter.getPrefix(namespace);
			if (prefix == null) {
				prefix = generatePrefix(namespace);
				javax.xml.namespace.NamespaceContext nsContext = xmlWriter.getNamespaceContext();
				while (true) {
					java.lang.String uri = nsContext.getNamespaceURI(prefix);
					if (uri == null || uri.length() == 0) {
						break;
					}
					prefix = org.apache.axis2.databinding.utils.BeanUtil.getUniquePrefix();
				}
				xmlWriter.writeNamespace(prefix, namespace);
				xmlWriter.setPrefix(prefix, namespace);
			}
			return prefix;
		}



		/**
		 * databinding method to get an XML representation of this object
		 *
		 */
		public javax.xml.stream.XMLStreamReader getPullParser(javax.xml.namespace.QName qName)
				throws org.apache.axis2.databinding.ADBException{



			java.util.ArrayList elementList = new java.util.ArrayList();
			java.util.ArrayList attribList = new java.util.ArrayList();


			if (localRequestSecurityTokenResponse!=null) {
				for (int i = 0;i < localRequestSecurityTokenResponse.length;i++){

					if (localRequestSecurityTokenResponse[i] != null){
						elementList.add(new javax.xml.namespace.QName("http://docs.oasis-open.org/ws-sx/ws-trust/200512",
								"RequestSecurityTokenResponse"));
						elementList.add(localRequestSecurityTokenResponse[i]);
					} else {

						throw new org.apache.axis2.databinding.ADBException("RequestSecurityTokenResponse cannot be null !!");

					}

				}
			} else {

				throw new org.apache.axis2.databinding.ADBException("RequestSecurityTokenResponse cannot be null!!");

			}


			for (int i=0;i <localExtraAttributes.length;i++){
				attribList.add(org.apache.axis2.databinding.utils.Constants.OM_ATTRIBUTE_KEY);
				attribList.add(localExtraAttributes[i]);
			}


			return new org.apache.axis2.databinding.utils.reader.ADBXMLStreamReaderImpl(qName, elementList.toArray(), attribList.toArray());



		}



		/**
		 *  Factory class that keeps the parse method
		 */
		public static class Factory{




			/**
			 * static method to create the object
			 * Precondition:  If this object is an element, the current or next start element starts this object and any intervening reader events are ignorable
			 *                If this object is not an element, it is a complex type and the reader is at the event just after the outer start element
			 * Postcondition: If this object is an element, the reader is positioned at its end element
			 *                If this object is a complex type, the reader is positioned at the end element of its outer element
			 */
			public static RequestSecurityTokenResponseCollectionType parse(javax.xml.stream.XMLStreamReader reader) throws java.lang.Exception{
				RequestSecurityTokenResponseCollectionType object =
						new RequestSecurityTokenResponseCollectionType();

				int event;
				java.lang.String nillableValue = null;
				java.lang.String prefix ="";
				java.lang.String namespaceuri ="";
				try {

					while (!reader.isStartElement() && !reader.isEndElement())
						reader.next();


					if (reader.getAttributeValue("http://www.w3.org/2001/XMLSchema-instance","type")!=null){
						java.lang.String fullTypeName = reader.getAttributeValue("http://www.w3.org/2001/XMLSchema-instance",
								"type");
						if (fullTypeName!=null){
							java.lang.String nsPrefix = null;
							if (fullTypeName.indexOf(":") > -1){
								nsPrefix = fullTypeName.substring(0,fullTypeName.indexOf(":"));
							}
							nsPrefix = nsPrefix==null?"":nsPrefix;

							java.lang.String type = fullTypeName.substring(fullTypeName.indexOf(":")+1);

							if (!"RequestSecurityTokenResponseCollectionType".equals(type)){
								//find namespace for the prefix
								java.lang.String nsUri = reader.getNamespaceContext().getNamespaceURI(nsPrefix);
								return (RequestSecurityTokenResponseCollectionType)ExtensionMapper.getTypeObject(
										nsUri,type,reader);
							}


						}


					}




					// Note all attributes that were handled. Used to differ normal attributes
					// from anyAttributes.
					java.util.Vector handledAttributes = new java.util.Vector();



					// now run through all any or extra attributes
					// which were not reflected until now
					for (int i=0; i < reader.getAttributeCount(); i++) {
						if (!handledAttributes.contains(reader.getAttributeLocalName(i))) {
							// this is an anyAttribute and we create
							// an OMAttribute for this
							org.apache.axiom.om.OMFactory factory = org.apache.axiom.om.OMAbstractFactory.getOMFactory();
							org.apache.axiom.om.OMAttribute attr =
									factory.createOMAttribute(
											reader.getAttributeLocalName(i),
											factory.createOMNamespace(
													reader.getAttributeNamespace(i), reader.getAttributePrefix(i)),
													reader.getAttributeValue(i));

							// and add it to the extra attributes

							object.addExtraAttributes(attr);


						}
					}


					reader.next();

					java.util.ArrayList list1 = new java.util.ArrayList();


					while (!reader.isStartElement() && !reader.isEndElement()) reader.next();

					if (reader.isStartElement() && new javax.xml.namespace.QName("http://docs.oasis-open.org/ws-sx/ws-trust/200512","RequestSecurityTokenResponse").equals(reader.getName())){



						// Process the array and step past its final element's end.
						list1.add(RequestSecurityTokenResponseTypeE.Factory.parse(reader));

						//loop until we find a start element that is not part of this array
						boolean loopDone1 = false;
						while(!loopDone1){
							// We should be at the end element, but make sure
							while (!reader.isEndElement())
								reader.next();
							// Step out of this element
							reader.next();
							// Step to next element event.
							while (!reader.isStartElement() && !reader.isEndElement())
								reader.next();
							if (reader.isEndElement()){
								//two continuous end elements means we are exiting the xml structure
								loopDone1 = true;
							} else {
								if (new javax.xml.namespace.QName("http://docs.oasis-open.org/ws-sx/ws-trust/200512","RequestSecurityTokenResponse").equals(reader.getName())){
									list1.add(RequestSecurityTokenResponseTypeE.Factory.parse(reader));

								}else{
									loopDone1 = true;
								}
							}
						}
						// call the converter utility  to convert and set the array

						object.setRequestSecurityTokenResponse((RequestSecurityTokenResponseTypeE[])
								org.apache.axis2.databinding.utils.ConverterUtil.convertToArray(
										RequestSecurityTokenResponseTypeE.class,
										list1));

					}  // End of if for expected property start element

					else{
						// A start element we are not expecting indicates an invalid parameter was passed
						throw new org.apache.axis2.databinding.ADBException("Unexpected subelement " + reader.getName());
					}

					while (!reader.isStartElement() && !reader.isEndElement())
						reader.next();

					if (reader.isStartElement())
						// A start element we are not expecting indicates a trailing invalid property
						throw new org.apache.axis2.databinding.ADBException("Unexpected subelement " + reader.getName());




				} catch (javax.xml.stream.XMLStreamException e) {
					throw new java.lang.Exception(e);
				}

				return object;
			}

		}//end of factory class



	}


	public static class RequestSecurityTokenResponseTypeE
	implements org.apache.axis2.databinding.ADBBean{
		/* This type was generated from the piece of schema that had
                name = RequestSecurityTokenResponseType
                Namespace URI = http://docs.oasis-open.org/ws-sx/ws-trust/200512
                Namespace Prefix = ns2
		 */


		/**
		 * field for RequestSecurityTokenResponseTypeChoice
		 * This was an Array!
		 */


		protected RequestSecurityTokenResponseTypeChoiceE[] localRequestSecurityTokenResponseTypeChoice ;

		/*  This tracker boolean wil be used to detect whether the user called the set method
		 *   for this attribute. It will be used to determine whether to include this field
		 *   in the serialized XML
		 */
		protected boolean localRequestSecurityTokenResponseTypeChoiceTracker = false ;

		public boolean isRequestSecurityTokenResponseTypeChoiceSpecified(){
			return localRequestSecurityTokenResponseTypeChoiceTracker;
		}



		/**
		 * Auto generated getter method
		 * @return RequestSecurityTokenResponseTypeChoiceE[]
		 */
		public  RequestSecurityTokenResponseTypeChoiceE[] getRequestSecurityTokenResponseTypeChoice(){
			return localRequestSecurityTokenResponseTypeChoice;
		}






		/**
		 * validate the array for RequestSecurityTokenResponseTypeChoice
		 */
		protected void validateRequestSecurityTokenResponseTypeChoice(RequestSecurityTokenResponseTypeChoiceE[] param){

		}


		/**
		 * Auto generated setter method
		 * @param param RequestSecurityTokenResponseTypeChoice
		 */
		public void setRequestSecurityTokenResponseTypeChoice(RequestSecurityTokenResponseTypeChoiceE[] param){

			validateRequestSecurityTokenResponseTypeChoice(param);

			localRequestSecurityTokenResponseTypeChoiceTracker = param != null;

			this.localRequestSecurityTokenResponseTypeChoice=param;
		}



		/**
		 * Auto generated add method for the array for convenience
		 * @param param RequestSecurityTokenResponseTypeChoiceE
		 */
		public void addRequestSecurityTokenResponseTypeChoice(RequestSecurityTokenResponseTypeChoiceE param){
			if (localRequestSecurityTokenResponseTypeChoice == null){
				localRequestSecurityTokenResponseTypeChoice = new RequestSecurityTokenResponseTypeChoiceE[]{};
			}


			//update the setting tracker
			localRequestSecurityTokenResponseTypeChoiceTracker = true;


			java.util.List list =
					org.apache.axis2.databinding.utils.ConverterUtil.toList(localRequestSecurityTokenResponseTypeChoice);
			list.add(param);
			this.localRequestSecurityTokenResponseTypeChoice =
					(RequestSecurityTokenResponseTypeChoiceE[])list.toArray(
							new RequestSecurityTokenResponseTypeChoiceE[list.size()]);

		}


		/**
		 * field for Context
		 * This was an Attribute!
		 */


		protected org.apache.axis2.databinding.types.URI localContext ;


		/**
		 * Auto generated getter method
		 * @return org.apache.axis2.databinding.types.URI
		 */
		public  org.apache.axis2.databinding.types.URI getContext(){
			return localContext;
		}



		/**
		 * Auto generated setter method
		 * @param param Context
		 */
		public void setContext(org.apache.axis2.databinding.types.URI param){

			this.localContext=param;


		}


		/**
		 * field for ExtraAttributes
		 * This was an Attribute!
		 * This was an Array!
		 */


		protected org.apache.axiom.om.OMAttribute[] localExtraAttributes ;


		/**
		 * Auto generated getter method
		 * @return org.apache.axiom.om.OMAttribute[]
		 */
		public  org.apache.axiom.om.OMAttribute[] getExtraAttributes(){
			return localExtraAttributes;
		}






		/**
		 * validate the array for ExtraAttributes
		 */
		protected void validateExtraAttributes(org.apache.axiom.om.OMAttribute[] param){

			if ((param != null) && (param.length > 1)){
				throw new java.lang.RuntimeException();
			}

			if ((param != null) && (param.length < 1)){
				throw new java.lang.RuntimeException();
			}

		}


		/**
		 * Auto generated setter method
		 * @param param ExtraAttributes
		 */
		public void setExtraAttributes(org.apache.axiom.om.OMAttribute[] param){

			validateExtraAttributes(param);


			this.localExtraAttributes=param;
		}



		/**
		 * Auto generated add method for the array for convenience
		 * @param param org.apache.axiom.om.OMAttribute
		 */
		public void addExtraAttributes(org.apache.axiom.om.OMAttribute param){
			if (localExtraAttributes == null){
				localExtraAttributes = new org.apache.axiom.om.OMAttribute[]{};
			}



			java.util.List list =
					org.apache.axis2.databinding.utils.ConverterUtil.toList(localExtraAttributes);
			list.add(param);
			this.localExtraAttributes =
					(org.apache.axiom.om.OMAttribute[])list.toArray(
							new org.apache.axiom.om.OMAttribute[list.size()]);

		}




		/**
		 *
		 * @param parentQName
		 * @param factory
		 * @return org.apache.axiom.om.OMElement
		 */
		public org.apache.axiom.om.OMElement getOMElement (
				final javax.xml.namespace.QName parentQName,
				final org.apache.axiom.om.OMFactory factory) throws org.apache.axis2.databinding.ADBException{



			org.apache.axiom.om.OMDataSource dataSource =
					new org.apache.axis2.databinding.ADBDataSource(this,parentQName);
			return factory.createOMElement(dataSource,parentQName);

		}

		public void serialize(final javax.xml.namespace.QName parentQName,
				javax.xml.stream.XMLStreamWriter xmlWriter)
						throws javax.xml.stream.XMLStreamException, org.apache.axis2.databinding.ADBException{
			serialize(parentQName,xmlWriter,false);
		}

		public void serialize(final javax.xml.namespace.QName parentQName,
				javax.xml.stream.XMLStreamWriter xmlWriter,
				boolean serializeType)
						throws javax.xml.stream.XMLStreamException, org.apache.axis2.databinding.ADBException{




			java.lang.String prefix = null;
			java.lang.String namespace = null;


			prefix = parentQName.getPrefix();
			namespace = parentQName.getNamespaceURI();
			writeStartElement(prefix, namespace, parentQName.getLocalPart(), xmlWriter);

			if (serializeType){


				java.lang.String namespacePrefix = registerPrefix(xmlWriter,"http://docs.oasis-open.org/ws-sx/ws-trust/200512");
				if ((namespacePrefix != null) && (namespacePrefix.trim().length() > 0)){
					writeAttribute("xsi","http://www.w3.org/2001/XMLSchema-instance","type",
							namespacePrefix+":RequestSecurityTokenResponseType",
							xmlWriter);
				} else {
					writeAttribute("xsi","http://www.w3.org/2001/XMLSchema-instance","type",
							"RequestSecurityTokenResponseType",
							xmlWriter);
				}


			}

			if (localContext != null){

				writeAttribute("",
						"Context",
						org.apache.axis2.databinding.utils.ConverterUtil.convertToString(localContext), xmlWriter);


			}

			if (localExtraAttributes != null) {
				for (int i=0;i <localExtraAttributes.length;i++){
					writeAttribute(localExtraAttributes[i].getNamespace().getName(),
							localExtraAttributes[i].getLocalName(),
							localExtraAttributes[i].getAttributeValue(),xmlWriter);
				}
			}
			if (localRequestSecurityTokenResponseTypeChoiceTracker){

				if (localRequestSecurityTokenResponseTypeChoice!=null){
					for (int i = 0;i < localRequestSecurityTokenResponseTypeChoice.length;i++){
						if (localRequestSecurityTokenResponseTypeChoice[i] != null){
							localRequestSecurityTokenResponseTypeChoice[i].serialize(null,xmlWriter);
						} else {

							// we don't have to do any thing since minOccures is zero

						}

					}
				} else {
					throw new org.apache.axis2.databinding.ADBException("RequestSecurityTokenResponseTypeChoice cannot be null!!");
				}
			}
			xmlWriter.writeEndElement();


		}

		private static java.lang.String generatePrefix(java.lang.String namespace) {
			if(namespace.equals("http://docs.oasis-open.org/ws-sx/ws-trust/200512")){
				return "ns2";
			}
			return org.apache.axis2.databinding.utils.BeanUtil.getUniquePrefix();
		}

		/**
		 * Utility method to write an element start tag.
		 */
		private void writeStartElement(java.lang.String prefix, java.lang.String namespace, java.lang.String localPart,
				javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException {
			java.lang.String writerPrefix = xmlWriter.getPrefix(namespace);
			if (writerPrefix != null) {
				xmlWriter.writeStartElement(namespace, localPart);
			} else {
				if (namespace.length() == 0) {
					prefix = "";
				} else if (prefix == null) {
					prefix = generatePrefix(namespace);
				}

				xmlWriter.writeStartElement(prefix, localPart, namespace);
				xmlWriter.writeNamespace(prefix, namespace);
				xmlWriter.setPrefix(prefix, namespace);
			}
		}

		/**
		 * Util method to write an attribute with the ns prefix
		 */
		private void writeAttribute(java.lang.String prefix,java.lang.String namespace,java.lang.String attName,
				java.lang.String attValue,javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException{
			if (xmlWriter.getPrefix(namespace) == null) {
				xmlWriter.writeNamespace(prefix, namespace);
				xmlWriter.setPrefix(prefix, namespace);
			}
			xmlWriter.writeAttribute(namespace,attName,attValue);
		}

		/**
		 * Util method to write an attribute without the ns prefix
		 */
		private void writeAttribute(java.lang.String namespace,java.lang.String attName,
				java.lang.String attValue,javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException{
			if (namespace.equals("")) {
				xmlWriter.writeAttribute(attName,attValue);
			} else {
				registerPrefix(xmlWriter, namespace);
				xmlWriter.writeAttribute(namespace,attName,attValue);
			}
		}


		/**
		 * Util method to write an attribute without the ns prefix
		 */
		private void writeQNameAttribute(java.lang.String namespace, java.lang.String attName,
				javax.xml.namespace.QName qname, javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException {

			java.lang.String attributeNamespace = qname.getNamespaceURI();
			java.lang.String attributePrefix = xmlWriter.getPrefix(attributeNamespace);
			if (attributePrefix == null) {
				attributePrefix = registerPrefix(xmlWriter, attributeNamespace);
			}
			java.lang.String attributeValue;
			if (attributePrefix.trim().length() > 0) {
				attributeValue = attributePrefix + ":" + qname.getLocalPart();
			} else {
				attributeValue = qname.getLocalPart();
			}

			if (namespace.equals("")) {
				xmlWriter.writeAttribute(attName, attributeValue);
			} else {
				registerPrefix(xmlWriter, namespace);
				xmlWriter.writeAttribute(namespace, attName, attributeValue);
			}
		}
		/**
		 *  method to handle Qnames
		 */

		private void writeQName(javax.xml.namespace.QName qname,
				javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException {
			java.lang.String namespaceURI = qname.getNamespaceURI();
			if (namespaceURI != null) {
				java.lang.String prefix = xmlWriter.getPrefix(namespaceURI);
				if (prefix == null) {
					prefix = generatePrefix(namespaceURI);
					xmlWriter.writeNamespace(prefix, namespaceURI);
					xmlWriter.setPrefix(prefix,namespaceURI);
				}

				if (prefix.trim().length() > 0){
					xmlWriter.writeCharacters(prefix + ":" + org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qname));
				} else {
					// i.e this is the default namespace
					xmlWriter.writeCharacters(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qname));
				}

			} else {
				xmlWriter.writeCharacters(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qname));
			}
		}

		private void writeQNames(javax.xml.namespace.QName[] qnames,
				javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException {

			if (qnames != null) {
				// we have to store this data until last moment since it is not possible to write any
				// namespace data after writing the charactor data
				java.lang.StringBuffer stringToWrite = new java.lang.StringBuffer();
				java.lang.String namespaceURI = null;
				java.lang.String prefix = null;

				for (int i = 0; i < qnames.length; i++) {
					if (i > 0) {
						stringToWrite.append(" ");
					}
					namespaceURI = qnames[i].getNamespaceURI();
					if (namespaceURI != null) {
						prefix = xmlWriter.getPrefix(namespaceURI);
						if ((prefix == null) || (prefix.length() == 0)) {
							prefix = generatePrefix(namespaceURI);
							xmlWriter.writeNamespace(prefix, namespaceURI);
							xmlWriter.setPrefix(prefix,namespaceURI);
						}

						if (prefix.trim().length() > 0){
							stringToWrite.append(prefix).append(":").append(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qnames[i]));
						} else {
							stringToWrite.append(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qnames[i]));
						}
					} else {
						stringToWrite.append(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qnames[i]));
					}
				}
				xmlWriter.writeCharacters(stringToWrite.toString());
			}

		}


		/**
		 * Register a namespace prefix
		 */
		private java.lang.String registerPrefix(javax.xml.stream.XMLStreamWriter xmlWriter, java.lang.String namespace) throws javax.xml.stream.XMLStreamException {
			java.lang.String prefix = xmlWriter.getPrefix(namespace);
			if (prefix == null) {
				prefix = generatePrefix(namespace);
				javax.xml.namespace.NamespaceContext nsContext = xmlWriter.getNamespaceContext();
				while (true) {
					java.lang.String uri = nsContext.getNamespaceURI(prefix);
					if (uri == null || uri.length() == 0) {
						break;
					}
					prefix = org.apache.axis2.databinding.utils.BeanUtil.getUniquePrefix();
				}
				xmlWriter.writeNamespace(prefix, namespace);
				xmlWriter.setPrefix(prefix, namespace);
			}
			return prefix;
		}



		/**
		 * databinding method to get an XML representation of this object
		 *
		 */
		public javax.xml.stream.XMLStreamReader getPullParser(javax.xml.namespace.QName qName)
				throws org.apache.axis2.databinding.ADBException{



			java.util.ArrayList elementList = new java.util.ArrayList();
			java.util.ArrayList attribList = new java.util.ArrayList();

			if (localRequestSecurityTokenResponseTypeChoiceTracker){
				if (localRequestSecurityTokenResponseTypeChoice!=null) {
					for (int i = 0;i < localRequestSecurityTokenResponseTypeChoice.length;i++){

						if (localRequestSecurityTokenResponseTypeChoice[i] != null){
							elementList.add(new javax.xml.namespace.QName("http://docs.oasis-open.org/ws-sx/ws-trust/200512",
									"RequestSecurityTokenResponseTypeChoice"));
							elementList.add(localRequestSecurityTokenResponseTypeChoice[i]);
						} else {

							// nothing to do

						}

					}
				} else {

					throw new org.apache.axis2.databinding.ADBException("RequestSecurityTokenResponseTypeChoice cannot be null!!");

				}

			}
			attribList.add(
					new javax.xml.namespace.QName("","Context"));

			attribList.add(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(localContext));

			for (int i=0;i <localExtraAttributes.length;i++){
				attribList.add(org.apache.axis2.databinding.utils.Constants.OM_ATTRIBUTE_KEY);
				attribList.add(localExtraAttributes[i]);
			}


			return new org.apache.axis2.databinding.utils.reader.ADBXMLStreamReaderImpl(qName, elementList.toArray(), attribList.toArray());



		}



		/**
		 *  Factory class that keeps the parse method
		 */
		public static class Factory{




			/**
			 * static method to create the object
			 * Precondition:  If this object is an element, the current or next start element starts this object and any intervening reader events are ignorable
			 *                If this object is not an element, it is a complex type and the reader is at the event just after the outer start element
			 * Postcondition: If this object is an element, the reader is positioned at its end element
			 *                If this object is a complex type, the reader is positioned at the end element of its outer element
			 */
			public static RequestSecurityTokenResponseTypeE parse(javax.xml.stream.XMLStreamReader reader) throws java.lang.Exception{
				RequestSecurityTokenResponseTypeE object =
						new RequestSecurityTokenResponseTypeE();

				int event;
				java.lang.String nillableValue = null;
				java.lang.String prefix ="";
				java.lang.String namespaceuri ="";
				try {

					while (!reader.isStartElement() && !reader.isEndElement())
						reader.next();


					if (reader.getAttributeValue("http://www.w3.org/2001/XMLSchema-instance","type")!=null){
						java.lang.String fullTypeName = reader.getAttributeValue("http://www.w3.org/2001/XMLSchema-instance",
								"type");
						if (fullTypeName!=null){
							java.lang.String nsPrefix = null;
							if (fullTypeName.indexOf(":") > -1){
								nsPrefix = fullTypeName.substring(0,fullTypeName.indexOf(":"));
							}
							nsPrefix = nsPrefix==null?"":nsPrefix;

							java.lang.String type = fullTypeName.substring(fullTypeName.indexOf(":")+1);

							if (!"RequestSecurityTokenResponseType".equals(type)){
								//find namespace for the prefix
								java.lang.String nsUri = reader.getNamespaceContext().getNamespaceURI(nsPrefix);
								return (RequestSecurityTokenResponseTypeE)ExtensionMapper.getTypeObject(
										nsUri,type,reader);
							}


						}


					}




					// Note all attributes that were handled. Used to differ normal attributes
					// from anyAttributes.
					java.util.Vector handledAttributes = new java.util.Vector();



					// handle attribute "Context"
					java.lang.String tempAttribContext =

							reader.getAttributeValue(null,"Context");

					if (tempAttribContext!=null){
						java.lang.String content = tempAttribContext;

						object.setContext(
								org.apache.axis2.databinding.utils.ConverterUtil.convertToAnyURI(tempAttribContext));

					} else {

					}
					handledAttributes.add("Context");

					// now run through all any or extra attributes
					// which were not reflected until now
					for (int i=0; i < reader.getAttributeCount(); i++) {
						if (!handledAttributes.contains(reader.getAttributeLocalName(i))) {
							// this is an anyAttribute and we create
							// an OMAttribute for this
							org.apache.axiom.om.OMFactory factory = org.apache.axiom.om.OMAbstractFactory.getOMFactory();
							org.apache.axiom.om.OMAttribute attr =
									factory.createOMAttribute(
											reader.getAttributeLocalName(i),
											factory.createOMNamespace(
													reader.getAttributeNamespace(i), reader.getAttributePrefix(i)),
													reader.getAttributeValue(i));

							// and add it to the extra attributes

							object.addExtraAttributes(attr);


						}
					}


					reader.next();

					java.util.ArrayList list1 = new java.util.ArrayList();


					while (!reader.isStartElement() && !reader.isEndElement()) reader.next();


					try{

						if (reader.isStartElement() ){



							// Process the array and step past its final element's end.
							list1.add(RequestSecurityTokenResponseTypeChoiceE.Factory.parse(reader));
							//loop until we find a start element that is not part of this array
							boolean loopDone1 = false;
							while(!loopDone1){

								// Step to next element event.
								while (!reader.isStartElement() && !reader.isEndElement())
									reader.next();
								if (reader.isEndElement()){
									//two continuous end elements means we are exiting the xml structure
									loopDone1 = true;
								} else {
									list1.add(RequestSecurityTokenResponseTypeChoiceE.Factory.parse(reader));
								}
							}
							// call the converter utility  to convert and set the array
							object.setRequestSecurityTokenResponseTypeChoice((RequestSecurityTokenResponseTypeChoiceE[])
									org.apache.axis2.databinding.utils.ConverterUtil.convertToArray(
											RequestSecurityTokenResponseTypeChoiceE.class,
											list1));


						}  // End of if for expected property start element

						else {

						}


					} catch (java.lang.Exception e) {}

					while (!reader.isStartElement() && !reader.isEndElement())
						reader.next();

					if (reader.isStartElement())
						// A start element we are not expecting indicates a trailing invalid property
						throw new org.apache.axis2.databinding.ADBException("Unexpected subelement " + reader.getName());




				} catch (javax.xml.stream.XMLStreamException e) {
					throw new java.lang.Exception(e);
				}

				return object;
			}

		}//end of factory class



	}


	public static class RequestSecurityTokenE
	implements org.apache.axis2.databinding.ADBBean{

		public static final javax.xml.namespace.QName MY_QNAME = new javax.xml.namespace.QName(
				"http://docs.oasis-open.org/ws-sx/ws-trust/200512",
				"RequestSecurityToken",
				"ns2");



		/**
		 * field for RequestSecurityToken
		 */


		protected RequestSecurityTokenTypeE localRequestSecurityToken ;


		/**
		 * Auto generated getter method
		 * @return RequestSecurityTokenTypeE
		 */
		public  RequestSecurityTokenTypeE getRequestSecurityToken(){
			return localRequestSecurityToken;
		}



		/**
		 * Auto generated setter method
		 * @param param RequestSecurityToken
		 */
		public void setRequestSecurityToken(RequestSecurityTokenTypeE param){

			this.localRequestSecurityToken=param;


		}




		/**
		 *
		 * @param parentQName
		 * @param factory
		 * @return org.apache.axiom.om.OMElement
		 */
		public org.apache.axiom.om.OMElement getOMElement (
				final javax.xml.namespace.QName parentQName,
				final org.apache.axiom.om.OMFactory factory) throws org.apache.axis2.databinding.ADBException{



			org.apache.axiom.om.OMDataSource dataSource =
					new org.apache.axis2.databinding.ADBDataSource(this,MY_QNAME);
			return factory.createOMElement(dataSource,MY_QNAME);

		}

		public void serialize(final javax.xml.namespace.QName parentQName,
				javax.xml.stream.XMLStreamWriter xmlWriter)
						throws javax.xml.stream.XMLStreamException, org.apache.axis2.databinding.ADBException{
			serialize(parentQName,xmlWriter,false);
		}

		public void serialize(final javax.xml.namespace.QName parentQName,
				javax.xml.stream.XMLStreamWriter xmlWriter,
				boolean serializeType)
						throws javax.xml.stream.XMLStreamException, org.apache.axis2.databinding.ADBException{


			//We can safely assume an element has only one type associated with it

			if (localRequestSecurityToken==null){
				throw new org.apache.axis2.databinding.ADBException("RequestSecurityToken cannot be null!");
			}
			localRequestSecurityToken.serialize(MY_QNAME,xmlWriter);


		}

		private static java.lang.String generatePrefix(java.lang.String namespace) {
			if(namespace.equals("http://docs.oasis-open.org/ws-sx/ws-trust/200512")){
				return "ns2";
			}
			return org.apache.axis2.databinding.utils.BeanUtil.getUniquePrefix();
		}

		/**
		 * Utility method to write an element start tag.
		 */
		private void writeStartElement(java.lang.String prefix, java.lang.String namespace, java.lang.String localPart,
				javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException {
			java.lang.String writerPrefix = xmlWriter.getPrefix(namespace);
			if (writerPrefix != null) {
				xmlWriter.writeStartElement(namespace, localPart);
			} else {
				if (namespace.length() == 0) {
					prefix = "";
				} else if (prefix == null) {
					prefix = generatePrefix(namespace);
				}

				xmlWriter.writeStartElement(prefix, localPart, namespace);
				xmlWriter.writeNamespace(prefix, namespace);
				xmlWriter.setPrefix(prefix, namespace);
			}
		}

		/**
		 * Util method to write an attribute with the ns prefix
		 */
		private void writeAttribute(java.lang.String prefix,java.lang.String namespace,java.lang.String attName,
				java.lang.String attValue,javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException{
			if (xmlWriter.getPrefix(namespace) == null) {
				xmlWriter.writeNamespace(prefix, namespace);
				xmlWriter.setPrefix(prefix, namespace);
			}
			xmlWriter.writeAttribute(namespace,attName,attValue);
		}

		/**
		 * Util method to write an attribute without the ns prefix
		 */
		private void writeAttribute(java.lang.String namespace,java.lang.String attName,
				java.lang.String attValue,javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException{
			if (namespace.equals("")) {
				xmlWriter.writeAttribute(attName,attValue);
			} else {
				registerPrefix(xmlWriter, namespace);
				xmlWriter.writeAttribute(namespace,attName,attValue);
			}
		}


		/**
		 * Util method to write an attribute without the ns prefix
		 */
		private void writeQNameAttribute(java.lang.String namespace, java.lang.String attName,
				javax.xml.namespace.QName qname, javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException {

			java.lang.String attributeNamespace = qname.getNamespaceURI();
			java.lang.String attributePrefix = xmlWriter.getPrefix(attributeNamespace);
			if (attributePrefix == null) {
				attributePrefix = registerPrefix(xmlWriter, attributeNamespace);
			}
			java.lang.String attributeValue;
			if (attributePrefix.trim().length() > 0) {
				attributeValue = attributePrefix + ":" + qname.getLocalPart();
			} else {
				attributeValue = qname.getLocalPart();
			}

			if (namespace.equals("")) {
				xmlWriter.writeAttribute(attName, attributeValue);
			} else {
				registerPrefix(xmlWriter, namespace);
				xmlWriter.writeAttribute(namespace, attName, attributeValue);
			}
		}
		/**
		 *  method to handle Qnames
		 */

		private void writeQName(javax.xml.namespace.QName qname,
				javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException {
			java.lang.String namespaceURI = qname.getNamespaceURI();
			if (namespaceURI != null) {
				java.lang.String prefix = xmlWriter.getPrefix(namespaceURI);
				if (prefix == null) {
					prefix = generatePrefix(namespaceURI);
					xmlWriter.writeNamespace(prefix, namespaceURI);
					xmlWriter.setPrefix(prefix,namespaceURI);
				}

				if (prefix.trim().length() > 0){
					xmlWriter.writeCharacters(prefix + ":" + org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qname));
				} else {
					// i.e this is the default namespace
					xmlWriter.writeCharacters(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qname));
				}

			} else {
				xmlWriter.writeCharacters(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qname));
			}
		}

		private void writeQNames(javax.xml.namespace.QName[] qnames,
				javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException {

			if (qnames != null) {
				// we have to store this data until last moment since it is not possible to write any
				// namespace data after writing the charactor data
				java.lang.StringBuffer stringToWrite = new java.lang.StringBuffer();
				java.lang.String namespaceURI = null;
				java.lang.String prefix = null;

				for (int i = 0; i < qnames.length; i++) {
					if (i > 0) {
						stringToWrite.append(" ");
					}
					namespaceURI = qnames[i].getNamespaceURI();
					if (namespaceURI != null) {
						prefix = xmlWriter.getPrefix(namespaceURI);
						if ((prefix == null) || (prefix.length() == 0)) {
							prefix = generatePrefix(namespaceURI);
							xmlWriter.writeNamespace(prefix, namespaceURI);
							xmlWriter.setPrefix(prefix,namespaceURI);
						}

						if (prefix.trim().length() > 0){
							stringToWrite.append(prefix).append(":").append(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qnames[i]));
						} else {
							stringToWrite.append(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qnames[i]));
						}
					} else {
						stringToWrite.append(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qnames[i]));
					}
				}
				xmlWriter.writeCharacters(stringToWrite.toString());
			}

		}


		/**
		 * Register a namespace prefix
		 */
		private java.lang.String registerPrefix(javax.xml.stream.XMLStreamWriter xmlWriter, java.lang.String namespace) throws javax.xml.stream.XMLStreamException {
			java.lang.String prefix = xmlWriter.getPrefix(namespace);
			if (prefix == null) {
				prefix = generatePrefix(namespace);
				javax.xml.namespace.NamespaceContext nsContext = xmlWriter.getNamespaceContext();
				while (true) {
					java.lang.String uri = nsContext.getNamespaceURI(prefix);
					if (uri == null || uri.length() == 0) {
						break;
					}
					prefix = org.apache.axis2.databinding.utils.BeanUtil.getUniquePrefix();
				}
				xmlWriter.writeNamespace(prefix, namespace);
				xmlWriter.setPrefix(prefix, namespace);
			}
			return prefix;
		}



		/**
		 * databinding method to get an XML representation of this object
		 *
		 */
		public javax.xml.stream.XMLStreamReader getPullParser(javax.xml.namespace.QName qName)
				throws org.apache.axis2.databinding.ADBException{




			//We can safely assume an element has only one type associated with it
			return localRequestSecurityToken.getPullParser(MY_QNAME);

		}



		/**
		 *  Factory class that keeps the parse method
		 */
		public static class Factory{




			/**
			 * static method to create the object
			 * Precondition:  If this object is an element, the current or next start element starts this object and any intervening reader events are ignorable
			 *                If this object is not an element, it is a complex type and the reader is at the event just after the outer start element
			 * Postcondition: If this object is an element, the reader is positioned at its end element
			 *                If this object is a complex type, the reader is positioned at the end element of its outer element
			 */
			public static RequestSecurityTokenE parse(javax.xml.stream.XMLStreamReader reader) throws java.lang.Exception{
				RequestSecurityTokenE object =
						new RequestSecurityTokenE();

				int event;
				java.lang.String nillableValue = null;
				java.lang.String prefix ="";
				java.lang.String namespaceuri ="";
				try {

					while (!reader.isStartElement() && !reader.isEndElement())
						reader.next();




					// Note all attributes that were handled. Used to differ normal attributes
					// from anyAttributes.
					java.util.Vector handledAttributes = new java.util.Vector();



					while(!reader.isEndElement()) {
						if (reader.isStartElement() ){

							if (reader.isStartElement() && new javax.xml.namespace.QName("http://docs.oasis-open.org/ws-sx/ws-trust/200512","RequestSecurityToken").equals(reader.getName())){

								object.setRequestSecurityToken(RequestSecurityTokenTypeE.Factory.parse(reader));

							}  // End of if for expected property start element

							else{
								// A start element we are not expecting indicates an invalid parameter was passed
								throw new org.apache.axis2.databinding.ADBException("Unexpected subelement " + reader.getName());
							}

						} else {
							reader.next();
						}  
					}  // end of while loop




				} catch (javax.xml.stream.XMLStreamException e) {
					throw new java.lang.Exception(e);
				}

				return object;
			}

		}//end of factory class



	}


	public static class RequestSecurityTokenTypeE
	implements org.apache.axis2.databinding.ADBBean{
		/* This type was generated from the piece of schema that had
                name = RequestSecurityTokenType
                Namespace URI = http://docs.oasis-open.org/ws-sx/ws-trust/200512
                Namespace Prefix = ns2
		 */


		/**
		 * field for RequestSecurityTokenTypeChoice
		 * This was an Array!
		 */


		protected RequestSecurityTokenTypeChoiceE[] localRequestSecurityTokenTypeChoice ;

		/*  This tracker boolean wil be used to detect whether the user called the set method
		 *   for this attribute. It will be used to determine whether to include this field
		 *   in the serialized XML
		 */
		protected boolean localRequestSecurityTokenTypeChoiceTracker = false ;

		public boolean isRequestSecurityTokenTypeChoiceSpecified(){
			return localRequestSecurityTokenTypeChoiceTracker;
		}



		/**
		 * Auto generated getter method
		 * @return RequestSecurityTokenTypeChoiceE[]
		 */
		public  RequestSecurityTokenTypeChoiceE[] getRequestSecurityTokenTypeChoice(){
			return localRequestSecurityTokenTypeChoice;
		}






		/**
		 * validate the array for RequestSecurityTokenTypeChoice
		 */
		protected void validateRequestSecurityTokenTypeChoice(RequestSecurityTokenTypeChoiceE[] param){

		}


		/**
		 * Auto generated setter method
		 * @param param RequestSecurityTokenTypeChoice
		 */
		public void setRequestSecurityTokenTypeChoice(RequestSecurityTokenTypeChoiceE[] param){

			validateRequestSecurityTokenTypeChoice(param);

			localRequestSecurityTokenTypeChoiceTracker = param != null;

			this.localRequestSecurityTokenTypeChoice=param;
		}



		/**
		 * Auto generated add method for the array for convenience
		 * @param param RequestSecurityTokenTypeChoiceE
		 */
		public void addRequestSecurityTokenTypeChoice(RequestSecurityTokenTypeChoiceE param){
			if (localRequestSecurityTokenTypeChoice == null){
				localRequestSecurityTokenTypeChoice = new RequestSecurityTokenTypeChoiceE[]{};
			}


			//update the setting tracker
			localRequestSecurityTokenTypeChoiceTracker = true;


			java.util.List list =
					org.apache.axis2.databinding.utils.ConverterUtil.toList(localRequestSecurityTokenTypeChoice);
			list.add(param);
			this.localRequestSecurityTokenTypeChoice =
					(RequestSecurityTokenTypeChoiceE[])list.toArray(
							new RequestSecurityTokenTypeChoiceE[list.size()]);

		}


		/**
		 * field for Context
		 * This was an Attribute!
		 */


		protected org.apache.axis2.databinding.types.URI localContext ;


		/**
		 * Auto generated getter method
		 * @return org.apache.axis2.databinding.types.URI
		 */
		public  org.apache.axis2.databinding.types.URI getContext(){
			return localContext;
		}



		/**
		 * Auto generated setter method
		 * @param param Context
		 */
		public void setContext(org.apache.axis2.databinding.types.URI param){

			this.localContext=param;


		}


		/**
		 * field for ExtraAttributes
		 * This was an Attribute!
		 * This was an Array!
		 */


		protected org.apache.axiom.om.OMAttribute[] localExtraAttributes ;


		/**
		 * Auto generated getter method
		 * @return org.apache.axiom.om.OMAttribute[]
		 */
		public  org.apache.axiom.om.OMAttribute[] getExtraAttributes(){
			return localExtraAttributes;
		}






		/**
		 * validate the array for ExtraAttributes
		 */
		protected void validateExtraAttributes(org.apache.axiom.om.OMAttribute[] param){

			if ((param != null) && (param.length > 1)){
				throw new java.lang.RuntimeException();
			}

			if ((param != null) && (param.length < 1)){
				throw new java.lang.RuntimeException();
			}

		}


		/**
		 * Auto generated setter method
		 * @param param ExtraAttributes
		 */
		public void setExtraAttributes(org.apache.axiom.om.OMAttribute[] param){

			validateExtraAttributes(param);


			this.localExtraAttributes=param;
		}



		/**
		 * Auto generated add method for the array for convenience
		 * @param param org.apache.axiom.om.OMAttribute
		 */
		public void addExtraAttributes(org.apache.axiom.om.OMAttribute param){
			if (localExtraAttributes == null){
				localExtraAttributes = new org.apache.axiom.om.OMAttribute[]{};
			}



			java.util.List list =
					org.apache.axis2.databinding.utils.ConverterUtil.toList(localExtraAttributes);
			list.add(param);
			this.localExtraAttributes =
					(org.apache.axiom.om.OMAttribute[])list.toArray(
							new org.apache.axiom.om.OMAttribute[list.size()]);

		}




		/**
		 *
		 * @param parentQName
		 * @param factory
		 * @return org.apache.axiom.om.OMElement
		 */
		public org.apache.axiom.om.OMElement getOMElement (
				final javax.xml.namespace.QName parentQName,
				final org.apache.axiom.om.OMFactory factory) throws org.apache.axis2.databinding.ADBException{



			org.apache.axiom.om.OMDataSource dataSource =
					new org.apache.axis2.databinding.ADBDataSource(this,parentQName);
			return factory.createOMElement(dataSource,parentQName);

		}

		public void serialize(final javax.xml.namespace.QName parentQName,
				javax.xml.stream.XMLStreamWriter xmlWriter)
						throws javax.xml.stream.XMLStreamException, org.apache.axis2.databinding.ADBException{
			serialize(parentQName,xmlWriter,false);
		}

		public void serialize(final javax.xml.namespace.QName parentQName,
				javax.xml.stream.XMLStreamWriter xmlWriter,
				boolean serializeType)
						throws javax.xml.stream.XMLStreamException, org.apache.axis2.databinding.ADBException{




			java.lang.String prefix = null;
			java.lang.String namespace = null;


			prefix = parentQName.getPrefix();
			namespace = parentQName.getNamespaceURI();
			writeStartElement(prefix, namespace, parentQName.getLocalPart(), xmlWriter);

			if (serializeType){


				java.lang.String namespacePrefix = registerPrefix(xmlWriter,"http://docs.oasis-open.org/ws-sx/ws-trust/200512");
				if ((namespacePrefix != null) && (namespacePrefix.trim().length() > 0)){
					writeAttribute("xsi","http://www.w3.org/2001/XMLSchema-instance","type",
							namespacePrefix+":RequestSecurityTokenType",
							xmlWriter);
				} else {
					writeAttribute("xsi","http://www.w3.org/2001/XMLSchema-instance","type",
							"RequestSecurityTokenType",
							xmlWriter);
				}


			}

			if (localContext != null){

				writeAttribute("",
						"Context",
						org.apache.axis2.databinding.utils.ConverterUtil.convertToString(localContext), xmlWriter);


			}

			if (localExtraAttributes != null) {
				for (int i=0;i <localExtraAttributes.length;i++){
					writeAttribute(localExtraAttributes[i].getNamespace().getName(),
							localExtraAttributes[i].getLocalName(),
							localExtraAttributes[i].getAttributeValue(),xmlWriter);
				}
			}
			if (localRequestSecurityTokenTypeChoiceTracker){

				if (localRequestSecurityTokenTypeChoice!=null){
					for (int i = 0;i < localRequestSecurityTokenTypeChoice.length;i++){
						if (localRequestSecurityTokenTypeChoice[i] != null){
							localRequestSecurityTokenTypeChoice[i].serialize(null,xmlWriter);
						} else {

							// we don't have to do any thing since minOccures is zero

						}

					}
				} else {
					throw new org.apache.axis2.databinding.ADBException("RequestSecurityTokenTypeChoice cannot be null!!");
				}
			}
			xmlWriter.writeEndElement();


		}

		private static java.lang.String generatePrefix(java.lang.String namespace) {
			if(namespace.equals("http://docs.oasis-open.org/ws-sx/ws-trust/200512")){
				return "ns2";
			}
			return org.apache.axis2.databinding.utils.BeanUtil.getUniquePrefix();
		}

		/**
		 * Utility method to write an element start tag.
		 */
		private void writeStartElement(java.lang.String prefix, java.lang.String namespace, java.lang.String localPart,
				javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException {
			java.lang.String writerPrefix = xmlWriter.getPrefix(namespace);
			if (writerPrefix != null) {
				xmlWriter.writeStartElement(namespace, localPart);
			} else {
				if (namespace.length() == 0) {
					prefix = "";
				} else if (prefix == null) {
					prefix = generatePrefix(namespace);
				}

				xmlWriter.writeStartElement(prefix, localPart, namespace);
				xmlWriter.writeNamespace(prefix, namespace);
				xmlWriter.setPrefix(prefix, namespace);
			}
		}

		/**
		 * Util method to write an attribute with the ns prefix
		 */
		private void writeAttribute(java.lang.String prefix,java.lang.String namespace,java.lang.String attName,
				java.lang.String attValue,javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException{
			if (xmlWriter.getPrefix(namespace) == null) {
				xmlWriter.writeNamespace(prefix, namespace);
				xmlWriter.setPrefix(prefix, namespace);
			}
			xmlWriter.writeAttribute(namespace,attName,attValue);
		}

		/**
		 * Util method to write an attribute without the ns prefix
		 */
		private void writeAttribute(java.lang.String namespace,java.lang.String attName,
				java.lang.String attValue,javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException{
			if (namespace.equals("")) {
				xmlWriter.writeAttribute(attName,attValue);
			} else {
				registerPrefix(xmlWriter, namespace);
				xmlWriter.writeAttribute(namespace,attName,attValue);
			}
		}


		/**
		 * Util method to write an attribute without the ns prefix
		 */
		private void writeQNameAttribute(java.lang.String namespace, java.lang.String attName,
				javax.xml.namespace.QName qname, javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException {

			java.lang.String attributeNamespace = qname.getNamespaceURI();
			java.lang.String attributePrefix = xmlWriter.getPrefix(attributeNamespace);
			if (attributePrefix == null) {
				attributePrefix = registerPrefix(xmlWriter, attributeNamespace);
			}
			java.lang.String attributeValue;
			if (attributePrefix.trim().length() > 0) {
				attributeValue = attributePrefix + ":" + qname.getLocalPart();
			} else {
				attributeValue = qname.getLocalPart();
			}

			if (namespace.equals("")) {
				xmlWriter.writeAttribute(attName, attributeValue);
			} else {
				registerPrefix(xmlWriter, namespace);
				xmlWriter.writeAttribute(namespace, attName, attributeValue);
			}
		}
		/**
		 *  method to handle Qnames
		 */

		private void writeQName(javax.xml.namespace.QName qname,
				javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException {
			java.lang.String namespaceURI = qname.getNamespaceURI();
			if (namespaceURI != null) {
				java.lang.String prefix = xmlWriter.getPrefix(namespaceURI);
				if (prefix == null) {
					prefix = generatePrefix(namespaceURI);
					xmlWriter.writeNamespace(prefix, namespaceURI);
					xmlWriter.setPrefix(prefix,namespaceURI);
				}

				if (prefix.trim().length() > 0){
					xmlWriter.writeCharacters(prefix + ":" + org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qname));
				} else {
					// i.e this is the default namespace
					xmlWriter.writeCharacters(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qname));
				}

			} else {
				xmlWriter.writeCharacters(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qname));
			}
		}

		private void writeQNames(javax.xml.namespace.QName[] qnames,
				javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException {

			if (qnames != null) {
				// we have to store this data until last moment since it is not possible to write any
				// namespace data after writing the charactor data
				java.lang.StringBuffer stringToWrite = new java.lang.StringBuffer();
				java.lang.String namespaceURI = null;
				java.lang.String prefix = null;

				for (int i = 0; i < qnames.length; i++) {
					if (i > 0) {
						stringToWrite.append(" ");
					}
					namespaceURI = qnames[i].getNamespaceURI();
					if (namespaceURI != null) {
						prefix = xmlWriter.getPrefix(namespaceURI);
						if ((prefix == null) || (prefix.length() == 0)) {
							prefix = generatePrefix(namespaceURI);
							xmlWriter.writeNamespace(prefix, namespaceURI);
							xmlWriter.setPrefix(prefix,namespaceURI);
						}

						if (prefix.trim().length() > 0){
							stringToWrite.append(prefix).append(":").append(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qnames[i]));
						} else {
							stringToWrite.append(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qnames[i]));
						}
					} else {
						stringToWrite.append(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qnames[i]));
					}
				}
				xmlWriter.writeCharacters(stringToWrite.toString());
			}

		}


		/**
		 * Register a namespace prefix
		 */
		private java.lang.String registerPrefix(javax.xml.stream.XMLStreamWriter xmlWriter, java.lang.String namespace) throws javax.xml.stream.XMLStreamException {
			java.lang.String prefix = xmlWriter.getPrefix(namespace);
			if (prefix == null) {
				prefix = generatePrefix(namespace);
				javax.xml.namespace.NamespaceContext nsContext = xmlWriter.getNamespaceContext();
				while (true) {
					java.lang.String uri = nsContext.getNamespaceURI(prefix);
					if (uri == null || uri.length() == 0) {
						break;
					}
					prefix = org.apache.axis2.databinding.utils.BeanUtil.getUniquePrefix();
				}
				xmlWriter.writeNamespace(prefix, namespace);
				xmlWriter.setPrefix(prefix, namespace);
			}
			return prefix;
		}



		/**
		 * databinding method to get an XML representation of this object
		 *
		 */
		public javax.xml.stream.XMLStreamReader getPullParser(javax.xml.namespace.QName qName)
				throws org.apache.axis2.databinding.ADBException{



			java.util.ArrayList elementList = new java.util.ArrayList();
			java.util.ArrayList attribList = new java.util.ArrayList();

			if (localRequestSecurityTokenTypeChoiceTracker){
				if (localRequestSecurityTokenTypeChoice!=null) {
					for (int i = 0;i < localRequestSecurityTokenTypeChoice.length;i++){

						if (localRequestSecurityTokenTypeChoice[i] != null){
							elementList.add(new javax.xml.namespace.QName("http://docs.oasis-open.org/ws-sx/ws-trust/200512",
									"RequestSecurityTokenTypeChoice"));
							elementList.add(localRequestSecurityTokenTypeChoice[i]);
						} else {

							// nothing to do

						}

					}
				} else {

					throw new org.apache.axis2.databinding.ADBException("RequestSecurityTokenTypeChoice cannot be null!!");

				}

			}
			attribList.add(
					new javax.xml.namespace.QName("","Context"));

			attribList.add(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(localContext));

			for (int i=0;i <localExtraAttributes.length;i++){
				attribList.add(org.apache.axis2.databinding.utils.Constants.OM_ATTRIBUTE_KEY);
				attribList.add(localExtraAttributes[i]);
			}


			return new org.apache.axis2.databinding.utils.reader.ADBXMLStreamReaderImpl(qName, elementList.toArray(), attribList.toArray());



		}



		/**
		 *  Factory class that keeps the parse method
		 */
		public static class Factory{




			/**
			 * static method to create the object
			 * Precondition:  If this object is an element, the current or next start element starts this object and any intervening reader events are ignorable
			 *                If this object is not an element, it is a complex type and the reader is at the event just after the outer start element
			 * Postcondition: If this object is an element, the reader is positioned at its end element
			 *                If this object is a complex type, the reader is positioned at the end element of its outer element
			 */
			public static RequestSecurityTokenTypeE parse(javax.xml.stream.XMLStreamReader reader) throws java.lang.Exception{
				RequestSecurityTokenTypeE object =
						new RequestSecurityTokenTypeE();

				int event;
				java.lang.String nillableValue = null;
				java.lang.String prefix ="";
				java.lang.String namespaceuri ="";
				try {

					while (!reader.isStartElement() && !reader.isEndElement())
						reader.next();


					if (reader.getAttributeValue("http://www.w3.org/2001/XMLSchema-instance","type")!=null){
						java.lang.String fullTypeName = reader.getAttributeValue("http://www.w3.org/2001/XMLSchema-instance",
								"type");
						if (fullTypeName!=null){
							java.lang.String nsPrefix = null;
							if (fullTypeName.indexOf(":") > -1){
								nsPrefix = fullTypeName.substring(0,fullTypeName.indexOf(":"));
							}
							nsPrefix = nsPrefix==null?"":nsPrefix;

							java.lang.String type = fullTypeName.substring(fullTypeName.indexOf(":")+1);

							if (!"RequestSecurityTokenType".equals(type)){
								//find namespace for the prefix
								java.lang.String nsUri = reader.getNamespaceContext().getNamespaceURI(nsPrefix);
								return (RequestSecurityTokenTypeE)ExtensionMapper.getTypeObject(
										nsUri,type,reader);
							}


						}


					}




					// Note all attributes that were handled. Used to differ normal attributes
					// from anyAttributes.
					java.util.Vector handledAttributes = new java.util.Vector();



					// handle attribute "Context"
					java.lang.String tempAttribContext =

							reader.getAttributeValue(null,"Context");

					if (tempAttribContext!=null){
						java.lang.String content = tempAttribContext;

						object.setContext(
								org.apache.axis2.databinding.utils.ConverterUtil.convertToAnyURI(tempAttribContext));

					} else {

					}
					handledAttributes.add("Context");

					// now run through all any or extra attributes
					// which were not reflected until now
					for (int i=0; i < reader.getAttributeCount(); i++) {
						if (!handledAttributes.contains(reader.getAttributeLocalName(i))) {
							// this is an anyAttribute and we create
							// an OMAttribute for this
							org.apache.axiom.om.OMFactory factory = org.apache.axiom.om.OMAbstractFactory.getOMFactory();
							org.apache.axiom.om.OMAttribute attr =
									factory.createOMAttribute(
											reader.getAttributeLocalName(i),
											factory.createOMNamespace(
													reader.getAttributeNamespace(i), reader.getAttributePrefix(i)),
													reader.getAttributeValue(i));

							// and add it to the extra attributes

							object.addExtraAttributes(attr);


						}
					}


					reader.next();

					java.util.ArrayList list1 = new java.util.ArrayList();


					while (!reader.isStartElement() && !reader.isEndElement()) reader.next();


					try{

						if (reader.isStartElement() ){



							// Process the array and step past its final element's end.
							list1.add(RequestSecurityTokenTypeChoiceE.Factory.parse(reader));
							//loop until we find a start element that is not part of this array
							boolean loopDone1 = false;
							while(!loopDone1){

								// Step to next element event.
								while (!reader.isStartElement() && !reader.isEndElement())
									reader.next();
								if (reader.isEndElement()){
									//two continuous end elements means we are exiting the xml structure
									loopDone1 = true;
								} else {
									list1.add(RequestSecurityTokenTypeChoiceE.Factory.parse(reader));
								}
							}
							// call the converter utility  to convert and set the array
							object.setRequestSecurityTokenTypeChoice((RequestSecurityTokenTypeChoiceE[])
									org.apache.axis2.databinding.utils.ConverterUtil.convertToArray(
											RequestSecurityTokenTypeChoiceE.class,
											list1));


						}  // End of if for expected property start element

						else {

						}


					} catch (java.lang.Exception e) {}

					while (!reader.isStartElement() && !reader.isEndElement())
						reader.next();

					if (reader.isStartElement())
						// A start element we are not expecting indicates a trailing invalid property
						throw new org.apache.axis2.databinding.ADBException("Unexpected subelement " + reader.getName());




				} catch (javax.xml.stream.XMLStreamException e) {
					throw new java.lang.Exception(e);
				}

				return object;
			}

		}//end of factory class



	}


	public static class ExtensionMapper{

		public static java.lang.Object getTypeObject(java.lang.String namespaceURI,
				java.lang.String typeName,
				javax.xml.stream.XMLStreamReader reader) throws java.lang.Exception{


			if (
					"http://docs.oasis-open.org/ws-sx/ws-trust/200512".equals(namespaceURI) &&
					"RequestSecurityTokenResponseType".equals(typeName)){

				return  RequestSecurityTokenResponseTypeE.Factory.parse(reader);


			}


			if (
					"http://schemas.xmlsoap.org/ws/2005/02/trust".equals(namespaceURI) &&
					"RequestSecurityTokenResponseType".equals(typeName)){

				return  RequestSecurityTokenResponseType.Factory.parse(reader);


			}


			if (
					"http://schemas.xmlsoap.org/ws/2005/02/trust".equals(namespaceURI) &&
					"RequestSecurityTokenType".equals(typeName)){

				return  RequestSecurityTokenType.Factory.parse(reader);


			}


			if (
					"http://docs.oasis-open.org/ws-sx/ws-trust/200512".equals(namespaceURI) &&
					"RequestSecurityTokenResponseCollectionType".equals(typeName)){

				return  RequestSecurityTokenResponseCollectionType.Factory.parse(reader);


			}


			if (
					"http://docs.oasis-open.org/ws-sx/ws-trust/200512".equals(namespaceURI) &&
					"RequestSecurityTokenType".equals(typeName)){

				return  RequestSecurityTokenTypeE.Factory.parse(reader);


			}


			throw new org.apache.axis2.databinding.ADBException("Unsupported type " + namespaceURI + " " + typeName);
		}

	}

	public static class RequestSecurityTokenResponseCollection
	implements org.apache.axis2.databinding.ADBBean{

		public static final javax.xml.namespace.QName MY_QNAME = new javax.xml.namespace.QName(
				"http://docs.oasis-open.org/ws-sx/ws-trust/200512",
				"RequestSecurityTokenResponseCollection",
				"ns2");



		/**
		 * field for RequestSecurityTokenResponseCollection
		 */


		protected RequestSecurityTokenResponseCollectionType localRequestSecurityTokenResponseCollection ;


		/**
		 * Auto generated getter method
		 * @return RequestSecurityTokenResponseCollectionType
		 */
		public  RequestSecurityTokenResponseCollectionType getRequestSecurityTokenResponseCollection(){
			return localRequestSecurityTokenResponseCollection;
		}



		/**
		 * Auto generated setter method
		 * @param param RequestSecurityTokenResponseCollection
		 */
		public void setRequestSecurityTokenResponseCollection(RequestSecurityTokenResponseCollectionType param){

			this.localRequestSecurityTokenResponseCollection=param;


		}




		/**
		 *
		 * @param parentQName
		 * @param factory
		 * @return org.apache.axiom.om.OMElement
		 */
		public org.apache.axiom.om.OMElement getOMElement (
				final javax.xml.namespace.QName parentQName,
				final org.apache.axiom.om.OMFactory factory) throws org.apache.axis2.databinding.ADBException{



			org.apache.axiom.om.OMDataSource dataSource =
					new org.apache.axis2.databinding.ADBDataSource(this,MY_QNAME);
			return factory.createOMElement(dataSource,MY_QNAME);

		}

		public void serialize(final javax.xml.namespace.QName parentQName,
				javax.xml.stream.XMLStreamWriter xmlWriter)
						throws javax.xml.stream.XMLStreamException, org.apache.axis2.databinding.ADBException{
			serialize(parentQName,xmlWriter,false);
		}

		public void serialize(final javax.xml.namespace.QName parentQName,
				javax.xml.stream.XMLStreamWriter xmlWriter,
				boolean serializeType)
						throws javax.xml.stream.XMLStreamException, org.apache.axis2.databinding.ADBException{


			//We can safely assume an element has only one type associated with it

			if (localRequestSecurityTokenResponseCollection==null){
				throw new org.apache.axis2.databinding.ADBException("RequestSecurityTokenResponseCollection cannot be null!");
			}
			localRequestSecurityTokenResponseCollection.serialize(MY_QNAME,xmlWriter);


		}

		private static java.lang.String generatePrefix(java.lang.String namespace) {
			if(namespace.equals("http://docs.oasis-open.org/ws-sx/ws-trust/200512")){
				return "ns2";
			}
			return org.apache.axis2.databinding.utils.BeanUtil.getUniquePrefix();
		}

		/**
		 * Utility method to write an element start tag.
		 */
		private void writeStartElement(java.lang.String prefix, java.lang.String namespace, java.lang.String localPart,
				javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException {
			java.lang.String writerPrefix = xmlWriter.getPrefix(namespace);
			if (writerPrefix != null) {
				xmlWriter.writeStartElement(namespace, localPart);
			} else {
				if (namespace.length() == 0) {
					prefix = "";
				} else if (prefix == null) {
					prefix = generatePrefix(namespace);
				}

				xmlWriter.writeStartElement(prefix, localPart, namespace);
				xmlWriter.writeNamespace(prefix, namespace);
				xmlWriter.setPrefix(prefix, namespace);
			}
		}

		/**
		 * Util method to write an attribute with the ns prefix
		 */
		private void writeAttribute(java.lang.String prefix,java.lang.String namespace,java.lang.String attName,
				java.lang.String attValue,javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException{
			if (xmlWriter.getPrefix(namespace) == null) {
				xmlWriter.writeNamespace(prefix, namespace);
				xmlWriter.setPrefix(prefix, namespace);
			}
			xmlWriter.writeAttribute(namespace,attName,attValue);
		}

		/**
		 * Util method to write an attribute without the ns prefix
		 */
		private void writeAttribute(java.lang.String namespace,java.lang.String attName,
				java.lang.String attValue,javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException{
			if (namespace.equals("")) {
				xmlWriter.writeAttribute(attName,attValue);
			} else {
				registerPrefix(xmlWriter, namespace);
				xmlWriter.writeAttribute(namespace,attName,attValue);
			}
		}


		/**
		 * Util method to write an attribute without the ns prefix
		 */
		private void writeQNameAttribute(java.lang.String namespace, java.lang.String attName,
				javax.xml.namespace.QName qname, javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException {

			java.lang.String attributeNamespace = qname.getNamespaceURI();
			java.lang.String attributePrefix = xmlWriter.getPrefix(attributeNamespace);
			if (attributePrefix == null) {
				attributePrefix = registerPrefix(xmlWriter, attributeNamespace);
			}
			java.lang.String attributeValue;
			if (attributePrefix.trim().length() > 0) {
				attributeValue = attributePrefix + ":" + qname.getLocalPart();
			} else {
				attributeValue = qname.getLocalPart();
			}

			if (namespace.equals("")) {
				xmlWriter.writeAttribute(attName, attributeValue);
			} else {
				registerPrefix(xmlWriter, namespace);
				xmlWriter.writeAttribute(namespace, attName, attributeValue);
			}
		}
		/**
		 *  method to handle Qnames
		 */

		private void writeQName(javax.xml.namespace.QName qname,
				javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException {
			java.lang.String namespaceURI = qname.getNamespaceURI();
			if (namespaceURI != null) {
				java.lang.String prefix = xmlWriter.getPrefix(namespaceURI);
				if (prefix == null) {
					prefix = generatePrefix(namespaceURI);
					xmlWriter.writeNamespace(prefix, namespaceURI);
					xmlWriter.setPrefix(prefix,namespaceURI);
				}

				if (prefix.trim().length() > 0){
					xmlWriter.writeCharacters(prefix + ":" + org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qname));
				} else {
					// i.e this is the default namespace
					xmlWriter.writeCharacters(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qname));
				}

			} else {
				xmlWriter.writeCharacters(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qname));
			}
		}

		private void writeQNames(javax.xml.namespace.QName[] qnames,
				javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException {

			if (qnames != null) {
				// we have to store this data until last moment since it is not possible to write any
				// namespace data after writing the charactor data
				java.lang.StringBuffer stringToWrite = new java.lang.StringBuffer();
				java.lang.String namespaceURI = null;
				java.lang.String prefix = null;

				for (int i = 0; i < qnames.length; i++) {
					if (i > 0) {
						stringToWrite.append(" ");
					}
					namespaceURI = qnames[i].getNamespaceURI();
					if (namespaceURI != null) {
						prefix = xmlWriter.getPrefix(namespaceURI);
						if ((prefix == null) || (prefix.length() == 0)) {
							prefix = generatePrefix(namespaceURI);
							xmlWriter.writeNamespace(prefix, namespaceURI);
							xmlWriter.setPrefix(prefix,namespaceURI);
						}

						if (prefix.trim().length() > 0){
							stringToWrite.append(prefix).append(":").append(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qnames[i]));
						} else {
							stringToWrite.append(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qnames[i]));
						}
					} else {
						stringToWrite.append(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qnames[i]));
					}
				}
				xmlWriter.writeCharacters(stringToWrite.toString());
			}

		}


		/**
		 * Register a namespace prefix
		 */
		private java.lang.String registerPrefix(javax.xml.stream.XMLStreamWriter xmlWriter, java.lang.String namespace) throws javax.xml.stream.XMLStreamException {
			java.lang.String prefix = xmlWriter.getPrefix(namespace);
			if (prefix == null) {
				prefix = generatePrefix(namespace);
				javax.xml.namespace.NamespaceContext nsContext = xmlWriter.getNamespaceContext();
				while (true) {
					java.lang.String uri = nsContext.getNamespaceURI(prefix);
					if (uri == null || uri.length() == 0) {
						break;
					}
					prefix = org.apache.axis2.databinding.utils.BeanUtil.getUniquePrefix();
				}
				xmlWriter.writeNamespace(prefix, namespace);
				xmlWriter.setPrefix(prefix, namespace);
			}
			return prefix;
		}



		/**
		 * databinding method to get an XML representation of this object
		 *
		 */
		public javax.xml.stream.XMLStreamReader getPullParser(javax.xml.namespace.QName qName)
				throws org.apache.axis2.databinding.ADBException{




			//We can safely assume an element has only one type associated with it
			return localRequestSecurityTokenResponseCollection.getPullParser(MY_QNAME);

		}



		/**
		 *  Factory class that keeps the parse method
		 */
		public static class Factory{




			/**
			 * static method to create the object
			 * Precondition:  If this object is an element, the current or next start element starts this object and any intervening reader events are ignorable
			 *                If this object is not an element, it is a complex type and the reader is at the event just after the outer start element
			 * Postcondition: If this object is an element, the reader is positioned at its end element
			 *                If this object is a complex type, the reader is positioned at the end element of its outer element
			 */
			public static RequestSecurityTokenResponseCollection parse(javax.xml.stream.XMLStreamReader reader) throws java.lang.Exception{
				RequestSecurityTokenResponseCollection object =
						new RequestSecurityTokenResponseCollection();

				int event;
				java.lang.String nillableValue = null;
				java.lang.String prefix ="";
				java.lang.String namespaceuri ="";
				try {

					while (!reader.isStartElement() && !reader.isEndElement())
						reader.next();




					// Note all attributes that were handled. Used to differ normal attributes
					// from anyAttributes.
					java.util.Vector handledAttributes = new java.util.Vector();



					while(!reader.isEndElement()) {
						if (reader.isStartElement() ){

							if (reader.isStartElement() && new javax.xml.namespace.QName("http://docs.oasis-open.org/ws-sx/ws-trust/200512","RequestSecurityTokenResponseCollection").equals(reader.getName())){

								object.setRequestSecurityTokenResponseCollection(RequestSecurityTokenResponseCollectionType.Factory.parse(reader));

							}  // End of if for expected property start element

							else{
								// A start element we are not expecting indicates an invalid parameter was passed
								throw new org.apache.axis2.databinding.ADBException("Unexpected subelement " + reader.getName());
							}

						} else {
							reader.next();
						}  
					}  // end of while loop




				} catch (javax.xml.stream.XMLStreamException e) {
					throw new java.lang.Exception(e);
				}

				return object;
			}

		}//end of factory class



	}


	public static class RequestSecurityTokenType
	implements org.apache.axis2.databinding.ADBBean{
		/* This type was generated from the piece of schema that had
                name = RequestSecurityTokenType
                Namespace URI = http://schemas.xmlsoap.org/ws/2005/02/trust
                Namespace Prefix = ns1
		 */


		/**
		 * field for RequestSecurityTokenTypeChoice
		 * This was an Array!
		 */


		protected RequestSecurityTokenTypeChoice[] localRequestSecurityTokenTypeChoice ;

		/*  This tracker boolean wil be used to detect whether the user called the set method
		 *   for this attribute. It will be used to determine whether to include this field
		 *   in the serialized XML
		 */
		protected boolean localRequestSecurityTokenTypeChoiceTracker = false ;

		public boolean isRequestSecurityTokenTypeChoiceSpecified(){
			return localRequestSecurityTokenTypeChoiceTracker;
		}



		/**
		 * Auto generated getter method
		 * @return RequestSecurityTokenTypeChoice[]
		 */
		public  RequestSecurityTokenTypeChoice[] getRequestSecurityTokenTypeChoice(){
			return localRequestSecurityTokenTypeChoice;
		}






		/**
		 * validate the array for RequestSecurityTokenTypeChoice
		 */
		protected void validateRequestSecurityTokenTypeChoice(RequestSecurityTokenTypeChoice[] param){

		}


		/**
		 * Auto generated setter method
		 * @param param RequestSecurityTokenTypeChoice
		 */
		public void setRequestSecurityTokenTypeChoice(RequestSecurityTokenTypeChoice[] param){

			validateRequestSecurityTokenTypeChoice(param);

			localRequestSecurityTokenTypeChoiceTracker = param != null;

			this.localRequestSecurityTokenTypeChoice=param;
		}



		/**
		 * Auto generated add method for the array for convenience
		 * @param param RequestSecurityTokenTypeChoice
		 */
		public void addRequestSecurityTokenTypeChoice(RequestSecurityTokenTypeChoice param){
			if (localRequestSecurityTokenTypeChoice == null){
				localRequestSecurityTokenTypeChoice = new RequestSecurityTokenTypeChoice[]{};
			}


			//update the setting tracker
			localRequestSecurityTokenTypeChoiceTracker = true;


			java.util.List list =
					org.apache.axis2.databinding.utils.ConverterUtil.toList(localRequestSecurityTokenTypeChoice);
			list.add(param);
			this.localRequestSecurityTokenTypeChoice =
					(RequestSecurityTokenTypeChoice[])list.toArray(
							new RequestSecurityTokenTypeChoice[list.size()]);

		}


		/**
		 * field for Context
		 * This was an Attribute!
		 */


		protected org.apache.axis2.databinding.types.URI localContext ;


		/**
		 * Auto generated getter method
		 * @return org.apache.axis2.databinding.types.URI
		 */
		public  org.apache.axis2.databinding.types.URI getContext(){
			return localContext;
		}



		/**
		 * Auto generated setter method
		 * @param param Context
		 */
		public void setContext(org.apache.axis2.databinding.types.URI param){

			this.localContext=param;


		}


		/**
		 * field for ExtraAttributes
		 * This was an Attribute!
		 * This was an Array!
		 */


		protected org.apache.axiom.om.OMAttribute[] localExtraAttributes ;


		/**
		 * Auto generated getter method
		 * @return org.apache.axiom.om.OMAttribute[]
		 */
		public  org.apache.axiom.om.OMAttribute[] getExtraAttributes(){
			return localExtraAttributes;
		}






		/**
		 * validate the array for ExtraAttributes
		 */
		protected void validateExtraAttributes(org.apache.axiom.om.OMAttribute[] param){

			if ((param != null) && (param.length > 1)){
				throw new java.lang.RuntimeException();
			}

			if ((param != null) && (param.length < 1)){
				throw new java.lang.RuntimeException();
			}

		}


		/**
		 * Auto generated setter method
		 * @param param ExtraAttributes
		 */
		public void setExtraAttributes(org.apache.axiom.om.OMAttribute[] param){

			validateExtraAttributes(param);


			this.localExtraAttributes=param;
		}



		/**
		 * Auto generated add method for the array for convenience
		 * @param param org.apache.axiom.om.OMAttribute
		 */
		public void addExtraAttributes(org.apache.axiom.om.OMAttribute param){
			if (localExtraAttributes == null){
				localExtraAttributes = new org.apache.axiom.om.OMAttribute[]{};
			}



			java.util.List list =
					org.apache.axis2.databinding.utils.ConverterUtil.toList(localExtraAttributes);
			list.add(param);
			this.localExtraAttributes =
					(org.apache.axiom.om.OMAttribute[])list.toArray(
							new org.apache.axiom.om.OMAttribute[list.size()]);

		}




		/**
		 *
		 * @param parentQName
		 * @param factory
		 * @return org.apache.axiom.om.OMElement
		 */
		public org.apache.axiom.om.OMElement getOMElement (
				final javax.xml.namespace.QName parentQName,
				final org.apache.axiom.om.OMFactory factory) throws org.apache.axis2.databinding.ADBException{



			org.apache.axiom.om.OMDataSource dataSource =
					new org.apache.axis2.databinding.ADBDataSource(this,parentQName);
			return factory.createOMElement(dataSource,parentQName);

		}

		public void serialize(final javax.xml.namespace.QName parentQName,
				javax.xml.stream.XMLStreamWriter xmlWriter)
						throws javax.xml.stream.XMLStreamException, org.apache.axis2.databinding.ADBException{
			serialize(parentQName,xmlWriter,false);
		}

		public void serialize(final javax.xml.namespace.QName parentQName,
				javax.xml.stream.XMLStreamWriter xmlWriter,
				boolean serializeType)
						throws javax.xml.stream.XMLStreamException, org.apache.axis2.databinding.ADBException{




			java.lang.String prefix = null;
			java.lang.String namespace = null;


			prefix = parentQName.getPrefix();
			namespace = parentQName.getNamespaceURI();
			writeStartElement(prefix, namespace, parentQName.getLocalPart(), xmlWriter);

			if (serializeType){


				java.lang.String namespacePrefix = registerPrefix(xmlWriter,"http://schemas.xmlsoap.org/ws/2005/02/trust");
				if ((namespacePrefix != null) && (namespacePrefix.trim().length() > 0)){
					writeAttribute("xsi","http://www.w3.org/2001/XMLSchema-instance","type",
							namespacePrefix+":RequestSecurityTokenType",
							xmlWriter);
				} else {
					writeAttribute("xsi","http://www.w3.org/2001/XMLSchema-instance","type",
							"RequestSecurityTokenType",
							xmlWriter);
				}


			}

			if (localContext != null){

				writeAttribute("",
						"Context",
						org.apache.axis2.databinding.utils.ConverterUtil.convertToString(localContext), xmlWriter);


			}

			if (localExtraAttributes != null) {
				for (int i=0;i <localExtraAttributes.length;i++){
					writeAttribute(localExtraAttributes[i].getNamespace().getName(),
							localExtraAttributes[i].getLocalName(),
							localExtraAttributes[i].getAttributeValue(),xmlWriter);
				}
			}
			if (localRequestSecurityTokenTypeChoiceTracker){

				if (localRequestSecurityTokenTypeChoice!=null){
					for (int i = 0;i < localRequestSecurityTokenTypeChoice.length;i++){
						if (localRequestSecurityTokenTypeChoice[i] != null){
							localRequestSecurityTokenTypeChoice[i].serialize(null,xmlWriter);
						} else {

							// we don't have to do any thing since minOccures is zero

						}

					}
				} else {
					throw new org.apache.axis2.databinding.ADBException("RequestSecurityTokenTypeChoice cannot be null!!");
				}
			}
			xmlWriter.writeEndElement();


		}

		private static java.lang.String generatePrefix(java.lang.String namespace) {
			if(namespace.equals("http://schemas.xmlsoap.org/ws/2005/02/trust")){
				return "ns1";
			}
			return org.apache.axis2.databinding.utils.BeanUtil.getUniquePrefix();
		}

		/**
		 * Utility method to write an element start tag.
		 */
		private void writeStartElement(java.lang.String prefix, java.lang.String namespace, java.lang.String localPart,
				javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException {
			java.lang.String writerPrefix = xmlWriter.getPrefix(namespace);
			if (writerPrefix != null) {
				xmlWriter.writeStartElement(namespace, localPart);
			} else {
				if (namespace.length() == 0) {
					prefix = "";
				} else if (prefix == null) {
					prefix = generatePrefix(namespace);
				}

				xmlWriter.writeStartElement(prefix, localPart, namespace);
				xmlWriter.writeNamespace(prefix, namespace);
				xmlWriter.setPrefix(prefix, namespace);
			}
		}

		/**
		 * Util method to write an attribute with the ns prefix
		 */
		private void writeAttribute(java.lang.String prefix,java.lang.String namespace,java.lang.String attName,
				java.lang.String attValue,javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException{
			if (xmlWriter.getPrefix(namespace) == null) {
				xmlWriter.writeNamespace(prefix, namespace);
				xmlWriter.setPrefix(prefix, namespace);
			}
			xmlWriter.writeAttribute(namespace,attName,attValue);
		}

		/**
		 * Util method to write an attribute without the ns prefix
		 */
		private void writeAttribute(java.lang.String namespace,java.lang.String attName,
				java.lang.String attValue,javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException{
			if (namespace.equals("")) {
				xmlWriter.writeAttribute(attName,attValue);
			} else {
				registerPrefix(xmlWriter, namespace);
				xmlWriter.writeAttribute(namespace,attName,attValue);
			}
		}


		/**
		 * Util method to write an attribute without the ns prefix
		 */
		private void writeQNameAttribute(java.lang.String namespace, java.lang.String attName,
				javax.xml.namespace.QName qname, javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException {

			java.lang.String attributeNamespace = qname.getNamespaceURI();
			java.lang.String attributePrefix = xmlWriter.getPrefix(attributeNamespace);
			if (attributePrefix == null) {
				attributePrefix = registerPrefix(xmlWriter, attributeNamespace);
			}
			java.lang.String attributeValue;
			if (attributePrefix.trim().length() > 0) {
				attributeValue = attributePrefix + ":" + qname.getLocalPart();
			} else {
				attributeValue = qname.getLocalPart();
			}

			if (namespace.equals("")) {
				xmlWriter.writeAttribute(attName, attributeValue);
			} else {
				registerPrefix(xmlWriter, namespace);
				xmlWriter.writeAttribute(namespace, attName, attributeValue);
			}
		}
		/**
		 *  method to handle Qnames
		 */

		private void writeQName(javax.xml.namespace.QName qname,
				javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException {
			java.lang.String namespaceURI = qname.getNamespaceURI();
			if (namespaceURI != null) {
				java.lang.String prefix = xmlWriter.getPrefix(namespaceURI);
				if (prefix == null) {
					prefix = generatePrefix(namespaceURI);
					xmlWriter.writeNamespace(prefix, namespaceURI);
					xmlWriter.setPrefix(prefix,namespaceURI);
				}

				if (prefix.trim().length() > 0){
					xmlWriter.writeCharacters(prefix + ":" + org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qname));
				} else {
					// i.e this is the default namespace
					xmlWriter.writeCharacters(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qname));
				}

			} else {
				xmlWriter.writeCharacters(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qname));
			}
		}

		private void writeQNames(javax.xml.namespace.QName[] qnames,
				javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException {

			if (qnames != null) {
				// we have to store this data until last moment since it is not possible to write any
				// namespace data after writing the charactor data
				java.lang.StringBuffer stringToWrite = new java.lang.StringBuffer();
				java.lang.String namespaceURI = null;
				java.lang.String prefix = null;

				for (int i = 0; i < qnames.length; i++) {
					if (i > 0) {
						stringToWrite.append(" ");
					}
					namespaceURI = qnames[i].getNamespaceURI();
					if (namespaceURI != null) {
						prefix = xmlWriter.getPrefix(namespaceURI);
						if ((prefix == null) || (prefix.length() == 0)) {
							prefix = generatePrefix(namespaceURI);
							xmlWriter.writeNamespace(prefix, namespaceURI);
							xmlWriter.setPrefix(prefix,namespaceURI);
						}

						if (prefix.trim().length() > 0){
							stringToWrite.append(prefix).append(":").append(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qnames[i]));
						} else {
							stringToWrite.append(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qnames[i]));
						}
					} else {
						stringToWrite.append(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qnames[i]));
					}
				}
				xmlWriter.writeCharacters(stringToWrite.toString());
			}

		}


		/**
		 * Register a namespace prefix
		 */
		private java.lang.String registerPrefix(javax.xml.stream.XMLStreamWriter xmlWriter, java.lang.String namespace) throws javax.xml.stream.XMLStreamException {
			java.lang.String prefix = xmlWriter.getPrefix(namespace);
			if (prefix == null) {
				prefix = generatePrefix(namespace);
				javax.xml.namespace.NamespaceContext nsContext = xmlWriter.getNamespaceContext();
				while (true) {
					java.lang.String uri = nsContext.getNamespaceURI(prefix);
					if (uri == null || uri.length() == 0) {
						break;
					}
					prefix = org.apache.axis2.databinding.utils.BeanUtil.getUniquePrefix();
				}
				xmlWriter.writeNamespace(prefix, namespace);
				xmlWriter.setPrefix(prefix, namespace);
			}
			return prefix;
		}



		/**
		 * databinding method to get an XML representation of this object
		 *
		 */
		public javax.xml.stream.XMLStreamReader getPullParser(javax.xml.namespace.QName qName)
				throws org.apache.axis2.databinding.ADBException{



			java.util.ArrayList elementList = new java.util.ArrayList();
			java.util.ArrayList attribList = new java.util.ArrayList();

			if (localRequestSecurityTokenTypeChoiceTracker){
				if (localRequestSecurityTokenTypeChoice!=null) {
					for (int i = 0;i < localRequestSecurityTokenTypeChoice.length;i++){

						if (localRequestSecurityTokenTypeChoice[i] != null){
							elementList.add(new javax.xml.namespace.QName("http://schemas.xmlsoap.org/ws/2005/02/trust",
									"RequestSecurityTokenTypeChoice"));
							elementList.add(localRequestSecurityTokenTypeChoice[i]);
						} else {

							// nothing to do

						}

					}
				} else {

					throw new org.apache.axis2.databinding.ADBException("RequestSecurityTokenTypeChoice cannot be null!!");

				}

			}
			attribList.add(
					new javax.xml.namespace.QName("","Context"));

			attribList.add(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(localContext));

			for (int i=0;i <localExtraAttributes.length;i++){
				attribList.add(org.apache.axis2.databinding.utils.Constants.OM_ATTRIBUTE_KEY);
				attribList.add(localExtraAttributes[i]);
			}


			return new org.apache.axis2.databinding.utils.reader.ADBXMLStreamReaderImpl(qName, elementList.toArray(), attribList.toArray());



		}



		/**
		 *  Factory class that keeps the parse method
		 */
		public static class Factory{




			/**
			 * static method to create the object
			 * Precondition:  If this object is an element, the current or next start element starts this object and any intervening reader events are ignorable
			 *                If this object is not an element, it is a complex type and the reader is at the event just after the outer start element
			 * Postcondition: If this object is an element, the reader is positioned at its end element
			 *                If this object is a complex type, the reader is positioned at the end element of its outer element
			 */
			public static RequestSecurityTokenType parse(javax.xml.stream.XMLStreamReader reader) throws java.lang.Exception{
				RequestSecurityTokenType object =
						new RequestSecurityTokenType();

				int event;
				java.lang.String nillableValue = null;
				java.lang.String prefix ="";
				java.lang.String namespaceuri ="";
				try {

					while (!reader.isStartElement() && !reader.isEndElement())
						reader.next();


					if (reader.getAttributeValue("http://www.w3.org/2001/XMLSchema-instance","type")!=null){
						java.lang.String fullTypeName = reader.getAttributeValue("http://www.w3.org/2001/XMLSchema-instance",
								"type");
						if (fullTypeName!=null){
							java.lang.String nsPrefix = null;
							if (fullTypeName.indexOf(":") > -1){
								nsPrefix = fullTypeName.substring(0,fullTypeName.indexOf(":"));
							}
							nsPrefix = nsPrefix==null?"":nsPrefix;

							java.lang.String type = fullTypeName.substring(fullTypeName.indexOf(":")+1);

							if (!"RequestSecurityTokenType".equals(type)){
								//find namespace for the prefix
								java.lang.String nsUri = reader.getNamespaceContext().getNamespaceURI(nsPrefix);
								return (RequestSecurityTokenType)ExtensionMapper.getTypeObject(
										nsUri,type,reader);
							}


						}


					}




					// Note all attributes that were handled. Used to differ normal attributes
					// from anyAttributes.
					java.util.Vector handledAttributes = new java.util.Vector();



					// handle attribute "Context"
					java.lang.String tempAttribContext =

							reader.getAttributeValue(null,"Context");

					if (tempAttribContext!=null){
						java.lang.String content = tempAttribContext;

						object.setContext(
								org.apache.axis2.databinding.utils.ConverterUtil.convertToAnyURI(tempAttribContext));

					} else {

					}
					handledAttributes.add("Context");

					// now run through all any or extra attributes
					// which were not reflected until now
					for (int i=0; i < reader.getAttributeCount(); i++) {
						if (!handledAttributes.contains(reader.getAttributeLocalName(i))) {
							// this is an anyAttribute and we create
							// an OMAttribute for this
							org.apache.axiom.om.OMFactory factory = org.apache.axiom.om.OMAbstractFactory.getOMFactory();
							org.apache.axiom.om.OMAttribute attr =
									factory.createOMAttribute(
											reader.getAttributeLocalName(i),
											factory.createOMNamespace(
													reader.getAttributeNamespace(i), reader.getAttributePrefix(i)),
													reader.getAttributeValue(i));

							// and add it to the extra attributes

							object.addExtraAttributes(attr);


						}
					}


					reader.next();

					java.util.ArrayList list1 = new java.util.ArrayList();


					while (!reader.isStartElement() && !reader.isEndElement()) reader.next();


					try{

						if (reader.isStartElement() ){



							// Process the array and step past its final element's end.
							list1.add(RequestSecurityTokenTypeChoice.Factory.parse(reader));
							//loop until we find a start element that is not part of this array
							boolean loopDone1 = false;
							while(!loopDone1){

								// Step to next element event.
								while (!reader.isStartElement() && !reader.isEndElement())
									reader.next();
								if (reader.isEndElement()){
									//two continuous end elements means we are exiting the xml structure
									loopDone1 = true;
								} else {
									list1.add(RequestSecurityTokenTypeChoice.Factory.parse(reader));
								}
							}
							// call the converter utility  to convert and set the array
							object.setRequestSecurityTokenTypeChoice((RequestSecurityTokenTypeChoice[])
									org.apache.axis2.databinding.utils.ConverterUtil.convertToArray(
											RequestSecurityTokenTypeChoice.class,
											list1));


						}  // End of if for expected property start element

						else {

						}


					} catch (java.lang.Exception e) {}

					while (!reader.isStartElement() && !reader.isEndElement())
						reader.next();

					if (reader.isStartElement())
						// A start element we are not expecting indicates a trailing invalid property
						throw new org.apache.axis2.databinding.ADBException("Unexpected subelement " + reader.getName());




				} catch (javax.xml.stream.XMLStreamException e) {
					throw new java.lang.Exception(e);
				}

				return object;
			}

		}//end of factory class



	}


	public static class RequestSecurityTokenResponseTypeChoice
	implements org.apache.axis2.databinding.ADBBean{
		/* This type was generated from the piece of schema that had
                name = RequestSecurityTokenResponseTypeChoice
                Namespace URI = http://schemas.xmlsoap.org/ws/2005/02/trust
                Namespace Prefix = ns1
		 */

		/** Whenever a new property is set ensure all others are unset
		 *  There can be only one choice and the last one wins
		 */
		private void clearAllSettingTrackers() {

			localExtraElementTracker = false;

		}


		/**
		 * field for ExtraElement
		 * This was an Array!
		 */


		protected org.apache.axiom.om.OMElement[] localExtraElement ;

		/*  This tracker boolean wil be used to detect whether the user called the set method
		 *   for this attribute. It will be used to determine whether to include this field
		 *   in the serialized XML
		 */
		protected boolean localExtraElementTracker = false ;

		public boolean isExtraElementSpecified(){
			return localExtraElementTracker;
		}



		/**
		 * Auto generated getter method
		 * @return org.apache.axiom.om.OMElement[]
		 */
		public  org.apache.axiom.om.OMElement[] getExtraElement(){
			return localExtraElement;
		}






		/**
		 * validate the array for ExtraElement
		 */
		protected void validateExtraElement(org.apache.axiom.om.OMElement[] param){

		}


		/**
		 * Auto generated setter method
		 * @param param ExtraElement
		 */
		public void setExtraElement(org.apache.axiom.om.OMElement[] param){

			validateExtraElement(param);


			clearAllSettingTrackers();
			localExtraElementTracker = param != null;

			this.localExtraElement=param;
		}



		/**
		 * Auto generated add method for the array for convenience
		 * @param param org.apache.axiom.om.OMElement
		 */
		public void addExtraElement(org.apache.axiom.om.OMElement param){
			if (localExtraElement == null){
				localExtraElement = new org.apache.axiom.om.OMElement[]{};
			}


			clearAllSettingTrackers();

			//update the setting tracker
			localExtraElementTracker = true;


			java.util.List list =
					org.apache.axis2.databinding.utils.ConverterUtil.toList(localExtraElement);
			list.add(param);
			this.localExtraElement =
					(org.apache.axiom.om.OMElement[])list.toArray(
							new org.apache.axiom.om.OMElement[list.size()]);

		}




		/**
		 *
		 * @param parentQName
		 * @param factory
		 * @return org.apache.axiom.om.OMElement
		 */
		public org.apache.axiom.om.OMElement getOMElement (
				final javax.xml.namespace.QName parentQName,
				final org.apache.axiom.om.OMFactory factory) throws org.apache.axis2.databinding.ADBException{



			org.apache.axiom.om.OMDataSource dataSource =
					new org.apache.axis2.databinding.ADBDataSource(this,parentQName);
			return factory.createOMElement(dataSource,parentQName);

		}

		public void serialize(final javax.xml.namespace.QName parentQName,
				javax.xml.stream.XMLStreamWriter xmlWriter)
						throws javax.xml.stream.XMLStreamException, org.apache.axis2.databinding.ADBException{
			serialize(parentQName,xmlWriter,false);
		}

		public void serialize(final javax.xml.namespace.QName parentQName,
				javax.xml.stream.XMLStreamWriter xmlWriter,
				boolean serializeType)
						throws javax.xml.stream.XMLStreamException, org.apache.axis2.databinding.ADBException{




			java.lang.String prefix = null;
			java.lang.String namespace = null;

			if (serializeType){


				java.lang.String namespacePrefix = registerPrefix(xmlWriter,"http://schemas.xmlsoap.org/ws/2005/02/trust");
				if ((namespacePrefix != null) && (namespacePrefix.trim().length() > 0)){
					writeAttribute("xsi","http://www.w3.org/2001/XMLSchema-instance","type",
							namespacePrefix+":RequestSecurityTokenResponseTypeChoice",
							xmlWriter);
				} else {
					writeAttribute("xsi","http://www.w3.org/2001/XMLSchema-instance","type",
							"RequestSecurityTokenResponseTypeChoice",
							xmlWriter);
				}


			}
			if (localExtraElementTracker){

				if (localExtraElement != null){
					for (int i = 0;i < localExtraElement.length;i++){
						if (localExtraElement[i] != null){
							localExtraElement[i].serialize(xmlWriter);
						} else {

							// we have to do nothing since minOccures zero

						}
					}
				} else {
					throw new org.apache.axis2.databinding.ADBException("extraElement cannot be null!!");
				}
			}

		}

		private static java.lang.String generatePrefix(java.lang.String namespace) {
			if(namespace.equals("http://schemas.xmlsoap.org/ws/2005/02/trust")){
				return "ns1";
			}
			return org.apache.axis2.databinding.utils.BeanUtil.getUniquePrefix();
		}

		/**
		 * Utility method to write an element start tag.
		 */
		private void writeStartElement(java.lang.String prefix, java.lang.String namespace, java.lang.String localPart,
				javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException {
			java.lang.String writerPrefix = xmlWriter.getPrefix(namespace);
			if (writerPrefix != null) {
				xmlWriter.writeStartElement(namespace, localPart);
			} else {
				if (namespace.length() == 0) {
					prefix = "";
				} else if (prefix == null) {
					prefix = generatePrefix(namespace);
				}

				xmlWriter.writeStartElement(prefix, localPart, namespace);
				xmlWriter.writeNamespace(prefix, namespace);
				xmlWriter.setPrefix(prefix, namespace);
			}
		}

		/**
		 * Util method to write an attribute with the ns prefix
		 */
		private void writeAttribute(java.lang.String prefix,java.lang.String namespace,java.lang.String attName,
				java.lang.String attValue,javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException{
			if (xmlWriter.getPrefix(namespace) == null) {
				xmlWriter.writeNamespace(prefix, namespace);
				xmlWriter.setPrefix(prefix, namespace);
			}
			xmlWriter.writeAttribute(namespace,attName,attValue);
		}

		/**
		 * Util method to write an attribute without the ns prefix
		 */
		private void writeAttribute(java.lang.String namespace,java.lang.String attName,
				java.lang.String attValue,javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException{
			if (namespace.equals("")) {
				xmlWriter.writeAttribute(attName,attValue);
			} else {
				registerPrefix(xmlWriter, namespace);
				xmlWriter.writeAttribute(namespace,attName,attValue);
			}
		}


		/**
		 * Util method to write an attribute without the ns prefix
		 */
		private void writeQNameAttribute(java.lang.String namespace, java.lang.String attName,
				javax.xml.namespace.QName qname, javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException {

			java.lang.String attributeNamespace = qname.getNamespaceURI();
			java.lang.String attributePrefix = xmlWriter.getPrefix(attributeNamespace);
			if (attributePrefix == null) {
				attributePrefix = registerPrefix(xmlWriter, attributeNamespace);
			}
			java.lang.String attributeValue;
			if (attributePrefix.trim().length() > 0) {
				attributeValue = attributePrefix + ":" + qname.getLocalPart();
			} else {
				attributeValue = qname.getLocalPart();
			}

			if (namespace.equals("")) {
				xmlWriter.writeAttribute(attName, attributeValue);
			} else {
				registerPrefix(xmlWriter, namespace);
				xmlWriter.writeAttribute(namespace, attName, attributeValue);
			}
		}
		/**
		 *  method to handle Qnames
		 */

		private void writeQName(javax.xml.namespace.QName qname,
				javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException {
			java.lang.String namespaceURI = qname.getNamespaceURI();
			if (namespaceURI != null) {
				java.lang.String prefix = xmlWriter.getPrefix(namespaceURI);
				if (prefix == null) {
					prefix = generatePrefix(namespaceURI);
					xmlWriter.writeNamespace(prefix, namespaceURI);
					xmlWriter.setPrefix(prefix,namespaceURI);
				}

				if (prefix.trim().length() > 0){
					xmlWriter.writeCharacters(prefix + ":" + org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qname));
				} else {
					// i.e this is the default namespace
					xmlWriter.writeCharacters(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qname));
				}

			} else {
				xmlWriter.writeCharacters(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qname));
			}
		}

		private void writeQNames(javax.xml.namespace.QName[] qnames,
				javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException {

			if (qnames != null) {
				// we have to store this data until last moment since it is not possible to write any
				// namespace data after writing the charactor data
				java.lang.StringBuffer stringToWrite = new java.lang.StringBuffer();
				java.lang.String namespaceURI = null;
				java.lang.String prefix = null;

				for (int i = 0; i < qnames.length; i++) {
					if (i > 0) {
						stringToWrite.append(" ");
					}
					namespaceURI = qnames[i].getNamespaceURI();
					if (namespaceURI != null) {
						prefix = xmlWriter.getPrefix(namespaceURI);
						if ((prefix == null) || (prefix.length() == 0)) {
							prefix = generatePrefix(namespaceURI);
							xmlWriter.writeNamespace(prefix, namespaceURI);
							xmlWriter.setPrefix(prefix,namespaceURI);
						}

						if (prefix.trim().length() > 0){
							stringToWrite.append(prefix).append(":").append(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qnames[i]));
						} else {
							stringToWrite.append(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qnames[i]));
						}
					} else {
						stringToWrite.append(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qnames[i]));
					}
				}
				xmlWriter.writeCharacters(stringToWrite.toString());
			}

		}


		/**
		 * Register a namespace prefix
		 */
		private java.lang.String registerPrefix(javax.xml.stream.XMLStreamWriter xmlWriter, java.lang.String namespace) throws javax.xml.stream.XMLStreamException {
			java.lang.String prefix = xmlWriter.getPrefix(namespace);
			if (prefix == null) {
				prefix = generatePrefix(namespace);
				javax.xml.namespace.NamespaceContext nsContext = xmlWriter.getNamespaceContext();
				while (true) {
					java.lang.String uri = nsContext.getNamespaceURI(prefix);
					if (uri == null || uri.length() == 0) {
						break;
					}
					prefix = org.apache.axis2.databinding.utils.BeanUtil.getUniquePrefix();
				}
				xmlWriter.writeNamespace(prefix, namespace);
				xmlWriter.setPrefix(prefix, namespace);
			}
			return prefix;
		}



		/**
		 * databinding method to get an XML representation of this object
		 *
		 */
		public javax.xml.stream.XMLStreamReader getPullParser(javax.xml.namespace.QName qName)
				throws org.apache.axis2.databinding.ADBException{



			java.util.ArrayList elementList = new java.util.ArrayList();
			java.util.ArrayList attribList = new java.util.ArrayList();

			if (localExtraElementTracker){
				if (localExtraElement != null) {
					for (int i = 0;i < localExtraElement.length;i++){
						if (localExtraElement[i] != null){
							elementList.add(new javax.xml.namespace.QName("",
									"extraElement"));
							elementList.add(
									org.apache.axis2.databinding.utils.ConverterUtil.convertToString(localExtraElement[i]));
						} else {

							// have to do nothing

						}

					}
				} else {
					throw new org.apache.axis2.databinding.ADBException("extraElement cannot be null!!");
				}
			}

			return new org.apache.axis2.databinding.utils.reader.ADBXMLStreamReaderImpl(qName, elementList.toArray(), attribList.toArray());



		}



		/**
		 *  Factory class that keeps the parse method
		 */
		public static class Factory{




			/**
			 * static method to create the object
			 * Precondition:  If this object is an element, the current or next start element starts this object and any intervening reader events are ignorable
			 *                If this object is not an element, it is a complex type and the reader is at the event just after the outer start element
			 * Postcondition: If this object is an element, the reader is positioned at its end element
			 *                If this object is a complex type, the reader is positioned at the end element of its outer element
			 */
			public static RequestSecurityTokenResponseTypeChoice parse(javax.xml.stream.XMLStreamReader reader) throws java.lang.Exception{
				RequestSecurityTokenResponseTypeChoice object =
						new RequestSecurityTokenResponseTypeChoice();

				int event;
				java.lang.String nillableValue = null;
				java.lang.String prefix ="";
				java.lang.String namespaceuri ="";
				try {

					while (!reader.isStartElement() && !reader.isEndElement())
						reader.next();




					// Note all attributes that were handled. Used to differ normal attributes
					// from anyAttributes.
					java.util.Vector handledAttributes = new java.util.Vector();



					java.util.ArrayList list1 = new java.util.ArrayList();

					if (reader.isStartElement()){



						// Process the array and step past its final element's end.

						boolean loopDone1=false;

						while (!loopDone1){
							event = reader.getEventType();
							if (javax.xml.stream.XMLStreamConstants.START_ELEMENT == event){

								// We need to wrap the reader so that it produces a fake START_DOCUEMENT event
								org.apache.axis2.databinding.utils.NamedStaxOMBuilder builder1
								= new org.apache.axis2.databinding.utils.NamedStaxOMBuilder(
										new org.apache.axis2.util.StreamWrapper(reader), reader.getName());

								list1.add(builder1.getOMElement());
								reader.next();
								if (reader.isEndElement()) {
									// we have two countinuos end elements
									loopDone1 = true;
								}

							}else if (javax.xml.stream.XMLStreamConstants.END_ELEMENT == event){
								loopDone1 = true;
							}else{
								reader.next();
							}

						}


						object.setExtraElement((org.apache.axiom.om.OMElement[])
								org.apache.axis2.databinding.utils.ConverterUtil.convertToArray(
										org.apache.axiom.om.OMElement.class,list1));

					}  // End of if for expected property start element




				} catch (javax.xml.stream.XMLStreamException e) {
					throw new java.lang.Exception(e);
				}

				return object;
			}

		}//end of factory class



	}


	public static class RequestSecurityTokenResponseE
	implements org.apache.axis2.databinding.ADBBean{

		public static final javax.xml.namespace.QName MY_QNAME = new javax.xml.namespace.QName(
				"http://docs.oasis-open.org/ws-sx/ws-trust/200512",
				"RequestSecurityTokenResponse",
				"ns2");



		/**
		 * field for RequestSecurityTokenResponse
		 */


		protected RequestSecurityTokenResponseTypeE localRequestSecurityTokenResponse ;


		/**
		 * Auto generated getter method
		 * @return RequestSecurityTokenResponseTypeE
		 */
		public  RequestSecurityTokenResponseTypeE getRequestSecurityTokenResponse(){
			return localRequestSecurityTokenResponse;
		}



		/**
		 * Auto generated setter method
		 * @param param RequestSecurityTokenResponse
		 */
		public void setRequestSecurityTokenResponse(RequestSecurityTokenResponseTypeE param){

			this.localRequestSecurityTokenResponse=param;


		}




		/**
		 *
		 * @param parentQName
		 * @param factory
		 * @return org.apache.axiom.om.OMElement
		 */
		public org.apache.axiom.om.OMElement getOMElement (
				final javax.xml.namespace.QName parentQName,
				final org.apache.axiom.om.OMFactory factory) throws org.apache.axis2.databinding.ADBException{



			org.apache.axiom.om.OMDataSource dataSource =
					new org.apache.axis2.databinding.ADBDataSource(this,MY_QNAME);
			return factory.createOMElement(dataSource,MY_QNAME);

		}

		public void serialize(final javax.xml.namespace.QName parentQName,
				javax.xml.stream.XMLStreamWriter xmlWriter)
						throws javax.xml.stream.XMLStreamException, org.apache.axis2.databinding.ADBException{
			serialize(parentQName,xmlWriter,false);
		}

		public void serialize(final javax.xml.namespace.QName parentQName,
				javax.xml.stream.XMLStreamWriter xmlWriter,
				boolean serializeType)
						throws javax.xml.stream.XMLStreamException, org.apache.axis2.databinding.ADBException{


			//We can safely assume an element has only one type associated with it

			if (localRequestSecurityTokenResponse==null){
				throw new org.apache.axis2.databinding.ADBException("RequestSecurityTokenResponse cannot be null!");
			}
			localRequestSecurityTokenResponse.serialize(MY_QNAME,xmlWriter);


		}

		private static java.lang.String generatePrefix(java.lang.String namespace) {
			if(namespace.equals("http://docs.oasis-open.org/ws-sx/ws-trust/200512")){
				return "ns2";
			}
			return org.apache.axis2.databinding.utils.BeanUtil.getUniquePrefix();
		}

		/**
		 * Utility method to write an element start tag.
		 */
		private void writeStartElement(java.lang.String prefix, java.lang.String namespace, java.lang.String localPart,
				javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException {
			java.lang.String writerPrefix = xmlWriter.getPrefix(namespace);
			if (writerPrefix != null) {
				xmlWriter.writeStartElement(namespace, localPart);
			} else {
				if (namespace.length() == 0) {
					prefix = "";
				} else if (prefix == null) {
					prefix = generatePrefix(namespace);
				}

				xmlWriter.writeStartElement(prefix, localPart, namespace);
				xmlWriter.writeNamespace(prefix, namespace);
				xmlWriter.setPrefix(prefix, namespace);
			}
		}

		/**
		 * Util method to write an attribute with the ns prefix
		 */
		private void writeAttribute(java.lang.String prefix,java.lang.String namespace,java.lang.String attName,
				java.lang.String attValue,javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException{
			if (xmlWriter.getPrefix(namespace) == null) {
				xmlWriter.writeNamespace(prefix, namespace);
				xmlWriter.setPrefix(prefix, namespace);
			}
			xmlWriter.writeAttribute(namespace,attName,attValue);
		}

		/**
		 * Util method to write an attribute without the ns prefix
		 */
		private void writeAttribute(java.lang.String namespace,java.lang.String attName,
				java.lang.String attValue,javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException{
			if (namespace.equals("")) {
				xmlWriter.writeAttribute(attName,attValue);
			} else {
				registerPrefix(xmlWriter, namespace);
				xmlWriter.writeAttribute(namespace,attName,attValue);
			}
		}


		/**
		 * Util method to write an attribute without the ns prefix
		 */
		private void writeQNameAttribute(java.lang.String namespace, java.lang.String attName,
				javax.xml.namespace.QName qname, javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException {

			java.lang.String attributeNamespace = qname.getNamespaceURI();
			java.lang.String attributePrefix = xmlWriter.getPrefix(attributeNamespace);
			if (attributePrefix == null) {
				attributePrefix = registerPrefix(xmlWriter, attributeNamespace);
			}
			java.lang.String attributeValue;
			if (attributePrefix.trim().length() > 0) {
				attributeValue = attributePrefix + ":" + qname.getLocalPart();
			} else {
				attributeValue = qname.getLocalPart();
			}

			if (namespace.equals("")) {
				xmlWriter.writeAttribute(attName, attributeValue);
			} else {
				registerPrefix(xmlWriter, namespace);
				xmlWriter.writeAttribute(namespace, attName, attributeValue);
			}
		}
		/**
		 *  method to handle Qnames
		 */

		private void writeQName(javax.xml.namespace.QName qname,
				javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException {
			java.lang.String namespaceURI = qname.getNamespaceURI();
			if (namespaceURI != null) {
				java.lang.String prefix = xmlWriter.getPrefix(namespaceURI);
				if (prefix == null) {
					prefix = generatePrefix(namespaceURI);
					xmlWriter.writeNamespace(prefix, namespaceURI);
					xmlWriter.setPrefix(prefix,namespaceURI);
				}

				if (prefix.trim().length() > 0){
					xmlWriter.writeCharacters(prefix + ":" + org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qname));
				} else {
					// i.e this is the default namespace
					xmlWriter.writeCharacters(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qname));
				}

			} else {
				xmlWriter.writeCharacters(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qname));
			}
		}

		private void writeQNames(javax.xml.namespace.QName[] qnames,
				javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException {

			if (qnames != null) {
				// we have to store this data until last moment since it is not possible to write any
				// namespace data after writing the charactor data
				java.lang.StringBuffer stringToWrite = new java.lang.StringBuffer();
				java.lang.String namespaceURI = null;
				java.lang.String prefix = null;

				for (int i = 0; i < qnames.length; i++) {
					if (i > 0) {
						stringToWrite.append(" ");
					}
					namespaceURI = qnames[i].getNamespaceURI();
					if (namespaceURI != null) {
						prefix = xmlWriter.getPrefix(namespaceURI);
						if ((prefix == null) || (prefix.length() == 0)) {
							prefix = generatePrefix(namespaceURI);
							xmlWriter.writeNamespace(prefix, namespaceURI);
							xmlWriter.setPrefix(prefix,namespaceURI);
						}

						if (prefix.trim().length() > 0){
							stringToWrite.append(prefix).append(":").append(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qnames[i]));
						} else {
							stringToWrite.append(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qnames[i]));
						}
					} else {
						stringToWrite.append(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qnames[i]));
					}
				}
				xmlWriter.writeCharacters(stringToWrite.toString());
			}

		}


		/**
		 * Register a namespace prefix
		 */
		private java.lang.String registerPrefix(javax.xml.stream.XMLStreamWriter xmlWriter, java.lang.String namespace) throws javax.xml.stream.XMLStreamException {
			java.lang.String prefix = xmlWriter.getPrefix(namespace);
			if (prefix == null) {
				prefix = generatePrefix(namespace);
				javax.xml.namespace.NamespaceContext nsContext = xmlWriter.getNamespaceContext();
				while (true) {
					java.lang.String uri = nsContext.getNamespaceURI(prefix);
					if (uri == null || uri.length() == 0) {
						break;
					}
					prefix = org.apache.axis2.databinding.utils.BeanUtil.getUniquePrefix();
				}
				xmlWriter.writeNamespace(prefix, namespace);
				xmlWriter.setPrefix(prefix, namespace);
			}
			return prefix;
		}



		/**
		 * databinding method to get an XML representation of this object
		 *
		 */
		public javax.xml.stream.XMLStreamReader getPullParser(javax.xml.namespace.QName qName)
				throws org.apache.axis2.databinding.ADBException{




			//We can safely assume an element has only one type associated with it
			return localRequestSecurityTokenResponse.getPullParser(MY_QNAME);

		}



		/**
		 *  Factory class that keeps the parse method
		 */
		public static class Factory{




			/**
			 * static method to create the object
			 * Precondition:  If this object is an element, the current or next start element starts this object and any intervening reader events are ignorable
			 *                If this object is not an element, it is a complex type and the reader is at the event just after the outer start element
			 * Postcondition: If this object is an element, the reader is positioned at its end element
			 *                If this object is a complex type, the reader is positioned at the end element of its outer element
			 */
			public static RequestSecurityTokenResponseE parse(javax.xml.stream.XMLStreamReader reader) throws java.lang.Exception{
				RequestSecurityTokenResponseE object =
						new RequestSecurityTokenResponseE();

				int event;
				java.lang.String nillableValue = null;
				java.lang.String prefix ="";
				java.lang.String namespaceuri ="";
				try {

					while (!reader.isStartElement() && !reader.isEndElement())
						reader.next();




					// Note all attributes that were handled. Used to differ normal attributes
					// from anyAttributes.
					java.util.Vector handledAttributes = new java.util.Vector();



					while(!reader.isEndElement()) {
						if (reader.isStartElement() ){

							if (reader.isStartElement() && new javax.xml.namespace.QName("http://docs.oasis-open.org/ws-sx/ws-trust/200512","RequestSecurityTokenResponse").equals(reader.getName())){

								object.setRequestSecurityTokenResponse(RequestSecurityTokenResponseTypeE.Factory.parse(reader));

							}  // End of if for expected property start element

							else{
								// A start element we are not expecting indicates an invalid parameter was passed
								throw new org.apache.axis2.databinding.ADBException("Unexpected subelement " + reader.getName());
							}

						} else {
							reader.next();
						}  
					}  // end of while loop




				} catch (javax.xml.stream.XMLStreamException e) {
					throw new java.lang.Exception(e);
				}

				return object;
			}

		}//end of factory class



	}


	public static class RequestSecurityTokenTypeChoiceE
	implements org.apache.axis2.databinding.ADBBean{
		/* This type was generated from the piece of schema that had
                name = RequestSecurityTokenTypeChoice
                Namespace URI = http://docs.oasis-open.org/ws-sx/ws-trust/200512
                Namespace Prefix = ns2
		 */

		/** Whenever a new property is set ensure all others are unset
		 *  There can be only one choice and the last one wins
		 */
		private void clearAllSettingTrackers() {

			localExtraElementTracker = false;

		}


		/**
		 * field for ExtraElement
		 * This was an Array!
		 */


		protected org.apache.axiom.om.OMElement[] localExtraElement ;

		/*  This tracker boolean wil be used to detect whether the user called the set method
		 *   for this attribute. It will be used to determine whether to include this field
		 *   in the serialized XML
		 */
		protected boolean localExtraElementTracker = false ;

		public boolean isExtraElementSpecified(){
			return localExtraElementTracker;
		}



		/**
		 * Auto generated getter method
		 * @return org.apache.axiom.om.OMElement[]
		 */
		public  org.apache.axiom.om.OMElement[] getExtraElement(){
			return localExtraElement;
		}






		/**
		 * validate the array for ExtraElement
		 */
		protected void validateExtraElement(org.apache.axiom.om.OMElement[] param){

		}


		/**
		 * Auto generated setter method
		 * @param param ExtraElement
		 */
		public void setExtraElement(org.apache.axiom.om.OMElement[] param){

			validateExtraElement(param);


			clearAllSettingTrackers();
			localExtraElementTracker = param != null;

			this.localExtraElement=param;
		}



		/**
		 * Auto generated add method for the array for convenience
		 * @param param org.apache.axiom.om.OMElement
		 */
		public void addExtraElement(org.apache.axiom.om.OMElement param){
			if (localExtraElement == null){
				localExtraElement = new org.apache.axiom.om.OMElement[]{};
			}


			clearAllSettingTrackers();

			//update the setting tracker
			localExtraElementTracker = true;


			java.util.List list =
					org.apache.axis2.databinding.utils.ConverterUtil.toList(localExtraElement);
			list.add(param);
			this.localExtraElement =
					(org.apache.axiom.om.OMElement[])list.toArray(
							new org.apache.axiom.om.OMElement[list.size()]);

		}




		/**
		 *
		 * @param parentQName
		 * @param factory
		 * @return org.apache.axiom.om.OMElement
		 */
		public org.apache.axiom.om.OMElement getOMElement (
				final javax.xml.namespace.QName parentQName,
				final org.apache.axiom.om.OMFactory factory) throws org.apache.axis2.databinding.ADBException{



			org.apache.axiom.om.OMDataSource dataSource =
					new org.apache.axis2.databinding.ADBDataSource(this,parentQName);
			return factory.createOMElement(dataSource,parentQName);

		}

		public void serialize(final javax.xml.namespace.QName parentQName,
				javax.xml.stream.XMLStreamWriter xmlWriter)
						throws javax.xml.stream.XMLStreamException, org.apache.axis2.databinding.ADBException{
			serialize(parentQName,xmlWriter,false);
		}

		public void serialize(final javax.xml.namespace.QName parentQName,
				javax.xml.stream.XMLStreamWriter xmlWriter,
				boolean serializeType)
						throws javax.xml.stream.XMLStreamException, org.apache.axis2.databinding.ADBException{




			java.lang.String prefix = null;
			java.lang.String namespace = null;

			if (serializeType){


				java.lang.String namespacePrefix = registerPrefix(xmlWriter,"http://docs.oasis-open.org/ws-sx/ws-trust/200512");
				if ((namespacePrefix != null) && (namespacePrefix.trim().length() > 0)){
					writeAttribute("xsi","http://www.w3.org/2001/XMLSchema-instance","type",
							namespacePrefix+":RequestSecurityTokenTypeChoice",
							xmlWriter);
				} else {
					writeAttribute("xsi","http://www.w3.org/2001/XMLSchema-instance","type",
							"RequestSecurityTokenTypeChoice",
							xmlWriter);
				}


			}
			if (localExtraElementTracker){

				if (localExtraElement != null){
					for (int i = 0;i < localExtraElement.length;i++){
						if (localExtraElement[i] != null){
							localExtraElement[i].serialize(xmlWriter);
						} else {

							// we have to do nothing since minOccures zero

						}
					}
				} else {
					throw new org.apache.axis2.databinding.ADBException("extraElement cannot be null!!");
				}
			}

		}

		private static java.lang.String generatePrefix(java.lang.String namespace) {
			if(namespace.equals("http://docs.oasis-open.org/ws-sx/ws-trust/200512")){
				return "ns2";
			}
			return org.apache.axis2.databinding.utils.BeanUtil.getUniquePrefix();
		}

		/**
		 * Utility method to write an element start tag.
		 */
		private void writeStartElement(java.lang.String prefix, java.lang.String namespace, java.lang.String localPart,
				javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException {
			java.lang.String writerPrefix = xmlWriter.getPrefix(namespace);
			if (writerPrefix != null) {
				xmlWriter.writeStartElement(namespace, localPart);
			} else {
				if (namespace.length() == 0) {
					prefix = "";
				} else if (prefix == null) {
					prefix = generatePrefix(namespace);
				}

				xmlWriter.writeStartElement(prefix, localPart, namespace);
				xmlWriter.writeNamespace(prefix, namespace);
				xmlWriter.setPrefix(prefix, namespace);
			}
		}

		/**
		 * Util method to write an attribute with the ns prefix
		 */
		private void writeAttribute(java.lang.String prefix,java.lang.String namespace,java.lang.String attName,
				java.lang.String attValue,javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException{
			if (xmlWriter.getPrefix(namespace) == null) {
				xmlWriter.writeNamespace(prefix, namespace);
				xmlWriter.setPrefix(prefix, namespace);
			}
			xmlWriter.writeAttribute(namespace,attName,attValue);
		}

		/**
		 * Util method to write an attribute without the ns prefix
		 */
		private void writeAttribute(java.lang.String namespace,java.lang.String attName,
				java.lang.String attValue,javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException{
			if (namespace.equals("")) {
				xmlWriter.writeAttribute(attName,attValue);
			} else {
				registerPrefix(xmlWriter, namespace);
				xmlWriter.writeAttribute(namespace,attName,attValue);
			}
		}


		/**
		 * Util method to write an attribute without the ns prefix
		 */
		private void writeQNameAttribute(java.lang.String namespace, java.lang.String attName,
				javax.xml.namespace.QName qname, javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException {

			java.lang.String attributeNamespace = qname.getNamespaceURI();
			java.lang.String attributePrefix = xmlWriter.getPrefix(attributeNamespace);
			if (attributePrefix == null) {
				attributePrefix = registerPrefix(xmlWriter, attributeNamespace);
			}
			java.lang.String attributeValue;
			if (attributePrefix.trim().length() > 0) {
				attributeValue = attributePrefix + ":" + qname.getLocalPart();
			} else {
				attributeValue = qname.getLocalPart();
			}

			if (namespace.equals("")) {
				xmlWriter.writeAttribute(attName, attributeValue);
			} else {
				registerPrefix(xmlWriter, namespace);
				xmlWriter.writeAttribute(namespace, attName, attributeValue);
			}
		}
		/**
		 *  method to handle Qnames
		 */

		private void writeQName(javax.xml.namespace.QName qname,
				javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException {
			java.lang.String namespaceURI = qname.getNamespaceURI();
			if (namespaceURI != null) {
				java.lang.String prefix = xmlWriter.getPrefix(namespaceURI);
				if (prefix == null) {
					prefix = generatePrefix(namespaceURI);
					xmlWriter.writeNamespace(prefix, namespaceURI);
					xmlWriter.setPrefix(prefix,namespaceURI);
				}

				if (prefix.trim().length() > 0){
					xmlWriter.writeCharacters(prefix + ":" + org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qname));
				} else {
					// i.e this is the default namespace
					xmlWriter.writeCharacters(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qname));
				}

			} else {
				xmlWriter.writeCharacters(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qname));
			}
		}

		private void writeQNames(javax.xml.namespace.QName[] qnames,
				javax.xml.stream.XMLStreamWriter xmlWriter) throws javax.xml.stream.XMLStreamException {

			if (qnames != null) {
				// we have to store this data until last moment since it is not possible to write any
				// namespace data after writing the charactor data
				java.lang.StringBuffer stringToWrite = new java.lang.StringBuffer();
				java.lang.String namespaceURI = null;
				java.lang.String prefix = null;

				for (int i = 0; i < qnames.length; i++) {
					if (i > 0) {
						stringToWrite.append(" ");
					}
					namespaceURI = qnames[i].getNamespaceURI();
					if (namespaceURI != null) {
						prefix = xmlWriter.getPrefix(namespaceURI);
						if ((prefix == null) || (prefix.length() == 0)) {
							prefix = generatePrefix(namespaceURI);
							xmlWriter.writeNamespace(prefix, namespaceURI);
							xmlWriter.setPrefix(prefix,namespaceURI);
						}

						if (prefix.trim().length() > 0){
							stringToWrite.append(prefix).append(":").append(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qnames[i]));
						} else {
							stringToWrite.append(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qnames[i]));
						}
					} else {
						stringToWrite.append(org.apache.axis2.databinding.utils.ConverterUtil.convertToString(qnames[i]));
					}
				}
				xmlWriter.writeCharacters(stringToWrite.toString());
			}

		}


		/**
		 * Register a namespace prefix
		 */
		private java.lang.String registerPrefix(javax.xml.stream.XMLStreamWriter xmlWriter, java.lang.String namespace) throws javax.xml.stream.XMLStreamException {
			java.lang.String prefix = xmlWriter.getPrefix(namespace);
			if (prefix == null) {
				prefix = generatePrefix(namespace);
				javax.xml.namespace.NamespaceContext nsContext = xmlWriter.getNamespaceContext();
				while (true) {
					java.lang.String uri = nsContext.getNamespaceURI(prefix);
					if (uri == null || uri.length() == 0) {
						break;
					}
					prefix = org.apache.axis2.databinding.utils.BeanUtil.getUniquePrefix();
				}
				xmlWriter.writeNamespace(prefix, namespace);
				xmlWriter.setPrefix(prefix, namespace);
			}
			return prefix;
		}



		/**
		 * databinding method to get an XML representation of this object
		 *
		 */
		public javax.xml.stream.XMLStreamReader getPullParser(javax.xml.namespace.QName qName)
				throws org.apache.axis2.databinding.ADBException{



			java.util.ArrayList elementList = new java.util.ArrayList();
			java.util.ArrayList attribList = new java.util.ArrayList();

			if (localExtraElementTracker){
				if (localExtraElement != null) {
					for (int i = 0;i < localExtraElement.length;i++){
						if (localExtraElement[i] != null){
							elementList.add(new javax.xml.namespace.QName("",
									"extraElement"));
							elementList.add(
									org.apache.axis2.databinding.utils.ConverterUtil.convertToString(localExtraElement[i]));
						} else {

							// have to do nothing

						}

					}
				} else {
					throw new org.apache.axis2.databinding.ADBException("extraElement cannot be null!!");
				}
			}

			return new org.apache.axis2.databinding.utils.reader.ADBXMLStreamReaderImpl(qName, elementList.toArray(), attribList.toArray());



		}



		/**
		 *  Factory class that keeps the parse method
		 */
		public static class Factory{




			/**
			 * static method to create the object
			 * Precondition:  If this object is an element, the current or next start element starts this object and any intervening reader events are ignorable
			 *                If this object is not an element, it is a complex type and the reader is at the event just after the outer start element
			 * Postcondition: If this object is an element, the reader is positioned at its end element
			 *                If this object is a complex type, the reader is positioned at the end element of its outer element
			 */
			public static RequestSecurityTokenTypeChoiceE parse(javax.xml.stream.XMLStreamReader reader) throws java.lang.Exception{
				RequestSecurityTokenTypeChoiceE object =
						new RequestSecurityTokenTypeChoiceE();

				int event;
				java.lang.String nillableValue = null;
				java.lang.String prefix ="";
				java.lang.String namespaceuri ="";
				try {

					while (!reader.isStartElement() && !reader.isEndElement())
						reader.next();




					// Note all attributes that were handled. Used to differ normal attributes
					// from anyAttributes.
					java.util.Vector handledAttributes = new java.util.Vector();



					java.util.ArrayList list1 = new java.util.ArrayList();

					if (reader.isStartElement()){



						// Process the array and step past its final element's end.

						boolean loopDone1=false;

						while (!loopDone1){
							event = reader.getEventType();
							if (javax.xml.stream.XMLStreamConstants.START_ELEMENT == event){

								// We need to wrap the reader so that it produces a fake START_DOCUEMENT event
								org.apache.axis2.databinding.utils.NamedStaxOMBuilder builder1
								= new org.apache.axis2.databinding.utils.NamedStaxOMBuilder(
										new org.apache.axis2.util.StreamWrapper(reader), reader.getName());

								list1.add(builder1.getOMElement());
								reader.next();
								if (reader.isEndElement()) {
									// we have two countinuos end elements
									loopDone1 = true;
								}

							}else if (javax.xml.stream.XMLStreamConstants.END_ELEMENT == event){
								loopDone1 = true;
							}else{
								reader.next();
							}

						}


						object.setExtraElement((org.apache.axiom.om.OMElement[])
								org.apache.axis2.databinding.utils.ConverterUtil.convertToArray(
										org.apache.axiom.om.OMElement.class,list1));

					}  // End of if for expected property start element




				} catch (javax.xml.stream.XMLStreamException e) {
					throw new java.lang.Exception(e);
				}

				return object;
			}

		}//end of factory class



	}


	private  org.apache.axiom.om.OMElement  toOM(com.upwork.axis2_client.SecurityTokenServiceStub.RequestSecurityToken param, boolean optimizeContent)
			throws org.apache.axis2.AxisFault {


		try{
			return param.getOMElement(com.upwork.axis2_client.SecurityTokenServiceStub.RequestSecurityToken.MY_QNAME,
					org.apache.axiom.om.OMAbstractFactory.getOMFactory());
		} catch(org.apache.axis2.databinding.ADBException e){
			throw org.apache.axis2.AxisFault.makeFault(e);
		}


	}

	private  org.apache.axiom.om.OMElement  toOM(com.upwork.axis2_client.SecurityTokenServiceStub.RequestSecurityTokenResponse param, boolean optimizeContent)
			throws org.apache.axis2.AxisFault {


		try{
			return param.getOMElement(com.upwork.axis2_client.SecurityTokenServiceStub.RequestSecurityTokenResponse.MY_QNAME,
					org.apache.axiom.om.OMAbstractFactory.getOMFactory());
		} catch(org.apache.axis2.databinding.ADBException e){
			throw org.apache.axis2.AxisFault.makeFault(e);
		}


	}


	private  org.apache.axiom.soap.SOAPEnvelope toEnvelope(org.apache.axiom.soap.SOAPFactory factory, com.upwork.axis2_client.SecurityTokenServiceStub.RequestSecurityToken param, boolean optimizeContent, javax.xml.namespace.QName methodQName)
			throws org.apache.axis2.AxisFault{


		try{

			org.apache.axiom.soap.SOAPEnvelope emptyEnvelope = factory.getDefaultEnvelope();
			emptyEnvelope.getBody().addChild(param.getOMElement(com.upwork.axis2_client.SecurityTokenServiceStub.RequestSecurityToken.MY_QNAME,factory));
			return emptyEnvelope;
		} catch(org.apache.axis2.databinding.ADBException e){
			throw org.apache.axis2.AxisFault.makeFault(e);
		}


	}


	/* methods to provide back word compatibility */




	/**
	 *  get the default envelope
	 */
	 private org.apache.axiom.soap.SOAPEnvelope toEnvelope(org.apache.axiom.soap.SOAPFactory factory){
		return factory.getDefaultEnvelope();
	}


	private  java.lang.Object fromOM(
			org.apache.axiom.om.OMElement param,
			java.lang.Class type,
			java.util.Map extraNamespaces) throws org.apache.axis2.AxisFault{

		try {

			if (com.upwork.axis2_client.SecurityTokenServiceStub.RequestSecurityToken.class.equals(type)){

				return com.upwork.axis2_client.SecurityTokenServiceStub.RequestSecurityToken.Factory.parse(param.getXMLStreamReaderWithoutCaching());


			}

			if (com.upwork.axis2_client.SecurityTokenServiceStub.RequestSecurityTokenResponse.class.equals(type)){

				return com.upwork.axis2_client.SecurityTokenServiceStub.RequestSecurityTokenResponse.Factory.parse(param.getXMLStreamReaderWithoutCaching());


			}

		} catch (java.lang.Exception e) {
			throw org.apache.axis2.AxisFault.makeFault(e);
		}
		return null;
	}




}
