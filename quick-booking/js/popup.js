document.getElementById('options-btn').onclick = function() {
	var options_url;
	options_url = chrome.extension.getURL('/forms/options.html');
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
		} else {
			chrome.tabs.getSelected(null, function(tab) {
				if('chrome://newtab/' === tab.url) {
					props = {
							active: true
					};
					props.url = options_url;
					chrome.tabs.update(tab.id, props);
				} else {
					chrome.tabs.create({
						url: options_url
					});
				}
			});
		}
	});
}
