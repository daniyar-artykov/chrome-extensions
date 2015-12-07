package com.realworldrobotics.hiegen.ws;

import com.realworldrobotics.hiegen.Context;
import com.realworldrobotics.hiegen.dao.PatientDao;
import com.realworldrobotics.hiegen.entity.FieldE;
import com.realworldrobotics.hiegen.entity.PatientE;
import com.realworldrobotics.hiegen.wsdl.*;

import javax.jws.WebParam;
import javax.jws.WebService;
import javax.xml.ws.Holder;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;

/**
 * Created by Tim on 30.08.2015.
 */

@WebService(targetNamespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession")
public class HiegenWS {


    public void getSession(@WebParam(name = "formEngineDescription", targetNamespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession") String formEngineDescription,
    		@WebParam(name = "formPublisherDescription", targetNamespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession") String formPublisherDescription, 
    		@WebParam(name = "sessionIntentDescription", targetNamespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession") String sessionIntentDescription, 
    		@WebParam(name = "sessionSet", targetNamespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession", mode = WebParam.Mode.OUT) Holder<Boolean> sessionSet, 
    		@WebParam(name = "sessionKey", targetNamespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession", mode = WebParam.Mode.OUT) Holder<String> sessionKey) {

    }

    public GetVersionResponse.Return getVersion(@WebParam(name = "sessionKey", targetNamespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession") String sessionKey) {
        return null;
    }

    public GetDeliveryOptionsResponse.Return getDeliveryOptions(@WebParam(name = "sessionKey", targetNamespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession") String sessionKey) {
        ObjectFactory factory = new ObjectFactory();
        GetDeliveryOptionsResponse.Return ret = factory.createGetDeliveryOptionsResponseReturn();
        ret.setSenderAccount("Account");
        return ret;
    }

    public void getPatient(@WebParam(name = "sessionKey", targetNamespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession") String sessionKey, @WebParam(name = "patientSearchSummary", targetNamespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession") PatientSummary patientSearchSummary, @WebParam(name = "patientSummaryCount", targetNamespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession", mode = WebParam.Mode.OUT) Holder<BigInteger> patientSummaryCount, @WebParam(name = "patientSummaryList", targetNamespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession", mode = WebParam.Mode.OUT) Holder<PatientSummary> patientSummaryList) {

    }

    public boolean getSessionContext(@WebParam(name = "sessionKey", targetNamespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession") String sessionKey, @WebParam(name = "patientIdType", targetNamespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession") String patientIdType, @WebParam(name = "patientId", targetNamespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession") String patientId, @WebParam(name = "currentUserIdType", targetNamespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession") String currentUserIdType, @WebParam(name = "currentUserId", targetNamespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession") String currentUserId, @WebParam(name = "currentUserName", targetNamespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession") String currentUserName, @WebParam(name = "currentUserPassword", targetNamespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession") String currentUserPassword) {
        return false;
    }

    public GetDataResponse.Return getData(@WebParam(name = "sessionKey", targetNamespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession") String sessionKey,
                                          @WebParam(name = "dataContainer", targetNamespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession") FormData dataContainer) {
//        PatientDao.initSections();

        System.out.println(sessionKey);

        GetDataResponse.Return ret = Context.getObjFactory().createGetDataResponseReturn();
        ret.setDataContainer(dataContainer);

        String id = getIdFromContainer(dataContainer);
        if(id!=null){
            PatientE patient = PatientDao.find(id);
            if(patient!=null && patient.getField()!=null){
                HashMap<String, String> map = new HashMap<String, String>();
                HashMap<String, Integer> countMap = new HashMap<String, Integer>();
                for(FieldE f: patient.getField()){
                    map.put(f.getConceptName()+"@"+f.getRowNum(), f.getValue());
                    Integer cnt = countMap.get(f.getGroupConceptName());
                    if(cnt==null || cnt < f.getRowNum()){
                        countMap.put(f.getGroupConceptName(), f.getRowNum());
                    }
                }
                for (Section s : dataContainer.getSubmittedData().getSection()) {
                    for (Field f : s.getField()) {
                        f.setValue(map.get(f.getConceptName()+"@1"));
                    }

                    ArrayList<Group> groups = new ArrayList<Group>();
                    for (Group g : s.getGroup()) {
                        Integer cnt = countMap.get(g.getConceptName());
                        cnt = cnt==null?1:cnt;
                        g.setNumRows(cnt);
                        for (Field f : g.getField()) {
                            f.setValue(map.get(f.getConceptName()+"@1"));
                        }
                        groups.add(g);

                        for(int i=2; i<=cnt; i++){
                            Group g2 = copyGroup(g);
                            for (Field f : g2.getField()) {
                                f.setValue(map.get(f.getConceptName()+"@"+i));
                            }
                            groups.add(g2);
                        }
                    }
                    s.getGroup().clear();
                    s.getGroup().addAll(groups);
                }

            }
        }
        return ret;
    }

    private Group copyGroup(Group src){
        Group dst = Context.getObjFactory().createGroup();
        dst = copyObj(src, dst);
        for(Field fi: src.getField()){
            Field dstField = Context.getObjFactory().createField();
            dst.getField().add(copyObj(fi, dstField));
        }
        return dst;
    }

    private <T> T copyObj(T src, T dst){
//        Group dst = Context.getObjFactory().createGroup();
        for(java.lang.reflect.Field f: src.getClass().getDeclaredFields()){
            if (!Collection.class.isAssignableFrom(f.getType())) {
                f.setAccessible(true);
                try {
                    f.set(dst, f.get(src));
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                }
            }
        }
        return dst;
    }

//    public GetDataResponse.Return getData(@WebParam GetDataRequest request) {
//        System.out.println(request==null);
//        ObjectFactory factory = new ObjectFactory();
//        GetDataResponse.Return ret = factory.createGetDataResponseReturn();
//        return ret;
//    }

    public SaveContainerResponse.Return saveContainer(
            @WebParam(name = "sessionKey", targetNamespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession") String sessionKey,
            @WebParam(name = "resumePath", targetNamespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession") String resumePath,
            @WebParam(name = "dataContainer", targetNamespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession") FormData dataContainer,
            @WebParam(name = "view", targetNamespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession") String view,
            @WebParam(name = "viewType", targetNamespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession") String viewType,
            @WebParam(name = "viewSignature", targetNamespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession") String viewSignature,
            @WebParam(name = "completed", targetNamespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession") boolean completed,
            @WebParam(name = "continueSession", targetNamespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession") Boolean continueSession) {
        SaveContainerResponse resp = Context.getObjFactory().createSaveContainerResponse();
        resp.setReturn(Context.getObjFactory().createSaveContainerResponseReturn());
        resp.getReturn().setResponse(false);
        if (completed) {
            if (dataContainer != null) {
                String id = getIdFromContainer(dataContainer);
                if (id != null) {
                    PatientE patient = PatientDao.find(id);
                    if(patient==null){
                        patient = new PatientE();
                        patient.setField(new ArrayList<FieldE>());
                        patient.setId(id);
                    } else {
                        PatientDao.clearFields(patient);
                    }

                    FieldE field;
                    for (Section s : dataContainer.getSubmittedData().getSection()) {
                        for (Field f : s.getField()) {
                            field = new FieldE();
                            field.setConceptName(f.getConceptName());
                            field.setPatient(patient);
                            field.setValue(f.getValue());
                            field.setRowNum(1);
                            patient.getField().add(field);
                        }
                        HashMap<String, Integer> nums = new HashMap<String, Integer>();
                        for (Group g : s.getGroup()) {
                            nums.put(g.getConceptName(), nums.containsKey(g.getConceptName()) ? nums.get(g.getConceptName()) + 1 : 1);
                            for (Field f : g.getField()) {
                                field = new FieldE();
                                field.setConceptName(f.getConceptName());
                                field.setPatient(patient);
                                field.setValue(f.getValue());
                                field.setRowNum(nums.get(g.getConceptName()));
                                field.setGroupConceptName(g.getConceptName());
                                patient.getField().add(field);
                            }
                        }
                    }
                    PatientDao.save(patient);
                    resp.getReturn().setResponse(true);
                    return resp.getReturn();
                }
            }
        }
        return resp.getReturn();
    }

     private String getIdFromContainer(FormData container) {
        for (Section s : container.getSubmittedData().getSection()) {
            for (Field f : s.getField()) {
                if ("Patient_IHI".equals(f.getConceptName())) {
                    return f.getValue();
                }
            }
        }
        return null;
    }

    public GetFormViewResponse.Return getFormView(@WebParam(name = "sessionKey", targetNamespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession") String sessionKey, @WebParam(name = "formInstanceId", targetNamespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession") String formInstanceId) {
        return null;
    }

    public ProcessActionResponse.Return processAction(@WebParam(name = "sessionKey", targetNamespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession") String sessionKey, @WebParam(name = "actionId", targetNamespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession") String actionId, @WebParam(name = "actionContainer", targetNamespace = "http://www.hiegen.realworldrobotics/hiegenforms/1.1/formsession") ActionContainer actionContainer) {
        return null;
    }
}
