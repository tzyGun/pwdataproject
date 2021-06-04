import "./App.css";
import React from "react";
import Table from "./components/table/table";
import Header from "./components/header/header";

function App() {
  return (
    <main className="App bg-gradient-to-b from-blue-500 to-grey-200 app-main">
      <Header />
      <Table />
    </main>
  );
}

export default App;
