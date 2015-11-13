var calls = {};
var NOTIFICATION_ID = 'proxyynetnotification';
var DEFAULT_RETRY_ATTEMPTS = 5;

chrome.webRequest.onAuthRequired.addListener(
	function(details) {
		var useCredentials = typeof localStorage["use_credentials"] === 'string' && localStorage["use_credentials"] === 'true';
		if(details.isProxy === true && useCredentials) {

			var idstr = details.requestId.toString();
			console.log('AUTH - ' + details.requestId);
			
			if(!(idstr in calls)){
				calls[idstr] = 0;
			}
			calls[idstr] = calls[idstr] + 1;
			
			var retry = parseInt(localStorage["proxy_retry"]) || DEFAULT_RETRY_ATTEMPTS;
//			alert(calls[idstr]);
			if(calls[idstr] >= retry) {
				localStorage["use_credentials"] = false;
				chrome.notifications.create(NOTIFICATION_ID, {
					'type': 'basic',
					'iconUrl': 'img/icons/error-128.png',
					'title': 'Proxyy.net authentication error!',
					'message': 'Please, check you username/password! For your safety, the use of proxy credentials locked. To unlock it check "Use this credentials" in extension settings and save.',
					'isClickable': true,
					'priority': 2
				}, function(id) {
					//console.log('notification callback'); 
				});
				calls = {};
				return({
					cancel : true
				});
			}
			
			var login = localStorage["proxy_login"];
			var password = localStorage["proxy_password"];
			
			if (login && password && useCredentials) {
//				alert('00100');
				return({
					authCredentials : {
						'username' : login,
						'password' : password
					}
				});
			}
		}
	},
	{urls: ["<all_urls>"]}, 
	["blocking"]
);

