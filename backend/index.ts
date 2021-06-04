import * as express from 'express';
import * as http from 'http';
import { AddressInfo } from 'net'
import * as dotenv from 'dotenv'
import KafkaClientFactory from './kafka/kafka-client.factory';
import path = require('path')
import { Socket } from 'socket.io';
const app = express();
const config = dotenv.config()

const consumer = KafkaClientFactory.createKafkaConsumer()
const main = async () => {
    await consumer.connect()
    console.log("connect")

    await consumer.subscribe({
        topic: process.env.TOPIC!,
        fromBeginning: true
    })
}

console.log('main')






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

main().catch(async error => {
    console.error(error)
    try {
        await consumer.disconnect()
    } catch (e) {
        console.error('Failed to gracefully disconnect consumer', e)
    }
    process.exit(1)
})

const run = async (socket: Socket)=> {
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log('Received message', {
                topic,
                partition,
                key: message.key,
                value: message.value!.toString()
            })
            socket.emit('message-from-server', {
                message: 'consumer'
            })
        }
    })
}


io.on('connection', async (socket: Socket) => {
    console.log('Connected');

    socket.emit('message-from-server', {
        message: 'Hello'
    })

    run(socket)

    socket.on('disconnect', async () => {
        await consumer.stop()
        consumer.disconnect().then(()=> console.log('consumer closed'))
        console.log('Client disconnected');
    });
});

