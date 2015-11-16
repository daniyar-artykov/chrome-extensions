
var authentication = function() {
	var a, b = "https://getpocket.com/signup?src=extension&route=/extension_login_success",
	c = function(c) {
		return a = c, isSafari() ? void safari.self.contentWindow.openTabWithURL(b) : void window.open(b)
	},
	d = function(b) {
		if (isChrome()) getAllTabs(function(a) {
			a.forEach(function(a) {
				var b = a.url;
				a.windowId; - 1 !== b.indexOf("extension_login_success") && chrome.tabs.remove(a.id, function() {})
			})
		});
		else
			for (var c = safari.application.browserWindows, d = 0; d < c.length; d++) {
				for (var e, f = c[d], g = f.tabs, h = !1, i = 0; i < g.length; i++) {
					e = g[i];
					var j = e.url;
					"undefined" != typeof j && -1 !== j.indexOf("extension_login_success") && (h = !0)
				}
				h && f.activeTab.close()
			}
		broadcastMessageToAllTabs({
			action: "updateOptions"
		}), a && (a(), a = void 0);
		var k = "control";
		"1" !== getSetting("premium_status") && "1" == getSetting("premUpsell") && (k = "show_upsell"), ril.sendAbTestRegister(getSetting("guid"), getSetting("oauth_token"), "premium_ext_upsell_v2", k), b && b()
	};
	return addMessageListener(function(a, b, e) {
		if ("showLoginWindow" === a.action) return c(void 0), e({}), !1;
		if ("loginSuccessfull" === a.action) {
			var f = a.value;
			return ril.login(f, {
				success: function() {
					d()
				},
				error: function() {}
			}), e({}), !0
		}
		return "logout" === a.action ? (ril.logout(), broadcastMessageToAllTabs({
			action: "updateOptions"
		}), e({}), !1) : void 0
	}), {
		showLoginWindow: c
	}
}();