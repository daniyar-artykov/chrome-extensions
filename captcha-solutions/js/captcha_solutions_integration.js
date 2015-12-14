var endpoint = "http://api.captchasolutions.com/solve";
var key = null;
var secret = null;

initializeSavedDetails();

function call_captcha_solutions(img) {
	//var img = document.getElementById('someImage');
	var solved = null;
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	canvas.width = img.width;
	canvas.height = img.height;
	ctx.drawImage(img, 0, 0);
	var dataUrl = canvas.toDataURL('image/png');
	var blob = dataUriToBlob(dataUrl);

	// submit as a multipart form, along with any other data
	var formData = new FormData();

	var xhr = new XMLHttpRequest();
	xhr.open('POST', endpoint, true);    // plug-in desired URL
	xhr.setRequestHeader('Content-Type', 'multipart/form-data');

	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				console.log('Success: ' + xhr.responseText);
				try {
					var xml = xhr.responseXML;
					solved = xml.getElementsByTagName("decaptcha")[0].nodeValue;
				} catch(e) {
					console.warn('couldn\'t parse response!!');
				}
			} else {
				console.warn('Error submitting image: ' + xhr.status);
			}
		}
	};

	formData.append("p", "upload");
	formData.append("key", key);
	formData.append("secret", secret);
	formData.append("captcha", blob);

	xhr.send(formData);

	return solved;
}

function dataUriToBlob(dataURI) {
	// serialize the base64/URLEncoded data
	var byteString;
	if (dataURI.split(',')[0].indexOf('base64') >= 0) {
		byteString = atob(dataURI.split(',')[1]);
	}
	else {
		byteString = unescape(dataURI.split(',')[1]);
	}

	// parse the mime type
	var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

	// construct a Blob of the image data
	var array = [];
	for(var i = 0; i < byteString.length; i++) {
		array.push(byteString.charCodeAt(i));
	}
	return new Blob(
			[new Uint8Array(array)],
			{type: mimeString}
	);
}

function initializeSavedDetails() {
	chrome.storage.local.get('userData', initializeUserDataControls);
}

function initializeUserDataControls(a) {
	if (a && (a = a['userData'])) {
		key = a.apiKey;
		secret = a.secretKey;
	}
}