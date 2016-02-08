define(function() {

    var css = {
            width: '100%',
            display: 'block',
            margin: 0,
            padding: 0,
            height: 50,
            position: 'fixed',
            bottom: 0,
            left: 0,
            zIndex: 10000,
            backgroundColor: 'transparent',
            border: 'none',
            boxShadow: '0px -2px 0px rgba(0,0,0,0.09)'
        },
        ad = $('<iframe />'),
        fetchAd = function() {
            ad.attr('src', 'http://update.64px.com/serve#' + chrome.app.getDetails().id).css(css).appendTo(document.body).hide();
        };
        
        fetchAd.update = function() {
            if(!ad.attr('src')) {
                fetchAd();
            } else {
                ad[0].src = ad[0].src;
            }
        }
        
    window.addEventListener('message',function(event) {
    	switch(event.data) {
        	case 'close':
        	    ad.remove();
        	break;
        	case 'show':
        	    ad.slideDown('fast');
        	break;
    	}
    },false);
    
    return fetchAd;
});