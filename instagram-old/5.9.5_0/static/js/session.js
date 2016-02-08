chrome.extension.sendRequest({type: 'auth', session: window.location.hash}, function(response) {
	window.open('', '_self', '');
	window.close();
});