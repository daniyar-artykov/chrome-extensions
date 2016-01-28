var appId = '';
var apiKey = '';

$(document).ready(function() {
	$('#customer-info').hide();
	var options_url = chrome.extension.getURL('/forms/options.html');
	$('#settings-link').prop('href', options_url);
	chrome.storage.local.get('userData', initializeUserDataControls);
});

function initializeUserDataControls(a) {
	var userEmail = getParameterByName('email');
	if (a && (a = a['userData']) && userEmail) {
		$.ajax({
			url : 'https://api.intercom.io/users',
			type : 'GET',
			data : {
				email : userEmail
			},
			dataType : 'json',
			headers : {
				Accept: 'application/json',
				'Authorization' : 'Basic '
					+ btoa(a.appId + ':' + a.apiKey)
			},
			success : function(result) {
				$('#no-customer-info').hide();
				$('#customer-info').show();

				$('#name').html(result.name);

				// avatar start
				if(result.avatar && result.avatar.image_url) {
					$('#avatar').prop('src', result.avatar.image_url);
				}
				// avatar end

				$('#email').prop('href', 'mailto:' + result.email).text(result.email);
				$('#city').html(result.location_data.city_name);
				$('#country').html(result.location_data.country_name);
				$('#session-count').html(result.session_count);

				// tags start
				var flag = true;
				if(result.tags && result.tags.tags && result.tags.tags.length > 0) {
					$.each(result.tags.tags, function(index, element) {
						if(element && element.name) {
							$('<tr><td colspan="2">' + element.name + '</td></tr>').insertAfter($('#tags'));
							flag = false;
						}
					});
				}

				if(flag) {
					$('<tr><td colspan="2"></td></tr>').insertAfter($('#tags'));
				}
				// tags end

				// segments start
				flag = true;
				if(result.segments && result.segments.segments && result.segments.segments.length > 0) {
					$.each(result.segments.segments, function(index, element) {
						if(element && element.id) {
							$.ajax({
								url : 'https://api.intercom.io/segments/' + element.id,
								type : 'GET',
								data : {},
								dataType : 'json',
								headers : {
									Accept: 'application/json',
									'Authorization' : 'Basic '
										+ btoa(a.appId + ':' + a.apiKey)
								},
								success : function(result2) {
									if(result2.name) {
										$('<tr><td colspan="2">' + result2.name + '</td></tr>').insertAfter($('#segments'));
										flag = false;
									}
								},
								error : function(xhr, ajaxOptions,
										thrownError) {
									console.log(xhr.status);
									console.log(thrownError);
								}
							});	
						}
					});
				}

				if(flag) {
					$('<tr><td colspan="2"></td></tr>').insertAfter($('#segments'));
				}
				// segment end

				// notes start
				flag = true;
				$.ajax({
					url : 'https://api.intercom.io/notes',
					type : 'GET',
					data : {
						id : result.id
					},
					dataType : 'json',
					headers : {
						Accept: 'application/json',
						'Authorization' : 'Basic '
							+ btoa(a.appId + ':' + a.apiKey)
					},
					success : function(result1) {
						$.each(result1.notes, function(index, element) {
							if(element.body) {
								$('<tr><td class="user-note" colspan="2">' + element.body + '</td></tr>').insertAfter($('#notes'));
								flag = false;
							}
						});
					},
					error : function(xhr, ajaxOptions,
							thrownError) {
						console.log(xhr.status);
						console.log(thrownError);
					}
				});

				if(flag) {
					$('<tr><td colspan="2"></td></tr>').insertAfter($('#notes'));
				}
				// notes end

				var d = new Date(result.signed_up_at * 1000);
				$('#signed-up').html(d.getDate() + ' ' + getMonthString(d.getMonth()) + ' ' + d.getFullYear());

				if(result.companies && result.companies.companies && result.companies.companies[0]
				&& result.companies.companies[0].company_id) {
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
									$('#price-plan').html(element.plan);
									$('#monthly-spend').html(element.monthly_spend);
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
				if(result.social_profiles && result.social_profiles.social_profiles
						&& result.social_profiles.social_profiles.length > 0) {
					$.each(result.social_profiles.social_profiles, function(index, element) {
						if(element && element.name) {
							$('<tr><td>' + element.name + ':</td><td>' + element.username + '</td></tr>').insertAfter($('#social-profiles'));
							flag = false;
						}
					});
				}

				if(flag) {
					$('#social-profile').html('');
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

function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	results = regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
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