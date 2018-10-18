const Pusher = require('pusher-js');

var pusher_key = "PUSHER_KEY";
var pusher_cluster = "PUSHER_CLUSTER";
var listen_key = "LISTEN_KEY";
var auth_endpoint = "AUTH_ENDPOINT";
 
Pusher.logToConsole = true;
Pusher.log = (msg) => { console.log(msg); };

const pusher = new Pusher(pusher_key, {
    encrypted: true,
    cluster: pusher_cluster,
    authEndpoint: auth_endpoint,
    authTransport: 'ajax',    
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

var private_channel = pusher.subscribe('private-' + listen_key);

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
