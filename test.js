//
// Test.js
//
// Use this script to test the Javascript SDK for Watson Websocket.
// Download Watson Websocket here: https://github.com/jchristn/watsonwebsocket
//
// Dependencies:
//   prompt   'npm install prompt'
//

const Watson = require("./watson.js");
const prompt = require("prompt");

function processCommands() {
    var runForever = true;
    prompt.start();
    prompt.get(["Command"], function (err, result) {
        if (err) {
            console.log("Error: " + err);
        }
        else {
            var command = result.Command.toString().trim();
            switch (result.Command) {
                case "?":
                    break;

                case "connect":
                    if (connected) {
                        console.log("Already connected");
                    }
                    else {
                        watson = new Watson("localhost", 8002, false, true, onConnect, onDisconnect, onMessage, onError);
                    }
                    break;

                case "state":
                    console.log("Connected: " + connected);
                    break;

                case "q":
                    runForever = false;
                    break;

                default:
                    var data = result.Command.toString();
                    watson.send(data);
                    break;
            }

            if (runForever) processCommands();
        }
    });
}

function onConnect(data) {
    console.log("*** Server connected");
    connected = true;
}

function onDisconnect(data) {
    console.log("*** Server disconnected");
    connected = false;
}

function onMessage(data) {
    if (data) {
        console.log("*** Data received (" + data.length + ")");
        console.log(data.toString("utf-8"));
    }
}

function  onError(data) {
    if (data) {
        console.log("*** Error received (" + data.length + ")");
        console.log(data);
    }
}

var connected = false;

// hostname, port, ssl, debug, onConnect, onDisconnect, onMessage, onError
var watson = new Watson("localhost", 8002, false, true, onConnect, onDisconnect, onMessage, onError);
processCommands();
