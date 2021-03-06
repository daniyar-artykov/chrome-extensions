function isValidURL(a) {
	return /^https?\:/i.test(a)
}

function isMac() {
	return null !== navigator.platform.match(/^Mac/)
}

function isSafari() {
	return void 0 !== window.safari
}

function isOpera() {
	return /OPR/.test(window.navigator.userAgent)
}

function isYandex() {
	return /YaBrowser/.test(window.navigator.userAgent)
}

function isChrome() {
	return void 0 !== window.chrome && void 0 !== window.chrome.app
}

function isChromeOnly() {
	return void 0 !== window.chrome && void 0 !== window.chrome.app && !isOpera() && !isYandex()
}

function getDisplayName() {
	var a = getSetting("firstName"),
	b = getSetting("lastName"),
	c = "";
	return "undefined" != typeof a && "" !== a && (c += a), "undefined" != typeof b && "" !== b && (c += "" !== c ? " " + b : b), "" !== c ? c : getDisplayUsername()
}

function getDisplayUsername() {
	var a = getSetting("username");
	if ("undefined" != typeof a && a.length > 0 && "*" !== a.charAt(0)) return a;
	var b = getSetting("email");
	return "undefined" != typeof b && "" !== b ? b : "Pocket User"
}

function inPrivateMode(a) {
	return isChrome() ? a.incognito : isSafari() ? safari.application.privateBrowsing.enabled : void 0
}

function getBackgroundPage() {
	var a = isChrome() ? chrome.extension.getBackgroundPage() : safari.extension.globalPage.contentWindow;
	return a
}

function getCurrentTab(a) {
	if (isChrome()) chrome.tabs.getSelected(null, function(b) {
		a(b)
	});
	else if (isSafari()) {
		var b = safari.application.activeBrowserWindow.activeTab;
		a(b)
	}
}

function getAllTabs(a) {
	if (isChrome()) chrome.tabs.query({}, a);
	else if (isSafari()) {
		for (var b = safari.application.browserWindows, c = [], d = 0; d < b.length; d++)
			for (var e = b[d].tabs, f = 0; f < e.length; f++) c.push(e[f]);
		a(c)
	} else a([])
}

function executeScriptInTab(a, b) {
	if (isChrome()) chrome.tabs.executeScript(a.id, {
		code: b
	});
	else if (isSafari()) {
		if (!a || !a.page || !a.page.dispatchMessage) return;
		a.page.dispatchMessage("executeScript", b)
	}
}

function executeScriptInTabWithCallback(a, b, c) {
	isChrome() ? chrome.tabs.executeScript(a.id, {
		code: b
	}, c) : isSafari() && (executeScriptInTab(a, b), setTimeout(c, 100))
}

function executeScriptFromURLInTab(a, b) {
	if (isChrome()) chrome.tabs.executeScript(a.id, {
		file: b
	});
	else if (isSafari()) {
		var c = $.ajax({
			type: "GET",
			url: "../" + b,
			async: !1
		});
		executeScriptInTab(a, c.responseText)
	}
}

function executeScriptFromURLInTabWithCallback(a, b, c) {
	if (isChrome()) chrome.tabs.executeScript(a.id, {
		file: b
	}, c);
	else if (isSafari()) {
		var d = $.ajax({
			type: "GET",
			url: "../" + b,
			async: !1
		});
		executeScriptInTabWithCallback(a, d.responseText, c)
	}
}

function executeStyleFromURLInTab(a, b) {
	isSafari() ? safari.extension.addContentStyleSheetFromURL(b, ["*"], []) : chrome.tabs.insertCSS(a.id, {
		file: b
	})
}

function broadcastMessageToAllTabs(a) {
	getAllTabs(function(b) {
		for (var c = 0; c < b.length; c++) {
			var d = b[c];
			sendMessageToTab(d, a)
		}
	})
}

function injectScript(a) {
	var b = "(" + a + ")();",
	c = document.createElement("script");
	c.textContent = b, (document.head || document.documentElement).appendChild(c), c.parentNode.removeChild(c)
}

function openTabWithURL(a, b) {
	if ("undefined" == typeof b && (b = !1), isChrome()) return void chrome.tabs.create({
		url: a,
		active: !b
	});
	if (isSafari()) {
		var c = b ? "background" : "",
				d = safari.application.activeBrowserWindow.openTab(c);
		d.url = a
	}
}

function stringFromBool(a) {
	return a === !1 ? "false" : "true"
}

function boolFromString(a) {
	return "string" == typeof a ? "false" === a ? !1 : !0 : a
}

function getSetting(a) {
	return settingContainerForKey(a)[a]
}

function setSetting(a, b) {
	var c = settingContainerForKey(a);
	b || c != localStorage ? c[a] = b : localStorage.removeItem(a)
}

function settingContainerForKey(a) {
	if (isSafari()) {
		var b, c = ["twitter", "hackernews", "reddit", "yahoo", "linkedin", "keyboard-shortcut-add", "keyboard-shortcut"];
		return b = -1 !== c.indexOf(a) ? safari.extension.settings : "username" === a || "password" === a ? safari.extension.secureSettings : localStorage
	}
	return localStorage
}

function addMessageListener(a) {
	if (isChrome()) {
		if (window.chrome.extension.onMessage) return void chrome.extension.onMessage.addListener(a);
		chrome.extension.onRequest.addListener(a)
	} else if (isSafari()) {
		var b;
		if (safari.self && safari.self.addEventListener ? b = safari.self : safari.application && safari.application.addEventListener && (b = safari.application), !b) return;
		b.addEventListener("message", function(b) {
			b.tab = b.target;
			var c;
			if (b.message.__cbId) {
				var d = b.tab,
				e = b.message.__cbId;
				c = function(a) {
					d && d.page && d.page.dispatchMessage && d.page.dispatchMessage("__performCb", {
						cbId: e,
						data: a
					})
				}, b.__cbId = void 0
			}
			a(b.message, b, c)
		}, !1)
	}
}

function sendMessageToTab(a, b) {
	if (isChrome()) chrome.tabs.sendMessage(a.id, b);
	else if (isSafari()) {
		if (!a || !a.page || !a.page.dispatchMessage) return;
		a.page.dispatchMessage("message", b)
	}
}

function sendMessage(a, b) {
	b || (b = function(a) {}), isChrome() ? chrome.extension.sendMessage ? chrome.extension.sendMessage(a, b) : chrome.extension.sendRequest(a, b) : isSafari() && (b && (a.__cbId = Callbacker.addCb(b)), safari.self.tab.dispatchMessage("message", a))
}

function getHiddenProp() {
	var a = ["webkit", "moz", "ms", "o"];
	if ("hidden" in document) return "hidden";
	for (var b = 0; b < a.length; b++)
		if (a[b] + "Hidden" in document) return a[b] + "Hidden";
	return null
}

function isHidden() {
	var a = getHiddenProp();
	return a ? document[a] : !1
}

function addHiddenEventListener(a) {
	var b = getHiddenProp();
	if (b) {
		var c = b.replace(/[H|h]idden/, "") + "visibilitychange";
		document.addEventListener(c, a)
	}
}
var getCurrentLanguageCode = function() {
	var a = navigator.language;
	return a = "undefined" != typeof a ? a.toLowerCase() : "en", 0 === a.indexOf("en") ? "en" : 0 === a.indexOf("de") ? "de" : 0 === a.indexOf("fr") ? "fr" : 0 === a.indexOf("it") ? "it" : 0 === a.indexOf("es_419") ? "es_419" : 0 === a.indexOf("es") ? "es" : 0 === a.indexOf("ja") ? "ja" : 0 === a.indexOf("ru") ? "ru" : 0 === a.indexOf("ko") ? "ko" : 0 === a.indexOf("nl") ? "nl" : 0 === a.indexOf("pl") ? "pl" : 0 === a.indexOf("pt_BR") ? "pt_BR" : 0 === a.indexOf("pt_PT") ? "pt_PT" : 0 === a.indexOf("zh_CN") ? "zh_CN" : 0 === a.indexOf("zh_TW") ? "zh_TW" : "en"
};