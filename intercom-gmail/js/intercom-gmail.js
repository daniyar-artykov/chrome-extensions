var appId = '';
var apiKey = '';

$(document).ready(function() {
	var options_url = chrome.extension.getURL('/forms/options.html');
	$('#settings-link').prop('href', options_url);
	chrome.storage.local.get('userData', initializeUserDataControls);
});

function initializeUserDataControls(a) {
	if (a && (a = a['userData'])) {
		$.ajax({
			url : 'https://api.intercom.io/users',
			type : 'GET',
			data : {
				email : 'kamiarcustomer@gmail.com'
			},
			dataType : 'json',
			headers : {
				Accept: 'application/json',
				'Authorization' : 'Basic '
					+ btoa(a.appId + ':' + a.apiKey)
			},
			success : function(result) {

			},
			error : function(xhr, ajaxOptions,
					thrownError) {
				console.log(xhr.status);
				console.log(thrownError);
			}
		});
	}
}