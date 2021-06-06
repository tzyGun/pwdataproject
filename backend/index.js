"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express = require("express");
var http = require("http");
var dotenv = require("dotenv");
var path = require("path");
var kafkajs_1 = require("kafkajs");
var app = express();
var config = dotenv.config();
var kafka = new kafkajs_1.Kafka({
    brokers: [process.env.KAFKA_BOOTSTRAP_SERVER]
});
var consumer = kafka.consumer({
    groupId: process.env.GROUP_ID
});
var socketConnected = false;
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var socketSessionInstance;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, consumer.connect()];
            case 1:
                _a.sent();
                console.info("Kafka consumer connected to cluster, broker address " + process.env.KAFKA_BOOTSTRAP_SERVER);
                return [4 /*yield*/, consumer.subscribe({
                        topic: process.env.TOPIC,
                        fromBeginning: true
                    })];
            case 2:
                _a.sent();
                console.info("Kafka consumer subscribed to " + process.env.TOPIC);
                io.on('connection', function (socket) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        console.info("Socket server connected with client with status: " + socket.connected);
                        socketSessionInstance = socket;
                        socketConnected = true;
                        socket.on('disconnect', function () { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                console.info("Socket server disconnected gracefully status: " + socket.connected);
                                socketConnected = false;
                                return [2 /*return*/];
                            });
                        }); });
                        return [2 /*return*/];
                    });
                }); });
                return [4 /*yield*/, consumer.run({
                        eachMessage: function (_a) {
                            var topic = _a.topic, partition = _a.partition, message = _a.message;
                            return __awaiter(void 0, void 0, void 0, function () {
                                var payload;
                                var _b;
                                return __generator(this, function (_c) {
                                    console.log('elo');
                                    payload = {
                                        topic: topic,
                                        partition: partition,
                                        key: (_b = message.value) === null || _b === void 0 ? void 0 : _b.toString(),
                                        message: message.value.toString()
                                    };
                                    console.info("Received message from kafka topic: " + topic + ", partition " + partition + ", key: " + payload.key + ", message: \n " + payload.message);
                                    if (socketConnected) {
                                        socketSessionInstance.emit('message-from-server', {
                                            payload: payload
                                        });
                                    }
                                    return [2 /*return*/];
                                });
                            });
                        }
                    })];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
main()["catch"](function (error) { return __awaiter(void 0, void 0, void 0, function () {
    var e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.error(error);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, consumer.disconnect()];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                console.error('Failed to gracefully disconnect consumer', e_1);
                return [3 /*break*/, 4];
            case 4:
                process.exit(1);
                return [2 /*return*/];
        }
    });
}); });
//initialize a simple http server
var server = http.createServer(app);
server.listen(process.env.PORT, function () {
    console.log("Server started on port " + server.address().port + " :)");
});
app.use(express.static(path.join(__dirname, "public")));
var io = require('socket.io')(server, {
    serveClient: true,
    cors: {
        origin: '*'
    }
});
