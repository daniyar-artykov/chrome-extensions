$(document).ready(function() {
	initializeSavedDetails();
});

var alarmName = 'synchronization';
var tmpFolder = null;

$('#choose-dir').click(function() {
	$('#alert-div').hide();
	chrome.fileSystem.chooseEntry({type: 'openDirectory'}, function(theEntry) {
		if (!theEntry) {
			$('#alert-div').removeClass().addClass('alert').addClass('alert-warning');
			$('#alert-msg').text('No Directory selected.');
			$('#alert-div').show();
			return;
		}
		// use local storage to retain access to this file
		chrome.storage.local.set({'chosen_dir_tmp': chrome.fileSystem.retainEntry(theEntry)});
		chrome.fileSystem.getDisplayPath(theEntry, function(path) {
			$('#sync-directory').val(path);
		});
	});
});

$('#save-btn').click(function() {
	console.log('tmpFolder: ' + tmpFolder);
	if(!$('#sync-directory').val()) {
		// remove alarm
		cancelAlarm();
		var b = {};
		var stSoftware = {
				'url_api': $('#url-api').val(),
				'username': $('#username').val(),
				'password': $('#password').val(),
				'sync_dir': $('#sync-directory').val(),
				'chosen_dir': null
		}

		b['stSoftware'] = stSoftware;
		console.log('set url_api: %s; username: %s; password: %s; sync-dir: %s', 
				stSoftware.url_api, stSoftware.username, stSoftware.password, 
				stSoftware.sync_dir);
		chrome.storage.local.set(b);
	} else if($('#sync-directory').val() != tmpFolder) {
		// use local storage to retain access to this file
		chrome.storage.local.get('chosen_dir_tmp', function(items) {
			if (items.chosen_dir_tmp) {
				// if an entry was retained earlier, see if it can be restored
				chrome.fileSystem.isRestorable(items.chosen_dir_tmp, function(bIsRestorable) {
					// the entry is still there, load the content
					console.info("Restoring " + items.chosen_dir_tmp);
					chrome.fileSystem.restoreEntry(items.chosen_dir_tmp, function(chosenEntry) {
						if (chosenEntry) {
							//chrome.storage.local.set({'chosenDir': chrome.fileSystem.retainEntry(chosenEntry)});
							
							var b = {};
							var stSoftware = {
									'url_api': $('#url-api').val(),
									'username': $('#username').val(),
									'password': $('#password').val(),
									'sync_dir': $('#sync-directory').val(),
									'chosen_dir': chrome.fileSystem.retainEntry(chosenEntry)
							}

							b['stSoftware'] = stSoftware;
							console.log('set url_api: %s; username: %s; password: %s; sync-dir: %s', 
									stSoftware.url_api, stSoftware.username, stSoftware.password, 
									stSoftware.sync_dir);
							chrome.storage.local.set(b);
							tmpFolder = $('#sync-directory').val();
						}
					});
				});
			}
		});

		// recreate alarm
		cancelAlarm();
		createAlarm();
		
		$('#alert-div').removeClass().addClass('alert').addClass('alert-success');
		$('#alert-msg').text('Saved successfully!');
		$('#alert-div').show();
	}
});

function createAlarm() {
	console.log('alarm created');
	chrome.alarms.create(alarmName, {periodInMinutes: 1});
}

function cancelAlarm() {
	console.log('alarm cancelled');
	chrome.alarms.clear(alarmName);
}

function initializeSavedDetails() {
	chrome.storage.local.get('stSoftware', initializeSavedData);
}

function initializeSavedData(a) {
	if (a && (a = a['stSoftware'])) {
		$('#url-api').val(a.url_api);
		$('#username').val(a.username);
		$('#password').val(a.password);
		$('#sync-directory').val(a.sync_dir);
		tmpFolder = a.sync_dir;
		console.log(tmpFolder);
	}
}
