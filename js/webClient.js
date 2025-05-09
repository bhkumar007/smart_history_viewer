
function GetSiteCategory(domain, callback) {

    var categories = [];

    //See if we have the data in cache
    browser.storage.local.get("Category_" + domain, function (items) {
        if (items.length > 0) {
            categories = items[0];
        }

        if (categories.length > 0) {
            return categories;
        }

        var req = new XMLHttpRequest();

        var apiKey = "J3OuNAbIIbt1Kkb0JGqR";
        var apiSecret = "7XFo840NBZsLVnVlykek";
        var targetHost = "https://api.webshrinker.com/categories/v3/" + btoa(domain);
        req.open('GET', targetHost, true);

        var authorizationKey = "Basic " + btoa(apiKey + ":" + apiSecret);
        req.setRequestHeader("Authorization", authorizationKey);
        req.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        req.withCredentials = true;

        req.onload = function () {
            //var reqResult = JSON.parse('{"data":[{"categories":[{"id":"IAB19","label":"Technology & Computing","parent":"IAB19","score":"0.878928848558277465","confident":true},{"id":"IAB19-35","label":"Web Search","parent":"IAB19","score":"0.861943632320768538","confident":true}],"url":"google.com"}]}');
            var reqResult = JSON.parse(req.responseText);
            if (reqResult.data.length > 0) {
                for (i = 0; i < reqResult.data[0].categories.length; i++) {
                    categories = categories.concat(reqResult.data[0].categories[i].label);
                }
            }

            //Add this result to cache
            var keyName = {};
            keyName["Category_" + domain] = categories;
            browser.storage.local.set(keyName);

            //alert(req.responseText);
            callback(categories);
        };
        req.send();

    });
}