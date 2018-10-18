const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

var PUBLIC_GET_URL = "COINPRIMA_API_URL";

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
     if (this.readyState == 4 && this.status == 200) {
         console.log(this.responseText);
     }
};
xhttp.open("GET", PUBLIC_GET_URL, true);
xhttp.setRequestHeader("Content-type", "application/json");
xhttp.send();