"use strict";

var stInput= stInput||{};

stInput.htmlText=function( text)
{
  if(typeof text =="string"){
   return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  else
  {
    console.info( "must be a string: " + typeof text );
    return "";
  }
};

stInput.syncState=function( )
{
  var state="";
  var list=$$("select[data-path='country']");
  if( list.length==1)
  {
   var country=list[0].value;
   var indx=country.indexOf('@');
   if( indx!=-1)
   {
     country=country.substring(0, indx);
     var ss=$$("#shaddow-state")[0].value;

     if( country!='' && ss !='')
     {
       state=country.trim() +"-" +ss.trim();
     }
   }
  }

   console.info( "state: " + state);
//    $$("input[data-path='state']").value(stateregion);
   $$("input[data-path='state']").attr('value',state)
}

stInput.makeInput=function( data)
{  
 // console.info( data);
  try{
    var readonlyAttr="";
    if( data.readonly)
    {
      readonlyAttr=" readonly";
    }
    var patternAttr="";
    var requiredAttr="";
    var minAttr="";
    var maxAttr="";
    if(data.validation )
    {
      if(data.validation.pattern)
      {
        patternAttr=" pattern=\"" + stInput.htmlText(data.validation.pattern) +"\"";
      }

      if(data.validation.required)
      {
        requiredAttr=" required";
      }

      if(data.validation.min)
      {
        minAttr=" min='" + min +"'";
      }
      if(data.validation.max)
      {
        maxAttr=" max='" + max +"'";
      }      
    }
    //console.info( patternAttr);
    var pathAttr="";
    var shaddowElement="";
    var onchange="";
    if( data.path)
    {
      if( data.path=='state')
      {
        data.type='hidden';
        shaddowElement="\n<input id='shaddow-state' type='text' pattern='[a-zA-Z ]*' onchange='stInput.syncState()'";
        if( data.value)
        {
          var indx=data.value.indexOf( '-');
          if( indx!=-1)
          {
            var tmp=data.value.substring( indx + 1);
            shaddowElement+=" value='" + stInput.htmlText(tmp) +"'";
          }
        }
        shaddowElement+=">";
      }
      else if( data.path=='country')
      {
        onchange=" onchange='stInput.syncState()'";
      }
      pathAttr=" data-path='" + stInput.htmlText(data.path) + "'";
    }

    var component=data.component;
    if( component == 'textarea')
    {
      var e="<textarea" + readonlyAttr + pathAttr +onchange+ patternAttr + requiredAttr + ">";
      if( data.value)
      {
        e+= stInput.htmlText(data.value);
      }

      e += "</textarea>";
      //console.info( e);
      return e;
    }
    else if( component == 'select')
    {
      var e="<select" + readonlyAttr + pathAttr + onchange  + requiredAttr +">";

      var fLen = data.options.length;
      for (var i = 0; i < fLen; i++) {
        var option=data.options[i];
        e += "<option value=\"" + stInput.htmlText(option.value) +"\"";
        if( option.selected)
        {
          e+=" selected";
        }
        e +=">" + stInput.htmlText(option.label) + "</option>";           
      } 

      e += "</select>";
      //console.info( e);
      return e;
    }

    var placeholderAttr="";
    if( data.placeholder)
    {
      placeholderAttr=" placeholder=\"" + stInput.htmlText(data.placeholder) +"\"";
    }

    var type=data.type;

    var valueAttr="";
    if( data.value)
    {
      valueAttr=" value=\"" + stInput.htmlText(data.value) +"\"";
    }
    var e="<input type='" + type +"'" + pathAttr + placeholderAttr + readonlyAttr + valueAttr +onchange+ patternAttr + requiredAttr + minAttr + maxAttr + ">" + shaddowElement;
   //console.info( "t:" + type +" p:" + pathAttr + " place:" +placeholderAttr +" r:" + readonlyAttr + " v:" +valueAttr +" o:" +onchange+ patternAttr + requiredAttr + minAttr + maxAttr + ">");
   console.info( e);
    return e;
  }
  catch( e)
  {
    console.warn( data, e);
  }
};

stInput.makeIcon =function(data){
  //console.info( data);
  try{
    if( data.path == "gender")
    {
      return "<i class='fa fa-venus-mars' aria-hidden='true'></i>";
    }

    if( data.path=='name')
    {
      return "<i class='fa fa-user' aria-hidden='true'></i>";
    }
    if( data.path=='address')
    {
      return "<i class='fa fa-map-marker' aria-hidden='true'></i>";
    }
    if( data.path=='title')
    {
      return "<i class='fa fa-graduation-cap' aria-hidden='true'></i>";
    }
    if( data.path=='suburbcity')
    {
      return "<i class='fa fa-location-arrow' aria-hidden='true'></i>";
    }
    
    if( data.path=='state')
    {
      return "<i class='fa fa-compass' aria-hidden='true'></i>";
    }
    if( data.path=='country')
    {
      return "<i class='fa fa-globe' aria-hidden='true'></i>";
    }

    // by type
    if( data.type === 'email')
    {
      return "<i class='fa fa-envelope' aria-hidden='true'></i>";
    }

    if( data.type === 'tel')
    {
      return "<i class='fa fa-phone' aria-hidden='true'></i>";
    }
    if( data.type=='date')
    {
      return "<i class='fa fa-calendar-o' aria-hidden='true'></i>";
    }
    if( data.type=='date')
    {
      return "<i class='fa fa-calendar-o' aria-hidden='true'></i>";
    }
    if( data.type=='datetime-local')
    {
      return "<i class='fa fa-clock-o' aria-hidden='true'></i>";      
    }
    if( data.component=='select')
    {
      return "<i class='fa fa-list' aria-hidden='true'></i>";
    }
    if( data.component=='textarea')
    {
      return "<i class='fa fa-wpforms' aria-hidden='true'></i>";
    }
    return "<i class='fa fa-terminal' aria-hidden='true'></i>";
  }
  catch( e)
  {
    console.warn( data, e);
  }
};
