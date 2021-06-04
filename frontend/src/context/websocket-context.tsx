import { createContext, useEffect, useState } from "react";
import socketClient from "socket.io-client";
import { Coin } from "../models/row-data.model";
import { CoinsContextState } from "../types/coin-type";
import MockData from "../utils/mock-data";

const coinsContextDefaultValues: CoinsContextState = {
  coins: MockData.getInitialCoins(),
  addCoin: () => {},
};
let WebSocketContext = createContext<CoinsContextState>(
  coinsContextDefaultValues
);

const WebSocketContextProvider = (child: any) => {
  const [coins, setCoins] = useState<Array<Coin>>(
    coinsContextDefaultValues.coins
  );
  const addCoin = (newCoin: Coin) => setCoins((coins) => [...coins, newCoin]);

  useEffect(() => {
    const socket = socketClient("http://localhost:3001");
    socket.on("message-from-server", ({payload}) => {
      if (payload) {
        const { message } = payload;
        const data = JSON.parse(message);
        let coins: Array<Coin> = [];
        coins.push({
          rank: data.rank,
          name: data.name,
          amount: data.amount,
          sparkLine: [],
          iconUrl: "",
          change: data.change,
          symbol: data.symbol,
        });
        setCoins(coins);
      }
    });
  }, []);

  console.log(coins);
  const { children } = child;
  return (
    <WebSocketContext.Provider value={{ coins, addCoin }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export { WebSocketContext, WebSocketContextProvider };
