"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var http = require("http");
var dotenv = require("dotenv");
var websocket_server_1 = require("./websocket/websocket-server");
var config = dotenv.config();
var app = express();
//initialize a simple http server
var server = http.createServer(app);
var wss = new websocket_server_1.default(server);
wss.init().then(function () { return console.log('Websocket initialized'); });
//initialize the WebSocket server instance
//start our server
server.listen(process.env.PORT, function () {
    console.log("Server started on port " + server.address().port + " :)");
});
