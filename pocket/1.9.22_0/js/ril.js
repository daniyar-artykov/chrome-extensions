var ril = function() {
    function a(a) {
        var b = t + a.path,
            c = a.data || {};
        c.consumer_key = r, $.ajax({
            url: b,
            type: "POST",
            headers: {
                "X-Accept": "application/json"
            },
            data: c,
            dataType: "json",
            success: a.success,
            error: a.error
        })
    }

    function b(b) {
        a({
            path: "/oauth/is_valid_token",
            data: {
                access_token: getSetting("oauth_token")
            },
            success: function(a) {
                b && b(!0)
            },
            error: function(a) {
                b && b(!1)
            }
        })
    }

    function c() {
        return "undefined" != typeof getSetting("username") && "undefined" != typeof getSetting("oauth_token")
    }

    function d() {
        setSetting("username", void 0), setSetting("email", void 0), setSetting("firstName", void 0), setSetting("lastName", void 0), setSetting("oauth_token", void 0), setSetting("premium_status", void 0), setSetting("tagsFetchedSince", void 0), setSetting("tags", void 0), setSetting("usedTags", void 0), setSetting("password", void 0), setSetting("token", void 0), setSetting("guid", void 0), setSetting("heartbeatTimestamp", void 0), setSetting("alreadyLoggedIn", void 0), m(function(a) {
            setSetting("guid", void 0), setSetting("heartbeatTimestamp", void 0)
        }), setSetting("premUpsell", void 0), setSetting("premUpsellTime", void 0), setSetting("premUpsellCount", void 0), setSetting("saveCount", void 0)
    }

    function e(b, c) {
        c = c || {};
        a({
            path: "/oauth/authorize",
            data: {
                guid: getSetting("guid"),
                token: b.token,
                user_id: b.userId,
                account: "1",
                grant_type: "extension"
            },
            success: function(a) {
                var b = a.username,
                    d = a.access_token,
                    e = a.account,
                    f = e.email,
                    g = e.first_name || "",
                    h = e.last_name || "",
                    j = e.premium_status;
                setSetting("username", b), setSetting("email", f), setSetting("firstName", g), setSetting("lastName", h), setSetting("oauth_token", d), setSetting("token", void 0), setSetting("premium_status", j), c.success && c.success(), i()
            },
            error: function(a, b, d) {
                console.log("Login Error:"), console.log(a.error), c.error && c.error.apply(c, Array.apply(null, arguments))
            }
        })
    }

    function f(a, b, c) {
        var d = {
            action: "add",
            url: b,
            title: a
        };
        h(d, c)
    }

    function g(a, b) {
        var c = {
            action: "delete",
            item_id: a
        };
        h(c, b)
    }

    function h(b, c) {
        "undefined" != typeof c.actionInfo && (b = $.extend(b, c.actionInfo)), a({
            path: "/send",
            data: {
                access_token: getSetting("oauth_token"),
                actions: JSON.stringify([b])
            },
            success: function(a) {
                c.success && c.success(a)
            },
            error: function(a) {
                401 === a.status && d(), c.error && c.error(a.status, a)
            }
        })
    }

    function i(b) {
        if (c()) {
            b = b || {};
            var d = getSetting("tagsFetchedSince"),
                e = getSetting("premium_status"),
                f = {
                    access_token: getSetting("oauth_token"),
                    tags: 1,
                    taglist: 1,
                    account: 1,
                    since: d ? d : 0
                };
            "undefined" == typeof e && (f.forceaccount = 1), a({
                path: "/get",
                data: f,
                success: function(a) {
                    a.account && setSetting("premium_status", a.account.premium_status), a.tags && setSetting("tags", JSON.stringify(a.tags)), setSetting("tagsFetchedSince", a.since), b.success && b.success()
                },
                error: function(a) {
                    b.error && b.error()
                }
            })
        }
    }

    function j(a, b, c) {
        var d = {
                action: "tags_add",
                url: a,
                tags: b
            },
            e = c.success;
        c.success = function(a) {
            for (var c = getSetting("usedTags"), d = c ? JSON.parse(c) : {}, f = 0; f < b.length; f++) {
                var g = b[f].trim(),
                    h = {
                        tag: g,
                        timestamp: new Date
                    };
                d[g] = h
            }
            setSetting("usedTags", JSON.stringify(d)), e && e(a)
        }, h(d, c)
    }

    function k(a) {
        var b = function() {
            var b = getSetting("tags"),
                c = "";
            b && (c = JSON.parse(b));
            var d = getSetting("usedTags"),
                e = [];
            if (d) {
                var f = JSON.parse(d),
                    g = [];
                for (var h in f) g.push(f[h]);
                g.sort(function(a, b) {
                    return a = new Date(a.timestamp), b = new Date(b.timestamp), b > a ? -1 : a > b ? 1 : 0
                });
                for (var i = 0; i < g.length; i++) e.push(g[i].tag);
                e.reverse()
            }
            a && a(c, e)
        };
        i({
            success: b,
            error: b
        })
    }

    function l(b, d) {
        c() && (d = d || {}, a({
            path: "/suggested_tags",
            data: {
                access_token: getSetting("oauth_token"),
                url: b
            },
            success: function(a) {
                d.success && d.success(a)
            },
            error: function(a) {
                d.error && d.error(a.status, a)
            }
        }))
    }

    function m(a) {
        if (isChromeOnly()) {
            var b = getSetting("heartbeatTimestamp"),
                c = Date.now(),
                d = 864e5;
            if ("undefined" == typeof b || c - b > d) {
                var e = getSetting("guid");
                if ("undefined" == typeof e) return void ril.getGuid(function(a) {
                    a.tests && (a.tests.extension_install_signup_v1 && setSetting("experimentVariant", a.tests.extension_install_signup_v1.option), !a.tests.premium_ext_upsell_v2 || "show_upsell" != a.tests.premium_ext_upsell_v2.option || "en-us" != window.navigator.language.toLowerCase() && "en" != window.navigator.language.toLowerCase() ? setSetting("premUpsell", "0") : setSetting("premUpsell", "1")), a.guid ? (setSetting("guid", a.guid), m()) : setTimeout(m, 36e5)
                });
                if ("undefined" != typeof getSetting("oauth_token") && "undefined" != typeof getSetting("guid")) {
                    var f = "control";
                    "1" !== getSetting("premium_status") && "1" == getSetting("premUpsell") && (f = "show_upsell"), ril.sendAbTestRegister(getSetting("guid"), getSetting("oauth_token"), "premium_ext_upsell_v2", f)
                }
                chrome.windows.getAll({
                    populate: !0
                }, function(b) {
                    for (var d = 0, f = 0; f < b.length; f++) d += b[f].tabs.length;
                    ril.sendHeartbeat(e, d, b.length, function(b) {
                        b ? (setSetting("heartbeatTimestamp", c), a && a(c)) : setTimeout(m, 36e5)
                    })
                })
            } else {
                var e = getSetting("guid");
                "undefined" == typeof e && ril.getGuid(function(a) {
                    a.guid && setSetting("guid", a.guid), a.tests && (a.tests.extension_install_signup_v1 && setSetting("experimentVariant", a.tests.extension_install_signup_v1.option), !a.tests.premium_ext_upsell_v2 || "show_upsell" != a.tests.premium_ext_upsell_v2.option || "en-us" != window.navigator.language.toLowerCase() && "en" != window.navigator.language.toLowerCase() ? setSetting("premUpsell", "0") : setSetting("premUpsell", "1"))
                })
            }
        }
    }

    function n(b, c, d, e) {
        return "undefined" != typeof b && b ? void a({
            path: "/pv",
            data: {
                access_token: getSetting("oauth_token"),
                guid: b,
                actions: JSON.stringify([{
                    view: "ext_heartbeat",
                    cxt_t: c,
                    cxt_w: d
                }])
            },
            success: function(a) {
                e && e(!0)
            },
            error: function(a) {
                e && e(!1)
            }
        }) : void(e && e(!1))
    }

    function o(b) {
        a({
            path: "/guid",
            data: {
                abt: 1
            },
            success: function(a) {
                b && b(a.status ? a : !1)
            },
            error: function(a) {
                b && b(!1)
            }
        })
    }

    function p(b, c, d, e, f) {
        a({
            path: "/abtr",
            data: {
                guid: b,
                access_token: c,
                actions: JSON.stringify([{
                    action: "pv_ab",
                    ab_test: d,
                    ab_test_option: e
                }])
            },
            success: function(a) {
                f && f(a.status ? !0 : !1)
            },
            error: function(a) {
                f && f(!1)
            }
        })
    }

    function q(b, c, d) {
        return "undefined" != typeof b && b ? void a({
            path: "/pv",
            data: {
                access_token: getSetting("oauth_token"),
                guid: b,
                actions: JSON.stringify([{
                    view: "web",
                    type_id: 1,
                    section: "extension",
                    page: c
                }])
            },
            success: function(a) {
                d && d(!0)
            },
            error: function(a) {
                d && d(!1)
            }
        }) : void(d && d(!1))
    }
    var r, s, t = "https://getpocket.com/v3";
    return isSafari() ? (r = "9346-1e342af73fe11d5174042e9d", s = "135gbu4epq447VX194TjSfto95A0jbz0") : isOpera() ? (r = "15449-d65f5fdc5cbb3fef26248f12", s = "3a6ZtR00Aa825u31drgc530b97d9te43") : isYandex() ? (r = "23283-dd493d5fba22fd9b6f39e35a", s = "3a6ZtR00Aa825u31drgc530b97d9te43") : isChromeOnly() && (r = "7035-d3382df43fe0195174c42f9c", s = "801p7PR9A5b78x11f4ghRD8CVFdrA689"), {
        isAuthorized: c,
        login: e,
        logout: d,
        add: f,
        remove: g,
        addTags: j,
        getTags: k,
        getSuggestedTags: l,
        setupHeartbeat: m,
        sendHeartbeat: n,
        getGuid: o,
        sendAbTestRegister: p,
        sendAnalyticsCall: q,
        isValidToken: b
    }
}();