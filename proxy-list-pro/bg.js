var _isChildOf = function(p, c) {
    if(p === c)
        return false;
    
    while(c && c !== p) {
        c = c.parentNode;
    }
    
    return c === p;
};

var _addListener = function(t, e, f, ctx) {
    var fn = function(e) {
	    f.call(ctx, e, this);
	};
	
	t.addEventListener(e, fn, false);
};

var _callback = function(fn, ctx) {
	return function() {
		fn.apply(ctx, arguments);
	};
};

var MenuItem = function(p, c, n, l, g, i, s) {
	this.p = p;
	
	this.c = c;
	this.g = g;
	this.i = i;
	this.s = s ? true : false;

	this.holder = document.createElement('div');
	this.holder.className = 'menu-item';
	this.holder.title = g;
	
	this.flag = document.createElement('span');
	this.flag.className = 'menu-flag';
	
	this.name = document.createElement('span');
	this.name.className = 'menu-item-text server-name';
	this.name.innerHTML = '&nbsp;' + n;
	
	this.load = document.createElement('span');
	this.load.className = 'menu-item-text load';
	this.load.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp ' + l + '%';
	
	this.btn = document.createElement('span');
	this.btn.className = 'button ' + (this.s ? 'on-button' : 'off-button');
	
	var blk = document.createElement('div');
	blk.className = 'menu-item-block';
	
	blk.appendChild(this.load);
	blk.appendChild(this.btn);
	
	this.holder.appendChild(this.flag);
	this.holder.appendChild(this.name);
	this.holder.appendChild(blk);
	
	this.init();
};

MenuItem.prototype.init = function() {
	this._removeHighlight();
	this.unselect();
	
	this._last = +Date.now();
	
	_addListener(this.holder, 'mouseover', this.mouseOver, this);
	_addListener(this.holder, 'mouseout', this.mouseOut, this);
	_addListener(this.holder, 'mouseup', this.click, this);
	
	var c = (this.c === '??' || this.c === '' ? 'unknown' : this.c);
	this.flag.style.backgroundImage = 'url(img/flags/'+c+'.png)';
};

MenuItem.prototype._removeHighlight = function() {
	if(!this._h) return;
    this.holder.className = this.holder.className.replace(/\s?highlight/g, '');
	this._h = false;
};

MenuItem.prototype._addHighlight = function() {
	if(this._h) return;
    this.holder.className += ' highlight';
	this._h = true;
};

MenuItem.prototype._enable = function() {
	this.select();
	this.p.enabled(this.i, this.g, this.c);
};

MenuItem.prototype._disable = function() {
	this.unselect();
	this.p.disabled(this.i, this.g, this.c);
};

MenuItem.prototype.select = function() {
	if(this.s) return;
	//console.log('select');
	
	this.holder.className = this.holder.className + ' selected';
	this.btn.className = this.btn.className.replace(/\s?off-button/g, '');
	this.btn.className += ' on-button';
	
	this.s = true;
};

MenuItem.prototype.unselect = function() {
	if(!this.s) return;	
	//console.log('unselect');
	
	this.holder.className = this.holder.className.replace(/\s?selected/g, '');
	this.btn.className = this.btn.className.replace(/\s?on-button/g, '');
	this.btn.className += ' off-button';
	
	this.s = false;
};

MenuItem.prototype.mouseOver = function(e, t) {
    if(t === e.relatedTarget || _isChildOf(t, e.relatedTarget))
	    return;
	
	this._addHighlight();
};

MenuItem.prototype.mouseOut = function(e, t) {
    if(t === e.relatedTarget || _isChildOf(t, e.relatedTarget))
	    return;
	
	this._removeHighlight();
};

MenuItem.prototype.click = function(e) {
	if(Date.now() - this._last < 10) return;
	
	if(e.button !== 0) return;
	
	if(this.s) 
		this._disable();
	else
		this._enable();
		
	this._last = +Date.now();
};

var ServerManager = {
    serviceurl: 'http://proxylistpro.com/index.php?servers=',
	timeout: null,
	set: null,
	gates: null,
	indices: null,
	menu: null,
	current: null,
	wId: null,
	tId: null,
	rId: null,
	sId: null,
	activeURL: null,
	nonDOM: {},
	
	init: function() {		
		chrome.windows.getLastFocused({populate: true}, _callback(function(window) {
			if(window.type !== 'normal') return;
			
			this.wId = window.id;
			var tabs = window.tabs;
			
			for(var i=0; i<tabs.length; ++i) {
				if(tabs[i].active) {
				    this.tId = tabs[i].id;
					this.activeURL = tabs[i].url;
					return;
				}
			}
		}, this));
		
		chrome.windows.onFocusChanged.addListener(_callback(function(w) {
			if(w === chrome.windows.WINDOW_ID_NONE) return;
			
			chrome.windows.get(w, {populate: true}, _callback(function(window) {
				if(window.type !== 'normal') return;
			
				this.wId = window.id;
				var tabs = window.tabs;
			
				for(var i=0; i<tabs.length; ++i) {
					if(tabs[i].active) {
						this.tId = tabs[i].id;
						this.activeURL = tabs[i].url;
						
						this.evaluateActive();
						return;
					}
				}
			}, this));
		}, this));
		
		chrome.tabs.onActivated.addListener(_callback(function(o) {
			if(o.windowId !== this.wId) return;
			
			this.tId = o.tabId;
			
			chrome.tabs.get(this.tId, _callback(function(t) {
				this.activeURL = t.url;
				this.evaluateActive();
			}, this));
			
		}, this));
		
		chrome.tabs.onUpdated.addListener(_callback(function(id, c, t) {
			if(id !== this.tId) return;
			
			this.activeURL = t.url;
			this.evaluateActive();
		}, this));
		
		chrome.webRequest.onBeforeRedirect.addListener(_callback(this.redirect, this), {urls: ["*://*.proxylistpro.com/*"]});
	},
	
	requestServers: function() {
		if(this.timeout) {
		    clearTimeout(this.timeout);
			this.timeout = null;
		}
		
		var s = this;
		
	    var r = new XMLHttpRequest();
		r.open('GET', this.serviceurl);
		r.responseType = 'json';
		r.onreadystatechange = function() {
		    if(r.readyState === 4 && r.status === 200) {
			    s.setData(r.response);
				s.evaluateActive();
				s.forcePopulate();
				
				s.timeout = setTimeout(s.requestServers, 3599950);
			}
		};
		r.send();
	},
	
	setData: function(d) {
		this.gates = {};
		this.indices = [];
		
		var ind = 0;
		for(var i in d) {
			var c =  d[i].code.toUpperCase();
			c = c === 'UK' ? 'GB' : c;
		    this.gates[d[i].gateway] = {'i': ind, c: c};
			this.indices.push({g: d[i].gateway, c: c, n: i, l: d[i].load});
			++ind;
		}
		
		this.set = true;
		this.current = null;
		
		this.setMenu();
	},
	
	setMenu: function() {
		this.menu = [];
	    for(var i=0; i<this.indices.length; ++i) {
			var it = new MenuItem(this, this.indices[i].c, this.indices[i].n, this.indices[i].l, this.indices[i].g, i);
		    this.menu.push(it);
		}
		
		//console.log(this.menu);
	},
	
	populate: function(el, f) {
		if(!this.set) return;

		for(var i=0; i<this.menu.length; ++i) {
			this.menu[i].init();
			el.appendChild(this.menu[i].holder);
		}
	
		if(this.current) {
			this.menu[this.current.i].select();
		}
	},
	
	forcePopulate: function() {
		chrome.runtime.sendMessage({msg: 'force_pop'});
	},
	
	enabled: function(i, g, c) {
		if(this.current) {
			this.menu[this.current.i].unselect();
		}
		
		this.current = {i: i, g: g, c: c};
		
		this.activate();
		
		this.setIcon(this.current.c);
	},
	
	disabled: function(i, g, c) {
	    this.current = null;
		
		this.deactivate();
		this.setIcon();
	},
	
	setIcon: function(c) {
		var i = this.tId;
		if(typeof c === 'string') {
			chrome.browserAction.setIcon({path: 'img/flags/' + (c === '??' || c === '' ? 'unknown' : c) + '.png', tabId: i});
			chrome.browserAction.setBadgeText({text: c, tabId: i});
		}
		else {
			chrome.browserAction.setIcon({path: 'img/disabled.png', tabId: i});
			chrome.browserAction.setBadgeText({text: '', tabId: i});
		}
	},
	
	activate: function() {
		var u = this.activeURL.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
		
		if(Object.prototype.hasOwnProperty.call(this.gates, u) && this.gates[u]) {
			if(/\/page\.php\?u=.+$/i.test(this.activeURL)) {
				this.sId = this.tId;
				chrome.tabs.executeScript(this.sId, {file: 'exec.js', runAt: 'document_start'}, _callback(this.activateScript, this));
			}
			else {
				chrome.tabs.update(this.tId, {url: 'http://' + this.current.g});
			}
			
			return;
		}
		
		if(/^chrome|^about/.test(this.activeURL) || this.activeURL === '') {
			chrome.tabs.update(this.tId, {url: 'http://' + this.current.g});
			return;
		}
		
		this.translate(this.activeURL, this.tId);
	},
	
	deactivate: function() {
		var u = this.activeURL.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
		
		if(Object.prototype.hasOwnProperty.call(this.gates, u) && this.gates[u]) {
			if(/\/page\.php\?u=.+$/i.test(this.activeURL)) {
				this.sId = this.tId;
				chrome.tabs.executeScript(this.sId, {file: 'exec.js', runAt: 'document_start'}, _callback(this.deactivateScript, this));
			}
			else {
				chrome.tabs.update(this.tId, {url: 'chrome://newtab'});
			}
		}
	},
	
	redirect: function(o) {
		if(this.rId === null) return;
		if(!/\/page\.php\?u=.+$/i.test(o.redirectUrl)) return;
		chrome.tabs.update(this.rId, {url: o.redirectUrl});
		this.rId = null;
	},
	
	translate: function(u, t) {
		var p = 'u='+u;
		var r = new XMLHttpRequest();
		
		r.open('POST', 'http://' + this.current.g + '/includes/process.php?action=update');
		
		r.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		r.setRequestHeader('Content-length', p.length);
		r.setRequestHeader('Connection', 'close');
		
		this.rId = t;
		
		r.send(p);
		
		if(/\.(?:pdf|jpe?g|png|gif|bmp)$/.test(u)) {
		    this.nonDOM[t] = u;
		}
	},
	
	evaluateActive: function() {
		if(!this.set) return;
		
		var u = this.activeURL.replace(/^https?:\/\//, '').replace(/\/.*$/, '');

		if(Object.prototype.hasOwnProperty.call(this.gates, u) && this.gates[u]) {
			if(this.current) {
				this.menu[this.current.i].unselect();
			}
			
			this.current = {i: this.gates[u].i, g: u, c: this.gates[u].c};
			
			this.menu[this.current.i].select();
			this.setIcon(this.current.c);
		}
		else {
			if(this.current) {
				this.menu[this.current.i].unselect();
			}
			
			this.current = null;
			
			this.setIcon();
		}
	},
	
	activateScript: function(r) {
		if(!this.sId) return;
		var u = r && r.length && typeof r[0] === 'string' ? r[0] : (typeof this.nonDOM[this.sId] === 'string' ? this.nonDOM[this.sId] : 'chrome://newtab');
		this.translate(u, this.sId);
		this.sId = null;
	},
	deactivateScript: function(r) {
		if(!this.sId) return;
		var u = r && r.length && typeof r[0] === 'string' ? r[0] : (typeof this.nonDOM[this.sId] === 'string' ? this.nonDOM[this.sId] : 'chrome://newtab');
		chrome.tabs.update(this.sId, {url: u});
		this.sId = null;
		this.nonDOM[this.sId] = null;
	}
};

ServerManager.init();
ServerManager.requestServers();