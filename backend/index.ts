import * as express from 'express';
import * as http from 'http';
import { AddressInfo } from 'net'
import * as dotenv from 'dotenv'
import WebSocketServer from './websocket/websocket-server';

const config = dotenv.config()
const app = express();

//initialize a simple http server
const server = http.createServer(app)
const wss = new WebSocketServer(server)

wss.init().then(()=> console.log('Websocket initialized'))



//initialize the WebSocket server instance

//start our server
server.listen(process.env.PORT, () => {
    console.log(`Server started on port ${(server.address() as AddressInfo).port} :)`);
});
