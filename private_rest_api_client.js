const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const uuid = require('uuid-random');
const sha256 = require('js-sha256');
const bytes = require('utf8-bytes')

var METHOD = "POST";
var URL = "YOUR_API_URL";
var API_KEY = "YOUR_API_KEY";
var SECRET_KEY = "YOUR_SECRET_KEY";
var PREFIX = "CoinPrima";

function GetHmacAuthHeader(method, endPoint, apikey, secret){
    var currentTimeText = (new Date().getTime() / 1000).toFixed(0);
    var uniqueID = uuid();
    var uri = encodeURIComponent(endPoint).toLowerCase();

    var data = apikey + method + uri + currentTimeText + uniqueID + "";
    var encodedSecret = bytes(secret);
    var encodedData = bytes(data);
    var hash = sha256.hmac(encodedSecret, encodedData);
    var parameter = apikey + ":" + hash + ":" + uniqueID + ":" + currentTimeText;
    var authHeader = PREFIX + " " + parameter;
    return authHeader;    
}

var auth = GetHmacAuthHeader(METHOD, URL, API_KEY, SECRET_KEY);
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
     if (this.readyState == 4 && this.status == 200) {
         console.log(this.responseText);
     }
     else{
         console.log("status: " + this.status);
     }
};

xhttp.open(METHOD, URL, true);
xhttp.setRequestHeader("Content-type", "application/json");
xhttp.setRequestHeader("Authorization", auth);
xhttp.send();