function handleForm() {
	var form = $("form#platformDialogForm:not([processed])");

	console.log("form.length: " + form.length);
	if (form.length > 0) {
		form.attr("processed", "true");
		form[0].submit();

		chrome.extension.sendRequest({name: "stepCompleted"});
	} else {
		window.tid = setTimeout(handleForm, 500);
	}
}
alert('test');
if (window.top != window.self) {
	handleForm();
}