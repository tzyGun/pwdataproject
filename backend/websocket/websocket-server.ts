import * as WebSocket from 'ws';
import * as http from 'http';
import KafkaConsumer from '../kafka/kafka-client-consumer';

export default class WebSocketServer {

    private server: http.Server
    private webSocket!: WebSocket

    constructor(private httpServer: http.Server) {
        this.server = httpServer
    }

    get webSocketSession() {
        return this.webSocket
    }

    async init() {
        const wss = new WebSocket.Server({ server: this.server });
        const kafkaConsumer = new KafkaConsumer()


        wss.on('connection', (ws: WebSocket) => {
            kafkaConsumer.initKafkaConsumer()
                .then(async res => {
                    await kafkaConsumer.subscribeKafkaConsumer()
                })
                .then(async res => {
                    await kafkaConsumer.handleTopicMessages((record: any) => {
                        const { topic, partition, message } = record
                        console.log('Received message', {
                            topic,
                            partition,
                            message,
                            value: message.value?.toString()
                        })
                        ws.send(`offset message: ${message.offset}`)
                    })
                })
                .catch(async error => {
                    console.error(error)
                    try {
                        await kafkaConsumer.consumerInstance.disconnect()
                    } catch (e) {
                        console.error('Failed to gracefully disconnect consumer', e)
                    }
                    process.exit(1)
                })
        })
        wss.on('close', ()=> {
            kafkaConsumer.closeConsumer().then(()=> console.info('Consumer succesfully closed'))
        });
    }
}