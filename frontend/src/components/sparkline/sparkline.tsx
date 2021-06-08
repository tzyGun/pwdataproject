import React from "react";
import { Coin } from "../../models/row-data.model";
import { Sparklines, SparklinesLine } from "react-sparklines";

type SparkLineProps = { coin: Coin };

const SparkLine = (props: SparkLineProps) => {
  return (
    <Sparklines data={props.coin.sparkline}>
      <SparklinesLine color="blue" />
    </Sparklines>
  );
};

export default SparkLine;
