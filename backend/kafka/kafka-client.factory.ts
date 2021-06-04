import { Consumer, Kafka } from 'kafkajs'
export default class KafkaClientFactory {

    public static createKafkaConsumer(): Consumer {
        const kafka = new Kafka({
            brokers: [process.env.KAFKA_BOOTSTRAP_SERVER!],
        })
        console.log(process.env.GROUP_ID)
        return kafka.consumer({
            groupId: process.env.GROUP_ID!
        })
    }
}