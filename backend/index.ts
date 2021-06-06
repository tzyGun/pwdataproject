import * as express from 'express';
import * as http from 'http';
import { AddressInfo } from 'net'
import * as dotenv from 'dotenv'
import path = require('path')
import { Socket } from 'socket.io';
import { Kafka } from 'kafkajs'


const app = express();
const config = dotenv.config()
const kafka = new Kafka({
    brokers: [process.env.KAFKA_BOOTSTRAP_SERVER!],
})

const consumer = kafka.consumer({
    groupId: process.env.GROUP_ID!
})

let socketConnected = false

const main = async () => {
    await consumer.connect()
    console.info(`Kafka consumer connected to cluster, broker address ${process.env.KAFKA_BOOTSTRAP_SERVER!}`);

    await consumer.subscribe({
        topic: process.env.TOPIC!,
        fromBeginning: true
    })
    console.info(`Kafka consumer subscribed to ${process.env.TOPIC!}`);
    let socketSessionInstance: Socket

    io.on('connection', async (socket: Socket) => {
        console.info(`Socket server connected with client with status: ${socket.connected}`);
        socketSessionInstance = socket
        socketConnected = true
        socket.on('disconnect', async () => {
            console.info(`Socket server disconnected gracefully status: ${socket.connected}`);
            socketConnected = false
        });
    });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log('elo')
            const payload = {
                topic,
                partition,
                key: message.value?.toString(),
                message: message.value!.toString()
            }
            console.info(`Received message from kafka topic: ${topic}, partition ${partition}, key: ${payload.key}, message: \n ${payload.message}`);
            if (socketConnected) {
                socketSessionInstance.emit('message-from-server', {
                    payload
                })
            }
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

