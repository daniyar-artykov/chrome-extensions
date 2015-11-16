
! function() {
    var a = function() {
        return void 0 !== window.safari
    };
    if (!a() || window.top == window) {
        var b = function(a) {
                var b = {},
                    c = a;
                if ("" === c) return b;
                for (var d = c.split("; "), e = 0; e < d.length; e++) {
                    var f = d[e],
                        g = f.indexOf("="),
                        h = f.substring(0, g),
                        i = f.substring(g + 1);
                    i = decodeURIComponent(i), b[h] = i
                }
                return b
            },
            c = b(document.cookie),
            d = {
                userId: c.sess_user_id,
                token: c.sess_exttok
            };
        setTimeout(function() {
            sendMessage({
                action: "loginSuccessfull",
                value: d
            }, function(a) {})
        }, 1500)
    }
}();