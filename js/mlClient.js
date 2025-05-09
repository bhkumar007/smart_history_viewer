
async function InvokeRequestResponseService() {
    var req = new XMLHttpRequest();
    var scoreRequest
    {
        Inputs: {
            input1: {
                {
                    timestamp: "1";
                    url: "";
                }
            }
        };
        GlobalParameters: { };
    };
    var apiKey = "Bearer EVQz8ptC6mf9LAuEib3XQ7RqgM1VcU54vhQL0o2raJvhb9nq0pW86nTiQV5NGS8jSLP5MdUDMWM2H8Dn+W/pKg==";
    req.open('POST', 'https://ussouthcentral.services.azureml.net/workspaces/acacb17bde2447458d2d6477e59bc545/services/fa0cdbeeb6b34f91bfea64f55128c5ec/execute', true);

    req.setRequestHeader("Authorization", apiKey);
    req.setRequestHeader('Content-type', 'application/json');

    req.onload = function () {
        alert(req.responseText);
    };
    req.send(scoreRequest);
}