import { Consumer, Kafka } from 'kafkajs'
import KafkaConsumer from './kafka-client-consumer';

export default class KafkaClientFactory {

    public static createKafkaConsumer(): Consumer {
        const kafka = new Kafka({
            brokers: [process.env.KAFKA_BOOTSTRAP_SERVER!],
        })

        return kafka.consumer({
            groupId: process.env.GROUP_ID!
        })
    }
}