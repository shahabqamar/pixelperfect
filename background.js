chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

        chrome.storage.sync.get(["project_url", "settings"], function(stored_settings) {

            if (stored_settings.project_url == request.taburl) {
                chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, { settings: stored_settings });
                });
            } else {
                chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, { settings: false });
                });
            }
        });

    });