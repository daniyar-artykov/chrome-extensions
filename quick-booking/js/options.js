$(document).ready(function() {
	$('#journey-date').datepicker({
		dateFormat: 'dd.mm.yy'
	});
	initializeSavedDetails();

	$('#from-station').autocomplete({
		source: 'https://epay.railways.kz/ktz4/json4.jsp',
		minLength: 2,
		select: function( event, ui ) {
			setFrom(ui.item.id);
		},
		change: function( event, ui ) {
			if(ui.item == null) {
				setFrom('');
			} else {
				setFrom(ui.item.id);
			}
		}
	});
	$('#to-station').autocomplete({
		source: 'https://epay.railways.kz/ktz4/json4.jsp',
		minLength: 2,
		select: function( event, ui ) {
			setTo(ui.item.id);
		},
		change: function( event, ui ) {
			if(ui.item == null) {
				setTo('');
			} else {
				setTo(ui.item.id);
			}
		}
	});

});

$('#revert-direction-btn').click(function() {
	var from = $('#from-station').val();
	var to = $('#to-station').val();
	$('#from-station').val(to);
	$('#to-station').val(from);

	from = $('#from-station-hidden').val();
	to = $('#to-station-hidden').val();
	$('#from-station-hidden').val(to);
	$('#to-station-hidden').val(from);
});

$('#save-btn').click(function() {
	var b = {};
	var railways = {
			'login': $('#login').val(),
			'password': $('#password').val(),
			'fromHidden': $('#from-station-hidden').val(),
			'toHidden': $('#to-station-hidden').val(),
			'from': $('#from-station').val(),
			'to': $('#to-station').val(),
			'journeyDate': $('#journey-date').val()
	}

	b['railways'] = railways;
	console.debug('set login: %s; password: %s; from: %s; to: %s; from-hidden: %s; to-hidden: %s; journey-date: %s', 
			railways.login, railways.password, railways.from, railways.to,
			railways.fromHidden, railways.toHidden, railways.journeyDate);
	chrome.storage.local.set(b);
});

function initializeSavedDetails() {
	chrome.storage.local.get('railways', initializeLoginControls);
}

function initializeLoginControls(a) {
	if (a && (a = a['railways'])) {
		$('#login').val(a.login);
		$('#password').val(a.password);
		$('#from-station').val(a.from);
		$('#to-station').val(a.to);
		$('#from-station-hidden').val(a.fromHidden);
		$('#to-station-hidden').val(a.toHidden);
		$('#journey-date').val(a.journeyDate);
	}
}

function setFrom(id) {
	$('#from-station-hidden').val(id);
}

function setTo(id) {
	$('#to-station-hidden').val(id);
}
