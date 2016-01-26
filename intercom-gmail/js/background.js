chrome.runtime.onInstalled.addListener(function (tab) {
	if (localStorage.getItem('install_time')) {
		return;
	}
	var now = new Date().getTime();
	localStorage.setItem('install_time', now);
	chrome.tabs.create({url: 'forms/options.html'});
});

chrome.browserAction.onClicked.addListener(function(tab) {
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
});