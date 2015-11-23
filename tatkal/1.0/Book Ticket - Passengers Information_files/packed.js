if(!window.RichFaces){window.RichFaces={}
}(function(jQuery,richfaces){richfaces.RICH_CONTAINER="rf";
richfaces.KEYS={BACKSPACE:8,TAB:9,RETURN:13,ESC:27,PAGEUP:33,PAGEDOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,DEL:46};
richfaces.getDomElement=function(source){var type=typeof source;
var element;
if(type=="string"){element=document.getElementById(source)
}else{if(type=="object"){if(source.nodeType){element=source
}else{if(source instanceof jQuery){element=source.get(0)
}}}}return element
};
richfaces.$=function(source){var element=richfaces.getDomElement(source);
if(element){return(element[richfaces.RICH_CONTAINER]||{})["component"]
}};
richfaces.$$=function(componentName,element){while(element.parentNode){var e=element[richfaces.RICH_CONTAINER];
if(e&&e.component&&e.component.name==componentName){return e.component
}else{element=element.parentNode
}}};
richfaces.findNonVisualComponents=function(source){var element=richfaces.getDomElement(source);
if(element){return(element[richfaces.RICH_CONTAINER]||{})["attachedComponents"]
}};
richfaces.invokeMethod=function(source,method){var c=richfaces.$(source);
var f;
if(c&&typeof (f=c[method])=="function"){return f.apply(c,Array.prototype.slice.call(arguments,2))
}};
richfaces.cleanComponent=function(source){var component=richfaces.$(source);
if(component){component.destroy();
component.detach(source)
}var attachedComponents=richfaces.findNonVisualComponents(source);
if(attachedComponents){for(var i in attachedComponents){if(attachedComponents[i]){attachedComponents[i].destroy()
}}}};
richfaces.cleanDom=function(source){var e=(typeof source=="string")?document.getElementById(source):jQuery("body").get(0);
if(source=="javax.faces.ViewRoot"){e=jQuery("body").get(0)
}if(e){var elements=e.getElementsByTagName("*");
if(elements.length){jQuery.each(elements,function(index){richfaces.cleanComponent(this)
});
jQuery.cleanData(elements)
}richfaces.cleanComponent(e);
jQuery.cleanData([e])
}};
richfaces.submitForm=function(form,parameters,target){if(typeof form==="string"){form=jQuery(form)
}var initialTarget=form.attr("target");
var parameterInputs=new Array();
try{form.attr("target",target);
if(parameters){for(var parameterName in parameters){var parameterValue=parameters[parameterName];
var input=jQuery("input[name='"+parameterName+"']",form);
if(input.length==0){var newInput=jQuery("<input />").attr({type:"hidden",name:parameterName,value:parameterValue});
if(parameterName==="javax.faces.portletbridge.STATE_ID"){input=newInput.prependTo(form)
}else{input=newInput.appendTo(form)
}}else{input.val(parameterValue)
}input.each(function(){parameterInputs.push(this)
})
}}form.trigger("submit")
}finally{if(initialTarget===undefined){form.removeAttr("target")
}else{form.attr("target",initialTarget)
}jQuery(parameterInputs).remove()
}};
jQuery.fn.toXML=function(){var out="";
if(this.length>0){if(typeof XMLSerializer=="function"||typeof XMLSerializer=="object"){var xs=new XMLSerializer();
this.each(function(){out+=xs.serializeToString(this)
})
}else{if(this[0].xml!==undefined){this.each(function(){out+=this.xml
})
}else{this.each(function(){out+=this
})
}}}return out
};
var CSS_METACHARS_PATTERN=/([#;&,.+*~':"!^$\[\]()=>|\/])/g;
richfaces.escapeCSSMetachars=function(s){return s.replace(CSS_METACHARS_PATTERN,"\\$1")
};
var logImpl;
richfaces.setLog=function(newLogImpl){logImpl=newLogImpl
};
richfaces.log={debug:function(text){if(logImpl){logImpl.debug(text)
}},info:function(text){if(logImpl){logImpl.info(text)
}},warn:function(text){if(logImpl){logImpl.warn(text)
}},error:function(text){if(logImpl){logImpl.error(text)
}},setLevel:function(level){if(logImpl){logImpl.setLevel(level)
}},getLevel:function(){if(logImpl){return logImpl.getLevel()
}return"info"
},clear:function(){if(logImpl){logImpl.clear()
}}};
richfaces.getValue=function(propertyNamesArray,base){var result=base;
var c=0;
do{result=result[propertyNamesArray[c++]]
}while(result&&c!=propertyNamesArray.length);
return result
};
var VARIABLE_NAME_PATTERN_STRING="[_A-Z,a-z]\\w*";
var VARIABLES_CHAIN=new RegExp("^\\s*"+VARIABLE_NAME_PATTERN_STRING+"(?:\\s*\\.\\s*"+VARIABLE_NAME_PATTERN_STRING+")*\\s*$");
var DOT_SEPARATOR=/\s*\.\s*/;
richfaces.evalMacro=function(macro,base){var value="";
if(VARIABLES_CHAIN.test(macro)){var propertyNamesArray=jQuery.trim(macro).split(DOT_SEPARATOR);
value=richfaces.getValue(propertyNamesArray,base);
if(!value){value=richfaces.getValue(propertyNamesArray,window)
}}else{try{if(base.eval){value=base.eval(macro)
}else{with(base){value=eval(macro)
}}}catch(e){richfaces.log.warn("Exception: "+e.message+"\n["+macro+"]")
}}if(typeof value=="function"){value=value(base)
}return value||""
};
var ALPHA_NUMERIC_MULTI_CHAR_REGEXP=/^\w+$/;
richfaces.interpolate=function(placeholders,context){var contextVarsArray=new Array();
for(var contextVar in context){if(ALPHA_NUMERIC_MULTI_CHAR_REGEXP.test(contextVar)){contextVarsArray.push(contextVar)
}}var regexp=new RegExp("\\{("+contextVarsArray.join("|")+")\\}","g");
return placeholders.replace(regexp,function(str,contextVar){return context[contextVar]
})
};
richfaces.clonePosition=function(element,baseElement,positioning,offset){};
var jsfEventsAdapterEventNames={event:{begin:["begin"],complete:["beforedomupdate"],success:["success","complete"]},error:["error","complete"]};
var getExtensionResponseElement=function(responseXML){return jQuery("partial-response extension#org\\.richfaces\\.extension",responseXML)
};
var JSON_STRING_START=/^\s*(\[|\{)/;
richfaces.parseJSON=function(dataString){try{if(dataString){if(JSON_STRING_START.test(dataString)){return jQuery.parseJSON(dataString)
}else{var parsedData=jQuery.parseJSON('{"root": '+dataString+"}");
return parsedData.root
}}}catch(e){richfaces.log.warn("Error evaluating JSON data from element <"+elementName+">: "+e.message)
}return null
};
var getJSONData=function(extensionElement,elementName){var dataString=jQuery.trim(extensionElement.children(elementName).text());
return richfaces.parseJSON(dataString)
};
richfaces.createJSFEventsAdapter=function(handlers){var handlers=handlers||{};
var ignoreSuccess;
return function(eventData){var source=eventData.source;
var status=eventData.status;
var type=eventData.type;
if(type=="event"&&status=="begin"){ignoreSuccess=false
}else{if(type=="error"){ignoreSuccess=true
}else{if(ignoreSuccess){return 
}else{if(status=="complete"&&richfaces.ajaxContainer&&richfaces.ajaxContainer.isIgnoreResponse&&richfaces.ajaxContainer.isIgnoreResponse()){return 
}}}}var typeHandlers=jsfEventsAdapterEventNames[type];
var handlerNames=(typeHandlers||{})[status]||typeHandlers;
if(handlerNames){for(var i=0;
i<handlerNames.length;
i++){var eventType=handlerNames[i];
var handler=handlers[eventType];
if(handler){var event={};
jQuery.extend(event,eventData);
event.type=eventType;
if(type!="error"){delete event.status;
if(event.responseXML){var xml=getExtensionResponseElement(event.responseXML);
var data=getJSONData(xml,"data");
var componentData=getJSONData(xml,"componentData");
event.data=data;
event.componentData=componentData||{}
}}handler.call(source,event)
}}}}
};
richfaces.setGlobalStatusNameVariable=function(statusName){if(statusName){richfaces.statusName=statusName
}else{delete richfaces.statusName
}};
richfaces.setZeroRequestDelay=function(options){if(typeof options.requestDelay=="undefined"){options.requestDelay=0
}};
var chain=function(){var functions=arguments;
if(functions.length==1){return functions[0]
}else{return function(){var callResult;
for(var i=0;
i<functions.length;
i++){var f=functions[i];
callResult=f.apply(this,arguments)
}return callResult
}
}};
var curry=function(g,a){var _g=g;
var _a=a;
return function(b){_g(_a,b)
}
};
var createEventHandler=function(handlerCode){if(handlerCode){return new Function("event",handlerCode)
}return null
};
var AJAX_EVENTS=(function(){var serverEventHandler=function(clientHandler,event){var xml=getExtensionResponseElement(event.responseXML);
var serverHandler=createEventHandler(xml.children(event.type).text());
if(clientHandler){clientHandler.call(window,event)
}if(serverHandler){serverHandler.call(window,event)
}};
return{error:null,begin:null,complete:serverEventHandler,beforedomupdate:serverEventHandler}
}());
richfaces.ajax=function(source,event,options){var sourceId;
if(options.sourceId){sourceId=options.sourceId
}else{sourceId=(typeof source=="object"&&source.id)?source.id:source
}options=options||{};
parameters=options.parameters||{};
parameters.execute="@component";
parameters.render="@component";
if(options.clientParameters){jQuery.extend(parameters,options.clientParameters)
}if(!parameters["org.richfaces.ajax.component"]){parameters["org.richfaces.ajax.component"]=sourceId
}var eventHandlers;
for(var eventName in AJAX_EVENTS){var handlerCode=options[eventName];
var handler=typeof handlerCode=="function"?handlerCode:createEventHandler(handlerCode);
var serverHandler=AJAX_EVENTS[eventName];
if(serverHandler){handler=curry(serverHandler,handler)
}if(handler){eventHandlers=eventHandlers||{};
eventHandlers[eventName]=handler
}}if(options.status){var namedStatusEventHandler=function(){richfaces.setGlobalStatusNameVariable(options.status)
};
eventHandlers=eventHandlers||{};
if(eventHandlers.begin){eventHandlers.begin=chain(namedStatusEventHandler,eventHandlers.begin)
}else{eventHandlers.begin=namedStatusEventHandler
}}if(options.incId){parameters[sourceId]=sourceId
}if(eventHandlers){var eventsAdapter=richfaces.createJSFEventsAdapter(eventHandlers);
parameters.onevent=eventsAdapter;
parameters.onerror=eventsAdapter
}if(richfaces.queue){parameters.queueId=options.queueId
}jsf.ajax.request(source,event,parameters)
};
var ajaxOnComplete=function(data){var type=data.type;
var responseXML=data.responseXML;
if(data.type=="event"&&data.status=="complete"&&responseXML){var partialResponse=jQuery(responseXML).children("partial-response");
if(partialResponse&&partialResponse.length){var elements=partialResponse.children("changes").children("update, delete");
jQuery.each(elements,function(){richfaces.cleanDom(jQuery(this).attr("id"))
})
}}};
var attachAjaxDOMCleaner=function(){if(typeof jsf!="undefined"&&jsf.ajax){jsf.ajax.addOnEvent(ajaxOnComplete);
return true
}return false
};
if(!attachAjaxDOMCleaner()){jQuery(document).ready(attachAjaxDOMCleaner)
}if(window.addEventListener){window.addEventListener("unload",richfaces.cleanDom,false)
}else{window.attachEvent("onunload",richfaces.cleanDom)
}}(jQuery,RichFaces));;(function(G,E,A){E.ajaxContainer=E.ajaxContainer||{};
if(E.ajaxContainer.jsfRequest){return 
}E.ajaxContainer.jsfRequest=A.ajax.request;
A.ajax.request=function(J,I,H){E.queue.push(J,I,H)
};
E.ajaxContainer.jsfResponse=A.ajax.response;
E.ajaxContainer.isIgnoreResponse=function(){return E.queue.isIgnoreResponse()
};
A.ajax.response=function(I,H){E.queue.response(I,H)
};
var F="pull";
var D="push";
var C=F;
var B="org.richfaces.queue.global";
E.queue=(function(){var W={};
var Q={};
var H=function(Z,e,d,a){this.queue=Z;
this.source=e;
this.options=G.extend({},a||{});
this.queueOptions={};
var f;
if(this.options.queueId){if(W[this.options.queueId]){f=this.options.queueId
}delete this.options.queueId
}else{var b=E.getDomElement(e);
var c;
if(b){b=G(b).closest("form");
if(b.length>0){c=b.get(0)
}}if(c&&c.id&&W[c.id]){f=c.id
}else{f=B
}}if(f){this.queueOptions=W[f]||{};
if(this.queueOptions.queueId){this.queueOptions=G.extend({},(W[this.queueOptions.queueId]||{}),this.queueOptions)
}else{var b=E.getDomElement(e);
var c;
if(b){b=G(b).closest("form");
if(b.length>0){c=b.get(0)
}}if(c&&c.id&&W[c.id]){f=c.id
}else{f=B
}if(f){this.queueOptions=G.extend({},(W[f]||{}),this.queueOptions)
}}}if(typeof this.queueOptions.requestGroupingId=="undefined"){this.queueOptions.requestGroupingId=typeof this.source=="string"?this.source:this.source.id
}if(d&&d instanceof Object){if("layerX" in d){delete d.layerX
}if("layerY" in d){delete d.layerY
}}this.event=G.extend({},d);
this.requestGroupingId=this.queueOptions.requestGroupingId;
this.eventsCount=1
};
G.extend(H.prototype,{isIgnoreDupResponses:function(){return this.queueOptions.ignoreDupResponses
},getRequestGroupId:function(){return this.requestGroupingId
},setRequestGroupId:function(Z){this.requestGroupingId=Z
},resetRequestGroupId:function(){this.requestGroupingId=undefined
},setReadyToSubmit:function(Z){this.readyToSubmit=Z
},getReadyToSubmit:function(){return this.readyToSubmit
},ondrop:function(){var Z=this.queueOptions.onqueuerequestdrop;
if(Z){Z.call(this.queue,this.source,this.options,this.event)
}},onRequestDelayPassed:function(){this.readyToSubmit=true;
S.call(this.queue)
},startTimer:function(){var Z=this.queueOptions.requestDelay;
if(typeof Z!="number"){Z=this.queueOptions.requestDelay||0
}N.debug("Queue will wait "+(Z||0)+"ms before submit");
if(Z){var a=this;
this.timer=window.setTimeout(function(){try{a.onRequestDelayPassed()
}finally{a.timer=undefined;
a=undefined
}},Z)
}else{this.onRequestDelayPassed()
}},stopTimer:function(){if(this.timer){window.clearTimeout(this.timer);
this.timer=undefined
}},clearEntry:function(){this.stopTimer();
if(this.request){this.request.shouldNotifyQueue=false;
this.request=undefined
}},getEventsCount:function(){return this.eventsCount
},setEventsCount:function(Z){this.eventsCount=Z
}});
var V="event";
var L="success";
var K="complete";
var N=E.log;
var R=[];
var T;
var M=function(Z){N.debug("richfaces.queue: ajax submit error");
T=null;
S()
};
var Y=function(Z){if(Z.type==V&&Z.status==L){N.debug("richfaces.queue: ajax submit successfull");
T=null;
S()
}};
A.ajax.addOnEvent(Y);
A.ajax.addOnError(M);
var S=function(){if(C==F&&T){N.debug("richfaces.queue: Waiting for previous submit results");
return 
}if(P()){N.debug("richfaces.queue: Nothing to submit");
return 
}var Z;
if(R[0].getReadyToSubmit()){Z=T=R.shift();
N.debug("richfaces.queue: will submit request NOW");
var a=T.options;
a["AJAX:EVENTS_COUNT"]=T.eventsCount;
E.ajaxContainer.jsfRequest(T.source,T.event,a);
if(a.queueonsubmit){a.queueonsubmit.call(Z)
}J("onrequestdequeue",Z)
}};
var P=function(){return(I()==0)
};
var I=function(){return R.length
};
var X=function(){var Z=R.length-1;
return R[Z]
};
var U=function(Z){var a=R.length-1;
R[a]=Z
};
var J=function(a,d){var b=d.queueOptions[a];
if(b){if(typeof (b)=="string"){new Function(b).call(null,d)
}else{b.call(null,d)
}}var c,Z;
if(d.queueOptions.queueId&&(c=W[d.queueOptions.queueId])&&(Z=c[a])&&Z!=b){Z.call(null,d)
}};
var O=function(Z){R.push(Z);
N.debug("New request added to queue. Queue requestGroupingId changed to "+Z.getRequestGroupId());
J("onrequestqueue",Z)
};
return{DEFAULT_QUEUE_ID:B,getSize:I,isEmpty:P,submitFirst:function(){if(!P()){var Z=R[0];
Z.stopTimer();
Z.setReadyToSubmit(true);
S()
}},push:function(d,c,a){var b=new H(this,d,c,a);
var e=b.getRequestGroupId();
var Z=X();
if(Z){if(Z.getRequestGroupId()==e){N.debug("Similar request currently in queue");
N.debug("Combine similar requests and reset timer");
Z.stopTimer();
b.setEventsCount(Z.getEventsCount()+1);
U(b);
J("onrequestqueue",b)
}else{N.debug("Last queue entry is not the last anymore. Stopping requestDelay timer and marking entry as ready for submission");
Z.stopTimer();
Z.resetRequestGroupId();
Z.setReadyToSubmit(true);
O(b);
S()
}}else{O(b)
}b.startTimer()
},response:function(a,Z){if(this.isIgnoreResponse()){T=null;
S()
}else{E.ajaxContainer.jsfResponse(a,Z)
}},isIgnoreResponse:function(){var Z=R[0];
return Z&&T.isIgnoreDupResponses()&&T.queueOptions.requestGroupingId==Z.queueOptions.requestGroupingId
},clear:function(){var Z=X();
if(Z){Z.stopTimer()
}R=[]
},setQueueOptions:function(b,Z){var a=typeof b;
if(a=="string"){if(W[b]){throw"Queue already registered"
}else{W[b]=Z
}}else{if(a=="object"){G.extend(W,b)
}}return E.queue
},getQueueOptions:function(Z){return W[Z]||{}
}}
}())
}(jQuery,RichFaces,jsf));;(function(F,N){N.csv=N.csv||{};
var H={};
var M=/\'?\{(\d+)\}\'?/g;
var B=function(S,Q){if(S){var U=S.replace(M,"\n$1\n").split("\n");
var T;
for(var R=1;
R<U.length;
R+=2){T=Q[U[R]];
U[R]=typeof T=="undefined"?"":T
}return U.join("")
}else{return""
}};
var G=function(Q){if(null!==Q.value&&undefined!=Q.value){return Q.value
}else{return""
}};
var L=function(Q){if(Q.checked){return true
}else{return false
}};
var P=function(R,Q){if(Q.selected){return R[R.length]=Q.value
}};
var K={hidden:function(Q){return G(Q)
},text:function(Q){return G(Q)
},textarea:function(Q){return G(Q)
},"select-one":function(Q){if(Q.selectedIndex!=-1){return G(Q)
}},password:function(Q){return G(Q)
},file:function(Q){return G(Q)
},radio:function(Q){return L(Q)
},checkbox:function(Q){return L(Q)
},"select-multiple":function(W){var S=W.name;
var V=W.childNodes;
var U=[];
for(var T=0;
T<V.length;
T++){var X=V[T];
if(X.tagName==="OPTGROUP"){var R=X.childNodes;
for(var Q=0;
Q<R.length;
Q++){U=P(U,R[Q])
}}else{U=P(U,X)
}}return U
},input:function(Q){return G(Q)
}};
var E=function(S){var U="";
if(K[S.type]){U=K[S.type](S)
}else{if(undefined!==S.value){U=S.value
}else{var R=F(S);
if(R){if(typeof R.getValue==="function"){U=R.getValue()
}else{var Q=":not(:submit):not(:button):not(:image):input:visible:enabled:first";
var T=F(Q,R);
if(T){var V=T[0];
U=K[V.type](V)
}}}}}return U
};
var D=function(Q,R){if(Q.p){return Q.p.label||R
}return R
};
F.extend(N.csv,{RE_DIGITS:/^-?\d+$/,RE_FLOAT:/^(-?\d+)?(\.(\d+)?(e[+-]?\d+)?)?$/,addMessage:function(Q){F.extend(H,Q)
},getMessage:function(S,R,Q){var T=S?S:H[R]||{detail:"",summary:"",severity:0};
return{detail:B(T.detail,Q),summary:B(T.summary,Q),severity:T.severity}
},interpolateMessage:function(R,Q){return{detail:B(R.detail,Q),summary:B(R.summary,Q),severity:R.severity}
},sendMessage:function(Q,R){N.Event.fire(window.document,N.Event.MESSAGE_EVENT_TYPE,{sourceId:Q,message:R})
},clearMessage:function(Q){N.Event.fire(window.document,N.Event.MESSAGE_EVENT_TYPE,{sourceId:Q})
},validate:function(R,T,Z,X){var Z=N.getDomElement(Z||T);
var c=E(Z);
var S;
var V=X.c;
N.csv.clearMessage(T);
if(V){var b=D(V,T);
try{if(V.f){S=V.f(c,T,D(V,T),V.m)
}}catch(a){a.severity=2;
N.csv.sendMessage(T,a);
return false
}}else{S=c
}var d=true;
var W=X.v;
if(W){var U,Q;
for(var Y=0;
Y<W.length;
Y++){try{Q=W[Y];
U=Q.f;
if(U){U(S,D(Q,T),Q.p,Q.m)
}}catch(a){a.severity=2;
N.csv.sendMessage(T,a);
d=false
}}}if(d&&!X.da&&X.a){X.a.call(Z,R,T)
}return d
}});
var J=function(V,S,W,T,R,U){var Q=null;
if(V){V=F.trim(V);
if(!N.csv.RE_DIGITS.test(V)||(Q=parseInt(V,10))<T||Q>R){throw N.csv.interpolateMessage(W,U?[V,U,S]:[V,S])
}}return Q
};
var A=function(T,R,U,S){var Q=null;
if(T){T=F.trim(T);
if(!N.csv.RE_FLOAT.test(T)||isNaN(Q=parseFloat(T))){throw N.csv.interpolateMessage(U,S?[T,S,R]:[T,R])
}}return Q
};
F.extend(N.csv,{convertBoolean:function(S,Q,U,T){if(typeof S==="string"){var R=F.trim(S).toLowerCase();
if(R==="on"||R==="true"||R==="yes"){return true
}}else{if(true===S){return true
}}return false
},convertDate:function(S,R,U,T){var Q;
S=F.trim(S);
Q=Date.parse(S);
return Q
},convertByte:function(R,Q,T,S){return J(R,Q,S,-128,127,254)
},convertNumber:function(S,R,U,T){var Q;
S=F.trim(S);
Q=parseFloat(S);
if(isNaN(Q)){throw N.csv.interpolateMessage(T,[S,99,R])
}return Q
},convertFloat:function(R,Q,T,S){return A(R,Q,S,2000000000)
},convertDouble:function(R,Q,T,S){return A(R,Q,S,1999999)
},convertShort:function(R,Q,T,S){return J(R,Q,S,-32768,32767,32456)
},convertInteger:function(R,Q,T,S){return J(R,Q,S,-2147483648,2147483648,9346)
},convertCharacter:function(R,Q,T,S){return J(R,Q,S,0,65535)
},convertLong:function(R,Q,T,S){return J(R,Q,S,-9223372036854776000,9223372036854776000,98765432)
}});
var O=function(R,Q,V,U){var T=typeof V.min==="number";
var S=typeof V.max==="number";
if(S&&R>V.max){throw N.csv.interpolateMessage(U,T?[V.min,V.max,Q]:[V.max,Q])
}if(T&&R<V.min){throw N.csv.interpolateMessage(U,S?[V.min,V.max,Q]:[V.min,Q])
}};
var C=function(U,Q,T,W){if(typeof T!="string"||T.length==0){throw N.csv.getMessage(W,"REGEX_VALIDATOR_PATTERN_NOT_SET",[])
}var S=I(T);
var R;
try{R=new RegExp(S)
}catch(V){throw N.csv.getMessage(W,"REGEX_VALIDATOR_MATCH_EXCEPTION",[])
}if(!R.test(U)){throw N.csv.interpolateMessage(W,[T,Q])
}};
var I=function(Q){if(!(Q.slice(0,1)==="^")){Q="^"+Q
}if(!(Q.slice(-1)==="$")){Q=Q;
+"$"
}return Q
};
F.extend(N.csv,{validateLongRange:function(S,Q,U,T){var R=typeof S;
if(R!=="number"){if(R!="string"){throw N.csv.getMessage(T,"LONG_RANGE_VALIDATOR_TYPE",[componentId,""])
}else{S=F.trim(S);
if(!N.csv.RE_DIGITS.test(S)||(S=parseInt(S,10))==NaN){throw N.csv.getMessage(T,"LONG_RANGE_VALIDATOR_TYPE",[componentId,""])
}}}O(S,Q,U,T)
},validateDoubleRange:function(S,Q,U,T){var R=typeof S;
if(R!=="number"){if(R!=="string"){throw N.csv.getMessage(T,"DOUBLE_RANGE_VALIDATOR_TYPE",[componentId,""])
}else{S=F.trim(S);
if(!N.csv.RE_FLOAT.test(S)||(S=parseFloat(S))==NaN){throw N.csv.getMessage(T,"DOUBLE_RANGE_VALIDATOR_TYPE",[componentId,""])
}}}O(S,Q,U,T)
},validateLength:function(S,Q,U,T){var R=S?S.length:0;
O(R,Q,U,T)
},validateSize:function(S,Q,U,T){var R=S?S.length:0;
O(R,Q,U,T)
},validateRegex:function(R,Q,T,S){C(R,Q,T.pattern,S)
},validatePattern:function(R,Q,T,S){C(R,Q,T.regexp,S)
},validateRequired:function(R,Q,T,S){if(undefined===R||null===R||""===R){throw N.csv.interpolateMessage(S,[Q])
}},validateTrue:function(R,Q,T,S){if(R!==true){throw S
}},validateFalse:function(R,Q,T,S){if(R!==false){throw S
}},validateMax:function(R,Q,T,S){if(R>T.value){throw S
}},validateMin:function(R,Q,T,S){if(R<T.value){throw S
}}})
})(jQuery,window.RichFaces||(window.RichFaces={}));;(function(C,B,D){B.blankFunction=function(){};
B.BaseComponent=function(F){this.id=F;
this.options=this.options||{}
};
var A={};
var E=function(H,L,G){G=G||{};
var J=B.blankFunction;
J.prototype=H.prototype;
L.prototype=new J();
L.prototype.constructor=L;
L.$super=H.prototype;
if(L.$super==B.BaseComponent.prototype){var I=jQuery.extend({},A,G||{})
}var K=L;
L.extend=function(F,M){M=M||{};
var N=jQuery.extend({},I||G||{},M||{});
return E(K,F,N)
};
return I||G
};
B.BaseComponent.extend=function(G,F){return E(B.BaseComponent,G,F)
};
B.BaseComponent.extendClass=function(G){var F=G.init||B.blankFunction;
var H=this;
H.extend(F);
F.extendClass=H.extendClass;
C.extend(F.prototype,G);
return F
};
C.extend(B.BaseComponent.prototype,(function(F){return{name:"BaseComponent",toString:function(){var G=[];
if(this.constructor.$super){G[G.length]=this.constructor.$super.toString()
}G[G.length]=this.name;
return G.join(", ")
},getValue:function(){return 
},getEventElement:function(){return this.id
},attachToDom:function(I){I=I||this.id;
var H=B.getDomElement(I);
if(H){var G=H[B.RICH_CONTAINER]=H[B.RICH_CONTAINER]||{};
G.component=this
}return H
},detach:function(H){H=H||this.id;
var G=B.getDomElement(H);
G&&G[B.RICH_CONTAINER]&&(G[B.RICH_CONTAINER].component=null)
},invokeEvent:function(J,I,L,N){var K,G;
var M=C.extend({},L,{type:J});
if(!M){if(document.createEventObject){M=document.createEventObject();
M.type=J
}else{if(document.createEvent){M=document.createEvent("Events");
M.initEvent(J,true,false)
}}}M[B.RICH_CONTAINER]={component:this,data:N};
var H=this.options["on"+J];
if(typeof H=="function"){K=H.call(I,M)
}if(B.Event){G=B.Event.callHandler(this,J,N)
}if(G!=false&&K!=false){G=true
}return G
},destroy:function(){}}
})(D));
B.BaseNonVisualComponent=function(F){this.id=F;
this.options=this.options||{}
};
B.BaseNonVisualComponent.extend=function(G,F){return E(B.BaseNonVisualComponent,G,F)
};
B.BaseNonVisualComponent.extendClass=function(G){var F=G.init||B.blankFunction;
var H=this;
H.extend(F);
F.extendClass=H.extendClass;
C.extend(F.prototype,G);
return F
};
C.extend(B.BaseNonVisualComponent.prototype,(function(F){return{name:"BaseNonVisualComponent",toString:function(){var G=[];
if(this.constructor.$super){G[G.length]=this.constructor.$super.toString()
}G[G.length]=this.name;
return G.join(", ")
},getValue:function(){return 
},attachToDom:function(I){I=I||this.id;
var H=B.getDomElement(I);
if(H){var G=H[B.RICH_CONTAINER]=H[B.RICH_CONTAINER]||{};
if(G.attachedComponents){G.attachedComponents[this.name]=this
}else{G.attachedComponents={};
G.attachedComponents[this.name]=this
}}return H
},detach:function(H){H=H||this.id;
var G=B.getDomElement(H);
G&&G[B.RICH_CONTAINER]&&(G[B.RICH_CONTAINER].attachedComponents[this.name]=null)
},destroy:function(){}}
})(D))
})(jQuery,window.RichFaces||(window.RichFaces={}));
(function(B,A){A.ui=A.ui||{};
A.ui.Base=function(F,E,D){this.namespace="."+A.Event.createNamespace(this.name,F);
C.constructor.call(this,F);
this.options=B.extend(this.options,D,E);
this.attachToDom();
this.__bindEventHandlers()
};
A.BaseComponent.extend(A.ui.Base);
var C=A.ui.Base.$super;
B.extend(A.ui.Base.prototype,{__bindEventHandlers:function(){},destroy:function(){A.Event.unbindById(this.id,this.namespace);
C.destroy.call(this)
}})
})(jQuery,window.RichFaces||(window.RichFaces={}));;(function(E){E.fn.setPosition=function(Q,R){var M=typeof Q;
if(M=="object"||M=="string"){var O={};
if(M=="string"||Q.nodeType||Q instanceof jQuery||typeof Q.length!="undefined"){O=H(Q)
}else{if(Q.type){O=C(Q)
}else{if(Q.id){O=H(document.getElementById(Q.id))
}else{O=Q
}}}var R=R||{};
var P=R.type||R.from||R.to?E.PositionTypes[R.type||G]:{noPositionType:true};
var N=E.extend({},D,P,R);
if(!N.noPositionType){if(N.from.length>2){N.from=B[N.from.toLowerCase()]
}if(N.to.length>2){N.to=B[N.to.toLowerCase()]
}}return this.each(function(){element=E(this);
F(O,element,N)
})
}return this
};
var G="TOOLTIP";
var D={collision:"",offset:[0,0]};
var K=/^(left|right)-(top|buttom|auto)$/i;
var B={"top-left":"LT","top-right":"RT","bottom-left":"LB","bottom-right":"RB","top-auto":"AT","bottom-auto":"AB","auto-left":"LA","auto-right":"RA","auto-auto":"AA"};
E.PositionTypes={TOOLTIP:{from:"AA",to:"AA",auto:["RTRT","RBRT","LTRT","RTLT","LTLT","LBLT","RTRB","RBRB","LBRB","RBLB"]},DROPDOWN:{from:"AA",to:"AA",auto:["LBRB","LTRT","RBLB","RTLT"]},DDMENUGROUP:{from:"AA",to:"AA",auto:["RTRB","RBRT","LTLB","LBLT"]}};
E.addPositionType=function(N,M){E.PositionTypes[N]=M
};
function C(M){var N=E.event.fix(M);
return{width:0,height:0,left:N.pageX,top:N.pageY}
}function H(P){var N=E(P);
var O=N.offset();
var T={width:N.outerWidth(),height:N.outerHeight(),left:Math.floor(O.left),top:Math.floor(O.top)};
if(N.length>1){var M,U,O;
var R;
for(var Q=1;
Q<N.length;
Q++){R=N.eq(Q);
if(R.css("display")=="none"){continue
}M=R.outerWidth();
U=R.outerHeight();
O=R.offset();
var S=T.left-O.left;
if(S<0){if(M-S>T.width){T.width=M-S
}}else{T.width+=S
}var S=T.top-O.top;
if(S<0){if(U-S>T.height){T.height=U-S
}}else{T.height+=S
}if(O.left<T.left){T.left=O.left
}if(O.top<T.top){T.top=O.top
}}}return T
}function J(M,N){if(M.left>=N.left&&M.top>=N.top&&M.right<=N.right&&M.bottom<=N.bottom){return 0
}var O={left:(M.left>N.left?M.left:N.left),top:(M.top>N.top?M.top:N.top)};
O.right=M.right<N.right?(M.right==M.left?O.left:M.right):N.right;
O.bottom=M.bottom<N.bottom?(M.bottom==M.top?O.top:M.bottom):N.bottom;
return(O.right-O.left)*(O.bottom-O.top)
}function A(Q,O,M,R){var P={};
var N=R.charAt(0);
if(N=="L"){P.left=Q.left
}else{if(N=="R"){P.left=Q.left+Q.width
}}N=R.charAt(1);
if(N=="T"){P.top=Q.top
}else{if(N=="B"){P.top=Q.top+Q.height
}}N=R.charAt(2);
if(N=="L"){P.left-=O[0];
P.right=P.left;
P.left-=M.width
}else{if(N=="R"){P.left+=O[0];
P.right=P.left+M.width
}}N=R.charAt(3);
if(N=="T"){P.top-=O[1];
P.bottom=P.top;
P.top-=M.height
}else{if(N=="B"){P.top+=O[1];
P.bottom=P.top+M.height
}}return P
}function I(O,N){var M="";
var P;
while(M.length<O.length){P=O.charAt(M.length);
M+=P=="A"?N.charAt(M.length):P
}return M
}function L(T,O,R,X,Z){var W={square:0};
var V;
var Y;
var P,N;
var M=Z.from+Z.to;
if(M.indexOf("A")<0){return A(T,O,X,M)
}else{var S=M=="AAAA";
var U;
for(var Q=0;
Q<Z.auto.length;
Q++){U=S?Z.auto[Q]:I(M,Z.auto[Q]);
V=A(T,O,X,U);
P=V.left;
N=V.top;
Y=J(V,R);
if(Y!=0){if(P>=0&&N>=0&&W.square<Y){W={x:P,y:N,square:Y}
}}else{break
}}if(Y!=0&&(P<0||N<0||W.square>Y)){P=W.x;
N=W.y
}}return{left:P,top:N}
}function F(X,R,Z){var O=R.width();
var Y=R.height();
X.width=X.width||0;
X.height=X.height||0;
var Q=parseInt(R.css("left"),10);
if(isNaN(Q)||Q==0){Q=0;
R.css("left","0px")
}if(isNaN(X.left)){X.left=Q
}var W=parseInt(R.css("top"),10);
if(isNaN(W)||W==0){W=0;
R.css("top","0px")
}if(isNaN(X.top)){X.top=W
}var V={};
if(Z.noPositionType){V.left=X.left+X.width+Z.offset[0];
V.top=X.top+Z.offset[1]
}else{var S=E(window);
var P={left:S.scrollLeft(),top:S.scrollTop()};
P.right=P.left+S.width();
P.bottom=P.top+S.height();
V=L(X,Z.offset,P,{width:O,height:Y},Z)
}var N=false;
var U;
var T;
if(R.css("display")=="none"){N=true;
T=R.get(0);
U=T.style.visibility;
T.style.visibility="hidden";
T.style.display="block"
}var M=R.offset();
if(N){T.style.visibility=U;
T.style.display="none"
}V.left+=Q-Math.floor(M.left);
V.top+=W-Math.floor(M.top);
if(Q!=V.left){R.css("left",(V.left+"px"))
}if(W!=V.top){R.css("top",(V.top+"px"))
}}})(jQuery);;if(!window.RichFaces){window.RichFaces={}
}(function(jquery,richfaces){var evaluate=function(selector){var result=selector;
try{result=eval(selector)
}catch(e){}return result
};
var evaluateJQuery=function(element,selector){var result=element||evaluate(selector);
if(!(result instanceof jquery)){result=jquery(result||"")
}return result
};
var createEventHandlerFunction=function(opts){return function(){var selector=evaluateJQuery(null,opts.selector);
selector[opts.attachType||"bind"](opts.event,null,new Function("event",opts.query))
}
};
var createDirectQueryFunction=function(opts){var queryFunction=new Function("options","arguments[1]."+opts.query);
return function(){var element;
var options;
if(arguments.length==1){options=arguments[0]
}else{element=arguments[0];
options=arguments[1]
}var selector=evaluateJQuery(element,opts.selector);
queryFunction.call(this,options,selector)
}
};
var createQueryFunction=function(options){if(options.event){return createEventHandlerFunction(options)
}else{return createDirectQueryFunction(options)
}};
var query=function(options){if(options.timing=="immediate"){createQueryFunction(options).call(this)
}else{jquery(document).ready(createQueryFunction(options))
}};
richfaces.jQuery={createFunction:createQueryFunction,query:query}
}(jQuery,RichFaces));;(function(C,B){B.ui=B.ui||{};
B.ui.DragIndicator=function(F,E){D.constructor.call(this,F);
this.attachToDom(F);
this.indicator=C(document.getElementById(F));
this.options=E
};
var A={};
B.BaseComponent.extend(B.ui.DragIndicator);
var D=B.ui.DragIndicator.$super;
C.extend(B.ui.DragIndicator.prototype,(function(){return{show:function(){this.indicator.show()
},hide:function(){this.indicator.hide()
},getAcceptClass:function(){return this.options.acceptClass
},getRejectClass:function(){return this.options.rejectClass
},getDraggingClass:function(){return this.options.draggingClass
},getElement:function(){return this.indicator
}}
})())
})(jQuery,window.RichFaces);;(function(A,E){var D=["debug","info","warn","error"];
var F={debug:"debug",info:"info ",warn:"warn ",error:"error"};
var C={debug:1,info:2,warn:3,error:4};
var H={__import:function(M,L){if(M===document){return L
}var I=A();
for(var K=0;
K<L.length;
K++){if(M.importNode){I=I.add(M.importNode(L[K],true))
}else{var J=M.createElement("div");
J.innerHTML=L[K].outerHTML;
for(var N=J.firstChild;
N;
N=N.nextSibling){I=I.add(N)
}}}return I
},__getStyles:function(){var J=jQuery("head");
if(J.length==0){return""
}try{var K=J.clone();
if(K.children().length==J.children().length){return K.children(":not(style):not(link[rel='stylesheet'])").remove().end().html()
}else{var I=new Array();
J.children("style, link[rel='stylesheet']").each(function(){I.push(this.outerHTML)
});
return I.join("")
}}catch(L){return""
}},__openPopup:function(){if(!this.__popupWindow||this.__popupWindow.closed){this.__popupWindow=open("","_richfaces_logWindow","height=400, width=600, resizable = yes, status=no, scrollbars = yes, statusbar=no, toolbar=no, menubar=no, location=no");
var I=this.__popupWindow.document;
I.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head>'+this.__getStyles()+"</head><body onunload='window.close()'><div id='richfaces.log' clas='rf-log rf-log-popup'></div></body></html>");
I.close();
this.__initializeControls(I)
}else{this.__popupWindow.focus()
}},__hotkeyHandler:function(I){if(I.ctrlKey&&I.shiftKey){if((this.hotkey||"l").toLowerCase()==String.fromCharCode(I.keyCode).toLowerCase()){this.__openPopup()
}}},__getTimeAsString:function(){var I=new Date();
var J=this.__lzpad(I.getHours(),2)+":"+this.__lzpad(I.getMinutes(),2)+":"+this.__lzpad(I.getSeconds(),2)+"."+this.__lzpad(I.getMilliseconds(),3);
return J
},__lzpad:function(K,L){K=K.toString();
var I=new Array();
for(var J=0;
J<L-K.length;
J++){I.push("0")
}I.push(K);
return I.join("")
},__getMessagePrefix:function(I){return F[I]+"["+this.__getTimeAsString()+"]: "
},__setLevelFromSelect:function(I){this.setLevel(I.target.value)
},__initializeControls:function(M){var K=A("#richfaces\\.log",M);
var J=K.children("button.rf-log-element");
if(J.length==0){J=A("<button type='button' class='rf-log-element'>Clear</button>",M).appendTo(K)
}J.click(A.proxy(this.clear,this));
var N=K.children("select.rf-log-element");
if(N.length==0){N=A("<select class='rf-log-element' name='richfaces.log' />",M).appendTo(K)
}if(N.children().length==0){for(var I=0;
I<D.length;
I++){A("<option value='"+D[I]+"'>"+D[I]+"</option>",M).appendTo(N)
}}N.val(this.getLevel());
N.change(A.proxy(this.__setLevelFromSelect,this));
var L=K.children(".rf-log-contents");
if(L.length==0){L=A("<div class='rf-log-contents'></div>",M).appendTo(K)
}this.__contentsElement=L
},__append:function(I){var K=this.__contentsElement;
if(this.mode=="popup"){var J=this.__popupWindow.document;
A(J.createElement("div")).appendTo(K).append(this.__import(J,I))
}else{A(document.createElement("div")).appendTo(K).append(I)
}},__log:function(L,I){if(this.mode=="console"){console[L]("RichFaces: "+I);
return 
}if(!this.__contentsElement){return 
}if(C[L]>=C[this.getLevel()]){var J=A();
J=J.add(A("<span class='rf-log-entry-lbl rf-log-entry-lbl-"+L+"'></span>").text(this.__getMessagePrefix(L)));
var K=A("<span class='rf-log-entry-msg rf-log-entry-msg-"+L+"'></span>");
if(typeof I!="object"||!I.appendTo){K.text(I)
}else{I.appendTo(K)
}J=J.add(K);
this.__append(J)
}},init:function(I){G.constructor.call(this,"richfaces.log");
this.attachToDom();
E.setLog(this);
I=I||{};
this.level=I.level;
this.hotkey=I.hotkey;
this.mode=(I.mode||"inline");
if(this.mode=="console"){}else{if(this.mode=="popup"){this.__boundHotkeyHandler=A.proxy(this.__hotkeyHandler,this);
A(document).bind("keydown",this.__boundHotkeyHandler)
}else{this.__initializeControls(document)
}}},destroy:function(){E.setLog(null);
if(this.__popupWindow){this.__popupWindow.close()
}this.__popupWindow=null;
if(this.__boundHotkeyHandler){A(document).unbind("keydown",this.__boundHotkeyHandler);
this.__boundHotkeyHandler=null
}this.__contentsElement=null;
G.destroy.call(this)
},setLevel:function(I){this.level=I;
this.clear()
},getLevel:function(){return this.level||"info"
},clear:function(){if(this.__contentsElement){this.__contentsElement.children().remove()
}}};
for(var B=0;
B<D.length;
B++){H[D[B]]=(function(){var I=D[B];
return function(J){this.__log(I,J)
}
}())
}E.HtmlLog=E.BaseComponent.extendClass(H);
var G=E.HtmlLog.$super;
jQuery(document).ready(function(){if(typeof jsf!="undefined"){(function(N,M,I){var P=function(R){var Q="<"+R.tagName.toLowerCase();
var S=N(R);
if(S.attr("id")){Q+=(" id="+S.attr("id"))
}if(S.attr("class")){Q+=(" class="+S.attr("class"))
}Q+=" ...>";
return Q
};
var L=function(Q,S){var R=N(S);
Q.append("Element <b>"+S.nodeName+"</b>");
if(R.attr("id")){Q.append(document.createTextNode(" for id="+R.attr("id")))
}N(document.createElement("br")).appendTo(Q);
N("<span class='rf-log-entry-msg-xml'></span>").appendTo(Q).text(R.toXML());
N(document.createElement("br")).appendTo(Q)
};
var O=function(Q){var R=N(document.createElement("span"));
Q.children().each(function(){var S=N(this);
if(S.is("changes")){R.append("Listing content of response <b>changes</b> element:<br />");
S.children().each(function(){L(R,this)
})
}else{L(R,this)
}});
return R
};
var K=function(U){try{var S=M.log;
var Q=U.source;
var X=U.type;
var Z=U.responseCode;
var Y=U.responseXML;
var W=U.responseText;
if(X!="error"){S.info("Received '"+X+"' event from "+P(Q));
if(X=="beforedomupdate"){var T;
if(Y){T=N(Y).children("partial-response")
}var a=N("<span>Server returned responseText: </span><span class='rf-log-entry-msg-xml'></span>").eq(1).text(W).end();
if(T&&T.length){S.debug(a);
S.info(O(T))
}else{S.info(a)
}}}else{var R=U.status;
S.error("Received '"+X+"@"+R+"' event from "+P(Q));
S.error("["+U.responseCode+"] "+U.errorName+": "+U.errorMessage)
}}catch(V){}};
var J=M.createJSFEventsAdapter({begin:K,beforedomupdate:K,success:K,complete:K,error:K});
I.ajax.addOnEvent(J);
I.ajax.addOnError(J)
}(jQuery,RichFaces,jsf))
}})
}(jQuery,RichFaces));;(function(C,B){B.ui=B.ui||{};
var A={};
B.ui.Poll=function(F,E){D.constructor.call(this,F,E);
this.id=F;
this.attachToDom();
this.interval=E.interval||1000;
this.ontimer=E.ontimer;
this.pollElement=B.getDomElement(this.id);
B.ui.pollTracker=B.ui.pollTracker||{};
if(E.enabled){this.startPoll()
}};
B.BaseComponent.extend(B.ui.Poll);
var D=B.ui.Poll.$super;
C.extend(B.ui.Poll.prototype,(function(){return{name:"Poll",startPoll:function(){this.stopPoll();
var E=this;
B.ui.pollTracker[E.id]=window.setTimeout(function(){try{E.ontimer.call(E.pollElement||window);
E.startPoll()
}catch(F){}},E.interval)
},stopPoll:function(){if(B.ui.pollTracker&&B.ui.pollTracker[this.id]){window.clearTimeout(B.ui.pollTracker[this.id]);
delete B.ui.pollTracker[this.id]
}},setZeroRequestDelay:function(E){if(typeof E.requestDelay=="undefined"){E.requestDelay=0
}},destroy:function(){this.stopPoll();
this.detach(this.id);
D.destroy.call(this)
}}
})())
})(jQuery,RichFaces);;function toolbarHandlers(C){if(C.id&&C.events){jQuery(".rf-tb-itm",document.getElementById(C.id)).bind(C.events)
}var A=C.groups;
if(A&&A.length>0){var F;
var D;
for(D in A){F=A[D];
if(F){var B=F.ids;
var G;
var E=[];
for(G in B){E.push(document.getElementById(B[G]))
}jQuery(E).bind(F.events)
}}}};;(function(E,F){var D=function(){return E.statusName
};
var A="richfaces:ajaxStatus";
var G=function(H){return H?(A+"@"+H):A
};
var C=function(O,S){if(S){var N=D();
var H=O.source;
var R=false;
var J=G(N);
var I;
if(N){I=[F(document)]
}else{I=[F(H).parents("form"),F(document)]
}for(var P=0;
P<I.length&&!R;
P++){var L=I[P];
var K=L.data(J);
if(K){for(var Q in K){var M=K[Q];
var T=M[S].apply(M,arguments);
if(T){R=true
}else{delete K[Q]
}}if(!R){L.removeData(J)
}}}}};
var B=function(){var H=arguments.callee;
if(!H.initialized){H.initialized=true;
var I=E.createJSFEventsAdapter({begin:function(J){C(J,"start")
},error:function(J){C(J,"error")
},success:function(J){C(J,"success")
},complete:function(){E.setGlobalStatusNameVariable(null)
}});
jsf.ajax.addOnEvent(I);
jsf.ajax.addOnError(I)
}};
E.ui=E.ui||{};
E.ui.Status=E.BaseComponent.extendClass({name:"Status",init:function(I,H){this.id=I;
this.attachToDom();
this.options=H||{};
this.register()
},register:function(){B();
var J=this.options.statusName;
var H=G(J);
var I;
if(J){I=F(document)
}else{I=F(E.getDomElement(this.id)).parents("form");
if(I.length==0){I=F(document)
}}var K=I.data(H);
if(!K){K={};
I.data(H,K)
}K[this.id]=this
},start:function(){if(this.options.onstart){this.options.onstart.apply(this,arguments)
}return this.__showHide(".rf-st-start")
},stop:function(){this.__stop();
return this.__showHide(".rf-st-stop")
},success:function(){if(this.options.onsuccess){this.options.onsuccess.apply(this,arguments)
}return this.stop()
},error:function(){if(this.options.onerror){this.options.onerror.apply(this,arguments)
}this.__stop();
return this.__showHide(":not(.rf-st-error) + .rf-st-stop, .rf-st-error")
},__showHide:function(H){var I=F(E.getDomElement(this.id));
if(I){var J=I.children();
J.each(function(){var K=F(this);
K.css("display",K.is(H)?"":"none")
});
return true
}return false
},__stop:function(){if(this.options.onstop){this.options.onstop.apply(this,arguments)
}}})
}(window.RichFaces,jQuery));;(function(B,A){A.ui=A.ui||{};
A.ui.DataTable=function(E,D){C.constructor.call(this,E);
this.options=B.extend(this.options,D||{});
this.attachToDom()
};
A.BaseComponent.extend(A.ui.DataTable);
var C=A.ui.DataTable.$super;
B.extend(A.ui.DataTable,{SORTING:"rich:sorting",FILTERING:"rich:filtering",SUBTABLE_SELECTOR:".rf-cst"});
B.extend(A.ui.DataTable.prototype,(function(){var D=function(G,F){A.ajax(this.id,G,{parameters:F})
};
var E=function(J,L,H,G){var K={};
var I=this.id+J;
K[I]=(L+":"+(H||"")+":"+G);
var F=this.options.ajaxEventOption;
for(I in F){if(!K[I]){K[I]=F[I]
}}return K
};
return{name:"RichFaces.ui.DataTable",sort:function(G,H,F){D.call(this,null,E.call(this,A.ui.DataTable.SORTING,G,H,F))
},clearSorting:function(){this.sort("","",true)
},filter:function(G,H,F){D.call(this,null,E.call(this,A.ui.DataTable.FILTERING,G,H,F))
},clearFiltering:function(){this.filter("","",true)
},expandAllSubTables:function(){this.invokeOnSubTables("expand")
},collapseAllSubTables:function(){this.invokeOnSubTables("collapse")
},switchSubTable:function(F){this.getSubTable(F).switchState()
},getSubTable:function(F){return A.$(F)
},invokeOnSubTables:function(G){var F=B(document.getElementById(this.id)).children(A.ui.DataTable.SUBTABLE_SELECTOR);
var H=this.invokeOnComponent;
F.each(function(){if(this.firstChild&&this.firstChild[A.RICH_CONTAINER]&&this.firstChild[A.RICH_CONTAINER].component){var I=this.firstChild[A.RICH_CONTAINER].component;
if(I instanceof RichFaces.ui.CollapsibleSubTable){H(I,G)
}}})
},invokeOnSubTable:function(H,G){var F=this.getSubTable(H);
this.invokeOnComponent(F,G)
},invokeOnComponent:function(F,H){if(F){var G=F[H];
if(typeof G=="function"){G.call(F)
}}},destroy:function(){C.destroy.call(this)
}}
})())
})(jQuery,window.RichFaces);;(function(B,A){A.ui=A.ui||{};
A.ui.CollapsibleSubTable=function(F,E,D){this.id=F;
this.stateInput=D.stateInput;
this.optionsInput=D.optionsInput;
this.expandMode=D.expandMode||A.ui.CollapsibleSubTable.MODE_CLNT;
this.eventOptions=D.eventOptions;
this.formId=E;
this.attachToDom()
};
B.extend(A.ui.CollapsibleSubTable,{MODE_AJAX:"ajax",MODE_SRV:"server",MODE_CLNT:"client",collapse:0,expand:1});
A.BaseComponent.extend(A.ui.CollapsibleSubTable);
var C=A.ui.CollapsibleSubTable.$super;
B.extend(A.ui.CollapsibleSubTable.prototype,(function(){var E=function(){return B(document.getElementById(this.id)).parent()
};
var F=function(){return B(document.getElementById(this.stateInput))
};
var I=function(){return B(document.getElementById(this.optionsInput))
};
var G=function(K,J){this.__switchState();
A.ajax(this.id,K,J)
};
var H=function(J){this.__switchState();
B(document.getElementById(this.formId)).submit()
};
var D=function(J){if(this.isExpanded()){this.collapse(J)
}else{this.expand(J)
}};
return{name:"CollapsibleSubTable",switchState:function(K,J){if(this.expandMode==A.ui.CollapsibleSubTable.MODE_AJAX){G.call(this,K,this.eventOptions,J)
}else{if(this.expandMode==A.ui.CollapsibleSubTable.MODE_SRV){H.call(this,J)
}else{if(this.expandMode==A.ui.CollapsibleSubTable.MODE_CLNT){D.call(this,J)
}}}},collapse:function(J){this.setState(A.ui.CollapsibleSubTable.collapse);
E.call(this).hide()
},expand:function(J){this.setState(A.ui.CollapsibleSubTable.expand);
E.call(this).show()
},isExpanded:function(){return(parseInt(this.getState())==A.ui.CollapsibleSubTable.expand)
},__switchState:function(J){var K=this.isExpanded()?A.ui.CollapsibleSubTable.collapse:A.ui.CollapsibleSubTable.expand;
this.setState(K)
},getState:function(){return F.call(this).val()
},setState:function(J){F.call(this).val(J)
},setOption:function(J){I.call(this).val(J)
},getMode:function(){return this.expandMode
},destroy:function(){C.destroy.call(this)
}}
})())
})(jQuery,window.RichFaces);;(function(E,C){C.Event=C.Event||{};
var B=function(F){if(!F){throw"RichFaces.Event: empty selector"
}var G;
if(RichFaces.BaseComponent&&F instanceof RichFaces.BaseComponent){G=E(C.getDomElement(F.getEventElement()))
}else{G=E(F)
}return G
};
var D=function(F,G){return function(H,I){if(!H[C.RICH_CONTAINER]){H[C.RICH_CONTAINER]={data:I}
}return G.call(F||this,H,this,I)
}
};
var A=function(H,G){var F={};
for(var I in H){F[I]=D(G,H[I])
}return F
};
E.extend(C.Event,{RICH_NAMESPACE:"RICH",EVENT_NAMESPACE_SEPARATOR:".",MESSAGE_EVENT_TYPE:"onmessage",ready:function(F){return E(document).ready(F)
},bind:function(F,H,I,G,K){if(typeof H=="object"){B(F).bind(A(H,I),K)
}else{var J=D(G,I);
B(F).bind(H,K,J);
return J
}},bindById:function(K,G,H,F,J){if(typeof G=="object"){E(document.getElementById(K)).bind(A(G,H),J)
}else{var I=D(F,H);
E(document.getElementById(K)).bind(G,J,I)
}return I
},bindOne:function(F,H,I,G,K){var J=D(G,I);
B(F).one(H,K,J);
return J
},bindOneById:function(K,G,H,F,J){var I=D(F,H);
E(document.getElementById(K)).one(G,J,I);
return I
},unbind:function(F,G,H){return B(F).unbind(G,H)
},unbindById:function(H,F,G){return E(document.getElementById(H)).unbind(F,G)
},bindScrollEventHandlers:function(G,H,F){var I=[];
G=C.getDomElement(G).parentNode;
while(G&&G!=window.document.body){if(G.offsetWidth!=G.scrollWidth||G.offsetHeight!=G.scrollHeight){I.push(G);
C.Event.bind(G,"scroll"+F.getNamespace(),H,F)
}G=G.parentNode
}return I
},unbindScrollEventHandlers:function(G,F){C.Event.unbind(G,"scroll"+F.getNamespace())
},fire:function(F,G,I){var H=E.Event(G);
B(F).trigger(H,[I]);
return !H.isDefaultPrevented()
},fireById:function(I,F,H){var G=E.Event(F);
E(document.getElementById(I)).trigger(G,[H]);
return !G.isDefaultPrevented()
},callHandler:function(F,G,H){return B(F).triggerHandler(G,[H])
},callHandlerById:function(H,F,G){return E(document.getElementById(H)).triggerHandler(F,[G])
},createNamespace:function(G,I,H){var F=[];
F.push(H||C.Event.RICH_NAMESPACE);
if(G){F.push(G)
}if(I){F.push(I)
}return F.join(C.Event.EVENT_NAMESPACE_SEPARATOR)
}})
})(jQuery,window.RichFaces||(window.RichFaces={}));;/* Copyright (c) 2010 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.4
 * 
 * Requires: 1.2.2+
 */
(function(C){var A=["DOMMouseScroll","mousewheel"];
C.event.special.mousewheel={setup:function(){if(this.addEventListener){for(var D=A.length;
D;
){this.addEventListener(A[--D],B,false)
}}else{this.onmousewheel=B
}},teardown:function(){if(this.removeEventListener){for(var D=A.length;
D;
){this.removeEventListener(A[--D],B,false)
}}else{this.onmousewheel=null
}}};
C.fn.extend({mousewheel:function(D){return D?this.bind("mousewheel",D):this.trigger("mousewheel")
},unmousewheel:function(D){return this.unbind("mousewheel",D)
}});
function B(I){var G=I||window.event,F=[].slice.call(arguments,1),J=0,H=true,E=0,D=0;
I=C.event.fix(G);
I.type="mousewheel";
if(I.wheelDelta){J=I.wheelDelta/120
}if(I.detail){J=-I.detail/3
}D=J;
if(G.axis!==undefined&&G.axis===G.HORIZONTAL_AXIS){D=0;
E=-1*J
}if(G.wheelDeltaY!==undefined){D=G.wheelDeltaY/120
}if(G.wheelDeltaX!==undefined){E=-1*G.wheelDeltaX/120
}F.unshift(I,J,E,D);
return C.event.handle.apply(this,F)
}})(jQuery);;(function(D,A){A.ui=A.ui||{};
var C=function(K,I,G){var M;
var J=function(N){N.data.fn.call(N.data.component,N)
};
var L={};
L.component=G;
for(M in K){var H=D(document.getElementById(M));
L.id=M;
L.page=K[M];
L.element=H;
L.fn=G.processClick;
H.bind("click",F(L),J)
}};
var F=function(I){var G;
var H={};
for(G in I){H[G]=I[G]
}return H
};
var B=function(G,H){if(H.type=="mousedown"){G.addClass("rf-ds-press")
}else{if(H.type=="mouseup"||H.type=="mouseout"){G.removeClass("rf-ds-press")
}}};
A.ui.DataScroller=function(K,J,G){E.constructor.call(this,K);
var I=this.attachToDom();
this.options=G;
this.currentPage=G.currentPage;
if(J&&typeof J=="function"){RichFaces.Event.bindById(K,this.getScrollEventName(),J)
}var H={};
if(G.buttons){D(I).delegate(".rf-ds-btn","mouseup mousedown mouseout",function(L){if(D(this).hasClass("rf-ds-dis")){D(this).removeClass("rf-ds-press")
}else{B(D(this),L)
}});
C(G.buttons.left,H,this);
C(G.buttons.right,H,this)
}if(G.digitals){D(I).delegate(".rf-ds-nmb-btn","mouseup mousedown mouseout",function(L){B(D(this),L)
});
C(G.digitals,H,this)
}};
A.BaseComponent.extend(A.ui.DataScroller);
var E=A.ui.DataScroller.$super;
D.extend(A.ui.DataScroller.prototype,(function(){var G="rich:datascroller:onscroll";
return{name:"RichFaces.ui.DataScroller",processClick:function(H){var J=H.data;
if(J){var I=J.page;
if(I){this.switchToPage(I)
}}},switchToPage:function(H){if(typeof H!="undefined"&&H!=null){RichFaces.Event.fireById(this.id,this.getScrollEventName(),{page:H})
}},fastForward:function(){this.switchToPage("fastforward")
},fastRewind:function(){this.switchToPage("fastrewind")
},next:function(){this.switchToPage("next")
},previous:function(){this.switchToPage("previous")
},first:function(){this.switchToPage("first")
},last:function(){this.switchToPage("last")
},getScrollEventName:function(){return G
},destroy:function(){E.destroy.call(this)
}}
})())
})(jQuery,window.RichFaces);;/*
 * jQuery UI 1.8.6
 *
 * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI
 */
(function(A,C){A.ui=A.ui||{};
if(A.ui.version){return 
}A.extend(A.ui,{version:"1.8.6",keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}});
A.fn.extend({_focus:A.fn.focus,focus:function(D,E){return typeof D==="number"?this.each(function(){var F=this;
setTimeout(function(){A(F).focus();
if(E){E.call(F)
}},D)
}):this._focus.apply(this,arguments)
},scrollParent:function(){var D;
if((A.browser.msie&&(/(static|relative)/).test(this.css("position")))||(/absolute/).test(this.css("position"))){D=this.parents().filter(function(){return(/(relative|absolute|fixed)/).test(A.curCSS(this,"position",1))&&(/(auto|scroll)/).test(A.curCSS(this,"overflow",1)+A.curCSS(this,"overflow-y",1)+A.curCSS(this,"overflow-x",1))
}).eq(0)
}else{D=this.parents().filter(function(){return(/(auto|scroll)/).test(A.curCSS(this,"overflow",1)+A.curCSS(this,"overflow-y",1)+A.curCSS(this,"overflow-x",1))
}).eq(0)
}return(/fixed/).test(this.css("position"))||!D.length?A(document):D
},zIndex:function(G){if(G!==C){return this.css("zIndex",G)
}if(this.length){var E=A(this[0]),D,F;
while(E.length&&E[0]!==document){D=E.css("position");
if(D==="absolute"||D==="relative"||D==="fixed"){F=parseInt(E.css("zIndex"),10);
if(!isNaN(F)&&F!==0){return F
}}E=E.parent()
}}return 0
},disableSelection:function(){return this.bind((A.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(D){D.preventDefault()
})
},enableSelection:function(){return this.unbind(".ui-disableSelection")
}});
A.each(["Width","Height"],function(F,D){var E=D==="Width"?["Left","Right"]:["Top","Bottom"],G=D.toLowerCase(),I={innerWidth:A.fn.innerWidth,innerHeight:A.fn.innerHeight,outerWidth:A.fn.outerWidth,outerHeight:A.fn.outerHeight};
function H(L,K,J,M){A.each(E,function(){K-=parseFloat(A.curCSS(L,"padding"+this,true))||0;
if(J){K-=parseFloat(A.curCSS(L,"border"+this+"Width",true))||0
}if(M){K-=parseFloat(A.curCSS(L,"margin"+this,true))||0
}});
return K
}A.fn["inner"+D]=function(J){if(J===C){return I["inner"+D].call(this)
}return this.each(function(){A(this).css(G,H(this,J)+"px")
})
};
A.fn["outer"+D]=function(J,K){if(typeof J!=="number"){return I["outer"+D].call(this,J)
}return this.each(function(){A(this).css(G,H(this,J,true,K)+"px")
})
}
});
function B(D){return !A(D).parents().andSelf().filter(function(){return A.curCSS(this,"visibility")==="hidden"||A.expr.filters.hidden(this)
}).length
}A.extend(A.expr[":"],{data:function(F,E,D){return !!A.data(F,D[3])
},focusable:function(F){var I=F.nodeName.toLowerCase(),D=A.attr(F,"tabindex");
if("area"===I){var H=F.parentNode,G=H.name,E;
if(!F.href||!G||H.nodeName.toLowerCase()!=="map"){return false
}E=A("img[usemap=#"+G+"]")[0];
return !!E&&B(E)
}return(/input|select|textarea|button|object/.test(I)?!F.disabled:"a"==I?F.href||!isNaN(D):!isNaN(D))&&B(F)
},tabbable:function(E){var D=A.attr(E,"tabindex");
return(isNaN(D)||D>=0)&&A(E).is(":focusable")
}});
A(function(){var D=document.body,E=D.appendChild(E=document.createElement("div"));
A.extend(E.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0});
A.support.minHeight=E.offsetHeight===100;
A.support.selectstart="onselectstart" in E;
D.removeChild(E).style.display="none"
});
A.extend(A.ui,{plugin:{add:function(E,F,H){var G=A.ui[E].prototype;
for(var D in H){G.plugins[D]=G.plugins[D]||[];
G.plugins[D].push([F,H[D]])
}},call:function(D,F,E){var H=D.plugins[F];
if(!H||!D.element[0].parentNode){return 
}for(var G=0;
G<H.length;
G++){if(D.options[H[G][0]]){H[G][1].apply(D.element,E)
}}}},contains:function(E,D){return document.compareDocumentPosition?E.compareDocumentPosition(D)&16:E!==D&&E.contains(D)
},hasScroll:function(G,E){if(A(G).css("overflow")==="hidden"){return false
}var D=(E&&E==="left")?"scrollLeft":"scrollTop",F=false;
if(G[D]>0){return true
}G[D]=1;
F=(G[D]>0);
G[D]=0;
return F
},isOverAxis:function(E,D,F){return(E>D)&&(E<(D+F))
},isOver:function(I,E,H,G,D,F){return A.ui.isOverAxis(I,H,D)&&A.ui.isOverAxis(E,G,F)
}})
})(jQuery);
/*
 * jQuery UI Widget 1.8.6
 *
 * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Widget
 */
(function(B,D){if(B.cleanData){var C=B.cleanData;
B.cleanData=function(E){for(var F=0,G;
(G=E[F])!=null;
F++){B(G).triggerHandler("remove")
}C(E)
}
}else{var A=B.fn.remove;
B.fn.remove=function(E,F){return this.each(function(){if(!F){if(!E||B.filter(E,[this]).length){B("*",this).add([this]).each(function(){B(this).triggerHandler("remove")
})
}}return A.call(B(this),E,F)
})
}
}B.widget=function(F,H,E){var G=F.split(".")[0],J;
F=F.split(".")[1];
J=G+"-"+F;
if(!E){E=H;
H=B.Widget
}B.expr[":"][J]=function(K){return !!B.data(K,F)
};
B[G]=B[G]||{};
B[G][F]=function(K,L){if(arguments.length){this._createWidget(K,L)
}};
var I=new H();
I.options=B.extend(true,{},I.options);
B[G][F].prototype=B.extend(true,I,{namespace:G,widgetName:F,widgetEventPrefix:B[G][F].prototype.widgetEventPrefix||F,widgetBaseClass:J},E);
B.widget.bridge(F,B[G][F])
};
B.widget.bridge=function(F,E){B.fn[F]=function(I){var G=typeof I==="string",H=Array.prototype.slice.call(arguments,1),J=this;
I=!G&&H.length?B.extend.apply(null,[true,I].concat(H)):I;
if(G&&I.charAt(0)==="_"){return J
}if(G){this.each(function(){var K=B.data(this,F),L=K&&B.isFunction(K[I])?K[I].apply(K,H):K;
if(L!==K&&L!==D){J=L;
return false
}})
}else{this.each(function(){var K=B.data(this,F);
if(K){K.option(I||{})._init()
}else{B.data(this,F,new E(I,this))
}})
}return J
}
};
B.Widget=function(E,F){if(arguments.length){this._createWidget(E,F)
}};
B.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:false},_createWidget:function(F,G){B.data(G,this.widgetName,this);
this.element=B(G);
this.options=B.extend(true,{},this.options,this._getCreateOptions(),F);
var E=this;
this.element.bind("remove."+this.widgetName,function(){E.destroy()
});
this._create();
this._trigger("create");
this._init()
},_getCreateOptions:function(){return B.metadata&&B.metadata.get(this.element[0])[this.widgetName]
},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName);
this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled ui-state-disabled")
},widget:function(){return this.element
},option:function(F,G){var E=F;
if(arguments.length===0){return B.extend({},this.options)
}if(typeof F==="string"){if(G===D){return this.options[F]
}E={};
E[F]=G
}this._setOptions(E);
return this
},_setOptions:function(F){var E=this;
B.each(F,function(G,H){E._setOption(G,H)
});
return this
},_setOption:function(E,F){this.options[E]=F;
if(E==="disabled"){this.widget()[F?"addClass":"removeClass"](this.widgetBaseClass+"-disabled ui-state-disabled").attr("aria-disabled",F)
}return this
},enable:function(){return this._setOption("disabled",false)
},disable:function(){return this._setOption("disabled",true)
},_trigger:function(F,G,H){var J=this.options[F];
G=B.Event(G);
G.type=(F===this.widgetEventPrefix?F:this.widgetEventPrefix+F).toLowerCase();
H=H||{};
if(G.originalEvent){for(var E=B.event.props.length,I;
E;
){I=B.event.props[--E];
G[I]=G.originalEvent[I]
}}this.element.trigger(G,H);
return !(B.isFunction(J)&&J.call(this.element[0],G,H)===false||G.isDefaultPrevented())
}}
})(jQuery);
/*
 * jQuery UI Mouse 1.8.6
 *
 * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Mouse
 *
 * Depends:
 *	jquery.ui.widget.js
 */
(function(A,B){A.widget("ui.mouse",{options:{cancel:":input,option",distance:1,delay:0},_mouseInit:function(){var C=this;
this.element.bind("mousedown."+this.widgetName,function(D){return C._mouseDown(D)
}).bind("click."+this.widgetName,function(D){if(C._preventClickEvent){C._preventClickEvent=false;
D.stopImmediatePropagation();
return false
}});
this.started=false
},_mouseDestroy:function(){this.element.unbind("."+this.widgetName)
},_mouseDown:function(E){E.originalEvent=E.originalEvent||{};
if(E.originalEvent.mouseHandled){return 
}(this._mouseStarted&&this._mouseUp(E));
this._mouseDownEvent=E;
var D=this,F=(E.which==1),C=(typeof this.options.cancel=="string"?A(E.target).parents().add(E.target).filter(this.options.cancel).length:false);
if(!F||C||!this._mouseCapture(E)){return true
}this.mouseDelayMet=!this.options.delay;
if(!this.mouseDelayMet){this._mouseDelayTimer=setTimeout(function(){D.mouseDelayMet=true
},this.options.delay)
}if(this._mouseDistanceMet(E)&&this._mouseDelayMet(E)){this._mouseStarted=(this._mouseStart(E)!==false);
if(!this._mouseStarted){E.preventDefault();
return true
}}this._mouseMoveDelegate=function(G){return D._mouseMove(G)
};
this._mouseUpDelegate=function(G){return D._mouseUp(G)
};
A(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate);
E.preventDefault();
E.originalEvent.mouseHandled=true;
return true
},_mouseMove:function(C){if(A.browser.msie&&!(document.documentMode>=9)&&!C.button){return this._mouseUp(C)
}if(this._mouseStarted){this._mouseDrag(C);
return C.preventDefault()
}if(this._mouseDistanceMet(C)&&this._mouseDelayMet(C)){this._mouseStarted=(this._mouseStart(this._mouseDownEvent,C)!==false);
(this._mouseStarted?this._mouseDrag(C):this._mouseUp(C))
}return !this._mouseStarted
},_mouseUp:function(C){A(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate);
if(this._mouseStarted){this._mouseStarted=false;
this._preventClickEvent=(C.target==this._mouseDownEvent.target);
this._mouseStop(C)
}return false
},_mouseDistanceMet:function(C){return(Math.max(Math.abs(this._mouseDownEvent.pageX-C.pageX),Math.abs(this._mouseDownEvent.pageY-C.pageY))>=this.options.distance)
},_mouseDelayMet:function(C){return this.mouseDelayMet
},_mouseStart:function(C){},_mouseDrag:function(C){},_mouseStop:function(C){},_mouseCapture:function(C){return true
}})
})(jQuery);
(function(F,G){F.ui=F.ui||{};
var D=/left|center|right/,E=/top|center|bottom/,A="center",B=F.fn.position,C=F.fn.offset;
F.fn.position=function(I){if(!I||!I.of){return B.apply(this,arguments)
}I=F.extend({},I);
var M=F(I.of),L=M[0],O=(I.collision||"flip").split(" "),N=I.offset?I.offset.split(" "):[0,0],K,H,J;
if(L.nodeType===9){K=M.width();
H=M.height();
J={top:0,left:0}
}else{if(L.setTimeout){K=M.width();
H=M.height();
J={top:M.scrollTop(),left:M.scrollLeft()}
}else{if(L.preventDefault){I.at="left top";
K=H=0;
J={top:I.of.pageY,left:I.of.pageX}
}else{K=M.outerWidth();
H=M.outerHeight();
J=M.offset()
}}}F.each(["my","at"],function(){var P=(I[this]||"").split(" ");
if(P.length===1){P=D.test(P[0])?P.concat([A]):E.test(P[0])?[A].concat(P):[A,A]
}P[0]=D.test(P[0])?P[0]:A;
P[1]=E.test(P[1])?P[1]:A;
I[this]=P
});
if(O.length===1){O[1]=O[0]
}N[0]=parseInt(N[0],10)||0;
if(N.length===1){N[1]=N[0]
}N[1]=parseInt(N[1],10)||0;
if(I.at[0]==="right"){J.left+=K
}else{if(I.at[0]===A){J.left+=K/2
}}if(I.at[1]==="bottom"){J.top+=H
}else{if(I.at[1]===A){J.top+=H/2
}}J.left+=N[0];
J.top+=N[1];
return this.each(function(){var S=F(this),U=S.outerWidth(),R=S.outerHeight(),T=parseInt(F.curCSS(this,"marginLeft",true))||0,Q=parseInt(F.curCSS(this,"marginTop",true))||0,W=U+T+parseInt(F.curCSS(this,"marginRight",true))||0,X=R+Q+parseInt(F.curCSS(this,"marginBottom",true))||0,V=F.extend({},J),P;
if(I.my[0]==="right"){V.left-=U
}else{if(I.my[0]===A){V.left-=U/2
}}if(I.my[1]==="bottom"){V.top-=R
}else{if(I.my[1]===A){V.top-=R/2
}}V.left=parseInt(V.left);
V.top=parseInt(V.top);
P={left:V.left-T,top:V.top-Q};
F.each(["left","top"],function(Z,Y){if(F.ui.position[O[Z]]){F.ui.position[O[Z]][Y](V,{targetWidth:K,targetHeight:H,elemWidth:U,elemHeight:R,collisionPosition:P,collisionWidth:W,collisionHeight:X,offset:N,my:I.my,at:I.at})
}});
if(F.fn.bgiframe){S.bgiframe()
}S.offset(F.extend(V,{using:I.using}))
})
};
F.ui.position={fit:{left:function(H,I){var K=F(window),J=I.collisionPosition.left+I.collisionWidth-K.width()-K.scrollLeft();
H.left=J>0?H.left-J:Math.max(H.left-I.collisionPosition.left,H.left)
},top:function(H,I){var K=F(window),J=I.collisionPosition.top+I.collisionHeight-K.height()-K.scrollTop();
H.top=J>0?H.top-J:Math.max(H.top-I.collisionPosition.top,H.top)
}},flip:{left:function(I,K){if(K.at[0]===A){return 
}var M=F(window),L=K.collisionPosition.left+K.collisionWidth-M.width()-M.scrollLeft(),H=K.my[0]==="left"?-K.elemWidth:K.my[0]==="right"?K.elemWidth:0,J=K.at[0]==="left"?K.targetWidth:-K.targetWidth,N=-2*K.offset[0];
I.left+=K.collisionPosition.left<0?H+J+N:L>0?H+J+N:0
},top:function(I,K){if(K.at[1]===A){return 
}var M=F(window),L=K.collisionPosition.top+K.collisionHeight-M.height()-M.scrollTop(),H=K.my[1]==="top"?-K.elemHeight:K.my[1]==="bottom"?K.elemHeight:0,J=K.at[1]==="top"?K.targetHeight:-K.targetHeight,N=-2*K.offset[1];
I.top+=K.collisionPosition.top<0?H+J+N:L>0?H+J+N:0
}}};
if(!F.offset.setOffset){F.offset.setOffset=function(L,I){if(/static/.test(F.curCSS(L,"position"))){L.style.position="relative"
}var K=F(L),N=K.offset(),H=parseInt(F.curCSS(L,"top",true),10)||0,M=parseInt(F.curCSS(L,"left",true),10)||0,J={top:(I.top-N.top)+H,left:(I.left-N.left)+M};
if("using" in I){I.using.call(L,J)
}else{K.css(J)
}};
F.fn.offset=function(H){var I=this[0];
if(!I||!I.ownerDocument){return null
}if(H){return this.each(function(){F.offset.setOffset(this,H)
})
}return C.call(this)
}
}}(jQuery));;(function(E,C){C.ui.Message=function(I,H){G.constructor.call(this,I,H,A);
if(this.options.isMessages){this.severityClasses=["rf-msgs-inf","rf-msgs-wrn","rf-msgs-err","rf-msgs-ftl"];
this.summaryClass="rf-msgs-sum";
this.detailClass="rf-msgs-dtl"
}else{this.severityClasses=["rf-msg-inf","rf-msg-wrn","rf-msg-err","rf-msg-ftl"];
this.summaryClass="rf-msg-sum";
this.detailClass="rf-msg-dtl"
}};
C.ui.Base.extend(C.ui.Message);
var G=C.ui.Message.$super;
var A={showSummary:true,level:0,isMessages:false,globalOnly:false};
var F=function(K,H,M){var J=E(C.getDomElement(this.id));
var L=M.sourceId;
var I=M.message;
if(!this.options.forComponentId){if(!I||this.options.globalOnly){var H;
while(H=C.getDomElement(this.id+":"+L)){E(H).remove()
}}else{D.call(this,L,I)
}}else{if(this.options.forComponentId===L){J.empty();
D.call(this,L,I)
}}};
var D=function(H,J){if(J&&J.severity>=this.options.level){var I=E(C.getDomElement(this.id));
var K=E("<span/>",{"class":(this.severityClasses)[J.severity],id:this.id+":"+H});
if(J.summary){if(this.options.tooltip){K.attr("title",J.summary)
}else{if(this.options.showSummary){K.append(E("<span/>",{"class":(this.summaryClass)}).text(J.summary))
}}}if(this.options.showDetail&&J.detail){K.append(E("<span/>",{"class":(this.detailClass)}).text(J.detail))
}I.append(K)
}};
var B=function(){C.Event.bind(window.document,C.Event.MESSAGE_EVENT_TYPE+this.namespace,F,this)
};
E.extend(C.ui.Message.prototype,{name:"Message",__bindEventHandlers:B,destroy:function(){C.Event.unbind(window.document,C.Event.MESSAGE_EVENT_TYPE+this.namespace);
G.destroy.call(this)
}})
})(jQuery,window.RichFaces||(window.RichFaces={}));;(function(A,B){A.ui=A.ui||{};
A.ui.InputNumberSlider=A.BaseComponent.extendClass({name:"InputNumberSlider",delay:200,maxValue:100,minValue:0,step:1,tabIndex:0,decreaseSelectedClass:"rf-insl-dec-sel",handleSelectedClass:"rf-insl-hnd-sel",increaseSelectedClass:"rf-insl-inc-sel",init:function(H,D,C){$superInputNumberSlider.constructor.call(this,H);
B.extend(this,D);
this.range=this.maxValue-this.minValue;
this.id=H;
this.element=B(this.attachToDom());
this.input=this.element.children(".rf-insl-inp-cntr").children(".rf-insl-inp");
this.track=this.element.children(".rf-insl-trc-cntr").children(".rf-insl-trc");
this.handleContainer=this.track.children("span");
this.handle=this.handleContainer.children(".rf-insl-hnd, .rf-insl-hnd-dis");
this.tooltip=this.element.children(".rf-insl-tt");
var G=Number(this.input.val());
if(isNaN(G)){G=this.minValue
}this.handleContainer.css("display","block");
this.track.css("padding-right",this.handle.width()+"px");
this.__setValue(G,null,true);
if(!this.disabled){this.decreaseButton=this.element.children(".rf-insl-dec");
this.increaseButton=this.element.children(".rf-insl-inc");
this.track[0].tabIndex=this.tabIndex;
for(var F in C){this[F]+=" "+C[F]
}var E=B.proxy(this.__inputHandler,this);
this.input.change(E);
this.input.submit(E);
this.element.mousewheel(B.proxy(this.__mousewheelHandler,this));
this.track.keydown(B.proxy(this.__keydownHandler,this));
this.decreaseButton.mousedown(B.proxy(this.__decreaseHandler,this));
this.increaseButton.mousedown(B.proxy(this.__increaseHandler,this));
this.track.mousedown(B.proxy(this.__mousedownHandler,this))
}},decrease:function(C){var D=this.value-this.step;
D=this.roundFloat(D);
this.setValue(D,C)
},increase:function(C){var D=this.value+this.step;
D=this.roundFloat(D);
this.setValue(D,C)
},getValue:function(){return this.value
},setValue:function(D,C){if(!this.disabled){this.__setValue(D,C)
}},roundFloat:function(C){var F=this.step.toString();
var E=0;
if(!/\./.test(F)){if(this.step>=1){return C
}if(/e/.test(F)){E=F.split("-")[1]
}}else{E=F.length-F.indexOf(".")-1
}var D=C.toFixed(E);
return parseFloat(D)
},__setValue:function(D,C,F){if(!isNaN(D)){if(D>this.maxValue){D=this.maxValue
}else{if(D<this.minValue){D=this.minValue
}}if(D!=this.value){this.input.val(D);
var E=100*(D-this.minValue)/this.range;
this.handleContainer.css("padding-left",E+"%");
this.tooltip.text(D);
this.tooltip.setPosition(this.handle,{from:"LT",offset:[0,5]});
this.value=D;
if(this.onchange&&!F){this.onchange.call(this.element[0],C)
}}}},__inputHandler:function(C){var D=Number(this.input.val());
if(isNaN(D)){this.input.val(this.value)
}else{this.__setValue(D,C)
}},__mousewheelHandler:function(E,F,D,C){F=D||C;
if(F>0){this.increase(E)
}else{if(F<0){this.decrease(E)
}}return false
},__keydownHandler:function(C){if(C.keyCode==37){var D=Number(this.input.val())-this.step;
D=this.roundFloat(D);
this.__setValue(D,C);
C.preventDefault()
}else{if(C.keyCode==39){var D=Number(this.input.val())+this.step;
D=this.roundFloat(D);
this.__setValue(D,C);
C.preventDefault()
}}},__decreaseHandler:function(D){var C=this;
C.decrease(D);
this.intervalId=window.setInterval(function(){C.decrease(D)
},this.delay);
B(document).one("mouseup",true,B.proxy(this.__clearInterval,this));
this.decreaseButton.addClass(this.decreaseSelectedClass);
D.preventDefault()
},__increaseHandler:function(D){var C=this;
C.increase(D);
this.intervalId=window.setInterval(function(){C.increase(D)
},this.delay);
B(document).one("mouseup",B.proxy(this.__clearInterval,this));
this.increaseButton.addClass(this.increaseSelectedClass);
D.preventDefault()
},__clearInterval:function(C){window.clearInterval(this.intervalId);
if(C.data){this.decreaseButton.removeClass(this.decreaseSelectedClass)
}else{this.increaseButton.removeClass(this.increaseSelectedClass)
}},__mousedownHandler:function(D){this.__mousemoveHandler(D);
this.track.focus();
var C=B(document);
C.mousemove(B.proxy(this.__mousemoveHandler,this));
C.one("mouseup",B.proxy(this.__mouseupHandler,this));
this.handle.addClass(this.handleSelectedClass);
this.tooltip.show()
},__mousemoveHandler:function(C){var D=this.range*(C.pageX-this.track.offset().left-this.handle.width()/2)/(this.track.width()-this.handle.width())+this.minValue;
D=Math.round(D/this.step)*this.step;
D=this.roundFloat(D);
this.__setValue(D,C);
C.preventDefault()
},__mouseupHandler:function(){this.handle.removeClass(this.handleSelectedClass);
this.tooltip.hide();
B(document).unbind("mousemove",this.__mousemoveHandler)
},destroy:function(C){B(document).unbind("mousemove",this.__mousemoveHandler);
$superInputNumberSlider.destroy.call(this)
}});
$superInputNumberSlider=A.ui.InputNumberSlider.$super
}(window.RichFaces,jQuery));;(function(B,A){A.ui=A.ui||{};
A.ui.CollapsibleSubTableToggler=function(D,C){this.id=D;
this.eventName=C.eventName;
this.expandedControl=C.expandedControl;
this.collapsedControl=C.collapsedControl;
this.forId=C.forId;
this.element=B(document.getElementById(this.id));
if(this.element&&this.eventName){this.element.bind(this.eventName,B.proxy(this.switchState,this))
}};
B.extend(A.ui.CollapsibleSubTableToggler.prototype,(function(){var C=function(D){return B(document.getElementById(D))
};
return{switchState:function(E){var D=A.$(this.forId);
if(D){var F=D.getMode();
if(A.ui.CollapsibleSubTable.MODE_CLNT==F){this.toggleControl(D.isExpanded())
}D.setOption(this.id);
D.switchState(E)
}},toggleControl:function(F){var D=C(this.expandedControl);
var E=C(this.collapsedControl);
if(F){D.hide();
E.show()
}else{E.hide();
D.show()
}}}
})())
})(jQuery,window.RichFaces);;(function(F,C){var E="__NEW_NODE_TOGGLE_STATE";
var D="__TRIGGER_NODE_AJAX_UPDATE";
var L="__SELECTION_STATE";
var J=["rf-tr-nd-colps","rf-tr-nd-exp"];
var A=["rf-trn-hnd-colps","rf-trn-hnd-exp"];
var B=["rf-trn-ico-colps","rf-trn-ico-exp"];
C.ui=C.ui||{};
C.ui.TreeNode=C.BaseComponent.extendClass({name:"TreeNode",init:function(P,O){H.constructor.call(this,P);
this.__rootElt=F(this.attachToDom());
this.__children=new Array();
this.__initializeChildren(O);
var N=(O.clientEventHandlers||{})[this.getId().substring(O.treeId.length)]||{};
if(N.bth){C.Event.bind(this.__rootElt,"beforetoggle",new Function("event",N.bth))
}if(N.th){C.Event.bind(this.__rootElt,"toggle",new Function("event",N.th))
}this.__addLastNodeClass()
},destroy:function(){if(this.parent){this.parent.removeChild(this);
this.parent=null
}this.__clientToggleStateInput=null;
this.__clearChildren();
this.__rootElt=null;
H.destroy.call(this)
},__initializeChildren:function(N){var O=this;
this.__rootElt.children(".rf-tr-nd").each(function(){O.addChild(new C.ui.TreeNode(this,N))
})
},__addLastNodeClass:function(){if(this.__rootElt.next("div").length==0){this.__rootElt.addClass("rf-tr-nd-last")
}},__getNodeContainer:function(){return this.__rootElt.find(" > .rf-trn:first")
},__getHandle:function(){return this.__getNodeContainer().find(" > .rf-trn-hnd:first")
},__getContent:function(){return this.__getNodeContainer().find(" > .rf-trn-cnt:first")
},__getIcons:function(){return this.__getContent().find(" > .rf-trn-ico")
},getParent:function(){return this.__parent
},setParent:function(N){this.__parent=N
},addChild:function(P,N){var O;
if(typeof N!="undefined"){O=N
}else{O=this.__children.length
}this.__children.splice(O,0,P);
P.setParent(this)
},removeChild:function(Q){if(this.__children.length){var N=this.__children.indexOf(Q);
if(N!=-1){var O=this.__children.splice(N,1);
if(O){for(var P=0;
P<O.length;
P++){O[P].setParent(undefined)
}}}}},__clearChildren:function(){for(var N=0;
N<this.__children.length;
N++){this.__children[N].setParent(undefined)
}this.__children=new Array()
},isExpanded:function(){return !this.isLeaf()&&this.__rootElt.hasClass("rf-tr-nd-exp")
},isCollapsed:function(){return !this.isLeaf()&&this.__rootElt.hasClass("rf-tr-nd-colps")
},isLeaf:function(){return this.__rootElt.hasClass("rf-tr-nd-lf")
},__canBeToggled:function(){return !this.isLeaf()&&!this.__rootElt.hasClass("rf-tr-nd-exp-nc")&&!this.__loading
},toggle:function(){if(!this.__canBeToggled()){return 
}if(this.isCollapsed()){this.expand()
}else{this.collapse()
}},__updateClientToggleStateInput:function(N){if(!this.__clientToggleStateInput){this.__clientToggleStateInput=F("<input type='hidden' />").appendTo(this.__rootElt).attr({name:this.getId()+E})
}this.__clientToggleStateInput.val(N.toString())
},__fireBeforeToggleEvent:function(){return C.Event.callHandler(this.__rootElt,"beforetoggle")
},__fireToggleEvent:function(){C.Event.callHandler(this.__rootElt,"toggle")
},__makeLoading:function(){this.__loading=true;
this.__getNodeContainer().addClass("rf-trn-ldn")
},__resetLoading:function(){this.__loading=false;
this.__getNodeContainer().removeClass("rf-trn-ldn")
},__changeToggleState:function(P){if(!this.isLeaf()){if(P^this.isExpanded()){if(this.__fireBeforeToggleEvent()===false){return 
}var N=this.getTree();
switch(N.getToggleType()){case"client":this.__rootElt.addClass(J[P?1:0]).removeClass(J[!P?1:0]);
this.__getHandle().addClass(A[P?1:0]).removeClass(A[!P?1:0]);
var O=this.__getIcons();
if(O.length==1){O.addClass(B[P?1:0]).removeClass(B[!P?1:0])
}this.__updateClientToggleStateInput(P);
this.__fireToggleEvent();
break;
case"ajax":case"server":N.__sendToggleRequest(null,this,P);
break
}}}},collapse:function(){this.__changeToggleState(false)
},expand:function(){this.__changeToggleState(true)
},__setSelected:function(O){var N=this.__getContent();
if(O){N.addClass("rf-trn-sel")
}else{N.removeClass("rf-trn-sel")
}this.__selected=O
},isSelected:function(){return this.__selected
},getTree:function(){return this.getParent().getTree()
},getId:function(){return this.__rootElt.attr("id")
}});
var H=C.ui.TreeNode.$super;
C.ui.TreeNode.initNodeByAjax=function(O,Q){var P=F(document.getElementById(O));
var N=Q||{};
var T=P.parent(".rf-tr-nd, .rf-tr");
var U=P.prevAll(".rf-tr-nd").length;
var R=C.$(T[0]);
N.treeId=R.getTree().getId();
var S=new C.ui.TreeNode(P[0],N);
R.addChild(S,U);
var V=R.getTree();
if(V.getSelection().contains(S.getId())){S.__setSelected(true)
}};
C.ui.TreeNode.emitToggleEvent=function(O){var N=document.getElementById(O);
if(!N){return 
}C.$(N).__fireToggleEvent()
};
var M=function(N){return C.$(F(N).closest(".rf-tr"))
};
var K=function(N){return C.$(F(N).closest(".rf-tr-nd"))
};
var G=function(N,O){return N!=M(O)
};
C.ui.Tree=C.ui.TreeNode.extendClass({name:"Tree",init:function(P,N){this.__treeRootElt=F(C.getDomElement(P));
var O={};
O.clientEventHandlers=N.clientEventHandlers||{};
O.treeId=P;
I.constructor.call(this,this.__treeRootElt,O);
this.__toggleType=N.toggleType||"ajax";
this.__selectionType=N.selectionType||"client";
if(N.ajaxSubmitFunction){this.__ajaxSubmitFunction=new Function("event","source","params","complete",N.ajaxSubmitFunction)
}if(N.onbeforeselectionchange){C.Event.bind(this.__treeRootElt,"beforeselectionchange",new Function("event",N.onbeforeselectionchange))
}if(N.onselectionchange){C.Event.bind(this.__treeRootElt,"selectionchange",new Function("event",N.onselectionchange))
}this.__toggleNodeEvent=N.toggleNodeEvent;
if(this.__toggleNodeEvent){this.__treeRootElt.delegate(".rf-trn",this.__toggleNodeEvent,this,this.__nodeToggleActivated)
}if(!this.__toggleNodeEvent||this.__toggleNodeEvent!="click"){this.__treeRootElt.delegate(".rf-trn-hnd","click",this,this.__nodeToggleActivated)
}this.__treeRootElt.delegate(".rf-trn-cnt","mousedown",this,this.__nodeSelectionActivated);
this.__findSelectionInput();
this.__selection=new C.ui.TreeNodeSet(this.__selectionInput.val());
F(document).ready(F.proxy(this.__updateSelectionFromInput,this))
},__findSelectionInput:function(){this.__selectionInput=F(" > .rf-tr-sel-inp",this.__treeRootElt)
},__addLastNodeClass:function(){},destroy:function(){if(this.__toggleNodeEvent){this.__treeRootElt.undelegate(".rf-trn",this.__toggleNodeEvent,this,this.__nodeToggleActivated)
}if(!this.__toggleNodeEvent||this.__toggleNodeEvent!="click"){this.__treeRootElt.undelegate(".rf-trn-hnd","click",this,this.__nodeToggleActivated)
}this.__treeRootElt.undelegate(".rf-trn-cnt","mousedown",this.__nodeSelectionActivated);
this.__treeRootElt=null;
this.__selectionInput=null;
this.__ajaxSubmitFunction=null;
I.destroy.call(this)
},__nodeToggleActivated:function(O){var N=O.data;
if(G(N,this)){return 
}var P=K(this);
P.toggle()
},__nodeSelectionActivated:function(O){var N=O.data;
if(G(N,this)){return 
}var P=K(this);
if(O.ctrlKey){N.__toggleSelection(P)
}else{N.__addToSelection(P)
}},__sendToggleRequest:function(R,O,S){var P=O.getId();
var N={};
N[P+E]=S;
if(this.getToggleType()=="server"){var Q=this.__treeRootElt.closest("form");
C.submitForm(Q,N)
}else{O.__makeLoading();
N[P+D]=S;
this.__ajaxSubmitFunction(R,P,N,function(){var T=C.$(P);
if(T){T.__resetLoading()
}})
}},getToggleType:function(){return this.__toggleType
},getSelectionType:function(){return this.__selectionType
},getTree:function(){return this
},__handleSelectionChange:function(N){var O={oldSelection:this.getSelection().getNodes(),newSelection:N.getNodes()};
if(C.Event.callHandler(this.__treeRootElt,"beforeselectionchange",O)===false){return 
}this.__selectionInput.val(N.getNodeString());
if(this.getSelectionType()=="client"){this.__updateSelection(N)
}else{this.__ajaxSubmitFunction(null,this.getId())
}},__toggleSelection:function(O){var N=this.getSelection().cloneAndToggle(O);
this.__handleSelectionChange(N)
},__addToSelection:function(O){var N=this.getSelection().cloneAndAdd(O);
this.__handleSelectionChange(N)
},__updateSelectionFromInput:function(){this.__findSelectionInput();
this.__updateSelection(new C.ui.TreeNodeSet(this.__selectionInput.val()))
},__updateSelection:function(N){var O=this.getSelection();
O.each(function(){this.__setSelected(false)
});
N.each(function(){this.__setSelected(true)
});
if(O.getNodeString()!=N.getNodeString()){C.Event.callHandler(this.__treeRootElt,"selectionchange",{oldSelection:O.getNodes(),newSelection:N.getNodes()})
}this.__selection=N
},getSelection:function(){return this.__selection
},contextMenuAttach:function(O){var N="[id='"+this.id[0].id+"'] ";
N+=(typeof O.options.targetSelector==="undefined")?".rf-trn-cnt":O.options.targetSelector;
N=jQuery.trim(N);
C.Event.bind(N,O.options.showEvent,F.proxy(O.__showHandler,O),O)
}});
var I=C.ui.Tree.$super;
C.ui.TreeNodeSet=function(){this.init.apply(this,arguments)
};
F.extend(C.ui.TreeNodeSet.prototype,{init:function(N){this.__nodeId=N
},contains:function(N){if(N.getId){return this.__nodeId==N.getId()
}else{return this.__nodeId==N
}},getNodeString:function(){return this.__nodeId
},toString:function(){return this.getNodeString()
},getNodes:function(){if(this.__nodeId){var N=C.$(this.__nodeId);
if(N){return[N]
}else{return null
}}return[]
},cloneAndAdd:function(N){return new C.ui.TreeNodeSet(N.getId())
},cloneAndToggle:function(N){var O;
if(this.contains(N)){O=""
}else{O=N.getId()
}return new C.ui.TreeNodeSet(O)
},each:function(N){F.each(this.getNodes()||[],N)
}})
}(jQuery,RichFaces));;(function(C,B){B.ui=B.ui||{};
function A(E){this.comp=E
}A.prototype={exec:function(F,E){if(E.switchMode=="server"){return this.execServer(F,E)
}else{if(E.switchMode=="ajax"){return this.execAjax(F,E)
}else{if(E.switchMode=="client"){return this.execClient(F,E)
}else{B.log.error("SwitchItems.exec : unknown switchMode ("+this.comp.switchMode+")")
}}}},execServer:function(G,E){if(G){var F=G.__leave();
if(!F){return false
}}this.__setActiveItem(E.getName());
B.submitForm(this.__getParentForm());
return false
},execAjax:function(G,E){var F=C.extend({},this.comp.options.ajax,{});
this.__setActiveItem(E.getName());
B.ajax(this.comp.id,null,F);
if(G){this.__setActiveItem(G.getName())
}return false
},execClient:function(G,E){if(G){var F=G.__leave();
if(!F){return false
}}this.__setActiveItem(E.getName());
E.__enter();
this.comp.__fireItemChange(G,E);
return true
},__getParentForm:function(){return C(B.getDomElement(this.comp.id)).parents("form:first")
},__setActiveItem:function(E){B.getDomElement(this.__getValueInputId()).value=E;
this.comp.activeItem=E
},__getValueInputId:function(){return this.comp.id+"-value"
}};
B.ui.TogglePanel=B.BaseComponent.extendClass({name:"TogglePanel",init:function(F,E){D.constructor.call(this,F);
this.attachToDom();
this.items=[];
this.options=C.extend(this.options,E||{});
this.activeItem=this.options.activeItem;
this.__addUserEventHandler("itemchange");
this.__addUserEventHandler("beforeitemchange")
},getSelectItem:function(){return this.activeItem
},switchToItem:function(F){var E=this.getNextItem(F);
if(E==null){B.log.warn("TogglePanel.switchToItems("+F+"): item with name '"+F+"' not found");
return false
}var H=this.__getItemByName(this.getSelectItem());
var G=this.__fireBeforeItemChange(H,E);
if(!G){B.log.warn("TogglePanel.switchToItems("+F+"): switch has been canceled by beforeItemChange event");
return false
}return this.__itemsSwitcher().exec(H,E)
},getNextItem:function(F){if(F){var E=this.__ITEMS_META_NAMES[F];
if(E){return this.__getItem(E(this))
}else{return this.__getItemByName(F)
}}else{return this.__getItemByName(this.nextItem())
}},onCompleteHandler:function(E){var G=this.__getItemByName(this.activeItem);
var F=this.__getItemByName(E);
this.__itemsSwitcher().execClient(G,F)
},getItems:function(){return this.items
},getItemsNames:function(){var F=[];
for(var E=0;
E<this.items.length;
E++){F.push(this.items[E].getName())
}return F
},nextItem:function(F){var E=this.__getItemIndex(F||this.activeItem);
if(E==-1){return null
}return this.__getItemName(E+1)
},firstItem:function(){return this.__getItemName(0)
},lastItem:function(){return this.__getItemName(this.items.length-1)
},prevItem:function(F){var E=this.__getItemIndex(F||this.activeItem);
if(!this.options.cycledSwitching&&E<1){return null
}return this.__getItemName(E-1)
},__itemsSwitcher:function(){return new A(this)
},__ITEMS_META_NAMES:(function(){function E(F,I,H){var G=I;
while((!F.items[G]||F.items[G].disabled)&&G<F.items.length&&G>0){G+=H
}return G
}return{"@first":function(F){return E(F,0,1)
},"@prev":function(F){return E(F,parseInt(F.__getItemIndex(F.activeItem))-1,-1)
},"@next":function(F){return E(F,parseInt(F.__getItemIndex(F.activeItem))+1,1)
},"@last":function(F){return E(F,F.items.length-1,-1)
}}
})(),__getItemIndex:function(G){var F;
for(var E=0;
E<this.items.length;
E++){F=this.items[E];
if(!F.disabled&&F.getName()===G){return E
}}B.log.info("TogglePanel.getItemIndex: item with name '"+G+"' not found");
return -1
},__addUserEventHandler:function(E){var F=this.options["on"+E];
if(F){B.Event.bindById(this.id,E,F)
}},__getItem:function(E){if(this.options.cycledSwitching){var F=this.items.length;
return this.items[(F+E)%F]
}else{if(E>=0&&E<this.items.length){return this.items[E]
}else{return null
}}},__getItemByName:function(E){return this.__getItem(this.__getItemIndex(E))
},__getItemName:function(E){var F=this.__getItem(E);
if(F==null){return null
}return F.getName()
},__fireItemChange:function(F,E){return new B.Event.fireById(this.id,"itemchange",{id:this.id,oldItem:F,newItem:E})
},__fireBeforeItemChange:function(F,E){return B.Event.fireById(this.id,"beforeitemchange",{id:this.id,oldItem:F,newItem:E})
}});
var D=B.ui.TogglePanel.$super
})(jQuery,RichFaces);;(function(E,D){D.ui=D.ui||{};
var C=function(H){H.stopPropagation();
H.preventDefault()
};
var A=function(H){if(typeof H.onselectstart!="undefined"){E(D.getDomElement(H)).bind("selectstart",C)
}else{E(D.getDomElement(H)).bind("mousedown",C)
}};
var G=function(H){if(typeof H.onselectstart!="undefined"){E(D.getDomElement(H)).unbind("selectstart",C)
}else{E(D.getDomElement(H)).unbind("mousedown",C)
}};
var B={width:-1,height:-1,minWidth:-1,minHeight:-1,modal:true,moveable:true,resizeable:false,autosized:false,left:"auto",top:"auto",zindex:100,shadowDepth:5,shadowOpacity:0.1,attachToBody:true};
D.ui.PopupPanel=function(I,H){F.constructor.call(this,I);
this.markerId=I;
this.attachToDom(this.markerId);
this.options=E.extend(this.options,B,H||{});
this.minWidth=this.getMinimumSize(this.options.minWidth);
this.minHeight=this.getMinimumSize(this.options.minHeight);
this.maxWidth=this.options.maxWidth;
this.maxHeight=this.options.maxHeight;
this.baseZIndex=this.options.zindex;
this.div=E(D.getDomElement(I));
this.cdiv=E(D.getDomElement(I+"_container"));
this.contentDiv=E(D.getDomElement(I+"_content"));
this.shadowDiv=E(D.getDomElement(I+"_shadow"));
this.shadeDiv=E(D.getDomElement(I+"_shade"));
this.scrollerDiv=E(D.getDomElement(I+"_content_scroller"));
E(this.shadowDiv).css("opacity",this.options.shadowOpacity);
this.shadowDepth=parseInt(this.options.shadowDepth);
this.borders=new Array();
this.firstHref=E(D.getDomElement(I+"FirstHref"));
if(this.options.resizeable){this.borders.push(new D.ui.PopupPanel.Border(I+"ResizerN",this,"N-resize",D.ui.PopupPanel.Sizer.N));
this.borders.push(new D.ui.PopupPanel.Border(I+"ResizerE",this,"E-resize",D.ui.PopupPanel.Sizer.E));
this.borders.push(new D.ui.PopupPanel.Border(I+"ResizerS",this,"S-resize",D.ui.PopupPanel.Sizer.S));
this.borders.push(new D.ui.PopupPanel.Border(I+"ResizerW",this,"W-resize",D.ui.PopupPanel.Sizer.W));
this.borders.push(new D.ui.PopupPanel.Border(I+"ResizerNW",this,"NW-resize",D.ui.PopupPanel.Sizer.NW));
this.borders.push(new D.ui.PopupPanel.Border(I+"ResizerNE",this,"NE-resize",D.ui.PopupPanel.Sizer.NE));
this.borders.push(new D.ui.PopupPanel.Border(I+"ResizerSE",this,"SE-resize",D.ui.PopupPanel.Sizer.SE));
this.borders.push(new D.ui.PopupPanel.Border(I+"ResizerSW",this,"SW-resize",D.ui.PopupPanel.Sizer.SW))
}if(this.options.moveable&&D.getDomElement(I+"_header")){this.header=new D.ui.PopupPanel.Border(I+"_header",this,"move",D.ui.PopupPanel.Sizer.Header)
}else{E(D.getDomElement(I+"_header")).css("cursor","default")
}};
D.BaseComponent.extend(D.ui.PopupPanel);
var F=D.ui.PopupPanel.$super;
E.extend(D.ui.PopupPanel.prototype,(function(H){return{name:"PopupPanel",saveInputValues:function(I){if(E.browser.msie){E("input[type=checkbox], input[type=radio]",I).each(function(J){E(this).defaultChecked=E(this).checked
})
}},width:function(){return this.getContentElement()[0].clientWidth
},height:function(){return this.getContentElement()[0].clientHeight
},getLeft:function(){return this.cdiv.css("left")
},getTop:function(){return this.cdiv.css("top")
},getInitialSize:function(){if(this.options.autosized){return 15
}else{return E(D.getDomElement(this.markerId+"_header_content")).height()
}},getContentElement:function(){if(!this._contentElement){this._contentElement=this.cdiv
}return this._contentElement
},getSizeElement:function(){return document.body
},getMinimumSize:function(I){return Math.max(I,2*this.getInitialSize()+2)
},__getParsedOption:function(J,I){var K=parseInt(J[I],10);
if(K<0||isNaN(K)){K=this[I]
}return K
},destroy:function(){this._contentElement=null;
this.firstOutside=null;
this.lastOutside=null;
this.firstHref=null;
this.parent=null;
if(this.header){this.header.destroy();
this.header=null
}for(var I=0;
I<this.borders.length;
I++){this.borders[I].destroy()
}this.borders=null;
if(this.domReattached){this.div.remove()
}this.markerId=null;
this.options=null;
this.div=null;
this.cdiv=null;
this.contentDiv=null;
this.shadowDiv=null;
this.scrollerDiv=null;
this.userOptions=null;
this.eIframe=null;
F.destroy.call(this)
},initIframe:function(){if(this.contentWindow){E(this.contentWindow.document.body).css("margin","0px 0px 0px 0px")
}else{}if("transparent"==E(document.body).css("background-color")){E(this).css("filter","alpha(opacity=0)");
E(this).css("opacity","0")
}},setLeft:function(I){if(!isNaN(I)){this.cdiv.css("left",I+"px")
}},setTop:function(I){if(!isNaN(I)){this.cdiv.css("top",I+"px")
}},show:function(X,T){var J=this.cdiv;
if(!this.shown&&this.invokeEvent("beforeshow",X,null,J)){this.preventFocus();
if(!this.domReattached){this.parent=this.div.parent();
var U;
if(T){U=T.domElementAttachment
}if(!U){U=this.options.domElementAttachment
}var S;
if("parent"==U){S=this.parent
}else{if("form"==U){S=this.findForm(J)[0]||document.body
}else{S=document.body
}}if(S!=this.parent){this.saveInputValues(J);
this.shadeDiv.length&&S.appendChild(this.shadeDiv.get(0));
S.appendChild(this.cdiv.get(0));
this.domReattached=true
}else{this.parent.show()
}}var O=E("form",J);
if(this.options.keepVisualState&&O){for(var Y=0;
Y<O.length;
Y++){var I=this;
E(O[Y]).bind("submit",{popup:I},this.setStateInput)
}}var N={};
this.userOptions={};
E.extend(N,this.options);
if(T){E.extend(N,T);
E.extend(this.userOptions,T)
}this.currentMinHeight=this.getMinimumSize(this.__getParsedOption(N,"minHeight"));
this.currentMinWidth=this.getMinimumSize(this.__getParsedOption(N,"minWidth"));
var K=this.getContentElement();
if(!this.options.autosized){if(N.width&&N.width==-1){N.width=300
}if(N.height&&N.height==-1){N.height=200
}}if(N.width&&N.width!=-1){if(this.currentMinWidth>N.width){N.width=this.currentMinWidth
}if(N.width>this.maxWidth){N.width=this.maxWidth
}E(D.getDomElement(K)).css("width",N.width+(/px/.test(N.width)?"":"px"));
this.shadowDiv.css("width",N.width+(/px/.test(N.width)?"":"px"));
this.scrollerDiv.css("width",N.width+(/px/.test(N.width)?"":"px"))
}if(N.height&&N.height!=-1){if(this.currentMinHeight>N.height){N.height=this.currentMinHeight
}if(N.height>this.maxHeight){N.height=this.maxHeight
}E(D.getDomElement(K)).css("height",N.height+(/px/.test(N.height)?"":"px"));
var W=E(D.getDomElement(this.markerId+"_header"))?E(D.getDomElement(this.markerId+"_header")).innerHeight():0;
this.scrollerDiv.css("height",N.height-W+(/px/.test(N.height)?"":"px"))
}var Q;
if(this.options.overlapEmbedObjects&&!this.iframe){this.iframe=this.markerId+"IFrame";
E('<iframe src="javascript:\'\'" frameborder="0" scrolling="no" id="'+this.iframe+'" class="rf-pp-ifr" style="width:'+this.options.width+"px; height:"+this.options.height+'px;"></iframe>').insertBefore(E(":first-child",this.cdiv)[0]);
Q=E(D.getDomElement(this.iframe));
Q.bind("load",this.initIframe);
this.eIframe=Q
}if(N.left){var Z;
if(N.left!="auto"){Z=parseInt(N.left,10)
}else{var L=this.__calculateWindowWidth();
var P=this.width();
if(L>=P){Z=(L-P)/2
}else{Z=0
}}this.setLeft(Math.round(Z));
E(this.shadowDiv).css("left",this.shadowDepth)
}if(N.top){var V;
if(N.top!="auto"){V=parseInt(N.top,10)
}else{var R=this.__calculateWindowHeight();
var a=this.height();
if(R>=a){V=(R-a)/2
}else{V=0
}}this.setTop(Math.round(V));
E(this.shadowDiv).css("top",this.shadowDepth);
E(this.shadowDiv).css("bottom",-this.shadowDepth)
}this.div.css("visibility","");
this.div.css("display","block");
if(this.options.autosized){this.shadowDiv.css("width",this.cdiv[0].clientWidth)
}var M={};
M.parameters=T||{};
this.shown=true;
this.invokeEvent("show",M,null,J)
}},__calculateWindowHeight:function(){var I=document.documentElement;
return self.innerHeight||(I&&I.clientHeight)||document.body.clientHeight
},__calculateWindowWidth:function(){var I=document.documentElement;
return self.innerWidth||(I&&I.clientWidth)||document.body.clientWidth
},startDrag:function(I){A(document.body)
},firstOnfocus:function(I){var J=E(I.data.popup.firstHref);
if(J){J.focus()
}},processAllFocusElements:function(J,N){var I=-1;
var L;
var K="|a|input|select|button|textarea|";
if(J.focus&&J.nodeType==1&&(L=J.tagName)&&(I=K.indexOf(L.toLowerCase()))!=-1&&K.charAt(I-1)==="|"&&K.charAt(I+L.length)==="|"&&!J.disabled&&J.type!="hidden"){N.call(this,J)
}else{if(J!=this.cdiv.get(0)){var M=J.firstChild;
while(M){if(!M.style||M.style.display!="none"){this.processAllFocusElements(M,N)
}M=M.nextSibling
}}}},processTabindexes:function(I){if(!this.firstOutside){this.firstOutside=I
}if(!I.prevTabIndex){I.prevTabIndex=I.tabIndex;
I.tabIndex=-1
}if(!I.prevAccessKey){I.prevAccessKey=I.accessKey;
I.accessKey=""
}},restoreTabindexes:function(I){if(I.prevTabIndex!=undefined){if(I.prevTabIndex==0){E(I).removeAttr("tabindex")
}else{I.tabIndex=I.prevTabIndex
}I.prevTabIndex=undefined
}if(I.prevAccessKey!=undefined){if(I.prevAccessKey==""){E(I).removeAttr("accesskey")
}else{I.accessKey=I.prevAccessKey
}I.prevAccessKey=undefined
}},preventFocus:function(){if(this.options.modal){this.processAllFocusElements(document,this.processTabindexes);
var I=this;
if(this.firstOutside){E(D.getDomElement(this.firstOutside)).bind("focus",{popup:I},this.firstOnfocus)
}}},restoreFocus:function(){if(this.options.modal){this.processAllFocusElements(document,this.restoreTabindexes);
if(this.firstOutside){E(D.getDomElement(this.firstOutside)).unbind("focus",this.firstOnfocus);
this.firstOutside=null
}}},endDrag:function(J){for(var I=0;
I<this.borders.length;
I++){this.borders[I].show();
this.borders[I].doPosition()
}G(document.body)
},hide:function(M,L){var K=this.cdiv;
this.restoreFocus();
if(this.shown&&this.invokeEvent("beforehide",M,null,K)){this.currentMinHeight=undefined;
this.currentMinWidth=undefined;
this.div.hide();
if(this.parent){if(this.domReattached){this.saveInputValues(K);
var O=this.div.get(0);
this.shadeDiv.length&&O.appendChild(this.shadeDiv.get(0));
O.appendChild(K.get(0));
this.domReattached=false
}}var N={};
N.parameters=L||{};
var I=E("form",K);
if(this.options.keepVisualState&&I){for(var J=0;
J<I.length;
J++){E(I[J]).unbind("submit",this.setStateInput)
}}this.shown=false;
this.invokeEvent("hide",N,null,K)
}},getStyle:function(J,I){return parseInt(E(D.getDomElement(J)).css(I).replace("px",""),10)
},doResizeOrMove:function(R){var M={};
var Y={};
var Q={};
var L={};
var P={};
var O={};
var S={};
var I;
var X=22;
var a=0;
var K=this.getContentElement();
I=this.getStyle(K,"width");
var U=I;
I+=R.deltaWidth||0;
if(I>=this.currentMinWidth||this.options.autosized){L.width=I+"px";
P.width=I+"px";
O.width=I-a+"px";
S.width=I-a+"px"
}else{L.width=this.currentMinWidth+"px";
P.width=this.currentMinWidth+"px";
O.width=this.currentMinWidth-a+"px";
S.width=this.currentMinWidth-a+"px";
M.vx=U-this.currentMinWidth;
M.x=true
}if(I>this.options.maxWidth){if(R.deltaWidth){L.width=this.currentMaxWidth+"px";
P.width=this.currentMaxWidth+"px";
O.width=this.currentMaxWidth-a+"px";
S.width=this.currentMaxWidth-a+"px";
M.vx=U-this.currentMaxWidth
}M.x=true
}if(M.vx&&R.deltaX){R.deltaX=-M.vx
}var W=E(this.cdiv);
if(R.deltaX&&(M.vx||!M.x)){if(M.vx){R.deltaX=M.vx
}var T=this.getStyle(W,"left");
T+=R.deltaX;
Q.left=T+"px"
}I=this.getStyle(K,"height");
var Z=I;
I+=R.deltaHeight||0;
if(I>=this.currentMinHeight||this.options.autosized){if(R.deltaHeight){L.height=I+"px";
P.height=I+"px";
S.height=I-X+"px"
}}else{if(R.deltaHeight){L.height=this.currentMinHeight+"px";
P.height=this.currentMinHeight+"px";
S.height=this.currentMinHeight-X+"px";
M.vy=Z-this.currentMinHeight
}M.y=true
}if(I>this.options.maxHeight){if(R.deltaHeight){L.height=this.currentMaxHeight+"px";
P.height=this.currentMaxHeight+"px";
S.height=this.currentMaxHeight-X+"px";
M.vy=Z-this.currentMaxHeight
}M.y=true
}if(M.vy&&R.deltaY){R.deltaY=-M.vy
}if(R.deltaY&&(M.vy||!M.y)){if(M.vy){R.deltaY=M.vy
}}if(R.deltaY&&(M.vy||!M.y)){if(M.vy){R.deltaY=M.vy
}var J=this.getStyle(W,"top");
J+=R.deltaY;
Q.top=J+"px"
}K.css(L);
this.scrollerDiv.css(S);
if(this.eIframe){this.eIframe.css(S)
}this.shadowDiv.css(P);
W.css(Q);
this.shadowDiv.css(Y);
E.extend(this.userOptions,Q);
E.extend(this.userOptions,L);
var N=this.width();
var V=this.height();
this.reductionData=null;
if(N<=2*this.getInitialSize()){this.reductionData={};
this.reductionData.w=N
}if(V<=2*this.getInitialSize()){if(!this.reductionData){this.reductionData={}
}this.reductionData.h=V
}if(this.header){this.header.doPosition()
}return M
},setSize:function(L,I){var J=L-this.width();
var K=I-this.height();
var M=new D.ui.PopupPanel.Sizer.Diff(0,0,J,K);
this.doResizeOrMove(M)
},moveTo:function(J,I){this.cdiv.css("top",J);
this.cdiv.css("left",I)
},move:function(J,I){var K=new D.ui.PopupPanel.Sizer.Diff(J,I,0,0);
this.doResizeOrMove(K)
},resize:function(J,I){var K=new D.ui.PopupPanel.Sizer.Diff(0,0,J,I);
this.doResizeOrMove(K)
},findForm:function(I){var J=I;
while(J){if(J[0]&&(!J[0].tagName||J[0].tagName.toLowerCase()!="form")){J=E(J).parent()
}else{break
}}return J
},setStateInput:function(K){var I=K.data.popup;
target=E(I.findForm(K.currentTarget));
var J=document.createElement("input");
J.type="hidden";
J.id=I.markerId+"OpenedState";
J.name=I.markerId+"OpenedState";
J.value=I.shown?"true":"false";
target.append(J);
E.each(I.userOptions,function(L,M){J=document.createElement("input");
J.type="hidden";
J.id=I.markerId+"StateOption_"+L;
J.name=I.markerId+"StateOption_"+L;
J.value=M;
target.append(J)
});
return true
}}
})());
E.extend(D.ui.PopupPanel,{showPopupPanel:function(J,I,H){D.Event.ready(function(){D.$(J).show()
})
},hidePopupPanel:function(J,I,H){D.Event.ready(function(){D.$(J).hide()
})
}})
})(jQuery,window.RichFaces);;(function(F,D){D.ui.NotifyMessage=function(K,J,I){H.constructor.call(this,K,J,A);
this.notifyOptions=I
};
D.ui.Base.extend(D.ui.NotifyMessage);
var H=D.ui.NotifyMessage.$super;
var A={showSummary:true,level:0,isMessages:false,globalOnly:false};
var G=function(K,I,M){var L=M.sourceId;
var J=M.message;
if(!this.options.forComponentId){if(!this.options.globalOnly&&J){E.call(this,L,J)
}}else{if(this.options.forComponentId===L){E.call(this,L,J)
}}};
var E=function(I,J){if(J&&J.severity>=this.options.level){C.call(this,J)
}};
var C=function(I){RichFaces.ui.Notify(F.extend({},this.notifyOptions,{summary:this.options.showSummary?I.summary:undefined,detail:this.options.showDetail?I.detail:undefined,severity:I.severity}))
};
var B=function(){D.Event.bind(window.document,D.Event.MESSAGE_EVENT_TYPE+this.namespace,G,this)
};
F.extend(D.ui.NotifyMessage.prototype,{name:"NotifyMessage",__bindEventHandlers:B,destroy:function(){D.Event.unbind(window.document,D.Event.MESSAGE_EVENT_TYPE+this.namespace);
H.destroy.call(this)
}})
})(jQuery,window.RichFaces||(window.RichFaces={}));;(function(B,I){B.ui=B.ui||{};
B.ui.FileUpload=function(N,L){this.id=N;
this.items=[];
this.submitedItems=[];
I.extend(this,L);
if(this.acceptedTypes){this.acceptedTypes=I.trim(this.acceptedTypes).toUpperCase().split(/\s*,\s*/)
}if(this.maxFilesQuantity){this.maxFilesQuantity=parseInt(I.trim(this.maxFilesQuantity))
}this.element=I(this.attachToDom());
this.form=this.element.parents("form:first");
var M=this.element.children(".rf-fu-hdr:first");
var K=M.children(".rf-fu-btns-lft:first");
this.addButton=K.children(".rf-fu-btn-add:first");
this.uploadButton=this.addButton.next();
this.clearButton=K.next().children(".rf-fu-btn-clr:first");
this.inputContainer=this.addButton.find(".rf-fu-inp-cntr:first");
this.input=this.inputContainer.children("input");
this.list=M.next();
this.hiddenContainer=this.list.next();
this.iframe=this.hiddenContainer.children("iframe:first");
this.progressBarElement=this.iframe.next();
this.progressBar=B.$(this.progressBarElement);
this.cleanInput=this.input.clone();
this.addProxy=I.proxy(this.__addItem,this);
this.input.change(this.addProxy);
this.addButton.mousedown(D).mouseup(G).mouseout(G);
this.uploadButton.click(I.proxy(this.__startUpload,this)).mousedown(D).mouseup(G).mouseout(G);
this.clearButton.click(I.proxy(this.__removeAllItems,this)).mousedown(D).mouseup(G).mouseout(G);
this.iframe.load(I.proxy(this.__load,this));
if(this.onfilesubmit){B.Event.bind(this.element,"onfilesubmit",new Function("event",this.onfilesubmit))
}if(this.ontyperejected){B.Event.bind(this.element,"ontyperejected",new Function("event",this.ontyperejected))
}if(this.onuploadcomplete){B.Event.bind(this.element,"onuploadcomplete",new Function("event",this.onuploadcomplete))
}if(this.onclear){B.Event.bind(this.element,"onclear",new Function("event",this.onclear))
}};
var A="rf_fu_uid";
var H="rf_fu_uid_alt";
var J="C:\\fakepath\\";
var F='<div class="rf-fu-itm"><span class="rf-fu-itm-lft"><span class="rf-fu-itm-lbl"/><span class="rf-fu-itm-st"/></span><span class="rf-fu-itm-rgh"><a href="javascript:void(0)" class="rf-fu-itm-lnk"/></span></div>';
var E={NEW:"new",UPLOADING:"uploading",DONE:"done",SIZE_EXCEEDED:"sizeExceeded",STOPPED:"stopped",SERVER_ERROR:"serverError"};
var D=function(K){I(this).children(":first").css("background-position","3px 3px").css("padding","4px 4px 2px 22px")
};
var G=function(K){I(this).children(":first").css("background-position","2px 2px").css("padding","3px 5px 3px 21px")
};
B.BaseComponent.extend(B.ui.FileUpload);
$.extend(B.ui.FileUpload.prototype,(function(){return{name:"FileUpload",doneLabel:"Done",sizeExceededLabel:"File size is exceeded",stoppedLabel:"",serverErrorLabel:"Server error",clearLabel:"Clear",deleteLabel:"Delete",__addItem:function(){var L=this.input.val();
if(!navigator.platform.indexOf("Win")){L=L.match(/[^\\]*$/)[0]
}else{if(!L.indexOf(J)){L=L.substr(J.length)
}else{L=L.match(/[^\/]*$/)[0]
}}if(this.__accept(L)&&(!this.noDuplicate||!this.__isFileAlreadyAdded(L))){this.input.hide();
this.input.unbind("change",this.addProxy);
var K=new C(this,L);
this.list.append(K.getJQuery());
this.items.push(K);
this.input=this.cleanInput.clone();
this.inputContainer.append(this.input);
this.input.change(this.addProxy);
this.__updateButtons()
}},__removeItem:function(K){this.items.splice(I.inArray(K,this.items),1);
this.submitedItems.splice(I.inArray(K,this.submitedItems),1);
this.__updateButtons();
B.Event.fire(this.element,"onclear",[K.model])
},__removeAllItems:function(L){var M=[];
for(var K in this.submitedItems){M.push(this.submitedItems[K].model)
}for(var K in this.items){M.push(this.items[K].model)
}this.list.empty();
this.items.splice(0,this.items.length);
this.submitedItems.splice(0,this.submitedItems.length);
this.__updateButtons();
B.Event.fire(this.element,"onclear",M)
},__updateButtons:function(){if(!this.loadableItem&&this.list.children(".rf-fu-itm").size()){if(this.items.length){this.uploadButton.css("display","inline-block")
}else{this.uploadButton.hide()
}this.clearButton.css("display","inline-block")
}else{this.uploadButton.hide();
this.clearButton.hide()
}if(this.maxFilesQuantity&&this.__getTotalItemCount()>=this.maxFilesQuantity){this.addButton.hide()
}else{this.addButton.css("display","inline-block")
}},__startUpload:function(){this.loadableItem=this.items.shift();
this.__updateButtons();
this.loadableItem.startUploading()
},__submit:function(){var O=this.form.children("input[name='javax.faces.encodedURL']");
var N=O.length>0?O.val():this.form.attr("action");
var L=this.form.attr("encoding");
var M=this.form.attr("enctype");
try{var K=N.indexOf("?")==-1?"?":"&";
this.form.attr("action",N+K+A+"="+this.loadableItem.uid);
this.form.attr("encoding","multipart/form-data");
this.form.attr("enctype","multipart/form-data");
B.submitForm(this.form,{"org.richfaces.ajax.component":this.id},this.id);
B.Event.fire(this.element,"onfilesubmit",this.loadableItem.model)
}finally{this.form.attr("action",N);
this.form.attr("encoding",L);
this.form.attr("enctype",M);
this.loadableItem.input.removeAttr("name")
}},__load:function(L){if(this.loadableItem){var N=L.target.contentWindow.document;
N=N.XMLDocument||N;
var S=N.documentElement;
var P,M;
if(S.tagName.toUpperCase()=="PARTIAL-RESPONSE"){var R=I(S).children("error");
P=R.length>0?E.SERVER_ERROR:E.DONE
}else{if((M=S.id)&&M.indexOf(A+this.loadableItem.uid+":")==0){P=M.split(":")[1]
}}if(P){var K={source:this.element[0],_mfInternal:{_mfSourceControlId:this.element.attr("id")}};
P==E.DONE&&jsf.ajax.response({responseXML:N},K);
this.loadableItem.finishUploading(P);
this.submitedItems.push(this.loadableItem);
if(P==E.DONE&&this.items.length){this.__startUpload()
}else{this.loadableItem=null;
this.__updateButtons();
var Q=[];
for(var O in this.submitedItems){Q.push(this.submitedItems[O].model)
}for(var O in this.items){Q.push(this.items[O].model)
}B.Event.fire(this.element,"onuploadcomplete",Q)
}}}},__accept:function(N){N=N.toUpperCase();
var K=!this.acceptedTypes;
for(var L=0;
!K&&L<this.acceptedTypes.length;
L++){var M=this.acceptedTypes[L];
K=N.indexOf(M,N.length-M.length)!==-1
}if(!K){B.Event.fire(this.element,"ontyperejected",N)
}return K
},__isFileAlreadyAdded:function(M){var K=false;
for(var L=0;
!K&&L<this.items.length;
L++){K=this.items[L].model.name==M
}K=K||(this.loadableItem&&this.loadableItem.model.name==M);
for(var L=0;
!K&&L<this.submitedItems.length;
L++){K=this.submitedItems[L].model.name==M
}return K
},__getTotalItemCount:function(){return this.__getItemCountByState(this.items,E.NEW)+this.__getItemCountByState(this.submitedItems,E.DONE)
},__getItemCountByState:function(K){var N={};
var M=0;
for(var L=1;
L<arguments.length;
L++){N[arguments[L]]=true
}for(var L=0;
L<K.length;
L++){if(N[K[L].model.state]){M++
}}return M
}}
})());
var C=function(K,L){this.fileUpload=K;
this.input=K.input;
this.model={name:L,state:E.NEW}
};
I.extend(C.prototype,{getJQuery:function(){this.element=I(F);
var K=this.element.children(".rf-fu-itm-lft:first");
this.label=K.children(".rf-fu-itm-lbl:first");
this.state=this.label.nextAll(".rf-fu-itm-st:first");
this.link=K.next().children("a");
this.label.html(this.model.name);
this.link.html(this.fileUpload.deleteLabel);
this.link.click(I.proxy(this.removeOrStop,this));
return this.element
},removeOrStop:function(){this.input.remove();
this.element.remove();
this.fileUpload.__removeItem(this)
},startUploading:function(){this.state.css("display","block");
this.link.html("");
this.input.attr("name",this.fileUpload.id);
this.model.state=E.UPLOADING;
this.uid=Math.random();
this.fileUpload.__submit();
if(this.fileUpload.progressBar){this.fileUpload.progressBar.setValue(0);
this.state.html(this.fileUpload.progressBarElement.detach());
var K={};
K[H]=this.uid;
this.fileUpload.progressBar.enable(K)
}},finishUploading:function(K){if(this.fileUpload.progressBar){this.fileUpload.progressBar.disable();
this.fileUpload.hiddenContainer.append(this.fileUpload.progressBarElement.detach())
}this.input.remove();
this.state.html(this.fileUpload[K+"Label"]);
this.link.html(this.fileUpload.clearLabel);
this.model.state=K
}})
}(window.RichFaces,jQuery));;(function(C,A){A.Event=A.Event||{};
var D=jsf.ajax.request;
jsf.ajax.request=function B(I,H,E){var F,G;
if(typeof I==="string"){F=document.getElementById(I)
}else{if(typeof I==="object"){F=I
}else{throw new Error("jsf.request: source must be object or string")
}}if(C(F).is("form")){G=I
}else{G=C("form").has(F).get(0)
}if(G&&A.Event&&A.Event.callHandler){A.Event.callHandler(G,"ajaxsubmit")
}D(I,H,E)
}
})(jQuery,window.RichFaces||(window.RichFaces={}));;(function(B,A){A.ui=A.ui||{};
A.ui.ComponentControl=A.ui.ComponentControl||{};
B.extend(A.ui.ComponentControl,{execute:function(H,G){var I=G.target;
var D=G.selector;
var J=G.callback;
if(G.onbeforeoperation&&typeof G.onbeforeoperation=="function"){var C=G.onbeforeoperation(H);
if(C=="false"||C==0){return 
}}if(I){for(var F=0;
F<I.length;
F++){var E=document.getElementById(I[F]);
if(E){A.ui.ComponentControl.invokeOnComponent(H,E,J)
}}}if(D){A.ui.ComponentControl.invokeOnComponent(H,D,J)
}},invokeOnComponent:function(C,D,E){if(E&&typeof E=="function"){B(D).each(function(){var F=A.$(this);
if(F){E(C,F)
}})
}}})
})(jQuery,window.RichFaces);;(function(D,C){C.ui=C.ui||{};
var A={interval:1000,minValue:0,maxValue:100};
var B={initial:"> .rf-pb-init",progress:"> .rf-pb-rmng",finish:"> .rf-pb-fin"};
C.ui.ProgressBar=function(G,F){E.constructor.call(this,G);
this.__elt=this.attachToDom();
this.options=D.extend(this.options,A,F||{});
this.enabled=this.options.enabled;
this.minValue=this.options.minValue;
this.maxValue=this.options.maxValue;
this.__setValue(this.options.value||this.options.minValue);
if(this.options.resource){this.__poll()
}else{if(this.options.submitFunction){this.submitFunction=new Function("beforeUpdateHandler","afterUpdateHandler","params","event",this.options.submitFunction);
this.__poll()
}}if(this.options.onfinish){C.Event.bind(this.__elt,"finish",new Function("event",this.options.onfinish))
}};
C.BaseComponent.extend(C.ui.ProgressBar);
var E=C.ui.ProgressBar.$super;
D.extend(C.ui.ProgressBar.prototype,(function(){return{name:"ProgressBar",__isInitialState:function(){return parseFloat(this.value)<parseFloat(this.getMinValue())
},__isProgressState:function(){return !this.__isInitialState()&&!this.__isFinishState()
},__isFinishState:function(){return parseFloat(this.value)>=parseFloat(this.getMaxValue())
},__beforeUpdate:function(F){if(F.componentData&&typeof F.componentData[this.id]!="undefined"){this.setValue(F.componentData[this.id])
}},__afterUpdate:function(F){this.__poll()
},__onResourceDataAvailable:function(F){var G=C.parseJSON(F);
if(G instanceof Number||typeof G=="number"){this.setValue(G)
}this.__poll()
},__submit:function(){if(this.submitFunction){this.submitFunction.call(this,D.proxy(this.__beforeUpdate,this),D.proxy(this.__afterUpdate,this),this.__params||{})
}else{D.get(this.options.resource,this.__params||{},D.proxy(this.__onResourceDataAvailable,this),"text")
}},__poll:function(F){if(this.enabled){if(F){this.__submit()
}else{this.__pollTimer=setTimeout(D.proxy(this.__submit,this),this.options.interval)
}}},__calculatePercent:function(G){var H=parseFloat(this.getMinValue());
var F=parseFloat(this.getMaxValue());
var I=parseFloat(G);
if(H<I&&I<F){return(100*(I-H))/(F-H)
}else{if(I<=H){return 0
}else{if(I>=F){return 100
}}}},__getPropertyOrObject:function(G,F){if(D.isPlainObject(G)&&G.propName){return G.propName
}return G
},getValue:function(){return this.value
},__showState:function(F){var G=D(B[F],this.__elt);
if(G.length==0&&(F=="initial"||F=="finish")){G=D(B.progress,this.__elt)
}G.show().siblings().hide()
},__setValue:function(G,F){this.value=parseFloat(this.__getPropertyOrObject(G,"value"));
if(this.__isFinishState()||this.__isInitialState()){this.disable()
}},__updateVisualState:function(){if(this.__isInitialState()){this.__showState("initial")
}else{if(this.__isFinishState()){this.__showState("finish")
}else{this.__showState("progress")
}}var F=this.__calculatePercent(this.value);
D(".rf-pb-prgs",this.__elt).css("width",F+"%")
},setValue:function(G){var F=this.__isFinishState();
this.__setValue(G);
this.__updateVisualState();
if(!F&&this.__isFinishState()){C.Event.callHandler(this.__elt,"finish")
}},getMaxValue:function(){return this.maxValue
},getMinValue:function(){return this.minValue
},isAjaxMode:function(){return !!this.submitFunction||!!this.options.resource
},disable:function(){this.__params=null;
if(this.__pollTimer){clearTimeout(this.__pollTimer);
this.__pollTimer=null
}this.enabled=false
},enable:function(F){if(this.isEnabled()){return 
}this.__params=F;
this.enabled=true;
if(this.isAjaxMode()){this.__poll(true)
}},isEnabled:function(){return this.enabled
},destroy:function(){this.disable();
this.__elt=null;
E.destroy.call(this)
}}
}()))
})(jQuery,RichFaces);;(function(A,C){A.ui=A.ui||{};
A.ui.InputNumberSpinner=A.BaseComponent.extendClass({name:"InputNumberSpinner",cycled:true,delay:200,maxValue:100,minValue:0,step:1,init:function(H,D){B.constructor.call(this,H);
C.extend(this,D);
this.element=C(this.attachToDom());
this.input=this.element.children(".rf-insp-inp");
var F=Number(this.input.val());
if(isNaN(F)){F=this.minValue
}this.__setValue(F,null,true);
if(!this.input.attr("disabled")){var G=this.element.children(".rf-insp-btns");
this.decreaseButton=G.children(".rf-insp-dec");
this.increaseButton=G.children(".rf-insp-inc");
var E=C.proxy(this.__inputHandler,this);
this.input.change(E);
this.input.submit(E);
this.input.submit(E);
this.input.mousewheel(C.proxy(this.__mousewheelHandler,this));
this.input.keydown(C.proxy(this.__keydownHandler,this));
this.decreaseButton.mousedown(C.proxy(this.__decreaseHandler,this));
this.increaseButton.mousedown(C.proxy(this.__increaseHandler,this))
}},decrease:function(D){var E=this.value-this.step;
E=this.roundFloat(E);
if(E<this.minValue&&this.cycled){E=this.maxValue
}this.__setValue(E,D)
},increase:function(D){var E=this.value+this.step;
E=this.roundFloat(E);
if(E>this.maxValue&&this.cycled){E=this.minValue
}this.__setValue(E,D)
},getValue:function(){return this.value
},setValue:function(E,D){if(!this.input.attr("disabled")){this.__setValue(E)
}},roundFloat:function(D){var G=this.step.toString();
var F=0;
if(!/\./.test(G)){if(this.step>=1){return D
}if(/e/.test(G)){F=G.split("-")[1]
}}else{F=G.length-G.indexOf(".")-1
}var E=D.toFixed(F);
return parseFloat(E)
},destroy:function(D){if(this.intervalId){window.clearInterval(this.intervalId);
this.decreaseButton.css("backgroundPosition"," 50% 40%").unbind("mouseout",this.destroy).unbind("mouseup",this.destroy);
this.increaseButton.css("backgroundPosition"," 50% 40%").unbind("mouseout",this.destroy).unbind("mouseup",this.destroy);
this.intervalId=null
}B.destroy.call(this)
},__setValue:function(E,D,F){if(!isNaN(E)){if(E>this.maxValue){E=this.maxValue;
this.input.val(E)
}else{if(E<this.minValue){E=this.minValue;
this.input.val(E)
}}if(E!=this.value){this.input.val(E);
this.value=E;
if(this.onchange&&!F){this.onchange.call(this.element[0],D)
}}}},__inputHandler:function(D){var E=Number(this.input.val());
if(isNaN(E)){this.input.val(this.value)
}else{this.__setValue(E,D)
}},__mousewheelHandler:function(F,G,E,D){G=E||D;
if(G>0){this.increase(F)
}else{if(G<0){this.decrease(F)
}}return false
},__keydownHandler:function(D){if(D.keyCode==40){this.decrease(D);
D.preventDefault()
}else{if(D.keyCode==38){this.increase(D);
D.preventDefault()
}}},__decreaseHandler:function(F){var D=this;
D.decrease(F);
this.intervalId=window.setInterval(function(){D.decrease(F)
},this.delay);
var E=C.proxy(this.destroy,this);
this.decreaseButton.bind("mouseup",E).bind("mouseout",E).css("backgroundPosition","60% 60%");
F.preventDefault()
},__increaseHandler:function(F){var D=this;
D.increase(F);
this.intervalId=window.setInterval(function(){D.increase(F)
},this.delay);
var E=C.proxy(this.destroy,this);
this.increaseButton.bind("mouseup",E).bind("mouseout",E).css("backgroundPosition","60% 60%");
F.preventDefault()
}});
var B=A.ui.InputNumberSpinner.$super
}(window.RichFaces,jQuery));;(function(C){C.hotkeys={version:"0.8",specialKeys:{8:"backspace",9:"tab",13:"return",16:"shift",17:"ctrl",18:"alt",19:"pause",20:"capslock",27:"esc",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",45:"insert",46:"del",96:"0",97:"1",98:"2",99:"3",100:"4",101:"5",102:"6",103:"7",104:"8",105:"9",106:"*",107:"+",109:"-",110:".",111:"/",112:"f1",113:"f2",114:"f3",115:"f4",116:"f5",117:"f6",118:"f7",119:"f8",120:"f9",121:"f10",122:"f11",123:"f12",144:"numlock",145:"scroll",191:"/",224:"meta"},shiftNums:{"`":"~","1":"!","2":"@","3":"#","4":"$","5":"%","6":"^","7":"&","8":"*","9":"(","0":")","-":"_","=":"+",";":": ","'":'"',",":"<",".":">","/":"?","\\":"|"}};
var A={key:"",enabledInInput:false};
function B(F){var E=(typeof F.data=="string")?{key:F.data}:F.data;
E=C.extend({},A,E);
var D=F.handler,G=E.key.toLowerCase().split(" ");
if(G.length===1&&G[0]===""){return 
}F.handler=function(H){var N=String.fromCharCode(H.which).toLowerCase(),J=(/textarea|select/i.test(H.target.nodeName)||H.target.type==="text");
if(this!==H.target&&J&&!E.enabledInInput){return 
}var O=H.type!=="keypress"&&C.hotkeys.specialKeys[H.which],P,K="",L={};
if(H.altKey&&O!=="alt"){K+="alt+"
}if(H.ctrlKey&&O!=="ctrl"){K+="ctrl+"
}if(H.metaKey&&!H.ctrlKey&&O!=="meta"){K+="meta+"
}if(H.shiftKey&&O!=="shift"){K+="shift+"
}if(O){L[K+O]=true
}else{L[K+N]=true;
L[K+C.hotkeys.shiftNums[N]]=true;
if(K==="shift+"){L[C.hotkeys.shiftNums[N]]=true
}}for(var M=0,I=G.length;
M<I;
M++){if(L[G[M]]){return D.apply(this,arguments)
}}}
}C.each(["keydown","keyup","keypress"],function(){C.event.special[this]={add:B}
})
})(jQuery);;(function(C,B){B.ui=B.ui||{};
var A={mode:"server",cssRoot:"ddm",cssClasses:{}};
B.ui.MenuItem=function(G,F){this.options={};
C.extend(this.options,A,F||{});
D.constructor.call(this,G);
C.extend(this.options.cssClasses,E.call(this,this.options.cssRoot));
this.attachToDom(G);
this.element=C(B.getDomElement(G));
B.Event.bindById(this.id,"click",this.__clickHandler,this);
B.Event.bindById(this.id,"mouseenter",this.select,this);
B.Event.bindById(this.id,"mouseleave",this.unselect,this);
this.selected=false
};
var E=function(G){var F={itemCss:"rf-"+G+"-itm",selectItemCss:"rf-"+G+"-itm-sel",unselectItemCss:"rf-"+G+"-itm-unsel",labelCss:"rf-"+G+"-lbl"};
return F
};
B.BaseComponent.extend(B.ui.MenuItem);
var D=B.ui.MenuItem.$super;
C.extend(B.ui.MenuItem.prototype,(function(){return{name:"MenuItem",select:function(){this.element.removeClass(this.options.cssClasses.unselectItemCss);
this.element.addClass(this.options.cssClasses.selectItemCss);
this.selected=true
},unselect:function(){this.element.removeClass(this.options.cssClasses.selectItemCss);
this.element.addClass(this.options.cssClasses.unselectItemCss);
this.selected=false
},activate:function(){this.invokeEvent("click",B.getDomElement(this.id))
},isSelected:function(){return this.selected
},__clickHandler:function(I){if(C(I.target).is(":input:not(:button):not(:reset):not(:submit)")){return 
}var F=this.__getParentMenu();
if(F){F.processItem(this.element)
}var H=B.getDomElement(this.id);
var K=this.options.params;
var G=this.__getParentForm(H);
var J={};
J[H.id]=H.id;
C.extend(J,K||{});
I.form=G;
I.itemId=J;
this.options.onClickHandler.call(this,I)
},__getParentForm:function(F){return C(C(F).parents("form").get(0))
},__getParentMenu:function(){var F=this.element.parents("div."+this.options.cssClasses.labelCss);
if(F&&F.length>0){return B.$(F)
}else{return null
}}}
})())
})(jQuery,RichFaces);;(function(B,E){B.utils=B.utils||{};
B.utils.addCSSText=function(H,F){var G=E("<style></style>").attr({type:"text/css",id:F}).appendTo("head");
try{G.html(H)
}catch(I){G[0].styleSheet.cssText=H
}};
B.utils.getCSSRule=function(H){var J=null;
var I=document.styleSheets;
for(var F=0;
!J&&F<I.length;
F++){var K=I[F].cssRules?I[F].cssRules:I[F].rules;
for(var G=0;
!J&&G<K.length;
G++){if(K[G].selectorText&&K[G].selectorText.toLowerCase()==H.toLowerCase()){J=K[G]
}}}return J
};
B.utils.Ranges=function(){this.ranges=[]
};
B.utils.Ranges.prototype={add:function(F){var G=0;
while(G<this.ranges.length&&F>=this.ranges[G++][1]){}G--;
if(this.ranges[G-1]&&F==(this.ranges[G-1][1]+1)){if(F==(this.ranges[G][0]-1)){this.ranges[G-1][1]=this.ranges[G][1];
this.ranges.splice(G,1)
}else{this.ranges[G-1][1]++
}}else{if(this.ranges[G]){if(this.ranges[G]&&F==(this.ranges[G][0]-1)){this.ranges[G][0]--
}else{if(F==(this.ranges[G][1]+1)){this.ranges[G][1]++
}else{if(F<this.ranges[G][1]){this.ranges.splice(G,0,[F,F])
}else{this.ranges.splice(G+1,0,[F,F])
}}}}else{this.ranges.splice(G,0,[F,F])
}}},remove:function(F){var G=0;
while(G<this.ranges.length&&F>this.ranges[G++][1]){}G--;
if(this.ranges[G]){if(F==(this.ranges[G][1])){if(F==(this.ranges[G][0])){this.ranges.splice(G,1)
}else{this.ranges[G][1]--
}}else{if(F==(this.ranges[G][0])){this.ranges[G][0]++
}else{this.ranges.splice(G+1,0,[F+1,this.ranges[G][1]]);
this.ranges[G][1]=F-1
}}}},clear:function(){this.ranges=[]
},contains:function(F){var G=0;
while(G<this.ranges.length&&F>=this.ranges[G][0]){if(F>=this.ranges[G][0]&&F<=this.ranges[G][1]){return true
}else{G++
}}return false
},toString:function(){var F=new Array(this.ranges.length);
for(var G=0;
G<this.ranges.length;
G++){F[G]=this.ranges[G].join()
}return F.join(";")
}};
var A="rf-edt-c-";
var C=20;
B.ui=B.ui||{};
B.ui.ExtendedDataTable=B.BaseComponent.extendClass({name:"ExtendedDataTable",resizeData:{},idOfReorderingColumn:"",timeoutId:null,init:function(J,G,F,H){D.constructor.call(this,J);
this.ranges=new B.utils.Ranges();
this.rowCount=G;
this.ajaxFunction=F;
this.options=H||{};
this.element=this.attachToDom();
this.dragElement=document.getElementById(J+":d");
this.reorderElement=document.getElementById(J+":r");
this.reorderMarkerElement=document.getElementById(J+":rm");
this.widthInput=document.getElementById(J+":wi");
this.newWidths={};
this.selectionInput=document.getElementById(J+":si");
this.header=E(this.element).children(".rf-edt-hdr");
this.headerCells=this.header.find(".rf-edt-hdr-c");
this.footerCells=E(this.element).children(".rf-edt-ftr").find(".rf-edt-ftr-c");
this.resizerHolders=this.header.find(".rf-edt-rsz-cntr");
this.frozenHeaderPartElement=document.getElementById(J+":frozenHeader");
this.frozenColumnCount=this.frozenHeaderPartElement?this.frozenHeaderPartElement.firstChild.rows[0].cells.length:0;
this.headerElement=document.getElementById(J+":header");
this.footerElement=document.getElementById(J+":footer");
this.scrollElement=document.getElementById(J+":scrl");
this.scrollContentElement=document.getElementById(J+":scrl-cnt");
var I=document.getElementById(J+":body");
if(this.options.onready&&typeof this.options.onready=="function"){B.Event.bind(this.element,"rich:ready",this.options.onready)
}E(document).ready(E.proxy(this.initialize,this));
E(window).bind("resize",E.proxy(this.updateLayout,this));
E(this.scrollElement).bind("scroll",E.proxy(this.updateScrollPosition,this));
this.bindHeaderHandlers();
E(this.element).bind("rich:onajaxcomplete",E.proxy(this.ajaxComplete,this))
},getColumnPosition:function(H){var F;
for(var G=0;
G<this.headerCells.length;
G++){if(H==this.headerCells[G].className.match(new RegExp(A+"([^\\W]*)"))[1]){F=G
}}return F
},setColumnPosition:function(K,F){var J="";
var H;
for(var G=0;
G<this.headerCells.length;
G++){var I=this.headerCells[G].className.match(new RegExp(A+"([^\\W]*)"))[1];
if(G==F){if(H){J+=I+","+K+","
}else{J+=K+","+I+","
}}else{if(K!=I){J+=I+","
}else{H=true
}}}this.ajaxFunction(null,{"rich:columnsOrder":J})
},setColumnWidth:function(H,F){F=F+"px";
B.utils.getCSSRule("."+A+H).style.width=F;
this.newWidths[H]=F;
var G=new Array();
for(var H in this.newWidths){G.push(H+":"+this.newWidths[H])
}this.widthInput.value=G.toString();
this.updateLayout();
this.adjustResizers();
this.ajaxFunction()
},filter:function(H,I,F){if(typeof (I)=="undefined"||I==null){I=""
}var G={};
G[this.id+"rich:filtering"]=H+":"+I+":"+F;
this.ajaxFunction(null,G)
},clearFiltering:function(){this.filter("","",true)
},sort:function(I,G,F){if(typeof (G)=="string"){G=G.toLowerCase()
}var H={};
H[this.id+"rich:sorting"]=I+":"+G+":"+F;
this.ajaxFunction(null,H)
},clearSorting:function(){this.sort("","",true)
},destroy:function(){E(window).unbind("resize",this.updateLayout);
E(B.getDomElement(this.id+":st")).remove();
D.destroy.call(this)
},bindHeaderHandlers:function(){this.header.find(".rf-edt-rsz").bind("mousedown",E.proxy(this.beginResize,this));
this.headerCells.bind("mousedown",E.proxy(this.beginReorder,this))
},updateLayout:function(){this.headerCells.height("auto");
var L=0;
this.headerCells.each(function(){if(this.clientHeight>L){L=this.clientHeight
}});
this.headerCells.height(L+"px");
this.footerCells.height("auto");
var H=0;
this.footerCells.each(function(){if(this.clientHeight>H){H=this.clientHeight
}});
this.footerCells.height(H+"px");
this.normalPartStyle.width="auto";
var K=this.frozenHeaderPartElement?this.frozenHeaderPartElement.offsetWidth:0;
var J=Math.max(0,this.element.clientWidth-K);
if(J){var G=this.parts.width();
if(G>J){this.normalPartStyle.width=J+"px"
}this.normalPartStyle.display="block";
if(G>J){this.parts.each(function(){this.style.width=J+"px"
});
this.scrollElement.style.display="block";
this.scrollElement.style.overflowX="scroll";
this.scrollElement.style.width=J+"px";
this.scrollContentElement.style.width=G+"px"
}else{this.parts.each(function(){this.style.width=""
});
this.scrollElement.style.display="none"
}}else{this.normalPartStyle.display="none"
}var F=this.element.clientHeight;
var I=this.element.firstChild;
while(I&&(!I.nodeName||I.nodeName.toUpperCase()!="TABLE")){if(I.nodeName&&I.nodeName.toUpperCase()=="DIV"&&I!=this.bodyElement){F-=I.offsetHeight
}I=I.nextSibling
}if(this.bodyElement.offsetHeight>F||!this.contentElement){this.bodyElement.style.height=F+"px"
}},adjustResizers:function(){var H=this.scrollElement?this.scrollElement.scrollLeft:0;
var G=this.element.clientWidth-3;
var F=0;
for(;
F<this.frozenColumnCount;
F++){if(G>0){this.resizerHolders[F].style.display="none";
this.resizerHolders[F].style.display="";
G-=this.resizerHolders[F].offsetWidth
}if(G<=0){this.resizerHolders[F].style.display="none"
}}H-=3;
for(;
F<this.resizerHolders.length;
F++){if(G>0){this.resizerHolders[F].style.display="none";
if(H>0){this.resizerHolders[F].style.display="";
H-=this.resizerHolders[F].offsetWidth;
if(H>0){this.resizerHolders[F].style.display="none"
}else{G+=H
}}else{this.resizerHolders[F].style.display="";
G-=this.resizerHolders[F].offsetWidth
}}if(G<=0){this.resizerHolders[F].style.display="none"
}}},updateScrollPosition:function(){if(this.scrollElement){var F=this.scrollElement.scrollLeft;
this.parts.each(function(){this.scrollLeft=F
})
}this.adjustResizers()
},initialize:function(){this.bodyElement=document.getElementById(this.id+":b");
this.bodyElement.tabIndex=-1;
this.normalPartStyle=B.utils.getCSSRule("div.rf-edt-cnt").style;
var F=E(this.bodyElement);
this.contentElement=F.children("div:not(.rf-edt-ndt):first")[0];
if(this.contentElement){this.spacerElement=this.contentElement.firstChild;
this.dataTableElement=this.contentElement.lastChild;
this.tbodies=E(document.getElementById(this.id+":tbf")).add(document.getElementById(this.id+":tbn"));
this.rows=this.tbodies[0].rows.length;
this.rowHeight=this.dataTableElement.offsetHeight/this.rows;
if(this.rowCount!=this.rows){this.contentElement.style.height=(this.rowCount*this.rowHeight)+"px"
}F.bind("scroll",E.proxy(this.bodyScrollListener,this));
if(this.options.selectionMode!="none"){this.tbodies.bind("click",E.proxy(this.selectionClickListener,this));
F.bind(window.opera?"keypress":"keydown",E.proxy(this.selectionKeyDownListener,this));
this.initializeSelection()
}}else{this.spacerElement=null;
this.dataTableElement=null
}this.parts=E(this.element).find(".rf-edt-cnt, .rf-edt-ftr-cnt");
this.updateLayout();
this.updateScrollPosition();
E(this.element).triggerHandler("rich:ready",this)
},drag:function(F){E(this.dragElement).setPosition({left:Math.max(this.resizeData.left+C,F.pageX)});
return false
},beginResize:function(F){var G=F.currentTarget.parentNode.className.match(new RegExp(A+"([^\\W]*)"))[1];
this.resizeData={id:G,left:E(F.currentTarget).parent().offset().left};
this.dragElement.style.height=this.element.offsetHeight+"px";
E(this.dragElement).setPosition({top:E(this.element).offset().top,left:F.pageX});
this.dragElement.style.display="block";
E(document).bind("mousemove",E.proxy(this.drag,this));
E(document).one("mouseup",E.proxy(this.endResize,this));
return false
},endResize:function(G){E(document).unbind("mousemove",this.drag);
this.dragElement.style.display="none";
var F=Math.max(C,G.pageX-this.resizeData.left);
this.setColumnWidth(this.resizeData.id,F)
},reorder:function(F){E(this.reorderElement).setPosition(F,{offset:[5,5]});
this.reorderElement.style.display="block";
return false
},beginReorder:function(F){if(!E(F.target).is("a, img, :input")){this.idOfReorderingColumn=F.currentTarget.className.match(new RegExp(A+"([^\\W]*)"))[1];
E(document).bind("mousemove",E.proxy(this.reorder,this));
this.headerCells.bind("mouseover",E.proxy(this.overReorder,this));
E(document).one("mouseup",E.proxy(this.cancelReorder,this));
return false
}},overReorder:function(G){if(this.idOfReorderingColumn!=G.currentTarget.className.match(new RegExp(A+"([^\\W]*)"))[1]){var F=E(G.currentTarget);
var H=F.offset();
E(this.reorderMarkerElement).setPosition({top:H.top+F.height(),left:H.left-5});
this.reorderMarkerElement.style.display="block";
F.one("mouseout",E.proxy(this.outReorder,this));
F.one("mouseup",E.proxy(this.endReorder,this))
}},outReorder:function(F){this.reorderMarkerElement.style.display="";
E(F.currentTarget).unbind("mouseup",this.endReorder)
},endReorder:function(F){this.reorderMarkerElement.style.display="";
E(F.currentTarget).unbind("mouseout",this.outReorder);
var I=F.currentTarget.className.match(new RegExp(A+"([^\\W]*)"))[1];
var H="";
var G=this;
this.headerCells.each(function(){var J=this.className.match(new RegExp(A+"([^\\W]*)"))[1];
if(J==I){H+=G.idOfReorderingColumn+","+I+","
}else{if(J!=G.idOfReorderingColumn){H+=J+","
}}});
this.ajaxFunction(F,{"rich:columnsOrder":H})
},cancelReorder:function(F){E(document).unbind("mousemove",this.reorder);
this.headerCells.unbind("mouseover",this.overReorder);
this.reorderElement.style.display="none"
},loadData:function(G){var F=Math.round((this.bodyElement.scrollTop+this.bodyElement.clientHeight/2)/this.rowHeight-this.rows/2);
if(F<=0){F=0
}else{F=Math.min(this.rowCount-this.rows,F)
}this.ajaxFunction(G,{"rich:clientFirst":F})
},bodyScrollListener:function(F){if(this.timeoutId){window.clearTimeout(this.timeoutId);
this.timeoutId=null
}if(Math.max(F.currentTarget.scrollTop-this.rowHeight,0)<this.spacerElement.offsetHeight||Math.min(F.currentTarget.scrollTop+this.rowHeight+F.currentTarget.clientHeight,F.currentTarget.scrollHeight)>this.spacerElement.offsetHeight+this.dataTableElement.offsetHeight){var G=this;
this.timeoutId=window.setTimeout(function(H){G.loadData(H)
},1000)
}},showActiveRow:function(){if(this.bodyElement.scrollTop>this.activeIndex*this.rowHeight+this.spacerElement.offsetHeight){this.bodyElement.scrollTop=Math.max(this.bodyElement.scrollTop-this.rowHeight,0)
}else{if(this.bodyElement.scrollTop+this.bodyElement.clientHeight<(this.activeIndex+1)*this.rowHeight+this.spacerElement.offsetHeight){this.bodyElement.scrollTop=Math.min(this.bodyElement.scrollTop+this.rowHeight,this.bodyElement.scrollHeight-this.bodyElement.clientHeight)
}}},selectRow:function(F){this.ranges.add(F);
for(var G=0;
G<this.tbodies.length;
G++){E(this.tbodies[G].rows[F]).addClass("rf-edt-r-sel")
}},deselectRow:function(F){this.ranges.remove(F);
for(var G=0;
G<this.tbodies.length;
G++){E(this.tbodies[G].rows[F]).removeClass("rf-edt-r-sel")
}},setActiveRow:function(F){if(typeof this.activeIndex=="number"){for(var G=0;
G<this.tbodies.length;
G++){E(this.tbodies[G].rows[this.activeIndex]).removeClass("rf-edt-r-act")
}}this.activeIndex=F;
for(var G=0;
G<this.tbodies.length;
G++){E(this.tbodies[G].rows[this.activeIndex]).addClass("rf-edt-r-act")
}},resetShiftRow:function(){if(typeof this.shiftIndex=="number"){for(var F=0;
F<this.tbodies.length;
F++){E(this.tbodies[F].rows[this.shiftIndex]).removeClass("rf-edt-r-sht")
}}this.shiftIndex=null
},setShiftRow:function(F){this.resetShiftRow();
this.shiftIndex=F;
if(typeof F=="number"){for(var G=0;
G<this.tbodies.length;
G++){E(this.tbodies[G].rows[this.shiftIndex]).addClass("rf-edt-r-sht")
}}},initializeSelection:function(){this.ranges.clear();
var F=this.selectionInput.value.split("|");
this.activeIndex=F[1]||null;
this.shiftIndex=F[2]||null;
this.selectionFlag=null;
var H=this.tbodies[0].rows;
for(var G=0;
G<H.length;
G++){var I=E(H[G]);
if(I.hasClass("rf-edt-r-sel")){this.ranges.add(I[0].rowIndex)
}if(I.hasClass("rf-edt-r-act")){this.activeIndex=I[0].rowIndex
}if(I.hasClass("rf-edt-r-sht")){this.shiftIndex=I[0].rowIndex
}}this.writeSelection()
},writeSelection:function(){this.selectionInput.value=[this.ranges,this.activeIndex,this.shiftIndex,this.selectionFlag].join("|")
},selectRows:function(F){if(typeof F=="number"){F=[F,F]
}var H;
var G=0;
for(;
G<F[0];
G++){if(this.ranges.contains(G)){this.deselectRow(G);
H=true
}}for(;
G<=F[1];
G++){if(!this.ranges.contains(G)){this.selectRow(G);
H=true
}}for(;
G<this.rows;
G++){if(this.ranges.contains(G)){this.deselectRow(G);
H=true
}}this.selectionFlag=typeof this.shiftIndex=="string"?this.shiftIndex:"x";
return H
},processSlectionWithShiftKey:function(G){if(this.shiftIndex==null){this.setShiftRow(this.activeIndex!=null?this.activeIndex:G)
}var F;
if("u"==this.shiftIndex){F=[0,G]
}else{if("d"==this.shiftIndex){F=[G,this.rows-1]
}else{if(G>=this.shiftIndex){F=[this.shiftIndex,G]
}else{F=[G,this.shiftIndex]
}}}return this.selectRows(F)
},onbeforeselectionchange:function(F){return !this.options.onbeforeselectionchange||this.options.onbeforeselectionchange.call(this.element,F)!=false
},onselectionchange:function(G,F,H){if(!G.shiftKey){this.resetShiftRow()
}if(this.activeIndex!=F){this.setActiveRow(F);
this.showActiveRow()
}if(H){this.writeSelection();
if(this.options.onselectionchange){this.options.onselectionchange.call(this.element,G)
}}},selectionClickListener:function(G){if(!this.onbeforeselectionchange(G)){return 
}var I;
if(G.shiftKey||G.ctrlKey){if(window.getSelection){window.getSelection().removeAllRanges()
}else{if(document.selection){document.selection.empty()
}}}var H=G.target;
while(this.tbodies.index(H.parentNode)==-1){H=H.parentNode
}var F=H.rowIndex;
if(this.options.selectionMode=="single"||(this.options.selectionMode!="multipleKeyboardFree"&&!G.shiftKey&&!G.ctrlKey)){I=this.selectRows(F)
}else{if(this.options.selectionMode=="multipleKeyboardFree"||(!G.shiftKey&&G.ctrlKey)){if(this.ranges.contains(F)){this.deselectRow(F)
}else{this.selectRow(F)
}I=true
}else{I=this.processSlectionWithShiftKey(F)
}}this.onselectionchange(G,F,I)
},selectionKeyDownListener:function(G){if(G.ctrlKey&&this.options.selectionMode!="single"&&(G.keyCode==65||G.keyCode==97)&&this.onbeforeselectionchange(G)){this.selectRows([0,rows]);
this.selectionFlag="a";
this.onselectionchange(G,this.activeIndex,true);
G.preventDefault()
}else{var F;
if(G.keyCode==38){F=-1
}else{if(G.keyCode==40){F=1
}}if(F!=null&&this.onbeforeselectionchange(G)){if(typeof this.activeIndex=="number"){F+=this.activeIndex;
if(F>=0&&F<this.rows){var H;
if(this.options.selectionMode=="single"||(!G.shiftKey&&!G.ctrlKey)){H=this.selectRows(F)
}else{if(G.shiftKey){H=this.processSlectionWithShiftKey(F)
}}this.onselectionchange(G,F,H)
}}G.preventDefault()
}}},ajaxComplete:function(F,G){if(G.reinitializeHeader){this.bindHeaderHandlers()
}else{this.selectionInput=document.getElementById(this.id+":si");
if(G.reinitializeBody){this.rowCount=G.rowCount;
this.initialize()
}else{if(this.options.selectionMode!="none"){this.initializeSelection()
}}if(this.spacerElement){this.spacerElement.style.height=(G.first*this.rowHeight)+"px"
}}},contextMenuAttach:function(G){var F="[id='"+this.element.id+"'] ";
F+=(typeof G.options.targetSelector==="undefined")?".rf-edt-b td":G.options.targetSelector;
F=E.trim(F);
B.Event.bind(F,G.options.showEvent,$.proxy(G.__showHandler,G),G)
},contextMenuShow:function(I,G){var H=G.target;
while(this.tbodies.index(H.parentNode)==-1){H=H.parentNode
}var F=H.rowIndex;
if(!this.ranges.contains(F)){this.selectionClickListener(G)
}}});
var D=B.ui.ExtendedDataTable.$super
}(window.RichFaces,jQuery));;(function(C,B){B.ui=B.ui||{};
var A={expandSingle:true,bubbleSelection:true};
B.ui.PanelMenu=B.BaseComponent.extendClass({name:"PanelMenu",init:function(F,E){D.constructor.call(this,F);
this.items={};
this.attachToDom();
this.options=C.extend(this.options,A,E||{});
this.activeItem=this.__getValueInput().value;
this.nestingLevel=0;
this.__addUserEventHandler("collapse");
this.__addUserEventHandler("expand")
},addItem:function(E){this.items[E.itemName]=E
},deleteItem:function(E){delete this.items[E.itemName]
},getSelectedItem:function(){return this.getItem(this.selectedItem())
},getItem:function(E){return this.items[E]
},selectItem:function(E){},selectedItem:function(I){if(typeof I!="undefined"){var H=this.__getValueInput();
var E=H.value;
this.activeItem=I;
H.value=I;
for(var G in this.items){var F=this.items[G];
if(F.__isSelected()){F.__unselect()
}}return E
}else{return this.activeItem
}},__getValueInput:function(){return document.getElementById(this.id+"-value")
},expandAll:function(){},collapseAll:function(){},expandGroup:function(E){},collapseGroup:function(E){},__panelMenu:function(){return C(B.getDomElement(this.id))
},__childGroups:function(){return this.__panelMenu().children(".rf-pm-top-gr")
},__addUserEventHandler:function(E){var F=this.options["on"+E];
if(F){B.Event.bindById(this.id,E,F)
}},__isActiveItem:function(E){return E.itemName==this.activeItem
},__collapseGroups:function(E){var F=E.__rfTopGroup();
this.__childGroups().each(function(G,H){if(H.id!=E.getEventElement()&&(!F||H.id!=F.id)){B.$(H).__collapse()
}})
},destroy:function(){B.Event.unbindById(this.id,"."+this.namespace);
D.destroy.call(this)
}});
var D=B.ui.PanelMenu.$super
})(jQuery,RichFaces);;jQuery.atmosphere=function(){var B;
var A;
jQuery(window).unload(function(){if(B){B.abort()
}});
return{version:0.8,response:{status:200,responseBody:"",headers:[],state:"messageReceived",transport:"polling",push:[],error:null,id:0},request:{},abordingConnection:false,subscribed:true,logLevel:"info",callbacks:[],activeTransport:null,websocket:null,uuid:0,subscribe:function(C,E,D){jQuery.atmosphere.request=jQuery.extend({timeout:300000,method:"GET",headers:{},contentType:"",cache:true,async:true,ifModified:false,callback:null,dataType:"",url:C,data:"",suspend:true,maxRequest:60,maxStreamingLength:10000000,lastIndex:0,logLevel:"info",requestCount:0,fallbackMethod:"GET",fallbackTransport:"streaming",transport:"long-polling",webSocketImpl:null,webSocketUrl:null,webSocketPathDelimiter:"@@",enableXDR:false,rewriteURL:false,attachHeadersAsQueryString:false,executeCallbackBeforeReconnect:true,readyState:0},D);
logLevel=jQuery.atmosphere.request.logLevel;
if(E!=null){jQuery.atmosphere.addCallback(E)
}if(jQuery.atmosphere.request.transport!=jQuery.atmosphere.activeTransport){jQuery.atmosphere.closeSuspendedConnection()
}jQuery.atmosphere.activeTransport=jQuery.atmosphere.request.transport;
if(jQuery.atmosphere.uuid==0){jQuery.atmosphere.uuid=jQuery.atmosphere.guid()
}if(jQuery.atmosphere.request.transport!="websocket"){jQuery.atmosphere.executeRequest(jQuery.atmosphere.request)
}else{if(jQuery.atmosphere.request.transport=="websocket"){if(jQuery.atmosphere.request.webSocketImpl==null&&!window.WebSocket&&!window.MozWebSocket){jQuery.atmosphere.log(logLevel,["Websocket is not supported, using request.fallbackTransport ("+jQuery.atmosphere.request.fallbackTransport+")"]);
jQuery.atmosphere.request.transport=jQuery.atmosphere.request.fallbackTransport;
jQuery.atmosphere.response.transport=jQuery.atmosphere.request.fallbackTransport;
jQuery.atmosphere.executeRequest(jQuery.atmosphere.request)
}else{jQuery.atmosphere.executeWebSocket()
}}}},closeSuspendedConnection:function(){jQuery.atmosphere.abordingConnection=true;
if(B!=null){B.abort()
}if(jQuery.atmosphere.websocket!=null){jQuery.atmosphere.websocket.close();
jQuery.atmosphere.websocket=null
}jQuery.atmosphere.abordingConnection=false
},jsonp:function(C){var E=C||jQuery.atmosphere.request;
jQuery.atmosphere.response.push=function(H){jQuery.atmosphere.request.callback=null;
jQuery.atmosphere.publish(H,null,jQuery.atmosphere.request)
};
var D=E.url;
var F=E.data;
if(jQuery.atmosphere.request.attachHeadersAsQueryString){D=jQuery.atmosphere.attachHeaders(E);
if(F!=""){if(F!=""){D+="&X-Atmosphere-Post-Body="+F
}}F=""
}var G=jQuery.ajax({url:D,type:E.method,dataType:"jsonp",error:function(H,J,I){if(H.status<300){jQuery.atmosphere.reconnect(G,E)
}else{jQuery.atmosphere.ieCallback(J,"error",H.status,E.transport)
}},jsonp:"jsonpTransport",success:function(H){if(E.executeCallbackBeforeReconnect){jQuery.atmosphere.reconnect(G,E)
}var I=H.message;
if(I!=null&&typeof I!="string"){I=jQuery.stringifyJSON(I)
}jQuery.atmosphere.ieCallback(I,"messageReceived",200,E.transport);
if(!E.executeCallbackBeforeReconnect){jQuery.atmosphere.reconnect(G,E)
}},data:E.data,beforeSend:function(H){jQuery.atmosphere.doRequest(H,E,false)
}})
},checkCORSSupport:function(){if(jQuery.browser.msie&&!window.XDomainRequest){return true
}else{if(jQuery.browser.opera){return true
}}return false
},executeRequest:function(C){var I=C||jQuery.atmosphere.request;
if(jQuery.atmosphere.request.transport=="jsonp"||(jQuery.atmosphere.checkCORSSupport())){I.attachHeadersAsQueryString=true;
jQuery.atmosphere.jsonp(I);
return 
}if(jQuery.atmosphere.request.transport=="streaming"&&jQuery.browser.msie){jQuery.atmosphere.request.enableXDR&&window.XDomainRequest?jQuery.atmosphere.ieXDR():jQuery.atmosphere.ieStreaming();
return 
}if(jQuery.atmosphere.request.enableXDR&&window.XDomainRequest){jQuery.atmosphere.ieXDR();
return 
}if(jQuery.atmosphere.request.requestCount++<jQuery.atmosphere.request.maxRequest){jQuery.atmosphere.response.push=function(K){jQuery.atmosphere.request.callback=null;
jQuery.atmosphere.publish(K,null,jQuery.atmosphere.request)
};
var D=jQuery.atmosphere.response;
if(I.transport!="polling"){D.transport=I.transport
}var H;
var F=false;
if(jQuery.browser.msie){var E=["Msxml2.XMLHTTP","Microsoft.XMLHTTP"];
for(var G=0;
G<E.length;
G++){try{H=new ActiveXObject(E[G])
}catch(J){}}}else{if(window.XMLHttpRequest){H=new XMLHttpRequest()
}}if(I.suspend){B=H
}jQuery.atmosphere.doRequest(H,I,true);
if(!jQuery.browser.msie){H.onerror=function(){F=true;
try{D.status=XMLHttpRequest.status
}catch(K){D.status=404
}D.state="error";
jQuery.atmosphere.invokeCallback(D);
H.abort();
B=null
}
}H.onreadystatechange=function(){if(jQuery.atmosphere.abordingConnection){return 
}var L=false;
var Q=false;
if(I.transport=="streaming"&&(I.readyState>2&&H.readyState==4)){I.readyState=0;
I.lastIndex=0;
jQuery.atmosphere.reconnect(H,jQuery.atmosphere.request,true);
return 
}I.readyState=H.readyState;
if(H.readyState==4){if(jQuery.browser.msie){Q=true
}else{if(I.transport=="streaming"){Q=true
}else{if(I.transport=="long-polling"){Q=true;
clearTimeout(I.id)
}}}}else{if(!jQuery.browser.msie&&H.readyState==3&&H.status==200&&I.transport!="long-polling"){Q=true
}else{clearTimeout(I.id)
}}if(Q){var O=H.responseText;
this.previousLastIndex=I.lastIndex;
if(I.transport=="streaming"){D.responseBody=O.substring(I.lastIndex,O.length);
D.isJunkEnded=true;
if(I.lastIndex==0&&D.responseBody.indexOf("<!-- Welcome to the Atmosphere Framework.")!=-1){D.isJunkEnded=false
}if(!D.isJunkEnded){var N="<!-- EOD -->";
var K=N.length;
var M=D.responseBody.indexOf(N)+K;
if(M>K&&M!=D.responseBody.length){D.responseBody=D.responseBody.substring(M)
}else{L=true
}}else{D.responseBody=O.substring(I.lastIndex,O.length)
}I.lastIndex=O.length;
if(jQuery.browser.opera){jQuery.atmosphere.iterate(function(){if(H.responseText.length>I.lastIndex){try{D.status=H.status;
D.headers=H.getAllResponseHeaders()
}catch(R){D.status=404
}D.state="messageReceived";
D.responseBody=H.responseText.substring(I.lastIndex);
I.lastIndex=H.responseText.length;
jQuery.atmosphere.invokeCallback(D);
if((I.transport=="streaming")&&(H.responseText.length>jQuery.atmosphere.request.maxStreamingLength)){H.abort();
jQuery.atmosphere.doRequest(H,I,true)
}}},0)
}if(L){return 
}}else{D.responseBody=O;
I.lastIndex=O.length
}try{D.status=H.status;
D.headers=H.getAllResponseHeaders()
}catch(P){D.status=404
}if(I.suspend){D.state="messageReceived"
}else{D.state="messagePublished"
}if(I.executeCallbackBeforeReconnect){jQuery.atmosphere.reconnect(H,I,false)
}if(D.responseBody.indexOf("parent.callback")!=-1){jQuery.atmosphere.log(logLevel,["parent.callback no longer supported with 0.8 version and up. Please upgrade"])
}jQuery.atmosphere.invokeCallback(D);
if(!I.executeCallbackBeforeReconnect){jQuery.atmosphere.reconnect(H,I,false)
}if((I.transport=="streaming")&&(O.length>jQuery.atmosphere.request.maxStreamingLength)){H.abort();
jQuery.atmosphere.doRequest(H,I,true)
}}};
H.send(I.data);
if(I.suspend){I.id=setTimeout(function(){H.abort();
jQuery.atmosphere.subscribe(I.url,null,I)
},I.timeout)
}jQuery.atmosphere.subscribed=true
}else{jQuery.atmosphere.log(logLevel,["Max re-connection reached."])
}},doRequest:function(F,G,E){var D=jQuery.atmosphere.prepareURL(G.url);
if(E){F.open(G.method,D,true)
}F.setRequestHeader("X-Atmosphere-Framework",jQuery.atmosphere.version);
F.setRequestHeader("X-Atmosphere-Transport",G.transport);
F.setRequestHeader("X-Cache-Date",new Date().getTime());
if(jQuery.atmosphere.request.contentType!=""){F.setRequestHeader("Content-Type",jQuery.atmosphere.request.contentType)
}F.setRequestHeader("X-Atmosphere-tracking-id",jQuery.atmosphere.uuid);
for(var C in G.headers){F.setRequestHeader(C,G.headers[C])
}},reconnect:function(C,D,E){jQuery.atmosphere.request=D;
if(E||(D.suspend&&C.status==200&&D.transport!="streaming"&&jQuery.atmosphere.subscribed)){jQuery.atmosphere.request.method="GET";
jQuery.atmosphere.request.data="";
jQuery.atmosphere.executeRequest(jQuery.atmosphere.request)
}},attachHeaders:function(E){var D=E.url;
if(!E.attachHeadersAsQueryString){return D
}if(D.indexOf("X-Atmosphere-Framework")!=-1){return D
}D+=(D.indexOf("?")!=-1)?"&":"?";
D+="X-Atmosphere-tracking-id="+jQuery.atmosphere.uuid;
D+="&X-Atmosphere-Framework="+jQuery.atmosphere.version;
D+="&X-Atmosphere-Transport="+E.transport;
D+="&X-Cache-Date="+new Date().getTime();
if(jQuery.atmosphere.request.contentType!=""){D+="&Content-Type="+jQuery.atmosphere.request.contentType
}for(var C in E.headers){D+="&"+C+"="+E.headers[C]
}return D
},ieStreaming:function(){A=jQuery.atmosphere.configureIE();
A.open()
},configureIE:function(){var D,F=new window.ActiveXObject("htmlfile");
F.open();
F.close();
var C=jQuery.atmosphere.request.url;
jQuery.atmosphere.response.push=function(G){jQuery.atmosphere.request.callback=null;
jQuery.atmosphere.publish(G,null,jQuery.atmosphere.request)
};
var E=jQuery.atmosphere.request;
if(E.transport!="polling"){jQuery.atmosphere.response.transport=E.transport
}return{open:function(){var G=F.createElement("iframe");
if(E.method=="POST"){C=jQuery.atmosphere.attachHeaders(E);
if(jQuery.atmosphere.request.data!=""){C+="&X-Atmosphere-Post-Body="+jQuery.atmosphere.request.data
}}C=jQuery.atmosphere.prepareURL(C);
G.src=C;
F.body.appendChild(G);
var H=G.contentDocument||G.contentWindow.document;
D=jQuery.atmosphere.iterate(function(){if(!H.firstChild){return 
}if(H.readyState==="complete"){try{jQuery.noop(H.fileSize)
}catch(M){jQuery.atmosphere.ieCallback("Connection Failure","error",500,E.transport);
return false
}}var K=H.body?H.body.lastChild:H,L=function(){var S=K.cloneNode(true);
S.appendChild(H.createTextNode("."));
var Q=S.innerText;
var R=true;
if(Q.indexOf("<!-- Welcome to the Atmosphere Framework.")==-1){R=false
}if(R){var P="<!-- EOD -->";
var N=P.length;
var O=Q.indexOf(P)+N;
Q=Q.substring(O)
}return Q.substring(0,Q.length-1)
};
if(!jQuery.nodeName(K,"pre")){var J=H.head||H.getElementsByTagName("head")[0]||H.documentElement||H,I=H.createElement("script");
I.text="document.write('<plaintext>')";
J.insertBefore(I,J.firstChild);
J.removeChild(I);
K=H.body.lastChild
}jQuery.atmosphere.ieCallback(L(),"messageReceived",200,E.transport);
D=jQuery.atmosphere.iterate(function(){var N=L();
if(N.length>E.lastIndex){jQuery.atmosphere.response.status=200;
jQuery.atmosphere.ieCallback(N,"messageReceived",200,E.transport);
K.innerText="";
E.lastIndex=0
}if(H.readyState==="complete"){jQuery.atmosphere.ieCallback("","completed",200,E.transport);
return false
}},null);
return false
})
},close:function(){if(D){D()
}F.execCommand("Stop");
jQuery.atmosphere.ieCallback("","closed",200,E.transport)
}}
},ieCallback:function(G,D,E,F){var C=jQuery.atmosphere.response;
C.transport=F;
C.status=E;
C.responseBody=G;
C.state=D;
jQuery.atmosphere.invokeCallback(C)
},ieXDR:function(){A=jQuery.atmosphere.configureXDR();
A.open()
},configureXDR:function(){var D="";
var I=jQuery.atmosphere.request.transport;
var H=0;
var E=jQuery.atmosphere.request;
jQuery.atmosphere.response.push=function(J){jQuery.atmosphere.request.method="POST";
jQuery.atmosphere.request.enableXDR=true;
jQuery.atmosphere.request.attachHeadersAsQueryString=true;
jQuery.atmosphere.request.callback=null;
jQuery.atmosphere.publish(J,null,jQuery.atmosphere.request)
};
var G=function(K){var N=K.responseText;
var O=false;
if(N.indexOf("<!-- Welcome to the Atmosphere Framework.")!=-1){O=true
}if(O){var M="<!-- EOD -->";
var J=M.length;
var L=N.indexOf(M)+J;
N=N.substring(L+H);
H+=N.length
}jQuery.atmosphere.ieCallback(N,"messageReceived",200,I)
};
var C=new window.XDomainRequest(),F=jQuery.atmosphere.request.rewriteURL||function(K){var M={JSESSIONID:function(N){return K.replace(/;jsessionid=[^\?]*|(\?)|$/,";jsessionid="+N+"$1")
},PHPSESSID:function(N){return K.replace(/\?PHPSESSID=[^&]*&?|\?|$/,"?PHPSESSID="+N+"&").replace(/&$/,"")
}};
for(var J in M){var L=new RegExp("(?:^|;\\s*)"+encodeURIComponent(J)+"=([^;]*)").exec(document.cookie);
if(L){return M[J](L[1])
}}return K
};
C.onprogress=function(){G(C);
D=C.responseText
};
C.onerror=function(){jQuery.atmosphere.ieCallback(C.responseText,"error",500,I)
};
C.onload=function(){if(D!=C.responseText){G(C)
}if(I=="long-polling"){jQuery.atmosphere.request.method="GET";
jQuery.atmosphere.request.data="";
jQuery.atmosphere.request.transport=I;
jQuery.atmosphere.executeRequest(jQuery.atmosphere.request)
}};
return{open:function(){var J=jQuery.atmosphere.attachHeaders(jQuery.atmosphere.request);
if(jQuery.atmosphere.request.method=="POST"){if(jQuery.atmosphere.request.data!=""){J+="&X-Atmosphere-Post-Body="+jQuery.atmosphere.request.data
}}C.open(jQuery.atmosphere.request.method,F(J));
C.send()
},close:function(){C.abort();
jQuery.atmosphere.ieCallback(C.responseText,"closed",200,I)
}}
},executeWebSocket:function(){var G=jQuery.atmosphere.request;
var F=false;
var D=jQuery.atmosphere.attachHeaders(jQuery.atmosphere.request);
var H=jQuery.atmosphere.request.callback;
jQuery.atmosphere.log(logLevel,["Invoking executeWebSocket"]);
jQuery.atmosphere.response.transport="websocket";
if(D.indexOf("http")==-1&&D.indexOf("ws")==-1){D=jQuery.atmosphere.parseUri(document.location,D);
jQuery.atmosphere.debug("Using URL: "+D)
}var C=D.replace("http:","ws:").replace("https:","wss:");
var E=null;
if(jQuery.atmosphere.request.webSocketImpl!=null){E=jQuery.atmosphere.request.webSocketImpl
}else{if(window.WebSocket){E=new WebSocket(C)
}else{E=new MozWebSocket(C)
}}jQuery.atmosphere.websocket=E;
jQuery.atmosphere.response.push=function(I){var J;
try{if(jQuery.atmosphere.request.webSocketUrl!=null){J=jQuery.atmosphere.request.webSocketPathDelimiter+jQuery.atmosphere.request.webSocketUrl+jQuery.atmosphere.request.webSocketPathDelimiter+jQuery.atmosphere.request.data
}else{J=jQuery.atmosphere.request.data
}E.send(J)
}catch(K){jQuery.atmosphere.log(logLevel,["Websocket failed. Downgrading to Comet and resending "+J]);
G.transport=G.fallbackTransport;
G.method=G.fallbackMethod;
G.data=J;
jQuery.atmosphere.response.transport=G.fallbackTransport;
jQuery.atmosphere.request=G;
jQuery.atmosphere.executeRequest(jQuery.atmosphere.request);
E.onclose=function(L){};
E.close()
}};
E.onopen=function(I){jQuery.atmosphere.subscribed=true;
jQuery.atmosphere.debug("Websocket successfully opened");
F=true;
jQuery.atmosphere.response.state="opening";
jQuery.atmosphere.response.status=200;
jQuery.atmosphere.invokeCallback(jQuery.atmosphere.response);
if(jQuery.atmosphere.request.method=="POST"){data=jQuery.atmosphere.request.data;
jQuery.atmosphere.response.state="messageReceived";
E.send(jQuery.atmosphere.request.data)
}};
E.onmessage=function(I){if(I.data.indexOf("parent.callback")!=-1){jQuery.atmosphere.log(logLevel,["parent.callback no longer supported with 0.8 version and up. Please upgrade"])
}jQuery.atmosphere.response.state="messageReceived";
jQuery.atmosphere.response.responseBody=I.data;
jQuery.atmosphere.response.status=200;
jQuery.atmosphere.invokeCallback(jQuery.atmosphere.response)
};
E.onerror=function(I){jQuery.atmosphere.warn("Websocket error, reason: "+I.reason);
jQuery.atmosphere.response.state="error";
jQuery.atmosphere.response.responseBody="";
jQuery.atmosphere.response.status=500;
jQuery.atmosphere.invokeCallback(jQuery.atmosphere.response)
};
E.onclose=function(I){var K=I.reason;
if(K===""){switch(I.code){case 1000:K="Normal closure; the connection successfully completed whatever purpose for which it was created.";
break;
case 1001:K="The endpoint is going away, either because of a server failure or because the browser is navigating away from the page that opened the connection.";
break;
case 1002:K="The endpoint is terminating the connection due to a protocol error.";
break;
case 1003:K="The connection is being terminated because the endpoint received data of a type it cannot accept (for example, a text-only endpoint received binary data).";
break;
case 1004:K="The endpoint is terminating the connection because a data frame was received that is too large.";
break;
case 1005:K="Unknown: no status code was provided even though one was expected.";
break;
case 1006:K="Connection was closed abnormally (that is, with no close frame being sent).";
break
}}jQuery.atmosphere.log(logLevel,["Websocket closed, reason: "+K]);
jQuery.atmosphere.log(logLevel,["Websocket closed, wasClean: "+I.wasClean]);
jQuery.atmosphere.response.state="closed";
jQuery.atmosphere.response.responseBody="";
jQuery.atmosphere.response.status=200;
jQuery.atmosphere.invokeCallback(jQuery.atmosphere.response);
if(!F){var J=jQuery.atmosphere.request.data;
jQuery.atmosphere.log(logLevel,["Websocket failed. Downgrading to Comet and resending "+J]);
G.transport=G.fallbackTransport;
G.method=G.fallbackMethod;
G.data=J;
jQuery.atmosphere.response.transport=G.fallbackTransport;
jQuery.atmosphere.request=G;
jQuery.atmosphere.executeRequest(jQuery.atmosphere.request)
}else{if(jQuery.atmosphere.subscribed&&jQuery.atmosphere.response.transport=="websocket"){if(G.requestCount++<G.maxRequest){jQuery.atmosphere.request.requestCount=G.requestCount;
jQuery.atmosphere.request.maxRequest=G.maxRequest;
jQuery.atmosphere.request.method=G.method;
jQuery.atmosphere.request.url=jQuery.atmosphere.attachHeaders(G);
jQuery.atmosphere.response.responseBody="";
jQuery.atmosphere.executeWebSocket()
}else{jQuery.atmosphere.log(logLevel,["Websocket reconnect maximum try reached "+G.requestCount])
}}}}
},addCallback:function(C){if(jQuery.inArray(C,jQuery.atmosphere.callbacks)==-1){jQuery.atmosphere.callbacks.push(C)
}},removeCallback:function(D){var C=jQuery.inArray(D,jQuery.atmosphere.callbacks);
if(C!=-1){jQuery.atmosphere.callbacks.splice(C)
}},invokeCallback:function(C){var D=function(E,F){F(C)
};
jQuery.atmosphere.log(logLevel,["Invoking "+jQuery.atmosphere.callbacks.length+" callbacks"]);
if(jQuery.atmosphere.callbacks.length>0){jQuery.each(jQuery.atmosphere.callbacks,D)
}if(typeof (jQuery.atmosphere.request.callback)=="function"){jQuery.atmosphere.request.callback(C)
}},publish:function(C,E,D){jQuery.atmosphere.request=jQuery.extend({connected:false,timeout:60000,method:"POST",contentType:"",headers:{},cache:true,async:true,ifModified:false,callback:null,dataType:"",url:C,data:"",suspend:false,maxRequest:60,logLevel:"info",requestCount:0,transport:"polling",webSocketImpl:null,webSocketUrl:null,webSocketPathDelimiter:"@@",enableXDR:false,rewriteURL:false,attachHeadersAsQueryString:false,executeCallbackBeforeReconnect:true,readyState:0},D);
if(E!=null){jQuery.atmosphere.addCallback(E)
}if(jQuery.atmosphere.uuid==0){jQuery.atmosphere.uuid=jQuery.atmosphere.guid()
}jQuery.atmosphere.request.transport="polling";
if(jQuery.atmosphere.request.transport!="websocket"){jQuery.atmosphere.executeRequest(jQuery.atmosphere.request)
}else{if(jQuery.atmosphere.request.transport=="websocket"){if(!window.WebSocket&&!window.MozWebSocket){alert("WebSocket not supported by this browser")
}else{jQuery.atmosphere.executeWebSocket()
}}}},unload:function(C){if(window.addEventListener){document.addEventListener("unload",C,false);
window.addEventListener("unload",C,false)
}else{document.attachEvent("onunload",C);
window.attachEvent("onunload",C)
}},log:function(E,D){if(window.console){var C=window.console[E];
if(typeof C=="function"){C.apply(window.console,D)
}}},warn:function(){jQuery.atmosphere.log("warn",arguments)
},info:function(){if(logLevel!="warn"){jQuery.atmosphere.log("info",arguments)
}},debug:function(){if(logLevel=="debug"){jQuery.atmosphere.log("debug",arguments)
}},unsubscribe:function(){logLevel="info";
jQuery.atmosphere.response.state="unsubscribe";
jQuery.atmosphere.response.responseBody="";
jQuery.atmosphere.response.status=408;
jQuery.atmosphere.invokeCallback(jQuery.atmosphere.response);
jQuery.atmosphere.subscribed=false;
jQuery.atmosphere.closeSuspendedConnection();
jQuery.atmosphere.callbacks=[];
if(A!=null){A.close()
}},S4:function(){return(((1+Math.random())*65536)|0).toString(16).substring(1)
},guid:function(){return(jQuery.atmosphere.S4()+jQuery.atmosphere.S4()+"-"+jQuery.atmosphere.S4()+"-"+jQuery.atmosphere.S4()+"-"+jQuery.atmosphere.S4()+"-"+jQuery.atmosphere.S4()+jQuery.atmosphere.S4()+jQuery.atmosphere.S4())
},prepareURL:function(D){var E=jQuery.now(),C=D.replace(/([?&])_=[^&]*/,"$1_="+E);
return C+(C===D?(/\?/.test(D)?"&":"?")+"_="+E:"")
},param:function(C){return jQuery.param(C,jQuery.ajaxSettings.traditional)
},iterate:function(E,D){var F;
D=D||0;
(function C(){F=setTimeout(function(){if(E()===false){return 
}C()
},D)
})();
return function(){clearTimeout(F)
}
},parseUri:function(I,E){var N=window.location.protocol;
var O=window.location.host;
var P=window.location.pathname;
var M={};
var H="";
var J;
if((J=E.search(/\:/))>=0){N=E.substring(0,J+1);
E=E.substring(J+1)
}if((J=E.search(/\#/))>=0){H=E.substring(J+1);
E=E.substring(0,J)
}if((J=E.search(/\?/))>=0){var K=E.substring(J+1)+"&;";
E=E.substring(0,J);
while((J=K.search(/\&/))>=0){var F=K.substring(0,J);
K=K.substring(J+1);
if(F.length){var G=F.search(/\=/);
if(G<0){M[F]=""
}else{M[F.substring(0,G)]=decodeURIComponent(F.substring(G+1))
}}}}if(E.search(/\/\//)==0){E=E.substring(2);
if((J=E.search(/\//))>=0){O=E.substring(0,J);
P=E.substring(J)
}else{O=E;
P="/"
}}else{if(E.search(/\//)==0){P=E
}else{var D=P.lastIndexOf("/");
if(D<0){P="/"
}else{if(D<P.length-1){P=P.substring(0,D+1)
}}while(E.search(/\.\.\//)==0){var D=P.lastIndexOf("/",P.lastIndexOf("/")-1);
if(D>=0){P=P.substring(0,D+1)
}E=E.substring(3)
}P=P+E
}}var E=N+"//"+O+P;
var C="?";
for(var L in M){E+=C+L+"="+encodeURIComponent(M[L]);
C="&"
}return E
}}
}();
(function(C){var F=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,D={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};
function A(G){return'"'+G.replace(F,function(H){var I=D[H];
return typeof I==="string"?I:"\\u"+("0000"+H.charCodeAt(0).toString(16)).slice(-4)
})+'"'
}function B(G){return G<10?"0"+G:G
}function E(L,K){var J,I,G,H,N=K[L],M=typeof N;
if(N&&typeof N==="object"&&typeof N.toJSON==="function"){N=N.toJSON(L);
M=typeof N
}switch(M){case"string":return A(N);
case"number":return isFinite(N)?String(N):"null";
case"boolean":return String(N);
case"object":if(!N){return"null"
}switch(Object.prototype.toString.call(N)){case"[object Date]":return isFinite(N.valueOf())?'"'+N.getUTCFullYear()+"-"+B(N.getUTCMonth()+1)+"-"+B(N.getUTCDate())+"T"+B(N.getUTCHours())+":"+B(N.getUTCMinutes())+":"+B(N.getUTCSeconds())+'Z"':"null";
case"[object Array]":G=N.length;
H=[];
for(J=0;
J<G;
J++){H.push(E(J,N)||"null")
}return"["+H.join(",")+"]";
default:H=[];
for(J in N){if(Object.prototype.hasOwnProperty.call(N,J)){I=E(J,N);
if(I){H.push(A(J)+":"+I)
}}}return"{"+H.join(",")+"}"
}}}C.stringifyJSON=function(G){if(window.JSON&&window.JSON.stringify){return window.JSON.stringify(G)
}return E("",{"":G})
}
}(jQuery));;JSNode=function(){};
JSNode.prototype={tag:null,attrs:{},childs:[],value:"",_symbols:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;","\u00A0":"&nbsp;"},getInnerHTML:function(F){var B=[];
for(var A=0;
A<this.childs.length;
A++){B.push(this.childs[A].getContent(F))
}return B.join("")
},xmlEscape:function(A){return jQuery("<div></div>").text(A).html()
}};
E=function(F,A,B){this.tag=F;
if(A){this.attrs=A
}if(B){this.childs=B
}};
E.prototype=new JSNode();
E.prototype.getContent=function(G){var F="<"+this.tag;
var A=this.getInnerHTML(G);
if(A==""){this.isEmpty=true
}else{this.isEmpty=false
}for(var B in this.attrs){if(!this.attrs.hasOwnProperty(B)){continue
}var H=this.attrs[B];
if(typeof H=="function"){H=H.call(this,G)
}if(H){F+=" "+(B=="className"?"class":B)+'="'+this.xmlEscape(H)+'"'
}}F+=">"+A+"</"+this.tag+">";
return F
};
ET=function(A){this.value=A
};
ET.prototype.getContent=function(A){var B=this.value;
if(typeof B=="function"){B=B(A)
}if(B&&B.getContent){B=B.getContent(A)
}if(B){return B
}return""
};
T=function(A){this.value=A
};
T.prototype=new JSNode();
T.prototype.getContent=function(A){var B=this.value;
if(typeof B=="function"){B=B(A)
}if(B){return this.xmlEscape(B)
}return""
};
C=function(A){this.value=A
};
C.prototype.getContent=function(A){return"<!--"+this.value+"-->"
};
D=function(A){this.value=A
};
D.prototype.getContent=function(A){return"<![CDATA["+this.value+"]]>"
};;(function(F,C){C.utils=C.utils||{};
C.utils.Cache=function(K,J,I,H){this.key=K.toLowerCase();
this.cache={};
this.cache[this.key]=J||[];
this.originalValues=typeof I=="function"?I(J):I||this.cache[this.key];
this.values=D(this.originalValues);
this.useCache=H||B.call(this)
};
var D=function(H){var J=[];
for(var I=0;
I<H.length;
I++){J.push(H[I].toLowerCase())
}return J
};
var B=function(){var H=true;
for(var I=0;
I<this.values.length;
I++){if(this.values[I].indexOf(this.key)!=0){H=false;
break
}}return H
};
var G=function(J,O){J=J.toLowerCase();
var H=[];
if(J.length<this.key.length){return H
}if(this.cache[J]){H=this.cache[J]
}else{var K=typeof O=="function";
var M=this.cache[this.key];
for(var I=0;
I<this.values.length;
I++){var L=this.values[I];
if(K&&O(J,L)){H.push(M[I])
}else{var N=L.indexOf(J);
if(N==0){H.push(M[I])
}}}if((!this.lastKey||J.indexOf(this.lastKey)!=0)&&H.length>0){this.cache[J]=H;
if(H.length==1){this.lastKey=J
}}}return H
};
var E=function(H){return this.originalValues[this.cache[this.key].index(H)]
};
var A=function(H){H=H.toLowerCase();
return this.cache[H]||this.useCache&&H.indexOf(this.key)==0
};
F.extend(C.utils.Cache.prototype,(function(){return{getItems:G,getItemValue:E,isCached:A}
})())
})(jQuery,RichFaces);;(function(B,A){A.ui=A.ui||{};
A.ui.TogglePanelItem=A.BaseComponent.extendClass({name:"TogglePanelItem",init:function(E,D){C.constructor.call(this,E);
this.attachToDom(this.id);
this.options=B.extend(this.options,D||{});
this.name=this.options.name;
this.togglePanelId=this.options.togglePanelId;
this.switchMode=this.options.switchMode;
this.disabled=this.options.disabled||false;
this.index=D.index;
this.getTogglePanel().getItems()[this.index]=this;
this.__addUserEventHandler("enter");
this.__addUserEventHandler("leave")
},getName:function(){return this.options.name
},getTogglePanel:function(){return A.$(this.togglePanelId)
},isSelected:function(){return this.getName()==this.getTogglePanel().getSelectItem()
},__addUserEventHandler:function(D){var E=this.options["on"+D];
if(E){A.Event.bindById(this.id,D,E)
}},__enter:function(){A.getDomElement(this.id).style.display="block";
return this.__fireEnter()
},__leave:function(){var D=this.__fireLeave();
if(!D){return false
}A.getDomElement(this.id).style.display="none";
return true
},__fireLeave:function(){return A.Event.fireById(this.id,"leave")
},__fireEnter:function(){return A.Event.fireById(this.id,"enter")
},destroy:function(){var D=this.getTogglePanel();
if(D){delete D.getItems()[this.index]
}C.destroy.call(this)
}});
var C=A.ui.TogglePanelItem.$super
})(jQuery,RichFaces);;(function(A,B){A.widget("ui.draggable",A.ui.mouse,{widgetEventPrefix:"drag",options:{addClasses:true,appendTo:"parent",axis:false,connectToSortable:false,containment:false,cursor:"auto",cursorAt:false,grid:false,handle:false,helper:"original",iframeFix:false,opacity:false,refreshPositions:false,revert:false,revertDuration:500,scope:"default",scroll:true,scrollSensitivity:20,scrollSpeed:20,snap:false,snapMode:"both",snapTolerance:20,stack:false,zIndex:false},_create:function(){if(this.options.helper=="original"&&!(/^(?:r|a|f)/).test(this.element.css("position"))){this.element[0].style.position="relative"
}(this.options.addClasses&&this.element.addClass("ui-draggable"));
(this.options.disabled&&this.element.addClass("ui-draggable-disabled"));
this._mouseInit()
},destroy:function(){if(!this.element.data("draggable")){return 
}this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");
this._mouseDestroy();
return this
},_mouseCapture:function(C){var D=this.options;
if(this.helper||D.disabled||A(C.target).is(".ui-resizable-handle")){return false
}this.handle=this._getHandle(C);
if(!this.handle){return false
}return true
},_mouseStart:function(C){var D=this.options;
this.helper=this._createHelper(C);
this._cacheHelperProportions();
if(A.ui.ddmanager){A.ui.ddmanager.current=this
}this._cacheMargins();
this.cssPosition=this.helper.css("position");
this.scrollParent=this.helper.scrollParent();
this.offset=this.positionAbs=this.element.offset();
this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left};
A.extend(this.offset,{click:{left:C.pageX-this.offset.left,top:C.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()});
this.originalPosition=this.position=this._generatePosition(C);
this.originalPageX=C.pageX;
this.originalPageY=C.pageY;
(D.cursorAt&&this._adjustOffsetFromHelper(D.cursorAt));
if(D.containment){this._setContainment()
}if(this._trigger("start",C)===false){this._clear();
return false
}this._cacheHelperProportions();
if(A.ui.ddmanager&&!D.dropBehaviour){A.ui.ddmanager.prepareOffsets(this,C)
}this.helper.addClass("ui-draggable-dragging");
this._mouseDrag(C,true);
return true
},_mouseDrag:function(C,E){this.position=this._generatePosition(C);
this.positionAbs=this._convertPositionTo("absolute");
if(!E){var D=this._uiHash();
if(this._trigger("drag",C,D)===false){this._mouseUp({});
return false
}this.position=D.position
}if(!this.options.axis||this.options.axis!="y"){this.helper[0].style.left=this.position.left+"px"
}if(!this.options.axis||this.options.axis!="x"){this.helper[0].style.top=this.position.top+"px"
}if(A.ui.ddmanager){A.ui.ddmanager.drag(this,C)
}return false
},_mouseStop:function(D){var E=false;
if(A.ui.ddmanager&&!this.options.dropBehaviour){E=A.ui.ddmanager.drop(this,D)
}if(this.dropped){E=this.dropped;
this.dropped=false
}if(!this.element[0]||!this.element[0].parentNode){return false
}if((this.options.revert=="invalid"&&!E)||(this.options.revert=="valid"&&E)||this.options.revert===true||(A.isFunction(this.options.revert)&&this.options.revert.call(this.element,E))){var C=this;
A(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){if(C._trigger("stop",D)!==false){C._clear()
}})
}else{if(this._trigger("stop",D)!==false){this._clear()
}}return false
},cancel:function(){if(this.helper.is(".ui-draggable-dragging")){this._mouseUp({})
}else{this._clear()
}return this
},_getHandle:function(C){var D=!this.options.handle||!A(this.options.handle,this.element).length?true:false;
A(this.options.handle,this.element).find("*").andSelf().each(function(){if(this==C.target){D=true
}});
return D
},_createHelper:function(D){var E=this.options;
var C=A.isFunction(E.helper)?A(E.helper.apply(this.element[0],[D])):(E.helper=="clone"?this.element.clone():this.element);
if(!C.parents("body").length){C.appendTo((E.appendTo=="parent"?this.element[0].parentNode:E.appendTo))
}if(C[0]!=this.element[0]&&!(/(fixed|absolute)/).test(C.css("position"))){C.css("position","absolute")
}return C
},_adjustOffsetFromHelper:function(C){if(typeof C=="string"){C=C.split(" ")
}if(A.isArray(C)){C={left:+C[0],top:+C[1]||0}
}if("left" in C){this.offset.click.left=C.left+this.margins.left
}if("right" in C){this.offset.click.left=this.helperProportions.width-C.right+this.margins.left
}if("top" in C){this.offset.click.top=C.top+this.margins.top
}if("bottom" in C){this.offset.click.top=this.helperProportions.height-C.bottom+this.margins.top
}},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();
var C=this.offsetParent.offset();
if(this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&A.ui.contains(this.scrollParent[0],this.offsetParent[0])){C.left+=this.scrollParent.scrollLeft();
C.top+=this.scrollParent.scrollTop()
}if((this.offsetParent[0]==document.body)||(this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&A.browser.msie)){C={top:0,left:0}
}return{top:C.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:C.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}
},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var C=this.element.position();
return{top:C.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:C.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}
}else{return{top:0,left:0}
}},_cacheMargins:function(){this.margins={left:(parseInt(this.element.css("marginLeft"),10)||0),top:(parseInt(this.element.css("marginTop"),10)||0)}
},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}
},_setContainment:function(){var F=this.options;
if(F.containment=="parent"){F.containment=this.helper[0].parentNode
}if(F.containment=="document"||F.containment=="window"){this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,A(F.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(A(F.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]
}if(!(/^(document|window|parent)$/).test(F.containment)&&F.containment.constructor!=Array){var D=A(F.containment)[0];
if(!D){return 
}var E=A(F.containment).offset();
var C=(A(D).css("overflow")!="hidden");
this.containment=[E.left+(parseInt(A(D).css("borderLeftWidth"),10)||0)+(parseInt(A(D).css("paddingLeft"),10)||0)-this.margins.left,E.top+(parseInt(A(D).css("borderTopWidth"),10)||0)+(parseInt(A(D).css("paddingTop"),10)||0)-this.margins.top,E.left+(C?Math.max(D.scrollWidth,D.offsetWidth):D.offsetWidth)-(parseInt(A(D).css("borderLeftWidth"),10)||0)-(parseInt(A(D).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,E.top+(C?Math.max(D.scrollHeight,D.offsetHeight):D.offsetHeight)-(parseInt(A(D).css("borderTopWidth"),10)||0)-(parseInt(A(D).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top]
}else{if(F.containment.constructor==Array){this.containment=F.containment
}}},_convertPositionTo:function(F,H){if(!H){H=this.position
}var D=F=="absolute"?1:-1;
var E=this.options,C=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&A.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,G=(/(html|body)/i).test(C[0].tagName);
return{top:(H.top+this.offset.relative.top*D+this.offset.parent.top*D-(A.browser.safari&&A.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():(G?0:C.scrollTop()))*D)),left:(H.left+this.offset.relative.left*D+this.offset.parent.left*D-(A.browser.safari&&A.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():G?0:C.scrollLeft())*D))}
},_generatePosition:function(F){var I=this.options,C=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&A.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,J=(/(html|body)/i).test(C[0].tagName);
var E=F.pageX;
var D=F.pageY;
if(this.originalPosition){if(this.containment){if(F.pageX-this.offset.click.left<this.containment[0]){E=this.containment[0]+this.offset.click.left
}if(F.pageY-this.offset.click.top<this.containment[1]){D=this.containment[1]+this.offset.click.top
}if(F.pageX-this.offset.click.left>this.containment[2]){E=this.containment[2]+this.offset.click.left
}if(F.pageY-this.offset.click.top>this.containment[3]){D=this.containment[3]+this.offset.click.top
}}if(I.grid){var H=this.originalPageY+Math.round((D-this.originalPageY)/I.grid[1])*I.grid[1];
D=this.containment?(!(H-this.offset.click.top<this.containment[1]||H-this.offset.click.top>this.containment[3])?H:(!(H-this.offset.click.top<this.containment[1])?H-I.grid[1]:H+I.grid[1])):H;
var G=this.originalPageX+Math.round((E-this.originalPageX)/I.grid[0])*I.grid[0];
E=this.containment?(!(G-this.offset.click.left<this.containment[0]||G-this.offset.click.left>this.containment[2])?G:(!(G-this.offset.click.left<this.containment[0])?G-I.grid[0]:G+I.grid[0])):G
}}return{top:(D-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(A.browser.safari&&A.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():(J?0:C.scrollTop())))),left:(E-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(A.browser.safari&&A.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():J?0:C.scrollLeft())))}
},_clear:function(){this.helper.removeClass("ui-draggable-dragging");
if(this.helper[0]!=this.element[0]&&!this.cancelHelperRemoval){this.helper.remove()
}this.helper=null;
this.cancelHelperRemoval=false
},_trigger:function(C,D,E){E=E||this._uiHash();
A.ui.plugin.call(this,C,[D,E]);
if(C=="drag"){this.positionAbs=this._convertPositionTo("absolute")
}return A.Widget.prototype._trigger.call(this,C,D,E)
},plugins:{},_uiHash:function(C){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}
}});
A.extend(A.ui.draggable,{version:"1.8.6"});
A.ui.plugin.add("draggable","connectToSortable",{start:function(D,F){var E=A(this).data("draggable"),G=E.options,C=A.extend({},F,{item:E.element});
E.sortables=[];
A(G.connectToSortable).each(function(){var H=A.data(this,"sortable");
if(H&&!H.options.disabled){E.sortables.push({instance:H,shouldRevert:H.options.revert});
H._refreshItems();
H._trigger("activate",D,C)
}})
},stop:function(D,F){var E=A(this).data("draggable"),C=A.extend({},F,{item:E.element});
A.each(E.sortables,function(){if(this.instance.isOver){this.instance.isOver=0;
E.cancelHelperRemoval=true;
this.instance.cancelHelperRemoval=false;
if(this.shouldRevert){this.instance.options.revert=true
}this.instance._mouseStop(D);
this.instance.options.helper=this.instance.options._helper;
if(E.options.helper=="original"){this.instance.currentItem.css({top:"auto",left:"auto"})
}}else{this.instance.cancelHelperRemoval=false;
this.instance._trigger("deactivate",D,C)
}})
},drag:function(D,G){var F=A(this).data("draggable"),C=this;
var E=function(J){var O=this.offset.click.top,N=this.offset.click.left;
var H=this.positionAbs.top,L=this.positionAbs.left;
var K=J.height,M=J.width;
var P=J.top,I=J.left;
return A.ui.isOver(H+O,L+N,P,I,K,M)
};
A.each(F.sortables,function(H){this.instance.positionAbs=F.positionAbs;
this.instance.helperProportions=F.helperProportions;
this.instance.offset.click=F.offset.click;
if(this.instance._intersectsWith(this.instance.containerCache)){if(!this.instance.isOver){this.instance.isOver=1;
this.instance.currentItem=A(C).clone().appendTo(this.instance.element).data("sortable-item",true);
this.instance.options._helper=this.instance.options.helper;
this.instance.options.helper=function(){return G.helper[0]
};
D.target=this.instance.currentItem[0];
this.instance._mouseCapture(D,true);
this.instance._mouseStart(D,true,true);
this.instance.offset.click.top=F.offset.click.top;
this.instance.offset.click.left=F.offset.click.left;
this.instance.offset.parent.left-=F.offset.parent.left-this.instance.offset.parent.left;
this.instance.offset.parent.top-=F.offset.parent.top-this.instance.offset.parent.top;
F._trigger("toSortable",D);
F.dropped=this.instance.element;
F.currentItem=F.element;
this.instance.fromOutside=F
}if(this.instance.currentItem){this.instance._mouseDrag(D)
}}else{if(this.instance.isOver){this.instance.isOver=0;
this.instance.cancelHelperRemoval=true;
this.instance.options.revert=false;
this.instance._trigger("out",D,this.instance._uiHash(this.instance));
this.instance._mouseStop(D,true);
this.instance.options.helper=this.instance.options._helper;
this.instance.currentItem.remove();
if(this.instance.placeholder){this.instance.placeholder.remove()
}F._trigger("fromSortable",D);
F.dropped=false
}}})
}});
A.ui.plugin.add("draggable","cursor",{start:function(D,E){var C=A("body"),F=A(this).data("draggable").options;
if(C.css("cursor")){F._cursor=C.css("cursor")
}C.css("cursor",F.cursor)
},stop:function(C,D){var E=A(this).data("draggable").options;
if(E._cursor){A("body").css("cursor",E._cursor)
}}});
A.ui.plugin.add("draggable","iframeFix",{start:function(C,D){var E=A(this).data("draggable").options;
A(E.iframeFix===true?"iframe":E.iframeFix).each(function(){A('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1000}).css(A(this).offset()).appendTo("body")
})
},stop:function(C,D){A("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this)
})
}});
A.ui.plugin.add("draggable","opacity",{start:function(D,E){var C=A(E.helper),F=A(this).data("draggable").options;
if(C.css("opacity")){F._opacity=C.css("opacity")
}C.css("opacity",F.opacity)
},stop:function(C,D){var E=A(this).data("draggable").options;
if(E._opacity){A(D.helper).css("opacity",E._opacity)
}}});
A.ui.plugin.add("draggable","scroll",{start:function(D,E){var C=A(this).data("draggable");
if(C.scrollParent[0]!=document&&C.scrollParent[0].tagName!="HTML"){C.overflowOffset=C.scrollParent.offset()
}},drag:function(E,F){var D=A(this).data("draggable"),G=D.options,C=false;
if(D.scrollParent[0]!=document&&D.scrollParent[0].tagName!="HTML"){if(!G.axis||G.axis!="x"){if((D.overflowOffset.top+D.scrollParent[0].offsetHeight)-E.pageY<G.scrollSensitivity){D.scrollParent[0].scrollTop=C=D.scrollParent[0].scrollTop+G.scrollSpeed
}else{if(E.pageY-D.overflowOffset.top<G.scrollSensitivity){D.scrollParent[0].scrollTop=C=D.scrollParent[0].scrollTop-G.scrollSpeed
}}}if(!G.axis||G.axis!="y"){if((D.overflowOffset.left+D.scrollParent[0].offsetWidth)-E.pageX<G.scrollSensitivity){D.scrollParent[0].scrollLeft=C=D.scrollParent[0].scrollLeft+G.scrollSpeed
}else{if(E.pageX-D.overflowOffset.left<G.scrollSensitivity){D.scrollParent[0].scrollLeft=C=D.scrollParent[0].scrollLeft-G.scrollSpeed
}}}}else{if(!G.axis||G.axis!="x"){if(E.pageY-A(document).scrollTop()<G.scrollSensitivity){C=A(document).scrollTop(A(document).scrollTop()-G.scrollSpeed)
}else{if(A(window).height()-(E.pageY-A(document).scrollTop())<G.scrollSensitivity){C=A(document).scrollTop(A(document).scrollTop()+G.scrollSpeed)
}}}if(!G.axis||G.axis!="y"){if(E.pageX-A(document).scrollLeft()<G.scrollSensitivity){C=A(document).scrollLeft(A(document).scrollLeft()-G.scrollSpeed)
}else{if(A(window).width()-(E.pageX-A(document).scrollLeft())<G.scrollSensitivity){C=A(document).scrollLeft(A(document).scrollLeft()+G.scrollSpeed)
}}}}if(C!==false&&A.ui.ddmanager&&!G.dropBehaviour){A.ui.ddmanager.prepareOffsets(D,E)
}}});
A.ui.plugin.add("draggable","snap",{start:function(D,E){var C=A(this).data("draggable"),F=C.options;
C.snapElements=[];
A(F.snap.constructor!=String?(F.snap.items||":data(draggable)"):F.snap).each(function(){var H=A(this);
var G=H.offset();
if(this!=C.element[0]){C.snapElements.push({item:this,width:H.outerWidth(),height:H.outerHeight(),top:G.top,left:G.left})
}})
},drag:function(O,L){var F=A(this).data("draggable"),M=F.options;
var S=M.snapTolerance;
var R=L.offset.left,Q=R+F.helperProportions.width,E=L.offset.top,D=E+F.helperProportions.height;
for(var P=F.snapElements.length-1;
P>=0;
P--){var N=F.snapElements[P].left,K=N+F.snapElements[P].width,J=F.snapElements[P].top,U=J+F.snapElements[P].height;
if(!((N-S<R&&R<K+S&&J-S<E&&E<U+S)||(N-S<R&&R<K+S&&J-S<D&&D<U+S)||(N-S<Q&&Q<K+S&&J-S<E&&E<U+S)||(N-S<Q&&Q<K+S&&J-S<D&&D<U+S))){if(F.snapElements[P].snapping){(F.options.snap.release&&F.options.snap.release.call(F.element,O,A.extend(F._uiHash(),{snapItem:F.snapElements[P].item})))
}F.snapElements[P].snapping=false;
continue
}if(M.snapMode!="inner"){var C=Math.abs(J-D)<=S;
var T=Math.abs(U-E)<=S;
var H=Math.abs(N-Q)<=S;
var I=Math.abs(K-R)<=S;
if(C){L.position.top=F._convertPositionTo("relative",{top:J-F.helperProportions.height,left:0}).top-F.margins.top
}if(T){L.position.top=F._convertPositionTo("relative",{top:U,left:0}).top-F.margins.top
}if(H){L.position.left=F._convertPositionTo("relative",{top:0,left:N-F.helperProportions.width}).left-F.margins.left
}if(I){L.position.left=F._convertPositionTo("relative",{top:0,left:K}).left-F.margins.left
}}var G=(C||T||H||I);
if(M.snapMode!="outer"){var C=Math.abs(J-E)<=S;
var T=Math.abs(U-D)<=S;
var H=Math.abs(N-R)<=S;
var I=Math.abs(K-Q)<=S;
if(C){L.position.top=F._convertPositionTo("relative",{top:J,left:0}).top-F.margins.top
}if(T){L.position.top=F._convertPositionTo("relative",{top:U-F.helperProportions.height,left:0}).top-F.margins.top
}if(H){L.position.left=F._convertPositionTo("relative",{top:0,left:N}).left-F.margins.left
}if(I){L.position.left=F._convertPositionTo("relative",{top:0,left:K-F.helperProportions.width}).left-F.margins.left
}}if(!F.snapElements[P].snapping&&(C||T||H||I||G)){(F.options.snap.snap&&F.options.snap.snap.call(F.element,O,A.extend(F._uiHash(),{snapItem:F.snapElements[P].item})))
}F.snapElements[P].snapping=(C||T||H||I||G)
}}});
A.ui.plugin.add("draggable","stack",{start:function(D,E){var G=A(this).data("draggable").options;
var F=A.makeArray(A(G.stack)).sort(function(I,H){return(parseInt(A(I).css("zIndex"),10)||0)-(parseInt(A(H).css("zIndex"),10)||0)
});
if(!F.length){return 
}var C=parseInt(F[0].style.zIndex)||0;
A(F).each(function(H){this.style.zIndex=C+H
});
this[0].style.zIndex=C+F.length
}});
A.ui.plugin.add("draggable","zIndex",{start:function(D,E){var C=A(E.helper),F=A(this).data("draggable").options;
if(C.css("zIndex")){F._zIndex=C.css("zIndex")
}C.css("zIndex",F.zIndex)
},stop:function(C,D){var E=A(this).data("draggable").options;
if(E._zIndex){A(D.helper).css("zIndex",E._zIndex)
}}})
})(jQuery);
(function(A,B){A.widget("ui.droppable",{widgetEventPrefix:"drop",options:{accept:"*",activeClass:false,addClasses:true,greedy:false,hoverClass:false,scope:"default",tolerance:"intersect"},_create:function(){var D=this.options,C=D.accept;
this.isover=0;
this.isout=1;
this.accept=A.isFunction(C)?C:function(E){return E.is(C)
};
this.proportions={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight};
A.ui.ddmanager.droppables[D.scope]=A.ui.ddmanager.droppables[D.scope]||[];
A.ui.ddmanager.droppables[D.scope].push(this);
(D.addClasses&&this.element.addClass("ui-droppable"))
},destroy:function(){var C=A.ui.ddmanager.droppables[this.options.scope];
for(var D=0;
D<C.length;
D++){if(C[D]==this){C.splice(D,1)
}}this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable");
return this
},_setOption:function(C,D){if(C=="accept"){this.accept=A.isFunction(D)?D:function(E){return E.is(D)
}
}A.Widget.prototype._setOption.apply(this,arguments)
},_activate:function(D){var C=A.ui.ddmanager.current;
if(this.options.activeClass){this.element.addClass(this.options.activeClass)
}(C&&this._trigger("activate",D,this.ui(C)))
},_deactivate:function(D){var C=A.ui.ddmanager.current;
if(this.options.activeClass){this.element.removeClass(this.options.activeClass)
}(C&&this._trigger("deactivate",D,this.ui(C)))
},_over:function(D){var C=A.ui.ddmanager.current;
if(!C||(C.currentItem||C.element)[0]==this.element[0]){return 
}if(this.accept.call(this.element[0],(C.currentItem||C.element))){if(this.options.hoverClass){this.element.addClass(this.options.hoverClass)
}this._trigger("over",D,this.ui(C))
}},_out:function(D){var C=A.ui.ddmanager.current;
if(!C||(C.currentItem||C.element)[0]==this.element[0]){return 
}if(this.accept.call(this.element[0],(C.currentItem||C.element))){if(this.options.hoverClass){this.element.removeClass(this.options.hoverClass)
}this._trigger("out",D,this.ui(C))
}},_drop:function(D,E){var C=E||A.ui.ddmanager.current;
if(!C||(C.currentItem||C.element)[0]==this.element[0]){return false
}var F=false;
this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function(){var G=A.data(this,"droppable");
if(G.options.greedy&&!G.options.disabled&&G.options.scope==C.options.scope&&G.accept.call(G.element[0],(C.currentItem||C.element))&&A.ui.intersect(C,A.extend(G,{offset:G.element.offset()}),G.options.tolerance)){F=true;
return false
}});
if(F){return false
}if(this.accept.call(this.element[0],(C.currentItem||C.element))){if(this.options.activeClass){this.element.removeClass(this.options.activeClass)
}if(this.options.hoverClass){this.element.removeClass(this.options.hoverClass)
}this._trigger("drop",D,this.ui(C));
return this.element
}return false
},ui:function(C){return{draggable:(C.currentItem||C.element),helper:C.helper,position:C.position,offset:C.positionAbs}
}});
A.extend(A.ui.droppable,{version:"1.8.6"});
A.ui.intersect=function(P,J,N){if(!J.offset){return false
}var E=(P.positionAbs||P.position.absolute).left,D=E+P.helperProportions.width,M=(P.positionAbs||P.position.absolute).top,L=M+P.helperProportions.height;
var G=J.offset.left,C=G+J.proportions.width,O=J.offset.top,K=O+J.proportions.height;
switch(N){case"fit":return(G<=E&&D<=C&&O<=M&&L<=K);
break;
case"intersect":return(G<E+(P.helperProportions.width/2)&&D-(P.helperProportions.width/2)<C&&O<M+(P.helperProportions.height/2)&&L-(P.helperProportions.height/2)<K);
break;
case"pointer":var H=((P.positionAbs||P.position.absolute).left+(P.clickOffset||P.offset.click).left),I=((P.positionAbs||P.position.absolute).top+(P.clickOffset||P.offset.click).top),F=A.ui.isOver(I,H,O,G,J.proportions.height,J.proportions.width);
return F;
break;
case"touch":return((M>=O&&M<=K)||(L>=O&&L<=K)||(M<O&&L>K))&&((E>=G&&E<=C)||(D>=G&&D<=C)||(E<G&&D>C));
break;
default:return false;
break
}};
A.ui.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function(F,H){var C=A.ui.ddmanager.droppables[F.options.scope]||[];
var G=H?H.type:null;
var I=(F.currentItem||F.element).find(":data(droppable)").andSelf();
droppablesLoop:for(var E=0;
E<C.length;
E++){if(C[E].options.disabled||(F&&!C[E].accept.call(C[E].element[0],(F.currentItem||F.element)))){continue
}for(var D=0;
D<I.length;
D++){if(I[D]==C[E].element[0]){C[E].proportions.height=0;
continue droppablesLoop
}}C[E].visible=C[E].element.css("display")!="none";
if(!C[E].visible){continue
}C[E].offset=C[E].element.offset();
C[E].proportions={width:C[E].element[0].offsetWidth,height:C[E].element[0].offsetHeight};
if(G=="mousedown"){C[E]._activate.call(C[E],H)
}}},drop:function(C,D){var E=false;
A.each(A.ui.ddmanager.droppables[C.options.scope]||[],function(){if(!this.options){return 
}if(!this.options.disabled&&this.visible&&A.ui.intersect(C,this,this.options.tolerance)){E=E||this._drop.call(this,D)
}if(!this.options.disabled&&this.visible&&this.accept.call(this.element[0],(C.currentItem||C.element))){this.isout=1;
this.isover=0;
this._deactivate.call(this,D)
}});
return E
},drag:function(C,D){if(C.options.refreshPositions){A.ui.ddmanager.prepareOffsets(C,D)
}A.each(A.ui.ddmanager.droppables[C.options.scope]||[],function(){if(this.options.disabled||this.greedyChild||!this.visible){return 
}var F=A.ui.intersect(C,this,this.options.tolerance);
var H=!F&&this.isover==1?"isout":(F&&this.isover==0?"isover":null);
if(!H){return 
}var G;
if(this.options.greedy){var E=this.element.parents(":data(droppable):eq(0)");
if(E.length){G=A.data(E[0],"droppable");
G.greedyChild=(H=="isover"?1:0)
}}if(G&&H=="isover"){G.isover=0;
G.isout=1;
G._out.call(G,D)
}this[H]=1;
this[H=="isout"?"isover":"isout"]=0;
this[H=="isover"?"_over":"_out"].call(this,D);
if(G&&H=="isout"){G.isout=0;
G.isover=1;
G._over.call(G,D)
}})
}}
})(jQuery);;(function(B,A){A.ui=A.ui||{};
var C={exec:function(E,D){if(D.switchMode=="server"){return this.execServer(E,D)
}else{if(D.switchMode=="ajax"){return this.execAjax(E,D)
}else{if(D.switchMode=="client"){return this.execClient(E,D)
}else{A.log.error("SwitchItems.exec : unknown switchMode ("+D.switchMode+")")
}}}},execServer:function(F,D){if(F){var E=F.__leave();
if(!E){return false
}}this.__setActiveItem(D);
var G={};
G[D.getTogglePanel().id]=D.name;
G[D.id]=D.id;
B.extend(G,D.getTogglePanel().options.ajax||{});
A.submitForm(this.__getParentForm(D),G);
return false
},execAjax:function(F,D){var E=B.extend({},D.getTogglePanel().options.ajax,{});
this.__setActiveItem(D);
A.ajax(D.id,null,E);
if(F){this.__setActiveItem(F)
}return false
},execClient:function(F,D){if(F){var E=F.__leave();
if(!E){return false
}}this.__setActiveItem(D);
D.__enter();
D.getTogglePanel().__fireItemChange(F,D);
return true
},__getParentForm:function(D){return B(A.getDomElement(D.id)).parents("form:first")
},__setActiveItem:function(D){A.getDomElement(D.togglePanelId+"-value").value=D.getName();
D.getTogglePanel().activeItem=D.getName()
}};
A.ui.TabPanel=A.ui.TogglePanel.extendClass({name:"TabPanel",init:function(E,D){A.ui.TogglePanel.call(this,E,D);
this.items=[];
this.isKeepHeight=D.isKeepHeight||false
},__itemsSwitcher:function(){return C
}})
})(jQuery,RichFaces);;(function(B,A){A.ui=A.ui||{};
A.ui.PopupPanel.Border=function(H,F,G,E){C.constructor.call(this,H);
this.element=B(A.getDomElement(H));
this.element.css("cursor",G);
var D=this;
this.element.bind("mousedown",{border:D},this.startDrag);
this.modalPanel=F;
this.sizer=E
};
var C=A.BaseComponent.extend(A.ui.PopupPanel.Border);
var C=A.ui.PopupPanel.Border.$super;
B.extend(A.ui.PopupPanel.Border.prototype,(function(D){return{name:"RichFaces.ui.PopupPanel.Border",destroy:function(){if(this.doingDrag){B(document).unbind("mousemove",this.doDrag);
B(document).unbind("mouseup",this.endDrag)
}this.element.unbind("mousedown",this.startDrag);
this.element=null;
this.modalPanel=null
},show:function(){this.element.show()
},hide:function(){this.element.hide()
},startDrag:function(F){var E=F.data.border;
E.doingDrag=true;
E.dragX=F.clientX;
E.dragY=F.clientY;
B(document).bind("mousemove",{border:E},E.doDrag);
B(document).bind("mouseup",{border:E},E.endDrag);
E.modalPanel.startDrag(E);
E.onselectStartHandler=document.onselectstart;
document.onselectstart=function(){return false
}
},getWindowSize:function(){var F=0,E=0;
if(typeof (window.innerWidth)=="number"){F=window.innerWidth;
E=window.innerHeight
}else{if(document.documentElement&&(document.documentElement.clientWidth||document.documentElement.clientHeight)){F=document.documentElement.clientWidth;
E=document.documentElement.clientHeight
}else{if(document.body&&(document.body.clientWidth||document.body.clientHeight)){F=document.body.clientWidth;
E=document.body.clientHeight
}}}return{width:F,height:E}
},doDrag:function(E){var J=E.data.border;
if(!J.doingDrag){return 
}var I=E.clientX;
var F=E.clientY;
var L=J.getWindowSize();
if(I<0){I=0
}else{if(I>=L.width){I=L.width-1
}}if(F<0){F=0
}else{if(F>=L.height){F=L.height-1
}}var P=I-J.dragX;
var O=F-J.dragY;
if(P!=0||O!=0){var H=J.id;
var N=J.sizer.prototype.doDiff(P,O);
var M;
var K=J.modalPanel.cdiv;
if(N.deltaWidth||N.deltaHeight){M=J.modalPanel.invokeEvent("resize",E,null,K)
}else{if(N.deltaX||N.deltaY){M=J.modalPanel.invokeEvent("move",E,null,K)
}}var G;
if(M){G=J.modalPanel.doResizeOrMove(N)
}if(G){if(!G.x){J.dragX=I
}else{if(!N.deltaX){J.dragX-=G.vx||0
}else{J.dragX+=G.vx||0
}}if(!G.y){J.dragY=F
}else{if(!N.deltaY){J.dragY-=G.vy||0
}else{J.dragY+=G.vy||0
}}}}},endDrag:function(F){var E=F.data.border;
E.doingDrag=undefined;
B(document).unbind("mousemove",E.doDrag);
B(document).unbind("mouseup",E.endDrag);
E.modalPanel.endDrag(E);
E.modalPanel.doResizeOrMove(A.ui.PopupPanel.Sizer.Diff.EMPTY);
document.onselectstart=E.onselectStartHandler;
E.onselectStartHandler=null
},doPosition:function(){this.sizer.prototype.doPosition(this.modalPanel,this.element)
}}
})())
})(jQuery,window.RichFaces);;(function(D){var I,A;
var E;
var B;
D.extend({pnotify_remove_all:function(){var K=E.data("pnotify");
if(K&&K.length){D.each(K,function(){if(this.pnotify_remove){this.pnotify_remove()
}})
}},pnotify_position_all:function(){if(A){clearTimeout(A)
}A=null;
var K=E.data("pnotify");
if(!K||!K.length){return 
}D.each(K,function(){var O=this.opts.pnotify_stack;
if(!O){return 
}if(!O.nextpos1){O.nextpos1=O.firstpos1
}if(!O.nextpos2){O.nextpos2=O.firstpos2
}if(!O.addpos2){O.addpos2=0
}if(this.css("display")!="none"){var Q,P;
var L={};
var N;
switch(O.dir1){case"down":N="top";
break;
case"up":N="bottom";
break;
case"left":N="right";
break;
case"right":N="left";
break
}Q=parseInt(this.css(N));
if(isNaN(Q)){Q=0
}if(typeof O.firstpos1=="undefined"){O.firstpos1=Q;
O.nextpos1=O.firstpos1
}var M;
switch(O.dir2){case"down":M="top";
break;
case"up":M="bottom";
break;
case"left":M="right";
break;
case"right":M="left";
break
}P=parseInt(this.css(M));
if(isNaN(P)){P=0
}if(typeof O.firstpos2=="undefined"){O.firstpos2=P;
O.nextpos2=O.firstpos2
}if((O.dir1=="down"&&O.nextpos1+this.height()>B.height())||(O.dir1=="up"&&O.nextpos1+this.height()>B.height())||(O.dir1=="left"&&O.nextpos1+this.width()>B.width())||(O.dir1=="right"&&O.nextpos1+this.width()>B.width())){O.nextpos1=O.firstpos1;
O.nextpos2+=O.addpos2+10;
O.addpos2=0
}if(O.animation&&O.nextpos2<P){switch(O.dir2){case"down":L.top=O.nextpos2+"px";
break;
case"up":L.bottom=O.nextpos2+"px";
break;
case"left":L.right=O.nextpos2+"px";
break;
case"right":L.left=O.nextpos2+"px";
break
}}else{this.css(M,O.nextpos2+"px")
}switch(O.dir2){case"down":case"up":if(this.outerHeight(true)>O.addpos2){O.addpos2=this.height()
}break;
case"left":case"right":if(this.outerWidth(true)>O.addpos2){O.addpos2=this.width()
}break
}if(O.nextpos1){if(O.animation&&(Q>O.nextpos1||L.top||L.bottom||L.right||L.left)){switch(O.dir1){case"down":L.top=O.nextpos1+"px";
break;
case"up":L.bottom=O.nextpos1+"px";
break;
case"left":L.right=O.nextpos1+"px";
break;
case"right":L.left=O.nextpos1+"px";
break
}}else{this.css(N,O.nextpos1+"px")
}}if(L.top||L.bottom||L.right||L.left){this.animate(L,{duration:500,queue:false})
}switch(O.dir1){case"down":case"up":O.nextpos1+=this.height()+10;
break;
case"left":case"right":O.nextpos1+=this.width()+10;
break
}}});
D.each(K,function(){var L=this.opts.pnotify_stack;
if(!L){return 
}L.nextpos1=L.firstpos1;
L.nextpos2=L.firstpos2;
L.addpos2=0;
L.animation=true
})
},pnotify:function(R){if(!E){E=D("body")
}if(!B){B=D(window)
}var S;
var K;
if(typeof R!="object"){K=D.extend({},D.pnotify.defaults);
K.pnotify_text=R
}else{K=D.extend({},D.pnotify.defaults,R);
if(K.pnotify_animation instanceof Object){K.pnotify_animation=D.extend({effect_in:D.pnotify.defaults.pnotify_animation,effect_out:D.pnotify.defaults.pnotify_animation},K.pnotify_animation)
}}if(K.pnotify_before_init){if(K.pnotify_before_init(K)===false){return null
}}var L;
var M=function(X,U){O.css("display","none");
var T=document.elementFromPoint(X.clientX,X.clientY);
O.css("display","block");
var W=D(T);
var V=W.css("cursor");
O.css("cursor",V!="auto"?V:"default");
if(!L||L.get(0)!=T){if(L){F.call(L.get(0),"mouseleave",X.originalEvent);
F.call(L.get(0),"mouseout",X.originalEvent)
}F.call(T,"mouseenter",X.originalEvent);
F.call(T,"mouseover",X.originalEvent)
}F.call(T,U,X.originalEvent);
L=W
};
var O=D("<div />",{"class":"rf-ntf "+K.pnotify_addclass,css:{display:"none"},mouseenter:function(T){if(K.pnotify_nonblock){T.stopPropagation()
}if(K.pnotify_mouse_reset&&S=="out"){O.stop(true);
S="in";
O.css("height","auto").animate({width:K.pnotify_width,opacity:K.pnotify_nonblock?K.pnotify_nonblock_opacity:K.pnotify_opacity},"fast")
}if(K.pnotify_nonblock){O.animate({opacity:K.pnotify_nonblock_opacity},"fast")
}if(K.pnotify_hide&&K.pnotify_mouse_reset){O.pnotify_cancel_remove()
}if(K.pnotify_closer&&!K.pnotify_nonblock){O.closer.css("visibility","visible")
}},mouseleave:function(T){if(K.pnotify_nonblock){T.stopPropagation()
}L=null;
O.css("cursor","auto");
if(K.pnotify_nonblock&&S!="out"){O.animate({opacity:K.pnotify_opacity},"fast")
}if(K.pnotify_hide&&K.pnotify_mouse_reset){O.pnotify_queue_remove()
}O.closer.css("visibility","hidden");
D.pnotify_position_all()
},mouseover:function(T){if(K.pnotify_nonblock){T.stopPropagation()
}},mouseout:function(T){if(K.pnotify_nonblock){T.stopPropagation()
}},mousemove:function(T){if(K.pnotify_nonblock){T.stopPropagation();
M(T,"onmousemove")
}},mousedown:function(T){if(K.pnotify_nonblock){T.stopPropagation();
T.preventDefault();
M(T,"onmousedown")
}},mouseup:function(T){if(K.pnotify_nonblock){T.stopPropagation();
T.preventDefault();
M(T,"onmouseup")
}},click:function(T){if(K.pnotify_nonblock){T.stopPropagation();
M(T,"onclick")
}},dblclick:function(T){if(K.pnotify_nonblock){T.stopPropagation();
M(T,"ondblclick")
}}});
O.opts=K;
if(K.pnotify_shadow&&!D.browser.msie){O.shadow_container=D("<div />",{"class":"rf-ntf-shdw"}).prependTo(O)
}O.container=D("<div />",{"class":"rf-ntf-cnt"}).appendTo(O);
O.pnotify_version="1.0.1";
O.pnotify=function(T){var U=K;
if(typeof T=="string"){K.pnotify_text=T
}else{K=D.extend({},K,T)
}O.opts=K;
if(K.pnotify_shadow!=U.pnotify_shadow){if(K.pnotify_shadow&&!D.browser.msie){O.shadow_container=D("<div />",{"class":"rf-ntf-shdw"}).prependTo(O)
}else{O.children(".rf-ntf-shdw").remove()
}}if(K.pnotify_addclass===false){O.removeClass(U.pnotify_addclass)
}else{if(K.pnotify_addclass!==U.pnotify_addclass){O.removeClass(U.pnotify_addclass).addClass(K.pnotify_addclass)
}}if(K.pnotify_title===false){O.title_container.hide("fast")
}else{if(K.pnotify_title!==U.pnotify_title){O.title_container.html(K.pnotify_title).show(200)
}}if(K.pnotify_text===false){O.text_container.hide("fast")
}else{if(K.pnotify_text!==U.pnotify_text){if(K.pnotify_insert_brs){K.pnotify_text=K.pnotify_text.replace(/\n/g,"<br />")
}O.text_container.html(K.pnotify_text).show(200)
}}O.pnotify_history=K.pnotify_history;
if(K.pnotify_type!=U.pnotify_type){O.container.toggleClass("rf-ntf-cnt rf-ntf-cnt-hov")
}if((K.pnotify_notice_icon!=U.pnotify_notice_icon&&K.pnotify_type=="notice")||(K.pnotify_error_icon!=U.pnotify_error_icon&&K.pnotify_type=="error")||(K.pnotify_type!=U.pnotify_type)){O.container.find("div.rf-ntf-ico").remove();
D("<div />",{"class":"rf-ntf-ico"}).append(D("<span />",{"class":K.pnotify_type=="error"?K.pnotify_error_icon:K.pnotify_notice_icon})).prependTo(O.container)
}if(K.pnotify_width!==U.pnotify_width){O.animate({width:K.pnotify_width})
}if(K.pnotify_min_height!==U.pnotify_min_height){O.container.animate({minHeight:K.pnotify_min_height})
}if(K.pnotify_opacity!==U.pnotify_opacity){O.fadeTo(K.pnotify_animate_speed,K.pnotify_opacity)
}if(!K.pnotify_hide){O.pnotify_cancel_remove()
}else{if(!U.pnotify_hide){O.pnotify_queue_remove()
}}O.pnotify_queue_position();
return O
};
O.pnotify_queue_position=function(){if(A){clearTimeout(A)
}A=setTimeout(D.pnotify_position_all,10)
};
O.pnotify_display=function(){if(!O.parent().length){O.appendTo(E)
}if(K.pnotify_before_open){if(K.pnotify_before_open(O)===false){return 
}}O.pnotify_queue_position();
if(K.pnotify_animation=="fade"||K.pnotify_animation.effect_in=="fade"){O.show().fadeTo(0,0).hide()
}else{if(K.pnotify_opacity!=1){O.show().fadeTo(0,K.pnotify_opacity).hide()
}}O.animate_in(function(){if(K.pnotify_after_open){K.pnotify_after_open(O)
}O.pnotify_queue_position();
if(K.pnotify_hide){O.pnotify_queue_remove()
}})
};
O.pnotify_remove=function(){if(O.timer){window.clearTimeout(O.timer);
O.timer=null
}if(K.pnotify_before_close){if(K.pnotify_before_close(O)===false){return 
}}O.animate_out(function(){if(K.pnotify_after_close){if(K.pnotify_after_close(O)===false){return 
}}O.pnotify_queue_position();
if(K.pnotify_remove){O.detach()
}})
};
O.animate_in=function(U){S="in";
var T;
if(typeof K.pnotify_animation.effect_in!="undefined"){T=K.pnotify_animation.effect_in
}else{T=K.pnotify_animation
}if(T=="none"){O.show();
U()
}else{if(T=="show"){O.show(K.pnotify_animate_speed,U)
}else{if(T=="fade"){O.show().fadeTo(K.pnotify_animate_speed,K.pnotify_opacity,U)
}else{if(T=="slide"){O.slideDown(K.pnotify_animate_speed,U)
}else{if(typeof T=="function"){T("in",U,O)
}else{if(O.effect){O.effect(T,{},K.pnotify_animate_speed,U)
}}}}}}};
O.animate_out=function(U){S="out";
var T;
if(typeof K.pnotify_animation.effect_out!="undefined"){T=K.pnotify_animation.effect_out
}else{T=K.pnotify_animation
}if(T=="none"){O.hide();
U()
}else{if(T=="show"){O.hide(K.pnotify_animate_speed,U)
}else{if(T=="fade"){O.fadeOut(K.pnotify_animate_speed,U)
}else{if(T=="slide"){O.slideUp(K.pnotify_animate_speed,U)
}else{if(typeof T=="function"){T("out",U,O)
}else{if(O.effect){O.effect(T,{},K.pnotify_animate_speed,U)
}}}}}}};
O.pnotify_cancel_remove=function(){if(O.timer){window.clearTimeout(O.timer)
}};
O.pnotify_queue_remove=function(){O.pnotify_cancel_remove();
O.timer=window.setTimeout(function(){O.pnotify_remove()
},(isNaN(K.pnotify_delay)?0:K.pnotify_delay))
};
O.closer=D("<div />",{"class":"rf-ntf-cls",css:{cursor:"pointer",visibility:"hidden"},click:function(){O.pnotify_remove();
O.closer.css("visibility","hidden")
}}).append(D("<span />",{"class":"rf-ntf-cls-ico"})).appendTo(O.container);
D("<div />",{"class":"rf-ntf-ico"}).append(D("<span />",{"class":K.pnotify_type=="error"?K.pnotify_error_icon:K.pnotify_notice_icon})).appendTo(O.container);
O.title_container=D("<div />",{"class":"rf-ntf-sum",html:K.pnotify_title}).appendTo(O.container);
if(K.pnotify_title===false){O.title_container.hide()
}if(K.pnotify_insert_brs&&typeof K.pnotify_text=="string"){K.pnotify_text=K.pnotify_text.replace(/\n/g,"<br />")
}O.text_container=D("<div />",{"class":"rf-ntf-det",html:K.pnotify_text}).appendTo(O.container);
if(K.pnotify_text===false){O.text_container.hide()
}D("<div />",{"class":"rf-ntf-clr"}).appendTo(O.container);
if(typeof K.pnotify_width=="string"){O.css("width",K.pnotify_width)
}if(typeof K.pnotify_min_height=="string"){O.container.css("min-height",K.pnotify_min_height)
}O.pnotify_history=K.pnotify_history;
var Q=E.data("pnotify");
if(Q==null||typeof Q!="object"){Q=[]
}if(K.pnotify_stack.push=="top"){Q=D.merge([O],Q)
}else{Q=D.merge(Q,[O])
}E.data("pnotify",Q);
if(K.pnotify_after_init){K.pnotify_after_init(O)
}if(K.pnotify_history){var P=E.data("pnotify_history");
if(typeof P=="undefined"){P=D("<div />",{"class":"rf-ntf-hstr",mouseleave:function(){P.animate({top:"-"+I+"px"},{duration:100,queue:false})
}}).append(D("<div />",{"class":"rf-ntf-hstr-hdr",text:"Redisplay"})).append(D("<button />",{"class":"rf-ntf-hstr-all",text:"All",click:function(){D.each(E.data("pnotify"),function(){if(this.pnotify_history&&this.pnotify_display){this.pnotify_display()
}});
return false
}})).append(D("<button />",{"class":"rf-ntf-hstr-last",text:"Last",click:function(){var T=1;
var U=E.data("pnotify");
while(!U[U.length-T]||!U[U.length-T].pnotify_history||U[U.length-T].is(":visible")){if(U.length-T===0){return false
}T++
}var V=U[U.length-T];
if(V.pnotify_display){V.pnotify_display()
}return false
}})).appendTo(E);
var N=D("<span />",{"class":"rf-ntf-hstr-hndl",mouseenter:function(){P.animate({top:"0"},{duration:100,queue:false})
}}).appendTo(P);
I=N.offset().top+2;
P.css({top:"-"+I+"px"});
E.data("pnotify_history",P)
}}K.pnotify_stack.animation=false;
O.pnotify_display();
return O
}});
var J=/^on/;
var C=/^(dbl)?click$|^mouse(move|down|up|over|out|enter|leave)$|^contextmenu$/;
var H=/^(focus|blur|select|change|reset)$|^key(press|down|up)$/;
var G=/^(scroll|resize|(un)?load|abort|error)$/;
var F=function(L,K){var M;
L=L.toLowerCase();
if(document.createEvent&&this.dispatchEvent){L=L.replace(J,"");
if(L.match(C)){D(this).offset();
M=document.createEvent("MouseEvents");
M.initMouseEvent(L,K.bubbles,K.cancelable,K.view,K.detail,K.screenX,K.screenY,K.clientX,K.clientY,K.ctrlKey,K.altKey,K.shiftKey,K.metaKey,K.button,K.relatedTarget)
}else{if(L.match(H)){M=document.createEvent("UIEvents");
M.initUIEvent(L,K.bubbles,K.cancelable,K.view,K.detail)
}else{if(L.match(G)){M=document.createEvent("HTMLEvents");
M.initEvent(L,K.bubbles,K.cancelable)
}}}if(!M){return 
}this.dispatchEvent(M)
}else{if(!L.match(J)){L="on"+L
}M=document.createEventObject(K);
this.fireEvent(L,M)
}};
D.pnotify.defaults={pnotify_title:false,pnotify_text:false,pnotify_addclass:"",pnotify_nonblock:false,pnotify_nonblock_opacity:0.2,pnotify_history:true,pnotify_width:"300px",pnotify_min_height:"16px",pnotify_type:"notice",pnotify_notice_icon:"",pnotify_error_icon:"",pnotify_animation:"fade",pnotify_animate_speed:"slow",pnotify_opacity:1,pnotify_shadow:false,pnotify_closer:true,pnotify_hide:true,pnotify_delay:8000,pnotify_mouse_reset:true,pnotify_remove:true,pnotify_insert_brs:true,pnotify_stack:{dir1:"down",dir2:"left",push:"bottom"}}
})(jQuery);;(function(D,C){C.ui=C.ui||{};
var A={enabledInInput:false,preventDefault:true};
var B=["keydown","keyup"];
C.ui.HotKey=function(G,F){E.constructor.call(this,G);
this.namespace=this.namespace||"."+C.Event.createNamespace(this.name,this.id);
this.attachToDom(this.componentId);
this.options=D.extend({},A,F);
this.__handlers={};
this.options.selector=(this.options.selector)?this.options.selector:document;
D(document).ready(D.proxy(function(){this.__bindDefinedHandlers()
},this))
};
C.BaseComponent.extend(C.ui.HotKey);
var E=C.ui.HotKey.$super;
D.extend(C.ui.HotKey.prototype,{name:"HotKey",__bindDefinedHandlers:function(){for(var F=0;
F<B.length;
F++){if(this.options["on"+B[F]]){this.__bindHandler(B[F])
}}},__bindHandler:function(F){this.__handlers[F]=D.proxy(function(H){var G=this.invokeEvent.call(this,F,document.getElementById(this.id),H);
if(this.options.preventDefault){H.stopPropagation();
H.preventDefault();
return false
}return G
},this);
D(this.options.selector).bind(F+this.namespace,this.options,this.__handlers[F])
},destroy:function(){C.Event.unbindById(this.id,this.namespace);
for(var F in this.__handlers){if(this.__handlers.hasOwnProperty(F)){D(this.options.selector).unbind(F+this.namespace,this.__handlers[F])
}}E.destroy.call(this)
}})
})(jQuery,RichFaces);;(function(C,B){B.ui=B.ui||{};
var A={disabled:false,selectable:true,unselectable:false,mode:"client",stylePrefix:"rf-pm-itm",itemStep:20};
var E={exec:function(G){if(G.expanded){var F=G.options.expandEvent==G.options.collapseEvent&&G.options.collapseEvent=="click";
if(F&&G.__fireEvent("beforeswitch")==false){return false
}if(!G.expanded()){if(G.options.expandEvent=="click"&&G.__fireEvent("beforeexpand")==false){return false
}}else{if(G.options.collapseEvent=="click"&&G.__fireEvent("beforecollapse")==false){return false
}}}var H=G.mode;
if(H=="server"){return this.execServer(G)
}else{if(H=="ajax"){return this.execAjax(G)
}else{if(H=="client"||H=="none"){return this.execClient(G)
}else{B.log.error("SELECT_ITEM.exec : unknown mode ("+H+")")
}}}},execServer:function(F){F.__changeState();
var G={};
G[F.__panelMenu().id]=F.itemName;
G[F.id]=F.id;
C.extend(G,F.options.ajax["parameters"]||{});
B.submitForm(this.__getParentForm(F),G);
return false
},execAjax:function(F){var G=F.__changeState();
B.ajax(F.id,null,C.extend({},F.options.ajax,{}));
F.__restoreState(G);
return true
},execClient:function(I){var H=I.__rfPanelMenu();
var G=H.getSelectedItem();
if(G){G.unselect()
}H.selectedItem(I.itemName);
I.__select();
var F=I.__fireSelect();
if(I.__switch){var J=I.mode;
if(J=="client"||J=="none"){I.__switch(!I.expanded())
}}return F
},__getParentForm:function(F){return C(C(B.getDomElement(F.id)).parents("form")[0])
}};
B.ui.PanelMenuItem=B.BaseComponent.extendClass({name:"PanelMenuItem",init:function(H,G){D.constructor.call(this,H);
var F=C(this.attachToDom());
this.options=C.extend(this.options,A,G||{});
this.mode=this.options.mode;
this.itemName=this.options.name;
var I=this.__rfPanelMenu();
I.addItem(this);
this.selectionClass=this.options.stylePrefix+"-sel";
if(!this.options.disabled){var J=this;
if(this.options.selectable){this.__header().bind("click",function(){if(J.__rfPanelMenu().selectedItem()==J.id){if(J.options.unselectable){return J.unselect()
}}else{return J.select()
}})
}}J=this;
C(this.__panelMenu()).ready(function(){J.__renderNestingLevel()
});
this.__addUserEventHandler("select");
this.__addUserEventHandler("beforeselect")
},selected:function(){return this.__header().hasClass(this.selectionClass)
},select:function(){var F=this.__fireBeforeSelect();
if(!F){return false
}return E.exec(this)
},onCompleteHandler:function(){E.execClient(this)
},unselect:function(){var F=this.__rfPanelMenu();
if(F.selectedItem()==this.itemName){F.selectedItem(null)
}else{B.log.warn("You tried to unselect item (name="+this.itemName+") that isn't seleted")
}this.__unselect();
return this.__fireUnselect()
},__rfParentItem:function(){var F=this.__item().parents(".rf-pm-gr")[0];
if(!F){F=this.__item().parents(".rf-pm-top-gr")[0]
}if(!F){F=this.__panelMenu()
}return F?B.$(F):null
},__getNestingLevel:function(){if(!this.nestingLevel){var F=this.__rfParentItem();
if(F&&F.__getNestingLevel){this.nestingLevel=F.__getNestingLevel()+1
}else{this.nestingLevel=0
}}return this.nestingLevel
},__renderNestingLevel:function(){this.__item().find("td").first().css("padding-left",this.options.itemStep*this.__getNestingLevel())
},__panelMenu:function(){return this.__item().parents(".rf-pm")[0]
},__rfPanelMenu:function(){return B.$(this.__panelMenu())
},__changeState:function(){return this.__rfPanelMenu().selectedItem(this.itemName)
},__restoreState:function(F){if(F){this.__rfPanelMenu().selectedItem(F)
}},__item:function(){return C(B.getDomElement(this.id))
},__header:function(){return this.__item()
},__isSelected:function(){return this.__header().hasClass(this.selectionClass)
},__select:function(){this.__header().addClass(this.selectionClass)
},__unselect:function(){this.__header().removeClass(this.selectionClass)
},__fireBeforeSelect:function(){return B.Event.fireById(this.id,"beforeselect",{item:this})
},__fireSelect:function(){return B.Event.fireById(this.id,"select",{item:this})
},__fireUnselect:function(){return B.Event.fireById(this.id,"unselect",{item:this})
},__fireEvent:function(F,G){return this.invokeEvent(F,B.getDomElement(this.id),G,{id:this.id,item:this})
},__addUserEventHandler:function(F){var G=this.options["on"+F];
if(G){B.Event.bindById(this.id,F,G)
}},__rfTopGroup:function(){var F=this.__item().parents(".rf-pm-top-gr")[0];
return F?F:null
},destroy:function(){var F=this.__rfPanelMenu();
if(F){F.deleteItem(this)
}D.destroy.call(this)
}});
var D=B.ui.PanelMenuItem.$super
})(jQuery,RichFaces);;(function(I,D,E){var A="Push";
var H=D.Event.RICH_NAMESPACE;
var M=D.Event.EVENT_NAMESPACE_SEPARATOR;
var B="dataAvailable"+M+H+M+A;
var G="subscribed"+M+H+M+A;
var N="error"+M+H+M+A;
var C=function(O){return B+M+O
};
var L=function(O){return G+M+O
};
var J=function(O){return N+M+O
};
D.Push=(function(){var P={};
var R={};
var U={};
var Z={};
var S=null;
var Y=null;
var Q=null;
var O=/^(<!--[^>]+-->\s*)+/;
var T=/<([^>]*)>/g;
var X=-1;
var b=function(d){var c=d;
if(d.charAt(0)=="/"){c=location.protocol+"//"+location.host+d
}return c
};
var W=function(c){var d=c.responseBody.replace(O,"");
if(d){var f;
while(f=T.exec(d)){if(!f[1]){continue
}var e=E.parseJSON("{"+f[1]+"}");
if(e.number<=X){continue
}D.Event.fire(document,C(e.topic),e.data);
X=e.number
}}jQuery.atmosphere.request.requestCount=0
};
var a=function(){var e={};
var c=function(k){var i=E.parseJSON(k);
for(var h in i.failures){D.Event.fire(document,J(h),i.failures[h])
}if(i.sessionId){Q=i.sessionId;
E.atmosphere.subscribe((Y||S)+"?__richfacesPushAsync=1&pushSessionId="+Q,W,{transport:D.Push.transport,fallbackTransport:D.Push.fallbackTransport});
for(var j in e){U[j]=true;
D.Event.fire(document,L(j))
}}};
var g=new Array();
for(var d in Z){g.push(d);
if(!U[d]){e[d]=true
}}var f={pushTopic:g};
if(Q){f.forgetPushSessionId=Q
}E.ajax({data:f,dataType:"text",success:c,traditional:true,type:"POST",url:S})
};
var V=function(){E.atmosphere.closeSuspendedConnection()
};
return{increaseSubscriptionCounters:function(c){if(isNaN(Z[c]++)){Z[c]=1;
P[c]=true
}},decreaseSubscriptionCounters:function(c){if(--Z[c]==0){delete Z[c];
R[c]=true;
U[c]=false
}},setPushResourceUrl:function(c){S=b(c)
},setPushHandlerUrl:function(c){Y=b(c)
},updateConnection:function(){if(E.isEmptyObject(Z)){V()
}else{if(!E.isEmptyObject(P)||!E.isEmptyObject(R)){V();
a()
}}P={};
R={}
}}
}());
E(document).ready(D.Push.updateConnection);
D.Push.transport="long-polling";
D.Push.fallbackTransport=undefined;
var F=function(O){if(O.type=="event"){if(O.status!="success"){return 
}}else{if(O.type!="error"){return 
}}D.Push.updateConnection()
};
I.ajax.addOnEvent(F);
I.ajax.addOnError(F);
D.ui=D.ui||{};
D.ui.Push=D.BaseComponent.extendClass({name:A,init:function(P,O){K.constructor.call(this,P);
this.attachToDom();
this.__address=O.address;
this.__handlers={};
if(O.ondataavailable){this.__bindDataHandler(O.ondataavailable)
}if(O.onsubscribed){this.__bindSubscribedHandler(O.onsubscribed)
}if(O.onerror){this.__bindErrorHandler(O.onerror)
}D.Push.increaseSubscriptionCounters(this.__address)
},__bindDataHandler:function(P){var O=C(this.__address);
this.__handlers.data=D.Event.bind(document,O,$.proxy(P,document.getElementById(this.id)),this)
},__unbindDataHandler:function(){if(this.__handlers.data){var O=C(this.__address);
D.Event.unbind(document,O,this.__handlers.data);
this.__handlers.data=null
}},__bindSubscribedHandler:function(P){var O=L(this.__address);
this.__handlers.subscribed=D.Event.bind(document,O,$.proxy(P,document.getElementById(this.id)),this)
},__unbindSubscribedHandler:function(){if(this.__handlers.subscribed){var O=L(this.__address);
D.Event.unbind(document,O,this.__handlers.subscribed);
this.__handlers.subscribed=null
}},__bindErrorHandler:function(P){var O=J(this.__address);
this.__handlers.error=D.Event.bind(document,O,$.proxy(P,document.getElementById(this.id)),this)
},__unbindErrorHandler:function(){if(this.__handlers.error){var O=J(this.__address);
D.Event.unbind(document,O,this.__handlers.error);
this.__handlers.error=null
}},destroy:function(){this.__unbindDataHandler();
this.__unbindErrorHandler();
this.__unbindSubscribedHandler();
D.Push.decreaseSubscriptionCounters(this.__address);
K.destroy.call(this)
}});
var K=D.ui.Push.$super
}(jsf,window.RichFaces,jQuery));;(function(B,A){A.ui=A.ui||{};
A.ui.Accordion=A.ui.TogglePanel.extendClass({name:"Accordion",init:function(E,D){C.constructor.call(this,E,D);
this.items=[];
this.isKeepHeight=D.isKeepHeight||false
},getHeight:function(D){if(D||!this.__height){this.__height=B(A.getDomElement(this.id)).outerHeight(true)
}return this.__height
},getInnerHeight:function(D){if(D||!this.__innerHeight){this.__innerHeight=B(A.getDomElement(this.id)).innerHeight()
}return this.__innerHeight
},destroy:function(){A.Event.unbindById(this.id,"."+this.namespace);
C.destroy.call(this)
}});
var C=A.ui.Accordion.$super
})(jQuery,RichFaces);;jQuery.effects||(function(H,E){H.effects={};
H.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","color","outlineColor"],function(M,L){H.fx.step[L]=function(N){if(!N.colorInit){N.start=K(N.elem,L);
N.end=J(N.end);
N.colorInit=true
}N.elem.style[L]="rgb("+Math.max(Math.min(parseInt((N.pos*(N.end[0]-N.start[0]))+N.start[0],10),255),0)+","+Math.max(Math.min(parseInt((N.pos*(N.end[1]-N.start[1]))+N.start[1],10),255),0)+","+Math.max(Math.min(parseInt((N.pos*(N.end[2]-N.start[2]))+N.start[2],10),255),0)+")"
}
});
function J(M){var L;
if(M&&M.constructor==Array&&M.length==3){return M
}if(L=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(M)){return[parseInt(L[1],10),parseInt(L[2],10),parseInt(L[3],10)]
}if(L=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(M)){return[parseFloat(L[1])*2.55,parseFloat(L[2])*2.55,parseFloat(L[3])*2.55]
}if(L=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(M)){return[parseInt(L[1],16),parseInt(L[2],16),parseInt(L[3],16)]
}if(L=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(M)){return[parseInt(L[1]+L[1],16),parseInt(L[2]+L[2],16),parseInt(L[3]+L[3],16)]
}if(L=/rgba\(0, 0, 0, 0\)/.exec(M)){return A.transparent
}return A[H.trim(M).toLowerCase()]
}function K(N,L){var M;
do{M=H.curCSS(N,L);
if(M!=""&&M!="transparent"||H.nodeName(N,"body")){break
}L="backgroundColor"
}while(N=N.parentNode);
return J(M)
}var A={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]};
var F=["add","remove","toggle"],C={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};
function G(){var O=document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle,P={},M,N;
if(O&&O.length&&O[0]&&O[O[0]]){var L=O.length;
while(L--){M=O[L];
if(typeof O[M]=="string"){N=M.replace(/\-(\w)/g,function(Q,R){return R.toUpperCase()
});
P[N]=O[M]
}}}else{for(M in O){if(typeof O[M]==="string"){P[M]=O[M]
}}}return P
}function B(M){var L,N;
for(L in M){N=M[L];
if(N==null||H.isFunction(N)||L in C||(/scrollbar/).test(L)||(!(/color/i).test(L)&&isNaN(parseFloat(N)))){delete M[L]
}}return M
}function I(L,N){var O={_:0},M;
for(M in N){if(L[M]!=N[M]){O[M]=N[M]
}}return O
}H.effects.animateClass=function(L,M,O,N){if(H.isFunction(O)){N=O;
O=null
}return this.each(function(){var S=H(this),P=S.attr("style")||" ",T=B(G.call(this)),R,Q=S.attr("className");
H.each(F,function(U,V){if(L[V]){S[V+"Class"](L[V])
}});
R=B(G.call(this));
S.attr("className",Q);
S.animate(I(T,R),M,O,function(){H.each(F,function(U,V){if(L[V]){S[V+"Class"](L[V])
}});
if(typeof S.attr("style")=="object"){S.attr("style").cssText="";
S.attr("style").cssText=P
}else{S.attr("style",P)
}if(N){N.apply(this,arguments)
}})
})
};
H.fn.extend({_addClass:H.fn.addClass,addClass:function(M,L,O,N){return L?H.effects.animateClass.apply(this,[{add:M},L,O,N]):this._addClass(M)
},_removeClass:H.fn.removeClass,removeClass:function(M,L,O,N){return L?H.effects.animateClass.apply(this,[{remove:M},L,O,N]):this._removeClass(M)
},_toggleClass:H.fn.toggleClass,toggleClass:function(N,M,L,P,O){if(typeof M=="boolean"||M===E){if(!L){return this._toggleClass(N,M)
}else{return H.effects.animateClass.apply(this,[(M?{add:N}:{remove:N}),L,P,O])
}}else{return H.effects.animateClass.apply(this,[{toggle:N},M,L,P])
}},switchClass:function(L,N,M,P,O){return H.effects.animateClass.apply(this,[{add:N,remove:L},M,P,O])
}});
H.extend(H.effects,{version:"1.8.5",save:function(M,N){for(var L=0;
L<N.length;
L++){if(N[L]!==null){M.data("ec.storage."+N[L],M[0].style[N[L]])
}}},restore:function(M,N){for(var L=0;
L<N.length;
L++){if(N[L]!==null){M.css(N[L],M.data("ec.storage."+N[L]))
}}},setMode:function(L,M){if(M=="toggle"){M=L.is(":hidden")?"show":"hide"
}return M
},getBaseline:function(M,N){var O,L;
switch(M[0]){case"top":O=0;
break;
case"middle":O=0.5;
break;
case"bottom":O=1;
break;
default:O=M[0]/N.height
}switch(M[1]){case"left":L=0;
break;
case"center":L=0.5;
break;
case"right":L=1;
break;
default:L=M[1]/N.width
}return{x:L,y:O}
},createWrapper:function(L){if(L.parent().is(".ui-effects-wrapper")){return L.parent()
}var M={width:L.outerWidth(true),height:L.outerHeight(true),"float":L.css("float")},N=H("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0});
L.wrap(N);
N=L.parent();
if(L.css("position")=="static"){N.css({position:"relative"});
L.css({position:"relative"})
}else{H.extend(M,{position:L.css("position"),zIndex:L.css("z-index")});
H.each(["top","left","bottom","right"],function(O,P){M[P]=L.css(P);
if(isNaN(parseInt(M[P],10))){M[P]="auto"
}});
L.css({position:"relative",top:0,left:0})
}return N.css(M).show()
},removeWrapper:function(L){if(L.parent().is(".ui-effects-wrapper")){return L.parent().replaceWith(L)
}return L
},setTransition:function(M,O,L,N){N=N||{};
H.each(O,function(Q,P){unit=M.cssUnit(P);
if(unit[0]>0){N[P]=unit[0]*L+unit[1]
}});
return N
}});
function D(M,L,N,O){if(typeof M=="object"){O=L;
N=null;
L=M;
M=L.effect
}if(H.isFunction(L)){O=L;
N=null;
L={}
}if(typeof L=="number"||H.fx.speeds[L]){O=N;
N=L;
L={}
}if(H.isFunction(N)){O=N;
N=null
}L=L||{};
N=N||L.duration;
N=H.fx.off?0:typeof N=="number"?N:H.fx.speeds[N]||H.fx.speeds._default;
O=O||L.complete;
return[M,L,N,O]
}H.fn.extend({effect:function(O,N,Q,R){var M=D.apply(this,arguments),P={options:M[1],duration:M[2],callback:M[3]},L=H.effects[O];
return L&&!H.fx.off?L.call(this,P):this
},_show:H.fn.show,show:function(M){if(!M||typeof M=="number"||H.fx.speeds[M]||!H.effects[M]){return this._show.apply(this,arguments)
}else{var L=D.apply(this,arguments);
L[1].mode="show";
return this.effect.apply(this,L)
}},_hide:H.fn.hide,hide:function(M){if(!M||typeof M=="number"||H.fx.speeds[M]||!H.effects[M]){return this._hide.apply(this,arguments)
}else{var L=D.apply(this,arguments);
L[1].mode="hide";
return this.effect.apply(this,L)
}},__toggle:H.fn.toggle,toggle:function(M){if(!M||typeof M=="number"||H.fx.speeds[M]||!H.effects[M]||typeof M=="boolean"||H.isFunction(M)){return this.__toggle.apply(this,arguments)
}else{var L=D.apply(this,arguments);
L[1].mode="toggle";
return this.effect.apply(this,L)
}},cssUnit:function(L){var M=this.css(L),N=[];
H.each(["em","px","%","pt"],function(O,P){if(M.indexOf(P)>0){N=[parseFloat(M),P]
}});
return N
}});
H.easing.jswing=H.easing.swing;
H.extend(H.easing,{def:"easeOutQuad",swing:function(M,N,L,P,O){return H.easing[H.easing.def](M,N,L,P,O)
},easeInQuad:function(M,N,L,P,O){return P*(N/=O)*N+L
},easeOutQuad:function(M,N,L,P,O){return -P*(N/=O)*(N-2)+L
},easeInOutQuad:function(M,N,L,P,O){if((N/=O/2)<1){return P/2*N*N+L
}return -P/2*((--N)*(N-2)-1)+L
},easeInCubic:function(M,N,L,P,O){return P*(N/=O)*N*N+L
},easeOutCubic:function(M,N,L,P,O){return P*((N=N/O-1)*N*N+1)+L
},easeInOutCubic:function(M,N,L,P,O){if((N/=O/2)<1){return P/2*N*N*N+L
}return P/2*((N-=2)*N*N+2)+L
},easeInQuart:function(M,N,L,P,O){return P*(N/=O)*N*N*N+L
},easeOutQuart:function(M,N,L,P,O){return -P*((N=N/O-1)*N*N*N-1)+L
},easeInOutQuart:function(M,N,L,P,O){if((N/=O/2)<1){return P/2*N*N*N*N+L
}return -P/2*((N-=2)*N*N*N-2)+L
},easeInQuint:function(M,N,L,P,O){return P*(N/=O)*N*N*N*N+L
},easeOutQuint:function(M,N,L,P,O){return P*((N=N/O-1)*N*N*N*N+1)+L
},easeInOutQuint:function(M,N,L,P,O){if((N/=O/2)<1){return P/2*N*N*N*N*N+L
}return P/2*((N-=2)*N*N*N*N+2)+L
},easeInSine:function(M,N,L,P,O){return -P*Math.cos(N/O*(Math.PI/2))+P+L
},easeOutSine:function(M,N,L,P,O){return P*Math.sin(N/O*(Math.PI/2))+L
},easeInOutSine:function(M,N,L,P,O){return -P/2*(Math.cos(Math.PI*N/O)-1)+L
},easeInExpo:function(M,N,L,P,O){return(N==0)?L:P*Math.pow(2,10*(N/O-1))+L
},easeOutExpo:function(M,N,L,P,O){return(N==O)?L+P:P*(-Math.pow(2,-10*N/O)+1)+L
},easeInOutExpo:function(M,N,L,P,O){if(N==0){return L
}if(N==O){return L+P
}if((N/=O/2)<1){return P/2*Math.pow(2,10*(N-1))+L
}return P/2*(-Math.pow(2,-10*--N)+2)+L
},easeInCirc:function(M,N,L,P,O){return -P*(Math.sqrt(1-(N/=O)*N)-1)+L
},easeOutCirc:function(M,N,L,P,O){return P*Math.sqrt(1-(N=N/O-1)*N)+L
},easeInOutCirc:function(M,N,L,P,O){if((N/=O/2)<1){return -P/2*(Math.sqrt(1-N*N)-1)+L
}return P/2*(Math.sqrt(1-(N-=2)*N)+1)+L
},easeInElastic:function(M,O,L,S,R){var P=1.70158;
var Q=0;
var N=S;
if(O==0){return L
}if((O/=R)==1){return L+S
}if(!Q){Q=R*0.3
}if(N<Math.abs(S)){N=S;
var P=Q/4
}else{var P=Q/(2*Math.PI)*Math.asin(S/N)
}return -(N*Math.pow(2,10*(O-=1))*Math.sin((O*R-P)*(2*Math.PI)/Q))+L
},easeOutElastic:function(M,O,L,S,R){var P=1.70158;
var Q=0;
var N=S;
if(O==0){return L
}if((O/=R)==1){return L+S
}if(!Q){Q=R*0.3
}if(N<Math.abs(S)){N=S;
var P=Q/4
}else{var P=Q/(2*Math.PI)*Math.asin(S/N)
}return N*Math.pow(2,-10*O)*Math.sin((O*R-P)*(2*Math.PI)/Q)+S+L
},easeInOutElastic:function(M,O,L,S,R){var P=1.70158;
var Q=0;
var N=S;
if(O==0){return L
}if((O/=R/2)==2){return L+S
}if(!Q){Q=R*(0.3*1.5)
}if(N<Math.abs(S)){N=S;
var P=Q/4
}else{var P=Q/(2*Math.PI)*Math.asin(S/N)
}if(O<1){return -0.5*(N*Math.pow(2,10*(O-=1))*Math.sin((O*R-P)*(2*Math.PI)/Q))+L
}return N*Math.pow(2,-10*(O-=1))*Math.sin((O*R-P)*(2*Math.PI)/Q)*0.5+S+L
},easeInBack:function(M,N,L,Q,P,O){if(O==E){O=1.70158
}return Q*(N/=P)*N*((O+1)*N-O)+L
},easeOutBack:function(M,N,L,Q,P,O){if(O==E){O=1.70158
}return Q*((N=N/P-1)*N*((O+1)*N+O)+1)+L
},easeInOutBack:function(M,N,L,Q,P,O){if(O==E){O=1.70158
}if((N/=P/2)<1){return Q/2*(N*N*(((O*=(1.525))+1)*N-O))+L
}return Q/2*((N-=2)*N*(((O*=(1.525))+1)*N+O)+2)+L
},easeInBounce:function(M,N,L,P,O){return P-H.easing.easeOutBounce(M,O-N,0,P,O)+L
},easeOutBounce:function(M,N,L,P,O){if((N/=O)<(1/2.75)){return P*(7.5625*N*N)+L
}else{if(N<(2/2.75)){return P*(7.5625*(N-=(1.5/2.75))*N+0.75)+L
}else{if(N<(2.5/2.75)){return P*(7.5625*(N-=(2.25/2.75))*N+0.9375)+L
}else{return P*(7.5625*(N-=(2.625/2.75))*N+0.984375)+L
}}}},easeInOutBounce:function(M,N,L,P,O){if(N<O/2){return H.easing.easeInBounce(M,N*2,0,P,O)*0.5+L
}return H.easing.easeOutBounce(M,N*2-O,0,P,O)*0.5+P*0.5+L
}})
})(jQuery);;(function(A){A.Selection=A.Selection||{};
A.Selection.set=function(D,E,B){if(D.setSelectionRange){D.focus();
D.setSelectionRange(E,B)
}else{if(D.createTextRange){var C=D.createTextRange();
C.collapse(true);
C.moveEnd("character",B);
C.moveStart("character",E);
C.select()
}}};
A.Selection.getStart=function(C){if(C.setSelectionRange){return C.selectionStart
}else{if(document.selection&&document.selection.createRange){var B=document.selection.createRange().duplicate();
B.moveEnd("character",C.value.length);
if(B.text==""){return C.value.length
}return C.value.lastIndexOf(B.text)
}}};
A.Selection.getEnd=function(C){if(C.setSelectionRange){return C.selectionEnd
}else{if(document.selection&&document.selection.createRange){var B=document.selection.createRange().duplicate();
B.moveStart("character",-C.value.length);
return B.text.length
}}};
A.Selection.setCaretTo=function(B,C){if(!C){C=B.value.length
}A.Selection.set(B,C,C)
}
})(window.RichFaces||(window.RichFaces={}));;(function(B,A){A.ui=A.ui||{};
A.ui.AccordionItem=A.ui.TogglePanelItem.extendClass({name:"AccordionItem",init:function(E,D){C.constructor.call(this,E,D);
if(!this.disabled){A.Event.bindById(this.id+":header","click",this.__onHeaderClick,this)
}if(this.isSelected()){var F=this;
B(document).ready(function(){F.__fitToHeight(F.getTogglePanel())
})
}},__onHeaderClick:function(D){this.getTogglePanel().switchToItem(this.getName())
},__header:function(){return B(A.getDomElement(this.id+":header"))
},__content:function(){if(!this.__content_){this.__content_=B(A.getDomElement(this.id+":content"))
}return this.__content_
},__enter:function(){var D=this.getTogglePanel();
if(D.isKeepHeight){this.__content().hide();
this.__fitToHeight(D)
}this.__content().show();
this.__header().addClass("rf-ac-itm-hdr-act").removeClass("rf-ac-itm-hdr-inact");
return this.__fireEnter()
},__fitToHeight:function(D){var G=D.getInnerHeight();
var E=D.getItems();
for(var F in E){G-=E[F].__header().outerHeight()
}this.__content().height(G-20)
},getHeight:function(D){if(D||!this.__height){this.__height=B(A.getDomElement(this.id)).outerHeight(true)
}return this.__height
},__leave:function(){var D=this.__fireLeave();
if(!D){return false
}this.__content().hide();
this.__header().removeClass("rf-ac-itm-hdr-act").addClass("rf-ac-itm-hdr-inact");
return true
}});
var C=A.ui.AccordionItem.$super
})(jQuery,RichFaces);;(function(C,B){B.ui=B.ui||{};
var E={rejectClass:"rf-ind-rejt",acceptClass:"rf-ind-acpt",draggingClass:"rf-ind-drag"};
var A={};
B.ui.Droppable=function(G,F){this.options={};
C.extend(this.options,A,F||{});
D.constructor.call(this,G);
this.namespace=this.namespace||"."+B.Event.createNamespace(this.name,this.id);
this.id=G;
this.parentId=this.options.parentId;
this.attachToDom(this.parentId);
this.dropElement=C(document.getElementById(this.parentId));
this.dropElement.droppable({addClasses:false});
this.dropElement.data("init",true);
B.Event.bind(this.dropElement,"drop"+this.namespace,this.drop,this);
B.Event.bind(this.dropElement,"dropover"+this.namespace,this.dropover,this);
B.Event.bind(this.dropElement,"dropout"+this.namespace,this.dropout,this)
};
B.BaseNonVisualComponent.extend(B.ui.Droppable);
var D=B.ui.Droppable.$super;
C.extend(B.ui.Droppable.prototype,(function(){return{drop:function(H){var F=H.rf.data;
if(this.accept(F.draggable)){this.__callAjax(H,F)
}var G=B.$(F.helper.attr("id"));
if(G){F.helper.removeClass(G.getAcceptClass());
F.helper.removeClass(G.getRejectClass())
}else{F.helper.removeClass(E.acceptClass);
F.helper.removeClass(E.rejectClass)
}},dropover:function(I){var G=I.rf.data;
var F=G.draggable;
var H=B.$(G.helper.attr("id"));
if(H){if(this.accept(F)){G.helper.removeClass(H.getRejectClass());
G.helper.addClass(H.getAcceptClass())
}else{G.helper.removeClass(H.getAcceptClass());
G.helper.addClass(H.getRejectClass())
}}else{if(this.accept(F)){G.helper.removeClass(E.rejectClass);
G.helper.addClass(E.acceptClass)
}else{G.helper.removeClass(E.acceptClass);
G.helper.addClass(E.rejectClass)
}}},dropout:function(I){var G=I.rf.data;
var F=G.draggable;
var H=B.$(G.helper.attr("id"));
if(H){G.helper.removeClass(H.getAcceptClass());
G.helper.removeClass(H.getRejectClass())
}else{G.helper.removeClass(E.acceptClass);
G.helper.removeClass(E.rejectClass)
}},accept:function(F){var H=false;
var G=F.data("type");
if(G&&this.options.acceptedTypes){C.each(this.options.acceptedTypes,function(){if(this=="@none"){return false
}if(this==G||this=="@all"){H=true;
return false
}})
}return H
},__callAjax:function(H,G){if(G.draggable){var F=G.draggable.data("id");
var I=this.options.ajaxFunction;
if(I&&typeof I=="function"){I.call(this,H,F)
}}},destroy:function(){this.detach(this.parentId);
B.Event.unbind(this.dropElement,this.namespace);
D.destroy.call(this)
}}
})())
})(jQuery,window.RichFaces);;(function(B,A){A.ui=A.ui||{};
A.ui.PopupPanel.Sizer=function(G,E,F,D){C.constructor.call(this,G)
};
var C=A.BaseComponent.extend(A.ui.PopupPanel.Sizer);
var C=A.ui.PopupPanel.Sizer.$super;
B.extend(A.ui.PopupPanel.Sizer.prototype,(function(D){return{name:"richfaces.ui.PopupPanel.Sizer",doSetupSize:function(J,F){var H=0;
var E=0;
var G=B(A.getDomElement(F));
var I=J.reductionData;
if(I){if(I.w){H=I.w/2
}if(I.h){E=I.h/2
}}if(H>0){if(F.clientWidth>H){if(!F.reducedWidth){F.reducedWidth=G.css("width")
}G.css("width",H+"px")
}else{if(H<4&&F.reducedWidth==4+"px"){G.css("width",H+"px")
}}}else{if(F.reducedWidth){G.css("width",F.reducedWidth);
F.reducedWidth=undefined
}}if(E>0){if(F.clientHeight>E){if(!F.reducedHeight){F.reducedHeight=G.css("height")
}F.style.height=E+"px"
}else{if(E<4&&F.reducedHeight==4+"px"){G.css("height",E+"px")
}}}else{if(F.reducedHeight){G.css("height",F.reducedHeight);
F.reducedHeight=undefined
}}},doSetupPosition:function(I,E,H,G){var F=B(A.getDomElement(E));
if(!isNaN(H)&&!isNaN(G)){F.css("left",H+"px");
F.css("top",G+"px")
}},doPosition:function(F,E){},doDiff:function(F,E){}}
})());
A.ui.PopupPanel.Sizer.Diff=function(F,D,E,G){this.deltaX=F;
this.deltaY=D;
this.deltaWidth=E;
this.deltaHeight=G
};
A.ui.PopupPanel.Sizer.Diff.EMPTY=function(){return new A.ui.PopupPanel.Sizer.Diff(0,0,0,0)
},A.ui.PopupPanel.Sizer.N=function(){};
B.extend(A.ui.PopupPanel.Sizer.N.prototype,A.ui.PopupPanel.Sizer.prototype);
B.extend(A.ui.PopupPanel.Sizer.N.prototype,{name:"richfaces.ui.PopupPanel.Sizer.N",doPosition:function(F,D){var E=B(A.getDomElement(D));
E.css("width",F.width()+"px");
this.doSetupPosition(F,D,0,0)
},doDiff:function(E,D){return new A.ui.PopupPanel.Sizer.Diff(0,D,0,-D)
}});
A.ui.PopupPanel.Sizer.NW=function(){};
B.extend(A.ui.PopupPanel.Sizer.NW.prototype,A.ui.PopupPanel.Sizer.prototype);
B.extend(A.ui.PopupPanel.Sizer.NW.prototype,{name:"richfaces.ui.PopupPanel.Sizer.NW",doPosition:function(E,D){this.doSetupSize(E,D);
this.doSetupPosition(E,D,0,0)
},doDiff:function(E,D){return new A.ui.PopupPanel.Sizer.Diff(E,D,-E,-D)
}});
A.ui.PopupPanel.Sizer.NE=function(){};
B.extend(A.ui.PopupPanel.Sizer.NE.prototype,A.ui.PopupPanel.Sizer.prototype);
B.extend(A.ui.PopupPanel.Sizer.NE.prototype,{name:"richfaces.ui.PopupPanel.Sizer.NE",doPosition:function(E,D){this.doSetupSize(E,D);
this.doSetupPosition(E,D,E.width()-D.clientWidth,0)
},doDiff:function(E,D){return new A.ui.PopupPanel.Sizer.Diff(0,D,E,-D)
}});
A.ui.PopupPanel.Sizer.E=function(){};
B.extend(A.ui.PopupPanel.Sizer.E.prototype,A.ui.PopupPanel.Sizer.prototype);
B.extend(A.ui.PopupPanel.Sizer.E.prototype,{name:"richfaces.ui.PopupPanel.Sizer.E",doPosition:function(F,D){var E=B(A.getDomElement(D));
E.css("height",F.height()+"px");
this.doSetupPosition(F,D,F.width()-D.clientWidth,0)
},doDiff:function(E,D){return new A.ui.PopupPanel.Sizer.Diff(0,0,E,0)
}});
A.ui.PopupPanel.Sizer.SE=function(){};
B.extend(A.ui.PopupPanel.Sizer.SE.prototype,A.ui.PopupPanel.Sizer.prototype);
B.extend(A.ui.PopupPanel.Sizer.SE.prototype,{name:"richfaces.ui.PopupPanel.Sizer.SE",doPosition:function(E,D){this.doSetupSize(E,D);
this.doSetupPosition(E,D,E.width()-D.clientWidth,E.height()-D.clientHeight)
},doDiff:function(E,D){return new A.ui.PopupPanel.Sizer.Diff(0,0,E,D)
}});
A.ui.PopupPanel.Sizer.S=function(){};
B.extend(A.ui.PopupPanel.Sizer.S.prototype,A.ui.PopupPanel.Sizer.prototype);
B.extend(A.ui.PopupPanel.Sizer.S.prototype,{name:"richfaces.ui.PopupPanel.Sizer.S",doPosition:function(F,D){var E=B(A.getDomElement(D));
E.css("width",F.width()+"px");
this.doSetupPosition(F,D,0,F.height()-D.clientHeight)
},doDiff:function(E,D){return new A.ui.PopupPanel.Sizer.Diff(0,0,0,D)
}});
A.ui.PopupPanel.Sizer.SW=function(){};
B.extend(A.ui.PopupPanel.Sizer.SW.prototype,A.ui.PopupPanel.Sizer.prototype);
B.extend(A.ui.PopupPanel.Sizer.SW.prototype,{name:"richfaces.ui.PopupPanel.Sizer.SW",doPosition:function(E,D){this.doSetupSize(E,D);
this.doSetupPosition(E,D,0,E.height()-D.clientHeight)
},doDiff:function(E,D){return new A.ui.PopupPanel.Sizer.Diff(E,0,-E,D)
}});
A.ui.PopupPanel.Sizer.W=function(){};
B.extend(A.ui.PopupPanel.Sizer.W.prototype,A.ui.PopupPanel.Sizer.prototype);
B.extend(A.ui.PopupPanel.Sizer.W.prototype,{name:"richfaces.ui.PopupPanel.Sizer.W",doPosition:function(F,D){var E=B(A.getDomElement(D));
E.css("height",F.height()+"px");
this.doSetupPosition(F,D,0,0)
},doDiff:function(E,D){return new A.ui.PopupPanel.Sizer.Diff(E,0,-E,0)
}});
A.ui.PopupPanel.Sizer.Header=function(){};
B.extend(A.ui.PopupPanel.Sizer.Header.prototype,A.ui.PopupPanel.Sizer.prototype);
B.extend(A.ui.PopupPanel.Sizer.Header.prototype,{name:"richfaces.ui.PopupPanel.Sizer.Header",doPosition:function(E,D){},doDiff:function(E,D){return new A.ui.PopupPanel.Sizer.Diff(E,D,0,0)
}})
})(jQuery,window.RichFaces);;(function(F,I){I.ui=I.ui||{};
var E={styleClass:"",nonblocking:false,nonblockingOpacity:0.2,showHistory:false,animationSpeed:"slow",opacity:"1",showShadow:false,showCloseButton:true,appearAnimation:"fade",hideAnimation:"fade",sticky:false,stayTime:8000,delay:0};
var H="org.richfaces.notifyStack.default";
var J="click dblclick  keydown keypress keyup mousedown mousemove mouseout mouseover mouseup";
var K={summary:"pnotify_title",detail:"pnotify_text",styleClass:"pnotify_addclass",nonblocking:"pnotify_nonblock",nonblockingOpacity:"pnotify_nonblock_opacity",showHistory:"pnotify_history",animation:"pnotify_animation",appearAnimation:"effect_in",hideAnimation:"effect_out",animationSpeed:"pnotify_animate_speed",opacity:"pnotify_opacity",showShadow:"pnotify_shadow",showCloseButton:"pnotify_closer",sticky:"pnotify_hide",stayTime:"pnotify_delay"};
var B=["rf-ntf-inf","rf-ntf-wrn","rf-ntf-err","rf-ntf-ftl"];
var G=function(O,N,P){for(var L in N){var M=P[L]!=null?P[L]:L;
O[M]=N[L];
if(O[M] instanceof Object){O[M]=F.extend({},O[M],P)
}}return O
};
var D=function(){if(!document.getElementById(H)){var L=F('<span id="'+H+'" class="rf-ntf-stck" />');
F("body").append(L);
new RichFaces.ui.NotifyStack(H)
}return C(H)
};
var C=function(L){if(!L){return D()
}return I.$(L).getStack()
};
var A=function(O,N,M){var L=O.slice((M||N)+1||O.length);
O.length=N<0?O.length+N:N;
return O.push.apply(O,L)
};
I.ui.Notify=function(M){var M=F.extend({},E,M);
if(typeof M.severity=="number"){var L=B[M.severity];
M.styleClass=M.styleClass?L+" "+M.styleClass:L
}var N=G({},M,K);
var O=function(){var P=C(M.stackId);
N.pnotify_stack=P;
N.pnotify_addclass+=" rf-ntf-pos-"+P.position;
N.pnotify_after_close=function(R){var S=F.inArray(R,P.notifications);
if(S>=0){A(P.notifications,S)
}};
var Q=F.pnotify(N);
Q.on(J,function(R){if(M["on"+R.type]){M["on"+R.type].call(this,R)
}});
P.addNotification(Q)
};
if(M.sticky!==null){N.pnotify_hide=!M.sticky
}F(document).ready(function(){if(M.delay){setTimeout(function(){O()
},M.delay)
}else{O()
}})
}
})(jQuery,RichFaces);;(function(E,D){D.ui=D.ui||{};
var B={toolbar:"Basic",skin:"richfaces",readonly:false,style:"",styleClass:"",editorStyle:"",editorClass:"",width:"100%",height:"200px"};
var A={customConfig:""};
var C=["key","paste","undo","redo"];
D.ui.Editor=function(I,H,G){F.constructor.call(this,I);
this.options=E.extend({},B,H);
this.componentId=I;
this.textareaId=I+":inp";
this.editorElementId="cke_"+this.textareaId;
this.valueChanged=false;
this.dirtyState=false;
this.config=E.extend({},A,G);
this.attachToDom(this.componentId);
E(document).ready(E.proxy(this.__initializationHandler,this));
D.Event.bindById(this.__getTextarea(),"init",this.options.oninit,this);
D.Event.bindById(this.__getTextarea(),"dirty",this.options.ondirty,this)
};
D.BaseComponent.extend(D.ui.Editor);
var F=D.ui.Editor.$super;
E.extend(D.ui.Editor.prototype,{name:"Editor",__initializationHandler:function(){this.ckeditor=CKEDITOR.replace(this.textareaId,this.__getConfiguration());
if(this.__getForm()){this.__updateTextareaHandlerWrapper=D.Event.bind(this.__getForm(),"ajaxsubmit",E.proxy(this.__updateTextareaHandler,this))
}this.ckeditor.on("instanceReady",E.proxy(this.__instanceReadyHandler,this));
this.ckeditor.on("blur",E.proxy(this.__blurHandler,this));
this.ckeditor.on("focus",E.proxy(this.__focusHandler,this));
for(var G in C){this.ckeditor.on(C[G],E.proxy(this.__checkDirtyHandlerWithDelay,this))
}this.dirtyCheckingInterval=window.setInterval(E.proxy(this.__checkDirtyHandler,this),100)
},__checkDirtyHandlerWithDelay:function(){window.setTimeout(E.proxy(this.__checkDirtyHandler,this),0)
},__checkDirtyHandler:function(){if(this.ckeditor.checkDirty()){this.dirtyState=true;
this.valueChanged=true;
this.ckeditor.resetDirty();
this.__dirtyHandler()
}},__dirtyHandler:function(){this.invokeEvent.call(this,"dirty",document.getElementById(this.textareaId))
},__updateTextareaHandler:function(){this.ckeditor.updateElement()
},__instanceReadyHandler:function(G){this.__setupStyling();
this.__setupPassThroughAttributes();
this.invokeEvent.call(this,"init",document.getElementById(this.textareaId),G)
},__blurHandler:function(G){this.invokeEvent.call(this,"blur",document.getElementById(this.textareaId),G);
if(this.isDirty()){this.valueChanged=true;
this.__changeHandler()
}this.dirtyState=false
},__focusHandler:function(G){this.invokeEvent.call(this,"focus",document.getElementById(this.textareaId),G)
},__changeHandler:function(G){this.invokeEvent.call(this,"change",document.getElementById(this.textareaId),G)
},__getTextarea:function(){return E(document.getElementById(this.textareaId))
},__getForm:function(){return E("form").has(this.__getTextarea()).get(0)
},__getConfiguration:function(){var G=this.__getTextarea();
return E.extend({skin:this.options.skin,toolbar:this.__getToolbar(),readOnly:G.attr("readonly")||this.options.readonly,width:this.__resolveUnits(this.options.width),height:this.__resolveUnits(this.options.height),bodyClass:"rf-ed-b",defaultLanguage:this.options.lang,contentsLanguage:this.options.lang},this.config)
},__setupStyling:function(){var I=E(document.getElementById(this.editorElementId));
if(!I.hasClass("rf-ed")){I.addClass("rf-ed")
}var G=E.trim(this.options.styleClass+" "+this.options.editorClass);
if(this.initialStyle==undefined){this.initialStyle=I.attr("style")
}var H=this.__concatStyles(this.initialStyle,this.options.style,this.options.editorStyle);
if(this.oldStyleClass!==G){if(this.oldStyleClass){I.removeClass(this.oldStyleClass)
}I.addClass(G);
this.oldStyleClass=G
}if(this.oldStyle!==H){I.attr("style",H);
this.oldStyle=H
}},__setupPassThroughAttributes:function(){var G=this.__getTextarea();
var H=E(document.getElementById(this.editorElementId));
H.attr("title",G.attr("title"))
},__concatStyles:function(){var G="";
for(var H=0;
H<arguments.length;
H++){var I=E.trim(arguments[H]);
if(I){G=G+I+"; "
}}return G
},__getToolbar:function(){var H=this.options.toolbar;
var G=H.toLowerCase();
if(G==="basic"){return"Basic"
}if(G==="full"){return"Full"
}return H
},__setOptions:function(G){this.options=E.extend({},B,G)
},__resolveUnits:function(G){var G=E.trim(G);
if(G.match(/^[0-9]+$/)){return G+"px"
}else{return G
}},getEditor:function(){return this.ckeditor
},setValue:function(G){this.ckeditor.setData(G,E.proxy(function(){this.valueChanged=false;
this.dirtyState=false;
this.ckeditor.resetDirty()
},this))
},getValue:function(){return this.ckeditor.getData()
},getInput:function(){return document.getElementById(this.textareaId)
},focus:function(){this.ckeditor.focus()
},blur:function(){this.ckeditor.focusManager.forceBlur()
},isFocused:function(){return this.ckeditor.focusManager.hasFocus
},isDirty:function(){return this.dirtyState||this.ckeditor.checkDirty()
},isValueChanged:function(){return this.valueChanged||this.isDirty()
},setReadOnly:function(G){this.ckeditor.setReadOnly(G!==false)
},isReadOnly:function(){return this.ckeditor.readOnly
},destroy:function(){window.clearInterval(this.dirtyCheckingInterval);
if(this.__getForm()){D.Event.unbind(this.__getForm(),"ajaxsubmit",this.__updateTextareaHandlerWrapper)
}if(this.ckeditor){this.ckeditor.destroy();
this.ckeditor=null
}this.__getTextarea().show();
F.destroy.call(this)
}})
})(jQuery,RichFaces);;(function(B,A){A.ui=A.ui||{};
A.ui.Tab=A.ui.TogglePanelItem.extendClass({name:"Tab",init:function(E,D){C.constructor.call(this,E,D);
this.index=D.index;
this.getTogglePanel().getItems()[this.index]=this;
A.Event.bindById(this.id+":header:active","click",this.__onHeaderClick,this);
A.Event.bindById(this.id+":header:inactive","click",this.__onHeaderClick,this)
},__onHeaderClick:function(D){this.getTogglePanel().switchToItem(this.getName())
},__header:function(E){var D=B(A.getDomElement(this.id+":header"));
if(E){return B(A.getDomElement(this.id+":header:"+E))
}return D
},__content:function(){if(!this.__content_){this.__content_=B(A.getDomElement(this.id))
}return this.__content_
},__enter:function(){this.__content().show();
this.__header("inactive").hide();
this.__header("active").show();
return this.__fireEnter()
},__fireLeave:function(){return A.Event.fireById(this.id+":content","leave")
},__fireEnter:function(){return A.Event.fireById(this.id+":content","enter")
},__addUserEventHandler:function(E){var F=this.options["on"+E];
if(F){var D=A.Event.bindById(this.id+":content",E,F)
}},getHeight:function(D){if(D||!this.__height){this.__height=B(A.getDomElement(this.id)).outerHeight(true)
}return this.__height
},__leave:function(){var D=this.__fireLeave();
if(!D){return false
}this.__content().hide();
this.__header("active").hide();
this.__header("inactive").show();
return true
},destroy:function(){var D=this.getTogglePanel();
if(D&&D.getItems&&D.getItems()[this.index]){delete D.getItems()[this.index]
}A.Event.unbindById(this.id);
A.Event.unbindById(this.id+":header:active");
A.Event.unbindById(this.id+":header:inactive");
C.destroy.call(this)
}});
var C=A.ui.Tab.$super
})(jQuery,RichFaces);;(function(B,A){A.ui=A.ui||{};
A.ui.CollapsiblePanel=A.ui.TogglePanel.extendClass({name:"CollapsiblePanel",init:function(E,D){A.ui.TogglePanel.call(this,E,D);
this.switchMode=D.switchMode;
this.__addUserEventHandler("beforeswitch");
this.__addUserEventHandler("switch");
this.options.cycledSwitching=true;
var C=this;
B(document.getElementById(this.id)).ready(function(){A.Event.bindById(C.id+":header","click",C.__onHeaderClick,C);
new RichFaces.ui.CollapsiblePanelItem(C.id+":content",{index:0,togglePanelId:C.id,switchMode:C.switchMode,name:"true"}),new RichFaces.ui.CollapsiblePanelItem(C.id+":empty",{index:1,togglePanelId:C.id,switchMode:C.switchMode,name:"false"})
})
},switchPanel:function(C){this.switchToItem(C||"@next")
},__onHeaderClick:function(){this.switchToItem("@next")
},__fireItemChange:function(D,C){return new A.Event.fireById(this.id,"switch",{id:this.id,isExpanded:C.getName()})
},__fireBeforeItemChange:function(D,C){return A.Event.fireById(this.id,"beforeswitch",{id:this.id,isExpanded:C.getName()})
}})
})(jQuery,RichFaces);;(function(C,B){B.ui=B.ui||{};
var E={rejectClass:"rf-ind-rejt",acceptClass:"rf-ind-acpt",draggingClass:"rf-ind-drag"};
B.ui.Draggable=function(H,F){this.options={};
C.extend(this.options,A,F||{});
D.constructor.call(this,H);
this.id=H;
this.namespace=this.namespace||"."+B.Event.createNamespace(this.name,this.id);
this.parentId=this.options.parentId;
this.attachToDom(this.parentId);
this.dragElement=C(document.getElementById(this.options.parentId));
this.dragElement.draggable();
if(F.indicator){var G=document.getElementById(F.indicator);
this.dragElement.data("indicator",true);
this.dragElement.draggable("option","helper",function(){return G
})
}else{this.dragElement.data("indicator",false);
this.dragElement.draggable("option","helper","clone")
}this.dragElement.draggable("option","addClasses",false);
this.dragElement.draggable("option","appendTo","body");
this.dragElement.data("type",this.options.type);
this.dragElement.data("init",true);
this.dragElement.data("id",this.id);
B.Event.bind(this.dragElement,"dragstart"+this.namespace,this.dragStart,this);
B.Event.bind(this.dragElement,"drag"+this.namespace,this.drag,this);
B.Event.bind(this.dragElement,"dragstop"+this.namespace,this.dragStop,this)
};
B.BaseNonVisualComponent.extend(B.ui.Draggable);
var D=B.ui.Draggable.$super;
var A={};
C.extend(B.ui.Draggable.prototype,(function(){return{name:"Draggable",dragStart:function(J){var G=J.rf.data;
var F=G.helper[0];
this.parentElement=F.parentNode;
if(this.__isCustomDragIndicator()){G.helper.detach().appendTo("body").show();
var I=(G.helper.width()/2);
var H=(G.helper.height()/2);
this.dragElement.data("draggable").offset.click.left=I;
this.dragElement.data("draggable").offset.click.top=H
}},drag:function(H){var G=H.rf.data;
if(this.__isCustomDragIndicator()){var F=B.$(this.options.indicator);
if(F){G.helper.addClass(F.getDraggingClass())
}else{G.helper.addClass(E.draggingClass)
}}this.__clearDraggableCss(G.helper)
},dragStop:function(G){var F=G.rf.data;
F.helper.hide().detach().appendTo(this.parentElement);
if(F.helper[0]!=this.dragElement[0]){F.helper[0]=this.dragElement[0]
}},__isCustomDragIndicator:function(){return this.dragElement.data("indicator")
},__clearDraggableCss:function(F){if(F&&F.removeClass){F.removeClass("ui-draggable-dragging")
}},destroy:function(){this.detach(this.parentId);
B.Event.unbind(this.dragElement,this.namespace);
D.destroy.call(this)
}}
})())
})(jQuery,window.RichFaces);;(function(C,B){B.ui=B.ui||{};
var A={expanded:false,stylePrefix:"rf-pm-gr",expandEvent:"click",collapseEvent:"click",selectable:false,unselectable:false};
var E={exec:function(G,F){var H=G.mode;
if(H=="server"){return this.execServer(G)
}else{if(H=="ajax"){return this.execAjax(G)
}else{if(H=="client"||H=="none"){return this.execClient(G,F)
}else{B.log.error("EXPAND_ITEM.exec : unknown mode ("+H+")")
}}}},execServer:function(F){F.__changeState();
B.submitForm(this.__getParentForm(F),F.options.ajax["parameters"]||{});
return false
},execAjax:function(G){var F=G.__changeState();
B.ajax(G.id,null,C.extend({},G.options.ajax,{}));
G.__restoreState(F);
return true
},execClient:function(G,F){if(F){G.__expand()
}else{G.__collapse()
}return G.__fireEvent("switch")
},__getParentForm:function(F){return C(C(B.getDomElement(F.id)).parents("form")[0])
}};
B.ui.PanelMenuGroup=B.ui.PanelMenuItem.extendClass({name:"PanelMenuGroup",init:function(G,F){D.constructor.call(this,G,C.extend({},A,F||{}));
this.options.bubbleSelection=this.__rfPanelMenu().options.bubbleSelection;
this.options.expandSingle=this.__rfPanelMenu().options.expandSingle;
if(!this.options.disabled){var H=this;
if(!this.options.selectable){if(this.options.expandEvent==this.options.collapseEvent){this.__header().bind(this.options.expandEvent,function(){H.switchExpantion()
})
}else{this.__header().bind(this.options.expandEvent,function(){if(H.collapsed()){return H.expand()
}});
this.__header().bind(this.options.collapseEvent,function(){if(H.expanded()){return H.collapse()
}})
}}else{if(this.options.expandEvent==this.options.collapseEvent){if(this.options.expandEvent!="click"){this.__header().bind(this.options.expandEvent,function(){H.switchExpantion()
})
}}else{if(this.options.expandEvent!="click"){this.__header().bind(this.options.expandEvent,function(){if(H.collapsed()){return H.expand()
}})
}if(this.options.collapseEvent!="click"){this.__header().bind(this.options.collapseEvent,function(){if(H.expanded()){return H.collapse()
}})
}}}if(this.options.selectable||this.options.bubbleSelection){this.__content().bind("select",function(I){if(H.options.selectable&&H.__isMyEvent(I)){H.expand()
}if(H.options.bubbleSelection&&!H.__isMyEvent(I)){H.__select();
if(!H.expanded()){H.expand()
}}});
this.__content().bind("unselect",function(I){if(H.options.selectable&&H.__isMyEvent(I)){H.collapse()
}if(H.options.bubbleSelection&&!H.__isMyEvent(I)){H.__unselect()
}})
}}},expanded:function(){return this.__getExpandValue()
},expand:function(){if(this.expanded()){return 
}if(!this.__fireEvent("beforeexpand")){return false
}E.exec(this,true)
},__expand:function(){this.__updateStyles(true);
this.__collapseForExpandSingle();
return this.__fireEvent("expand")
},collapsed:function(){return !this.__getExpandValue()
},collapse:function(){if(!this.expanded()){return 
}if(!this.__fireEvent("beforecollapse")){return false
}E.exec(this,false)
},__collapse:function(){this.__updateStyles(false);
this.__childGroups().each(function(F,G){B.$(G.id).__collapse()
});
return this.__fireEvent("collapse")
},__updateStyles:function(F){if(F){this.__content().removeClass("rf-pm-colps").addClass("rf-pm-exp");
this.__header().removeClass("rf-pm-hdr-colps").addClass("rf-pm-hdr-exp");
this.__setExpandValue(true)
}else{this.__content().addClass("rf-pm-colps").removeClass("rf-pm-exp");
this.__header().addClass("rf-pm-hdr-colps").removeClass("rf-pm-hdr-exp");
this.__setExpandValue(false)
}},switchExpantion:function(){var F=this.__fireEvent("beforeswitch");
if(!F){return false
}if(this.expanded()){this.collapse()
}else{this.expand()
}},onCompleteHandler:function(){if(this.options.selectable){D.onCompleteHandler.call(this)
}E.execClient(this,this.expanded())
},__switch:function(F){if(F){this.__expand()
}else{this.__collapse()
}return this.__fireEvent("switch")
},__childGroups:function(){return this.__content().children(".rf-pm-gr")
},__group:function(){return C(B.getDomElement(this.id))
},__header:function(){return C(B.getDomElement(this.id+":hdr"))
},__content:function(){return C(B.getDomElement(this.id+":cnt"))
},__expandValueInput:function(){return document.getElementById(this.id+":expanded")
},__getExpandValue:function(){return this.__expandValueInput().value=="true"
},__collapseForExpandSingle:function(){if(this.options.expandSingle){this.__rfPanelMenu().__collapseGroups(this)
}},__setExpandValue:function(H){var F=this.__expandValueInput();
var G=F.value;
F.value=H;
return G
},__changeState:function(){if(!this.__getExpandValue()){this.__collapseForExpandSingle()
}var F={};
F.expanded=this.__setExpandValue(!this.__getExpandValue());
if(this.options.selectable){F.itemName=this.__rfPanelMenu().selectedItem(this.itemName)
}return F
},__restoreState:function(F){if(!F){return 
}if(F.expanded){this.__setExpandValue(F.expanded)
}if(F.itemName){this.__rfPanelMenu().selectedItem(F.itemName)
}},__isMyEvent:function(F){return this.id==F.target.id
},destroy:function(){B.Event.unbindById(this.id,"."+this.namespace);
D.destroy.call(this)
}});
var D=B.ui.PanelMenuGroup.$super
})(jQuery,RichFaces);;(function(A,B){A.effects.highlight=function(C){return this.queue(function(){var E=A(this),D=["backgroundImage","backgroundColor","opacity"],G=A.effects.setMode(E,C.options.mode||"show"),F={backgroundColor:E.css("backgroundColor")};
if(G=="hide"){F.opacity=0
}A.effects.save(E,D);
E.show().css({backgroundImage:"none",backgroundColor:C.options.color||"#ffff99"}).animate(F,{queue:false,duration:C.duration,easing:C.options.easing,complete:function(){(G=="hide"&&E.hide());
A.effects.restore(E,D);
(G=="show"&&!A.support.opacity&&this.style.removeAttribute("filter"));
(C.callback&&C.callback.apply(this,arguments));
E.dequeue()
}})
})
}
})(jQuery);;(function(B,A){A.ui=A.ui||{};
A.ui.InputBase=function(F,D){C.constructor.call(this,F);
this.namespace=this.getNamespace()||"."+A.Event.createNamespace(this.getName(),this.getId());
this.namespace=this.namespace||"."+A.Event.createNamespace(this.name,this.id);
this.input=B(document.getElementById(F+"Input"));
this.attachToDom();
var E={};
E[(B.browser.opera||B.browser.mozilla?"keypress":"keydown")+this.namespace]=B.proxy(this.__keydownHandler,this);
E["blur"+this.namespace]=B.proxy(this.__blurHandler,this);
E["change"+this.namespace]=B.proxy(this.__changeHandler,this);
E["focus"+this.namespace]=B.proxy(this.__focusHandler,this);
A.Event.bind(this.input,E,this)
};
A.BaseComponent.extend(A.ui.InputBase);
var C=A.ui.InputBase.$super;
B.extend(A.ui.InputBase.prototype,(function(){return{name:"inputBase",getName:function(){return this.name
},getNamespace:function(){return this.namespace
},__focusHandler:function(D){},__keydownHandler:function(D){},__blurHandler:function(D){},__changeHandler:function(D){},__setInputFocus:function(){this.input.focus()
},__getValue:function(){return this.input.val()
},__setValue:function(D){this.input.val(D);
if(this.defaultLabelClass){if(D==this.defaultLabel){this.input.addClass(this.defaultLabelClass)
}else{this.input.removeClass(this.defaultLabelClass)
}}},getValue:function(){return this.__getValue()
},setValue:function(D){this.__setValue(D)
},getInput:function(){return this.input
},getId:function(){return this.id
},destroy:function(){A.Event.unbindById(this.input,this.namespace);
this.input=null;
C.destroy.call(this)
}}
})())
})(jQuery,window.RichFaces);;(function(D,O){O.ui=O.ui||{};
O.ui.AutocompleteBase=function(T,U,R,S){K.constructor.call(this,T);
this.selectId=U;
this.fieldId=R;
this.options=D.extend({},C,S);
this.namespace=this.namespace||"."+O.Event.createNamespace(this.name,this.selectId);
this.currentValue="";
this.tempValue=this.getValue();
this.isChanged=this.tempValue.length!=0;
B.call(this)
};
O.BaseComponent.extend(O.ui.AutocompleteBase);
var K=O.ui.AutocompleteBase.$super;
var C={changeDelay:8};
var B=function(){var R={};
if(this.options.buttonId){R["mousedown"+this.namespace]=P;
R["mouseup"+this.namespace]=G;
O.Event.bindById(this.options.buttonId,R,this)
}R={};
R["focus"+this.namespace]=M;
R["blur"+this.namespace]=A;
R["click"+this.namespace]=L;
R[(D.browser.opera||D.browser.mozilla?"keypress":"keydown")+this.namespace]=J;
R["change"+this.namespace]=function(S){if(this.focused){S.stopPropagation()
}};
O.Event.bindById(this.fieldId,R,this);
R={};
R["mousedown"+this.namespace]=Q;
R["mouseup"+this.namespace]=G;
O.Event.bindById(this.selectId,R,this)
};
var Q=function(){this.isMouseDown=true
};
var G=function(){O.getDomElement(this.fieldId).focus()
};
var P=function(R){this.isMouseDown=true;
if(this.timeoutId){window.clearTimeout(this.timeoutId);
this.timeoutId=null
}O.getDomElement(this.fieldId).focus();
if(this.isVisible){this.__hide(R)
}else{I.call(this,R)
}};
var M=function(R){if(!this.focused){this.__focusValue=this.getValue();
this.focused=true;
this.invokeEvent("focus",O.getDomElement(this.fieldId),R);
this.invokeEvent("focus",O.getDomElement(this.id),R)
}};
var A=function(R){if(this.isMouseDown){O.getDomElement(this.fieldId).focus();
this.isMouseDown=false
}else{if(!this.isMouseDown){if(this.isVisible){var S=this;
this.timeoutId=window.setTimeout(function(){S.__hide(R)
},200)
}if(this.focused){this.focused=false;
this.invokeEvent("blur",O.getDomElement(this.fieldId),R);
this.invokeEvent("blur",O.getDomElement(this.id),R);
if(this.__focusValue!=this.getValue()){this.invokeEvent("change",O.getDomElement(this.fieldId),R);
this.invokeEvent("change",O.getDomElement(this.id),R)
}}}}};
var L=function(R){};
var H=function(S){if(this.isChanged){if(this.getValue()==this.tempValue){return 
}}this.isChanged=false;
var T=this.getValue();
var R=T!=this.currentValue;
if(S.keyCode==O.KEYS.LEFT||S.keyCode==O.KEYS.RIGHT||R){if(R){this.currentValue=this.getValue();
this.__onChangeValue(S,undefined,(!this.isVisible?this.__show:undefined))
}else{if(this.isVisible){this.__onChangeValue(S)
}}}};
var I=function(R){if(this.isChanged){this.isChanged=false;
H.call(this,{})
}else{!this.__updateState(R)&&this.__show(R)
}};
var J=function(R){switch(R.keyCode){case O.KEYS.UP:R.preventDefault();
if(this.isVisible){this.__onKeyUp(R)
}break;
case O.KEYS.DOWN:R.preventDefault();
if(this.isVisible){this.__onKeyDown(R)
}else{I.call(this,R)
}break;
case O.KEYS.PAGEUP:if(this.isVisible){R.preventDefault();
this.__onPageUp(R)
}break;
case O.KEYS.PAGEDOWN:if(this.isVisible){R.preventDefault();
this.__onPageDown(R)
}break;
case O.KEYS.HOME:if(this.isVisible){R.preventDefault();
this.__onKeyHome(R)
}break;
case O.KEYS.END:if(this.isVisible){R.preventDefault();
this.__onKeyEnd(R)
}break;
case O.KEYS.RETURN:if(this.isVisible){R.preventDefault();
this.__onEnter(R);
this.__hide(R);
return false
}break;
case O.KEYS.ESC:this.__hide(R);
break;
default:if(!this.options.selectOnly){var S=this;
window.clearTimeout(this.changeTimerId);
this.changeTimerId=window.setTimeout(function(){H.call(S,R)
},this.options.changeDelay)
}break
}};
var N=function(S){if(!this.isVisible){if(this.__onBeforeShow(S)!=false){this.scrollElements=O.Event.bindScrollEventHandlers(this.selectId,this.__hide,this,this.namespace);
var R=O.getDomElement(this.selectId);
if(this.options.attachToBody){this.parentElement=R.parentNode;
document.body.appendChild(R)
}D(R).setPosition({id:this.fieldId},{type:"DROPDOWN"}).show();
this.isVisible=true;
this.__onShow(S)
}}};
var E=function(R){if(this.isVisible){O.Event.unbindScrollEventHandlers(this.scrollElements,this);
this.scrollElements=null;
D(O.getDomElement(this.selectId)).hide();
this.isVisible=false;
if(this.options.attachToBody&&this.parentElement){this.parentElement.appendChild(O.getDomElement(this.selectId));
this.parentElement=null
}this.__onHide(R)
}};
var F=function(R){if(this.fieldId){O.getDomElement(this.fieldId).value=R;
return R
}else{return""
}};
D.extend(O.ui.AutocompleteBase.prototype,(function(){return{name:"AutocompleteBase",showPopup:function(R){if(!this.focused){O.getDomElement(this.fieldId).focus()
}I.call(this,R)
},hidePopup:function(R){this.__hide(R)
},getNamespace:function(){return this.namespace
},getValue:function(){return this.fieldId?O.getDomElement(this.fieldId).value:""
},setValue:function(R){if(R==this.currentValue){return 
}F.call(this,R);
this.isChanged=true
},__updateInputValue:F,__show:N,__hide:E,__onChangeValue:function(R){},__onKeyUp:function(R){},__onKeyDown:function(R){},__onPageUp:function(R){},__onPageDown:function(R){},__onKeyHome:function(R){},__onKeyEnd:function(R){},__onBeforeShow:function(R){},__onShow:function(R){},__onHide:function(R){},destroy:function(){this.parentNode=null;
if(this.scrollElements){O.Event.unbindScrollEventHandlers(this.scrollElements,this);
this.scrollElements=null
}this.options.buttonId&&O.Event.unbindById(this.options.buttonId,this.namespace);
O.Event.unbindById(this.fieldId,this.namespace);
O.Event.unbindById(this.selectId,this.namespace);
K.destroy.call(this)
}}
})())
})(jQuery,RichFaces);;(function(C,B){B.ui=B.ui||{};
var A={position:"tr",direction:"vertical",method:"last",notifications:[],addNotification:function(E){this.notifications.push(E)
}};
B.ui.NotifyStack=B.BaseComponent.extendClass({name:"NotifyStack",init:function(F,E){D.constructor.call(this,F);
this.attachToDom(this.id);
this.__initializeStack(E)
},__initializeStack:function(G){var F=C.extend({},C.pnotify.defaults.pnotify_stack,A,G);
var H=(F.direction=="vertical");
var E=(F.method=="first");
F.push=E?"top":"bottom";
switch(F.position){case"tl":F.dir1=H?"down":"right";
F.dir2=H?"right":"down";
break;
case"tr":F.dir1=H?"down":"left";
F.dir2=H?"left":"down";
break;
case"bl":F.dir1=H?"up":"right";
F.dir2=H?"right":"up";
break;
case"br":F.dir1=H?"up":"left";
F.dir2=H?"left":"up";
break;
default:throw"wrong stack position: "+F.position
}this.stack=F
},getStack:function(){return this.stack
},removeNotifications:function(){var E;
while(E=this.stack.notifications.pop()){E.pnotify_remove()
}},destroy:function(){this.removeNotifications();
this.stack=null;
D.destroy.call(this)
}});
var D=B.ui.NotifyStack.$super
})(jQuery,RichFaces);;(function(C,A){A.ui=A.ui||{};
var B={switchMode:"ajax"};
A.ui.CollapsiblePanelItem=A.ui.TogglePanelItem.extendClass({init:function(E,D){A.ui.TogglePanelItem.call(this,E,C.extend({},B,D));
this.headerClass="rf-cp-hdr-"+this.__state()
},__enter:function(){this.__content().show();
this.__header().addClass(this.headerClass);
return true
},__leave:function(){this.__content().hide();
if(this.options.switchMode=="client"){this.__header().removeClass(this.headerClass)
}return true
},__state:function(){return this.getName()==="true"?"exp":"colps"
},__content:function(){return C(A.getDomElement(this.id))
},__header:function(){return C(A.getDomElement(this.togglePanelId+":header"))
}})
})(jQuery,RichFaces);;var sbjQuery=jQuery;
sbjQuery.fn.SpinButton=function(A){return this.each(function(){this.spinCfg={min:A&&!isNaN(parseFloat(A.min))?Number(A.min):null,max:A&&!isNaN(parseFloat(A.max))?Number(A.max):null,step:A&&A.step?Number(A.step):1,page:A&&A.page?Number(A.page):10,upClass:A&&A.upClass?A.upClass:"up",downClass:A&&A.downClass?A.downClass:"down",reset:A&&A.reset?A.reset:this.value,delay:A&&A.delay?Number(A.delay):500,interval:A&&A.interval?Number(A.interval):100,_btn_width:20,_btn_height:12,_direction:null,_delay:null,_repeat:null,digits:A&&A.digits?Number(A.digits):1};
this.adjustValue=function(G){var F=this.value.toLowerCase();
if(F=="am"){this.value="PM";
return 
}else{if(F=="pm"){this.value="AM";
return 
}}F=(isNaN(this.value)?this.spinCfg.reset:Number(this.value))+Number(G);
if(this.spinCfg.min!==null){F=(F<this.spinCfg.min?(this.spinCfg.max!=null?this.spinCfg.max:this.spinCfg.min):F)
}if(this.spinCfg.max!==null){F=(F>this.spinCfg.max?(this.spinCfg.min!=null?this.spinCfg.min:this.spinCfg.max):F)
}var H=String(F);
while(H.length<this.spinCfg.digits){H="0"+H
}this.value=H
};
sbjQuery(this).keydown(function(F){switch(F.keyCode){case 38:this.adjustValue(this.spinCfg.step);
break;
case 40:this.adjustValue(-this.spinCfg.step);
break;
case 33:this.adjustValue(this.spinCfg.page);
break;
case 34:this.adjustValue(-this.spinCfg.page);
break
}}).bind("mousewheel",function(F){if(F.wheelDelta>=120){this.adjustValue(this.spinCfg.step)
}else{if(F.wheelDelta<=-120){this.adjustValue(-this.spinCfg.step)
}}F.preventDefault()
}).change(function(F){this.adjustValue(0)
});
var D=this;
var C=document.getElementById(this.id+"BtnUp");
sbjQuery(C).mousedown(function(G){var F=function(){D.adjustValue(D.spinCfg.step)
};
F();
D.spinCfg._delay=window.setTimeout(function(){F();
D.spinCfg._repeat=window.setInterval(F,D.spinCfg.interval)
},D.spinCfg.delay);
D.spinCfg._repeater=true;
return false
}).mouseup(function(F){D.spinCfg._repeater=false;
window.clearInterval(D.spinCfg._repeat);
window.clearTimeout(D.spinCfg._delay)
}).dblclick(function(F){if(sbjQuery.browser.msie){D.adjustValue(D.spinCfg.step)
}}).mouseout(function(F){if(D.spinCfg._repeater){D.spinCfg._repeater=false;
window.clearInterval(D.spinCfg._repeat);
window.clearTimeout(D.spinCfg._delay)
}});
var E=document.getElementById(this.id+"BtnDown");
sbjQuery(E).mousedown(function(G){var F=function(){D.adjustValue(-D.spinCfg.step)
};
F();
D.spinCfg._delay=window.setTimeout(function(){F();
D.spinCfg._repeat=window.setInterval(F,D.spinCfg.interval)
},D.spinCfg.delay);
D.spinCfg._repeater=true;
return false
}).mouseup(function(F){D.spinCfg._repeater=false;
window.clearInterval(D.spinCfg._repeat);
window.clearTimeout(D.spinCfg._delay)
}).dblclick(function(F){if(sbjQuery.browser.msie){D.adjustValue(-D.spinCfg.step)
}}).mouseout(function(F){if(D.spinCfg._repeater){D.spinCfg._repeater=false;
window.clearInterval(D.spinCfg._repeat);
window.clearTimeout(D.spinCfg._delay)
}});
if(this.addEventListener){this.addEventListener("DOMMouseScroll",function(F){if(F.detail>0){this.adjustValue(-this.spinCfg.step)
}else{if(F.detail<0){this.adjustValue(this.spinCfg.step)
}}F.preventDefault()
},false)
}});
function B(D,F){var E=D[F],C=document.body;
while((D=D.offsetParent)&&(D!=C)){if(!sbjQuery.browser.msie||(D.currentStyle.position!="relative")){E+=D[F]
}}return E
}};;(function(D,T){T.ui=T.ui||{};
T.ui.Autocomplete=function(d,b,c){this.namespace="."+T.Event.createNamespace(this.name,d);
this.options={};
Y.constructor.call(this,d,d+I.SELECT,b,c);
this.attachToDom();
this.options=D.extend(this.options,X,c);
this.value="";
this.index=null;
this.isFirstAjax=true;
this.lastMouseX=null;
this.lastMouseY=null;
P.call(this);
O.call(this);
L.call(this,"")
};
T.ui.AutocompleteBase.extend(T.ui.Autocomplete);
var Y=T.ui.Autocomplete.$super;
var X={itemClass:"rf-au-itm",selectedItemClass:"rf-au-itm-sel",subItemClass:"rf-au-opt",selectedSubItemClass:"rf-au-opt-sel",autofill:true,minChars:1,selectFirst:true,ajaxMode:true,lazyClientMode:false,isCachedAjax:true,tokens:"",attachToBody:true,filterFunction:undefined};
var I={SELECT:"List",ITEMS:"Items",VALUE:"Value"};
var A=/^[\n\s]*(.*)[\n\s]*$/;
var N=function(b){var c=[];
b.each(function(){c.push(D(this).text().replace(A,"$1"))
});
return c
};
var P=function(){this.useTokens=(typeof this.options.tokens=="string"&&this.options.tokens.length>0);
if(this.useTokens){var b=this.options.tokens.split("").join("\\");
this.REGEXP_TOKEN_LEFT=new RegExp("[^"+b+"]+$","i");
this.REGEXP_TOKEN_RIGHT=new RegExp("["+b+"]","i");
this.hasSpaceToken=this.options.tokens.indexOf(" ")!=-1
}};
var O=function(){var b={};
b["click"+this.namespace]=b["mouseover"+this.namespace]=J;
if(!D.browser.msie&&!D.browser.opera){b["mouseenter"+this.namespace]=M;
b["mouseleave"+this.namespace]=a
}T.Event.bind(T.getDomElement(this.id+I.ITEMS).parentNode,b,this)
};
var a=function(b){T.Event.unbind(T.getDomElement(this.id+I.ITEMS).parentNode,"mousemove"+this.namespace);
this.lastMouseX=null;
this.lastMouseY=null
};
var Q=function(b){this.lastMouseX=b.pageX;
this.lastMouseY=b.pageY
};
var M=function(b){this.lastMouseX=b.pageX;
this.lastMouseY=b.pageY;
T.Event.bind(T.getDomElement(this.id+I.ITEMS).parentNode,"mousemove"+this.namespace,Q,this)
};
var J=function(d){var c=D(d.target).closest("."+this.options.itemClass,d.currentTarget).get(0);
if(c){if(d.type=="mouseover"){if(this.lastMouseX==null||this.lastMouseX!=d.pageX||this.lastMouseY!=d.pageY){var b=this.items.index(c);
F.call(this,d,b)
}}else{this.__onEnter(d);
T.Selection.setCaretTo(T.getDomElement(this.fieldId));
this.__hide(d)
}}};
var L=function(d,b){var e=D(T.getDomElement(this.id+I.ITEMS));
this.items=e.find("."+this.options.itemClass);
var c=e.data();
e.removeData();
if(this.items.length>0){this.cache=new T.utils.Cache((this.options.ajaxMode?d:""),this.items,b||c.componentData||N,!this.options.ajaxMode)
}};
var E=function(){var c=0;
this.items.slice(0,this.index).each(function(){c+=this.offsetHeight
});
var b=D(T.getDomElement(this.id+I.ITEMS)).parent();
if(c<b.scrollTop()){b.scrollTop(c)
}else{c+=this.items.eq(this.index).outerHeight();
if(c-b.scrollTop()>b.innerHeight()){b.scrollTop(c-b.innerHeight())
}}};
var R=function(b,d){if(this.options.autofill&&d.toLowerCase().indexOf(b)==0){var e=T.getDomElement(this.fieldId);
var f=T.Selection.getStart(e);
this.__setInputValue(b+d.substring(b.length));
var c=f+d.length-b.length;
T.Selection.set(e,f,c)
}};
var H=function(e,h){T.getDomElement(this.id+I.VALUE).value=this.value;
var g=this;
var b=e;
var d=function(i){L.call(g,g.value,i.componentData&&i.componentData[g.id]);
if(g.options.lazyClientMode&&g.value.length!=0){G.call(g,g.value)
}if(g.items.length!=0){if(h){(g.focused||g.isMouseDown)&&h.call(g,b)
}else{g.isVisible&&g.options.selectFirst&&F.call(g,b,0)
}}else{g.__hide(b)
}};
var c=function(i){g.__hide(b);
Z.call(g)
};
this.isFirstAjax=false;
var f={};
f[this.id+".ajax"]="1";
T.ajax(this.id,e,{parameters:f,error:c,complete:d})
};
var V=function(){if(this.index!=null){var b=this.items.eq(this.index);
if(b.removeClass(this.options.selectedItemClass).hasClass(this.options.subItemClass)){b.removeClass(this.options.selectedSubItemClass)
}this.index=null
}};
var F=function(e,b,d){if(this.items.length==0||(!d&&b==this.index)){return 
}if(b==null||b==undefined){V.call(this);
return 
}if(d){if(this.index==null){b=0
}else{b=this.index+b
}}if(b<0){b=0
}else{if(b>=this.items.length){b=this.items.length-1
}}if(b==this.index){return 
}V.call(this);
this.index=b;
var c=this.items.eq(this.index);
if(c.addClass(this.options.selectedItemClass).hasClass(this.options.subItemClass)){c.addClass(this.options.selectedSubItemClass)
}E.call(this);
if(e&&e.keyCode!=T.KEYS.BACKSPACE&&e.keyCode!=T.KEYS.DEL&&e.keyCode!=T.KEYS.LEFT&&e.keyCode!=T.KEYS.RIGHT){R.call(this,this.value,S.call(this))
}};
var G=function(c){var b=this.cache.getItems(c,this.options.filterFunction);
this.items=D(b);
D(T.getDomElement(this.id+I.ITEMS)).empty().append(this.items)
};
var Z=function(){D(T.getDomElement(this.id+I.ITEMS)).removeData().empty();
this.items=[]
};
var C=function(c,e,f){F.call(this,c);
var d=(typeof e=="undefined")?this.__getSubValue():e;
var b=this.value;
this.value=d;
if((this.options.isCachedAjax||!this.options.ajaxMode)&&this.cache&&this.cache.isCached(d)){if(b!=d){G.call(this,d)
}if(this.items.length!=0){f&&f.call(this,c)
}else{this.__hide(c)
}if(c.keyCode==T.KEYS.RETURN||c.type=="click"){this.__setInputValue(d)
}else{if(this.options.selectFirst){F.call(this,c,0)
}}}else{if(c.keyCode==T.KEYS.RETURN||c.type=="click"){this.__setInputValue(d)
}if(d.length>=this.options.minChars){if((this.options.ajaxMode||this.options.lazyClientMode)&&b!=d){H.call(this,c,f)
}}else{if(this.options.ajaxMode){Z.call(this);
this.__hide(c)
}}}};
var S=function(){if(this.index!=null){var b=this.items.eq(this.index);
return this.cache.getItemValue(b)
}return undefined
};
var W=function(){if(this.useTokens){var h=T.getDomElement(this.fieldId);
var g=h.value;
var c=T.Selection.getStart(h);
var d=g.substring(0,c);
var e=g.substring(c);
var f=this.REGEXP_TOKEN_LEFT.exec(d);
var b="";
if(f){b=f[0]
}f=e.search(this.REGEXP_TOKEN_RIGHT);
if(f==-1){f=e.length
}b+=e.substring(0,f);
return b
}else{return this.getValue()
}};
var K=function(k){var j=T.getDomElement(this.fieldId);
var d=j.value;
var b=T.Selection.getStart(j);
var f=d.substring(0,b);
var h=d.substring(b);
var i=f.search(this.REGEXP_TOKEN_LEFT);
var g=i!=-1?i:f.length;
i=h.search(this.REGEXP_TOKEN_RIGHT);
var c=i!=-1?i:h.length;
var e=d.substring(0,g)+k;
b=e.length;
j.value=e+h.substring(c);
j.focus();
T.Selection.setCaretTo(j,b);
return j.value
};
var B=function(){if(this.items.length==0){return -1
}var e=D(T.getDomElement(this.id+I.ITEMS)).parent();
var c=e.scrollTop()+e.innerHeight()+this.items[0].offsetTop;
var d;
var b=(this.index!=null&&this.items[this.index].offsetTop<=c)?this.index:0;
for(b;
b<this.items.length;
b++){d=this.items[b];
if(d.offsetTop+d.offsetHeight>c){b--;
break
}}if(b!=this.items.length-1&&b==this.index){c+=this.items[b].offsetTop-e.scrollTop();
for(++b;
b<this.items.length;
b++){d=this.items[b];
if(d.offsetTop+d.offsetHeight>c){break
}}}return b
};
var U=function(){if(this.items.length==0){return -1
}var e=D(T.getDomElement(this.id+I.ITEMS)).parent();
var c=e.scrollTop()+this.items[0].offsetTop;
var d;
var b=(this.index!=null&&this.items[this.index].offsetTop>=c)?this.index-1:this.items.length-1;
for(b;
b>=0;
b--){d=this.items[b];
if(d.offsetTop<c){b++;
break
}}if(b!=0&&b==this.index){c=this.items[b].offsetTop-e.innerHeight();
if(c<this.items[0].offsetTop){c=this.items[0].offsetTop
}for(--b;
b>=0;
b--){d=this.items[b];
if(d.offsetTop<c){b++;
break
}}}return b
};
D.extend(T.ui.Autocomplete.prototype,(function(){return{name:"Autocomplete",__updateState:function(b){var c=this.__getSubValue();
if(this.items.length==0&&this.isFirstAjax){if((this.options.ajaxMode&&c.length>=this.options.minChars)||this.options.lazyClientMode){this.value=c;
H.call(this,b,this.__show);
return true
}}return false
},__getSubValue:W,__updateInputValue:function(b){if(this.useTokens){return K.call(this,b)
}else{return Y.__updateInputValue.call(this,b)
}},__setInputValue:function(b){this.currentValue=this.__updateInputValue(b)
},__onChangeValue:C,__onKeyUp:function(b){F.call(this,b,-1,true)
},__onKeyDown:function(b){F.call(this,b,1,true)
},__onPageUp:function(b){F.call(this,b,U.call(this))
},__onPageDown:function(b){F.call(this,b,B.call(this))
},__onKeyHome:function(b){F.call(this,b,0)
},__onKeyEnd:function(b){F.call(this,b,this.items.length-1)
},__onBeforeShow:function(b){},__onEnter:function(b){var c=S.call(this);
this.__onChangeValue(b,c);
this.invokeEvent("selectitem",T.getDomElement(this.fieldId),b,c)
},__onShow:function(b){if(this.options.selectFirst){F.call(this,b,0)
}},__onHide:function(b){F.call(this,b)
},destroy:function(){this.items=null;
this.cache=null;
var b=T.getDomElement(this.id+I.ITEMS);
D(b).removeData();
T.Event.unbind(b.parentNode,this.namespace);
Y.destroy.call(this)
}}
})());
D.extend(T.ui.Autocomplete,{setData:function(c,b){D(T.getDomElement(c)).data({componentData:b})
}})
})(jQuery,RichFaces);;(function(C,B){B.ui=B.ui||{};
B.ui.InplaceBase=function(G,E){D.constructor.call(this,G);
var F=C.extend({},A,E);
this.editEvent=F.editEvent;
this.noneCss=F.noneCss;
this.changedCss=F.changedCss;
this.editCss=F.editCss;
this.defaultLabel=F.defaultLabel;
this.state=F.state;
this.options=F;
this.element=C(document.getElementById(G));
this.editContainer=C(document.getElementById(G+"Edit"));
this.element.bind(this.editEvent,C.proxy(this.__editHandler,this));
this.isSaved=false;
this.useDefaultLabel=false;
this.editState=false
};
B.ui.InputBase.extend(B.ui.InplaceBase);
var D=B.ui.InplaceBase.$super;
var A={editEvent:"click",state:"ready"};
C.extend(B.ui.InplaceBase.prototype,(function(){var E={READY:"ready",CHANGED:"changed",DISABLE:"disable",EDIT:"edit"};
return{getLabel:function(){},setLabel:function(F){},onshow:function(){},onhide:function(){},onsave:function(){},oncancel:function(){},save:function(){var F=this.__getValue();
if(F.length>0){this.setLabel(F);
this.useDefaultLabel=false
}else{this.setLabel(this.defaultLabel);
this.useDefaultLabel=true
}this.isSaved=true;
this.__applyChangedStyles();
this.onsave()
},cancel:function(){var F="";
if(!this.useDefaultLabel){F=this.getLabel()
}this.__setValue(F);
this.isSaved=true;
this.oncancel()
},isValueSaved:function(){return this.isSaved
},isEditState:function(){return this.editState
},__applyChangedStyles:function(){if(this.isValueChanged()){this.element.addClass(this.changedCss)
}else{this.element.removeClass(this.changedCss)
}},__show:function(){this.scrollElements=B.Event.bindScrollEventHandlers(this.id,this.__scrollHandler,this);
this.editState=true;
this.onshow()
},__hide:function(){if(this.scrollElements){B.Event.unbindScrollEventHandlers(this.scrollElements,this);
this.scrollElements=null
}this.editState=false;
this.editContainer.addClass(this.noneCss);
this.element.removeClass(this.editCss);
this.onhide()
},__editHandler:function(F){this.isSaved=false;
this.element.addClass(this.editCss);
this.editContainer.removeClass(this.noneCss);
this.__show()
},__scrollHandler:function(F){this.cancel()
},destroy:function(){D.destroy.call(this)
}}
})())
})(jQuery,window.RichFaces);;(function($,rf){rf.calendarUtils=rf.calendarUtils||{};
var getDefaultMonthNames=function(shortNames){return(shortNames?["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]:["January","February","March","April","May","June","July","August","September","October","November","December"])
};
$.extend(rf.calendarUtils,{joinArray:function(array,begin,end,separator){var value="";
if(array.length!=0){value=begin+array.pop()+end
}while(array.length){value=begin+array.pop()+end+separator+value
}return value
},getMonthByLabel:function(monthLabel,monthNames){var toLowerMonthLabel=monthLabel.toLowerCase();
var i=0;
while(i<monthNames.length){if(monthNames[i].toLowerCase()==toLowerMonthLabel){return i
}i++
}},createDate:function(yy,mm,dd,h,m,s){h=h||0;
m=m||0;
s=s||0;
var date=new Date(yy,mm,dd,h,m,s);
if(date.getDate()!=dd){date=new Date(yy,mm);
date.setHours(h);
date.setMinutes(m);
date.setSeconds(s);
date.setUTCDate(dd)
}return date
},parseDate:function(dateString,pattern,monthNames,monthNamesShort){var re=/([.*+?^<>=!:${}()\[\]\/\\])/g;
var monthNamesStr;
var monthNamesShortStr;
if(!monthNames){monthNames=getDefaultMonthNames();
monthNamesStr=monthNames.join("|")
}else{monthNamesStr=monthNames.join("|").replace(re,"\\$1")
}if(!monthNamesShort){monthNamesShort=getDefaultMonthNames(true);
monthNamesShortStr=monthNamesShort.join("|")
}else{monthNamesShortStr=monthNamesShort.join("|").replace(re,"\\$1")
}var counter=1;
var y,m,d;
var a,h,min,s;
var shortLabel=false;
pattern=pattern.replace(/([.*+?^<>=!:${}()|\[\]\/\\])/g,"\\$1");
pattern=pattern.replace(/(y+|M+|d+|a|H{1,2}|h{1,2}|m{2}|s{2})/g,function($1){switch($1){case"y":case"yy":y=counter;
counter++;
return"(\\d{2})";
case"MM":m=counter;
counter++;
return"(\\d{2})";
case"M":m=counter;
counter++;
return"(\\d{1,2})";
case"d":d=counter;
counter++;
return"(\\d{1,2})";
case"MMM":m=counter;
counter++;
shortLabel=true;
return"("+monthNamesShortStr+")";
case"a":a=counter;
counter++;
return"(AM|am|PM|pm)?";
case"HH":case"hh":h=counter;
counter++;
return"(\\d{2})?";
case"H":case"h":h=counter;
counter++;
return"(\\d{1,2})?";
case"mm":min=counter;
counter++;
return"(\\d{2})?";
case"ss":s=counter;
counter++;
return"(\\d{2})?"
}var ch=$1.charAt(0);
if(ch=="y"){y=counter;
counter++;
return"(\\d{3,4})"
}if(ch=="M"){m=counter;
counter++;
return"("+monthNamesStr+")"
}if(ch=="d"){d=counter;
counter++;
return"(\\d{2})"
}});
var re=new RegExp(pattern,"i");
var match=dateString.match(re);
if(match!=null&&y!=undefined&&m!=undefined&&d!=undefined){var correctYear=false;
var defaultCenturyStart=new Date();
defaultCenturyStart.setFullYear(defaultCenturyStart.getFullYear()-80);
var yy=parseInt(match[y],10);
if(isNaN(yy)){return null
}else{if(yy<100){var defaultCenturyStartYear=defaultCenturyStart.getFullYear();
var ambiguousTwoDigitYear=defaultCenturyStartYear%100;
correctYear=yy==ambiguousTwoDigitYear;
yy+=Math.floor(defaultCenturyStartYear/100)*100+(yy<ambiguousTwoDigitYear?100:0)
}}var mm=parseInt(match[m],10);
if(isNaN(mm)){mm=this.getMonthByLabel(match[m],shortLabel?monthNamesShort:monthNames)
}else{if(--mm<0||mm>11){return null
}}var addDay=correctYear?1:0;
var dd=parseInt(match[d],10);
if(isNaN(dd)||dd<1||dd>this.daysInMonth(yy,mm)+addDay){return null
}var date;
if(min!=undefined&&h!=undefined){var hh,mmin,aa;
mmin=parseInt(match[min],10);
if(isNaN(mmin)||mmin<0||mmin>59){return null
}hh=parseInt(match[h],10);
if(isNaN(hh)){return null
}if(a!=undefined){aa=match[a];
if(!aa){return null
}aa=aa.toLowerCase();
if((aa!="am"&&aa!="pm")||hh<1||hh>12){return null
}if(aa=="pm"){if(hh!=12){hh+=12
}}else{if(hh==12){hh=0
}}}else{if(hh<0||hh>23){return null
}}date=this.createDate(yy,mm,dd,hh,mmin);
if(s!=undefined){sec=parseInt(match[s],10);
if(isNaN(sec)||sec<0||sec>59){return null
}date.setSeconds(sec)
}}else{date=this.createDate(yy,mm,dd)
}if(correctYear){if(date.getTime()<defaultCenturyStart.getTime()){date.setFullYear(yy+100)
}if(date.getMonth()!=mm){return null
}}return date
}return null
},formatDate:function(date,pattern,monthNames,monthNamesShort){if(!monthNames){monthNames=getDefaultMonthNames()
}if(!monthNamesShort){monthNamesShort=getDefaultMonthNames(true)
}var mm,dd,hh,min,sec;
var result=pattern.replace(/(\\\\|\\[yMdaHhms])|(y+|M+|d+|a|H{1,2}|h{1,2}|m{2}|s{2})/g,function($1,$2,$3){if($2){return $2.charAt(1)
}switch($3){case"y":case"yy":return date.getYear().toString().slice(-2);
case"M":return(date.getMonth()+1);
case"MM":return((mm=date.getMonth()+1)<10?"0"+mm:mm);
case"MMM":return monthNamesShort[date.getMonth()];
case"d":return date.getDate();
case"a":return(date.getHours()<12?"AM":"PM");
case"HH":return((hh=date.getHours())<10?"0"+hh:hh);
case"H":return date.getHours();
case"hh":return((hh=date.getHours())==0?"12":(hh<10?"0"+hh:(hh>21?hh-12:(hh>12)?"0"+(hh-12):hh)));
case"h":return((hh=date.getHours())==0?"12":(hh>12?hh-12:hh));
case"mm":return((min=date.getMinutes())<10?"0"+min:min);
case"ss":return((sec=date.getSeconds())<10?"0"+sec:sec)
}var ch=$3.charAt(0);
if(ch=="y"){return date.getFullYear()
}if(ch=="M"){return monthNames[date.getMonth()]
}if(ch=="d"){return((dd=date.getDate())<10?"0"+dd:dd)
}});
return result
},isLeapYear:function(year){return new Date(year,1,29).getDate()==29
},daysInMonth:function(year,month){return 32-new Date(year,month,32).getDate()
},daysInMonthByDate:function(date){return 32-new Date(date.getFullYear(),date.getMonth(),32).getDate()
},getDay:function(date,firstWeekDay){var value=date.getDay()-firstWeekDay;
if(value<0){value=7+value
}return value
},getFirstWeek:function(year,mdifw,fdow){var date=new Date(year,0,1);
var firstday=this.getDay(date,fdow);
var weeknumber=(7-firstday<mdifw)?0:1;
return{date:date,firstDay:firstday,weekNumber:weeknumber,mdifw:mdifw,fdow:fdow}
},getLastWeekOfPrevYear:function(o){var year=o.date.getFullYear()-1;
var days=(this.isLeapYear(year)?366:365);
var obj=this.getFirstWeek(year,o.mdifw,o.fdow);
days=(days-7+o.firstDay);
var weeks=Math.ceil(days/7);
return weeks+obj.weekNumber
},weekNumber:function(year,month,mdifw,fdow){var o=this.getFirstWeek(year,mdifw,fdow);
if(month==0){if(o.weekNumber==1){return 1
}return this.getLastWeekOfPrevYear(o)
}var oneweek=604800000;
var d=new Date(year,month,1);
d.setDate(1+o.firstDay+(this.getDay(d,fdow)==0?1:0));
weeknumber=o.weekNumber+Math.floor((d.getTime()-o.date.getTime())/oneweek);
return weeknumber
}});
rf.calendarTemplates=rf.calendarTemplates||{};
$.extend(rf.calendarTemplates,(function(){var VARIABLE_NAME_PATTERN=/^\s*[_,A-Z,a-z][\w,_\.]*\s*$/;
var getObjectValue=function(str,object){var a=str.split(".");
var value=object[a[0]];
var c=1;
while(value&&c<a.length){value=value[a[c++]]
}return(value?value:"")
};
return{evalMacro:function(template,object){var _value_="";
if(VARIABLE_NAME_PATTERN.test(template)){if(template.indexOf(".")==-1){_value_=object[template];
if(!_value_){_value_=window[template]
}}else{_value_=getObjectValue(template,object);
if(!_value_){_value_=getObjectValue(template,window)
}}if(_value_&&typeof _value_=="function"){_value_=_value_(object)
}if(!_value_){_value_=""
}}else{try{if(object.eval){_value_=object.eval(template)
}else{with(object){_value_=eval(template)
}}if(typeof _value_=="function"){_value_=_value_(object)
}}catch(e){LOG.warn("Exception: "+e.Message+"\n["+template+"]")
}}return _value_
}}
})())
})(jQuery,RichFaces);;(function(C,B){B.ui=B.ui||{};
B.ui.Popup=function(F,E){D.constructor.call(this,F);
this.options=C.extend({},A,E);
this.positionOptions={type:this.options.positionType,from:this.options.jointPoint,to:this.options.direction,offset:this.options.positionOffset};
this.popup=C(document.getElementById(F));
this.visible=this.options.visible;
this.attachTo=this.options.attachTo;
this.attachToBody=this.options.attachToBody;
this.positionType=this.options.positionType;
this.positionOffset=this.options.positionOffset
};
B.BaseComponent.extend(B.ui.Popup);
var D=B.ui.Popup.$super;
var A={visible:false};
C.extend(B.ui.Popup.prototype,{name:"popup",show:function(E){if(!this.visible){if(this.attachToBody){this.parentElement=this.popup.parent().get(0);
document.body.appendChild(this.popup.get(0))
}this.visible=true
}this.popup.setPosition(E||{id:this.attachTo},this.positionOptions).show()
},hide:function(){if(this.visible){this.popup.hide();
this.visible=false;
if(this.attachToBody&&this.parentElement){this.parentElement.appendChild(this.popup.get(0));
this.parentElement=null
}}},isVisible:function(){return this.visible
},getId:function(){return this.id
},destroy:function(){if(this.attachToBody&&this.parentElement){this.parentElement.appendChild(this.popup.get(0));
this.parentElement=null
}}})
})(jQuery,window.RichFaces);;(function(F,L){L.ui=L.ui||{};
var B={getControl:function(Q,N,O,P){var M=F.extend({onclick:(O?"RichFaces.$$('Calendar',this)."+O+"("+(P?P:"")+");":"")+"return true;"},N);
return new E("div",M,[new T(Q)])
},getSelectedDateControl:function(O){if(!O.selectedDate||O.options.showApplyButton){return""
}var P=L.calendarUtils.formatDate(O.selectedDate,(O.timeType?O.datePattern:O.options.datePattern),O.options.monthLabels,O.options.monthLabelsShort);
var N="RichFaces.$$('Calendar',this).showSelectedDate(); return true;";
var M=(O.options.disabled?new E("div",{"class":"rf-cal-tl-btn-dis"},[new ET(P)]):new E("div",{"class":"rf-cal-tl-btn",onclick:N},[new ET(P)]));
return M
},getTimeControl:function(P){if(!P.selectedDate||!P.timeType){return""
}var R=L.calendarUtils.formatDate(P.selectedDate,P.timePattern,P.options.monthLabels,P.options.monthLabelsShort);
var Q="jQuery(this).removeClass('rf-cal-btn-press');";
var O="jQuery(this).addClass('rf-cal-btn-press');";
var N="RichFaces.$$('Calendar',this).showTimeEditor();return true;";
var M=P.options.disabled||P.options.readonly?new E("div",{"class":"rf-cal-tl-btn-btn-dis"},[new ET(R)]):new E("div",{"class":"rf-cal-tl-btn rf-cal-tl-btn-hov rf-cal-btn-press",onclick:N,onmouseover:+Q,onmouseout:+O},[new ET(R)]);
return M
},toolButtonAttributes:{className:"rf-cal-tl-btn",onmouseover:"this.className='rf-cal-tl-btn rf-cal-tl-btn-hov'",onmouseout:"this.className='rf-cal-tl-btn'",onmousedown:"this.className='rf-cal-tl-btn rf-cal-tl-btn-hov rf-cal-tl-btn-btn-press'",onmouseup:"this.className='rf-cal-tl-btn rf-cal-tl-btn-hov'"},nextYearControl:function(M){return(!M.calendar.options.disabled?B.getControl(">>",B.toolButtonAttributes,"nextYear"):"")
},previousYearControl:function(M){return(!M.calendar.options.disabled?B.getControl("<<",B.toolButtonAttributes,"prevYear"):"")
},nextMonthControl:function(M){return(!M.calendar.options.disabled?B.getControl(">",B.toolButtonAttributes,"nextMonth"):"")
},previousMonthControl:function(M){return(!M.calendar.options.disabled?B.getControl("<",B.toolButtonAttributes,"prevMonth"):"")
},currentMonthControl:function(N){var O=L.calendarUtils.formatDate(N.calendar.getCurrentDate(),"MMMM, yyyy",N.monthLabels,N.monthLabelsShort);
var M=N.calendar.options.disabled?new E("div",{className:"rf-cal-tl-btn-dis"},[new T(O)]):B.getControl(O,B.toolButtonAttributes,"showDateEditor");
return M
},todayControl:function(M){return(!M.calendar.options.disabled&&M.calendar.options.todayControlMode!="hidden"?B.getControl(M.controlLabels.today,B.toolButtonAttributes,"today"):"")
},closeControl:function(M){return(M.calendar.options.popup?B.getControl(M.controlLabels.close,B.toolButtonAttributes,"close","false"):"")
},applyControl:function(M){return(!M.calendar.options.disabled&&!M.calendar.options.readonly&&M.calendar.options.showApplyButton?B.getControl(M.controlLabels.apply,B.toolButtonAttributes,"close","true"):"")
},cleanControl:function(M){return(!M.calendar.options.disabled&&!M.calendar.options.readonly&&M.calendar.selectedDate?B.getControl(M.controlLabels.clean,B.toolButtonAttributes,"__resetSelectedDate"):"")
},selectedDateControl:function(M){return B.getSelectedDateControl(M.calendar)
},timeControl:function(M){return B.getTimeControl(M.calendar)
},timeEditorFields:function(M){return M.calendar.timePatternHtml
},header:[new E("table",{border:"0",cellpadding:"0",cellspacing:"0",width:"100%"},[new E("tbody",{},[new E("tr",{},[new E("td",{"class":"rf-cal-tl"},[new ET(function(M){return L.calendarTemplates.evalMacro("previousYearControl",M)
})]),new E("td",{"class":"rf-cal-tl"},[new ET(function(M){return L.calendarTemplates.evalMacro("previousMonthControl",M)
})]),new E("td",{"class":"rf-cal-hdr-month"},[new ET(function(M){return L.calendarTemplates.evalMacro("currentMonthControl",M)
})]),new E("td",{"class":"rf-cal-tl"},[new ET(function(M){return L.calendarTemplates.evalMacro("nextMonthControl",M)
})]),new E("td",{"class":"rf-cal-tl"},[new ET(function(M){return L.calendarTemplates.evalMacro("nextYearControl",M)
})]),new E("td",{"class":"rf-cal-tl rf-cal-btn-close",style:function(M){return(this.isEmpty?"display:none;":"")
}},[new ET(function(M){return L.calendarTemplates.evalMacro("closeControl",M)
})])])])])],footer:[new E("table",{border:"0",cellpadding:"0",cellspacing:"0",width:"100%"},[new E("tbody",{},[new E("tr",{},[new E("td",{"class":"rf-cal-tl-ftr",style:function(M){return(this.isEmpty?"display:none;":"")
}},[new ET(function(M){return L.calendarTemplates.evalMacro("selectedDateControl",M)
})]),new E("td",{"class":"rf-cal-tl-ftr",style:function(M){return(this.isEmpty?"display:none;":"")
}},[new ET(function(M){return L.calendarTemplates.evalMacro("cleanControl",M)
})]),new E("td",{"class":"rf-cal-tl-ftr",style:function(M){return(this.isEmpty?"display:none;":"")
}},[new ET(function(M){return L.calendarTemplates.evalMacro("timeControl",M)
})]),new E("td",{"class":"rf-cal-tl-ftr",style:"background-image:none;",width:"100%"},[]),new E("td",{"class":"rf-cal-tl-ftr",style:function(M){return(this.isEmpty?"display:none;":"")+(M.calendar.options.disabled||M.calendar.options.readonly||!M.calendar.options.showApplyButton?"background-image:none;":"")
}},[new ET(function(M){return L.calendarTemplates.evalMacro("todayControl",M)
})]),new E("td",{"class":"rf-cal-tl-ftr",style:function(M){return(this.isEmpty?"display:none;":"")+"background-image:none;"
}},[new ET(function(M){return L.calendarTemplates.evalMacro("applyControl",M)
})])])])])],timeEditorLayout:[new E("table",{id:function(M){return M.calendar.TIME_EDITOR_LAYOUT_ID
},border:"0",cellpadding:"0",cellspacing:"0","class":"rf-cal-timepicker-cnt"},[new E("tbody",{},[new E("tr",{},[new E("td",{"class":"rf-cal-timepicker-inp",colspan:"2",align:"center"},[new ET(function(M){return L.calendarTemplates.evalMacro("timeEditorFields",M)
})])]),new E("tr",{},[new E("td",{"class":"rf-cal-timepicker-ok"},[new E("div",{id:function(M){return M.calendar.TIME_EDITOR_BUTTON_OK
},"class":"rf-cal-time-btn",style:"float:right;",onmousedown:"jQuery(this).addClass('rf-cal-time-btn-press');",onmouseout:"jQuery(this).removeClass('rf-cal-time-btn-press');",onmouseup:"jQuery(this).removeClass('rf-cal-time-btn-press');",onclick:function(M){return"RichFaces.$('"+M.calendar.id+"').hideTimeEditor(true)"
}},[new E("span",{},[new ET(function(M){return M.controlLabels.ok
})])])]),new E("td",{"class":"rf-cal-timepicker-cancel"},[new E("div",{id:function(M){return M.calendar.TIME_EDITOR_BUTTON_CANCEL
},"class":"rf-cal-time-btn",style:"float:left;",onmousedown:"jQuery(this).addClass('rf-cal-time-btn-press');",onmouseout:"jQuery(this).removeClass('rf-cal-time-btn-press');",onmouseup:"jQuery(this).removeClass('rf-cal-time-btn-press');",onclick:function(M){return"RichFaces.$('"+M.calendar.id+"').hideTimeEditor(false)"
}},[new E("span",{},[new ET(function(M){return M.controlLabels.cancel
})])])])])])])],dayList:[new ET(function(M){return M.day
})],weekNumber:[new ET(function(M){return M.weekNumber
})],weekDay:[new ET(function(M){return M.weekDayLabelShort
})]};
var H=function(M){this.calendar=M;
this.monthLabels=M.options.monthLabels;
this.monthLabelsShort=M.options.monthLabelsShort;
this.weekDayLabels=M.options.weekDayLabels;
this.weekDayLabelsShort=M.options.weekDayLabelsShort;
this.controlLabels=M.options.labels
};
F.extend(H.prototype,{nextYearControl:B.nextYearControl,previousYearControl:B.previousYearControl,nextMonthControl:B.nextMonthControl,previousMonthControl:B.previousMonthControl,currentMonthControl:B.currentMonthControl,selectedDateControl:B.selectedDateControl,cleanControl:B.cleanControl,timeControl:B.timeControl,todayControl:B.todayControl,closeControl:B.closeControl,applyControl:B.applyControl,timeEditorFields:B.timeEditorFields});
var C={showWeekDaysBar:true,showWeeksBar:true,datePattern:"MMM d, yyyy",horizontalOffset:0,verticalOffset:0,dayListMarkup:B.dayList,weekNumberMarkup:B.weekNumber,weekDayMarkup:B.weekDay,headerMarkup:B.header,footerMarkup:B.footer,isDayEnabled:function(M){return true
},dayStyleClass:function(M){return""
},showHeader:true,showFooter:true,direction:"AA",jointPoint:"AA",popup:true,boundaryDatesMode:"inactive",todayControlMode:"select",style:"",className:"",disabled:false,readonly:false,enableManualInput:false,showInput:true,resetTimeOnDateSelect:false,style:"z-index: 3;",showApplyButton:false,selectedDate:null,currentDate:null,defaultTime:{hours:12,minutes:0,seconds:0},mode:"client",hidePopupOnScroll:true,defaultLabel:""};
var K={apply:"Apply",today:"Today",clean:"Clean",ok:"OK",cancel:"Cancel",close:"x"};
var I=["change","dateselect","beforedateselect","currentdateselect","beforecurrentdateselect","currentdateselect","clean","complete","collapse","datemouseout","datemouseover","show","hide","timeselect","beforetimeselect"];
var D=function(M){var N=L.getDomElement(this.INPUT_DATE_ID);
if((N.value==this.options.defaultLabel&&!M)||(M==this.options.defaultLabel&&!N.value)){N.value=M;
if(M){F(N).addClass("rf-cal-dflt-lbl")
}else{F(N).removeClass("rf-cal-dflt-lbl")
}}};
var G=function(M){this.isFocused=M.type=="focus";
if(!this.isFocused&&this.isVisible){return 
}D.call(this,(M.type=="focus"?"":this.options.defaultLabel))
};
L.ui.Calendar=function(j,e,S,q){J.constructor.call(this,j);
this.namespace="."+L.Event.createNamespace(this.name,j);
this.options=F.extend(this.options,C,A[e],S,q);
var c=S.labels||{};
for(var r in K){if(!c[r]){c[r]=K[r]
}}this.options.labels=c;
this.popupOffset=[this.options.horizontalOffset,this.options.verticalOffset];
if(!this.options.popup){this.options.showApplyButton=false
}this.options.boundaryDatesMode=this.options.boundaryDatesMode.toLowerCase();
this.hideBoundaryDatesContent=this.options.boundaryDatesMode=="hidden";
this.options.todayControlMode=this.options.todayControlMode.toLowerCase();
this.setTimeProperties();
this.customDayListMarkup=(this.options.dayListMarkup!=B.dayList);
this.currentDate=this.options.currentDate?this.options.currentDate:(this.options.selectedDate?this.options.selectedDate:new Date());
this.currentDate.setDate(1);
this.selectedDate=this.options.selectedDate;
this.todayDate=new Date();
this.firstWeekendDayNumber=6-this.options.firstWeekDay;
this.secondWeekendDayNumber=(this.options.firstWeekDay>0?7-this.options.firstWeekDay:0);
this.calendarContext=new H(this);
this.DATE_ELEMENT_ID=this.id+"DayCell";
this.WEEKNUMBER_BAR_ID=this.id+"WeekNum";
this.WEEKNUMBER_ELEMENT_ID=this.WEEKNUMBER_BAR_ID+"Cell";
this.WEEKDAY_BAR_ID=this.id+"WeekDay";
this.WEEKDAY_ELEMENT_ID=this.WEEKDAY_BAR_ID+"Cell";
this.POPUP_ID=this.id+"Popup";
this.POPUP_BUTTON_ID=this.id+"PopupButton";
this.INPUT_DATE_ID=this.id+"InputDate";
this.EDITOR_ID=this.id+"Editor";
this.EDITOR_SHADOW_ID=this.id+"EditorShadow";
this.TIME_EDITOR_LAYOUT_ID=this.id+"TimeEditorLayout";
this.DATE_EDITOR_LAYOUT_ID=this.id+"DateEditorLayout";
this.EDITOR_LAYOUT_SHADOW_ID=this.id+"EditorLayoutShadow";
this.TIME_EDITOR_BUTTON_OK=this.id+"TimeEditorButtonOk";
this.TIME_EDITOR_BUTTON_CANCEL=this.id+"TimeEditorButtonCancel";
this.DATE_EDITOR_BUTTON_OK=this.id+"DateEditorButtonOk";
this.DATE_EDITOR_BUTTON_CANCEL=this.id+"DateEditorButtonCancel";
this.CALENDAR_CONTENT=this.id+"Content";
this.firstDateIndex=0;
this.daysData={startDate:null,days:[]};
this.days=[];
this.todayCellId=null;
this.todayCellColor="";
this.selectedDateCellId=null;
this.selectedDateCellColor="";
var W="";
this.isVisible=true;
if(this.options.popup==true){W="display:none; position:absolute;";
this.isVisible=false
}var g="RichFaces.$('"+this.id+"').";
var X='<table id="'+this.CALENDAR_CONTENT+'" border="0" cellpadding="0" cellspacing="0" class="rf-cal-extr rf-cal-popup '+this.options.styleClass+'" style="'+W+this.options.style+'" onclick="'+g+'skipEventOnCollapse=true;"><tbody>';
var Q=(this.options.showWeeksBar?"8":"7");
var V=(this.options.optionalHeaderMarkup)?'<tr><td class="rf-cal-hdr-optnl" colspan="'+Q+'" id="'+this.id+'HeaderOptional"></td></tr>':"";
var h=(this.options.optionalFooterMarkup)?'<tr><td class="rf-cal-ftr-optl" colspan="'+Q+'" id="'+this.id+'FooterOptional"></td></tr>':"";
var m=(this.options.showHeader?'<tr><td class="rf-cal-hdr" colspan="'+Q+'" id="'+this.id+'Header"></td></tr>':"");
var d=(this.options.showFooter?'<tr><td class="rf-cal-ftr" colspan="'+Q+'" id="'+this.id+'Footer"></td></tr>':"");
var R="</tbody></table>";
var Z;
var M;
var Y=[];
var P;
var O=this.options.disabled||this.options.readonly?"":'onclick="'+g+'eventCellOnClick(event, this);" onmouseover="'+g+'eventCellOnMouseOver(event, this);" onmouseout="'+g+'eventCellOnMouseOut(event, this);"';
if(this.options.showWeekDaysBar){Y.push('<tr id="'+this.WEEKDAY_BAR_ID+'">');
if(this.options.showWeeksBar){Y.push('<td class="rf-cal-day-lbl"><br/></td>')
}var o=this.options.firstWeekDay;
for(var f=0;
f<7;
f++){P={weekDayLabel:this.options.weekDayLabels[o],weekDayLabelShort:this.options.weekDayLabelsShort[o],weekDayNumber:o,isWeekend:this.isWeekend(f),elementId:this.WEEKDAY_ELEMENT_ID+f,component:this};
var n=this.evaluateMarkup(this.options.weekDayMarkup,P);
if(o==6){o=0
}else{o++
}Z="rf-cal-day-lbl";
if(P.isWeekend){Z+=" rf-cal-holliday-lbl"
}if(f==6){Z+=" rf-cal-right-c"
}Y.push('<td class="'+Z+'" id="'+P.elementId+'">'+n+"</td>")
}Y.push("</tr>\n")
}var l=[];
var b=0;
this.dayCellClassName=[];
for(k=1;
k<7;
k++){M=(k==6?"rf-btm-c ":"");
l.push('<tr id="'+this.WEEKNUMBER_BAR_ID+k+'">');
if(this.options.showWeeksBar){P={weekNumber:k,elementId:this.WEEKNUMBER_ELEMENT_ID+k,component:this};
var U=this.evaluateMarkup(this.options.weekNumberMarkup,P);
l.push('<td class="rf-cal-week '+M+'" id="'+P.elementId+'">'+U+"</td>")
}for(var f=0;
f<7;
f++){Z=M+(!this.options.dayCellClass?"rf-cal-c-cnt-overflow":(!this.customDayListMarkup?this.options.dayCellClass:""))+" rf-cal-c";
if(f==this.firstWeekendDayNumber||f==this.secondWeekendDayNumber){Z+=" rf-cal-holiday"
}if(f==6){Z+=" rf-cal-right-c"
}this.dayCellClassName.push(Z);
l.push('<td class="'+Z+'" id="'+this.DATE_ELEMENT_ID+b+'" '+O+">"+(this.customDayListMarkup?'<div class="rf-cal-c-cnt'+(this.options.dayCellClass?" "+this.options.dayCellClass:"")+'"></div>':"")+"</td>");
b++
}l.push("</tr>")
}var a=L.getDomElement(this.CALENDAR_CONTENT);
a=F(a).replaceWith(X+V+m+Y.join("")+l.join("")+d+h+R);
this.attachToDom();
a=null;
if(this.options.popup&&!this.options.disabled){var N=new Function("event","RichFaces.$('"+this.id+"').switchPopup();");
L.Event.bindById(this.POPUP_BUTTON_ID,"click"+this.namespace,N,this);
if(!this.options.enableManualInput){L.Event.bindById(this.INPUT_DATE_ID,"click"+this.namespace,N,this)
}if(this.options.defaultLabel){D.call(this,this.options.defaultLabel);
L.Event.bindById(this.INPUT_DATE_ID,"focus"+this.namespace+" blur"+this.namespace,G,this)
}}this.scrollElements=null;
this.isAjaxMode=this.options.mode=="ajax"
};
L.BaseComponent.extend(L.ui.Calendar);
var J=L.ui.Calendar.$super;
var A={};
L.ui.Calendar.addLocale=function(M,N){if(!A[M]){A[M]=N
}};
F.extend(L.ui.Calendar.prototype,{name:"Calendar",destroy:function(){if(this.options.popup&&this.isVisible){this.scrollElements&&L.Event.unbindScrollEventHandlers(this.scrollElements,this);
this.scrollElements=null;
L.Event.unbind(window.document,"click"+this.namespace)
}J.destroy.call(this)
},dateEditorSelectYear:function(M){if(this.dateEditorYearID){F(L.getDomElement(this.dateEditorYearID)).removeClass("rf-cal-edtr-btn-sel")
}this.dateEditorYear=this.dateEditorStartYear+M;
this.dateEditorYearID=this.DATE_EDITOR_LAYOUT_ID+"Y"+M;
F(L.getDomElement(this.dateEditorYearID)).addClass("rf-cal-edtr-btn-sel")
},dateEditorSelectMonth:function(M){this.dateEditorMonth=M;
F(L.getDomElement(this.dateEditorMonthID)).removeClass("rf-cal-edtr-btn-sel");
this.dateEditorMonthID=this.DATE_EDITOR_LAYOUT_ID+"M"+M;
F(L.getDomElement(this.dateEditorMonthID)).addClass("rf-cal-edtr-btn-sel")
},scrollEditorYear:function(P){var N=L.getDomElement(this.DATE_EDITOR_LAYOUT_ID+"TR");
if(this.dateEditorYearID){F(L.getDomElement(this.dateEditorYearID)).removeClass("rf-cal-edtr-btn-sel");
this.dateEditorYearID=""
}if(!P){if(this.dateEditorMonth!=this.getCurrentMonth()){this.dateEditorMonth=this.getCurrentMonth();
F(L.getDomElement(this.dateEditorMonthID)).removeClass("rf-cal-edtr-btn-sel");
this.dateEditorMonthID=this.DATE_EDITOR_LAYOUT_ID+"M"+this.dateEditorMonth;
F(L.getDomElement(this.dateEditorMonthID)).addClass("rf-cal-edtr-btn-sel")
}}if(N){var Q;
var O=this.dateEditorStartYear=this.dateEditorStartYear+P*10;
for(var M=0;
M<5;
M++){N=N.nextSibling;
Q=N.firstChild.nextSibling.nextSibling;
Q.firstChild.innerHTML=O;
if(O==this.dateEditorYear){F(Q.firstChild).addClass("rf-cal-edtr-btn-sel");
this.dateEditorYearID=Q.firstChild.id
}Q=Q.nextSibling;
Q.firstChild.innerHTML=O+5;
if(O+5==this.dateEditorYear){F(Q.firstChild).addClass("rf-cal-edtr-btn-sel");
this.dateEditorYearID=Q.firstChild.id
}O++
}}},updateDateEditor:function(){this.dateEditorYear=this.getCurrentYear();
this.dateEditorStartYear=this.getCurrentYear()-4;
this.scrollEditorYear(0)
},updateTimeEditor:function(){var S=L.getDomElement(this.id+"TimeHours");
var R=L.getDomElement(this.id+"TimeSign");
var O=L.getDomElement(this.id+"TimeMinutes");
var Q=this.selectedDate.getHours();
var M=this.selectedDate.getMinutes();
if(this.timeType==2){var N=(Q<12?"AM":"PM");
R.value=N;
Q=(Q==0?"12":(Q>12?Q-12:Q))
}S.value=(this.timeHoursDigits==2&&Q<10?"0"+Q:Q);
O.value=(M<10?"0"+M:M);
if(this.showSeconds){var U=L.getDomElement(this.id+"TimeSeconds");
var P=this.selectedDate.getSeconds();
U.value=(P<10?"0"+P:P)
}},createEditor:function(){var P=F(L.getDomElement(this.CALENDAR_CONTENT));
var O=parseInt(P.css("z-index"),10);
var M='<div id="'+this.EDITOR_SHADOW_ID+'" class="rf-cal-edtr-shdw" style="position:absolute; display:none;z-index:'+O+'"></div><table border="0" cellpadding="0" cellspacing="0" id="'+this.EDITOR_ID+'" style="position:absolute; display:none;z-index:'+(O+1)+'" onclick="RichFaces.$(\''+this.id+'\').skipEventOnCollapse=true;"><tbody><tr><td class="rf-cal-edtr-cntr" align="center"><div style="position:relative; display:inline-block;">';
var Q='<div id="'+this.EDITOR_LAYOUT_SHADOW_ID+'" class="rf-cal-edtr-layout-shdw"></div>';
var N="</div></td></tr></tbody></table>";
P.after(M+Q+N);
this.isEditorCreated=true;
return L.getDomElement(this.EDITOR_ID)
},createTimeEditorLayout:function(N){F(L.getDomElement(this.EDITOR_LAYOUT_SHADOW_ID)).after(this.evaluateMarkup(B.timeEditorLayout,this.calendarContext));
var P=L.getDomElement(this.id+"TimeHours");
var O;
var M=L.getDomElement(this.id+"TimeMinutes");
if(this.timeType==1){sbjQuery(P).SpinButton({digits:this.timeHoursDigits,min:0,max:23})
}else{sbjQuery(P).SpinButton({digits:this.timeHoursDigits,min:1,max:12});
O=L.getDomElement(this.id+"TimeSign");
sbjQuery(O).SpinButton({})
}sbjQuery(M).SpinButton({digits:2,min:0,max:59});
if(this.showSeconds){var Q=L.getDomElement(this.id+"TimeSeconds");
sbjQuery(Q).SpinButton({digits:2,min:0,max:59})
}this.correctEditorButtons(N,this.TIME_EDITOR_BUTTON_OK,this.TIME_EDITOR_BUTTON_CANCEL);
this.isTimeEditorLayoutCreated=true
},correctEditorButtons:function(Q,N,M){var S=L.getDomElement(N);
var P=L.getDomElement(M);
Q.style.visibility="hidden";
Q.style.display="";
var R=F(S.firstChild).width();
var O=F(P.firstChild).width();
Q.style.display="none";
Q.style.visibility="";
if(R!=O){S.style.width=P.style.width=(R>O?R:O)+"px"
}},createDECell:function(R,P,M,Q,O){if(M==0){return'<div id="'+R+'" class="rf-cal-edtr-btn'+(O?" "+O:"")+'" onmouseover="this.className=\'rf-cal-edtr-btn rf-cal-edtr-tl-over\';" onmouseout="this.className=\'rf-cal-edtr-btn\';" onmousedown="this.className=\'rf-cal-edtr-btn rf-cal-edtr-tl-press\';" onmouseup="this.className=\'rf-cal-edtr-btn rf-cal-edtr-tl-over\';" onclick="RichFaces.$(\''+this.id+"').scrollEditorYear("+Q+');">'+P+"</div>"
}else{var N=(M==1?"RichFaces.$('"+this.id+"').dateEditorSelectMonth("+Q+");":"RichFaces.$('"+this.id+"').dateEditorSelectYear("+Q+");");
return'<div id="'+R+'" class="rf-cal-edtr-btn'+(O?" "+O:"")+'" onmouseover="jQuery(this).addClass(\'rf-cal-edtr-btn-over\');" onmouseout="$(this).removeClass(\'rf-cal-edtr-btn-over\');" onclick="'+N+'">'+P+"</div>"
}},createDateEditorLayout:function(Q){var M='<table id="'+this.DATE_EDITOR_LAYOUT_ID+'" class="rf-cal-monthpicker-cnt" border="0" cellpadding="0" cellspacing="0"><tbody><tr id="'+this.DATE_EDITOR_LAYOUT_ID+'TR">';
var N="</tr></tbody></table>";
var R=0;
this.dateEditorYear=this.getCurrentYear();
var P=this.dateEditorStartYear=this.dateEditorYear-4;
var S='<td align="center">'+this.createDECell(this.DATE_EDITOR_LAYOUT_ID+"M"+R,this.options.monthLabelsShort[R],1,R)+'</td><td align="center" class="rf-cal-monthpicker-split">'+this.createDECell(this.DATE_EDITOR_LAYOUT_ID+"M"+(R+6),this.options.monthLabelsShort[R+6],1,R+6)+'</td><td align="center">'+this.createDECell("","&lt;",0,-1)+'</td><td align="center">'+this.createDECell("","&gt;",0,1)+"</td>";
R++;
for(var O=0;
O<5;
O++){S+='</tr><tr><td align="center">'+this.createDECell(this.DATE_EDITOR_LAYOUT_ID+"M"+R,this.options.monthLabelsShort[R],1,R)+'</td><td align="center" class="rf-cal-monthpicker-split">'+this.createDECell(this.DATE_EDITOR_LAYOUT_ID+"M"+(R+6),this.options.monthLabelsShort[R+6],1,R+6)+'</td><td align="center">'+this.createDECell(this.DATE_EDITOR_LAYOUT_ID+"Y"+O,P,2,O,(O==4?"rf-cal-edtr-btn-sel":""))+'</td><td align="center">'+this.createDECell(this.DATE_EDITOR_LAYOUT_ID+"Y"+(O+5),P+5,2,O+5)+"</td>";
R++;
P++
}this.dateEditorYearID=this.DATE_EDITOR_LAYOUT_ID+"Y4";
this.dateEditorMonth=this.getCurrentMonth();
this.dateEditorMonthID=this.DATE_EDITOR_LAYOUT_ID+"M"+this.dateEditorMonth;
S+='</tr><tr><td colspan="2" class="rf-cal-monthpicker-ok"><div id="'+this.DATE_EDITOR_BUTTON_OK+'" class="rf-cal-time-btn" style="float:right;" onmousedown="jQuery(this).addClass(\'rf-cal-time-btn-press\');" onmouseout="jQuery(this).removeClass(\'rf-cal-time-btn-press\');" onmouseup="jQuery(this).removeClass(\'rf-cal-time-btn-press\');" onclick="RichFaces.$(\''+this.id+"').hideDateEditor(true);\"><span>"+this.options.labels.ok+'</span></div></td><td colspan="2" class="rf-cal-monthpicker-cancel"><div id="'+this.DATE_EDITOR_BUTTON_CANCEL+'" class="rf-cal-time-btn" style="float:left;" onmousedown="jQuery(this).addClass(\'rf-cal-time-btn-press\');" onmouseout="jQuery(this).removeClass(\'rf-cal-time-btn-press\');" onmouseup="jQuery(this).removeClass(\'rf-cal-time-btn-press\');" onclick="RichFaces.$(\''+this.id+"').hideDateEditor(false);\"><span>"+this.options.labels.cancel+"</span></div></td>";
F(L.getDomElement(this.EDITOR_LAYOUT_SHADOW_ID)).after(M+S+N);
F(L.getDomElement(this.dateEditorMonthID)).addClass("rf-cal-edtr-btn-sel");
this.correctEditorButtons(Q,this.DATE_EDITOR_BUTTON_OK,this.DATE_EDITOR_BUTTON_CANCEL);
this.isDateEditorLayoutCreated=true
},createSpinnerTable:function(M){return'<table cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="rf-cal-sp-inp-ctnr"><input id="'+M+'" name="'+M+'" class="rf-cal-sp-inp" type="text" /></td><td class="rf-cal-sp-btn"><table border="0" cellspacing="0" cellpadding="0"><tbody><tr><td><div id="'+M+'BtnUp" class="rf-cal-sp-up" onmousedown="this.className=\'rf-cal-sp-up rf-cal-sp-press\'" onmouseup="this.className=\'rf-cal-sp-up\'" onmouseout="this.className=\'rf-cal-sp-up\'"><span></span></div></td></tr><tr><td><div id="'+M+'BtnDown" class="rf-cal-sp-down" onmousedown="this.className=\'rf-cal-sp-down rf-cal-sp-press\'" onmouseup="this.className=\'rf-cal-sp-down\'" onmouseout="this.className=\'rf-cal-sp-down\'"><span></span></div></td></tr></tbody></table></td></tr></tbody></table>'
},setTimeProperties:function(){this.timeType=0;
var Q=this.options.datePattern;
var c=[];
var X=/(\\\\|\\[yMdaHhms])|(y+|M+|d+|a|H{1,2}|h{1,2}|m{2}|s{2})/g;
var V;
while(V=X.exec(Q)){if(!V[1]){c.push({str:V[0],marker:V[2],idx:V.index})
}}var M="";
var d="";
var O,b,N,Y,U,e;
var W=this.id;
var f=function(a){return(a.length==0?R.marker:Q.substring(c[Z-1].str.length+c[Z-1].idx,R.idx+R.str.length))
};
for(var Z=0;
Z<c.length;
Z++){var R=c[Z];
var P=R.marker.charAt(0);
if(P=="y"||P=="M"||P=="d"){M+=f(M)
}else{if(P=="a"){e=true;
d+=f(d)
}else{if(P=="H"){b=true;
O=R.marker.length;
d+=f(d)
}else{if(P=="h"){N=true;
O=R.marker.length;
d+=f(d)
}else{if(P=="m"){Y=true;
d+=f(d)
}else{if(P=="s"){this.showSeconds=true;
d+=f(d)
}}}}}}}this.datePattern=M;
this.timePattern=d;
var S=this;
this.timePatternHtml=d.replace(/(\\\\|\\[yMdaHhms])|(H{1,2}|h{1,2}|m{2}|s{2}|a)/g,function(a,h,g){if(h){return h.charAt(1)
}switch(g){case"a":return"</td><td>"+S.createSpinnerTable(W+"TimeSign")+"</td><td>";
case"H":case"HH":case"h":case"hh":return"</td><td>"+S.createSpinnerTable(W+"TimeHours")+"</td><td>";
case"mm":return"</td><td>"+S.createSpinnerTable(W+"TimeMinutes")+"</td><td>";
case"ss":return"</td><td>"+S.createSpinnerTable(W+"TimeSeconds")+"</td><td>"
}});
this.timePatternHtml='<table border="0" cellpadding="0"><tbody><tr><td>'+this.timePatternHtml+"</td></tr></tbody></table>";
if(Y&&b){this.timeType=1
}else{if(Y&&N&&e){this.timeType=2
}}this.timeHoursDigits=O
},eventOnScroll:function(M){this.hidePopup()
},hidePopup:function(){if(!this.options.popup||!this.isVisible){return 
}if(this.invokeEvent("hide",L.getDomElement(this.id))){if(this.isEditorVisible){this.hideEditor()
}this.scrollElements&&L.Event.unbindScrollEventHandlers(this.scrollElements,this);
this.scrollElements=null;
L.Event.unbind(window.document,"click"+this.namespace);
F(L.getDomElement(this.CALENDAR_CONTENT)).hide();
this.isVisible=false;
if(this.options.defaultLabel&&!this.isFocused){D.call(this,this.options.defaultLabel)
}}},showPopup:function(P){if(!this.isRendered){this.isRendered=true;
this.render()
}this.skipEventOnCollapse=false;
if(P&&P.type=="click"){this.skipEventOnCollapse=true
}if(!this.options.popup||this.isVisible){return 
}var M=L.getDomElement(this.id);
if(this.invokeEvent("show",M,P)){var O=L.getDomElement(this.POPUP_ID);
var Q=O.firstChild;
var N=Q.nextSibling;
if(this.options.defaultLabel){if(!this.isFocused){D.call(this,"")
}}if(Q.value){this.__selectDate(Q.value,false,{event:P,element:M})
}if(this.options.showInput){O=O.children
}else{O=N
}F(L.getDomElement(this.CALENDAR_CONTENT)).setPosition(O,{type:"DROPDOWN",from:this.options.jointPoint,to:this.options.direction,offset:this.popupOffset}).show();
this.isVisible=true;
L.Event.bind(window.document,"click"+this.namespace,this.eventOnCollapse,this);
this.scrollElements&&L.Event.unbindScrollEventHandlers(this.scrollElements,this);
this.scrollElements=null;
if(this.options.hidePopupOnScroll){this.scrollElements=L.Event.bindScrollEventHandlers(M,this.eventOnScroll,this)
}}},switchPopup:function(M){this.isVisible?this.hidePopup():this.showPopup(M)
},eventOnCollapse:function(M){if(this.skipEventOnCollapse){this.skipEventOnCollapse=false;
return true
}if(M.target.id==this.POPUP_BUTTON_ID||(!this.options.enableManualInput&&M.target.id==this.INPUT_DATE_ID)){return true
}this.hidePopup();
return true
},setInputField:function(M,N){var O=L.getDomElement(this.INPUT_DATE_ID);
if(O.value!=M){O.value=M;
this.invokeEvent("change",L.getDomElement(this.id),N,this.selectedDate)
}},getCurrentDate:function(){return this.currentDate
},__getSelectedDate:function(){if(!this.selectedDate){return null
}else{return this.selectedDate
}},__getSelectedDateString:function(M){if(!this.selectedDate){return""
}if(!M){M=this.options.datePattern
}return L.calendarUtils.formatDate(this.selectedDate,M,this.options.monthLabels,this.options.monthLabelsShort)
},getPrevYear:function(){var M=this.currentDate.getFullYear()-1;
if(M<0){M=0
}return M
},getPrevMonth:function(M){var N=this.currentDate.getMonth()-1;
if(N<0){N=11
}if(M){return this.options.monthLabels[N]
}else{return N
}},getCurrentYear:function(){return this.currentDate.getFullYear()
},getCurrentMonth:function(M){var N=this.currentDate.getMonth();
if(M){return this.options.monthLabels[N]
}else{return N
}},getNextYear:function(){return this.currentDate.getFullYear()+1
},getNextMonth:function(M){var N=this.currentDate.getMonth()+1;
if(N>11){N=0
}if(M){return this.options.monthLabels[N]
}else{return N
}},isWeekend:function(M){return(M==this.firstWeekendDayNumber||M==this.secondWeekendDayNumber)
},setupTimeForDate:function(N){var M=new Date(N);
if(this.selectedDate&&(!this.options.resetTimeOnDateSelect||(this.selectedDate.getFullYear()==N.getFullYear()&&this.selectedDate.getMonth()==N.getMonth()&&this.selectedDate.getDate()==N.getDate()))){M=L.calendarUtils.createDate(N.getFullYear(),N.getMonth(),N.getDate(),this.selectedDate.getHours(),this.selectedDate.getMinutes(),this.selectedDate.getSeconds())
}else{M=L.calendarUtils.createDate(N.getFullYear(),N.getMonth(),N.getDate(),this.options.defaultTime.hours,this.options.defaultTime.minutes,this.options.defaultTime.seconds)
}return M
},eventCellOnClick:function(P,O){var N=this.days[parseInt(O.id.substr(this.DATE_ELEMENT_ID.length),10)];
if(N.enabled&&N._month==0){var M=L.calendarUtils.createDate(this.currentDate.getFullYear(),this.currentDate.getMonth(),N.day);
if(this.timeType){M=this.setupTimeForDate(M)
}if(this.__selectDate(M,true,{event:P,element:O})&&!this.options.showApplyButton){this.hidePopup()
}}else{if(N._month!=0){if(this.options.boundaryDatesMode=="scroll"){if(N._month==-1){this.prevMonth()
}else{this.nextMonth()
}}else{if(this.options.boundaryDatesMode=="select"){var M=new Date(N.date);
if(this.timeType){M=this.setupTimeForDate(M)
}if(this.__selectDate(M,false,{event:P,element:O})&&!this.options.showApplyButton){this.hidePopup()
}}}}}},eventCellOnMouseOver:function(O,N){var M=this.days[parseInt(N.id.substr(this.DATE_ELEMENT_ID.length),10)];
if(this.invokeEvent("datemouseover",N,O,M.date)&&M.enabled){if(M._month==0&&N.id!=this.selectedDateCellId&&N.id!=this.todayCellId){F(N).addClass("rf-cal-hov")
}}},eventCellOnMouseOut:function(O,N){var M=this.days[parseInt(N.id.substr(this.DATE_ELEMENT_ID.length),10)];
if(this.invokeEvent("datemouseout",N,O,M.date)&&M.enabled){if(M._month==0&&N.id!=this.selectedDateCellId&&N.id!=this.todayCellId){F(N).removeClass("rf-cal-hov")
}}},load:function(N,M){if(N){this.daysData=this.indexData(N,M)
}else{this.daysData=null
}this.isRendered=false;
if(this.isVisible){this.render()
}if(typeof this.afterLoad=="function"){this.afterLoad();
this.afterLoad=null
}},indexData:function(Q,N){var O=Q.startDate.year;
var P=Q.startDate.month;
Q.startDate=new Date(O,P);
Q.index=[];
Q.index[O+"-"+P]=0;
if(N){this.currentDate=Q.startDate;
this.currentDate.setDate(1);
return Q
}var M=L.calendarUtils.daysInMonthByDate(Q.startDate)-Q.startDate.getDate()+1;
while(Q.days[M]){if(P==11){O++;
P=0
}else{P++
}Q.index[O+"-"+P]=M;
M+=(32-new Date(O,P,32).getDate())
}return Q
},getCellBackgroundColor:function(M){return F(M).css("background-color")
},clearEffect:function(M,N,P){if(M){var O=F(L.getDomElement(M)).stop(true,true);
if(N){O.removeClass(N)
}if(P){O.addClass(P)
}}return null
},render:function(){this.isRendered=true;
this.todayDate=new Date();
var r=this.getCurrentYear();
var d=this.getCurrentMonth();
var X=(r==this.todayDate.getFullYear()&&d==this.todayDate.getMonth());
var c=this.todayDate.getDate();
var f=this.selectedDate&&(r==this.selectedDate.getFullYear()&&d==this.selectedDate.getMonth());
var j=this.selectedDate&&this.selectedDate.getDate();
var S=L.calendarUtils.getDay(this.currentDate,this.options.firstWeekDay);
var R=L.calendarUtils.daysInMonthByDate(this.currentDate);
var M=L.calendarUtils.daysInMonth(r,d-1);
var b=0;
var q=-1;
this.days=[];
var W=M-S+1;
if(S>0){while(W<=M){this.days.push({day:W,isWeekend:this.isWeekend(b),_month:q});
W++;
b++
}}W=1;
q=0;
this.firstDateIndex=b;
if(this.daysData&&this.daysData.index[r+"-"+d]!=undefined){var a=this.daysData.index[r+"-"+d];
if(this.daysData.startDate.getFullYear()==r&&this.daysData.startDate.getMonth()==d){var V=V=(this.daysData.days[a].day?this.daysData.days[a].day:this.daysData.startDate.getDate());
while(W<V){this.days.push({day:W,isWeekend:this.isWeekend(b%7),_month:q});
W++;
b++
}}var i=this.daysData.days.length;
var Y;
var h;
while(a<i&&W<=R){h=this.isWeekend(b%7);
Y=this.daysData.days[a];
Y.day=W;
Y.isWeekend=h;
Y._month=q;
this.days.push(Y);
a++;
W++;
b++
}}while(b<42){if(W>R){W=1;
q=1
}this.days.push({day:W,isWeekend:this.isWeekend(b%7),_month:q});
W++;
b++
}this.renderHF();
b=0;
var N;
var U;
var P;
if(this.options.showWeeksBar){P=L.calendarUtils.weekNumber(r,d,this.options.minDaysInFirstWeek,this.options.firstWeekDay)
}this.selectedDayElement=null;
var Z=true;
var l;
var n=(this.options.boundaryDatesMode=="scroll"||this.options.boundaryDatesMode=="select");
this.todayCellId=this.clearEffect(this.todayCellId);
this.selectedDateCellId=this.clearEffect(this.selectedDateCellId);
var Y=L.getDomElement(this.WEEKNUMBER_BAR_ID+"1");
for(var g=1;
g<7;
g++){U=this.days[b];
N=Y.firstChild;
var m;
if(this.options.showWeeksBar){if(Z&&d==11&&(g==5||g==6)&&(U._month==1||(7-(R-U.day+1))>=this.options.minDaysInFirstWeek)){P=1;
Z=false
}m=P;
N.innerHTML=this.evaluateMarkup(this.options.weekNumberMarkup,{weekNumber:P++,elementId:N.id,component:this});
if(g==1&&P>52){P=1
}N=N.nextSibling
}var s=this.options.firstWeekDay;
var Q=null;
while(N){U.elementId=N.id;
U.date=new Date(r,d+U._month,U.day);
U.weekNumber=m;
U.component=this;
U.isCurrentMonth=(U._month==0);
U.weekDayNumber=s;
if(U.enabled!=false){U.enabled=this.options.isDayEnabled(U)
}if(!U.styleClass){U.customStyleClass=this.options.dayStyleClass(U)
}else{var O=this.options.dayStyleClass(U);
U.customStyleClass=U.styleClass;
if(O){U.customStyleClass+=" "+O
}}Q=(this.customDayListMarkup?N.firstChild:N);
Q.innerHTML=this.hideBoundaryDatesContent&&U._month!=0?"":this.evaluateMarkup(this.options.dayListMarkup,U);
if(s==6){s=0
}else{s++
}var o=this.dayCellClassName[b];
if(U._month!=0){o+=" rf-cal-boundary-day";
if(!this.options.disabled&&!this.options.readonly&&n){o+=" rf-cal-btn"
}}else{if(X&&U.day==c){this.todayCellId=N.id;
this.todayCellColor=this.getCellBackgroundColor(N);
o+=" rf-cal-today"
}if(f&&U.day==j){this.selectedDateCellId=N.id;
this.selectedDateCellColor=this.getCellBackgroundColor(N);
o+=" rf-cal-sel"
}else{if(!this.options.disabled&&!this.options.readonly&&U.enabled){o+=" rf-cal-btn"
}}if(U.customStyleClass){o+=" "+U.customStyleClass
}}N.className=o;
b++;
U=this.days[b];
N=N.nextSibling
}Y=Y.nextSibling
}},renderHF:function(){if(this.options.showHeader){this.renderMarkup(this.options.headerMarkup,this.id+"Header",this.calendarContext)
}if(this.options.showFooter){this.renderMarkup(this.options.footerMarkup,this.id+"Footer",this.calendarContext)
}this.renderHeaderOptional();
this.renderFooterOptional()
},renderHeaderOptional:function(){this.renderMarkup(this.options.optionalHeaderMarkup,this.id+"HeaderOptional",this.calendarContext)
},renderFooterOptional:function(){this.renderMarkup(this.options.optionalFooterMarkup,this.id+"FooterOptional",this.calendarContext)
},renderMarkup:function(N,M,O){if(!N){return 
}var P=L.getDomElement(M);
if(!P){return 
}P.innerHTML=this.evaluateMarkup(N,O)
},evaluateMarkup:function(O,Q){if(!O){return""
}var N=[];
var M;
for(var P=0;
P<O.length;
P++){M=O[P];
if(M.getContent){N.push(M.getContent(Q))
}}return N.join("")
},onUpdate:function(){var M=L.calendarUtils.formatDate(this.getCurrentDate(),"MM/yyyy");
L.getDomElement(this.id+"InputCurrentDate").value=M;
if(this.isAjaxMode&&this.callAjax){this.callAjax.call(this,M)
}else{this.render()
}},callAjax:function(P,M){var R=this;
var O=function(S){var U=S&&S.componentData&&S.componentData[R.id];
R.load(U,true)
};
var N=function(S){};
var Q={};
Q[this.id+".ajax"]="1";
L.ajax(this.id,null,{parameters:Q,error:N,complete:O})
},nextMonth:function(){this.changeCurrentDateOffset(0,1)
},prevMonth:function(){this.changeCurrentDateOffset(0,-1)
},nextYear:function(){this.changeCurrentDateOffset(1,0)
},prevYear:function(){this.changeCurrentDateOffset(-1,0)
},changeCurrentDate:function(N,P,O){if(this.getCurrentMonth()!=P||this.getCurrentYear()!=N){var M=new Date(N,P,1);
if(this.invokeEvent("currentdateselect",L.getDomElement(this.id),null,M)){this.currentDate=M;
if(O){this.render()
}else{this.onUpdate()
}this.invokeEvent("currentdateselect",L.getDomElement(this.id),null,M);
return true
}}return false
},changeCurrentDateOffset:function(N,O){var M=new Date(this.currentDate.getFullYear()+N,this.currentDate.getMonth()+O,1);
if(this.invokeEvent("beforecurrentdateselect",L.getDomElement(this.id),null,M)){this.currentDate=M;
this.onUpdate();
this.invokeEvent("currentdateselect",L.getDomElement(this.id),null,M)
}},today:function(P,R){var N=new Date();
var Q=N.getFullYear();
var S=N.getMonth();
var O=N.getDate();
var M=false;
if(O!=this.todayDate.getDate()){M=true;
this.todayDate=N
}if(Q!=this.currentDate.getFullYear()||S!=this.currentDate.getMonth()){M=true;
this.currentDate=new Date(Q,S,1)
}if(this.options.todayControlMode=="select"){R=true
}if(M){if(P){this.render()
}else{this.onUpdate()
}}else{if(this.isVisible&&this.todayCellId&&!R){this.clearEffect(this.todayCellId);
if(this.todayCellColor!="transparent"){F(L.getDomElement(this.todayCellId)).effect("highlight",{easing:"easeInOutSine",color:this.todayCellColor},300)
}}}if(this.options.todayControlMode=="select"&&!this.options.disabled&&!this.options.readonly){if(M&&!P&&this.submitFunction){this.afterLoad=this.selectToday
}else{this.selectToday()
}}},selectToday:function(){if(this.todayCellId){var O=this.days[parseInt(this.todayCellId.substr(this.DATE_ELEMENT_ID.length),10)];
var M=new Date();
var N=new Date(M);
if(this.timeType){N=this.setupTimeForDate(N)
}if(O.enabled&&this.__selectDate(N,true)&&!this.options.showApplyButton){this.hidePopup()
}}},__selectDate:function(O,N,U){if(!U){U={event:null,element:null}
}var M=this.selectedDate;
var V;
if(O){if(typeof O=="string"){O=L.calendarUtils.parseDate(O,this.options.datePattern,this.options.monthLabels,this.options.monthLabelsShort)
}V=O
}else{V=null
}var Q=true;
var R=false;
if((M-V)&&(M!=null||V!=null)){R=true;
Q=this.invokeEvent("beforedateselect",U.element,U.event,O)
}if(Q){if(V!=null){if(V.getMonth()==this.currentDate.getMonth()&&V.getFullYear()==this.currentDate.getFullYear()){this.selectedDate=V;
if(!M||(M-this.selectedDate)){var P=F(L.getDomElement(this.DATE_ELEMENT_ID+(this.firstDateIndex+this.selectedDate.getDate()-1)));
this.clearEffect(this.selectedDateCellId,"rf-cal-sel",(this.options.disabled||this.options.readonly?null:"rf-cal-btn"));
this.selectedDateCellId=P.attr("id");
this.selectedDateCellColor=this.getCellBackgroundColor(P);
P.removeClass("rf-cal-btn");
P.removeClass("rf-cal-hov");
P.addClass("rf-cal-sel");
this.renderHF()
}else{if(this.timeType!=0){this.renderHF()
}}}else{this.selectedDate=V;
if(this.changeCurrentDate(V.getFullYear(),V.getMonth(),N)){}else{this.selectedDate=M;
R=false
}}}else{this.selectedDate=null;
this.clearEffect(this.selectedDateCellId,"rf-cal-sel",(this.options.disabled||this.options.readonly?null:"rf-cal-btn"));
if(this.selectedDateCellId){this.selectedDateCellId=null;
this.renderHF()
}var O=new Date();
if(this.currentDate.getMonth()==O.getMonth()&&this.currentDate.getFullYear()==O.getFullYear()){this.renderHF()
}var S=this.options.todayControlMode;
this.options.todayControlMode="";
this.today(N,true);
this.options.todayControlMode=S
}if(R){this.invokeEvent("dateselect",U.element,U.event,this.selectedDate);
if(!this.options.showApplyButton){this.setInputField(this.selectedDate!=null?this.__getSelectedDateString(this.options.datePattern):"",U.event)
}}}return R
},__resetSelectedDate:function(){if(!this.selectedDate){return 
}if(this.invokeEvent("beforedateselect",null,null,null)){this.selectedDate=null;
this.invokeEvent("dateselect",null,null,null);
this.selectedDateCellId=this.clearEffect(this.selectedDateCellId,"rf-cal-sel",(this.options.disabled||this.options.readonly?null:"rf-cal-btn"));
this.invokeEvent("clean",null,null,null);
this.renderHF();
if(!this.options.showApplyButton){this.setInputField("",null);
this.hidePopup()
}}},showSelectedDate:function(){if(!this.selectedDate){return 
}if(this.currentDate.getMonth()!=this.selectedDate.getMonth()||this.currentDate.getFullYear()!=this.selectedDate.getFullYear()){this.currentDate=new Date(this.selectedDate);
this.currentDate.setDate(1);
this.onUpdate()
}else{if(this.isVisible&&this.selectedDateCellId){this.clearEffect(this.selectedDateCellId);
if(this.selectedDateCellColor!="transparent"){F(L.getDomElement(this.selectedDateCellId)).effect("highlight",{easing:"easeInOutSine",color:this.selectedDateCellColor},300)
}}}},close:function(M){if(M){this.setInputField(this.__getSelectedDateString(this.options.datePattern),null)
}this.hidePopup()
},clonePosition:function(M,N,R){var Q=F(M);
if(!N.length){N=[N]
}R=R||{left:0,top:0};
var O=Q.outerWidth()+"px",X=Q.outerHeight()+"px";
var W=Q.position();
var P=Math.floor(W.left)+R.left+"px",V=Math.floor(W.top)+R.top+"px";
var U;
for(var S=0;
S<N.length;
S++){U=N[S];
U.style.width=O;
U.style.height=X;
U.style.left=P;
U.style.top=V
}},showTimeEditor:function(){var N;
if(this.timeType==0){return 
}if(!this.isEditorCreated){N=this.createEditor()
}else{N=L.getDomElement(this.EDITOR_ID)
}if(!this.isTimeEditorLayoutCreated){this.createTimeEditorLayout(N)
}F(L.getDomElement(this.TIME_EDITOR_LAYOUT_ID)).show();
var M=L.getDomElement(this.EDITOR_SHADOW_ID);
this.clonePosition(L.getDomElement(this.CALENDAR_CONTENT),[N,M]);
this.updateTimeEditor();
F(M).show();
F(N).show();
this.clonePosition(L.getDomElement(this.TIME_EDITOR_LAYOUT_ID),L.getDomElement(this.EDITOR_LAYOUT_SHADOW_ID),{left:3,top:3});
this.isEditorVisible=true
},hideEditor:function(){if(this.isTimeEditorLayoutCreated){F(L.getDomElement(this.TIME_EDITOR_LAYOUT_ID)).hide()
}if(this.isDateEditorLayoutCreated){F(L.getDomElement(this.DATE_EDITOR_LAYOUT_ID)).hide()
}F(L.getDomElement(this.EDITOR_ID)).hide();
F(L.getDomElement(this.EDITOR_SHADOW_ID)).hide();
this.isEditorVisible=false
},hideTimeEditor:function(O){this.hideEditor();
if(O&&this.selectedDate){var Q=this.showSeconds?parseInt(L.getDomElement(this.id+"TimeSeconds").value,10):this.options.defaultTime.seconds;
var M=parseInt(L.getDomElement(this.id+"TimeMinutes").value,10);
var P=parseInt(L.getDomElement(this.id+"TimeHours").value,10);
if(this.timeType==2){if(L.getDomElement(this.id+"TimeSign").value.toLowerCase()=="am"){if(P==12){P=0
}}else{if(P!=12){P+=12
}}}var N=L.calendarUtils.createDate(this.selectedDate.getFullYear(),this.selectedDate.getMonth(),this.selectedDate.getDate(),P,M,Q);
if(N-this.selectedDate&&this.invokeEvent("beforetimeselect",null,null,N)){this.selectedDate=N;
this.renderHF();
if(!this.options.popup||!this.options.showApplyButton){this.setInputField(this.__getSelectedDateString(this.options.datePattern),null)
}this.invokeEvent("timeselect",null,null,this.selectedDate)
}}if(this.options.popup&&!this.options.showApplyButton){this.close(false)
}},showDateEditor:function(){var N;
if(!this.isEditorCreated){N=this.createEditor()
}else{N=L.getDomElement(this.EDITOR_ID)
}if(!this.isDateEditorLayoutCreated){this.createDateEditorLayout(N)
}else{this.updateDateEditor()
}F(L.getDomElement(this.DATE_EDITOR_LAYOUT_ID)).show();
var M=L.getDomElement(this.EDITOR_SHADOW_ID);
this.clonePosition(L.getDomElement(this.CALENDAR_CONTENT),[N,M]);
F(M).show();
F(N).show();
this.clonePosition(L.getDomElement(this.DATE_EDITOR_LAYOUT_ID),L.getDomElement(this.EDITOR_LAYOUT_SHADOW_ID),{left:3,top:3});
this.isEditorVisible=true
},hideDateEditor:function(M){this.hideEditor();
if(M){this.changeCurrentDate(this.dateEditorYear,this.dateEditorMonth)
}},getValue:function(){return this.__getSelectedDate()
},getValueAsString:function(M){return this.__getSelectedDateString(M)
},setValue:function(M){this.__selectDate(M)
},resetValue:function(){this.__resetSelectedDate();
if(this.options.defaultLabel&&!this.isFocused){D.call(this,this.options.defaultLabel)
}},getNamespace:function(){return this.namespace
}})
})(jQuery,RichFaces);;(function(G,J){J.ui=J.ui||{};
J.ui.List=function(N,K){I.constructor.call(this,N);
this.namespace=this.namespace||"."+J.Event.createNamespace(this.name,this.id);
this.attachToDom();
var M=G.extend({},F,K);
this.list=G(document.getElementById(N));
this.selectListener=M.selectListener;
this.selectItemCss=M.selectItemCss;
this.selectItemCssMarker=M.selectItemCss.split(" ",1)[0];
this.scrollContainer=G(M.scrollContainer);
this.itemCss=M.itemCss.split(" ",1)[0];
this.listCss=M.listCss;
this.clickRequiredToSelect=M.clickRequiredToSelect;
this.index=-1;
this.disabled=M.disabled;
this.focusKeeper=G(document.getElementById(N+"FocusKeeper"));
this.focusKeeper.focused=false;
this.lastMouseX=null;
this.lastMouseY=null;
this.isMouseDown=false;
this.list.bind("mousedown",G.proxy(this.__onMouseDown,this)).bind("mouseup",G.proxy(this.__onMouseUp,this));
C.call(this);
if(M.focusKeeperEnabled){B.call(this)
}this.__updateItemsList();
if(M.clientSelectItems!==null){var L=[];
G.each(M.clientSelectItems,function(O){L[this.id]=this
});
this.__storeClientSelectItems(this.items,L)
}};
J.BaseComponent.extend(J.ui.List);
var I=J.ui.List.$super;
var F={clickRequiredToSelect:false,disabled:false,selectListener:false,clientSelectItems:null,focusKeeperEnabled:true};
var C=function(){var K={};
K["click"+this.namespace]=G.proxy(this.onClick,this);
K["dblclick"+this.namespace]=G.proxy(this.onDblclick,this);
K["mouseover"+this.namespace]=H;
if(!G.browser.msie&&!G.browser.opera){K["mouseenter"+this.namespace]=A;
K["mouseleave"+this.namespace]=E
}J.Event.bind(this.list,K,this)
};
var B=function(){var K={};
K[(G.browser.opera||G.browser.mozilla?"keypress":"keydown")+this.namespace]=G.proxy(this.__keydownHandler,this);
K["blur"+this.namespace]=G.proxy(this.__blurHandler,this);
K["focus"+this.namespace]=G.proxy(this.__focusHandler,this);
J.Event.bind(this.focusKeeper,K,this)
};
var E=function(K){J.Event.unbind(this.list,"mousemove"+this.namespace);
this.lastMouseX=null;
this.lastMouseY=null
};
var D=function(K){this.lastMouseX=K.pageX;
this.lastMouseY=K.pageY
};
var A=function(K){this.lastMouseX=K.pageX;
this.lastMouseY=K.pageY;
J.Event.bind(this.list,"mousemove"+this.namespace,D,this)
};
var H=function(L){if(this.lastMouseX==null||this.lastMouseX!=L.pageX||this.lastMouseY!=L.pageY){var K=this.__getItem(L);
if(K&&!this.clickRequiredToSelect&&!this.disabled){this.__select(K)
}}};
G.extend(J.ui.List.prototype,(function(){return{name:"list",processItem:function(K){if(this.selectListener.processItem&&typeof this.selectListener.processItem=="function"){this.selectListener.processItem(K)
}},isSelected:function(K){return K.hasClass(this.selectItemCssMarker)
},selectItem:function(K){if(this.selectListener.selectItem&&typeof this.selectListener.selectItem=="function"){this.selectListener.selectItem(K)
}else{K.addClass(this.selectItemCss);
J.Event.fire(this,"selectItem",K)
}this.__scrollToSelectedItem(this)
},unselectItem:function(K){if(this.selectListener.unselectItem&&typeof this.selectListener.unselectItem=="function"){this.selectListener.unselectItem(K)
}else{K.removeClass(this.selectItemCss);
J.Event.fire(this,"unselectItem",K)
}},__focusHandler:function(K){if(!this.focusKeeper.focused){this.focusKeeper.focused=true;
J.Event.fire(this,"listfocus"+this.namespace,K)
}},__blurHandler:function(L){if(!this.isMouseDown){var K=this;
this.timeoutId=window.setTimeout(function(){K.focusKeeper.focused=false;
K.invokeEvent.call(K,"blur",document.getElementById(K.id),L);
J.Event.fire(K,"listblur"+K.namespace,L)
},200)
}else{this.isMouseDown=false
}},__onMouseDown:function(K){this.isMouseDown=true
},__onMouseUp:function(K){this.isMouseDown=false
},__keydownHandler:function(L){if(L.isDefaultPrevented()){return 
}if(L.metaKey||L.ctrlKey){return 
}var K;
if(L.keyCode){K=L.keyCode
}else{if(L.which){K=L.which
}}switch(K){case J.KEYS.DOWN:L.preventDefault();
this.__selectNext();
break;
case J.KEYS.UP:L.preventDefault();
this.__selectPrev();
break;
case J.KEYS.HOME:L.preventDefault();
this.__selectByIndex(0);
break;
case J.KEYS.END:L.preventDefault();
this.__selectByIndex(this.items.length-1);
break;
default:break
}},onClick:function(L){this.setFocus();
var K=this.__getItem(L);
this.processItem(K);
var M=L.metaKey||L.ctrlKey;
if(!this.disabled){this.__select(K,M&&this.clickRequiredToSelect)
}},onDblclick:function(L){this.setFocus();
var K=this.__getItem(L);
this.processItem(K);
if(!this.disabled){this.__select(K,false)
}},currentSelectItem:function(){if(this.items&&this.index!=-1){return G(this.items[this.index])
}},getSelectedItemIndex:function(){return this.index
},removeItems:function(K){G(K).detach();
this.__updateItemsList();
J.Event.fire(this,"removeitems",K)
},removeAllItems:function(){var K=this.__getItems();
this.removeItems(K);
return K
},addItems:function(K){var L=this.scrollContainer;
L.append(K);
this.__updateItemsList();
J.Event.fire(this,"additems",K)
},move:function(K,M){if(M===0){return 
}var L=this;
if(M>0){K=G(K.get().reverse())
}K.each(function(P){var O=L.items.index(this);
var N=O+M;
var Q=L.items[N];
if(M<0){G(this).insertBefore(Q)
}else{G(this).insertAfter(Q)
}L.index=L.index+M;
L.__updateItemsList()
});
J.Event.fire(this,"moveitems",K)
},getItemByIndex:function(K){if(K>=0&&K<this.items.length){return this.items[K]
}},getClientSelectItemByIndex:function(K){if(K>=0&&K<this.items.length){return G(this.items[K]).data("clientSelectItem")
}},resetSelection:function(){var K=this.currentSelectItem();
if(K){this.unselectItem(G(K))
}this.index=-1
},isList:function(K){var L=K.parents("."+this.listCss).attr("id");
return(L&&(L==this.getId()))
},length:function(){return this.items.length
},__updateIndex:function(L){if(L===null){this.index=-1
}else{var K=this.items.index(L);
if(K<0){K=0
}else{if(K>=this.items.length){K=this.items.length-1
}}this.index=K
}},__updateItemsList:function(){return(this.items=this.list.find("."+this.itemCss))
},__storeClientSelectItems:function(K,L){K.each(function(M){var N=G(this);
var P=N.attr("id");
var O=L[P];
N.data("clientSelectItem",O)
})
},__select:function(L,M){var K=this.items.index(L);
this.__selectByIndex(K,M)
},__selectByIndex:function(K,M){if(!this.__isSelectByIndexValid(K)){return 
}if(!this.clickRequiredToSelect&&this.index==K){return 
}var N=this.__unselectPrevious();
if(this.clickRequiredToSelect&&N==K){return 
}this.index=this.__sanitizeSelectedIndex(K);
var L=this.items.eq(this.index);
if(this.isSelected(L)){this.unselectItem(L)
}else{this.selectItem(L)
}},__isSelectByIndexValid:function(K){if(this.items.length==0){return false
}if(K==undefined){this.index=-1;
return false
}return true
},__sanitizeSelectedIndex:function(L){var K;
if(L<0){K=0
}else{if(L>=this.items.length){K=this.items.length-1
}else{K=L
}}return K
},__unselectPrevious:function(){var L=this.index;
if(L!=-1){var K=this.items.eq(L);
this.unselectItem(K);
this.index=-1
}return L
},__selectItemByValue:function(M){var L=null;
this.resetSelection();
var K=this;
this.__getItems().each(function(N){if(G(this).data("clientSelectItem").value==M){K.__selectByIndex(N);
L=G(this);
return false
}});
return L
},csvEncodeValues:function(){var K=new Array();
this.__getItems().each(function(L){K.push(G(this).data("clientSelectItem").value)
});
return K.join(",")
},__selectCurrent:function(){var K;
if(this.items&&this.index>=0){K=this.items.eq(this.index);
this.processItem(K)
}},__getAdjacentIndex:function(L){var K=this.index+L;
if(K<0){K=this.items.length-1
}else{if(K>=this.items.length){K=0
}}return K
},__selectPrev:function(){this.__selectByIndex(this.__getAdjacentIndex(-1))
},__selectNext:function(){this.__selectByIndex(this.__getAdjacentIndex(1))
},__getItem:function(K){return G(K.target).closest("."+this.itemCss,K.currentTarget).get(0)
},__getItems:function(){return this.items
},__setItems:function(K){this.items=K
},__scrollToSelectedItem:function(){if(this.scrollContainer){var L=0;
this.items.slice(0,this.index).each(function(){L+=this.offsetHeight
});
var K=this.scrollContainer;
if(L<K.scrollTop()){K.scrollTop(L)
}else{L+=this.items.get(this.index).offsetHeight;
if(L-K.scrollTop()>K.get(0).clientHeight){K.scrollTop(L-K.innerHeight())
}}}},setFocus:function(){this.focusKeeper.focus()
}}
})())
})(jQuery,window.RichFaces);;(function(E,B){B.ui=B.ui||{};
B.ui.TooltipMode={client:"client",ajax:"ajax",DEFAULT:"client"};
var A=B.ui.TooltipMode;
var D={jointPoint:"AA",direction:"AA",offset:[10,10],attached:true,mode:A.DEFAULT,hideDelay:0,hideEvent:"mouseleave",showDelay:0,showEvent:"mouseenter",followMouse:true};
var C={exec:function(H,G){var I=H.mode;
if(I==A.ajax){return this.execAjax(H,G)
}else{if(I==A.client){return this.execClient(H,G)
}else{B.log.error("SHOW_ACTION.exec : unknown mode ("+I+")")
}}},execAjax:function(H,G){H.__loading().show();
H.__content().hide();
H.__show(G);
B.ajax(H.id,null,E.extend({},H.options.ajax,{}));
return true
},execClient:function(H,G){H.__show(G);
return H.__fireShow()
}};
B.ui.Tooltip=B.BaseComponent.extendClass({name:"Tooltip",init:function(I,H){F.constructor.call(this,I);
this.namespace="."+B.Event.createNamespace(this.name,this.id);
this.options=E.extend(this.options,D,H||{});
this.attachToDom();
this.mode=this.options.mode;
this.target=this.options.target;
this.shown=false;
this.__addUserEventHandler("hide");
this.__addUserEventHandler("show");
this.__addUserEventHandler("beforehide");
this.__addUserEventHandler("beforeshow");
this.popupId=this.id+":wrp";
this.popup=new B.ui.Popup(this.popupId,{attachTo:this.target,attachToBody:true,positionType:"TOOLTIP",positionOffset:this.options.offset,jointPoint:this.options.jointPoint,direction:this.options.direction});
var G={};
G[this.options.showEvent+this.namespace]=this.__showHandler;
G[this.options.hideEvent+this.namespace]=this.__hideHandler;
B.Event.bindById(this.target,G,this);
if(this.options.hideEvent=="mouseleave"){B.Event.bindById(this.popupId,this.options.hideEvent+this.namespace,this.__hideHandler,this)
}},hide:function(){var G=this;
if(G.hidingTimerHandle){window.clearTimeout(G.hidingTimerHandle);
G.hidingTimerHandle=undefined
}if(this.shown){this.__hide()
}},__hideHandler:function(G){if(G.type=="mouseleave"&&this.__isInside(G.relatedTarget)){return 
}this.hide();
if(this.options.followMouse){B.Event.unbindById(this.target,"mousemove"+this.namespace)
}},__hide:function(){var G=this;
this.__delay(this.options.hideDelay,function(){G.__fireBeforeHide();
G.popup.hide();
G.shown=false;
G.__fireHide()
})
},__mouseMoveHandler:function(G){this.saveShowEvent=G;
if(this.shown){this.popup.show(this.saveShowEvent)
}},__showHandler:function(G){this.show(G);
var H=this;
if(H.options.followMouse){B.Event.bindById(H.target,"mousemove"+H.namespace,H.__mouseMoveHandler,H)
}},show:function(G){var H=this;
if(H.hidingTimerHandle){window.clearTimeout(H.hidingTimerHandle);
H.hidingTimerHandle=undefined
}if(!this.shown){C.exec(this,G)
}},onCompleteHandler:function(){this.__content().show();
this.__loading().hide();
return this.__fireShow()
},__show:function(G){var H=this;
this.__delay(this.options.showDelay,function(){if(!H.options.followMouse){H.saveShowEvent=G
}if(!H.shown){H.__fireBeforeShow();
H.popup.show(H.saveShowEvent)
}H.shown=true
})
},__delay:function(G,I){var H=this;
if(G>0){H.hidingTimerHandle=window.setTimeout(function(){I();
if(H.hidingTimerHandle){window.clearTimeout(H.hidingTimerHandle);
H.hidingTimerHandle=undefined
}},G)
}else{I()
}},__detectAncestorNode:function(G,H){var I=G;
while(I!=null&&I!=H){I=I.parentNode
}return(I!=null)
},__loading:function(){return E(document.getElementById(this.id+":loading"))
},__content:function(){return E(document.getElementById(this.id+":content"))
},__fireHide:function(){return B.Event.fireById(this.id,"hide",{id:this.id})
},__fireShow:function(){return B.Event.fireById(this.id,"show",{id:this.id})
},__fireBeforeHide:function(){return B.Event.fireById(this.id,"beforehide",{id:this.id})
},__fireBeforeShow:function(){return B.Event.fireById(this.id,"beforeshow",{id:this.id})
},__addUserEventHandler:function(G){var H=this.options["on"+G];
if(H){B.Event.bindById(this.id,G+this.namespace,H)
}},__contains:function(H,G){while(G){if(H==G.id){return true
}G=G.parentNode
}return false
},__isInside:function(G){return this.__contains(this.target,G)||this.__contains(this.popupId,G)
},destroy:function(){B.Event.unbindById(this.popupId,this.namespace);
B.Event.unbindById(this.target,this.namespace);
this.popup.destroy();
this.popup=null;
F.destroy.call(this)
}});
var F=B.ui.Tooltip.$super
})(jQuery,RichFaces);;(function(B,A){A.ui=A.ui||{};
A.ui.MenuKeyNavigation={__updateItemsList:function(){var C=B("."+this.options.cssClasses.listContainerCss+":first",this.popup.popup).find(">."+this.options.cssClasses.itemCss).not("."+this.options.cssClasses.disabledItemCss);
return(this.items=C)
},__selectPrev:function(){if(-1==this.currentSelectedItemIndex){this.currentSelectedItemIndex=this.items.length-1
}else{this.__deselectCurrentItem()
}if(this.currentSelectedItemIndex>0){this.currentSelectedItemIndex--
}else{this.currentSelectedItemIndex=this.items.length-1
}this.__selectCurrentItem()
},__selectNext:function(){if(-1!=this.currentSelectedItemIndex){this.__deselectCurrentItem()
}if(this.currentSelectedItemIndex<this.items.length-1){this.currentSelectedItemIndex++
}else{this.currentSelectedItemIndex=0
}this.__selectCurrentItem()
},__deselectCurrentItem:function(){this.__deselectByIndex(this.currentSelectedItemIndex)
},__selectCurrentItem:function(){this.__selectByIndex(this.currentSelectedItemIndex)
},__selectFirstItem:function(){this.currentSelectedItemIndex=0;
this.__selectCurrentItem()
},__selectByIndex:function(C){if(-1!=C){A.$(this.items.eq(C)).select()
}},__deselectByIndex:function(C){if(C>-1){A.$(this.items.eq(C)).unselect()
}},__openGroup:function(){var C=this.__getItemByIndex(this.currentSelectedItemIndex);
if(this.__isGroup(C)){A.$(C).show();
A.$(C).__selectFirstItem();
this.active=false
}},__closeGroup:function(){var C=this.__getItemByIndex(this.currentSelectedItemIndex);
if(this.__isGroup(C)){A.$(C).__deselectCurrentItem();
A.$(C).hide();
this.active=true
}},__returnToParentMenu:function(){var C=this.__getItemByIndex(this.currentSelectedItemIndex);
var D;
D=this.__getParentMenu()||this.__getParentMenuFromItem(C);
if(D!=null&&this.id!=A.$(D).id){this.hide();
A.$(D).popupElement.focus()
}else{this.hide()
}},__activateMenuItem:function(){var C=this.__getCurrentItem();
if(C){menuItemId=C.attr("id");
this.activateItem(menuItemId)
}},__getItemByIndex:function(C){if(C>-1){return this.items.eq(C)
}else{return null
}},__getCurrentItem:function(){return this.__getItemByIndex(this.currentSelectedItemIndex)
},__keydownHandler:function(D){var C;
if(D.keyCode){C=D.keyCode
}else{if(D.which){C=D.which
}}activeMenu=A.ui.MenuManager.getActiveSubMenu();
if(this.popup.isVisible()){switch(C){case A.KEYS.DOWN:D.preventDefault();
activeMenu.__selectNext();
break;
case A.KEYS.UP:D.preventDefault();
activeMenu.__selectPrev();
break;
case A.KEYS.LEFT:D.preventDefault();
activeMenu.__returnToParentMenu();
break;
case A.KEYS.RIGHT:D.preventDefault();
activeMenu.__openGroup();
break;
case A.KEYS.ESC:D.preventDefault();
activeMenu.__returnToParentMenu();
break;
case A.KEYS.RETURN:D.preventDefault();
activeMenu.__activateMenuItem();
break
}D.stopPropagation()
}}}
})(jQuery,RichFaces);;(function(C,B){B.ui=B.ui||{};
B.ui.ListMulti=function(G,E){this.namespace=this.namespace||"."+B.Event.createNamespace(this.name,G);
var F=C.extend({},A,E);
D.constructor.call(this,G,F);
this.disabled=F.disabled
};
B.ui.List.extend(B.ui.ListMulti);
var D=B.ui.ListMulti.$super;
var A={clickRequiredToSelect:true};
C.extend(B.ui.ListMulti.prototype,(function(){return{name:"listMulti",getSelectedItems:function(){return this.list.find("."+this.selectItemCssMarker)
},removeSelectedItems:function(){var E=this.getSelectedItems();
this.removeItems(E);
return E
},__selectByIndex:function(E,H){if(!this.__isSelectByIndexValid(E)){return 
}this.index=this.__sanitizeSelectedIndex(E);
var G=this.items.eq(this.index);
if(!H){var F=this;
this.getSelectedItems().each(function(){F.unselectItem(C(this))
});
this.selectItem(G)
}else{if(this.isSelected(G)){this.unselectItem(G)
}else{this.selectItem(G)
}}}}
})())
})(jQuery,window.RichFaces);;(function(C,B){B.ui=B.ui||{};
var A={mode:"server",attachToBody:false,showDelay:50,hideDelay:300,verticalOffset:0,horizontalOffset:0,showEvent:"mouseover",positionOffset:[0,0],cssRoot:"ddm",cssClasses:{}};
B.ui.MenuBase=function(G,F){D.constructor.call(this,G,F);
this.id=G;
this.namespace=this.namespace||"."+B.Event.createNamespace(this.name,this.id);
this.options={};
C.extend(this.options,A,F||{});
C.extend(this.options.cssClasses,E.call(this,this.options.cssRoot));
this.attachToDom(G);
this.element=B.getDomElement(this.id);
this.displayed=false;
this.options.positionOffset=[this.options.horizontalOffset,this.options.verticalOffset];
this.popup=new RichFaces.ui.Popup(this.id+"_list",{attachTo:this.id,direction:this.options.direction,jointPoint:this.options.jointPoint,positionType:this.options.positionType,positionOffset:this.options.positionOffset,attachToBody:this.options.attachToBody});
this.selectedGroup=null;
B.Event.bindById(this.id,"mouseenter",C.proxy(this.__overHandler,this),this);
B.Event.bindById(this.id,"mouseleave",C.proxy(this.__leaveHandler,this),this);
this.popupElement=B.getDomElement(this.popup.id);
this.popupElement.tabIndex=-1;
this.__updateItemsList();
B.Event.bind(this.items,"mouseenter",C.proxy(this.__itemMouseEnterHandler,this),this);
this.currentSelectedItemIndex=-1;
var H;
H={};
H["keydown"+this.namespace]=this.__keydownHandler;
B.Event.bind(this.popupElement,H,this)
};
var E=function(G){var F={itemCss:"rf-"+G+"-itm",selectItemCss:"rf-"+G+"-itm-sel",unselectItemCss:"rf-"+G+"-itm-unsel",disabledItemCss:"rf-"+G+"-itm-dis",labelCss:"rf-"+G+"-lbl",listCss:"rf-"+G+"-lst",listContainerCss:"rf-"+G+"-lst-bg"};
return F
};
B.BaseComponent.extend(B.ui.MenuBase);
var D=B.ui.MenuBase.$super;
C.extend(B.ui.MenuBase.prototype,(function(){return{name:"MenuBase",show:function(){this.__showPopup()
},hide:function(){this.__hidePopup()
},processItem:function(F){if(F&&F.attr("id")&&!this.__isDisabled(F)&&!this.__isGroup(F)){this.invokeEvent("itemclick",B.getDomElement(this.id),null);
this.hide()
}},activateItem:function(G){var F=C(RichFaces.getDomElement(G));
B.Event.fireById(F.attr("id"),"click")
},__showPopup:function(F){if(!this.__isShown()){this.invokeEvent("show",B.getDomElement(this.id),null);
this.popup.show(F);
this.displayed=true;
B.ui.MenuManager.setActiveSubMenu(B.$(this.element))
}this.popupElement.focus()
},__hidePopup:function(){window.clearTimeout(this.showTimeoutId);
this.showTimeoutId=null;
if(this.__isShown()){this.invokeEvent("hide",B.getDomElement(this.id),null);
this.__closeChildGroups();
this.popup.hide();
this.displayed=false;
this.__deselectCurrentItem();
this.currentSelectedItemIndex=-1;
var F=B.$(this.__getParentMenu());
if(this.id!=F.id){F.popupElement.focus();
B.ui.MenuManager.setActiveSubMenu(F)
}}},__closeChildGroups:function(){var F=0;
var G;
for(F in this.items){G=this.items.eq(F);
if(this.__isGroup(G)){B.$(G).hide()
}}},__getParentMenuFromItem:function(F){var G;
if(F){G=F.parents("div."+this.options.cssClasses.itemCss).has("div."+this.options.cssClasses.listContainerCss).eq(1)
}if(G&&G.length>0){return G
}else{G=F.parents("div."+this.options.cssClasses.labelCss);
if(G&&G.length>0){return G
}else{return null
}}},__getParentMenu:function(){var G=C(this.element).parents("div."+this.options.cssClasses.itemCss).has("div."+this.options.cssClasses.listContainerCss).eq(0);
if(G&&G.length>0){return G
}else{var F=this.items.eq(0);
return this.__getParentMenuFromItem(F)
}},__isGroup:function(F){return F.find("div."+this.options.cssClasses.listCss).length>0
},__isDisabled:function(F){return F.hasClass(this.options.cssClasses.disabledItemCss)
},__isShown:function(){return this.displayed
},__itemMouseEnterHandler:function(G){var F=this.__getItemFromEvent(G);
if(F){if(this.currentSelectedItemIndex!=this.items.index(F)){this.__deselectCurrentItem();
this.currentSelectedItemIndex=this.items.index(F)
}}},__selectItem:function(F){if(!B.$(F).isSelected){B.$(F).select()
}},__getItemFromEvent:function(F){return C(F.target).closest("."+this.options.cssClasses.itemCss,F.currentTarget).eq(0)
},__showHandler:function(F){if(!this.__isShown()){this.showTimeoutId=window.setTimeout(C.proxy(function(){this.show(F)
},this),this.options.showDelay);
return false
}},__leaveHandler:function(){this.hideTimeoutId=window.setTimeout(C.proxy(function(){this.hide()
},this),this.options.hideDelay)
},__overHandler:function(){window.clearTimeout(this.hideTimeoutId);
this.hideTimeoutId=null
},destroy:function(){this.detach(this.id);
B.Event.unbind(this.popupElement,"keydown"+this.namespace);
this.popup.destroy();
this.popup=null;
D.destroy.call(this)
}}
})())
})(jQuery,RichFaces);;(function(C,B){B.ui=B.ui||{};
var A={showEvent:"mouseenter",direction:"AA",jointPoint:"AA",positionType:"DDMENUGROUP",showDelay:300};
B.ui.MenuGroup=function(F,E){this.id=F;
this.options={};
C.extend(this.options,A,E||{});
D.constructor.call(this,F,this.options);
this.namespace=this.namespace||"."+B.Event.createNamespace(this.name,this.id);
this.attachToDom(F);
B.Event.bindById(this.id,this.options.showEvent,C.proxy(this.__showHandler,this),this);
this.rootMenu=B.$(this.options.rootMenuId);
this.shown=false;
this.jqueryElement=C(this.element)
};
B.ui.MenuBase.extend(B.ui.MenuGroup);
var D=B.ui.MenuGroup.$super;
C.extend(B.ui.MenuGroup.prototype,B.ui.MenuKeyNavigation);
C.extend(B.ui.MenuGroup.prototype,(function(){return{name:"MenuGroup",show:function(){var E=this.id;
if(this.rootMenu.groupList[E]&&!this.shown){this.rootMenu.invokeEvent("groupshow",B.getDomElement(this.rootMenu.id),null);
this.__showPopup();
this.shown=true
}},hide:function(){var E=this.rootMenu;
if(E.groupList[this.id]&&this.shown){E.invokeEvent("grouphide",B.getDomElement(E.id),null);
this.__hidePopup();
this.shown=false
}},select:function(){this.jqueryElement.removeClass(this.options.cssClasses.unselectItemCss);
this.jqueryElement.addClass(this.options.cssClasses.selectItemCss)
},unselect:function(){this.jqueryElement.removeClass(this.options.cssClasses.selectItemCss);
this.jqueryElement.addClass(this.options.cssClasses.unselectItemCss)
},__showHandler:function(){this.select();
D.__showHandler.call(this)
},__leaveHandler:function(){window.clearTimeout(this.showTimeoutId);
this.showTimeoutId=null;
this.hideTimeoutId=window.setTimeout(C.proxy(function(){this.hide()
},this),this.options.hideDelay);
this.unselect()
},destroy:function(){this.detach(this.id);
D.destroy.call(this)
}}
})())
})(jQuery,RichFaces);;(function(C,B){B.ui=B.ui||{};
var A={positionType:"DROPDOWN",direction:"AA",jointPoint:"AA",cssRoot:"ddm",cssClasses:{}};
B.ui.Menu=function(G,F){this.options={};
C.extend(this.options,A,F||{});
C.extend(this.options.cssClasses,E.call(this,this.options.cssRoot));
D.constructor.call(this,G,this.options);
this.id=G;
this.namespace=this.namespace||"."+B.Event.createNamespace(this.name,this.id);
this.groupList=new Array();
this.target=this.getTarget();
if(this.target){var H=this;
C(document).ready(function(){var I=RichFaces.$(H.target);
if(I&&I.contextMenuAttach){I.contextMenuAttach(H)
}else{B.Event.bindById(H.target,H.options.showEvent,C.proxy(H.__showHandler,H),H)
}})
}this.element=C(B.getDomElement(this.id));
if(!B.ui.MenuManager){B.ui.MenuManager={}
}this.menuManager=B.ui.MenuManager
};
var E=function(G){var F={selectMenuCss:"rf-"+G+"-sel",unselectMenuCss:"rf-"+G+"-unsel"};
return F
};
B.ui.MenuBase.extend(B.ui.Menu);
var D=B.ui.Menu.$super;
C.extend(B.ui.Menu.prototype,B.ui.MenuKeyNavigation);
C.extend(B.ui.Menu.prototype,(function(){return{name:"Menu",initiateGroups:function(F){for(var H in F){var G=F[H].id;
if(null!=G){this.groupList[G]=new RichFaces.ui.MenuGroup(G,{rootMenuId:this.id,onshow:F[H].onshow,onhide:F[H].onhide,horizontalOffset:F[H].horizontalOffset,verticalOffset:F[H].verticalOffset,jointPoint:F[H].jointPoint,direction:F[H].direction,cssRoot:F[H].cssRoot})
}}},getTarget:function(){return this.id+"_label"
},show:function(F){if(this.menuManager.openedMenu!=this.id){this.menuManager.shutdownMenu();
this.menuManager.addMenuId(this.id);
this.__showPopup()
}},hide:function(){this.__hidePopup();
this.menuManager.deletedMenuId()
},select:function(){this.element.removeClass(this.options.cssClasses.unselectMenuCss);
this.element.addClass(this.options.cssClasses.selectMenuCss)
},unselect:function(){this.element.removeClass(this.options.cssClasses.selectMenuCss);
this.element.addClass(this.options.cssClasses.unselectMenuCss)
},__overHandler:function(){D.__overHandler.call(this);
this.select()
},__leaveHandler:function(){D.__leaveHandler.call(this);
this.unselect()
},destroy:function(){this.detach(this.id);
if(this.target){B.Event.unbindById(this.target,this.options.showEvent)
}D.destroy.call(this)
}}
})());
B.ui.MenuManager={openedMenu:null,activeSubMenu:null,addMenuId:function(F){this.openedMenu=F
},deletedMenuId:function(){this.openedMenu=null
},shutdownMenu:function(){if(this.openedMenu!=null){B.$(B.getDomElement(this.openedMenu)).hide()
}this.deletedMenuId()
},setActiveSubMenu:function(F){this.activeSubMenu=F
},getActiveSubMenu:function(){return this.activeSubMenu
}}
})(jQuery,RichFaces);;(function(C,B){B.ui=B.ui||{};
B.ui.PopupList=function(H,F,E){this.namespace=this.namespace||"."+B.Event.createNamespace(this.name,H);
var G=C.extend({},A,E);
D.constructor.call(this,H,G);
G.selectListener=F;
this.list=new B.ui.List(H,G)
};
B.ui.Popup.extend(B.ui.PopupList);
var D=B.ui.PopupList.$super;
var A={attachToBody:true,positionType:"DROPDOWN",positionOffset:[0,0]};
C.extend(B.ui.PopupList.prototype,(function(){return{name:"popupList",__getList:function(){return this.list
},destroy:function(){this.list.destroy();
this.list=null;
D.destroy.call(this)
}}
})())
})(jQuery,window.RichFaces);;(function(C,B){B.ui=B.ui||{};
B.ui.InplaceInput=function(J,F){var I=C.extend({},A,F);
D.constructor.call(this,J,I);
this.label=C(document.getElementById(J+"Label"));
var G=this.label.text();
var H=this.__getValue();
this.initialLabel=(G==H)?G:"";
this.useDefaultLabel=G!=H;
this.saveOnBlur=I.saveOnBlur;
this.showControls=I.showControls;
this.getInput().bind("focus",C.proxy(this.__editHandler,this));
if(this.showControls){var E=document.getElementById(J+"Btn");
if(E){E.tabIndex=-1
}this.okbtn=C(document.getElementById(J+"Okbtn"));
this.cancelbtn=C(document.getElementById(J+"Cancelbtn"));
this.okbtn.bind("mousedown",C.proxy(this.__saveBtnHandler,this));
this.cancelbtn.bind("mousedown",C.proxy(this.__cancelBtnHandler,this))
}};
B.ui.InplaceBase.extend(B.ui.InplaceInput);
var D=B.ui.InplaceInput.$super;
var A={defaultLabel:"",saveOnBlur:true,showControl:true,noneCss:"rf-ii-none",readyCss:"rf-ii",editCss:"rf-ii-act",changedCss:"rf-ii-chng"};
C.extend(B.ui.InplaceInput.prototype,(function(){return{name:"inplaceInput",defaultLabelClass:"rf-ii-dflt-lbl",getName:function(){return this.name
},getNamespace:function(){return this.namespace
},__keydownHandler:function(E){this.tabBlur=false;
switch(E.keyCode||E.which){case B.KEYS.ESC:E.preventDefault();
this.cancel();
this.onblur(E);
break;
case B.KEYS.RETURN:E.preventDefault();
this.save();
this.onblur(E);
break;
case B.KEYS.TAB:this.tabBlur=true;
break
}},__blurHandler:function(E){this.onblur(E)
},__isSaveOnBlur:function(){return this.saveOnBlur
},__setInputFocus:function(){this.getInput().unbind("focus",this.__editHandler);
this.getInput().focus()
},__saveBtnHandler:function(E){this.cancelButton=false;
this.save();
this.onblur(E)
},__cancelBtnHandler:function(E){this.cancelButton=true;
this.cancel();
this.onblur(E)
},__editHandler:function(E){D.__editHandler.call(this,E);
this.onfocus(E)
},getLabel:function(){return this.label.text()
},setLabel:function(E){this.label.text(E);
if(E==this.defaultLabel){this.label.addClass(this.defaultLabelClass)
}else{this.label.removeClass(this.defaultLabelClass)
}},isValueChanged:function(){return(this.__getValue()!=this.initialLabel)
},onshow:function(){this.__setInputFocus()
},onhide:function(){if(this.tabBlur){this.tabBlur=false
}else{this.getInput().focus()
}},onfocus:function(E){if(!this.__isFocused()){this.__setFocused(true);
this.focusValue=this.__getValue();
this.invokeEvent.call(this,"focus",document.getElementById(this.id),E)
}},onblur:function(E){if(this.__isFocused()){this.__setFocused(false);
this.invokeEvent.call(this,"blur",document.getElementById(this.id),E);
if(this.isValueSaved()||this.__isSaveOnBlur()){this.save()
}else{this.cancel()
}this.__hide();
if(!this.cancelButton){if(this.__isValueChanged()){this.invokeEvent.call(this,"change",document.getElementById(this.id),E)
}}var F=this;
window.setTimeout(function(){F.getInput().bind("focus",C.proxy(F.__editHandler,F))
},1)
}},__isValueChanged:function(){return(this.focusValue!=this.__getValue())
},__setFocused:function(E){this.focused=E
},__isFocused:function(){return this.focused
},setValue:function(E){this.__setValue(E);
this.save()
}}
})())
})(jQuery,window.RichFaces);;(function(D,C){C.ui=C.ui||{};
C.ui.PickList=function(I,F){var H=D.extend({},A,F);
E.constructor.call(this,I,H);
this.namespace=this.namespace||"."+C.Event.createNamespace(this.name,this.id);
this.attachToDom();
H.scrollContainer=D(document.getElementById(I+"SourceItems"));
this.sourceList=new C.ui.ListMulti(I+"SourceList",H);
H.scrollContainer=D(document.getElementById(I+"TargetItems"));
this.selectItemCss=H.selectItemCss;
var G=I+"SelValue";
this.hiddenValues=D(document.getElementById(G));
H.hiddenId=G;
this.orderable=H.orderable;
if(this.orderable){this.orderingList=new C.ui.OrderingList(I+"Target",H);
this.targetList=this.orderingList.list
}else{this.targetList=new C.ui.ListMulti(I+"TargetList",H)
}this.pickList=D(document.getElementById(I));
this.addButton=D(".rf-pick-add",this.pickList);
this.addButton.bind("click",D.proxy(this.add,this));
this.addAllButton=D(".rf-pick-add-all",this.pickList);
this.addAllButton.bind("click",D.proxy(this.addAll,this));
this.removeButton=D(".rf-pick-rem",this.pickList);
this.removeButton.bind("click",D.proxy(this.remove,this));
this.removeAllButton=D(".rf-pick-rem-all",this.pickList);
this.removeAllButton.bind("click",D.proxy(this.removeAll,this));
this.disabled=H.disabled;
if(H.onadditems&&typeof H.onadditems=="function"){C.Event.bind(this.targetList,"additems",H.onadditems)
}C.Event.bind(this.targetList,"additems",D.proxy(this.toggleButtons,this));
this.focused=false;
this.keepingFocus=false;
B.call(this,H);
if(H.onremoveitems&&typeof H.onremoveitems=="function"){C.Event.bind(this.sourceList,"additems",H.onremoveitems)
}C.Event.bind(this.sourceList,"additems",D.proxy(this.toggleButtons,this));
C.Event.bind(this.sourceList,"selectItem",D.proxy(this.toggleButtons,this));
C.Event.bind(this.sourceList,"unselectItem",D.proxy(this.toggleButtons,this));
C.Event.bind(this.targetList,"selectItem",D.proxy(this.toggleButtons,this));
C.Event.bind(this.targetList,"unselectItem",D.proxy(this.toggleButtons,this));
if(H.switchByClick){C.Event.bind(this.sourceList,"click",D.proxy(this.add,this));
C.Event.bind(this.targetList,"click",D.proxy(this.remove,this))
}if(H.switchByDblClick){C.Event.bind(this.sourceList,"dblclick",D.proxy(this.add,this));
C.Event.bind(this.targetList,"dblclick",D.proxy(this.remove,this))
}if(F.onchange&&typeof F.onchange=="function"){C.Event.bind(this,"change"+this.namespace,F.onchange)
}D(document).ready(D.proxy(this.toggleButtons,this))
};
C.BaseComponent.extend(C.ui.PickList);
var E=C.ui.PickList.$super;
var A={defaultLabel:"",itemCss:"rf-pick-opt",selectItemCss:"rf-pick-sel",listCss:"rf-pick-lst-cord",clickRequiredToSelect:true,switchByClick:false,switchByDblClick:true,disabled:false};
var B=function(F){if(F.onsourcefocus&&typeof F.onsourcefocus=="function"){C.Event.bind(this.sourceList,"listfocus"+this.sourceList.namespace,F.onsourcefocus)
}if(F.onsourceblur&&typeof F.onsourceblur=="function"){C.Event.bind(this.sourceList,"listblur"+this.sourceList.namespace,F.onsourceblur)
}if(F.ontargetfocus&&typeof F.ontargetfocus=="function"){C.Event.bind(this.targetList,"listfocus"+this.targetList.namespace,F.ontargetfocus)
}if(F.ontargetblur&&typeof F.ontargetblur=="function"){C.Event.bind(this.targetList,"listblur"+this.targetList.namespace,F.ontargetblur)
}if(F.onfocus&&typeof F.onfocus=="function"){C.Event.bind(this,"listfocus"+this.namespace,F.onfocus)
}if(F.onblur&&typeof F.onblur=="function"){C.Event.bind(this,"listblur"+this.namespace,F.onblur)
}this.pickList.focusin(D.proxy(this.__focusHandler,this));
this.pickList.focusout(D.proxy(this.__blurHandler,this))
};
D.extend(C.ui.PickList.prototype,(function(){return{name:"pickList",defaultLabelClass:"rf-pick-dflt-lbl",getName:function(){return this.name
},getNamespace:function(){return this.namespace
},__focusHandler:function(F){if(!this.focused){this.focused=true;
C.Event.fire(this,"listfocus"+this.namespace,F);
this.originalValue=this.targetList.csvEncodeValues()
}},__blurHandler:function(G){if(this.focused){this.focused=false;
C.Event.fire(this,"listblur"+this.namespace,G);
var F=this.targetList.csvEncodeValues();
if(F!=this.originalValue){C.Event.fire(this,"change"+this.namespace,G)
}}},getSourceList:function(){return this.sourceList
},getTargetList:function(){return this.targetList
},add:function(){this.targetList.setFocus();
var F=this.sourceList.removeSelectedItems();
this.targetList.addItems(F);
this.encodeHiddenValues()
},remove:function(){this.sourceList.setFocus();
var F=this.targetList.removeSelectedItems();
this.sourceList.addItems(F);
this.encodeHiddenValues()
},addAll:function(){this.targetList.setFocus();
var F=this.sourceList.removeAllItems();
this.targetList.addItems(F);
this.encodeHiddenValues()
},removeAll:function(){this.sourceList.setFocus();
var F=this.targetList.removeAllItems();
this.sourceList.addItems(F);
this.encodeHiddenValues()
},encodeHiddenValues:function(){this.hiddenValues.val(this.targetList.csvEncodeValues())
},toggleButtons:function(){this.__toggleButton(this.addButton,this.sourceList.__getItems().filter("."+this.selectItemCss).length>0);
this.__toggleButton(this.removeButton,this.targetList.__getItems().filter("."+this.selectItemCss).length>0);
this.__toggleButton(this.addAllButton,this.sourceList.__getItems().length>0);
this.__toggleButton(this.removeAllButton,this.targetList.__getItems().length>0);
if(this.orderable){this.orderingList.toggleButtons()
}},__toggleButton:function(G,F){if(this.disabled||!F){if(!G.hasClass("rf-pick-btn-dis")){G.addClass("rf-pick-btn-dis")
}if(!G.attr("disabled")){G.attr("disabled",true)
}}else{if(G.hasClass("rf-pick-btn-dis")){G.removeClass("rf-pick-btn-dis")
}if(G.attr("disabled")){G.attr("disabled",false)
}}}}
})())
})(jQuery,window.RichFaces);;(function(C,B){B.ui=B.ui||{};
var A={showEvent:"contextmenu",cssRoot:"ctx",cssClasses:{},attached:true};
B.ui.ContextMenu=function(F,E){this.options={};
C.extend(this.options,A,E||{});
D.constructor.call(this,F,this.options);
this.id=F;
this.namespace=this.namespace||"."+B.Event.createNamespace(this.name,this.id);
B.Event.bind("body","click"+this.namespace,C.proxy(this.__leaveHandler,this));
B.Event.bindById(this.id,"click"+this.namespace,C.proxy(this.__clilckHandler,this))
};
B.ui.Menu.extend(B.ui.ContextMenu);
var D=B.ui.ContextMenu.$super;
C.extend(B.ui.ContextMenu.prototype,(function(){return{name:"ContextMenu",getTarget:function(){if(!this.options.attached){return null
}var E=typeof this.options.target==="undefined"?this.element.parentNode.id:this.options.target;
return E
},__showHandler:function(E){if(this.__isShown()){this.hide()
}return D.__showHandler.call(this,E)
},show:function(F){if(this.menuManager.openedMenu!=this.id){this.menuManager.shutdownMenu();
this.menuManager.addMenuId(this.id);
this.__showPopup(F);
var E=B.$(this.target);
if(E&&E.contextMenuShow){E.contextMenuShow(this,F)
}}},__clilckHandler:function(E){E.preventDefault();
E.stopPropagation()
},destroy:function(){B.Event.unbind("body","click"+this.namespace);
B.Event.unbindById(this.id,"click"+this.namespace);
D.destroy.call(this)
}}
})())
})(jQuery,RichFaces);;(function(D,C){C.ui=C.ui||{};
C.ui.Select=function(K,G){this.id=K;
var J=D.extend({},B,G);
J.attachTo=K;
J.scrollContainer=D(document.getElementById(K+"Items")).parent()[0];
J.focusKeeperEnabled=false;
E.constructor.call(this,K,J);
this.options=J;
this.defaultLabel=J.defaultLabel;
var I=this.__getValue();
this.initialValue=(I!=this.defaultLabel)?I:"";
this.selValueInput=D(document.getElementById(K+"selValue"));
this.container=this.selValueInput.parent();
this.clientSelectItems=J.clientSelectItems;
this.filterFunction=J.filterFunction;
if(J.showControl&&!J.disabled){this.container.bind("mousedown",D.proxy(this.__onBtnMouseDown,this)).bind("mouseup",D.proxy(this.__onMouseUp,this))
}this.selectFirst=J.selectFirst;
this.popupList=new C.ui.PopupList((K+"List"),this,J);
this.list=this.popupList.__getList();
this.listElem=D(document.getElementById(K+"List"));
this.listElem.bind("mousedown",D.proxy(this.__onListMouseDown,this));
this.listElem.bind("mouseup",D.proxy(this.__onMouseUp,this));
var H={};
H["listshow"+this.namespace]=D.proxy(this.__listshowHandler,this);
H["listhide"+this.namespace]=D.proxy(this.__listhideHandler,this);
C.Event.bind(this.input,H,this);
this.originalItems=this.list.__getItems();
this.enableManualInput=J.enableManualInput;
if(this.originalItems.length>0&&this.enableManualInput){this.cache=new C.utils.Cache("",this.originalItems,A,true)
}this.changeDelay=J.changeDelay
};
C.ui.InputBase.extend(C.ui.Select);
var E=C.ui.Select.$super;
var B={defaultLabel:"",selectFirst:true,showControl:true,enableManualInput:false,itemCss:"rf-sel-opt",selectItemCss:"rf-sel-sel",listCss:"rf-sel-lst-cord",changeDelay:8,disabled:false,filterFunction:undefined};
var F=/^[\n\s]*(.*)[\n\s]*$/;
var A=function(G){var H=[];
G.each(function(){H.push(D(this).text().replace(F,"$1"))
});
return H
};
D.extend(C.ui.Select.prototype,(function(){return{name:"select",defaultLabelClass:"rf-sel-dflt-lbl",__listshowHandler:function(G){},__listhideHandler:function(G){},__onBtnMouseDown:function(G){if(!this.popupList.isVisible()){this.__updateItems();
this.__showPopup()
}else{this.__hidePopup()
}this.isMouseDown=true
},__focusHandler:function(G){if(!this.focused){if(this.__getValue()==this.defaultLabel){this.__setValue("")
}this.focusValue=this.selValueInput.val();
this.focused=true;
this.invokeEvent.call(this,"focus",document.getElementById(this.id),G)
}},__keydownHandler:function(H){var G;
if(H.keyCode){G=H.keyCode
}else{if(H.which){G=H.which
}}var I=this.popupList.isVisible();
switch(G){case C.KEYS.DOWN:H.preventDefault();
if(!I){this.__updateItems();
this.__showPopup()
}else{this.list.__selectNext()
}break;
case C.KEYS.UP:H.preventDefault();
if(I){this.list.__selectPrev()
}break;
case C.KEYS.RETURN:H.preventDefault();
if(I){this.list.__selectCurrent()
}return false;
break;
case C.KEYS.TAB:break;
case C.KEYS.ESC:H.preventDefault();
if(I){this.__hidePopup()
}break;
default:var J=this;
window.clearTimeout(this.changeTimerId);
this.changeTimerId=window.setTimeout(function(){J.__onChangeValue(H)
},this.changeDelay);
break
}},__onChangeValue:function(H){this.list.__selectByIndex();
var G=this.__getValue();
if(this.cache&&this.cache.isCached(G)){this.__updateItems();
if(this.list.__getItems().length!=0){this.container.removeClass("rf-sel-fld-err")
}else{this.container.addClass("rf-sel-fld-err")
}if(!this.popupList.isVisible()){this.__showPopup()
}}},__blurHandler:function(H){if(!this.isMouseDown){var G=this;
this.timeoutId=window.setTimeout(function(){if(G.input!==null){G.onblur(H)
}},200)
}else{this.__setInputFocus();
this.isMouseDown=false
}},__onListMouseDown:function(G){this.isMouseDown=true
},__onMouseUp:function(G){this.isMouseDown=false;
this.__setInputFocus()
},__updateItems:function(){var G=this.__getValue();
G=(G!=this.defaultLabel)?G:"";
this.__updateItemsFromCache(G);
if(this.selectFirst){this.list.__selectByIndex(0)
}},__updateItemsFromCache:function(I){if(this.originalItems.length>0&&this.enableManualInput){var H=this.cache.getItems(I,this.filterFunction);
var G=D(H);
this.list.__setItems(G);
D(document.getElementById(this.id+"Items")).empty().append(G)
}},__getClientItemFromCache:function(J){var I;
var H;
if(this.enableManualInput){var G=this.cache.getItems(J,this.filterFunction);
if(G&&G.length>0){var L=D(G[0]);
D.each(this.clientSelectItems,function(){if(this.id==L.attr("id")){H=this.label;
I=this.value;
return false
}})
}else{this.container.removeClass("rf-sel-fld-err");
var K=this.selValueInput.val();
if(K&&K!=""){D.each(this.clientSelectItems,function(){if(this.value==K){H=this.label;
I=this.value;
return false
}})
}}}if(H&&I){return{label:H,value:I}
}},__getClientItem:function(I){var H;
var G=I;
D.each(this.clientSelectItems,function(){if(G==this.label){H=this.value
}});
if(G&&H){return{label:G,value:H}
}},__showPopup:function(){this.popupList.show();
this.invokeEvent.call(this,"listshow",document.getElementById(this.id))
},__hidePopup:function(){this.popupList.hide();
this.invokeEvent.call(this,"listhide",document.getElementById(this.id))
},showPopup:function(){if(!this.popupList.isVisible()){this.__updateItems();
this.__showPopup()
}this.__setInputFocus();
if(!this.focused){if(this.__getValue()==this.defaultLabel){this.__setValue("")
}this.focusValue=this.selValueInput.val();
this.focused=true;
this.invokeEvent.call(this,"focus",document.getElementById(this.id))
}},hidePopup:function(){if(this.popupList.isVisible()){this.__hidePopup();
var G=this.__getValue();
if(!G||G==""){this.__setValue(this.defaultLabel);
this.selValueInput.val("")
}this.focused=false;
this.invokeEvent.call(this,"blur",document.getElementById(this.id));
if(this.focusValue!=this.selValueInput.val()){this.invokeEvent.call(this,"change",document.getElementById(this.id))
}}},processItem:function(I){var H=D(I).attr("id");
var G;
D.each(this.clientSelectItems,function(){if(this.id==H){G=this.label;
return false
}});
this.__setValue(G);
this.__hidePopup();
this.__setInputFocus();
this.__save();
this.invokeEvent.call(this,"selectitem",document.getElementById(this.id))
},__save:function(){var I="";
var G="";
var H=this.__getValue();
var J;
if(H&&H!=""){if(this.enableManualInput){J=this.__getClientItemFromCache(H)
}else{J=this.__getClientItem(H)
}if(J){G=J.label;
I=J.value
}}this.__setValue(G);
this.selValueInput.val(I)
},onblur:function(H){this.__hidePopup();
var G=this.__getValue();
if(!G||G==""){this.__setValue(this.defaultLabel);
this.selValueInput.val("")
}this.focused=false;
this.invokeEvent.call(this,"blur",document.getElementById(this.id),H);
if(this.focusValue!=this.selValueInput.val()){this.invokeEvent.call(this,"change",document.getElementById(this.id),H)
}},getValue:function(){return this.selValueInput.val()
},setValue:function(I){if(I==null||I==""){this.__setValue("");
this.__save();
this.__updateItems();
return 
}var H;
for(var G=0;
G<this.clientSelectItems.length;
G++){H=this.clientSelectItems[G];
if(H.value==I){this.__setValue(H.label);
this.__save();
this.list.__selectByIndex(G);
return 
}}},getLabel:function(){return this.__getValue()
},destroy:function(){this.popupList.destroy();
this.popupList=null;
E.destroy.call(this)
}}
})())
})(jQuery,window.RichFaces);;(function(D,C){C.ui=C.ui||{};
C.ui.OrderingList=function(I,F){var H=D.extend({},A,F);
E.constructor.call(this,I,H);
this.namespace=this.namespace||"."+C.Event.createNamespace(this.name,this.id);
this.attachToDom();
H.scrollContainer=D(document.getElementById(I+"Items"));
this.orderingList=D(document.getElementById(I));
this.list=new C.ui.ListMulti(I+"List",H);
var G=H.hiddenId===null?I+"SelValue":H.hiddenId;
this.hiddenValues=D(document.getElementById(G));
this.selectItemCss=H.selectItemCss;
this.disabled=H.disabled;
this.upButton=D(".rf-ord-up",this.orderingList);
this.upButton.bind("click",D.proxy(this.up,this));
this.upTopButton=D(".rf-ord-up-tp",this.orderingList);
this.upTopButton.bind("click",D.proxy(this.upTop,this));
this.downButton=D(".rf-ord-dn",this.orderingList);
this.downButton.bind("click",D.proxy(this.down,this));
this.downBottomButton=D(".rf-ord-dn-bt",this.orderingList);
this.downBottomButton.bind("click",D.proxy(this.downBottom,this));
this.focused=false;
this.keepingFocus=false;
B.call(this,H);
if(H.onmoveitems&&typeof H.onmoveitems=="function"){C.Event.bind(this.list,"moveitems",H.onmoveitems)
}C.Event.bind(this.list,"moveitems",D.proxy(this.toggleButtons,this));
C.Event.bind(this.list,"selectItem",D.proxy(this.toggleButtons,this));
C.Event.bind(this.list,"unselectItem",D.proxy(this.toggleButtons,this));
C.Event.bind(this.list,"keydown"+this.list.namespace,D.proxy(this.__keydownHandler,this));
if(F.onchange&&typeof F.onchange=="function"){C.Event.bind(this,"change"+this.namespace,F.onchange)
}D(document).ready(D.proxy(this.toggleButtons,this))
};
C.BaseComponent.extend(C.ui.OrderingList);
var E=C.ui.OrderingList.$super;
var A={defaultLabel:"",itemCss:"rf-ord-opt",selectItemCss:"rf-ord-sel",listCss:"rf-ord-lst-cord",clickRequiredToSelect:true,disabled:false,hiddenId:null};
var B=function(G){if(G.onfocus&&typeof G.onfocus=="function"){C.Event.bind(this,"listfocus"+this.namespace,G.onfocus)
}if(G.onblur&&typeof G.onblur=="function"){C.Event.bind(this,"listblur"+this.namespace,G.onblur)
}var F={};
F["listfocus"+this.list.namespace]=D.proxy(this.__focusHandler,this);
F["listblur"+this.list.namespace]=D.proxy(this.__blurHandler,this);
C.Event.bind(this.list,F,this);
F={};
F["focus"+this.namespace]=D.proxy(this.__focusHandler,this);
F["blur"+this.namespace]=D.proxy(this.__blurHandler,this);
C.Event.bind(this.upButton,F,this);
C.Event.bind(this.upTopButton,F,this);
C.Event.bind(this.downButton,F,this);
C.Event.bind(this.downBottomButton,F,this)
};
D.extend(C.ui.OrderingList.prototype,(function(){return{name:"ordList",defaultLabelClass:"rf-ord-dflt-lbl",getName:function(){return this.name
},getNamespace:function(){return this.namespace
},__focusHandler:function(F){this.keepingFocus=this.focused;
if(!this.focused){this.focused=true;
C.Event.fire(this,"listfocus"+this.namespace,F);
this.originalValue=this.list.csvEncodeValues()
}},__blurHandler:function(G){var F=this;
this.timeoutId=window.setTimeout(function(){if(!F.keepingFocus){F.focused=false;
C.Event.fire(F,"listblur"+F.namespace,G);
var H=F.list.csvEncodeValues();
if(H!=F.originalValue){C.Event.fire(F,"change"+F.namespace,G)
}}F.keepingFocus=false
},200)
},__keydownHandler:function(G){if(G.isDefaultPrevented()){return 
}if(!G.metaKey){return 
}var F;
if(G.keyCode){F=G.keyCode
}else{if(G.which){F=G.which
}}switch(F){case C.KEYS.DOWN:G.preventDefault();
this.down();
break;
case C.KEYS.UP:G.preventDefault();
this.up();
break;
case C.KEYS.HOME:G.preventDefault();
this.upTop();
break;
case C.KEYS.END:G.preventDefault();
this.downBottom();
break;
default:break
}return 
},getList:function(){return this.list
},up:function(){this.keepingFocus=true;
this.list.setFocus();
var F=this.list.getSelectedItems();
this.list.move(F,-1);
this.encodeHiddenValues()
},down:function(){this.keepingFocus=true;
this.list.setFocus();
var F=this.list.getSelectedItems();
this.list.move(F,1);
this.encodeHiddenValues()
},upTop:function(){this.keepingFocus=true;
this.list.setFocus();
var G=this.list.getSelectedItems();
var F=this.list.items.index(G.first());
this.list.move(G,-F);
this.encodeHiddenValues()
},downBottom:function(){this.keepingFocus=true;
this.list.setFocus();
var G=this.list.getSelectedItems();
var F=this.list.items.index(G.last());
this.list.move(G,(this.list.items.length-1)-F);
this.encodeHiddenValues()
},encodeHiddenValues:function(){this.hiddenValues.val(this.list.csvEncodeValues())
},toggleButtons:function(){var F=this.list.__getItems();
if(this.disabled||this.list.getSelectedItems().length===0){this.__disableButton(this.upButton);
this.__disableButton(this.upTopButton);
this.__disableButton(this.downButton);
this.__disableButton(this.downBottomButton)
}else{if(this.list.items.index(this.list.getSelectedItems().first())===0){this.__disableButton(this.upButton);
this.__disableButton(this.upTopButton)
}else{this.__enableButton(this.upButton);
this.__enableButton(this.upTopButton)
}if(this.list.items.index(this.list.getSelectedItems().last())===(this.list.items.length-1)){this.__disableButton(this.downButton);
this.__disableButton(this.downBottomButton)
}else{this.__enableButton(this.downButton);
this.__enableButton(this.downBottomButton)
}}},__disableButton:function(F){if(!F.hasClass("rf-ord-btn-dis")){F.addClass("rf-ord-btn-dis")
}if(!F.attr("disabled")){F.attr("disabled",true)
}},__enableButton:function(F){if(F.hasClass("rf-ord-btn-dis")){F.removeClass("rf-ord-btn-dis")
}if(F.attr("disabled")){F.attr("disabled",false)
}}}
})())
})(jQuery,window.RichFaces);;(function(C,B){B.ui=B.ui||{};
B.ui.InplaceSelect=function(G,E){var F=C.extend({},A,E);
D.constructor.call(this,G,F);
this.getInput().bind("click",C.proxy(this.__clickHandler,this));
F.attachTo=G;
F.scrollContainer=C(document.getElementById(G+"Items")).parent()[0];
F.focusKeeperEnabled=false;
this.popupList=new B.ui.PopupList(G+"List",this,F);
this.list=this.popupList.__getList();
this.clientSelectItems=F.clientSelectItems;
this.selValueInput=C(document.getElementById(G+"selValue"));
this.initialValue=this.selValueInput.val();
this.listHandler=C(document.getElementById(G+"List"));
this.listHandler.bind("mousedown",C.proxy(this.__onListMouseDown,this));
this.listHandler.bind("mouseup",C.proxy(this.__onListMouseUp,this));
this.openOnEdit=F.openOnEdit;
this.saveOnSelect=F.saveOnSelect;
this.savedIndex=-1;
this.inputItem=C(document.getElementById(G+"Input"));
this.inputItemWidth=this.inputItem.width();
this.inputWidthDefined=E.inputWidth!==undefined
};
B.ui.InplaceInput.extend(B.ui.InplaceSelect);
var D=B.ui.InplaceSelect.$super;
var A={defaultLabel:"",saveOnSelect:true,openOnEdit:true,showControl:false,itemCss:"rf-is-opt",selectItemCss:"rf-is-sel",listCss:"rf-is-lst-cord",noneCss:"rf-is-none",editCss:"rf-is-fld-cntr",changedCss:"rf-is-chng"};
C.extend(B.ui.InplaceSelect.prototype,(function(){return{name:"inplaceSelect",defaultLabelClass:"rf-is-dflt-lbl",getName:function(){return this.name
},getNamespace:function(){return this.namespace
},onshow:function(){D.onshow.call(this);
if(this.openOnEdit){this.__showPopup()
}},onhide:function(){this.__hidePopup()
},showPopup:function(){this.isSaved=false;
this.element.addClass(this.editCss);
this.editContainer.removeClass(this.noneCss);
this.editState=true;
this.scrollElements=B.Event.bindScrollEventHandlers(this.id,this.__scrollHandler,this);
this.__setInputFocus();
this.onfocus();
this.__showPopup()
},__showPopup:function(){this.popupList.show();
this.__hideLabel()
},__hidePopup:function(){this.popupList.hide();
this.__showLabel()
},onsave:function(){var G=this.list.currentSelectItem();
if(G){var F=this.list.getSelectedItemIndex();
var H=this.list.getClientSelectItemByIndex(F);
var E=H.label;
if(E==this.__getValue()){this.savedIndex=F;
this.saveItemValue(H.value);
this.list.__selectByIndex(this.savedIndex)
}else{this.list.__selectItemByValue(this.getValue())
}}},oncancel:function(){var E=this.list.getClientSelectItemByIndex(this.savedIndex).value;
if(E){this.saveItemValue(E);
this.list.__selectByIndex(this.savedIndex)
}else{this.saveItemValue(this.initialValue);
this.list.__selectItemByValue(this.initialValue)
}},onblur:function(E){this.__hidePopup();
D.onblur.call(this)
},onfocus:function(E){if(!this.__isFocused()){this.__setFocused(true);
this.focusValue=this.selValueInput.val();
this.invokeEvent.call(this,"focus",document.getElementById(this.id),E)
}},processItem:function(F){var E=C(F).data("clientSelectItem").label;
this.__setValue(E);
this.__setInputFocus();
this.__hidePopup();
if(this.saveOnSelect){this.save()
}this.invokeEvent.call(this,"selectitem",document.getElementById(this.id))
},saveItemValue:function(E){this.selValueInput.val(E)
},__isValueChanged:function(){return(this.focusValue!=this.selValueInput.val())
},__keydownHandler:function(F){var E;
if(F.keyCode){E=F.keyCode
}else{if(F.which){E=F.which
}}if(this.popupList.isVisible()){switch(E){case B.KEYS.DOWN:F.preventDefault();
this.list.__selectNext();
this.__setInputFocus();
break;
case B.KEYS.UP:F.preventDefault();
this.list.__selectPrev();
this.__setInputFocus();
break;
case B.KEYS.RETURN:F.preventDefault();
this.list.__selectCurrent();
this.__setInputFocus();
return false;
break
}}D.__keydownHandler.call(this,F)
},__blurHandler:function(E){if(this.saveOnSelect||!this.isMouseDown){if(this.isEditState()){this.timeoutId=window.setTimeout(C.proxy(function(){this.onblur(E)
},this),200)
}}else{this.__setInputFocus();
this.isMouseDown=false
}},__clickHandler:function(E){this.__showPopup()
},__onListMouseDown:function(E){this.isMouseDown=true
},__onListMouseUp:function(E){this.isMouseDown=false;
this.__setInputFocus()
},__showLabel:function(E){this.label.show();
this.editContainer.css("position","absolute");
this.inputItem.width(this.inputItemWidth)
},__hideLabel:function(E){this.label.hide();
this.editContainer.css("position","static");
if(!this.inputWidthDefined){this.inputItem.width(this.label.width())
}},getValue:function(){return this.selValueInput.val()
},setValue:function(F){var E=this.list.__selectItemByValue();
var G=E.data("clientSelectItem");
this.__setValue(G.label);
this.save()
},destroy:function(){this.popupList.destroy();
this.popupList=null;
D.destroy.call(this)
}}
})())
})(jQuery,window.RichFaces);;