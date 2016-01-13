document.addEventListener("DOMContentLoaded", function() {
	var a = document.getElementById("intercom-gmail");
	a && a.addEventListener("change", enableDisable);
	chrome.storage.local.get("intercomGmailEnabled", initializeIntercomGmail);
});

var enabled = false;

function getIntercomGmailEnabled() {
	chrome.storage.local.get('intercomGmailEnabled', getEnabled);
	return enabled;
}

function getEnabled(a) {
	enabled = (a && (n = a.intercomGmailEnabled));
}

function enableDisable() {
	getIntercomGmailEnabled();
	var a = document.getElementById("intercom-gmail");
	a && chrome.storage.local.set({
		intercomGmailEnabled: a.checked
	})
}

function initializeIntercomGmail(a) {
	var b = !1;
	a && (b = a.intercomGmailEnabled);
	if (a = document.getElementById("intercom-gmail"))
		void 0 == b ? (chrome.storage.local.set({
			intercomGmailEnabled: !0
		}), a.checked = !0) : a.checked = b ? !0 : !1
}

document.getElementById('options-btn').onclick = function() {
	var options_url = chrome.extension.getURL('/forms/options.html');
	chrome.tabs.query({
		url: options_url
	}, function(tabs) {
		var props, _ref;
		if (tabs.length > 0) {
			props = {
					active: true
			};
			props.url = options_url;
			chrome.tabs.update(tabs[0].id, props);
			window.close();
		} else {
			chrome.tabs.getSelected(null, function(tab) {
				if('chrome://newtab/' === tab.url) {
					props = {
							active: true
					};
					props.url = options_url;
					chrome.tabs.update(tab.id, props);
					window.close();
				} else {
					chrome.tabs.create({
						url: options_url
					});
				}
			});
		}
	});
}
