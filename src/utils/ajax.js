const AJAX_TIME_OVER = 15000;
const CACHE_MAX_REQUESTS = 30;
let cache = {};

function getXmlHttp(){
    var xmlHttp;
    try { xmlHttp = new ActiveXObject("Msxml2.XMLHTTP"); }
    catch (e) {
        try { xmlHttp = new ActiveXObject("Microsoft.XMLHTTP"); }
        catch (err) { xmlHttp = false; }
    }
    if (!xmlHttp && typeof(XMLHttpRequest) != 'undefined')
        xmlHttp = new XMLHttpRequest();
    xmlHttp.withCredentials = true;
    return xmlHttp;
}

function isCacheOverflow(){
    return Object.keys(cache).length > CACHE_MAX_REQUESTS;
}

function getCacheRequest(url){
    if (isCacheOverflow()) {
        cache = {};
        return;
    }
    return cache[url];
}

function sendRequest(url, data, isCache, requestType) {

    function prepareUrl(url, isCache){
        return !isCache ? encodeURI(url + "&r=" + Math.round(Math.random() * 10000)) : encodeURI(url);
    }

    var cacheRequest = getCacheRequest(url);
    if (cacheRequest) return cacheRequest;
    if (!url) return Promise.reject(Error("Unknown url"));

    url = prepareUrl(url, isCache);
    var resp = new Promise(function(resolve, reject){

        var xmlHttp = getXmlHttp();
        requestType = requestType || 'GET';

        xmlHttp.open(requestType, url, true);
        //xmlHttp.setRequestHeader("Authorization", 'Basic ' + btoa('matveev.s:matveev.s'));
        xmlHttp.onreadystatechange = function() {
          if (xmlHttp.readyState == 4) {
            if (timeout)
                clearTimeout(timeout);

            if(xmlHttp.status == 200){
               resolve(xmlHttp.responseText);
            }
            else {
                console.log(xmlHttp.status);
                reject(new Error(xmlHttp.statusText || "Ajax request error"));
            }
          }
        };
        xmlHttp.send(data || null);

        var timeout = setTimeout( function(){ 
            xmlHttp.abort();
            reject(new Error("Ajax request time over"));
        }, AJAX_TIME_OVER);
    }.bind(this));

    if (isCache) {
        cache[url] = resp;
    }

    return resp;
}


export function get(url, isCache){
    return sendRequest(url, null, isCache);
}

export function post(url, data, isCache){ 
    return sendRequest(url, data, isCache, 'POST');
}

export function uploadFile(url, file){

    return new Promise(function(resolve, reject){
        var xmlHttp = getXmlHttp();

        xmlHttp.onreadystatechange = function() {
          if (xmlHttp.readyState == 4) {

            if(xmlHttp.status == 200){
               resolve(xmlHttp.responseText);
            }
            else {
                console.log(xmlHttp.status);
                reject(new Error(xmlHttp.statusText || "Upload file error"));
            }
          }
        };

        xmlHttp.open('POST', url);

        var formData = new FormData();
        formData.append('file', file, file.name);
        

        xmlHttp.send(formData);
    });
}

export function uploadFiles(url, files) {
    return new Promise(function(resolve, reject){
        var xmlHttp = getXmlHttp();

        xmlHttp.onreadystatechange = function() {
          if (xmlHttp.readyState == 4) {

            if(xmlHttp.status == 200){
               resolve(xmlHttp.responseText);
            }
            else {
                console.log(xmlHttp.status);
                reject(new Error(xmlHttp.statusText || "Upload file error"));
            }
          }
        };

        xmlHttp.open('POST', url);

        var formData = new FormData();
        for (var i = files.length - 1; i >= 0; i--) {
            let file = files[i];
            formData.append('files[]', file, file.name);
            
        };  
        xmlHttp.send(formData);
    });
}