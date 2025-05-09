// listen for webNavigation.onCompleted Events

browser.webNavigation.onCompleted.addListener(
    function (details) {
        var keyName = {};
        /* We need a unique key to store every value else the values will get overwritten.
         To generate the unique key, we will use a combination of timeStamp and tabId.
         We can potentially use a random guid as well*/
        keyName[details.timeStamp] = details;
        browser.storage.local.set(keyName);

        //var domainName = GetDomain(details.url);
    }
);

// listen for sendMessage() from content script
browser.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        //alert(request.url);
        //alert(request.domain);
        //alert(sender.tab.id);

        //alert(request.host);

        if (request.domain != null)
            GetSiteCategory(request.domain, function (categories) {

            var keyName = {};
            var details = {
                domain: request.domain,
                title: request.title,
                categories: categories
            }

            /* We need a unique key to store every value else the values will get overwritten.
             To generate the unique key, we will use a combination of timeStamp and tabId.
             We can potentially use a random guid as well*/
            keyName["Link_" + request.url] = details;
            browser.storage.local.set(keyName);
        });
    });