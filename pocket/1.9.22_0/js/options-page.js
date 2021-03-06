
! function() {
    function a() {
        var a = $("#keyboard-shortcut-text").attr("placeholder"),
            b = $("#keyboard-shortcut-text").val();
        if (a === b) return void $(".shortcut-info").text("");
        var d = $("<a href='#''>" + pkt.i18n.getMessage("options_reset_to_default") + "</a>");
        d.click(function(b) {
            $("#keyboard-shortcut-text").removeClass("error"), sendMessage({
                action: "setSetting",
                key: "keyboard-shortcut-add",
                value: a
            }), c(), $(".shortcut-info").text(""), document.body.style.cursor = "default", b.preventDefault()
        }), $(".shortcut-info").html(d)
    }

    function b() {
        navigator.onLine && sendMessage({
            action: "isValidToken"
        }, function(a) {
            a.value !== !0 && sendMessage({
                action: "getSetting",
                key: "username"
            }, function(a) {
                "" !== a.value && sendMessage({
                    action: "logout"
                }, function(a) {
                    c()
                })
            })
        })
    }

    function c() {
        var b = document.getElementById("username-field"),
            c = document.getElementById("logout-link-wrapper"),
            d = document.getElementById("login-link-wrapper");
        sendMessage({
            action: "getSetting",
            key: "username"
        }, function(e) {
            var f = e.value;
            f ? sendMessage({
                action: "getDisplayUsername"
            }, function(a) {
                b.innerHTML = a.value, c.style.display = "inline", b.style.display = "inline", d.style.display = "none"
            }) : (b.style.display = "none", c.style.display = "none", d.style.display = "inline"), $.each(j, function(a, b) {
                var c = "#" + b + "-checkbox";
                sendMessage({
                    action: "getSetting",
                    key: b
                }, function(a) {
                    $(c).prop("checked", boolFromString(a.value))
                })
            }), sendMessage({
                action: "getSetting",
                key: "keyboard-shortcut-add"
            }, function(b) {
                var c = b.value;
                void 0 !== c && $("#keyboard-shortcut-text").val(c), a()
            })
        })
    }

    function d(a) {
        return a.length > 0 && null === a.match(/^(((alt|shift|ctrl|command|⌘|⌥|⌃|⇧)\+)+([a-z0-9]{1}\+)*([a-z0-9]{1}))$/gi) ? !1 : !0
    }

    function e() {
        var a = "";
        isOpera() ? a = "Opera" : isYandex() ? a += pkt.i18n.getMessage("yandexBrowser") : isChrome() ? a = "Chrome" : isSafari() && (a = "Safari"), document.title = pkt.i18n.getMessagePlaceholder("options_title", [a])
    }

    function f() {
        $.each(j, function(a, b) {
            var c = "#" + b + "-checkbox";
            $(c).on("click", function() {
                sendMessage({
                    action: "setSetting",
                    key: b,
                    value: stringFromBool($(this).is(":checked"))
                })
            })
        })
    }

    function g() {
        var a = isMac() ? $("#ril-topics-links-win") : $("#ril-topics-links-mac");
        a.hide();
        var b;
        isOpera() ? b = "?s=OPERA_EXT_OPTIONS" : isYandex() ? b = "?s=YANDEX_EXT_OPTIONS" : isChrome() ? b = "?s=CHROME_EXT_OPTIONS" : isSafari() && (b = "?s=SAFARI_EXT_OPTIONS");
        var c = [{
            selector: ".ril-web a",
            link: "http://" + i + "/a" + b
        }, {
            selector: ".ril-iphone-ipad a",
            link: "http://" + i + "/ios" + b
        }, {
            selector: ".ril-mac a",
            link: "http://" + i + "/mac" + b
        }, {
            selector: ".ril-android a",
            link: "http://" + i + "/android" + b
        }, {
            selector: ".ril-iphone a",
            link: "http://" + i + "/iphone" + b
        }, {
            selector: ".ril-ipad a",
            link: "http://" + i + "/android" + b
        }];
        $.each(c, function(a, b) {
            $(b.selector).attr("href", b.link)
        })
    }

    function h() {
        ! function() {
            $("#logout-link").on("click", function() {
                sendMessage({
                    action: "openTab",
                    url: "http://" + i + "/lo",
                    inBackground: !1
                })
            }), $("#login-link").on("click", function() {
                sendMessage({
                    action: "showLoginWindow"
                })
            }), $("#search-support-link").on("click", function(a) {
                var b = "http://help." + i;
                sendMessage({
                    action: "openTab",
                    url: b
                }), a.preventDefault()
            }), $("#send-us-an-email-link").on("click", function(a) {
                var b = isChrome() ? "http://help." + i + "/customer/portal/emails/new?email%5Bsubject%5D=Question+about+Pocket+Extension+for+Chrome" : "http://help." + i + "/customer/portal/emails/new?email%5Bsubject%5D=Question+about+Pocket+Extension+for+Safari";
                sendMessage({
                    action: "openTab",
                    url: b
                }), a.preventDefault()
            }), $("#get-in-touch-on-twitter-link").on("click", function(a) {
                var b;
                isOpera() ? b = "%23opera " : isYandex() ? b = "%23yandex " : isChrome() ? b = "%23chrome " : isSafari() && (b = "%23safari ");
                var c = "https://twitter.com/intent/tweet?screen_name=pocketsupport&text=" + b;
                sendMessage({
                    action: "openTab",
                    url: c
                }), a.preventDefault()
            })
        }(),
        function() {
            var a = isMac() ? "⌘+⇧+P" : "ctrl+shift+S";
            $("#keyboard-shortcut-text").attr("placeholder", a);
            var b = isMac() ? "⇧" : "shift",
                e = isMac() ? "⌥" : "alt",
                f = isMac() ? "⌃" : "ctrl",
                g = isMac() ? "⌘" : "command",
                h = {
                    16: b,
                    18: e,
                    17: f,
                    91: g
                },
                i = {
                    8: "backspace",
                    9: "tab",
                    12: "clear",
                    13: "enter",
                    27: "esc",
                    32: "space",
                    37: "left",
                    38: "up",
                    39: "right",
                    40: "down",
                    46: "del",
                    36: "home",
                    35: "end",
                    33: "pageup",
                    34: "pagedown",
                    188: ",",
                    190: ".",
                    191: "/",
                    192: "`",
                    189: "-",
                    187: "=",
                    186: ";",
                    222: "'",
                    219: "[",
                    221: "]",
                    220: "\\"
                },
                j = [];
            $("#keyboard-shortcut-text").keydown(function(a) {
                var b = a.keyCode;
                if (8 === b) $(this).val("");
                else if (13 === b || 27 === b) $(this).blur();
                else {
                    var c = h[b] || i[b] || String.fromCharCode(b).toUpperCase(); - 1 == j.indexOf(c) && (j.push(c), $(this).val(j.join("+")))
                }
                a.preventDefault()
            }), $("#keyboard-shortcut-text").keyup(function(a) {
                j = []
            }), $("#keyboard-shortcut-text").focus(function(a) {
                this.select(), this.onmouseup = function() {
                    return this.onmouseup = null, !1
                }, $(".shortcut-info").text(pkt.i18n.getMessage("options_record_shortcut"))
            }), $("#keyboard-shortcut-text").focusout(function(a) {
                $(this).removeClass("error");
                var b = $(this).val().trim().replace(/[\s\,\&]/gi, "+").replace(/[^A-Z0-9\⇧\⌥\⌘\^\+]/gi, "");
                $(this).val(b);
                var e, f;
                "" === b ? (e = "keyboard-shortcut-add", f = $("#keyboard-shortcut-text").attr("placeholder"), sendMessage({
                    action: "setSetting",
                    key: e,
                    value: f
                })) : d(b) ? (e = "keyboard-shortcut-add", f = b, sendMessage({
                    action: "setSetting",
                    key: e,
                    value: f
                })) : $(this).addClass("error"), c()
            })
        }(), pkt.i18n.initLocalization(), e(), f(), g(), c(), b()
    }
    var i = "getpocket.com",
        j = ["twitter", "hackernews", "reddit", "yahoo", "keyboard-shortcut"];
    window.onload = h, addMessageListener(function(a, b, d) {
        "updateOptions" === a.action && c()
    })
}();