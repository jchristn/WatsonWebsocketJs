//
// Watson Websocket Javascript SDK
//
// All callback handlers should be of the form function(data, err) { }
// Download Watson Websocket here: https://github.com/jchristn/watsonwebsocket
//
// Dependencies:
//   ws       'npm install ws'       http://websockets.github.io/ws/
//

'use strict';

var WebSocket = require('ws');

class Watson {

    //
    // Internal methods
    //

    _log(msg) {
        if (this._debug) console.log(msg);
    }

    _onConnect(evt, callback) {
        this._log("_onConnect connected to " + this._endpoint);
        this._connected = true;
        setTimeout(() => callback("Connected", null));
    }

    _onDisconnect(evt, callback) {
        this._log("_onDisconnect websocket closed for " + this._endpoint);
        this._connected = false;
        setTimeout(() => callback("Disconnected", null));
    }

    _onMessage(evt, callback) {
        this._log("_onMessage received message: " + evt.data);
        var colonPos = evt.data.indexOf(":") + 1;
        if (colonPos > 0) {
            setTimeout(() => callback(evt.data.toString().substr(colonPos), null));
        }
    }

    _onError(evt, callback) {
        this._log("_onError received error: " + evt.data);
        setTimeout(() => callback(evt.data, null));
    }

    //
    // Public methods
    //

    send(message) {
        if (!message) return;
        if (!this._connected) {
            this._log("send websocket not connected");
            return;
        }
        if (this._websocket.readyState !== 1) {
            this._log("send websocket is not open: " + this._websocket.readyState);
            return;
        }
        else {
            this._log("send sending message: " + message);
            var messageData = message.length + ":" + message;
            this._websocket.send(messageData);
            return;
        }
    }

    //
    // Constructor
    //

    constructor(hostname, port, ssl, debug, onConnect, onDisconnect, onMessage, onError) {
        this._hostname = hostname;
        this._port = port;
        this._ssl = ssl;
        this._debug = debug;
        this._connected = false;
        this._endpoint = "";

        if (ssl) {
            this._endpoint = "wss://" + hostname + ":" + port + "/";
        }
        else {
            this._endpoint = "ws://" + hostname + ":" + port + "/";
        }

        this._log("Watson using websocket endpoint: " + this._endpoint);

        var self = this;
        this._websocket = new WebSocket(this._endpoint);
        this._websocket.onopen = function(evt) {
            self._onConnect(evt, onConnect);
        };
        this._websocket.onclose = function(evt) {
            self._onDisconnect(evt, onDisconnect)
        };
        this._websocket.onmessage = function(evt) {
            self._onMessage(evt, onMessage)
        };
        this._websocket.onerror = function(evt) {
            self._onError(evt, onError)
        };
    }
};

module.exports = Watson;
