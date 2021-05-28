import React from "react";
import "./App.css";
import Table from "./components/table/table";
import { useState } from "react";
import { Coin } from "./models/row-data.model";
import Header from "./components/header/header";
import {MockData} from "./utils/mock-data"

function App() {
  const getInitialCoins = () => {
    const parseSparkLine = (sparkLines: Array<string>): Array<number> => {
      return sparkLines.map(sparkLine=> parseFloat(sparkLine))
    }
    const coins: Array<Coin> = [{
      rank: 1,
      amount: 10,
      name: "bitcoin",
      sparkLine: parseSparkLine(MockData.getMockSparkLines()),
      coinIconUrl: 'https://cdn.coinranking.com/bOabBYkcX/bitcoin_btc.svg'
    },
    {
      rank: 2,
      amount: 15,
      name: "bitcoin",
      sparkLine: [],
      coinIconUrl: 'https://cdn.coinranking.com/bOabBYkcX/bitcoin_btc.svg'
    }]
    return coins;
  };
  const [coins, setCoins] = useState(getInitialCoins());
  return (
    <main className="App bg-gradient-to-b from-blue-500 to-grey-200 app-main">
      <Header />
      <Table coins={coins} />
    </main>
  );
}

export default App;
