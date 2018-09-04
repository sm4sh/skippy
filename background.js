(function () {
	browser.browserAction.onClicked.addListener(function() {
		var isEnabled;
		browser.storage.local.get().then(local => {
			isEnabled = local.skippy_enabled;
			if (isEnabled === undefined) {
				isEnabled = true;
			}
			isEnabled = !isEnabled;
			browser.storage.local.set({skippy_enabled: isEnabled});
			var iconPath = isEnabled ? "icons/netflix_32.png" : "icons/netflix_32_disabled.png";
			browser.browserAction.setIcon({ path: iconPath });
		});
	});
})();
