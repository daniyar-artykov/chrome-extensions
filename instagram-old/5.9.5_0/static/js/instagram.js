(function() {
    var graph = 'https://api.instagram.com/v1/',
        app_id = false,
        scope = '';
    
    var Insta = {
        _uid: '',
        init: function(id, perms) {
            app_id = id;
            scope = perms || '';
        },
        getUser: function(fn) {
            /* Get user ID immediately */
            Insta.api('/self', function(res) {
                if(res && res.id) {
                    localStorage._uid = res.id;
                    Insta._uid = res.id;
                    fn && fn(res);
                }
            });
        },
        getAccessToken: function() {
            return localStorage._Instatoken || false;
        },
        setAccessToken: function(token) {
            if(token === false) {
                localStorage.removeItem('_Instatoken');
            } else {
                localStorage._Instatoken = token;
            }
        },
        getUserID: function() {
            return localStorage._uid || Insta._uid;
        },
        login: function() {
            var client = "2974fce230f74bd38c726d5b18761dc2"; // Original
            //var client = "0068f75af1bb49a59dd1c10848f990f8"; // New
            var redirect =   encodeURIComponent('http://zachallia.com/token'),
                url = 'https://api.instagram.com/oauth/authorize/?client_id=' + client + '&redirect_uri=' + redirect + '&response_type=token&scope=likes+comments+relationships';
				//window.open(url, 'Instaauth');
				var left = (screen.width/2)-(720/2);
                var top = (screen.height/2)-(620/2);
                    window.open(url, 'Instaauth');
                    return;
                    chrome.windows.create({
                        url: url,
                        left: left,
                        top: top,
                        width: 720,
                        height: 620,
                        type: 'popup',
                        focused: true
                    });
                    //window.open(url,'Instaauth','width=720,height=620,resizable=no,location=no,scrollbars=no,titlebar=no,toolbar=no,top=' + top + ',left=' + left);
        },
        api: function(path /*, type [post/get], params obj, callback fn */) {
            if(_gaq) {
                try {
//                     _gaq.push(['_trackEvent', 'API Request', path.split('/')[0]]);
                } catch(e) {}
            }
            var args = Array.prototype.slice.call(arguments, 1),
                fn = false,
                params = {},
                method = 'get';
            
            /* Parse arguments to their appropriate position */
            for(var i in args) {
                switch(typeof args[i]) {
                    case 'function':
                        fn = args[i];
                    break;
                    case 'object':
                        params = args[i];
                    break;
                    case 'string':
                        method = args[i].toLowerCase();
                    break;
                }
            }
            
            /* Make sure there is a path component */
            if(!path && !params.batch) {
                return fn && fn(false);
            }
            
            /* Use the passed method i.e. get, post, delete */
            //params._method = method.toLowerCase() || 'get';
            params.access_token = this.getAccessToken();
            
            if(method == 'delete') {
                params._method = 'DELETE';
                method = 'post';
            }
            
            /* Make call */
            if(path == 'news/inbox') {
                graph = 'https://i.instagram.com/api/v1/';
            }
            $[method](graph + path, params, function(res) {
                /* If there is an auth error, don't continue and make them login */
                if(res && res.meta && res.meta.error_type == "OAuthAccessTokenException") {
                    Insta.login();
                    return;
                }
                if(typeof fn == 'function') {
                    fn(res);
                }
            }, 'json').error(function(res) {
                res = res.responseJSON;
                if(res && res.meta && res.meta.error_type == "OAuthAccessTokenException") {
                    Insta.login();
                    return;
                }
                fn(false);
            });
        }
    };
    
    window.Insta = Insta;
})();