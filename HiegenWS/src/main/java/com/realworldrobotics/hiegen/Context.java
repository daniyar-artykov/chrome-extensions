package com.realworldrobotics.hiegen;

import com.realworldrobotics.hiegen.wsdl.ObjectFactory;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.text.SimpleDateFormat;

/**
 * Created by Tim on 22.08.2015.
 */
public class Context {

    private static final String PERSISTENCE_UNIT_NAME = "PU";
    private static EntityManagerFactory factory = null;
    private static ObjectFactory objFactory = null;
    private static EntityManager em = null;
    private static SimpleDateFormat dateFormat = null;

    public static EntityManagerFactory getFactory() {
        if(factory==null){
            factory = Persistence.createEntityManagerFactory(PERSISTENCE_UNIT_NAME);
        }
        return factory;
    }

    public static EntityManager getEm() {
        if(em==null){
            em = getFactory().createEntityManager();
        }
        return em;
    }

    public static SimpleDateFormat getDateFormat() {
        if(dateFormat==null){
            dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        }
        return dateFormat;
    }

    public static ObjectFactory getObjFactory() {
        if(objFactory==null)
            objFactory = new ObjectFactory();
        return objFactory;
    }
}
