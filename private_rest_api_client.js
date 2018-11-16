const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const HmacUtils = require('./hmacUtils');

var PREFIX = "CoinPrima";
var API_KEY = "API_KEY";
var SECRET_KEY = "SECRET_KEY";
var METHOD = "GET"; //"POST", "DELETE"; 
var URL = "URL";

var auth = HmacUtils.GetHmacAuthHeader(PREFIX, METHOD, URL, API_KEY, SECRET_KEY, "");
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
xhttp.setRequestHeader("Content-Type", "application/json");
xhttp.setRequestHeader("Authorization", auth);
xhttp.send();
