var appId = '';
var apiKey = '';

$(document).ready(function() {
	var options_url = chrome.extension.getURL('/forms/options.html');
	$('#settings-link').prop('href', options_url);
	chrome.storage.local.get('userData', initializeUserDataControls);
});

function initializeUserDataControls(a) {
	if (a && (a = a['userData'])) {
		$.ajax({
			url : 'https://api.intercom.io/users',
			type : 'GET',
			data : {
				email : 'kamiarcustomer@gmail.com'
			},
			dataType : 'json',
			headers : {
				Accept: 'application/json',
				'Authorization' : 'Basic '
					+ btoa(a.appId + ':' + a.apiKey)
			},
			success : function(result) {
				$('#name').html(result.name);
				$('#email').prop('href','mailito:'+result.email).text(result.email);
				$('#city').html(result.location_data.city_name);
				$('#country').html(result.location_data.country_name);
				$('#session-count').html(result.session_count);

				// tags start
				var flag = true;
				if(result.tags != null && result.tags.tags != null
						&& result.tags.tags.length > 0) {
					$.each(result.tags.tags, function(index, element) {
						if(element != null && element.name) {
							$('<tr><td>' + element.name + '</td><td></td></tr>').insertAfter($('#tags'));
							flag = false;
						}
					});
				}

				if(flag) {
					$('<tr><td></td><td></td></tr>').insertAfter($('#tags'));
				}
				// tags end

				// segments start
				flag = true;
				if(result.segments != null && result.segments.segments != null
						&& result.segments.segments.length > 0) {
					$.each(result.segments.segments, function(index, element) {
						if(element != null && element.id) {
							$('<tr><td>' + element.id + '</td><td></td></tr>').insertAfter($('#segments'));
							flag = false;
						}
					});
				}

				if(flag) {
					$('<tr><td></td><td></td></tr>').insertAfter($('#segments'));
				}
				// segment end

				var d = new Date(result.signed_up_at * 1000);
				$('#signed-up').html(d.getDate() + ' ' + getMonthString(d.getMonth()) + ' ' + d.getFullYear());

				if(result.companies != null && result.companies.companies != null 
						&& result.companies.companies[0] != null 
						&& result.companies.companies[0].company_id != null) {
					$('#company').html(result.companies.companies[0].name);

					// getting info about company
					$.ajax({
						url : 'https://api.intercom.io/companies',
						type : 'GET',
						data : {
							id : result.companies.companies[0].company_id
						},
						dataType : 'json',
						headers : {
							Accept: 'application/json',
							'Authorization' : 'Basic '
								+ btoa(a.appId + ':' + a.apiKey)
						},
						success : function(result1) {
							$.each(result1.companies, function(index, element) {
								if(element.company_id == result.companies.companies[0].company_id) {
									$('#teammates').html(element.user_count);
								}
							});
						},
						error : function(xhr, ajaxOptions,
								thrownError) {
							console.log(xhr.status);
							console.log(thrownError);
						}
					});
				}

				// social profiles
				flag = true;
				if(result.social_profiles != null && result.social_profiles.social_profiles != null
						&& result.social_profiles.social_profiles.length > 0) {
					$.each(result.social_profiles.social_profiles, function(index, element) {
						if(element != null && element.name) {
							$('<tr><td>' + element.name + ':</td><td>' + element.username + '</td></tr>').insertAfter($('#social-profiles'));
						}
					});
				}

				if(flag) {
					$('<tr><td></td><td></td></tr>').insertAfter($('#social-profiles'));
				}
			},
			error : function(xhr, ajaxOptions,
					thrownError) {
				console.log(xhr.status);
				console.log(thrownError);
			}
		});
	}
}

function getMonthString(n) {
	var month = '';
	switch (n) {
	case 0:
		month = 'Jan';
		break;
	case 1:
		month = 'Feb';
		break;
	case 2:
		month = 'Mar';
		break;
	case 3:
		month = 'Apr';
		break;
	case 4:
		month = 'May';
		break;
	case 5:
		month = 'Jun';
		break;
	case 6:
		month = 'Jul';
		break;
	case 7:
		month = 'Aug';
		break;
	case 8:
		month = 'Sep';
		break;
	case 9:
		month = 'Oct';
		break;
	case 10:
		month = 'Nov';
		break;
	case 11:
		month = 'Dec';
		break;
	default:
		month = 'Unk'
	}

	return month;
}