import { Component, Fragment } from "react";
import socketClient from "socket.io-client";
import { Coin } from "../../models/row-data.model";
import "./table.css";
import TableHeader from "./table-header";
import TableRow from "./table-row";
import Loader from "../loader/loader";

type TableState = {
  coins: Array<Coin>
  isLoading: boolean
};

export default class Table extends Component<any, TableState> {
  state: TableState = {
    coins: [],
    isLoading: true,
  };

  coinsTemp: Array<Coin> = new Array<Coin>();

  componentDidMount() {
    const socket = socketClient("http://localhost:3001");
    socket.on("message-from-server", ({ payload }) => {
      if (payload) {
        const { message } = payload;
        const data = JSON.parse(message);
        let coin: Coin = {
          uuid: data.uuid,
          rank: data.rank,
          name: data.name,
          price: data.price,
          sparkline: data.sparkline,
          iconUrl: data.iconUrl,
          change: data.change,
          symbol: data.symbol,
        };
        this.updateCoinsArray(coin);
      }
      if(this.state.isLoading) {
          this.setState({isLoading: false})
      }
    });
  }

  updateCoinsArray(coin: Coin) {
    const existingCoinIndex = this.coinsTemp.findIndex(
      (existingCoin) => existingCoin.uuid === coin.uuid
    );
    if (existingCoinIndex !== -1) {
      this.coinsTemp[existingCoinIndex] = coin;
    } else {
      this.coinsTemp.push(coin);
    }
    this.setState({ coins: [...this.coinsTemp] });
  }

  render() {
    return (
      <Fragment>
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <table className="table-auto bg-gray-200 rounded-xl p-8 table">
            <TableHeader />
            <tbody>
              {this.state.coins.map((coin, index) => (
                <TableRow coin={coin} key={index} />
              ))}
            </tbody>
          </table>
        )}
      </Fragment>
    );
  }
}
