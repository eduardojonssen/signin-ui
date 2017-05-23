export const queryParameters = function() {
    "use strict";
    var params = {};
    if(location.search){
        var parts = location.search.substring(1).split('&');
        for(var i = 0; i < parts.length; i++) {
            var nv = parts[i].split('=');
            if(!nv[0]) continue;
            params[nv[0]] = nv[1] || true;
        }
    }
    return params;
}

export const signout = function(params, callback) {
    "use strict";
    var url = "http://dlp-qrservices.cloudapp.net:20112/api/signout" + params;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            var response = JSON.parse(xhr.responseText);
            if(callback) { callback(response); }
        }
    }
    xhr.open('GET', url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.withCredentials = true;
    xhr.send();
}

export const authorize = function (params, callback) {
    "use strict";
    var url = "http://dlp-qrservices.cloudapp.net:20112/api/authorize" + params;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            var response = JSON.parse(xhr.responseText);
            if(callback) { callback(response); }
        }
    }
    xhr.open('GET', url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.withCredentials = true;
    xhr.send();
}

export const signin = function (params, form, callback) {
    "use strict";
    var url = "http://dlp-qrservices.cloudapp.net:20112/api/signin" + params;
    var formData = {};
    var data = $(form).serializeArray();
    for(let i = 0; i < data.length; i++) {
        formData[data[i].name] = data[i].value;
    }
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            var response = JSON.parse(xhr.responseText);
            if(callback) { callback(response); }
        }
    }
    xhr.open('POST', url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept-Language", "pt-BR");
    xhr.withCredentials = true;
    xhr.send(JSON.stringify(formData));
}