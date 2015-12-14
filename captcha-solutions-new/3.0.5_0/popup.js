function generateHTML(evt) {
	w = chrome.extension.getBackgroundPage();

	if (w.get_rumola_key1() == 'db7669d04f6430b5') {
		if (!w.send_activation_request('', -1, -1))
			window.close();
	}

	if (w.get_rumola_enabled()) {
		if (document.getElementById("switch_on_td"))
			document.getElementById("switch_on_td").style.setProperty("display", "none", "");
	} else {
		if (document.getElementById("switch_off_td"))
			document.getElementById("switch_off_td").style.setProperty("display", "none", "");
	}
	if (document.getElementById("switch_off_a"))
		document.getElementById("switch_off_a").innerHTML = chrome.i18n.getMessage("menu1");
	document.getElementById("switch_on_a").innerHTML = chrome.i18n.getMessage("menu2");
	if (document.getElementById("switch_off_a"))
		document.getElementById("switch_off_a").addEventListener("click", function(evt) {w.change_rumola_enabled();window.close();});
	if (document.getElementById("switch_off_a"))
		document.getElementById("switch_on_a").addEventListener("click", function(evt) {w.change_rumola_enabled();window.close();});
	if (document.getElementById("switch_on_checkbox")) {
		document.getElementById("switch_on_checkbox").checked = w.get_rumola_enabled();
		document.getElementById("switch_on_checkbox").addEventListener("change", function(evt) {
			if (w.get_rumola_enabled() != document.getElementById("switch_on_checkbox").checked)
				w.change_rumola_enabled();
		});
	}

	if (document.getElementById("captcha_search_a")) {
		document.getElementById("captcha_search_a").innerHTML = chrome.i18n.getMessage("menu3");
		document.getElementById("captcha_search_a").addEventListener("click", function(evt) {w.popup_clicked(1);window.close();});
	}

	if (document.getElementById("rumola_cancel_a")) {
		document.getElementById("rumola_cancel_a").innerHTML = chrome.i18n.getMessage("menu4");
		document.getElementById("rumola_cancel_a").addEventListener("click", function(evt) {w.popup_clicked(2);window.close();});
	}

	if (document.getElementById("incorrect_a")) {
		document.getElementById("incorrect_a").innerHTML = chrome.i18n.getMessage("menu5");
		document.getElementById("incorrect_a").addEventListener("click", function(evt) {w.popup_clicked(3);window.close();});
	}

	if (!w.get_abuse_captcha_params()) {
		document.getElementById("bad_answer_td").style.setProperty("display", "none", "");
	}

	document.getElementById("bad_answer_a").innerHTML = chrome.i18n.getMessage("menu6");
	document.getElementById("bad_answer_a").addEventListener("click", function(evt) {w.popup_clicked(4);window.close();});

	if (w.get_rumola_voice()) {
		if (document.getElementById("switch_voice_on_td"))
			document.getElementById("switch_voice_on_td").style.setProperty("display", "none", "");
	} else {
		if (document.getElementById("switch_voice_off_td"))
			document.getElementById("switch_voice_off_td").style.setProperty("display", "none", "");
	}
	if (document.getElementById("switch_voice_off_a"))
		document.getElementById("switch_voice_off_a").innerHTML = chrome.i18n.getMessage("menu11");
	document.getElementById("switch_voice_on_a").innerHTML = chrome.i18n.getMessage("menu10");
	if (document.getElementById("switch_voice_off_a")) {
		document.getElementById("switch_voice_off_a").addEventListener("click", function(evt) {w.set_rumola_voice(false);window.close();});
		document.getElementById("switch_voice_on_a").addEventListener("click", function(evt) {w.set_rumola_voice(true);window.close();});
	}
	if (document.getElementById("switch_voice_on_checkbox")) {
		document.getElementById("switch_voice_on_checkbox").checked = w.get_rumola_voice();
		document.getElementById("switch_voice_on_checkbox").addEventListener("change", function(evt) {
			if (w.get_rumola_voice() != document.getElementById("switch_voice_on_checkbox").checked)
				w.set_rumola_voice(document.getElementById("switch_voice_on_checkbox").checked);
		});
	}

	document.getElementById("purchase_a").innerHTML = chrome.i18n.getMessage("menu9").replace("?", w.get_cached_balance());
	document.getElementById("purchase_a").addEventListener("click", function(evt) {w.popup_clicked(7);window.close();});
	
	document.getElementById("tie_a").innerHTML = chrome.i18n.getMessage("menu8");
	document.getElementById("tie_a").addEventListener("click", function(evt) {w.popup_clicked(8);window.close();});

	document.getElementById("visit_website_a").innerHTML = chrome.i18n.getMessage("menu7");
	document.getElementById("visit_website_a").addEventListener("click", function(evt) {w.popup_clicked(5);window.close();});
	if (document.getElementById("visit_website_aa"))
		document.getElementById("visit_website_aa").addEventListener("click", function(evt) {w.popup_clicked(5);});

	document.getElementById("like_a").innerHTML = chrome.i18n.getMessage("menu12");
	document.getElementById("like_a").addEventListener("click", function(evt) {w.popup_clicked(9);window.close();});

	if (document.getElementById("tie_form"))
		document.getElementById("tie_form").action = "https://client.skipinput.com/?a=t&k="+w.get_rumola_key1()+"&v="+w.get_rumola_key2_sum();
}
window.addEventListener("load", generateHTML);
