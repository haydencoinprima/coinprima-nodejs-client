const uuid = require('uuid-random');
const sha256 = require('js-sha256');
const bytes = require('utf8-bytes')

module.exports = {
    GetHmacAuthHeader: function (prefix, method, endPoint, apikey, secret, body) {
        var currentTimeText = (new Date().getTime() / 1000).toFixed(0);
        var uniqueID = uuid();
        var uri = encodeURIComponent(endPoint).toLowerCase();
        var data = apikey + method + uri + currentTimeText + uniqueID + body;
        var encodedSecret = bytes(secret);
        var encodedData = bytes(data);
        var hash = sha256.hmac(encodedSecret, encodedData);
        var parameter = apikey + ":" + hash + ":" + uniqueID + ":" + currentTimeText;
        var authHeader = prefix + " " + parameter;
        return authHeader;    
    }
};