$(document).ready(function() {
	initializeSavedDetails();
});

$('#save-btn').click(function() {
	var b = {};
	var userData = {
			'appId': $('#app-id').val(),
			'apiKey': $('#api-key').val()
	}

	b['userData'] = userData;
	chrome.storage.local.set(b, function() {
		$('#success-alert').show();    
	});
});

function initializeSavedDetails() {
	chrome.storage.local.get('userData', initializeUserDataControls);
}

function initializeUserDataControls(a) {
	if (a && (a = a['userData'])) {
		$('#app-id').val(a.appId);
		$('#api-key').val(a.apiKey);
	}
}
