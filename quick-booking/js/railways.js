function loginDo(step) {
	var req;
	var login, pwd;

	chrome.storage.local.get('railways', function(a){
		if(a) {
			login = a['railways'].login;
			pwd = a['railways'].password;

			if (window.XMLHttpRequest) {
				req = new XMLHttpRequest();
			} else if(window.ActiveXObject) {
				try {
					req = new ActiveXObject('Msxml2.XMLHTTP');
				} catch (e){}
				try {
					req = new ActiveXObject('Microsoft.XMLHTTP');
				} catch (e){}
			}

			if (req) {
				req.onreadystatechange = function(){
					document.getElementById("sbmLogin").disabled="false";
					document.getElementById("plsWait").innerHTML="";
					if (req.readyState == 4 && req.status == 200){
						var resp = req.responseText.trim();
						if(resp=="LOGIN_OK"){
							if(document.getElementById("LichCab")!=undefined && step==2){
								document.location.href="proc?pa=clients"
							}else{
								updateUserDiv();
							}
							$('#modal-auth').modal('hide');
						}else{
							var obj = document.getElementById('loginErrDiv');
							obj.innerHTML="<font color='red'><b>"+resp+"</b></font>";
						}
					}
				};
				var reqStr = "pa=clients&sa=LOGIN_EVENT&STEP="+step
				+ "&CLIENT_LOGIN="+login
				+ "&CLIENT_PWD="+pwd;

				alert(reqStr);
				
				req.open("POST", '/ktz4/proc', true);
				req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				req.send(reqStr);
				document.getElementById("sbmLogin").disabled="true";
				document.getElementById("plsWait").innerHTML="подождите...";
			} else {
				alert("Браузер не поддерживает AJAX.");
			}
		}
	});
}

function updateUserDiv(){
	var req;

	if (window.XMLHttpRequest)  req = new XMLHttpRequest();
	else if(window.ActiveXObject) {
		try {
			req = new ActiveXObject('Msxml2.XMLHTTP');
		} catch (e){}
		try {
			req = new ActiveXObject('Microsoft.XMLHTTP');
		} catch (e){}
	}

	if (req) {
		req.onreadystatechange = function(){
			if (req.readyState == 4 && req.status == 200){
				document.getElementById("userDiv").innerHTML=req.responseText.trim();
				loadFormLoginEvents();
			}
		};
		req.open("POST", '/ktz4/include5/user_menu.jsp', true);
		req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		req.send("");
	}else{
		alert("Браузер не поддерживает AJAX.");
	}
}

loginDo(0);