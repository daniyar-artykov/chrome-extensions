var f7 = new Framework7({
    modalTitle: 'Contact List',
    animateNavBackIcon: true,
    // If it is webapp, we can enable hash navigation:
    pushState: true,
    //allowSwipeout:false,
    // Hide and show indicator during ajax requests
    onAjaxStart: function (xhr) {
        f7.showIndicator();
    },
    onAjaxComplete: function (xhr) {
        f7.hideIndicator();
    },

    preroute: function (view, options) {
      if( options.url && options.url.match(/index.*/g))
      {
        if( f7.lastListContactURL)
        {
          return true;
        }
        else if( !f7.initalized )
        {
          return false;
        }
      }
      f7.initalized=true;
      return true;
    }
  
});

var $$ = Dom7;
f7.ajaxSetup=function(token)
{
  var headers={Accept: "*/*"};
  if( token)
  {
    headers.Authorization= "Token " + token;
  }
  
  $$.ajaxSetup( {
    headers:headers
  });
};

f7.ajaxSetup();
Template7.registerHelper('listPicture', function (url)
{
  var tmpURL=url;
  if( tmpURL.includes( "?"))
  {
    tmpURL+="&";
  }
  else
  {
    tmpURL+="?";
  }
  var max=120;
  tmpURL+="max-width=" + max;
  
  tmpURL+="&max-height=" + max;
  
  return tmpURL;
});

// Add main View
var mainView = f7.addView('.view-main', {
    // Enable dynamic Navbar - iOS only */
    //dynamicNavbar: true,
});
f7.initContactList=function()
{
    f7.searchbar('.searchbar', {
        customSearch: true,
        onSearch: f7.searchContact
    });
    if( f7.lastListContactURL)
    {
        f7.listContact( f7.lastListContactURL);
        var preSearch=f7.lastSearchValue;
        $$("input[type='search']").val(preSearch);
    }
    else{
        f7.searchContact();
    }
};

f7.onPageInit('*', function(page){
   //console.info("onPageInit: " + page.name); 
   if( page.name=='index')
   {       
       if( f7.contactListTemplate)
       {
        f7.initContactList();
        return false;
       }
   }
});
f7.uploadAvatar=function( gk){

  //Get count of selected files
  var files = $$("#avatarUpload")[0].files;
  
  var countFiles = files.length;
  if( countFiles>0){
      var imgPath = $$("#avatarUpload")[0].value;
      var extn = imgPath.substring(imgPath.lastIndexOf('.') + 1).toLowerCase();
      var image_holder = $$(".avatar");
      $$(image_holder).attr( 'src', '/docs/web/images/avatar_unknown.png');

      if (extn == "gif" || extn == "png" || extn == "jpg" || extn == "jpeg") {
        if (typeof(FileReader) != "undefined") {
            var reader = new FileReader();
            reader.onload = function(e) {
                $$(image_holder).attr( 'src', e.target.result);
            };
            image_holder.show();
            reader.readAsDataURL(files[0]);
            var formData = new FormData();
            formData.append( 'file', files[0]);
            formData.append( "path","/contacts/photos/");
            formData.append( "autoSubFolder", "true");
            formData.append( "_accept", "JSON");

            $$.ajax({
               url:  "/ReST/v1/file/upload/",
               method: "POST",
                dataType: "json",
               data: formData,
               success: function(data, status, xhr){

                    $$.ajax({
                      url: "/ReST/v5/class/Person/" + gk,
                      dataType: "json",
                      method: "PUT",
                      data: {
                          picture: data._global_key
                        },
                        success:function(data, status, xhr){
                        },
                        error: function( xhr, status)
                        {
                            var json;
                            try{
                                json = JSON.parse(xhr.responseText);
                            }
                            catch( e)
                            {
                                console.warn( xhr.responseText, e);
                                json={};
                            }
                            var msg = "Failed updating picture (status: " + status+")";
                            if (json.errors !== undefined)
                            {
                                msg = json.errors[0].message;
                            }
                            f7.addNotification({
                                title: 'Error updating picture',
                                message: msg,
                                closeOnClick: true
                            });
                        }
                    });
               },
               error: function(xhr, status){
                   var json;
                    try{
                        json = JSON.parse(xhr.responseText);
                    }
                    catch( e)
                    {
                        console.warn( xhr.responseText, e);
                        json={};
                    }
                    var msg = "Failed uploading avatar (status: " + status+")";
                    if (json.errors !== undefined)
                    {
                        msg = json.errors[0].message;
                    }
                    f7.addNotification({
                        title: 'Error uploding',
                        message: msg,
                        closeOnClick: true
                    });
               }
            });
        } else {
          f7.alert("This browser does not support FileReader.");
        }
      } else {
        f7.alert("Pls select only images");
      }
  }
};

f7.signOut = function () {
    $$.ajax({
        url: "/ReST/v1/auth/session",
        method: "DELETE",
        dataType: "json",
        data: {
            _accept: "JSON"
        },
        success: function (data, status, xhr) {
            f7.signIn();
        }
    });
};
f7.doLogin = function (username, password) {

    f7.showPreloader('Authorizing...');
    var timezone = jstz.determine();

    $$.ajax({
        url: "/ReST/v1/auth/login/" + username,
        method: "POST",
        dataType: "json",
        data: {
            password: password,
            remember_me: true,
            tz: timezone.name(),
            _accept: "JSON"
        },
        success: function (data, status, xhr) {
            f7.checkLogin();
        },
        error: function (xhr, status) {
            //console.info( xhr);
            var json = JSON.parse(xhr.responseText);
            var msg = "Failed to login";
            if (json.errors !== undefined)
            {
                msg = json.errors[0].message;
            }
            f7.signIn(msg);
        },
        complete: function (xhr, status) {
            f7.hidePreloader();
        }
    });

};
f7.cancelLogin = function () {
    var app = navigator.app;
    if (app !== undefined && app.exitApp !== undefined)
    {
        app.exitApp();
    }
};

f7.signIn = function (msg) {
  
    if( !f7.authKeyChecked)
    {
      f7.authKeyChecked=true;
      var href="";
      try{
        href=window.location.href;
      }catch(e)
      {
        console.warn("could not get location", e);
      }
        
      var authKey=$$.parseUrlQuery( href)["auth-key"];
      if( authKey)
      {
        f7.showPreloader('Key Authorizing...');
        var timezone = jstz.determine();

        $$.ajax({
            url: "/ReST/v1/auth/api-key/",
            method: "POST",
            dataType: "json",
            data: {
                key: authKey,
                //remember_me: true,
                tz: timezone.name(),
                _accept: "JSON"
            },
            success: function (data, status, xhr) {
              f7.ajaxSetup(data.token);
              f7.checkLogin();
            },
            error: function (xhr, status) {
                //console.info( xhr);
              console.info( "sign-in failed");
              console.info( xhr);
                var json = JSON.parse(xhr.responseText);
                var msg = "Failed to login";
                if (json.errors !== undefined)
                {
                    msg = json.errors[0].message;
                }
                f7.signIn(msg);
            },
            complete: function (xhr, status) {
                f7.hidePreloader();
            }
        });
        
        return;
      }
    }

    if (!msg || msg.length === 0)
    {
      msg = "Authentication required";
    }

    f7.modalLogin(
      msg,
      "Sign-In",
      f7.doLogin,
      f7.cancelLogin
    );
};


f7.checkLogin = function () {
    $$.ajax({
        url: "/ReST/v5/class/Globals/MAIN",
        dataType: "json",
        cache:false,
        data: {
            fields: "isloggedin,currentPerson.name",
            _accept: "JSON"
        },
        success: function (data, status, xhr) {
			//console.info( data);
            if (data.isloggedin === false)
            {
              //console.info( "NOT logged in");
                f7.signIn();
            } 
            else
            {
              //console.info( "logged in");
                var html = f7.leftTemplate(data);

                var left = $$("#left");
                left.html(html); 
                $$('.signin').on('click', function () {
                    f7.signIn();
                });
                $$('.signout').on('click', function () {
                    f7.signOut();
                });
                f7.initContactList();
            }
        },
        error: function (xhr, status) {
            var json;
            try{
                json = JSON.parse(xhr.responseText);
            }
            catch( e)
            {
                console.warn( xhr.responseText, e);
                json={};
            }
            var msg = "Failed signIn (status: " + status+")";
            if (json.errors !== undefined)
            {
                msg = json.errors[0].message;
            }
            f7.addNotification({
                title: 'Error signIn',
                message: msg,
                closeOnClick: true
            });
        }
    });
};
f7.searchContact = function (s) {
    var query = "deceased=false";

    if (s && s.value.trim().length > 0)
    {
        var searchValue=s.value.trim();
        searchValue = searchValue.replace(/\\/g, "\\\\");
        searchValue = searchValue.replace(/'/g, "\\'");
        f7.lastSearchValue=searchValue;
        var eValue = searchValue + "*";
        query = "name matches '" + eValue + "' AND deceased=false";
    }
    else
    {
        f7.lastSearchValue=null;
    }

    var url="/ReST/v5/class/Person?fields=name,picture.url,companyid.name&q=" +encodeURIComponent(query);
    f7.listContact(url);
};

f7.doList=function(e)
{
    var link = $$(e).data( "url");
    
    f7.listContact(link);
};

f7.listContact = function (link) {

    $$.ajax({
        url: link,
        dataType: "json",
        data: {
            _accept: "JSON"
        },
        success: function (data, status, xhr) {
          f7.lastListContactURL=link;
          var html = f7.contactListTemplate(data);

          var contactList = $$("#contact-list");
          contactList.html(html);
        },
        error: function (xhr, status) {
            var json;
            try{
                json = JSON.parse(xhr.responseText);
            }
            catch( e)
            {
                console.warn( xhr.responseText, e);
                json={};
            }
            var msg = "Failed listing (status: " + status+")";
            if (json.errors !== undefined)
            {
                msg = json.errors[0].message;
            }
            f7.addNotification({
                title: 'Error Listing',
                message: msg,
                closeOnClick: true
            });
        }
    });
};
f7.saveContact = function (gk)
{
    var invalidInputs=$$("*[data-path]:invalid");

    if( invalidInputs.length>0)
    {
        invalidInputs[0].focus();
        f7.addNotification({
            message: 'Please fix invalid fields',
           // message: invalidInputs.length + " fields are invalid",
            closeOnClick: true,
            hold:2000
        });

        return;
    }
    var name="unknown";
    var method="POST";
    if( gk !== '')
    {
      method="PUT";
      var names=$$('input[data-path="firstname"]');
      if( names !==null && names.length>0)
      {
        name=names[0].value;  
      }
    }

    var data={
        _accept:"JSON"
    };  
    var paths=$$('*[data-path]');
    
    for(var i=0; i<paths.length; i++) {
      var e = paths[i];
      var path=$$(e).data('path');
      data[path]=e.value;
    }

    f7.showPreloader('Saving: ' + name);
    $$.ajax({
      url: "/ReST/v5/class/Person/" + gk,
      dataType: "json",
      method: method,
      data: data,
      success: function (data, status, xhr) {
       
        var saveGK=data._global_key;
        if (data.success)
        {
            f7.showContact(saveGK);
        }
        else
        {
          var msg = data.error;

          f7.addNotification({
            title: 'Could not save: ' + name,
            message: msg,
            closeOnClick: true
          });
        }
      },
      error: function (xhr, status) {
        var jsonText = xhr.responseText.trim();

        var json;
        try {
          json = JSON.parse(jsonText);
        } catch (e)
        {
          json = {};
          console.warn(jsonText, e);
        }
        var msg = "Failed saving: " + name  +" (status: " + status+")";
        if (json.errors !== undefined)
        {
          msg = json.errors[0].message;
        }
        f7.addNotification({
          title: 'Error saving contact',
          message: msg,
          closeOnClick: true
        });
      },
      complete: function () {
        f7.hidePreloader();
      }
  });
  return false;
};

f7.deleteContact = function (gk)
{
  var name=$$('.swipeout[data-gk="' + gk + '"]').data('name');
  f7.confirm(
    'Are you sure ?', 'DELETE: ' + name, 
        function () {
        f7.showPreloader('Deleting: ' + name);
        $$.ajax({
          url: "/ReST/v5/class/Person/" + gk,
          dataType: "json",
          method: "DELETE",
          data: {
            _accept: "JSON"
          },
          success: function (data, status, xhr) {
            if (data.success)
            {
              f7.swipeoutDelete('.swipeout[data-gk="' + gk + '"]');
            } else
            {
              f7.swipeoutClose('.swipeout[data-gk="' + gk + '"]');

              var msg = data.error;

              f7.addNotification({
                title: 'Could not delete: ' + name,
                message: msg,
                closeOnClick: true
              });
            }
          },
          error: function (xhr, status) {
            var jsonText = xhr.responseText.trim();

            f7.swipeoutClose('.swipeout[data-gk="' + gk + '"]');
            var json;
            try {
              json = JSON.parse(jsonText);
            } catch (e)
            {
              json = {};
              console.warn(jsonText, e);
            }
            var msg = "Failed deleting: " + name  +" (status: " + status+")";
            if (json.errors !== undefined)
            {
              msg = json.errors[0].message;
            }
            f7.addNotification({
              title: 'Error deleting contact',
              message: msg,
              closeOnClick: true
            });
          },
          complete: function () {

            f7.hidePreloader();
          }
        });
      },
      function(){
          f7.swipeoutClose('.swipeout[data-gk="' + gk + '"]');
      }
  );
  return false;
};

f7.showContact = function (gk)
{
    var name=$$('.swipeout[data-gk="' + gk + '"]').data('name');

    f7.showPreloader('Loading: ' + name);
    $$.ajax({
        url: "/ReST/v5/class/Person/" + gk,
        dataType: "json",
        data: {
            fields: "name,picture.url,companyid.name,email,mainphone,displayaddress,displaysuburbcity,isactiveuser",
            _accept: "JSON"
        },
        success: function (data, status, xhr) {
            var html = f7.contactDisplayTemplate(data);

            mainView.router.loadContent(html);
        },
        error: function (xhr, status) {
            var msg = "Failed loading (status: " + status + ")";
            var json;
            try {
                json = JSON.parse(xhr.responseText);
            } catch (e)
            {
                json={};
                console.warn("could not parse", e);
            }
            if (json.errors !== undefined)
            {
                msg = json.errors[0].message;
            }
            f7.hidePreloader(); 
            f7.addNotification({
                title: 'Error displaying contact',
                message: msg,
                closeOnClick: true
            });
        },
        complete: function () {
            f7.hidePreloader();
        }
    });
};
 
f7.editContact = function (gk)
{
    var name=$$('.swipeout[data-gk="' + gk + '"]').data('name');
    f7.showPreloader('Edit: ' + name);
    $$.ajax({
        url: "/ReST/v1/form/Person/" + gk,
        dataType: "json",
       data: {
           path: "title,firstname,lastname,picture.url,email,phone,address,suburbcity,country,state,jobtitle,dob,gender,notes"
       },
        success: function (data, status, xhr) {
            console.info( data);
            var html = f7.contactEditTemplate(data);             
            mainView.router.loadContent(html);
        },
        error: function (xhr, status) {
            var msg = "Failed editing (status: " + status + ")";
            var json;
            try {
                json = JSON.parse(xhr.responseText);
            } catch (e)
            {
                json={};
                console.warn("could not parse", e);
            }
            if (json.errors !== undefined)
            {
                msg = json.errors[0].message;
            }
            f7.hidePreloader(); 
            f7.addNotification({
                title: 'Error editing contact',
                message: msg,
                closeOnClick: true
            });
        },
        complete: function () {
            f7.hidePreloader();
            console.time('editContact');
        }
    });
};

f7.leftTemplate = Template7.compile($$("#template-left")[0].innerHTML);

$$.ajax({
    url: "template/contact-list.html",
    success: function (data, status, xhr) {
        f7.contactListTemplate = Template7.compile(data);

        f7.checkLogin();
    }
});

$$.ajax({
    url: "template/contact-display.html",
    success: function (data, status, xhr) {        
        f7.contactDisplayTemplate = Template7.compile(data);
    }
});
$$.ajax({
    url: "template/contact-edit.html",
    success: function (data, status, xhr) {        
        f7.contactEditTemplate = Template7.compile(data);
    }
});

$$.ajax({
    url: "parts/input.html",
    success: function (data, status, xhr) {        
      Template7.registerPartial('input', data);
    }
});
