
if (window.thePKT_BM) window.thePKT_BM.save();
else {
    var PKT_BM_OVERLAY = function(a) {
        var b = this;
        this.baseHost = "getpocket.com", this.inited = !1, this.active = !1, this.delayedStateSaved = !1, this.wrapper = null, this.premiumStatus = "1" === window.___PKT__PREM_STATUS, this.premiumUpsell = "1" === window.___PKT__PREM_UPSELL, this.saveCount = window.___PKT__SAVE_COUNT, this.savedUrl = "", this.savedItemId = "", this.preventCloseTimerCancel = !1, this.translations = {}, this.translations.addTags = pkt.r_i18n.add_tags || "Add Tags", this.translations.close = pkt.r_i18n.close || "Close", this.translations.invalidTags = pkt.r_i18n.invalid_tags || "Tags are limited to 25 characters", this.translations.openPocket = pkt.r_i18n.open_pocket || "Open Pocket", this.translations.pageRemoved = pkt.r_i18n.page_removed || "Page Removed", this.translations.pageSaved = pkt.r_i18n.page_saved || "Page Saved", this.translations.premiumUpsellHeader = pkt.r_i18n.premium_upsellheader || "Get organized with Suggested Tags", this.translations.premiumUpsellLink = pkt.r_i18n.premium_upselllink || "Start your free Pocket Premium trial!", this.translations.processingRemove = pkt.r_i18n.processing_remove || "Removing page...", this.translations.processingTags = pkt.r_i18n.processing_tags || "Adding tags...", this.translations.processingUrl = pkt.r_i18n.processing_url || "Saving URL...", this.translations.recentTags = pkt.r_i18n.recent_tags || "Recent Tags", this.translations.removePage = pkt.r_i18n.remove_page || "Remove Page", this.translations.save = pkt.r_i18n.save || "Save", this.translations.suggestedTags = pkt.r_i18n.suggested_tags || "Suggested Tags", this.translations.suggestedTagsError = pkt.r_i18n.suggested_tags_error || "We’re having trouble retrieving suggested tags. Reload the page and save the item again.", this.translations.tagsSaved = pkt.r_i18n.tags_saved || "Tags Added", this.translations.unauthorized = pkt.r_i18n.unauthorized || "Unauthorized access. Please log in.", this.closeValid = !0, this.suggestedTagsLoaded = !1, this.mouseInside = !1, this.autocloseTimer = null, this.autocloseTiming = 4e3, this.autocloseTimingFinalState = 2e3, this.userTags = [], this.cxt_suggested_available = 0, this.cxt_entered = 0, this.cxt_suggested = 0, this.cxt_removed = 0, this.justaddedsuggested = !1, this.fillTagContainer = function(a, b, c) {
            for (var d = 0, e = 0; e < a.length; e++) {
                var f = $('<li><a href="#" class="token_tag ' + c + '">' + a[e] + "</a></li>");
                b.append(f);
                var g = f.position().left;
                if (!(g > d)) {
                    f.remove();
                    break
                }
                this.cxt_suggested_available++, d = g
            }
        }, this.fillUserTags = function() {
            var a = this;
            thePKT_BM.sendMessage({
                action: "getTags"
            }, function(b) {
                a.userTags = b.value.tags
            })
        }, this.fillSuggestedTags = function() {
            return $(".pkt_ext_suggestedtag_detail").length ? void thePKT_BM.sendMessage({
                action: "getSuggestedTags",
                url: b.urlToSave || window.location.toString()
            }, function(a) {
                if ($(".pkt_ext_suggestedtag_detail").removeClass("pkt_ext_suggestedtag_detail_loading"), "success" == a.status) {
                    for (var c = [], d = 0; d < a.value.suggestedTags.length; d++) c.push(a.value.suggestedTags[d].tag);
                    b.suggestedTagsLoaded = !0, b.mouseInside || b.startCloseTimer(), b.fillTagContainer(c, $(".pkt_ext_suggestedtag_detail ul"), "token_suggestedtag")
                } else if ("error" == a.status) {
                    var e = $('<p class="suggestedtag_msg">');
                    e.text(a.error), $(".pkt_ext_suggestedtag_detail").append(e), this.suggestedTagsLoaded = !0, b.mouseInside || b.startCloseTimer()
                }
            }) : (b.suggestedTagsLoaded = !0, void b.startCloseTimer())
        }, this.checkValidTagSubmit = function() {
            var a = $.trim($(".pkt_ext_tag_input_wrapper").find(".token-input-input-token").children("input").val()).length;
            $(".pkt_ext_container").find(".token-input-token").length || a > 0 && 26 > a ? $(".pkt_ext_container").find(".pkt_ext_btn").removeClass("pkt_ext_btn_disabled") : $(".pkt_ext_container").find(".pkt_ext_btn").addClass("pkt_ext_btn_disabled"), b.updateSlidingTagList()
        }, this.updateSlidingTagList = function() {
            var a = $(".token-input-input-token input").position().left,
                b = $(".token-input-list").position().left,
                c = parseInt($(".token-input-list").css("left")),
                d = b - c,
                e = $(".tag-input-wrapper").outerWidth();
            a + b + 20 > e ? $(".token-input-list").css("left", Math.min(-1 * (a + d - e + 20), 0) + "px") : $(".token-input-list").css("left", "0")
        }, this.showActiveTags = function() {
            if ($(".pkt_ext_suggestedtag_detail").length) {
                var a = "|";
                $(".token-input-token").each(function(b, c) {
                    a += $(c).find("p").text() + "|"
                });
                var b = $(".pkt_ext_suggestedtag_detail").find(".token_tag_inactive");
                b.each(function(b, c) {
                    -1 == a.indexOf("|" + $(c).text() + "|") && $(c).removeClass("token_tag_inactive")
                })
            }
        }, this.hideInactiveTags = function() {
            if ($(".pkt_ext_suggestedtag_detail").length) {
                var a = "|";
                $(".token-input-token").each(function(b, c) {
                    a += $(c).find("p").text() + "|"
                });
                var b = $(".token_tag").not(".token_tag_inactive");
                b.each(function(b, c) {
                    a.indexOf("|" + $(c).text() + "|") > -1 && $(c).addClass("token_tag_inactive")
                })
            }
        }, this.sanitizeText = function(a) {
            var b = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            };
            return "string" != typeof a ? "" : String(a).replace(/[&<>"']/g, function(a) {
                return b[a]
            })
        }, this.checkPlaceholderStatus = function() {
            this.wrapper.find(".pkt_ext_tag_input_wrapper").find(".token-input-token").length ? this.wrapper.find(".token-input-input-token input").attr("placeholder", "") : this.wrapper.find(".token-input-input-token input").attr("placeholder", $(".pkt_ext_tag_input").attr("placeholder")).css("width", "200px")
        }, this.initTagInput = function() {
            var a = $(".pkt_ext_tag_input_wrapper");
            a.find(".pkt_ext_tag_input").tokenInput([], {
                searchDelay: 200,
                minChars: 1,
                animateDropdown: !1,
                noResultsHideDropdown: !0,
                scrollKeyboard: !0,
                emptyInputLength: 200,
                search_function: function(c, d) {
                    var e = [];
                    if (c.length)
                        for (var f = 15, g = new RegExp("^" + c), h = 0; h < b.userTags.length; h++) g.test(b.userTags[h]) && f > 0 && (e.push({
                            name: b.userTags[h]
                        }), f--);
                    else e.push({
                        name: "blah"
                    });
                    $(".token-input-dropdown-tag").data("init") || ($(".token-input-dropdown-tag").css("width", a.outerWidth()).data("init"), a.append($(".token-input-dropdown-tag"))), d(e)
                },
                textToData: function(a) {
                    return $.trim(a).length > 25 || !$.trim(a).length ? (a.length > 25 && ($(".pkt_ext_edit_msg").addClass("pkt_ext_edit_msg_error pkt_ext_edit_msg_active").text(b.translations.invalidTags), changestamp = Date.now(), setTimeout(function() {
                        $(".token-input-input-token input").val(a).focus()
                    }, 10)), null) : ($(".pkt_ext_edit_msg").removeClass("pkt_ext_edit_msg_error pkt_ext_edit_msg_active").text(""), {
                        name: b.sanitizeText(a.toLowerCase())
                    })
                },
                onReady: function() {
                    $(".token-input-dropdown").addClass("token-input-dropdown-tag"), a.find(".token-input-input-token input").attr("placeholder", $(".tag-input").attr("placeholder")).css("width", "200px"), $(".pkt_ext_suggestedtag_detail").length && b.wrapper.find(".pkt_ext_suggestedtag_detail").on("click", ".token_tag", function(c) {
                        c.preventDefault();
                        var d = $(c.target);
                        $(this).parents(".pkt_ext_suggestedtag_detail_disabled").length || (b.justaddedsuggested = !0, a.find(".pkt_ext_tag_input").tokenInput("add", {
                            id: a.find(".token-input-token").length,
                            name: d.text()
                        }), d.addClass("token-suggestedtag-inactive"), $(".token-input-input-token input").focus())
                    }), $(".token-input-list").on("keydown", "input", function(a) {
                        37 == a.which && b.updateSlidingTagList()
                    }).on("keypress", "input", function(a) {
                        13 == a.which && Date.now() - changestamp > 250 && (a.preventDefault(), b.wrapper.find(".pkt_ext_btn").trigger("click"))
                    }).on("keyup", "input", function(a) {
                        b.checkValidTagSubmit()
                    }), b.checkPlaceholderStatus()
                },
                onAdd: function() {
                    b.checkValidTagSubmit(), changestamp = Date.now(), b.hideInactiveTags(), b.checkPlaceholderStatus(), b.justaddedsuggested ? (b.cxt_suggested++, b.justaddedsuggested = !1) : b.cxt_entered++
                },
                onDelete: function() {
                    b.checkValidTagSubmit(), changestamp = Date.now(), b.showActiveTags(), b.checkPlaceholderStatus(), b.cxt_removed++
                }
            }), $("body").on("keydown", function(b) {
                var c = b.keyCode || b.which;
                if (8 == c) {
                    var d = $(".token-input-selected-token");
                    d.length && (b.preventDefault(), b.stopImmediatePropagation(), a.find(".pkt_ext_tag_input").tokenInput("remove", {
                        name: d.find("p").text()
                    }))
                } else $(b.target).parent().hasClass("token-input-input-token") && b.stopImmediatePropagation()
            })
        }, this.initAddTagInput = function() {
            $(".pkt_ext_btn").click(function(a) {
                if (a.preventDefault(), !$(this).hasClass("pkt_ext_btn_disabled") && !$(".pkt_ext_edit_msg_active").filter(".pkt_ext_edit_msg_error").length) {
                    b.disableInput(), $(".pkt_ext_container").find(".pkt_ext_detail h2").text(b.translations.processingTags);
                    var c = [];
                    $(".token-input-token").each(function() {
                        var a = $.trim($(this).find("p").text());
                        a.length && c.push(a)
                    }), thePKT_BM.sendMessage({
                        action: "addTags",
                        url: b.urlToSave || window.location.toString(),
                        tags: c,
                        analytics: {
                            cxt_suggested_available: b.cxt_suggested_available,
                            cxt_entered: b.cxt_entered,
                            cxt_suggested: b.cxt_suggested,
                            cxt_removed: b.cxt_removed
                        }
                    }, function(a) {
                        "success" == a.status ? b.showStateFinalMsg(b.translations.tagsSaved) : "error" == a.status && $(".pkt_ext_edit_msg").addClass("pkt_ext_edit_msg_error pkt_ext_edit_msg_active").text(a.error)
                    })
                }
            })
        }, this.initRemovePageInput = function() {
            $(".pkt_ext_removeitem").click(function(a) {
                return $(this).parents(".pkt_ext_item_actions_disabled").length ? void a.preventDefault() : void($(this).hasClass("pkt_ext_removeitem") && (a.preventDefault(), b.disableInput(), $(".pkt_ext_container").find(".pkt_ext_detail h2").text(b.translations.processingRemove), thePKT_BM.sendMessage({
                    action: "removeURL",
                    item_id: b.savedItemId
                }, function(a) {
                    "success" == a.status ? b.showStateFinalMsg(b.translations.pageRemoved) : "error" == a.status && $(".pkt_ext_edit_msg").addClass("pkt_ext_edit_msg_error pkt_ext_edit_msg_active").text(a.error)
                })))
            })
        }, this.initCloseWindowInput = function() {
            b.wrapper.find(".pkt_ext_close").click(function(a) {
                a.preventDefault(), b.closePopup()
            }), b.wrapper.find(".pkt_ext_openpocket").click(function(a) {
                b.wrapper.find(".pkt_ext_close").trigger("click")
            }), b.wrapper.find(".pkt_ext_premupsell").length && b.wrapper.find(".pkt_ext_premupsell").find("a").click(function(a) {
                b.wrapper.find(".pkt_ext_close").trigger("click")
            })
        }, this.initAutoCloseEvents = function() {
            this.wrapper.on("mouseenter", function() {
                b.mouseInside = !0, b.suggestedTagsLoaded && b.stopCloseTimer()
            }), this.wrapper.on("mouseleave", function() {
                b.mouseInside = !1, b.suggestedTagsLoaded && b.startCloseTimer()
            }), this.wrapper.on("click", function(a) {
                b.closeValid = !1
            })
        }, this.startCloseTimer = function(a) {
            var c = a ? a : b.autocloseTiming;
            "number" == typeof b.autocloseTimer && clearTimeout(b.autocloseTimer), b.autocloseTimer = setTimeout(function() {
                (b.closeValid || b.preventCloseTimerCancel) && ($(".pkt_ext_container").addClass("pkt_ext_container_inactive"), b.preventCloseTimerCancel = !1)
            }, c)
        }, this.stopCloseTimer = function() {
            b.preventCloseTimerCancel || clearTimeout(b.autocloseTimer)
        }, this.disableInput = function() {
            this.wrapper.find(".pkt_ext_item_actions").addClass("pkt_ext_item_actions_disabled"), this.wrapper.find(".pkt_ext_btn").addClass("pkt_ext_btn_disabled"), this.wrapper.find(".pkt_ext_tag_input_wrapper").addClass("pkt_ext_tag_input_wrapper_disabled"), this.wrapper.find(".pkt_ext_suggestedtag_detail").length && this.wrapper.find(".pkt_ext_suggestedtag_detail").addClass("pkt_ext_suggestedtag_detail_disabled")
        }, this.enableInput = function() {
            this.wrapper.find(".pkt_ext_item_actions").removeClass("pkt_ext_item_actions_disabled"), this.checkValidTagSubmit(), this.wrapper.find(".pkt_ext_tag_input_wrapper").removeClass("pkt_ext_tag_input_wrapper_disabled"), this.wrapper.find(".pkt_ext_suggestedtag_detail").length && this.wrapper.find(".pkt_ext_suggestedtag_detail").removeClass("pkt_ext_suggestedtag_detail_disabled")
        }, this.showStateSaved = function() {
            return b.active ? void(b.delayedStateSaved = !0) : (b.urlToSave = window.___PKT__URL_TO_SAVE, $(".pkt_ext_container").addClass("pkt_ext_container_detailactive"), b.fillUserTags(), void(b.suggestedTagsLoaded ? b.startCloseTimer() : b.fillSuggestedTags()))
        }, this.showStateLoading = function() {
            this.wrapper.find(".pkt_ext_detail h2").text(this.translations.pageSaved), this.wrapper.find(".pkt_ext_btn").addClass("pkt_ext_btn_disabled");
            var a = this.wrapper.find(".pkt_ext_suggestedtag_detail");
            if (a.length) {
                var b = a.find(".suggestedtag_msg");
                b.length && b.remove(), a.find("ul").html(""), a.addClass("pkt_ext_suggestedtag_detail_loading")
            }
            this.wrapper.find(".pkt_ext_edit_msg").removeClass("pkt_ext_edit_msg_error pkt_ext_edit_msg_active").text(""), this.wrapper.find(".pkt_ext_tag_input").tokenInput("clear"), this.suggestedTagsLoaded = !1, this.cxt_suggested_available = 0, this.cxt_entered = 0, this.cxt_suggested = 0, this.cxt_removed = 0, this.enableInput();
            var c = "pkt_ext_container pkt_ext_container_active";
            this.wrapper.hasClass("pkt_ext_container_flexbox") && (c += " pkt_ext_container_flexbox"), this.wrapper.attr("class", c)
        }, this.showStateFinalMsg = function(a) {
            this.wrapper.find(".pkt_ext_finalstatedetail").one("webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd", function(a) {
                $(this).off("webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd"), b.preventCloseTimerCancel = !0, b.startCloseTimer(b.autocloseTimingFinalState)
            }), this.wrapper.find(".pkt_ext_finalstatedetail h2").text(a), this.wrapper.addClass("pkt_ext_container_finalstate")
        }, this.showStateError = function(a) {
            this.wrapper.find(".pkt_ext_finalstatedetail h2").text(a), this.wrapper.addClass("pkt_ext_container_finalerrorstate")
        }, this.showStateUnauthorized = function() {
            this.wrapper.find(".pkt_ext_finalstatedetail h2").text(this.translations.unauthorized), this.wrapper.addClass("pkt_ext_container_finalerrorstate")
        }, this.closePopup = function() {
            b.stopCloseTimer(), $(".pkt_ext_container").addClass("pkt_ext_container_inactive")
        }
    };
    PKT_BM_OVERLAY.prototype = {
        create: function() {
            function a() {
                function a(a) {
                    var b = document.createElement("detect");
                    return b.style.display = a, b.style.display === a
                }
                return a("flex") || a("-webkit-flex")
            }
            if (!this.active) {
                this.active = !0;
                var b = this;
                b.preventCloseTimerCancel = !1, b.stopCloseTimer(), b.closeValid = !0;
                var c = document.getElementsByTagName("body"),
                    d = c ? c[0] : !1;
                if (d || (d = document.documentElement), this.inited) b.showStateLoading(), b.active = !1, b.delayedStateSaved && (b.delayedStateSaved = !1, b.showStateSaved());
                else {
                    this.inited = !0;
                    var e, f = document.getElementsByClassName("pkt_ext_container");
                    if (f.length) e = e[0];
                    else {
                        var g = "pkt_ext_container";
                        a() && (g = "pkt_ext_container pkt_ext_container_flexbox"), e = document.createElement("div"), e.className = g, e.setAttribute("aria-live", "polite");
                        var h = "?save_cnt=multi";
                        "string" == typeof b.saveCount && "1" == b.saveCount && (h = "?save_cnt=1");
                        var i = '                    <div class="pkt_ext_initload">                        <div class="pkt_ext_loadingspinner"><div></div></div>                    </div>                    <div class="pkt_ext_finalstatedetail">                        <h2></h2>                    </div>                    <div class="pkt_ext_detail">                        <a title="' + b.translations.close + '" class="pkt_ext_close" href="#">' + b.translations.close + "</a>                        <h2>" + b.translations.pageSaved + '</h2>                        <nav class="pkt_ext_item_actions pkt_ext_cf">                            <ul>                                <li><a class="pkt_ext_openpocket" href="http://getpocket.com/a' + h + '" target="_blank">' + b.translations.openPocket + '</a></li>                                <li class="pkt_ext_actions_separator"></li>                                <li><a class="pkt_ext_removeitem" href="#">' + b.translations.removePage + '</a></li>                            </ul>                        </nav>                        <p class="pkt_ext_edit_msg"></p>                        <ul class="pkt_ext_rainbow_separator pkt_ext_cf">                            <li class="pkt_ext_color_1"></li>                            <li class="pkt_ext_color_2"></li>                            <li class="pkt_ext_color_3"></li>                            <li class="pkt_ext_color_4"></li>                        </ul>                        <div class="pkt_ext_tag_detail pkt_ext_cf">                            <div class="pkt_ext_tag_input_wrapper">                                <div class="pkt_ext_tag_input_blocker"></div>                                <input class="pkt_ext_tag_input" type="text" placeholder="' + b.translations.addTags + '">                            </div>                            <a href="#" class="pkt_ext_btn pkt_ext_btn_disabled">' + b.translations.save + "</a>                        </div>";
                        b.premiumStatus && (i += '                            <div class="pkt_ext_suggestedtag_detail pkt_ext_suggestedtag_detail_loading">                                <h4>' + b.translations.suggestedTags + '</h4>                                <div class="pkt_ext_loadingspinner"><div></div></div>                                <ul class="pkt_ext_cf">                                </ul>                            </div>'), i += "                    </div>", e.innerHTML = i, d.appendChild(e), !b.premiumStatus && b.premiumUpsell && $(".pkt_ext_tag_detail").after('<div class="pkt_ext_premupsell"><h4>' + b.translations.premiumUpsellHeader + '</h4><p><a href="https://getpocket.com/premium/?prt=ifT0Oyt6myb0Da&s=extupsell" target="_blank">' + b.translations.premiumUpsellLink + "</a></p></div>"), b.wrapper = $(".pkt_ext_container"), b.initTagInput(), b.initAddTagInput(), b.initRemovePageInput(), b.initCloseWindowInput(), b.initAutoCloseEvents()
                    }
                    setTimeout(function() {
                        e.className = g + " pkt_ext_container_active", b.active = !1, b.delayedStateSaved && (b.delayedStateSaved = !1, b.showStateSaved())
                    }, 10)
                }
            }
        },
        showStateSaved: function() {
            this.showStateSaved()
        },
        showStateError: function() {
            this.showStateError()
        },
        showStateUnauthorized: function() {
            this.showStateUnauthorized()
        }
    };
    var PKT_BM = function() {};
    PKT_BM.prototype = {
        init: function() {
            this.inited || (this.overlay = new PKT_BM_OVERLAY, this.inited = !0, this.requestListener = void 0)
        },
        isChrome: function() {
            return void 0 != window.chrome && window.chrome.app
        },
        isSafari: function() {
            return void 0 != window.safari
        },
        addMessageListener: function(a) {
            void 0 !== this.requestListener && this.removeMessageListener(), this.isChrome() ? (this.requestListener = a, chrome.extension.onMessage.addListener(a)) : this.isSafari() && (this.requestListener = function(b) {
                a(b.message, b)
            }, window.safari.self.addEventListener("message", this.requestListener))
        },
        removeMessageListener: function() {
            this.isChrome() ? chrome.extension.onMessage.removeListener(this.requestListener) : this.isSafari() && window.safari.self.removeEventListener("message", this.requestListener), this.requestListener = void 0
        },
        sendMessage: function(a, b) {
            this.isChrome() ? window.chrome.extension.sendMessage ? window.chrome.extension.sendMessage(a, b) : window.chrome.extension.sendRequest(a, b) : this.isSafari() && (b && (a.__cbId = Callbacker.addCb(b)), safari.self.tab.dispatchMessage("message", a))
        },
        handleMessageResponse: function(a) {
            "success" == a.status ? ("string" == typeof a.item_id && (this.overlay.savedItemId = a.item_id), this.overlay.showStateSaved()) : "unauthorized" == a.status ? this.overlay.showStateUnauthorized() : "error" == a.status && this.overlay.showStateError(a.message)
        },
        save: function() {
            this.overlay.create(), this.overlay.savedUrl = window.___PKT__URL_TO_SAVE, this.addMessageListener(function(a, b, c) {
                this.handleMessageResponse(a)
            }.bind(this)), thePKT_BM.sendMessage({
                action: "listenerReady"
            }, function(a) {})
        }
    }, $(document).ready(function() {
        if (!window.thePKT_BM) {
            var a = new PKT_BM;
            window.thePKT_BM = a, a.init()
        }
        window.thePKT_BM.save()
    })
}