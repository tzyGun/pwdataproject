import { Consumer } from 'kafkajs';
import KafkaClientFactory from './kafka-client.factory';

export default class KafkaConsumer {

    private consumer: Consumer

    constructor() {
        this.consumer = KafkaClientFactory.createKafkaConsumer()
    }

    public get consumerInstance(): Consumer {
        return this.consumer
    }


    async closeConsumer() {
        await this.consumer.disconnect()
    }

    async handleTopicMessages(publishToWebSocketCallback: Function) {
        await this.consumer.run({
            eachMessage: async (record) => {
                publishToWebSocketCallback(record)
            }
        })
    }

    async initKafkaConsumer() {
        await this.consumer.connect()
    }

    async subscribeKafkaConsumer() {
        console.log('Subscrining kafka consumer to topic')
        await this.consumer.subscribe({
            topic: process.env.TOPIC!,
            fromBeginning: true
        })
    }
}