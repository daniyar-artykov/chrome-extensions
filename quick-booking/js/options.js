$(document).ready(function() {
	$('#journey-date').datepicker({
		dateFormat: 'dd.mm.yy'
	});
	initializeSavedDetails();

	$('#from-station').autocomplete({
		source: 'https://epay.railways.kz/ktz4/json4.jsp',
		minLength: 2,
		select: function(event, ui) {
			setFrom(ui.item.id);
		},
		change: function(event, ui) {
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
		select: function(event, ui) {
			setTo(ui.item.id);
		},
		change: function(event, ui) {
			if(ui.item == null) {
				setTo('');
			} else {
				setTo(ui.item.id);
			}
		}
	});

});

var is = {
		char : function(key) {
			return ( key > 96 && key < 133 ) 
			|| (key > 64 && key < 91) 
			|| (key > 1071 && key < 1104) 
			|| (key > 1039 && key < 1072) 
			|| (key > 1039 && key < 1072)
//			|| (key == 1200 || key == 1201)
//|| (key == 1210 || key == 1211)
//|| (key == 1030 || key == 1110)
//			|| (key == 1186 || key == 1187)
//			|| (key == 1170 || key == 1171)
//			|| (key == 1198 || key == 1199)
//			|| (key == 1178 || key == 1179)
//			|| (key == 1256 || key == 1257)
//			|| (key == 1240 || key == 1241);
		},
		ctrlKey : function(key) {
			return "8 9 13 16 17 18 20 35 36 37 38 39 40 46 ".indexOf(key + " ") != -1;
		},
		number : function(key) {
			return ( key > 47 && key < 58 );
		},
		space : function(key) {
			return key == 32;
		},
		minus : function(key) {
			return key == 45;
		},
		other : function(key) {
			return ((key == 45) || (key == 46));
		}
};
function checkCharsAndNumbers(e) {
	var e = e || window.event;
	var code = e.which ? e.which : e.keyCode;
	var res=is.char(code)  || is.ctrlKey(code) || is.other(code) || is.number(code);
//	console.log("code="+code);
	if(!res){
		alert("Разрешены только кириллица, латинские буквы и цифры. Без пробелов.");
	}
	return res;
	/*a-97, z122, A65 Z90, a1072, я1103 А1040 Я1071 0-48 9-57 space=32 */
}
function checkChars(e) {
	var e = e || window.event;
	var code = e.which ? e.which : e.keyCode;
	var res=is.char(code) || is.ctrlKey(code) || is.other(code) || is.minus(code);
	if(!res){
		alert("Разрешены только кириллица и латинские буквы. Без пробелов.");
	}
	return res;
	/*a-97, z122, A65 Z90, a1072, я1103 А1040 Я1071 0-48 9-57 space=32 */
}

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
