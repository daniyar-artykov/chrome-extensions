$(document).ready(function() {
	initializeSavedDetails();
});

$('#save-btn').click(function() {
	var b = {};
	var stSoftware = {
			'url_api': $('#url_api').val(),
			'username': $('#username').val(),
			'password': $('#password').val()
	}

	b['stSoftware'] = stSoftware;
	console.debug('set url_api: %s; username: %s; password: %s', 
			stSoftware.url_api, stSoftware.username, stSoftware.password);
	chrome.storage.local.set(b);
});

function initializeSavedDetails() {
	chrome.storage.local.get('stSoftware', initializeLoginControls);
}

function initializeLoginControls(a) {
	if (a && (a = a['stSoftware'])) {
		$('#url_api').val(a.url_api);
		$('#username').val(a.username);
		$('#password').val(a.password);
	}
}
