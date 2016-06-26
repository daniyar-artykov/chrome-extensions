/*
 *  Copyright (c) 2000-2004 ASP Converters pty ltd
 *
 *  www.aspconverters.com.au
 *
 *  All Rights Reserved.
 *
 *  This software is the proprietary information of
 *  ASP Converters Pty Ltd.
 *  Use is subject to license terms.
 */
package com.aspc.cms.module;

import com.aspc.remote.application.AppCmdLine;
import com.aspc.remote.rest.Method;
import com.aspc.remote.rest.ReST;
import com.aspc.remote.util.misc.CLogger;
import com.aspc.remote.util.misc.FileUtil;
import com.aspc.remote.util.misc.StringUtilities;
import com.aspc.remote.util.misc.ThreadPool;
import java.io.File;
import java.io.FileWriter;
import java.net.URL;
import java.nio.file.FileSystems;
import java.nio.file.Path;
import java.nio.file.StandardWatchEventKinds;
import java.nio.file.WatchEvent;
import java.nio.file.WatchEvent.Kind;
import java.nio.file.WatchKey;
import java.nio.file.WatchService;
import java.util.concurrent.atomic.AtomicLong;
import org.apache.commons.cli.CommandLine;
import org.apache.commons.cli.Option;
import org.apache.commons.cli.Options;
import org.apache.commons.logging.Log;
import org.json.JSONArray;
import org.json.JSONObject;

/**
 * App
 *
 * <br>
 * <i>THREAD MODE: SINGLETON command line application SINGLE-THREADED</i>
 *
 * @author Nigel Leck
 * @since 7 April 2001
 */
public class SyncResourceApp extends AppCmdLine
{
    private static final Log LOGGER = CLogger.getLog( "com.aspc.cms.module.SyncResourceApp");//#LOGGER-NOPMD

    private URL remoteURL;
    private File syncDirectory;
    private String siteName;

    @Override
    public void handleCommandLine(CommandLine line) throws Exception {
        super.handleCommandLine(line);

        String tmpURL=(String)System.getProperties().get(PROPERTY_REMOTE_URL);

        if( StringUtilities.isBlank(tmpURL))
        {
            throw new Exception( "remote URL is mandatory");
        }
        remoteURL=new URL(tmpURL);

        siteName=line.getOptionValue("s");
        if( StringUtilities.isBlank(siteName))
        {
            throw new Exception( "Site is mandatory");
        }

        String tmpDir=line.getOptionValue("d");

        syncDirectory=new File( tmpDir + "/" + siteName);

        syncDirectory.mkdirs();

        if( syncDirectory.isDirectory() ==false)
        {
            throw new Exception( "should be a directory: " + syncDirectory);
        }
    }

    @Override
    protected void addExtraOptions(Options options) {
        super.addExtraOptions(options);

        Option dirOpt = new Option("d", true, "resource directory" );
        options.addOption( dirOpt);

        Option siteOpt = new Option("s", true, "site to sync" );
        options.addOption( siteOpt);

    }

    private ReST.Builder makeBuilder(final String path) throws Exception
    {
        String userInfo=remoteURL.getUserInfo();
        String layer=remoteURL.getPath();
        int pos = userInfo.indexOf(":");

        String user=StringUtilities.decode(userInfo.substring(0, pos));

        if( layer.length()>1 && StringUtilities.notBlank(layer.substring(1)))
        {
            user+="@" + layer.substring(1);
        }
        String pw=StringUtilities.decode(userInfo.substring(pos + 1));

        URL baseURL=new URL( remoteURL.getProtocol() + "://" + remoteURL.getHost() + ":" + remoteURL.getPort());
        //String siteName=remoteURL.getPath();
        return ReST.builder(baseURL + path).setAuthorization(user, pw);//.getResponseAndCheck().getContentAsJSON();

    }
    private String siteKey;
    private final AtomicLong lastModify=new AtomicLong(Long.MAX_VALUE);
    
    @Override
    public void process() throws Exception {


        JSONObject json = makeBuilder( "/ReST/v5/class/site").addParameter("q", "name='" + siteName + "'").getResponseAndCheck().getContentAsJSON();
        //LOGGER.info( json.toString(2));

        JSONObject siteJSON = json.getJSONArray("results").getJSONObject(0);

        siteKey=siteJSON.getString("_global_key");
        pullResources( );

        ThreadPool.schedule(new Runnable(){
            @Override
            public void run() {
                long since = System.currentTimeMillis();
                while( true){
                    try{
                        JSONObject json = makeBuilder( "/ReST/v3/sync/SiteResource").addParameter("block", "1 min").addParameter("since", since).getResponseAndCheck().getContentAsJSON();
                    
                        if( json.has("since"))
                        {
                            since=json.getLong("since");
                        }
                        
                        if( json.getJSONArray("results").length()>0)
                        {
                            pullResources();
                        }
                    }
                    catch( Exception e)
                    {
                        LOGGER.warn( "could not sync", e);
                        try {
                            Thread.sleep(60000);
                        } catch (InterruptedException ex) {
                            break;
                        }
                    }
                }
            }
        });
        monitorDir( );
    }

    private void registerDir( final WatchService watchService, final File dir) throws Exception
    {
         // Folder we are going to watch
        Path p=dir.toPath();

        p.register(
            watchService,
            StandardWatchEventKinds.ENTRY_CREATE,
            StandardWatchEventKinds.ENTRY_MODIFY,
            StandardWatchEventKinds.ENTRY_DELETE
        );

        for( File f: dir.listFiles())
        {
            if( f.isDirectory())
            {
                registerDir(watchService, f);
            }
        }
    }

    private void monitorDir() throws Exception
    {
        // Create a new Watch Service
        WatchService watchService = FileSystems.getDefault().newWatchService();

        registerDir( watchService, syncDirectory);


        while(true) {
            try{
                // Obtaining watch keys
                final WatchKey key = watchService.take();//poll(5, TimeUnit.SECONDS);

                if(key == null)continue;

                long tmpLastModified=lastModify.get();
                long startLastModified=tmpLastModified;
                try{
                    // key value can be null if no event was triggered
                    for (WatchEvent<?> watchEvent : key.pollEvents()) {
                        final Kind<?> kind = watchEvent.kind();
                        // Overflow event
                        if (StandardWatchEventKinds.OVERFLOW == kind) {
                                continue; // loop
                        }

                        tmpLastModified=scanChanges( syncDirectory, tmpLastModified);
                    }
                }
                finally
                {
                    key.reset();
                }
                lastModify.compareAndSet(startLastModified, tmpLastModified);
            }
            catch( Exception e)
            {
                LOGGER.warn( "could not send", e);
                Thread.sleep(60000);
            }
        }
    }

    private long scanChanges( final File subDir, long lastModified) throws Exception
    {
        long nextModified=lastModified;

        for( File f: subDir.listFiles())
        {
            if( f.isDirectory())
            {
                long tmpModified=scanChanges(f, lastModified);
                if( tmpModified>nextModified)
                {
                    nextModified=tmpModified;
                }
            }
            else
            {
                long tmpModified=f.lastModified();
                if( tmpModified>lastModified)
                {
                    LOGGER.info( "Changed: " + f);
                    sendFile( f);
                    if( tmpModified>nextModified)
                    {
                        nextModified=tmpModified;
                    }
                }
            }
        }

        return nextModified;
    }

    private void sendFile( final File file) throws Exception
    {
        String path = file.getPath().substring(syncDirectory.getPath().length() + 1);
        
        LOGGER.info( "path: " + path);
        
        JSONObject json = makeBuilder( "/ReST/v5/class/SiteResource")
            .addParameter("q", "site IS '" + siteKey + "' and path='" + path + "'")
            .getResponseAndCheck()
            .getContentAsJSON();
        JSONArray resourceList = json.getJSONArray("results");
        if( resourceList.length()==1)
        {
            JSONObject resourceJSON=resourceList.getJSONObject(0);
            String data=FileUtil.readFile(file);
            ReST.Builder b = makeBuilder( "/ReST/v5/class/SiteResource/" + resourceJSON.getString("_key"));

            String type = resourceJSON.getJSONObject("type").getString("code");

            switch( type)
            {
                case "JS":
                    b.addParameter("script", data);
                    break;
                case "CSS":
                    b.addParameter("css", data);
                    break;
                case "HTML":
                    b.addParameter("html", data);
                    break;
                default:
                    throw new Exception("unkwnon type: " + type);
            }
            
            b.setMethod(Method.PUT);
            
            JSONObject response = b.getResponseAndCheck().getContentAsJSON();
            
            LOGGER.debug( response.toString(2));
        }
    }

    private void pullResources( ) throws Exception
    {
        try{            
            lastModify.set(Long.MAX_VALUE);

            JSONObject json = makeBuilder( "/ReST/v5/class/SiteResource").addParameter("q", "site IS '" + siteKey + "'").getResponseAndCheck().getContentAsJSON();

            JSONArray resourceList = json.getJSONArray("results");

            for( int pos=0;pos < resourceList.length(); pos++)
            {
                JSONObject resourceJSON=resourceList.getJSONObject(pos);

                String path = resourceJSON.getString( "path");

                File rFile=new File( syncDirectory + "/" + path);
                rFile.getParentFile().mkdirs();

                String data;

                String type = resourceJSON.getJSONObject("type").getString("code");

                switch( type)
                {
                    case "JS":
                        data=resourceJSON.getString("script");
                        break;
                    case "CSS":
                        data=resourceJSON.getString("css");
                        break;
                    case "HTML":
                        data=resourceJSON.getString("html");
                        break;
                    default:
                        continue;
                }

                if( rFile.exists())
                {
                    String currentData=FileUtil.readFile(rFile);
                    if( currentData.equals(data))
                    {
                        continue;
                    }
                }
                try (FileWriter fw = new FileWriter( rFile)) {
                    fw.write(data);
                }
            }
        }finally
        {
            lastModify.set(System.currentTimeMillis());
        }
    }

    /**
     * The main for the program
     *
     * @param args The command line arguments
     * @throws Exception a serious problem.
     */
    public static void main (String[] args) throws Exception
    {
        new SyncResourceApp( ).execute(args);
    }

}
