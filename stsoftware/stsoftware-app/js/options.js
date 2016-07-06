$(document).ready(function() {
	initializeSavedDetails();
	validate();
	loader();
});


$('#url_api').on('blur change', validate);
$('#username').on('blur change', validate);
$('#password').on('blur change', validate);

$('#choose-dir').click(chooseEntry);
$('#sync-directory').click(chooseEntry);

function chooseEntry() {
	$('#alert-div').hide();
	chrome.fileSystem.chooseEntry({type: 'openDirectory'}, function(theEntry) {
		if (!theEntry) {
			$('#alert-div').removeClass().addClass('alert').addClass('alert-warning');
			$('#alert-msg').text('No Directory selected.');
			$('#alert-div').show(
			validate(););
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

$('#save-btn').click(function() {
	// use local storage to retain access to this file
	chrome.storage.local.get('chosen_dir_tmp', function(items) {
		if (items.chosen_dir_tmp) {
			// if an entry was retained earlier, see if it can be restored
			chrome.fileSystem.isRestorable(items.chosen_dir_tmp, function(bIsRestorable) {
				// the entry is still there, load the content
				console.info("Restoring " + items.chosen_dir_tmp);
				chrome.fileSystem.restoreEntry(items.chosen_dir_tmp, function(chosenEntry) {
					if (chosenEntry) {

						var b = {};
						var stSoftware = {
								'url_api': $('#url-api').val(),
								'username': $('#username').val(),
								'password': $('#password').val(),
								'sync_dir': $('#sync-directory').val(),
								'chosen_dir': chrome.fileSystem.retainEntry(chosenEntry),
								'site': $('#site').val()
						}

						b['stSoftware'] = stSoftware;
						console.log('set url_api: %s; username: %s; password: %s; sync-dir: %s; site: %s', 
								stSoftware.url_api, stSoftware.username, stSoftware.password, 
								stSoftware.sync_dir, stSoftware.site);

						if(stSoftware.url_api.slice(-1) == '/') {
							stSoftware.url_api = stSoftware.url_api.substring(0, stSoftware.url_api.length - 1);
							$('#url-api').val(stSoftware.url_api);
						}

						chrome.storage.local.set(b, function() {
							// send to background process message
							chrome.runtime.sendMessage( {msg: 'process'}, function(response) {
								$("#popup-loader-container").show();
							});
						});
					}
				});
			});
		}
	});
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	console.log(request.msg);
	$("#popup-loader-container").hide();
	$('#alert-div').removeClass().addClass('alert').addClass(request.msg.indexOf('Error: ') > -1 ? 'alert-danger' : 'alert-success');
	$('#alert-msg').text(request.msg);
	$('#alert-div').show();
	sendResponse({msg: 'ok'});
});

function initializeSavedDetails() {
	chrome.storage.local.get('stSoftware', initializeSavedData);
}

function initializeSavedData(a) {
	if (a && (a = a['stSoftware'])) {
		$('#url-api').val(a.url_api);
		$('#username').val(a.username);
		$('#password').val(a.password);
		$("#popup-loader-container").fadeIn();
		// request available sites
		var $el = $('#site');
		$el.empty();
		$el.append($('<option></option>').attr('value', '').text('site to sync'));
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
				console.log(response);
				if(response.results && response.results.length > 0) {
					$.each(response.results, function(index, element) {
						$el.append($("<option></option>").attr("value", element.name).text(element.name));
					});
					console.log('a.site: ' + a.site);
					$el.val(a.site);
					$el.prop('disabled', false);
					validate();
					$("#popup-loader-container").hide();
				}
			},
			error : function(xhr, ajaxOptions,
					thrownError) {
				console.log(xhr.status);
				console.log(thrownError);
				$('#alert-div').removeClass().addClass('alert').addClass('alert-warning');
				$('#alert-msg').text('Please enter valid API credentials. Error: ' 
						+ xhr.status + ' ' + thrownError);
				$('#alert-div').show();
				$("#popup-loader-container").hide();
				return;
			}
		});
	}
}

function validate() {
	$('#alert-div').hide();
	var apiUrl = $('#url-api').val();
	var username = $('#username').val();
	var password = $('#password').val();
	var directory = $('#sync-directory').val();
	console.log('apiUrl: %s; username: %s; password: %s; directory: %s',
			apiUrl, username, password, directory);
	if(apiUrl && username && password && directory) {
		$('#save-btn').prop('disabled', false);
	} else {
		$('#save-btn').prop('disabled', true);
	}
}

function loader() {
	$('.loader').each(function() {
		var c = $(this), t, change=1, start = 1, delay = 500, step = 50, state;
		if(c.hasClass('backwards')||c.hasClass('backward')) {
			start = 5;
			change = -1;
		}
		state = start;

		if(typeof(c.data('delay'))=='number') {
			delay=c.data('delay');
		}
		if(typeof(c.data('step'))=='number') {
			step=c.data('step');
		}

		c.on('tick',function() {
			c.removeClass('state-1').removeClass('state-2').removeClass('state-3').removeClass('state-4').removeClass('state-5').addClass('state-'+state);
			state += change;
			if(state > 5 || state < 1) {
				c.trigger('restart');
			} else {
				setTimeout(function() {
					c.trigger('tick');
				}, step);
			}
		});
		c.on('restart',function() {
			state = start;
			setTimeout(function() {
				c.trigger('tick');
			}, delay)
		});
		c.trigger('tick');
	});
}
