# coinprima nodejs client

## Web Socket Stream

1. Open your window console, go to your working directory, install the pusher client package.

Reference: [pusher.js](https://github.com/pusher/pusher-js#nodejs)

       npm install pusher-js
    
2. Under the same directory, run

       node pusher_private_channel.js
       
## Public Rest API

1. Use **npm** to install this package:

       npm install xmlhttprequest

2. Under the same directory, run
 
       node public_rest_api_client.js

## Private Rest API

HMAC SHA256 signature has been implemented in all private api call.

1. Use **npm** to install this package:

       npm install xmlhttprequest uuid-random js-sha256 utf8-bytes

2. Under the same directory, run
 
       node private_rest_api_client.js
