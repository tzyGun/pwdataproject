export interface RowData {
    coins: Array<Coin>;
}


export interface Coin {
    uuid?: String,
    volume24h?: number;
    rank: Number;
    name: string;
    price: Number;
    sparkline: Array<number>
    iconUrl: string;
    symbol: string;
    change: number;
}