import * as express from 'express';
import * as http from 'http';
import { AddressInfo } from 'net'
import * as dotenv from 'dotenv'
import KafkaClientFactory from './kafka/kafka-client.factory';
import path = require('path')
import { Socket } from 'socket.io';
import { Consumer, Kafka } from 'kafkajs'


const app = express();
const config = dotenv.config()
const kafka = new Kafka({
    brokers: [process.env.KAFKA_BOOTSTRAP_SERVER!],
})

const consumer = kafka.consumer({
    groupId: process.env.GROUP_ID!
})

const main = async () => {
    await consumer.connect()

    await consumer.subscribe({
        topic: process.env.TOPIC!,
        fromBeginning: true
    })
    let socketG: Socket
    io.on('connection', async (socket: Socket) => {
        console.log('Connected');
        socketG = socket
        socket.on('disconnect', async () => {
            await consumer.stop()
            consumer.disconnect().then(()=> console.log('consumer closed'))
            console.log('Client disconnected');
        });
    });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const payload = {
                message: message.value!.toString()
            }
            socketG.emit('message-from-server', {
                payload
            })
        }
    })
}

main().catch(async error => {
    console.error(error)
    try {
        await consumer.disconnect()
    } catch (e) {
        console.error('Failed to gracefully disconnect consumer', e)
    }
    process.exit(1)
})

//initialize a simple http server
const server = http.createServer(app)

server.listen(process.env.PORT, () => {
    console.log(`Server started on port ${(server.address() as AddressInfo).port} :)`);
});

app.use(express.static(path.join(__dirname, "public")))

const io = require('socket.io')(server, {
    serveClient: true,
    cors: {
        origin: '*',
    }
});

