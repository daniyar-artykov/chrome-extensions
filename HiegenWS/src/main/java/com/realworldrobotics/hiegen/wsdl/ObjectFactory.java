
package com.realworldrobotics.hiegen.wsdl;

import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlElementDecl;
import javax.xml.bind.annotation.XmlRegistry;
import javax.xml.namespace.QName;


/**
 * This object contains factory methods for each 
 * Java content interface and Java element interface 
 * generated in the com.realworldrobotics.hiegen.wsdl package. 
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

    private final static QName _GetDataResponse_QNAME = new QName("http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession", "getDataResponse");
    private final static QName _ProcessActionResponse_QNAME = new QName("http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession", "processActionResponse");
    private final static QName _ProcessAction_QNAME = new QName("http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession", "processAction");
    private final static QName _GetSession_QNAME = new QName("http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession", "getSession");
    private final static QName _GetVersion_QNAME = new QName("http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession", "getVersion");
    private final static QName _Form_QNAME = new QName("urn:hiegen.realworldrobotics.genericform.model", "form");
    private final static QName _GetFormViewResponse_QNAME = new QName("http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession", "getFormViewResponse");
    private final static QName _GetDeliveryOptions_QNAME = new QName("http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession", "getDeliveryOptions");
    private final static QName _GetData_QNAME = new QName("http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession", "getData");
    private final static QName _GetSessionContextResponse_QNAME = new QName("http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession", "getSessionContextResponse");
    private final static QName _SaveContainerResponse_QNAME = new QName("http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession", "saveContainerResponse");
    private final static QName _GetSessionContext_QNAME = new QName("http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession", "getSessionContext");
    private final static QName _GetFormView_QNAME = new QName("http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession", "getFormView");
    private final static QName _GetVersionResponse_QNAME = new QName("http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession", "getVersionResponse");
    private final static QName _GetPatient_QNAME = new QName("http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession", "getPatient");
    private final static QName _GetSessionResponse_QNAME = new QName("http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession", "getSessionResponse");
    private final static QName _GetDeliveryOptionsResponse_QNAME = new QName("http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession", "getDeliveryOptionsResponse");
    private final static QName _SaveContainer_QNAME = new QName("http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession", "saveContainer");
    private final static QName _GetPatientResponse_QNAME = new QName("http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession", "getPatientResponse");

    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: com.realworldrobotics.hiegen.wsdl
     * 
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link FormMetaData }
     * 
     */
    public FormMetaData createFormMetaData() {
        return new FormMetaData();
    }

    /**
     * Create an instance of {@link FormMetaData.CopyToRecipientAccounts }
     * 
     */
    public FormMetaData.CopyToRecipientAccounts createFormMetaDataCopyToRecipientAccounts() {
        return new FormMetaData.CopyToRecipientAccounts();
    }

    /**
     * Create an instance of {@link FormData }
     * 
     */
    public FormData createFormData() {
        return new FormData();
    }

    /**
     * Create an instance of {@link ProcessActionResponse }
     * 
     */
    public ProcessActionResponse createProcessActionResponse() {
        return new ProcessActionResponse();
    }

    /**
     * Create an instance of {@link GetDataResponse }
     * 
     */
    public GetDataResponse createGetDataResponse() {
        return new GetDataResponse();
    }

    /**
     * Create an instance of {@link GetFormViewResponse }
     * 
     */
    public GetFormViewResponse createGetFormViewResponse() {
        return new GetFormViewResponse();
    }

    /**
     * Create an instance of {@link GetVersionResponse }
     * 
     */
    public GetVersionResponse createGetVersionResponse() {
        return new GetVersionResponse();
    }

    /**
     * Create an instance of {@link SaveContainerResponse }
     * 
     */
    public SaveContainerResponse createSaveContainerResponse() {
        return new SaveContainerResponse();
    }

    /**
     * Create an instance of {@link GetDeliveryOptionsResponse }
     * 
     */
    public GetDeliveryOptionsResponse createGetDeliveryOptionsResponse() {
        return new GetDeliveryOptionsResponse();
    }

    /**
     * Create an instance of {@link GetSessionResponse }
     * 
     */
    public GetSessionResponse createGetSessionResponse() {
        return new GetSessionResponse();
    }

    /**
     * Create an instance of {@link GetPatientResponse }
     * 
     */
    public GetPatientResponse createGetPatientResponse() {
        return new GetPatientResponse();
    }

    /**
     * Create an instance of {@link SaveContainerRequest }
     * 
     */
    public SaveContainerRequest createSaveContainerRequest() {
        return new SaveContainerRequest();
    }

    /**
     * Create an instance of {@link GetSessionContextRequest }
     * 
     */
    public GetSessionContextRequest createGetSessionContextRequest() {
        return new GetSessionContextRequest();
    }

    /**
     * Create an instance of {@link GetFormViewRequest }
     * 
     */
    public GetFormViewRequest createGetFormViewRequest() {
        return new GetFormViewRequest();
    }

    /**
     * Create an instance of {@link GetPatientRequest }
     * 
     */
    public GetPatientRequest createGetPatientRequest() {
        return new GetPatientRequest();
    }

    /**
     * Create an instance of {@link GetVersionRequest }
     * 
     */
    public GetVersionRequest createGetVersionRequest() {
        return new GetVersionRequest();
    }

    /**
     * Create an instance of {@link GetDeliveryOptionsRequest }
     * 
     */
    public GetDeliveryOptionsRequest createGetDeliveryOptionsRequest() {
        return new GetDeliveryOptionsRequest();
    }

    /**
     * Create an instance of {@link GetSessionContextResponse }
     * 
     */
    public GetSessionContextResponse createGetSessionContextResponse() {
        return new GetSessionContextResponse();
    }

    /**
     * Create an instance of {@link GetDataRequest }
     * 
     */
    public GetDataRequest createGetDataRequest() {
        return new GetDataRequest();
    }

    /**
     * Create an instance of {@link GetSessionRequest }
     * 
     */
    public GetSessionRequest createGetSessionRequest() {
        return new GetSessionRequest();
    }

    /**
     * Create an instance of {@link ProcessActionRequest }
     * 
     */
    public ProcessActionRequest createProcessActionRequest() {
        return new ProcessActionRequest();
    }

    /**
     * Create an instance of {@link ActionContainer }
     * 
     */
    public ActionContainer createActionContainer() {
        return new ActionContainer();
    }

    /**
     * Create an instance of {@link PatientSummary }
     * 
     */
    public PatientSummary createPatientSummary() {
        return new PatientSummary();
    }

    /**
     * Create an instance of {@link Form }
     * 
     */
    public Form createForm() {
        return new Form();
    }

    /**
     * Create an instance of {@link Section }
     * 
     */
    public Section createSection() {
        return new Section();
    }

    /**
     * Create an instance of {@link Field }
     * 
     */
    public Field createField() {
        return new Field();
    }

    /**
     * Create an instance of {@link Group }
     * 
     */
    public Group createGroup() {
        return new Group();
    }

    /**
     * Create an instance of {@link FormMetaData.FormInstanceId }
     * 
     */
    public FormMetaData.FormInstanceId createFormMetaDataFormInstanceId() {
        return new FormMetaData.FormInstanceId();
    }

    /**
     * Create an instance of {@link FormMetaData.FormInstanceVersion }
     * 
     */
    public FormMetaData.FormInstanceVersion createFormMetaDataFormInstanceVersion() {
        return new FormMetaData.FormInstanceVersion();
    }

    /**
     * Create an instance of {@link FormMetaData.FormInstanceCreationTimeStamp }
     * 
     */
    public FormMetaData.FormInstanceCreationTimeStamp createFormMetaDataFormInstanceCreationTimeStamp() {
        return new FormMetaData.FormInstanceCreationTimeStamp();
    }

    /**
     * Create an instance of {@link FormMetaData.FormInstanceOperationMode }
     * 
     */
    public FormMetaData.FormInstanceOperationMode createFormMetaDataFormInstanceOperationMode() {
        return new FormMetaData.FormInstanceOperationMode();
    }

    /**
     * Create an instance of {@link FormMetaData.FormInstanceDescription }
     * 
     */
    public FormMetaData.FormInstanceDescription createFormMetaDataFormInstanceDescription() {
        return new FormMetaData.FormInstanceDescription();
    }

    /**
     * Create an instance of {@link FormMetaData.FormDefinitionId }
     * 
     */
    public FormMetaData.FormDefinitionId createFormMetaDataFormDefinitionId() {
        return new FormMetaData.FormDefinitionId();
    }

    /**
     * Create an instance of {@link FormMetaData.FormDefinitionVersion }
     * 
     */
    public FormMetaData.FormDefinitionVersion createFormMetaDataFormDefinitionVersion() {
        return new FormMetaData.FormDefinitionVersion();
    }

    /**
     * Create an instance of {@link FormMetaData.FormDefinitionDescription }
     * 
     */
    public FormMetaData.FormDefinitionDescription createFormMetaDataFormDefinitionDescription() {
        return new FormMetaData.FormDefinitionDescription();
    }

    /**
     * Create an instance of {@link FormMetaData.FormDefinitionTitle }
     * 
     */
    public FormMetaData.FormDefinitionTitle createFormMetaDataFormDefinitionTitle() {
        return new FormMetaData.FormDefinitionTitle();
    }

    /**
     * Create an instance of {@link FormMetaData.EncryptedFlag }
     * 
     */
    public FormMetaData.EncryptedFlag createFormMetaDataEncryptedFlag() {
        return new FormMetaData.EncryptedFlag();
    }

    /**
     * Create an instance of {@link FormMetaData.Signatures }
     * 
     */
    public FormMetaData.Signatures createFormMetaDataSignatures() {
        return new FormMetaData.Signatures();
    }

    /**
     * Create an instance of {@link FormMetaData.RecipientAccount }
     * 
     */
    public FormMetaData.RecipientAccount createFormMetaDataRecipientAccount() {
        return new FormMetaData.RecipientAccount();
    }

    /**
     * Create an instance of {@link FormMetaData.CopyToRecipientAccounts.CcRecipientAccount }
     * 
     */
    public FormMetaData.CopyToRecipientAccounts.CcRecipientAccount createFormMetaDataCopyToRecipientAccountsCcRecipientAccount() {
        return new FormMetaData.CopyToRecipientAccounts.CcRecipientAccount();
    }

    /**
     * Create an instance of {@link FormData.ResponseData }
     * 
     */
    public FormData.ResponseData createFormDataResponseData() {
        return new FormData.ResponseData();
    }

    /**
     * Create an instance of {@link ProcessActionResponse.Return }
     * 
     */
    public ProcessActionResponse.Return createProcessActionResponseReturn() {
        return new ProcessActionResponse.Return();
    }

    /**
     * Create an instance of {@link GetDataResponse.Return }
     * 
     */
    public GetDataResponse.Return createGetDataResponseReturn() {
        return new GetDataResponse.Return();
    }

    /**
     * Create an instance of {@link GetFormViewResponse.Return }
     * 
     */
    public GetFormViewResponse.Return createGetFormViewResponseReturn() {
        return new GetFormViewResponse.Return();
    }

    /**
     * Create an instance of {@link GetVersionResponse.Return }
     * 
     */
    public GetVersionResponse.Return createGetVersionResponseReturn() {
        return new GetVersionResponse.Return();
    }

    /**
     * Create an instance of {@link SaveContainerResponse.Return }
     * 
     */
    public SaveContainerResponse.Return createSaveContainerResponseReturn() {
        return new SaveContainerResponse.Return();
    }

    /**
     * Create an instance of {@link GetDeliveryOptionsResponse.Return }
     * 
     */
    public GetDeliveryOptionsResponse.Return createGetDeliveryOptionsResponseReturn() {
        return new GetDeliveryOptionsResponse.Return();
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link GetDataResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession", name = "getDataResponse")
    public JAXBElement<GetDataResponse> createGetDataResponse(GetDataResponse value) {
        return new JAXBElement<GetDataResponse>(_GetDataResponse_QNAME, GetDataResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link ProcessActionResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession", name = "processActionResponse")
    public JAXBElement<ProcessActionResponse> createProcessActionResponse(ProcessActionResponse value) {
        return new JAXBElement<ProcessActionResponse>(_ProcessActionResponse_QNAME, ProcessActionResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link ProcessActionRequest }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession", name = "processAction")
    public JAXBElement<ProcessActionRequest> createProcessAction(ProcessActionRequest value) {
        return new JAXBElement<ProcessActionRequest>(_ProcessAction_QNAME, ProcessActionRequest.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link GetSessionRequest }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession", name = "getSession")
    public JAXBElement<GetSessionRequest> createGetSession(GetSessionRequest value) {
        return new JAXBElement<GetSessionRequest>(_GetSession_QNAME, GetSessionRequest.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link GetVersionRequest }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession", name = "getVersion")
    public JAXBElement<GetVersionRequest> createGetVersion(GetVersionRequest value) {
        return new JAXBElement<GetVersionRequest>(_GetVersion_QNAME, GetVersionRequest.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link Form }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "urn:hiegen.realworldrobotics.genericform.model", name = "form")
    public JAXBElement<Form> createForm(Form value) {
        return new JAXBElement<Form>(_Form_QNAME, Form.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link GetFormViewResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession", name = "getFormViewResponse")
    public JAXBElement<GetFormViewResponse> createGetFormViewResponse(GetFormViewResponse value) {
        return new JAXBElement<GetFormViewResponse>(_GetFormViewResponse_QNAME, GetFormViewResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link GetDeliveryOptionsRequest }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession", name = "getDeliveryOptions")
    public JAXBElement<GetDeliveryOptionsRequest> createGetDeliveryOptions(GetDeliveryOptionsRequest value) {
        return new JAXBElement<GetDeliveryOptionsRequest>(_GetDeliveryOptions_QNAME, GetDeliveryOptionsRequest.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link GetDataRequest }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession", name = "getData")
    public JAXBElement<GetDataRequest> createGetData(GetDataRequest value) {
        return new JAXBElement<GetDataRequest>(_GetData_QNAME, GetDataRequest.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link GetSessionContextResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession", name = "getSessionContextResponse")
    public JAXBElement<GetSessionContextResponse> createGetSessionContextResponse(GetSessionContextResponse value) {
        return new JAXBElement<GetSessionContextResponse>(_GetSessionContextResponse_QNAME, GetSessionContextResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link SaveContainerResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession", name = "saveContainerResponse")
    public JAXBElement<SaveContainerResponse> createSaveContainerResponse(SaveContainerResponse value) {
        return new JAXBElement<SaveContainerResponse>(_SaveContainerResponse_QNAME, SaveContainerResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link GetSessionContextRequest }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession", name = "getSessionContext")
    public JAXBElement<GetSessionContextRequest> createGetSessionContext(GetSessionContextRequest value) {
        return new JAXBElement<GetSessionContextRequest>(_GetSessionContext_QNAME, GetSessionContextRequest.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link GetFormViewRequest }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession", name = "getFormView")
    public JAXBElement<GetFormViewRequest> createGetFormView(GetFormViewRequest value) {
        return new JAXBElement<GetFormViewRequest>(_GetFormView_QNAME, GetFormViewRequest.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link GetVersionResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession", name = "getVersionResponse")
    public JAXBElement<GetVersionResponse> createGetVersionResponse(GetVersionResponse value) {
        return new JAXBElement<GetVersionResponse>(_GetVersionResponse_QNAME, GetVersionResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link GetPatientRequest }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession", name = "getPatient")
    public JAXBElement<GetPatientRequest> createGetPatient(GetPatientRequest value) {
        return new JAXBElement<GetPatientRequest>(_GetPatient_QNAME, GetPatientRequest.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link GetSessionResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession", name = "getSessionResponse")
    public JAXBElement<GetSessionResponse> createGetSessionResponse(GetSessionResponse value) {
        return new JAXBElement<GetSessionResponse>(_GetSessionResponse_QNAME, GetSessionResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link GetDeliveryOptionsResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession", name = "getDeliveryOptionsResponse")
    public JAXBElement<GetDeliveryOptionsResponse> createGetDeliveryOptionsResponse(GetDeliveryOptionsResponse value) {
        return new JAXBElement<GetDeliveryOptionsResponse>(_GetDeliveryOptionsResponse_QNAME, GetDeliveryOptionsResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link SaveContainerRequest }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession", name = "saveContainer")
    public JAXBElement<SaveContainerRequest> createSaveContainer(SaveContainerRequest value) {
        return new JAXBElement<SaveContainerRequest>(_SaveContainer_QNAME, SaveContainerRequest.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link GetPatientResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession", name = "getPatientResponse")
    public JAXBElement<GetPatientResponse> createGetPatientResponse(GetPatientResponse value) {
        return new JAXBElement<GetPatientResponse>(_GetPatientResponse_QNAME, GetPatientResponse.class, null, value);
    }

}
