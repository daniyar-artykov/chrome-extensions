var sl = document.createElement('script');
sl.src = chrome.extension.getURL('lib/script.js/script.min.js');
(document.head||document.documentElement).appendChild(sl);

sl.onload = function() {
	console.log('script.min.js loaded');


var al= document.createElement('script');
al.src = chrome.extension.getURL('lib/angular-loader/angular-loader.min.js');
(document.head||document.documentElement).appendChild(al);

al.onload = function() {
	console.log('angular-loader loaded');


var jq = document.createElement('script');
jq.src = chrome.extension.getURL('lib/jquery/jquery.min.js');
(document.head||document.documentElement).appendChild(jq);

jq.onload = function() {
	console.log('jQuery loaded');


var jq = document.createElement('script');
jq.src = chrome.extension.getURL('lib/angular/angular.min.js');
(document.head||document.documentElement).appendChild(jq);

jq.onload = function() {
	console.log('angular loaded');

	var g = document.createElement('div');
	g.setAttribute("id", "switchy_omega");
	(document.head||document.documentElement).appendChild(g);
	
var s = document.createElement('script');
s.src = chrome.extension.getURL('js/angular_inject.js');
(document.head||document.documentElement).appendChild(s);
s.onload = function() {
	s.parentNode.removeChild(s);
};
};
};
};
};
//Event listener
document.addEventListener('RW759_connectExtension', function(e) {
	// e.detail contains the transferred data (can be anything, ranging
	// from JavaScript objects to strings).
	// Do something, for example:
	console.log(e.detail);
});