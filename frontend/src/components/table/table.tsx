import React from "react";
import { useContext } from "react";
import TableHeader from "./table-header";
import TableRow from "./table-row";
import { Coin } from "../../models/row-data.model";
import "./table.css";
import {
  WebSocketContextProvider,
  WebSocketContext,
} from "../../context/websocket-context";

const Table = () => {
  const { coins } = useContext(WebSocketContext);
  return (
    <React.Fragment>
      <WebSocketContextProvider>
        <table className="table-auto bg-gray-200 rounded-xl p-8 table">
          <TableHeader />
          <tbody>
            {coins.map((coin: Coin) => (
              <TableRow coin={coin} />
            ))}
          </tbody>
        </table>
      </WebSocketContextProvider>
    </React.Fragment>
  );
};

export default Table;
