import React from "react";
import { useState, useEffect } from "react";
import socketClient from "socket.io-client";

export default function Socket() {
  const [response, setResponse] = useState({});

  useEffect(() => {
    const socket = socketClient('http://localhost:3001');
    socket.on("message-from-server", (data) => {
      setResponse(data);
    });
  }, []);
console.log('elo')
  return (
    <div>
      {/* <p>{response}</p> */}
    </div>
  );
}
