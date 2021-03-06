
! function() {
	if (window.safari && window.top == window) {
		safari.self.addEventListener("message", function(msg) {
			var name = msg.name,
			message = msg.message;
			if ("executeScript" === name) eval(message);
			else if ("__performCb" === name) {
				var cbId = message.cbId,
				data = message.data;
				Callbacker.performCbFromIdWithData(data, cbId)
			} else "isSafariContentAvailable" === name && safari.self.tab.dispatchMessage("safariContentAvailable", message)
		}), document.addEventListener("contextmenu", function(a) {
			var b = a.target;
			if (b.nodeType == Node.TEXT_NODE && (b = b.parentNode), b.nodeType != Node.ELEMENT_NODE) return void safari.self.tab.setContextMenuEventUserInfo(a, void 0);
			for (var c = b; null !== c;) {
				if (c.nodeType == Node.ELEMENT_NODE && "a" == c.nodeName.toLowerCase()) {
					b = c;
					break
				}
				c = c.parentNode
			}
			"undefined" != typeof b && a && b && b.href && safari.self.tab.setContextMenuEventUserInfo(a, b.href)
		}, !1);
		var Callbacker = window.Callbacker = {
				addCb: function(a) {
					this._cbsToIds || (this._cbsToIds = {}), this._cbCounter || (this._cbCounter = 0);
					var b = ++this._cbCounter;
					return this._cbsToIds[b] = a, b
				},
				performCbFromIdWithData: function(a, b) {
					if (this._cbsToIds) {
						var c = this._cbsToIds[b];
						c && (this._cbsToIds[b] = void 0, c(a))
					}
				}
		}
	}
}();