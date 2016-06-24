chrome.app.runtime.onLaunched.addListener(function(launchData) {
	chrome.app.window.create('forms/options.html', {id:"fileWin", innerBounds: {width: 800, height: 500}}, function(win) {
		win.contentWindow.launchData = launchData;
	});
});

chrome.alarms.onAlarm.addListener(function( alarm ) {
	console.log('alarm');
	chrome.storage.local.get('stSoftware', synchronize);

});

function synchronize(a) {
	if (a && (a = a['stSoftware'])) {
		if(a.url_api && a.username && a.password && a.chosen_dir) {
			// if an entry was retained earlier, see if it can be restored
			chrome.fileSystem.isRestorable(a.chosen_dir, function(bIsRestorable) {
				// the entry is still there, load the content
				console.info("Restoring " + a.chosen_dir);
				chrome.fileSystem.restoreEntry(a.chosen_dir, function(chosenEntry) {
					if (chosenEntry) {
						var siteKey = null;
						$.ajax({
							url : a.url_api + '/ReST/v5/class/Site',
							type : 'GET',
							data : {
								q : 'name=\'app-contact-list2\''
							},
							dataType : 'json',
							headers : {
								Accept: 'application/json',
								'Authorization' : 'Basic '
									+ btoa(a.username + ':' + a.password)
							},
							success : function(responseSite) {
//								console.log(responseSite);
								if(responseSite.results && responseSite.results.length > 0) {
									siteKey = responseSite.results[0]._global_key;
									// pull resources
									$.ajax({
										url : a.url_api + '/ReST/v5/class/SiteResource',
										type : 'GET',
										data : {
											q : 'site IS \'' + siteKey +  '\''
										},
										dataType : 'json',
										headers : {
											Accept: 'application/json',
											'Authorization' : 'Basic '
												+ btoa(a.username + ':' + a.password)
										},
										success : function(responseSiteResource) {
//											console.log(responseSiteResource);
											if(responseSiteResource.results && responseSiteResource.results.length > 0) {
												$.each(responseSiteResource.results, function(index, element) {
													if(element) {
														console.log(element.path);
														// create folder
														if(element.path.indexOf('/') > -1 || element.path.indexOf('\\') > -1) {
															var lastIndex = element.path.lastIndexOf('/') == -1 ? element.path.lastIndexOf('//') : element.path.lastIndexOf('/');
															chosenEntry.getDirectory(element.path.substring(0, lastIndex), { create: true }, function() { 
																console.log(element.path); 
															}, function(error) { 
																console.log(error);
															});
														} else {
															// create file
														}
													}
												});
											}
										},
										error : function(xhr, ajaxOptions,
												thrownError) {
											console.log(xhr.status);
											console.log(thrownError);
										}
									});
								}
							},
							error : function(xhr, ajaxOptions,
									thrownError) {
								console.log(xhr.status);
								console.log(thrownError);
							}
						});
					}
				});
			});
		}

	}
}
