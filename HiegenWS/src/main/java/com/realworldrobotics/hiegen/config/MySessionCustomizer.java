package com.realworldrobotics.hiegen.config;

/**
 * Created by Tim on 23.08.2015.
 */

import org.eclipse.persistence.config.SessionCustomizer;
import org.eclipse.persistence.sessions.Session;

public class MySessionCustomizer implements SessionCustomizer {

    private String schema = "db";

    public void customize(Session session) {
        session.getLogin().setTableQualifier(schema);
    }
}
