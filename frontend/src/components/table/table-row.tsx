import React from "react";
import { Coin } from "../../models/row-data.model";
import logo from "../../logo.svg";
import InlineIcon from '../inline-coin/inline-coin'
import SparkLine from '../sparkline/sparkline'

type TableRowProps = { coin: Coin };

const TableRow = (props: TableRowProps) => {
  console.log(props)
  return (
    <tr>
      <td>{props.coin.rank}</td>
      <td><InlineIcon coin={props.coin}/></td>
      <td>{props.coin.price}</td>
      <td>{props.coin.change}</td>
      <td><SparkLine coin={props.coin}/></td>
    </tr>
  );
};

export default TableRow;
