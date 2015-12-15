parseString();

function parseString() {
	var tab_id = '0000001TAB';
	var frame_id = '000002FR';
	var step_id = 1;

	var toGate = '1||0||D:url("http://captchacreator.com/images/logo_bg.gif")||I:http://www.captchacreator.com/images/logo.gif||I:http://www.captchacreator.…files/images/c11.gif||I:http://www.captchacreator.com/files/images/c12.gif\n2||1||T:name||T:email||T:subject||T:spamcheck||I:http://www.captchacreator.com/captcha/captchac_code.php||T:Turing';

	console.log('tab_id: %s, frame_id: %s, step_id: %s \n toGate: %s', 
			tab_id, frame_id, step_id, toGate);

	var regex = new Array();

	var regexArray = get_regexes_string().split('||');
	for (var i=0; i<regexArray.length; i++) {
		regex[i] = new RegExp(regexArray[i]);
	}

	if(toGate) {
		var lines = toGate.split('\n');
		var zero = null;
		var first = null;
		var inputIndex = -1;
		var captchaIndex = -1;
		// iterate each line
		for(var i = 0; i < lines.length; i++) {
			console.log('lines[%s]: %s', i, lines[i]);
			if(!lines[i]) {
				continue;
			}
			var tags = lines[i].split('||');
			if(tags && tags.length > 2) {
				for(var j = 2; j < tags.length; j++) {
					console.log('tags[%s]: %s', j, tags[j]);

					if(tags[j].substring(0, 2) == 'T:') {
						console.log('regext input %s', regex[5].test(tags[j]));
						if(regex[5].test(tags[j])) {
							inputIndex = j - 2;
							continue;
						}
					} else if(tags[j].substring(0, 2) == 'I:') {
						console.log('regext image %s; and anti regex %s', regex[0].test(tags[j]), !regex[6].test(tags[j]));
						if(regex[0].test(tags[j]) && !regex[6].test(tags[j])) {
							captchaIndex = j - 2;
							continue;
						}
					}
					zero = null;
					first = null;
					inputIndex = -1;
					captchaIndex = -1;
				}
			}
			if(inputIndex != -1 && captchaIndex != -1) {
				zero = tags[0];
				first = tags[1];
			} else {
				zero = null;
				first = null;
				inputIndex = -1;
				captchaIndex = -1;
			}

			if(inputIndex > -1 && captchaIndex > -1 && zero && first) {
				console.log('found!! %s %s %s %s', zero, first, inputIndex, captchaIndex);
				break;
			}
		}
		var data = '|CAPTCHA(s) not found on this page.';
		if(inputIndex > -1 && captchaIndex > -1 && zero && first) {
			data = '|CAPTCHA(s) found on this page.||' + zero + '||' + first + '||' + inputIndex + '||' + captchaIndex + '||vQVMBh';
			process_good_response_from_first_gate(data, tab_id, frame_id, 'https://gate1a.skipinput.com/b_gate.php?b=chrome&v=3005&key=');
		}
	}
}

function get_regexes_string() {
	console.log('get_regexes_string');
	var line = "[ck]apt?cha|robot|random|rnd|code|kod|geraimag|verif|captcha||solvemedia||solvemedia||capt?cha|IdMainDiv|realperson||capt?cha||[ck]ap|chal|check|code|kod|confir|guess|guven|ivc|response|secur|solu|spam|test|token|validat|verif|vrfcd|result|respuesta|Turing||logo";
	if (localStorage['rumola:filter_string_new'])
		line = localStorage['rumola:filter_string_new'];
	// 0 - img  | [ck]apt?cha|robot|random|rnd|code|kod|geraimag|verif|captcha
	// 1 - object | solvemedia
	// 2 - frame | solvemedia
	// 3 - label/div  | capt?cha|IdMainDiv|realperson
	// 4 - div        | capt?cha
	// 5 - input    | [ck]ap|chal|check|code|kod|confir|guess|guven|ivc|response|secur|solu|spam|test|token|validat|verif|vrfcd|result|respuesta
	// 6 - image anti regex
	return line;
}