// get the buttons by id
//let getHistory = document.getElementById('GetHistory');
//let talkToAzure = document.getElementById('talkToAzure');

//talkToAzure.onclick = function () {
//    var content = GetSiteCategory("www.google.com");

//    let div = document.getElementById('dummy');
//    div.innerHTML += content;

//    //find the categories here and return as a list

//}

//getHistory.onclick = function () {
//    let div = document.getElementById('dummyID');

//    GetBrowserHistory(function (result) {
//        div.innerText += JSON.stringify(result);
//    });
//}

function GetBrowserHistory(callback) {
    var returnValueList = [];
    browser.storage.local.get(function (items) {
        var fileteredKeys = Object.keys(items).filter(function findVisitedUrls(k) {
            return (!k.startsWith("Link_") && !k.startsWith("Category_"));
        });

        /* Get All the items within the local storage dictionary */
        for (i = 0; i < fileteredKeys.length; i++) {
            let item = items[fileteredKeys[i]];
            //div.innerHTML += item.url;

            //find the other details for this url
            //browser.storage.local.get("Link_" + item.url, function (linkDatas) {
                //var linkDatakeys = Object.keys(linkDatas);
            var linkDatakey = "Link_" + item.url;
                //for (j = 0; j < linkDatakeys.length; j++) {
            if (Object.keys(items).indexOf(linkDatakey) != -1) {
                returnValueList = returnValueList.concat(
                    {
                        url: item.url,
                        timeStamp: item.timeStamp,
                        title : items[linkDatakey].title,
                        domain : items[linkDatakey].domain,
                        categories : items[linkDatakey].categories
                    }
                );
            }
            else {
                returnValueList = returnValueList.concat(
                    {
                        url: item.url,
                        timeStamp: item.timeStamp,
                        title : "",
                        domain : "",
                        categories : ""
                    }
                );
            }
                //}
            //});
        }

        callback(returnValueList);
    });

    /*  Replace it with the python ML API EndPoint */
    //var x = new XMLHttpRequest();
    //x.open('GET', 'https://httpbin.org/get');
    //x.onload = function () {
    //    alert(x.responseText);
    //};
    //x.send();
}

function BackToMain() {
    let svg = document.getElementById('contents');
    svg.hidden = false;
    let categoryDescription = document.getElementById('categoryDescription');
    categoryDescription.hidden = true;
}

function MoveToCategoryPage(d) {
    //alert("Hello");
    //alert(d);
    //hide the current content within svg
    let svg = document.getElementById('contents');
    svg.hidden = true;

    let categoryDescription = document.getElementById('categoryDescription');
    categoryDescription.hidden = false;
    //parse the json to get the icon details
    d3.json("icons.json", function (data) {
        categoryDescription.innerHTML = '<button id="Back">Back</button><br/>';
        categoryDescription.innerHTML += '<img width="400px" height="400px" border="1px solid #000" src="' + data.list.find(x => x.name == d.name).icon + '"></img><br/>';
        categoryDescription.innerHTML += '<p width="400px" wordwrap="true"><b>' + d.name + '</b></p>';
        categoryDescription.innerHTML += '<div>' + wordwrap(data.list.find(x => x.name == d.name).description, 50, '<br/>') + '</div ><br/>';
        categoryDescription.innerHTML += '<div id="table"></div>';
        var table = '<table width="400px" height="20px" border="solid"><tbody>';

        //Collect the stats for the sites within
        var siteDict = {};
        for (site of d.Sites) {
            if (site.title in siteDict)
                siteDict[site.title] += 1;
            else
                siteDict[site.title] = 1;
        }

        var items = Object.keys(siteDict).map(function (key) {
            return [key, siteDict[key]];
        });

        // Sort the array based on the second element
        items.sort(function (first, second) {
            return second[1] - first[1];
        });

        for (i = 0; i < items.length; i++) {
            table += '<tr><td>' + items[i][0] + '</td><td>' + items[i][1] + '</td></tr>';
        }

        table += '</tbody></table></div>';
        let tableDiv = document.getElementById('table');
        tableDiv.innerHTML = table;

        let button = document.getElementById('Back');
        button.onclick = BackToMain;
    });
    //svg[0].innerHTML += '</table>';
    //Create the html content
    
}

function wordwrap(str, width, brk, cut) {

    brk = brk || 'n';
    width = width || 75;
    cut = cut || false;

    if (!str) { return str; }

    var regex = '.{1,' + width + '}(\s|$)' + (cut ? '|.{' + width + '}|.+$' : '|\S+?(\s|$)');

    return str.match(RegExp(regex, 'g')).join(brk);

}