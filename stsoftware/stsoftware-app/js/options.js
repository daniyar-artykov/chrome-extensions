var LOGGING_LEVEL_DEBUG = "debug";
var LOGGING_LEVEL_INFO = "info";
var LOGGING_LEVEL_WARNING = "warning";
var LOGGING_LEVEL_ERROR = "error";
var LOGGING_LEVEL_DEBUG = "debug";

$(document).ready(function() {
	initializeSavedDetails();
});

$('#url-api').bind('keyup change', function(e) {
	delay(function(){
		validate()
	}, 500);
});

$('#username').bind('keyup change', function(e) {
	delay(function(){
		validate()
	}, 500);
});

$('#password').bind('keyup change', function(e) {
	delay(function(){
		validate()
	}, 500);
});

$('#choose-dir').click(chooseEntry);
$('#sync-directory').click(chooseEntry);

function chooseEntry() {
	$('#alert-div').hide();
	chrome.fileSystem.chooseEntry({type: 'openDirectory'}, function(theEntry) {
		if (!theEntry) {
			$('#alert-div').removeClass().addClass('alert').addClass('alert-warning');
			$('#alert-msg').text('No Directory selected.');
			$('#alert-div').show();
			validate();
			return;
		}
		// use local storage to retain access to this file
		chrome.storage.local.set({'chosen_dir_tmp': chrome.fileSystem.retainEntry(theEntry)});
		chrome.fileSystem.getDisplayPath(theEntry, function(path) {
			$('#sync-directory').val(path);
			validate();
		});
	});
}

$('#test-btn').click(function() {
	chrome.runtime.sendMessage( {msg: 'test'}, function(response) {

	});
});

$('#save-btn').click(function() {
	$("#popup-loader-container").show();
	// use local storage to retain access to this file
	chrome.storage.local.get('chosen_dir_tmp', function(items) {
		if (items.chosen_dir_tmp) {
			// if an entry was retained earlier, see if it can be restored
			chrome.fileSystem.isRestorable(items.chosen_dir_tmp, function(bIsRestorable) {
				// the entry is still there, load the content
				chrome.fileSystem.restoreEntry(items.chosen_dir_tmp, function(chosenEntry) {
					if (chosenEntry) {
						var apiUrl = $('#url-api').val();
						var username = $('#username').val();
						var password = $('#password').val();

						if(apiUrl.slice(-1) == '/') {
							apiUrl = apiUrl.substring(0, apiUrl.length - 1);
							$('#url-api').val(apiUrl);
						}

						// request available sites for test credentials
						$.ajax({
							url : apiUrl + '/ReST/v5/class/Site',
							type : 'GET',
							data : {},
							dataType : 'json',
							headers : {
								Accept: 'application/json',
								'Authorization' : 'Basic '
									+ btoa(username + ':' + password)
							},
							success : function(response) {
								var b = {};
								var stSoftware = {
										'url_api': apiUrl,
										'username': username,
										'password': password,
										'sync_dir': $('#sync-directory').val(),
										'chosen_dir': chrome.fileSystem.retainEntry(chosenEntry)
								}

								b['stSoftware'] = stSoftware;
								console.debug('Store data: apiUrl=%s; username=%s; password=%s; syncDir=%s', 
										stSoftware.url_api, stSoftware.username, stSoftware.password, 
										stSoftware.sync_dir);

								chrome.storage.local.set(b, function() {
									// send to background process message
									chrome.runtime.sendMessage( {msg: 'process'}, function(response) {
//										$("#popup-loader-container").show();
									});
								});
							},
							error : function(xhr, ajaxOptions,
									thrownError) {
								console.error(xhr.status);
								console.error(thrownError);
								$('#alert-div').removeClass().addClass('alert').addClass('alert-warning');
								$('#alert-msg').text('Please enter valid API credentials. Error: ' 
										+ xhr.status + ' ' + thrownError);
								$('#alert-div').show();
								$("#popup-loader-container").hide();
								return;
							}
						});
					} else {
						$('#alert-div').removeClass().addClass('alert').addClass('alert-warning');
						$('#alert-msg').text('Error: broken directory!');
						$('#alert-div').show();
						$("#popup-loader-container").hide();
					}
				});
			});
		}
	});
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if(request.logging) {
		logging(request.logging, request.msg);
	} else {
		$('#alert-div').removeClass().addClass('alert').addClass(request.msg.indexOf('Error: ') > -1 ? 'alert-danger' : 'alert-success');
		$('#alert-msg').text(request.msg);
		$('#alert-div').show();
		$("#popup-loader-container").hide();
	}

	sendResponse({msg: 'ok'});
});

function initializeSavedDetails() {
	chrome.storage.local.get('stSoftware', function(a) {
		if (a && (a = a['stSoftware'])) {
			$('#url-api').val(a.url_api);
			$('#username').val(a.username);
			$('#password').val(a.password);
			$('#sync-directory').val(a.sync_dir);
			$("#popup-loader-container").show();
			// request available sites for test credentials
			logging(LOGGING_LEVEL_INFO, 'validate credentials...');
			$.ajax({
				url : a.url_api + '/ReST/v5/class/Site',
				type : 'GET',
				data : {},
				dataType : 'json',
				headers : {
					Accept: 'application/json',
					'Authorization' : 'Basic '
						+ btoa(a.username + ':' + a.password)
				},
				success : function(response) {
					console.debug('Test API credentials RESPONSE')
					console.debug(response);

					logging(LOGGING_LEVEL_INFO, 'OK');

					validate();
					$("#popup-loader-container").hide();
				},
				error : function(xhr, ajaxOptions,
						thrownError) {
					console.error(xhr.status);
					console.error(thrownError);
					$('#alert-div').removeClass().addClass('alert').addClass('alert-warning');
					$('#alert-msg').text('Please enter valid API credentials. Error: ' 
							+ xhr.status + ' ' + thrownError);
					$('#alert-div').show();
					$("#popup-loader-container").hide();

					logging(LOGGING_LEVEL_ERROR, 'Please enter valid API credentials. Error: ' + xhr.status + ' ' + thrownError);

					return;
				}
			});
		}
	});
}

function validate() {
	logging(LOGGING_LEVEL_DEBUG, 'validating entered data...');
	$('#alert-div').hide();
	var apiUrl = $('#url-api').val();
	var username = $('#username').val();
	var password = $('#password').val();
	var directory = $('#sync-directory').val();
	console.log('Validate: apiUrl=%s; username=%s; password=%s; syncDir=%s',
			apiUrl, username, password, directory);
	if(apiUrl && username && password && directory) {
		$('#save-btn').prop('disabled', false);
	} else {
		$('#save-btn').prop('disabled', true);
	}
}

var delay = (function() {
	var timer = 0;
	return function(callback, ms) {
		clearTimeout (timer);
		timer = setTimeout(callback, ms);
	};
})();

function logging(level, msg) {
	var c = new Date();
	var loggingDiv = $('#logging');
	var text = loggingDiv.html();
	text = text + '<label class="' + level + '"> <b>' + level.toUpperCase() + '</b>: ' + msg + '</label>';
	loggingDiv.html(text);
	loggingDiv.scrollTop(loggingDiv.prop('scrollHeight'));
}


