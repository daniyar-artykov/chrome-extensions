var P_HEIGHT = 600;

var _bg = chrome.extension.getBackgroundPage();

var body = document.getElementsByTagName('body')[0];
var base = document.getElementById('base');

var populate = function() {
	_bg.ServerManager.populate(base);
	if(base.offsetHeight > P_HEIGHT) {
		body.style.height = P_HEIGHT + 'px';
	}
	else {
		body.style.height = base.offsetHeight + 'px';
	}
};

populate();

chrome.runtime.onMessage.addListener(function(r, s, sr) {
    if(r.msg === 'force_pop') {
	    populate();
	}
});