/**
 * Copyright (c) 2015 Drishti-Soft Solutions Pvt. Ltd.
 *
 * @author: abhayk
 * Date:  Jul 29, 2015
 */
package com.solex.test;

import java.util.Set;

import javax.xml.namespace.QName;
import javax.xml.ws.handler.MessageContext;
import javax.xml.ws.handler.soap.SOAPHandler;
import javax.xml.ws.handler.soap.SOAPMessageContext;

/**
 *
 */
public class HeaderHandler implements SOAPHandler<SOAPMessageContext> {

    private String xmlString;

    public HeaderHandler(String xmlString) {
        this.xmlString = xmlString;

    }

    @Override
    public boolean handleMessage(SOAPMessageContext smc) {

        Boolean outboundProperty = (Boolean)smc.get(MessageContext.MESSAGE_OUTBOUND_PROPERTY);
        System.out.println(xmlString);
        if (outboundProperty.booleanValue()) {

            /*
                   Logic to add passed xml string to header
                   

            */

        } else {

        }

        return outboundProperty;

    }

    @Override
    public boolean handleFault(SOAPMessageContext context) {
        return false;
    }

    @Override
    public void close(MessageContext context) {
    }

    @Override
    public Set<QName> getHeaders() {
        return null;
    }
}
