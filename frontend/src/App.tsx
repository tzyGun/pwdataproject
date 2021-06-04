import "./App.css";
import { useState, useRef, useMemo } from "react";
import MockData from './utils/mock-data'
import Table from "./components/table/table";
import Header from "./components/header/header";
import Socket from "./websocket/websocket";
function App() {
  const [coins, setCoins] = useState(MockData.getInitialCoins());
  return (
    <main className="App bg-gradient-to-b from-blue-500 to-grey-200 app-main">
      <Header />
      <Table coins={coins} />
      <Socket/>
    </main>
  );
  }

export default App;
