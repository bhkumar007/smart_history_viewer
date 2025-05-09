// get the URL of the page
var url = document.location.href;

//alert(document.head.getAttribute("data-xd-id"));

browser.runtime.sendMessage({
    "url": url,
    "domain": document.location.hostname,
    //"host": document.location.host,
    "title": document.title
});
