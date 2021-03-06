var pkt = pkt || {};
pkt.i18n = function() {
	String.prototype.supplant || (String.prototype.supplant = function(a) {
		return this.replace(/\{([^{}]*)\}/g, function(b, c) {
			var d = a[c];
			return "string" == typeof d || "number" == typeof d ? d : b
		})
	}), document.querySelectorAll || (document.querySelectorAll = function(a) {
		var b = document,
		c = b.documentElement.firstChild,
		d = b.createElement("STYLE");
		return c.appendChild(d), b.__qsaels = [], d.styleSheet.cssText = a + "{x:expression(document.__qsaels.push(this))}", window.scrollBy(0, 0), b.__qsaels
	});
	var a = "_locales/" + getCurrentLanguageCode() + "/messages.json";
	a = void 0 !== window.safari ? safari.extension.baseURI + a : chrome.extension.getURL(a);
	var b = new XMLHttpRequest;
	b.open("GET", a, !1), b.send(null);
	var c = JSON.parse(b.responseText),
	d = function(a) {
		var b = c[a];
		return "undefined" == typeof b ? (console.log("Missing localization value for key: " + a), b) : b.message
	},
	e = function(a, b) {
		var c = d(a);
		if ("undefined" == typeof c) return c;
		if ("undefined" != typeof b && b.length > 0) {
			for (var e = {}, f = 0; f < b.length; f++) {
				var g = b[f],
				h = "$" + f;
				e[h] = g
			}
			c = c.supplant(e)
		}
		return c
	},
	f = function(a) {
		return e(a, void 0)
	},
	g = function() {
		for (var a = document.querySelectorAll("[data-localize]"), b = 0; b < a.length; b++) {
			var c = a[b],
			d = c.dataset.localize,
			e = f(d);
			"undefined" != typeof e && (c.innerHTML = e)
		}
	},
	h = function() {
		return "_locales/" + getCurrentLanguageCode() + "/r.js"
	};
	return {
		initLocalization: g,
		getMessage: f,
		getMessagePlaceholder: e,
		getCurrentSupportedLanguageCode: getCurrentLanguageCode,
		getFilePathForPocketOverlayLocalization: h
	}
}();