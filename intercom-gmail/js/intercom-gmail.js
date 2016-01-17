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
				$('#tag-name').html(result.tags.tags[0].name);
				if(result.companies.companies[0] != null 
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
							// $('#teammates').html(result1.user_count);
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
			},
			error : function(xhr, ajaxOptions,
					thrownError) {
				console.log(xhr.status);
				console.log(thrownError);
			}
		});
	}
}