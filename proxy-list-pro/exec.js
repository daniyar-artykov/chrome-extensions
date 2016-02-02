var as = document.head.getElementsByTagName('script'), g;
for(var i=0; i<as.length; ++i) {
    if(/^ginf=/i.test(as[i].innerHTML)) {
		g = as[i].innerHTML.replace(/^ginf=/, '');
		break;
	}
};
g = g.match(/target:\{([^\}]+)\}/);

g[1].match(/u:\'([^\']+)\'/)[1];
