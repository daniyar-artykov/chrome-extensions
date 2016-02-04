$(document).ready(function() {
	var server = getParameterByName('server');
	var url = getParameterByName('url');
	
	console.log(server + ' | ' + url);
	if(server == 'proxy-eu') {
		$('#hidester-form').prop('action', 'https://eu.hidester.com/proxy/includes/process.php?action=update');
	} else {
		$('#hidester-form').prop('action', 'https://us.hidester.com/proxy/includes/process.php?action=update')
	}

	$('#u').prop('value', url);

	if($('#hidester-form').prop('action') && $('#u').prop('value')) {
		$('#hidester-form').submit();
	} else {
		setTimeout(function () {
			$('#hidester-form').submit();
		}, 300);
	}
});

function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	results = regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}