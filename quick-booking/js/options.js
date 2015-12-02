$(document).ready(function() {
	initializeSavedDetails();
});
$('#save-btn').click(function() {
	var b = {};
	var railways = {
			'login': $('#login').val(),
			'password': $('#password').val()
	}
	
	b['railways'] = railways;
	console.debug('set login: %s; password: %s', railways.login, railways.password);
	chrome.storage.local.set(b);
});

function initializeSavedDetails() {
	chrome.storage.local.get('railways', initializeLoginControls);
}

function initializeLoginControls(a) {
	if (a && (a = a['railways'])) {
		$('#login').val(a.login);
		$('#password').val(a.password);
	}
}
