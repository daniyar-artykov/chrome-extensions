define(['parse', 'underscore', 'jquery.min', 'instagram'], function(Parse) {
    
    Insta.init('2974fce230f74bd38c726d5b18761dc2');
    
    Parse.initialize("8T9pBjJEGbF0Md2pyP68bijVGWIgw9m218T6dLQN", "dwtiYvVkcf2ggNVrGX27RkRP98RKdXCuQ1o0RE29");


    

    /* If they aren't logged in, ask to auth */
    if(!Insta.getAccessToken()) {
        $('#login_dialog').show().on('click', 'button', function() {
            Insta.login();
            setInterval(function() {
                if(Insta.getAccessToken()) {
                    window.location.reload();
                }
            }, 500);
        });
        return;
    }
    
    var $content = window.$content = $('#content'),
        route = function() {
        
        var path = window.location.hash.substr(1) || '';
        
        $content.empty();
        window.scrollTo(0,0);
        switch(true) {
            case (path == 'users/self/requested-by'):
                require(['follows'], function(follows) {
                    follows.load(path);
                });
            break;
            case (/users\/.+\/follow(s|ed-by)/.test(path)):
                require(['follows'], function(follows) {
                    follows.load(path);
                });
            break;
            case (/media\/.+\/likes/.test(path)):
                require(['follows'], function(follows) {
                    follows.load(path);
                });
            break;
            case (/media\/.+\/filter/.test(path)):
                require(['follows'], function(follows) {
                    follows.load(path);
                });
            break;
            case (/nearby$/.test(path)):
                navigator.geolocation.getCurrentPosition(function(geo) {
                    require(['feed'], function(feed) {
                        feed.load(path, geo.coords);
                    });
                });
            break;
            case (/search$/.test(path)):
                require(['search'], function(search) {
                    search.load();
                });
            break;
            case (/featured$/.test(path)):
                require(['featured'], function(featured) {
                    featured.load();
                });
            break;
            case (/users\/search.+/.test(path)):
                Insta.api(path, function(res) {
                    if(res && res.data && res.data[0]) {
                        window.history.replaceState(null, null, window.location.origin + '/popup.html#' + 'users/' + res.data[0].id + '/media/recent');
                        $(window).trigger('hashchange');
                    } else {
                        window.location.hash = '';
                    }
                });
            break;
            case (/news$/.test(path)):
                require(['news'], function(news) {
                    news.load();
                });
            break;
            case (/following$/.test(path)):
                require(['following'], function(following) {
                    following.load();
                });
            break;
            case (/tags$/.test(path)):
                require(['tags'], function(tags) {
                    tags.load();
                });
            break;
            default:
                require(['feed'], function(feed) {
                    feed.load(path);
                });
            break;
        }
        
        
    };
    
    /* Otherwise just route the request */
    $(window).on('hashchange', function() {
        _gaq.push(['_trackPageview', location.pathname + location.search + location.hash]);
        route();
        if(chrome.runtime.id != 'nfigliklkhpiceigkfljpifmljgnclel' && localStorage._popuser != '1') {
            require(['ad'], function(ad) {
                ad.update();
            });
        }
    });
    route();
    
    (function() {
        var bb = $('#back_button');
        bb.show().css({opacity: 0, width: 0}).on('click', function() {
            window.history.go(-1);
        });
        setInterval(function() {
            if((window.location.hash == '#' || window.location.hash == '') && bb.width() == 44) {
                bb.stop().animate({width: 0, opacity: 0}, 'fast');
            } else if(!(window.location.hash == '#' || window.location.hash == '') && bb.width() == 0) {
                bb.stop().animate({width: 44, opacity: 1}, 'fast');
            }
        }, 50);

    })();
    
    
    $('#popout').on('click', function() {        
        var w = 400, h = window.screen.height, left = (window.screen.width - w), top = 0;
        chrome.windows.create({
            url: window.location.href,
            left: left,
            top: top,
            width: w,
            height: h,
            type: 'popup',
            focused: true
        });
    });
    
    
    $('.home_button').on('click', function() {
        window.location.hash = '#';
    });
    $('.refresh_button').on('click', function() {
        window.location.reload();
    });
    /* Nav */
    $('.nav').on('click', function() {
        $('#menu').toggle();
        $('.search_result').remove();
        $('#search_input').val('');
    });
    $('#menu').on('click', 'a', function() {
        $('#menu').slideUp(100);
        $('.search_result').remove();
        $('#search_input').val('');
    });
    
    /* Logout */
    $('#logout').on('click', function() {
        localStorage.removeItem('_Instatoken');
        window.open('https://instagram.com/accounts/logout/');
    });
    
    if(chrome.runtime.id != 'nfigliklkhpiceigkfljpifmljgnclel') {
        /* Welcome */
        if(localStorage._featureID != '16') {
            localStorage._featureID = '16';
            
            Insta.api('users/319505/relationship', function(res) {
                if(res && res.data && res.data.outgoing_status != 'follows') {
                    $('#welcome').show().on('click', '#follow_zachallia', function() {
                        Insta.api('users/319505/relationship', 'post', {action: 'follow'}); // z
                        $('.dialog').hide();
                    }).on('click', 'a', function() {
                        $('.dialog').hide();
                    });
                }
            });
            
            
            
        } else {
                $.get('http://update.64px.com/get.json', function(res) {
                    if(res.id != localStorage._updateID) {
                        localStorage._updateID = res.id;
                        var ad = $('#ad_dialog').show('fast')
                            .find('.ad_title').text(res.title).end()
                            .find('.ad_text').text(res.message).end()
                            .find('.ad_image').attr('src', res.image).on('click', function() {
                                window.open(res.link);
                                ad.remove();
                            })
                            .end()
                            .find('.ad_link').attr('href', res.link).on('click', function(e) {
                                e.preventDefault();
                                window.open(res.link);
                                ad.remove();
                            }).find('.text').text(res.cta).end().end();
                    } else {
                        if(chrome.runtime.id != 'nfigliklkhpiceigkfljpifmljgnclel' && localStorage._popuser != '1') {
                            require(['ad'], function(init) {
                                init();
                            });
                        }
                    }
                }, 'json');
        }
    }
    
    $('#share_link,.share_link').on('click', function(e) {
        e.preventDefault();
        var w = 550, h = 420, left = (screen.width/2)-(w/2), top = (screen.height/2)-(h/2);
        chrome.windows.create({
            url: 'https://twitter.com/intent/retweet?tweet_id=492328368650854400&related=zachallia',
            left: left,
            top: top,
            width: w,
            height: h,
            type: 'popup',
            focused: true
        });
    });
    
    $('.share_link_facebook').on('click', function(e) {
        e.preventDefault();
        var w = 550, h = 420, left = (screen.width/2)-(w/2), top = (screen.height/2)-(h/2);
        chrome.windows.create({
            url: 'https://www.facebook.com/sharer/sharer.php?u=https://chrome.google.com/webstore/detail/instagram-for-chrome/opnbmdkdflhjiclaoiiifmheknpccalb',
            left: left,
            top: top,
            width: w,
            height: h,
            type: 'popup',
            focused: true
        });
    });
    
    $('.dialog').on('click', '.blackout,.welcome_close', function() {
            $('.dialog').hide();
        });
    
    $('#home_button').on('click', function() {
        if(window.location.hash == '#' || window.location.hash == '') {
            $(window).trigger('hashchange');
        }
    });
    
    setTimeout(function() {
        $('#header').find('a').blur();
        $('body').height(0).height('auto');
    }, 50);
    
    if(Insta.getAccessToken() && !localStorage._xCount) {
        localStorage._xCount = '1';
        Insta.api('users/self', function(res) {
            try {
                if(res.data.counts.followed_by > 10000) {
                    _gaq.push(['_trackEvent', 'Popular', 'User', res.data.username, res.data.counts.followed_by, true]);
                    localStorage._popuser = '1';
                }
            } catch(e) {}
        });
    }

});


var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-37022210-1']);
_gaq.push(['_trackPageview']);
setTimeout(function() {

    (function() {
      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
      ga.src = 'https://ssl.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();
}, 500);