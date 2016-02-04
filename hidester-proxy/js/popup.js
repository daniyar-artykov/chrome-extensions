var proxies = ['us', 'eu'];

document.addEventListener("DOMContentLoaded", function() {
	// add event listener to all checkboxes
	for (var i = 0; i < proxies.length; ++i) {
		document.getElementById('proxy-' + proxies[i]).addEventListener('click', function(e) {
			var hidester_url = chrome.extension.getURL('/forms/hidester.html');

			if(document.getElementById(e.target.id).checked) {
				// change label color to active
				document.getElementById(e.target.id + '-label').className += " active";

				// find all checkboxes and uncheck them
				var checks = document.querySelectorAll('#proxies-table input[type="checkbox"]');
				for(var i = 0; i < checks.length; i++) {
					var check = checks[i];
					if(check.id !== e.target.id && check.checked && !check.disabled) {
						check.checked = false;
						// change label color to inactive
						document.getElementById(check.id + '-label').className =
							document.getElementById(check.id + '-label').className.replace(/(?:^|\s)active(?!\S)/g, '');
					}
				}
				chrome.tabs.getSelected(null, function(tab) {
					hidester_url = hidester_url + '?server=' + e.target.id + '&url=' + tab.url;
					console.log(hidester_url);
					chrome.tabs.query({
						url: hidester_url
					}, function(tabs) {
						var props, _ref;
						chrome.tabs.getSelected(null, function(tab) {
							props = {
									active: true
							};
							props.url = hidester_url;
							chrome.tabs.update(tab.id, props);
							window.close();
						});
					});
				});				
			} else {
				// change label color to inactive
				document.getElementById(e.target.id + '-label').className =
					document.getElementById(e.target.id + '-label').className.replace(/(?:^|\s)active(?!\S)/g, '');
			}
		});
	}
});

