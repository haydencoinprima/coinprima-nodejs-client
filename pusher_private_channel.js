const Pusher = require('pusher-js');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const HmacUtils = require('./hmacUtils');

var PUSHER_KEY = "PUSHER_KEY";
var PUSHER_CLUSTER = "PUSHER_CLUSTER";
var LISTEN_KEY = "LISTEN_KEY";
var PREFIX = "CoinPrima";
var API_KEY = "API_KEY";
var SECRET_KEY = "SECRET_KEY";
var URL = "URL";
var METHOD = "POST";

Pusher.logToConsole = true;
Pusher.log = (msg) => { console.log(msg); };

function GetAuthInfo(body){
    return new Promise(function(resolve, reject){
        
        var authInfo = "";;
        var hmac = HmacUtils.GetHmacAuthHeader(PREFIX, METHOD, URL, API_KEY, SECRET_KEY, body);           
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
                console.log("readyState=" + this.readyState + ", status=" + this.status)
                if (this.readyState == 4 && this.status == 200) {
                    authInfo = this.responseText;                
                    return resolve(authInfo);
                }
                else if (this.readyState == 4 && this.status != 200){
                    return reject(this.statusText);
                }
        }
        xhttp.open(METHOD, URL, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.setRequestHeader("Accept", "application/json");
        xhttp.setRequestHeader("Authorization", hmac);
        xhttp.send(body);
    });        
}


const pusher = new Pusher(PUSHER_KEY, {
    encrypted: true,
    cluster: PUSHER_CLUSTER,
    authEndpoint: URL,    
    //authTransport: 'jsonp', //httpget, fromuri
    authTransport: 'ajax', //httppost,
    authorizer: function (channel, options) {
        return {
          authorize: function (socketId, callback) {            
            var body = {
                socket_id: socketId,
                channel_name: channel.name
            };
            GetAuthInfo(JSON.stringify(body)).then((authInfo, err) => {
                callback(false, JSON.parse(authInfo));
            });            
          }
        };
      },
    auth:{}
});

pusher.connection.bind('error', function (err) {
    console.log("error: " + err.error.data.code);
});
pusher.connection.bind('connected', function () {
    console.log("connected socket_id: " + pusher.connection.socket_id);
});
pusher.connection.bind('state_change', function (states) {
    console.log("states, current: " + states.current + ", previous=" + states.previous);
});
pusher.connection.bind('disconnected', function (states) {
    console.log("disconnected: " + states);
});

var private_channel = pusher.subscribe('private-' + LISTEN_KEY);

private_channel.bind('er', on_execution_report_received);
private_channel.bind('r', on_reject_received);
private_channel.bind('ar', on_amend_reject_received);
private_channel.bind('cr', on_cancel_reject_received);

function on_execution_report_received(data) {
    console.log("er: " + data);
}
function on_reject_received(data) {
    console.log("r: " + data);
}
function on_amend_reject_received(data) {
    console.log("ar: " + data);
}
function on_cancel_reject_received(data) {
    console.log("cr: " + data);
}
