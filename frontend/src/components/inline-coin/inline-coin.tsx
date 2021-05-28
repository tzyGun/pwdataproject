
import React from "react";
import { Coin } from "../../models/row-data.model";
import './inline-coin.css'

type TableRowProps = { coin: Coin };

const InlineCoin = (props: TableRowProps) => {
  return (
    <div className="flex inline-coin space-x-4">
     <img className="w-12" src={props.coin.coinIconUrl} alt={props.coin.name}/>
     <span>{props.coin.name}</span>
    </div>
  );
};

export default InlineCoin;
