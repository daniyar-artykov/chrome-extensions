var currentDate = new Date();
var startedTimeMillis = currentDate.getTime();
var lastModifiedTimeMillis = 1; //9007199254740992; // set to max integer value
var ALARM_NAME_MONITOR_DIR = 'monitorDirectory';

chrome.app.runtime.onLaunched.addListener(function(launchData) {
	chrome.app.window.create('forms/options.html', {id:"fileWin", innerBounds: {width: 800, height: 500}}, function(win) {
		win.contentWindow.launchData = launchData;
	});
});

chrome.alarms.onAlarm.addListener(function( alarm ) {
	console.log('alarm: ' + alarm.name);
	if(alarm.name == 'synchronization') {
		chrome.storage.local.get('stSoftware', synchronize);
	} else if(alarm.name == ALARM_NAME_MONITOR_DIR) {
		chrome.storage.local.get('stSoftware', monitorDir);
	}
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	console.log(request.msg);

	if(request.msg == 'pullResources') {
		chrome.storage.local.get('stSoftware', pullResourcesFirstTime);
		console.log(startedTimeMillis);
		currentDate = new Date();
		startedTimeMillis = currentDate.getTime();
		console.log(startedTimeMillis);

		var b = {};
		var time = {'startedTimeMillis': startedTimeMillis};
		b['startedTime'] = time;
		chrome.storage.local.set(b);
	} 

	sendResponse({msg: 'ok'});
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
								q : 'name=\'' + a.site + '\''
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

									chrome.storage.local.get('startedTime', function(result){
										console.log('since: ' + result.startedTimeMillis);
										
										if(!result.startedTimeMillis) {
											currentDate = new Date();
											startedTimeMillis = currentDate.getTime();
										} else {
											startedTimeMillis = result.startedTimeMillis;
										}
										
										$.ajax({
											url : a.url_api + '/ReST/v3/sync/SiteResource',
											type : 'GET',
											data : {
												block : '1 min',
												since : startedTimeMillis
											},
											dataType : 'json',
											headers : {
												Accept: 'application/json',
												'Authorization' : 'Basic '
													+ btoa(a.username + ':' + a.password)
											},
											success : function(responseSiteResource) {
												console.log(responseSiteResource);

												if(responseSiteResource.since) {
													startedTimeMillis = responseSiteResource.since;
													var b = {};
													var time = {'startedTimeMillis': startedTimeMillis};
													b['startedTime'] = time;
													chrome.storage.local.set(b);
												}

												if(responseSiteResource.results && responseSiteResource.results.length > 0) {
													pullResources(a.url_api, a.username, a.password, siteKey, chosenEntry);
												}
											},
											error : function(xhr, ajaxOptions,
													thrownError) {
												console.log(xhr.status);
												console.log(thrownError);
											}
										});
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

function syncV3(a) {

}

function pullResourcesFirstTime(a) {
	console.log('pullResourcesFirstTime');
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
								q : 'name=\'' + a.site + '\''
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
									pullResources(a.url_api, a.username, a.password, 
											siteKey, chosenEntry, function() {
										cancelWatchService();
										createWatchService();
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

function pullResources(apiUrl, username, password, siteKey, chosenEntry, callback) {
	console.log('pullResources(apiUrl, username, password, siteKey, chosenEntry)');
	$.ajax({
		url : apiUrl + '/ReST/v5/class/SiteResource',
		type : 'GET',
		data : {
			q : 'site IS \'' + siteKey +  '\''
		},
		dataType : 'json',
		headers : {
			Accept: 'application/json',
			'Authorization' : 'Basic '
				+ btoa(username + ':' + password)
		},
		success : function(responseSiteResource) {
//			console.log(responseSiteResource);
			if(responseSiteResource.results && responseSiteResource.results.length > 0) {
				var lastId = responseSiteResource.results.length - 1;
				$.each(responseSiteResource.results, function(index, element) {
					if(element) {
						console.log(element.path);
						// create folder
						if(element.path.indexOf('/') > -1 || element.path.indexOf('\\') > -1) {
							var lastIndex = element.path.lastIndexOf('/') == -1 ? element.path.lastIndexOf('//') : element.path.lastIndexOf('/');
							createDir(chosenEntry, element.path.substring(0, lastIndex).split('/'));
						}
						// write file
						var data;
						var type = element.type.code;
						console.log(type);
						switch (type) {
						case 'JS':
							data = element.script;
							break;
						case 'CSS':
							data = element.css;
							break;
						case 'HTML':
							data = element.html;
							break;
						default:
						}
//						console.log(data);
						chrome.fileSystem.getWritableEntry(chosenEntry, function(entry) {
							entry.getFile(element.path, { create: true }, function(entry) {
								readAsText(entry, function(result) {
//									console.log(result);
									if(result != data) {
										console.log('rewrite file (or create and write if it does not exist)');
										entry.createWriter(function(writer) {
											writer.write(new Blob([data], {type: 'text/plain'}));
										});
									} else {
										console.log('file is the same, ignore it');
									}
								});
							});
						});
					}

					if(lastId == index) { // finally set the last modified time in millis
						currentDate = new Date();
						lastModifiedTimeMillis = currentDate.getTime();
						if (callback && typeof(callback) === "function") {
							callback();
						}
					}
				});
			} else {
				if (callback && typeof(callback) === "function") {
					callback();
				}
			}
		},
		error : function(xhr, ajaxOptions,
				thrownError) {
			console.log(xhr.status);
			console.log(thrownError);
			if (callback && typeof(callback) === "function") {
				callback();
			}
		}
	});
}

function readAsText(fileEntry, callback) {
	fileEntry.file(function(file) {
		var reader = new FileReader();

		reader.onerror = errorHandler;
		reader.onload = function(e) {
			callback(e.target.result);
		};

		reader.readAsText(file);
	});
}

function createDir(rootDirEntry, folders) {
	// Throw out './' or '/' and move on to prevent something like '/foo/.//bar'.
	if (folders[0] == '.' || folders[0] == '') {
		folders = folders.slice(1);
	}
	rootDirEntry.getDirectory(folders[0], {create: true}, function(dirEntry) {
		// Recursively add the new subfolder (if we still have another to create).
		if (folders.length) {
			createDir(dirEntry, folders.slice(1));
		}
	}, errorHandler);
}

function monitorDir(a) {
	console.log('monitorDir(a)');
	if (a && (a = a['stSoftware'])) {
		if(a.url_api && a.username && a.password && a.chosen_dir) {
			// if an entry was retained earlier, see if it can be restored
			chrome.fileSystem.isRestorable(a.chosen_dir, function(bIsRestorable) {
				// the entry is still there, load the content
				console.info("Restoring " + a.chosen_dir);
				chrome.fileSystem.restoreEntry(a.chosen_dir, function(chosenEntry) {
					if (chosenEntry) {
						loadDirEntry(chosenEntry, a.sync_dir, a.url_api, a.site, a.username, a.password);
					}
				});
			});
		}
	}
}

function loadDirEntry(_chosenEntry, syncDir, apiUrl, site, username, password) {
	console.log('loadDirEntry');
	chosenEntry = _chosenEntry;
	if (chosenEntry.isDirectory) {
		var dirReader = chosenEntry.createReader();

		// Call the reader.readEntries() until no more results are returned.
		var readEntries = function() {
			dirReader.readEntries (function(results) {
				if (!results.length) {
					// no files and directories 
				} else {
					results.forEach(function(item) { 
						if(item.isDirectory) {
							loadDirEntry(item, syncDir, apiUrl, site, username, password);
						} else {
							// read file
							item.getMetadata(function(data) {
								console.log('file: ' + data.modificationTime.getTime() + '>' + lastModifiedTimeMillis);
								if(data.modificationTime.getTime() > lastModifiedTimeMillis) {
									sendFile(item, syncDir, apiUrl, site, username, password);

									lastModifiedTimeMillis = data.modificationTime.getTime();
								}
							}); 
						}
					});
					readEntries();
				}
			}, errorHandler);
		};

		readEntries(); // Start reading dirs.    
	} else {
		console.log('unreachable reached :)');
		//TODO unreachable, should be tested
	}
}

function sendFile(entry, syncDir, apiUrl, site, username, password) {
	chrome.fileSystem.getDisplayPath(entry, function(path) {
		console.log('path: ' + path.substring(syncDir.length));
		var siteKey = null;
		$.ajax({
			url : apiUrl + '/ReST/v5/class/Site',
			type : 'GET',
			data : {
				q : 'name=\'' + site + '\''
			},
			dataType : 'json',
			headers : {
				Accept: 'application/json',
				'Authorization' : 'Basic '
					+ btoa(username + ':' + password)
			},
			success : function(responseSite) {
//				console.log(responseSite);
				if(responseSite.results && responseSite.results.length > 0) {
					siteKey = responseSite.results[0]._global_key;
					$.ajax({
						url : apiUrl + '/ReST/v5/class/SiteResource',
						type : 'GET',
						data : {
							q : 'site IS \'' + siteKey +  '\' and path=\'' + path.substring(syncDir.length) + '\''
						},
						dataType : 'json',
						headers : {
							Accept: 'application/json',
							'Authorization' : 'Basic '
								+ btoa(username + ':' + password)
						},
						success : function(response) {
//							console.log(responseSiteResource);
							if(response.results && response.results.length == 1) {
								readAsText(entry, function(data) {

									var type = response.results[0].type.code;
									console.log(type);
									var params = {};

									switch (type) {
									case 'JS':
										params.script = data;
										break;
									case 'CSS':
										params.css = data;
										break;
									case 'HTML':
										params.html = data;
										break;
									default:
										console.error('unknown type: ' + type);
									}

									$.ajax({
										url : apiUrl + '/ReST/v5/class/SiteResource/' + response.results[0]._key,
										type : 'PUT',
										data : params,
										dataType : 'json',
										headers : {
											Accept: 'application/json',
											'Authorization' : 'Basic '
												+ btoa(username + ':' + password)
										},
										success : function(responseSiteResource) {
											console.log(responseSiteResource);
										},
										error : function(xhr, ajaxOptions,
												thrownError) {
											console.log(xhr.status);
											console.log(thrownError);
										}
									});

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
	});
}

function errorHandler(e) {
	console.error(e);
}

function createWatchService() {
	console.log('watchservice created');
	chrome.alarms.create(ALARM_NAME_MONITOR_DIR, {periodInMinutes: 1});
}

function cancelWatchService() {
	console.log('watchservice cancelled');
	chrome.alarms.clear(ALARM_NAME_MONITOR_DIR);
}
