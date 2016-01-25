/*
 * RightTasks Extension
 * Adds your Tasks to the right side in Gmail
 *
 * (c) Ionut Colceriu - http://ghinda.net/
 *
 */

var rightTasks = (function() {
	'use strict';

	var $tasksContainer,
	$mailContainer,
	currentTopPosition,
	lastTopPosition,
	minimizedTasks = localStorage.getItem('minimizedTasks') ? JSON.parse(localStorage.getItem('minimizedTasks')) : false;

	var position = function() {

		currentTopPosition = $mailContainer.offsetTop;

		/* In case we the usual container isn't there
		 */
		if(currentTopPosition === 0) {
			var $gbox1 = document.getElementById('gbx1');

			/* Compatibility with Streak for Gmail, Chrome extension
			 */
			var streakContainer = document.getElementsByClassName('pv_main_container')[0];
			if(streakContainer) {
				currentTopPosition = streakContainer.offsetTop;
			} else {
				currentTopPosition = $gbox1.offsetTop + $gbox1.clientHeight;
			}
		}

		// set the widget top to match the main container top
		if($tasksContainer && currentTopPosition!== lastTopPosition) {
			$tasksContainer.style.paddingTop = currentTopPosition + 'px';
			lastTopPosition = currentTopPosition;
		}

	};

	// trigger click events, as binded by Gmail
	var triggerClick = function($element) {

		var evt1 = document.createEvent('MouseEvents');
		var evt2 = document.createEvent('MouseEvents');

		var theWindow = window;

		// for firefox
		if(typeof unsafeWindow !== 'undefined') {
			theWindow = unsafeWindow;
		}

		evt1.initMouseEvent('mousedown', true, true, theWindow, 1, 1, 1, 1, 1, false, false, false, false, 0, null);
		evt2.initMouseEvent('mouseup', true, true, theWindow, 1, 1, 1, 1, 1, false, false, false, false, 0, null);

		$element.dispatchEvent(evt1);
		$element.dispatchEvent(evt2);

	};

	var userDetailsShowed = false;
	var intervalId = null;
	var currentUrl = null;

	// find the tasks container added dynamically by Gmail
	var findTasksContainer = function() {

		// find the tasks iframe, and get it's main parent with the .dw class
		var tasksIframe = document.getElementById('tasksiframe');

		if(tasksIframe) {

			var topParent = document.getElementById('tasksiframe');
			while(topParent.className.indexOf('dw') === -1) {
				topParent = topParent.parentNode;

				if(topParent.className.indexOf('AD') !== -1) {
					$tasksContainer = topParent;
				}
			}

			// add a class to the top-most parent of the tasks widget
			// to be able to give it a lower z-index
			// and not overlap the full-screen compose message popup
			topParent.className += ' gmail-righttasks-top-container';

			$tasksContainer.className += ' gmail-righttasks';
			position();

			$tasksContainer.parentNode.className += ' gmail-righttasks-container';
			$tasksContainer.querySelector('div.aYF').innerHTML = 'Intercom';

			var elem = document.querySelector('span.gD');
			var lastEmail = localStorage.getItem('lastEmail');
//			console.log('lastEmail: ' + lastEmail);
			if(elem && (elem.getAttribute('email') !== lastEmail || !userDetailsShowed)) {
				userDetailsShowed = true;
//				console.log('currentEmail: ' + elem.getAttribute('email'));
				localStorage.setItem('lastEmail', elem.getAttribute('email'));
				tasksIframe.src = chrome.runtime.getURL('forms/intercom-gmail.html?email=' + elem.getAttribute('email'));
			}

			// get the dom of the tasks iframe
			var getIframeDom = function() {

				// add minimize button
				var $tasksHeader = $tasksContainer.querySelector('td.Hm');

				var $minimizeBtn = document.createElement('a');
				$minimizeBtn.className = 'righttasks-minimize-btn';
				$minimizeBtn.setAttribute('title', 'Minimize');
				$minimizeBtn.setAttribute('aria-label', 'Minimize');

				$minimizeBtn.addEventListener('click', function(e) {
					if(document.body.className.indexOf('righttasks-minimized') === -1) {
						// add class
						document.body.className += ' righttasks-minimized';

						// save in localstorage
						localStorage.setItem('minimizedTasks', 'true');

						// remove interval
						removeIntervalEmailFinder(intervalId);

						// change title attribute tooltip
						$minimizeBtn.setAttribute('title', 'Restore');
					} else {
						// remove class
						document.body.className = document.body.className.replace(/ righttasks-minimized/g, '');

						// save in localstorage
						localStorage.setItem('minimizedTasks', 'false');

						intervalId = setInterval(function() {
							$tasksContainer.querySelector('div.aYF').innerHTML = 'Intercom';

							currentUrl = window.location.href;
//							console.log('currentUrl: ' + currentUrl);

							if(currentUrl.search("/#inbox/") === -1) {
								document.body.className += ' righttasks-minimized';
							} else if(currentUrl.search("/#inbox/") > 0) {
								document.body.className = document.body.className.replace(/ righttasks-minimized/g, '');
							}

							var elem = document.querySelector('span.gD');
							var lastEmail = localStorage.getItem('lastEmail');
//							console.log('lastEmail: ' + lastEmail);

							if(elem && (elem.getAttribute('email') !== lastEmail || !userDetailsShowed)) {
								userDetailsShowed = true;
//								console.log('currentEmail: ' + elem.getAttribute('email'));
								localStorage.setItem('lastEmail', elem.getAttribute('email'));
								tasksIframe.src = chrome.runtime.getURL('forms/intercom-gmail.html?email=' + elem.getAttribute('email'));
							}
						}, 2000);

						elem = document.querySelector('span.gD');
						lastEmail = localStorage.getItem('lastEmail');
//						console.log('lastEmail: ' + lastEmail);
						$tasksContainer.querySelector('div.aYF').innerHTML = 'Intercom';
						if(elem && (elem.getAttribute('email') !== lastEmail || !userDetailsShowed)) {
							userDetailsShowed = true;
//							console.log('currentEmail: ' + elem.getAttribute('email'));
//							localStorage.setItem('lastEmail', elem.getAttribute('email'));
							tasksIframe.src = chrome.runtime.getURL('forms/intercom-gmail.html?email=' + elem.getAttribute('email'));
						}

						// change title attribute tooltip
						$minimizeBtn.setAttribute('title', 'Minimize');
					}
				});

				$tasksHeader.appendChild($minimizeBtn);

				currentUrl = window.location.href;
				console.log('currentUrl: ' + currentUrl);

				// if previously minimized, add minimized class
				if(minimizedTasks || !elem || currentUrl.search("/#inbox/") === -1) {
					document.body.className += ' righttasks-minimized';
				}
			};

			getIframeDom();

			intervalId = setInterval(function() {
				$tasksContainer.querySelector('div.aYF').innerHTML = 'Intercom';

				currentUrl = window.location.href;
//				console.log('currentUrl: ' + currentUrl);

				if(currentUrl.search("/#inbox/") === -1) {
					document.body.className += ' righttasks-minimized';
				} else if(currentUrl.search("/#inbox/") > 0) {
					document.body.className = document.body.className.replace(/ righttasks-minimized/g, '');
				}

				var elem = document.querySelector('span.gD');
				var lastEmail = localStorage.getItem('lastEmail');
//				console.log('lastEmail: ' + lastEmail);

				if(elem && (elem.getAttribute('email') !== lastEmail || !userDetailsShowed)) {
					userDetailsShowed = true;
//					console.log('currentEmail: ' + elem.getAttribute('email'));
					localStorage.setItem('lastEmail', elem.getAttribute('email'));
					tasksIframe.src = chrome.runtime.getURL('forms/intercom-gmail.html?email=' + elem.getAttribute('email'));
				}
			}, 2000);

		} else {
			setTimeout(findTasksContainer, 500);
		}
	};

	function removeIntervalEmailFinder(intervalId) {
		clearInterval(intervalId);
	}

	var init = function(a) {
		if (a && (a = a['userData'])) {
			// if we're in a gmail pop-up
			// don't trigger the extension
			if(document.body.className.indexOf('xE') !== -1) {
				return false;
			}

			// cleanup vars
			currentTopPosition = 0;
			lastTopPosition = 1;

			var $mailButton = document.querySelector('.aki.pp > div');

			// open mail menu
			triggerClick($mailButton);

			// close mail menu
			triggerClick($mailButton);

			// give it some time to render the markup
			setTimeout(function() {

				// get the tasks button from the mail dropdown
				var $tasksButton = document.querySelector('.aki.pp .jQjAxd [role=menuitem]:nth-child(3)');

				// click the tasks button
				triggerClick($tasksButton);

				// get the
				findTasksContainer();

			}, 10);

			// disable the ESC shortcut key, to prevent the tasks widget from being closed
			document.addEventListener('keydown', function (e) {
				if(e.which === 27){
					return false;
				}
			}, false);

			// get the main gmail container
			$mailContainer = document.querySelector('.AO');

			// reposition the widget when the page resizes
			window.addEventListener('resize', position);
		}
	};

	// reveal methods
	return {
		init: init
	}

}());

//wait for the Gmail ui to load
//http://anurag-maher.blogspot.ro/2012/12/developing-google-chrome-extension-for.html
(function () {
	var head;
	var max_retry = 200;

	// Check if Gmail UI frame is ready
	function isGmailUIFrame(doc) {
		try {
			return document.getElementsByClassName('aic').length > 0;
		} catch (e) {
			alert(e);
			return false;
		}
	}

	// Loop to check if the Gmail UI is loaded
	var waitForGmailToLoad = function() {
		var top_frame, canvas_frame;
		try {
			top_frame = window.top.document;
			if (top_frame.getElementById('canvas_frame')) {
			}
		} catch (e) {}
		top_frame = window.document;

		if(top_frame && isGmailUIFrame(top_frame)) {
			head = top_frame;

			// Gmail UI is loaded
//			rightTasks.init();

			chrome.storage.local.get('userData', rightTasks.init);

			return head;
		} else {
			max_retry = max_retry -1;
			if(max_retry > 0)
				window.setTimeout(waitForGmailToLoad, 500);
		}
		return (head !== undefined);
	};
	waitForGmailToLoad();
}());
