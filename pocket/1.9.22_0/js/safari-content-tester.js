
var safariContentInjectionTester = function() {
	Array.prototype.removeByValue = function(a) {
		for (var b = 0; b < this.length; b++)
			if (this[b] == a) {
				this.splice(b, 1);
				break
			}
	};
	var a = [],
	b = [],
	c = function(d, e, f) {
		isChrome() ? f({
			injected: !0
		}) : boolFromString(getSetting("pocket.restart")) ? f({
			injected: !0
		}) : -1 === $.inArray(e, a) ? (a.push(e), d.page.dispatchMessage("isSafariContentAvailable", {
			url: e
		}), setTimeout(function() {
			c(d, e, f)
		}, 250)) : -1 !== $.inArray(e, a) && -1 === $.inArray(e, b) ? (a.removeByValue(e), alert(pkt.i18n.getMessage("background_after_install_error")), f({
			injected: !1
		})) : (a.removeByValue(e), b.removeByValue(e), f({
			injected: !0
		})), isSafari() && (safari.application.addEventListener("message", function(a) {
			var c = a.name,
			d = a.message;
			"safariContentAvailable" === c && b.push(d.url)
		}), boolFromString(getSetting("pocket.run")) || boolFromString(getSetting("pocket.restart")) ? boolFromString(getSetting("pocket.run")) || (setSetting("pocket.restart", !0), setSetting("pocket.run", !0)) : setSetting("pocket.restart", !0))
	};
	return {
		safariContentInjected: c
	}
}();