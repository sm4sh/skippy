(function () {
	var isEnabled;
	browser.storage.local.get().then(local => {isEnabled = local.skippy_enabled;});

	var observer = new MutationObserver(mutations => {
		mutations.forEach(function(mutation) {
			if (isEnabled === false
			|| mutation.addedNodes.length === 0
			|| mutation.addedNodes[0].className === undefined
			|| !(mutation.addedNodes[0].className.toString().match(/ptrack-container/)
				|| mutation.addedNodes[0].className.toString().match(/main-hitzone-element-container/))
			) {
				return;
			}
			var skipCredits = document.getElementsByClassName('skip-credits');
			var postPlay = document.getElementsByClassName('postplay-still-container');
			var watchNext = document.getElementsByClassName('WatchNext-still-container');
			var nextEpisode = document.getElementsByClassName('nf-icon-button nf-flat-button nf-flat-button-primary');

			if (skipCredits.length !== 0) {
				skipCredits[0].firstElementChild.click();
			} else if (postPlay.length !== 0) {
				postPlay[0].click();
			} else if (watchNext.length !== 0) {
				watchNext[0].click();
			} else if (nextEpisode.length !== 0) {
				if (nextEpisode[0].parentElement.className.toString().match(/PromotedVideo/)) {
					return;
				}
				nextEpisode[0].click();
			}
		});
	});
	browser.storage.onChanged.addListener((changes) => {
		for (var key in changes) {
			if (key !== 'skippy_enabled') {
				continue;
			}
			var change = changes[key];
			isEnabled = change.newValue;
		}
	});
	observer.observe(document.querySelector('body'), {childList: true, subtree: true});
})();
