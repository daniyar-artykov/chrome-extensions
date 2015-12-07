package com.realworldrobotics.hiegen.dao;

import com.realworldrobotics.hiegen.Context;
import com.realworldrobotics.hiegen.entity.FieldE;
import com.realworldrobotics.hiegen.entity.PatientE;

import javax.persistence.Query;

/**
 * Created by Tim on 09.09.2015.
 */
public class PatientDao {

    public static PatientE save(PatientE patient){

        Context.getEm().getTransaction().begin();
        patient = Context.getEm().merge(patient);
        Context.getEm().getTransaction().commit();
        return patient;
    }

    public static void clearFields(PatientE patient){
        Context.getEm().getTransaction().begin();
        Query q = Context.getEm().createQuery("delete from FieldE f where f.patient= :p ", FieldE.class);
        q.setParameter("p", patient);
        q.executeUpdate();
        Context.getEm().getTransaction().commit();
    }

    public static PatientE find(String id){
        return Context.getEm().find(PatientE.class, id);
    }

}
