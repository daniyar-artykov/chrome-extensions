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

						loadDirEntry(chosenEntry);

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
//														console.log(data);
														chrome.fileSystem.getWritableEntry(chosenEntry, function(entry) {
															entry.getFile(element.path, { create: true }, function(entry) {
																readAsText(entry, function(result) {
//																	console.log(result);
																	if(result != data) {
																		console.log('rewrite to file');
																		entry.createWriter(function(writer) {
																			writer.write(new Blob([data], {type: 'text/plain'}));
																		});
																	} else {
																		console.log('data is equal!');
																	}
																});
															});
														});
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

function loadDirEntry(_chosenEntry) {
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
							loadDirEntry(item);
						} else {
							// read file
							item.getMetadata(function(data) {
								console.log(data.modificationTime.getTime());
							}); 
						}
					});
					readEntries();
				}
			}, errorHandler);
		};

		readEntries(); // Start reading dirs.    
	} else {
		// read file
		chosenEntry.getMetadata(function(data) {
			console.log(data.modificationTime.getTime());
		}); 
	}
}

function errorHandler(e) {
	console.error(e);
}
