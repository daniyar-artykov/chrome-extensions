!function() {
	function a() {
		return void 0 !== window.chrome
	}

	function b() {
		return void 0 !== window.safari
	}

	function c(c) {
		a() ? window.chrome.extension.onMessage ? chrome.extension.onMessage.addListener(c) : chrome.extension.onRequest.addListener(c) : b() && window.safari.self.addEventListener("message", function(a) {
			c(a.message, a, function() {})
		})
	}

	function d(c, d) {
		a() ? chrome.extension.sendMessage ? chrome.extension.sendMessage(c, d) : chrome.extension.sendRequest(c, d) : b() && (d && (c.__cbId = Callbacker.addCb(d)), safari.self.tab.dispatchMessage("message", c))
	}

	function e() {
		d({
			action: "getSetting",
			key: "keyboard-shortcut-add"
		}, function(a) {
			f(), key(a.value, function(a, b) {
				var c = {
						identifier: "keyboard-shortcut",
						action: "addURL",
						showSavedToolbarIcon: !0,
						title: document.title,
						url: window.location.toString(),
						actionInfo: {
							cxt_ui: "keyboard"
						}
				};
				d(c, function(a) {})
			})
		})
	}

	function f() {
		key.deleteScope("all")
	}

	function g() {
		d({
			action: "getSetting",
			key: "keyboard-shortcut"
		}, function(a) {
			"true" === a.value || a.value === !0 ? e() : ("false" === a.value || a.value === !1) && key.deleteScope("all")
		})
	}
	b() && window.top != window || (! function(a) {
		function b(a, b) {
			for (var c = a.length; c--;)
				if (a[c] === b) return c;
			return -1
		}

		function c(a) {
			for (p in r) r[p] = a[x[p]]
		}

		function d(a, d) {
			var e, f, h, i, j;
			if (e = a.keyCode, -1 == b(w, e) && w.push(e), (93 == e || 224 == e) && (e = 91), e in r) {
				r[e] = !0;
				for (h in t) t[h] == e && (g[h] = !0)
			} else if (c(a), g.filter.call(this, a) && e in q)
				for (i = 0; i < q[e].length; i++)
					if (f = q[e][i], f.scope == d || "all" == f.scope) {
						j = f.mods.length > 0;
						for (h in r)(!r[h] && b(f.mods, +h) > -1 || r[h] && -1 == b(f.mods, +h)) && (j = !1);
						(0 != f.mods.length || r[16] || r[18] || r[17] || r[91]) && !j || f.method(a, f) === !1 && (a.preventDefault ? a.preventDefault() : a.returnValue = !1, a.stopPropagation && a.stopPropagation(), a.cancelBubble && (a.cancelBubble = !0))
					}
		}

		function e(a) {
			var c, d = a.keyCode,
			e = b(w, d);
			if (e >= 0 && w.splice(e, 1), (93 == d || 224 == d) && (d = 91), d in r) {
				r[d] = !1;
				for (c in t) t[c] == d && (g[c] = !1)
			}
		}

		function f() {
			for (p in r) r[p] = !1;
			for (p in t) g[p] = !1
		}

		function g(a, b, c) {
			var d, e, f, g;
			for (void 0 === c && (c = b, b = "all"), a = a.replace(/\s/g, ""), d = a.split(","), "" == d[d.length - 1] && (d[d.length - 2] += ","), f = 0; f < d.length; f++) {
				if (e = [], a = d[f].split("+"), a.length > 1) {
					for (e = a.slice(0, a.length - 1), g = 0; g < e.length; g++) e[g] = t[e[g]];
					a = [a[a.length - 1]]
				}
				a = a[0], a = v(a), a in q || (q[a] = []), q[a].push({
					shortcut: d[f],
					scope: b,
					method: c,
					key: d[f],
					mods: e
				})
			}
		}

		function h(a) {
			return "string" == typeof a && (a = v(a)), -1 != b(w, a)
		}

		function i() {
			return w.slice(0)
		}

		function j(a) {
			var b = (a.target || a.srcElement).tagName;
			return !("INPUT" == b || "SELECT" == b || "TEXTAREA" == b)
		}

		function k(a) {
			s = a || "all"
		}

		function l() {
			return s || "all"
		}

		function m(a) {
			var b, c, d;
			for (b in q)
				for (c = q[b], d = 0; d < c.length;) c[d].scope === a ? c.splice(d, 1) : d++
		}

		function n(a, b, c) {
			a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent && a.attachEvent("on" + b, function() {
				c(window.event)
			})
		}

		function o() {
			var b = a.key;
			return a.key = y, b
		}
		var p, q = {},
		r = {
				16: !1,
				18: !1,
				17: !1,
				91: !1
		},
		s = "all",
		t = {
				"⇧": 16,
				shift: 16,
				SHIFT: 16,
				"⌥": 18,
				alt: 18,
				option: 18,
				OPTION: 18,
				"⌃": 17,
				ctrl: 17,
				control: 17,
				CTRL: 17,
				CONTROL: 17,
				"⌘": 91,
				command: 91
		},
		u = {
				backspace: 8,
				tab: 9,
				clear: 12,
				enter: 13,
				"return": 13,
				esc: 27,
				escape: 27,
				space: 32,
				left: 37,
				up: 38,
				right: 39,
				down: 40,
				del: 46,
				"delete": 46,
				home: 36,
				end: 35,
				pageup: 33,
				pagedown: 34,
				",": 188,
				".": 190,
				"/": 191,
				"`": 192,
				"-": 189,
				"=": 187,
				";": 186,
				"'": 222,
				"[": 219,
				"]": 221,
				"\\": 220
		},
		v = function(a) {
			return u[a] || a.toUpperCase().charCodeAt(0)
		},
		w = [];
		for (p = 1; 20 > p; p++) t["f" + p] = 111 + p;
		var x = {
				16: "shiftKey",
				18: "altKey",
				17: "ctrlKey",
				91: "metaKey"
		};
		for (p in t) g[p] = !1;
		n(document, "keydown", function(a) {
			d(a, s)
		}), n(document, "keyup", e), n(window, "focus", f);
		var y = a.key;
		a.key = g, a.key.setScope = k, a.key.getScope = l, a.key.deleteScope = m, a.key.filter = j, a.key.isPressed = h, a.key.getPressedKeyCodes = i, a.key.noConflict = o, "undefined" != typeof module && (module.exports = key)
	}(this), c(function(a, b, c) {
		"settingChanged" === a.action && ("keyboard-shortcut" === a.key || "keyboard-shortcut-add" === a.key) && g()
	}), g())
}();