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
Object.defineProperty(exports, "__esModule", { value: true });
var WebSocket = require("ws");
var kafka_client_consumer_1 = require("../kafka/kafka-client-consumer");
var WebSocketServer = /** @class */ (function () {
    function WebSocketServer(httpServer) {
        this.httpServer = httpServer;
        this.server = httpServer;
    }
    Object.defineProperty(WebSocketServer.prototype, "webSocketSession", {
        get: function () {
            return this.webSocket;
        },
        enumerable: false,
        configurable: true
    });
    WebSocketServer.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var wss, kafkaConsumer;
            var _this = this;
            return __generator(this, function (_a) {
                wss = new WebSocket.Server({ server: this.server });
                kafkaConsumer = new kafka_client_consumer_1.default();
                wss.on('connection', function (ws) {
                    kafkaConsumer.initKafkaConsumer()
                        .then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, kafkaConsumer.subscribeKafkaConsumer()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })
                        .then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, kafkaConsumer.handleTopicMessages(function (record) {
                                        var _a;
                                        var topic = record.topic, partition = record.partition, message = record.message;
                                        console.log('Received message', {
                                            topic: topic,
                                            partition: partition,
                                            message: message,
                                            value: (_a = message.value) === null || _a === void 0 ? void 0 : _a.toString()
                                        });
                                        ws.send("offset message: " + message.offset);
                                    })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })
                        .catch(function (error) { return __awaiter(_this, void 0, void 0, function () {
                        var e_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    console.error(error);
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, kafkaConsumer.consumerInstance.disconnect()];
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
                });
                wss.on('close', function () {
                    kafkaConsumer.closeConsumer().then(function () { return console.info('Consumer succesfully closed'); });
                });
                return [2 /*return*/];
            });
        });
    };
    return WebSocketServer;
}());
exports.default = WebSocketServer;
