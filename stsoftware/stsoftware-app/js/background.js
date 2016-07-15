globalWatch = '';
var siteIds = [];
var pending = {};
var LOGGING_LEVEL_DEBUG = "debug";
var LOGGING_LEVEL_INFO = "info";
var LOGGING_LEVEL_WARNING = "warning";
var LOGGING_LEVEL_ERROR = "error";
var LOGGING_LEVEL_DEBUG = "debug";

chrome.app.runtime.onLaunched.addListener(function(launchData) {
	chrome.app.window.create('forms/options.html', {id:"stSoftware API"}, function(win) {
		win.contentWindow.launchData = launchData;
	    win.maximize();
	});
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	console.log('Got message: \'' + request.msg + '\'');

	if(request.msg == 'test') { // for testing
		siteIds = [];
		for(i = 0; i < 8; i++) {
			siteIds.push(i);
		}
		finish(10, 3, function(a) {
			console.log(a);
		});
	} else if(request.msg == 'process') {
		if(globalWatch) {
			globalWatch.destroy();
			globalWatch = null;
		}
		chrome.storage.local.get('stSoftware', function(a) {
			if (a && (a = a['stSoftware'])) {
				if(a.url_api && a.username && a.password && a.chosen_dir) {
					// if an entry was retained earlier, see if it can be restored
					chrome.fileSystem.isRestorable(a.chosen_dir, function(bIsRestorable) {
						// the entry is still there, load the content
						chrome.fileSystem.restoreEntry(a.chosen_dir, function(chosenEntry) {
							if (chosenEntry) {
								pullResources(a.url_api, a.username, a.password, chosenEntry, 
										function(callbackMsg) {

									var currentDate = new Date();
									var startedTimeMillis = currentDate.getTime();
									var i = 0;
									var watchService = function() {
										var destroyed = false;

										this.init = function() {
											var ajaxTime = new Date().getTime();
											console.debug('REQUEST: \'/ReST/v3/sync/SiteResource\', block=\'1 min\', since=\'' + startedTimeMillis + '\'');
											logging(LOGGING_LEVEL_DEBUG, 'REQUEST: \'/ReST/v3/sync/SiteResource\', block=\'1 min\', since=\'' + startedTimeMillis + '\'');
											$.ajax({
												url : a.url_api + '/ReST/v3/sync/SiteResource',
												type : 'GET',
												data : {
													block : '1 min',
													since : startedTimeMillis
												},
												dataType : 'json',
												headers : {
													Accept : 'application/json',
													'Authorization' : 'Basic '
														+ btoa(a.username + ':' + a.password)
												},
												success : function(responseSiteResource) {
													console.debug('RESPONSE: ');
													console.debug(responseSiteResource);

													if(responseSiteResource.since) {
														startedTimeMillis = responseSiteResource.since;
													}

													if(responseSiteResource.results && responseSiteResource.results.length > 0) {
														if(!destroyed) {
															pullResources(a.url_api, a.username, a.password, chosenEntry);
														}
													}
												},
												error : function(xhr, ajaxOptions,
														thrownError) {
													console.error(xhr.status);
													console.error(thrownError);
												}
											}).done(function () {
												var totalTime = new Date().getTime() - ajaxTime;
												console.debug('responded time: ' + totalTime);
												logging(LOGGING_LEVEL_DEBUG, 'responded time: ' + totalTime);
												if(!destroyed) {
													i++;
													globalWatch = new watchService();
													globalWatch.init();
												}
											});
										};											
										this.destroy = function() {
											destroyed = true;
										};
									}
									globalWatch = new watchService();
									globalWatch.init();

									setTimeout(createWatchService, 2000);

									sendMessage(callbackMsg);
								});
							} else {
								sendMessage('Error: Broken directory.');
								logging(LOGGING_LEVEL_ERROR, 'couldn\'t open sync directory');
							}
						});
					});
				} else {
					sendMessage('Error: API credentials couldn\'t be found');
					logging(LOGGING_LEVEL_ERROR, 'API credentials couldn\'t be found');
				}
			} else {
				sendMessage('Error: API credentials couldn\'t be found');
				logging(LOGGING_LEVEL_ERROR, 'API credentials couldn\'t be found');
			}
		});
	}
});

function sendMessage(message) {
	console.debug('Sending message: \'' + message + '\'');
	chrome.runtime.sendMessage( {msg: message}, function(response) {
		console.debug('Got response message: \'' + response.msg + '\'');
	});
}

function logging(level, message) {
	console.debug('Logging request : s% s%', level, message);
	chrome.runtime.sendMessage( {logging: level, msg: message}, function(response) {
		console.debug('Logging response : %s', response.msg);
	});
}

function pullResources(apiUrl, username, password, chosenEntry, callback) {
//	console.debug('pullResources method');
	// get all sites
	$.ajax({
		url : apiUrl + '/ReST/v5/class/Site',
		type : 'GET',
		data : {},
		dataType : 'json',
		headers : {
			Accept: 'application/json',
			'Authorization' : 'Basic '
				+ btoa(username + ':' + password)
		},
		success : function(response) {
			siteIds = [];
			if(response.results && response.results.length > 0) {
				var lastSiteId = response.results.length - 1;
				$.each(response.results, function(i, e) {

					$.ajax({
						url : apiUrl + '/ReST/v5/class/SiteResource',
						type : 'GET',
						data : {
							q : 'site IS \'' + e._global_key +  '\''
						},
						dataType : 'json',
						headers : {
							Accept: 'application/json',
							'Authorization' : 'Basic '
								+ btoa(username + ':' + password)
						},
						success : function(responseSiteResource) {
							if(responseSiteResource.results && responseSiteResource.results.length > 0) {
								var lastId = responseSiteResource.results.length - 1;
								$.each(responseSiteResource.results, function(index, element) {
									if(element) {
//										console.log(element);
										var path = e.name + '/' + element.path;
										// create folder(s)
										if(path.indexOf('/') > -1 || path.indexOf('\\') > -1) {
											var lastIndex = path.lastIndexOf('/') == -1 ? path.lastIndexOf('//') : path.lastIndexOf('/');
											createDir(chosenEntry, path.substring(0, lastIndex).split('/'));
										}
										// write file
										var data;
										var type = element.type.code;
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
										chrome.fileSystem.getWritableEntry(chosenEntry, function(entry) {
											entry.getFile(path, { create: true }, function(entry) {
												readAsText(entry, function(result) {
													if(result != data) {
														console.log('sync changed (added) file: ' + path);
														logging(LOGGING_LEVEL_INFO, 'sync changed (added) file: ' + path);
														entry.createWriter(function(writer) {
															writer.onwriteend = function(e) {
//																console.log('on writeend lastId=' + lastId + '; index=' + index + '; siteId=' + lastSiteId + '; i=' + i);
																if(lastId == index) { // finally set the last modified time in millis
																	finish(lastSiteId, i, function(a) {
																		if(a) {
																			var currentDate = new Date();
																			var lastModifiedTimeMillis = currentDate.getTime();
																			var b = {};
																			var time = {'lastModifiedTimeMillis': lastModifiedTimeMillis};
																			b['lastModified'] = time;
																			chrome.storage.local.set(b, function() {
																				if (callback && typeof(callback) === "function") {
																					chrome.notifications.create('notice', {
																						type: 'basic',
																						iconUrl: 'images/icons/128.png',
																						title: 'Notification',
																						message: 'The folder has been synchronized!'
																					}, function(notificationId) {
//																						console.debug('notificationId: ' + notificationId + ' shown!');
																					});
																					callback('The folder has been synchronized!');
																					logging(LOGGING_LEVEL_INFO, 'synchronization finished');
																				} else {
//																					chrome.notifications.create('notice', {
//																					type: 'basic',
//																					iconUrl: 'images/icons/128.png',
//																					title: 'Notification',
//																					message: 'File ' + path + ' has been updated!'
//																					}, function(notificationId) {
////																					console.debug('notificationId: ' + notificationId + ' shown! ');
//																					});
																				}
																			});
																		} else {
																			siteIds.push(i);
																		}
																	});
																}
															};

															writer.onerror = function(e) {
																console.error('write failed: ' + e.toString());
																logging(LOGGING_LEVEL_ERROR, 'write failed: ' + e.toString());
															};
															writer.write(new Blob([data], {type: 'text/plain'}));
														});
													} else {
//														console.log('lastId=' + lastId + '; index=' + index + '; siteId=' + lastSiteId + '; i=' + i);
//														console.log('file already exists and content is the same: ' + path);
														if(lastId == index) { // finally set the last modified time in millis
															finish(lastSiteId, i, function(a) {
																if(a) {
																	var currentDate = new Date();
																	var lastModifiedTimeMillis = currentDate.getTime();
																	var b = {};
																	var time = {'lastModifiedTimeMillis': lastModifiedTimeMillis};
																	b['lastModified'] = time;
																	chrome.storage.local.set(b, function() {
																		if (callback && typeof(callback) === "function") {
																			chrome.notifications.create('notice', {
																				type: 'basic',
																				iconUrl: 'images/icons/128.png',
																				title: 'Notification',
																				message: 'The folder has been synchronized!'
																			}, function(notificationId) {
																				console.debug('notificationId: ' + notificationId + ' shown! ');
																			});
																			callback('The folder has been synchronized!');
																			logging(LOGGING_LEVEL_INFO, 'synchronization finished');
																		}
																	});

																} else {
																	siteIds.push(i)
																}
															});
														}
													}
												});
											});
										});
									}
								});
							} else {
								if (callback && typeof(callback) === "function") {
//									console.debug('no files on the remote site: ' + e.name); 
									var path = e.name + '/';
									// create folder(s)
									if(path.indexOf('/') > -1 || path.indexOf('\\') > -1) {
										var lastIndex = path.lastIndexOf('/') == -1 ? path.lastIndexOf('//') : path.lastIndexOf('/');
										createDir(chosenEntry, path.substring(0, lastIndex).split('/'));
									}
									finish(lastSiteId, i, function(a) {
										if(a) {
											callback('The folder has been synchronized!');
											logging(LOGGING_LEVEL_INFO, 'synchronized finished');
										}
									});
								}
							}
						},
						error : function(xhr, ajaxOptions,
								thrownError) {
							console.error(xhr.status);
							console.error(thrownError);
							logging(LOGGING_LEVEL_ERROR, xhr.status + ' ' + thrownError);
							if (callback && typeof(callback) === "function") {
								callback('Error: ' + xhr.status + ' ' + thrownError);
							}
						}
					});
				});
			}
		},
		error : function(xhr, ajaxOptions,
				thrownError) {
			console.error(xhr.status);
			console.error(thrownError);
			logging(LOGGING_LEVEL_ERROR, xhr.status + ' ' + thrownError);
			return;
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

function monitorDir() {
	console.log('track dir to changes...');
	logging(LOGGING_LEVEL_DEBUG, 'track dir to changes...');
	chrome.storage.local.get('stSoftware', function(a){
		if (a && (a = a['stSoftware'])) {
			if(a.url_api && a.username && a.password && a.chosen_dir) {
				// if an entry was retained earlier, see if it can be restored
				chrome.fileSystem.isRestorable(a.chosen_dir, function(bIsRestorable) {
					// the entry is still there, load the content
					chrome.fileSystem.restoreEntry(a.chosen_dir, function(chosenEntry) {
						if (chosenEntry) {
							chrome.storage.local.get('lastModified', function(result) {
								var tmpLastModified = result['lastModified'].lastModifiedTimeMillis;
//								console.debug('1. tmpLastModified: ' + tmpLastModified);
								if(!tmpLastModified) {
									var currentDate = new Date();
									tmpLastModified = currentDate.getTime();
								}

								var startLastModified = tmpLastModified;
								scanChanges(chosenEntry, tmpLastModified, a.sync_dir, 
										a.url_api, a.username, a.password, function(tmpLastModified) {
									if(tmpLastModified > startLastModified) {
										var b = {};
										var time = {'lastModifiedTimeMillis': tmpLastModified};
										b['lastModified'] = time;
										chrome.storage.local.set(b);
									}
								});

							});
						}
					});
				});
			}
		}
	});
}

function scanChanges(_chosenEntry, lastModified, syncDir, apiUrl, username, 
		password, callback) {
	var nextModified = lastModified;
	var chosenEntry = _chosenEntry;
	var dirReader = chosenEntry.createReader();

	// Call the reader.readEntries() until no more results are returned.
	var readEntries = function() {
		dirReader.readEntries (function(results) {
			if (!results.length) {
				// no files and directories 
			} else {
				results.forEach(function(item) { 
					if(item.isDirectory) {
						scanChanges(item, lastModified, syncDir, apiUrl, username, 
								password, function(tmpModified) {
							if( tmpModified > nextModified) {
								nextModified = tmpModified;
							}	
						});
					} else {
						// read file
						item.getMetadata(function(data) {
							var tmpModified = data.modificationTime.getTime();
							if(tmpModified > lastModified) {
//								console.log('tmpModified: ' + tmpModified);
								sendFile(item, syncDir, apiUrl, username, password, tmpModified);
								if(tmpModified > nextModified) {
									nextModified = tmpModified;
									callback(nextModified);
								}
							}
						}); 
					}
				});
				readEntries();
			}
		}, errorHandler);
	};

	readEntries(); // Start reading dirs. 
}

function sendFile(entry, syncDir, apiUrl, username, password, tmpModified) {
	chrome.fileSystem.getDisplayPath(entry, function(p) {
		var path = p.substring(syncDir.length + 1).replace(/\\/g, '/');
//		console.log('path: ' + path + ', modified: ' + tmpModified);

//		console.log('1pending: ');
//		console.log(pending);
		if(!pending || !pending[path] || pending[path].modifiedTime < tmpModified) {

			var fullPath = path;
			var modifiedTime = {'modifiedTime' : tmpModified};
			pending[fullPath] = modifiedTime;

			console.log('Changed file detected: ' + path);
			logging(LOGGING_LEVEL_INFO, 'Changed file detected: ' + path);
//			console.log('2pending: ');
//			console.log(pending);
			var index = path.indexOf('/');
			var site = path.substring(0, index);
			path = path.substring(index + 1);

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
					if(responseSite.results && responseSite.results.length > 0) {
						siteKey = responseSite.results[0]._global_key;
						$.ajax({
							url : apiUrl + '/ReST/v5/class/SiteResource',
							type : 'GET',
							data : {
								q : 'site IS \'' + siteKey +  '\' and path=\'' + path + '\''
							},
							dataType : 'json',
							headers : {
								Accept: 'application/json',
								'Authorization' : 'Basic '
									+ btoa(username + ':' + password)
							},
							success : function(response) {
								if(response.results && response.results.length == 1) {
									readAsText(entry, function(data) {

										var type = response.results[0].type.code;
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
											logging(LOGGING_LEVEL_ERROR, 'unknown type: ' + type);
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
												console.debug('success: ' + responseSiteResource.success 
														+ '; state: ' + responseSiteResource.state);
												logging(LOGGING_LEVEL_INFO, 'success: ' + responseSiteResource.success 
														+ '; state: ' + responseSiteResource.state);
											},
											error : function(xhr, ajaxOptions,
													thrownError) {
												console.error(xhr.status);
												console.error(thrownError);
												logging(LOGGING_LEVEL_ERROR, xhr.status + ' ' + thrownError);
											}
										});

									});
								}
							},
							error : function(xhr, ajaxOptions,
									thrownError) {
								console.error(xhr.status);
								console.error(thrownError);
								logging(LOGGING_LEVEL_ERROR, xhr.status + ' ' + thrownError);
							}
						});
					}
				},
				error : function(xhr, ajaxOptions,
						thrownError) {
					console.error(xhr.status);
					console.error(thrownError);
					logging(LOGGING_LEVEL_ERROR, xhr.status + ' ' + thrownError);
				}
			});
		} else {
//			console.log('already pending result!');
		}
	});
}

function errorHandler(e) {
	console.error(e);
}

function finish(lastId, i, callback) {
	siteIds.push(i);
	var flag = true;
	for(i = 0; i < lastId; i++) {
		flag = siteIds.indexOf(i) > -1;
		if(i == (lastId - 1)) {
			callback(flag);
		}
	}
}

function createWatchService() {
	chrome.storage.local.get('watcher', function(result) {
		var watcherId = '0'; 

		if(result && result['watcher']) {
			watcherId = result['watcher'].watcherId;
			// stop watcher
			clearInterval(watcherId);
		}

		// create new watcher
		watcherId = setInterval(monitorDir, 2000);
		var b = {};
		var c = {'watcherId': watcherId};
		b['watcher'] = c;
		chrome.storage.local.set(b);
		console.log('watch service for monitoring sync directory was created');
		logging(LOGGING_LEVEL_INFO, 'watch service for monitoring sync directory was created');
	});
}
