import React from "react";
import { useState } from "react";
import TableHeader from "./table-header";
import TableRow from "./table-row";
import { Coin } from "../../models/row-data.model";
import './table.css'
type TableProps = { coins: Array<Coin> };

const Table = (props: TableProps) => {
  return (
    <React.Fragment>
      <table className="table-auto bg-gray-200 rounded-xl p-8 table">
        <TableHeader />
        <tbody>
          {props.coins.map((coin: Coin) => (
            <TableRow coin={coin} />
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default Table;
