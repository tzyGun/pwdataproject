"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kafkajs_1 = require("kafkajs");
var KafkaClientFactory = /** @class */ (function () {
    function KafkaClientFactory() {
    }
    KafkaClientFactory.createKafkaConsumer = function () {
        var kafka = new kafkajs_1.Kafka({
            brokers: [process.env.KAFKA_BOOTSTRAP_SERVER],
        });
        return kafka.consumer({
            groupId: process.env.GROUP_ID
        });
    };
    return KafkaClientFactory;
}());
exports.default = KafkaClientFactory;
