# Watson Websocket Javascript SDK

Lightweight Javascript SDK to access a server using Watson Websocket.  

## Setup
Download Watson Websocket from here: https://github.com/jchristn/watsonwebsocket

## Test App
```
npm install prompt
npm install ws
node test.js
```

## Simple Example
Include the SDK.
```
const Watson = require("watsonwebscket");
```

Define callbacks.
```
function onConnect(data) { }
function onDisconnect(data) { }
function onMessage(data) { }
function onError(data) { }
```

Initialize the SDK.
```
var watson = new Watson(
	"localhost",	// hostname of the Watson Websocket server
	8002,			// TCP port number
	false,			// enable or disable SSL
	true,			// enable or disable debug logging
	onConnect,		// callback for when the connection is established
	onDisconnect,	// callback for when the connection is broken
	onMessage,		// callback for when a message is received
	onError			// callback for when an error is encountered
);
```
