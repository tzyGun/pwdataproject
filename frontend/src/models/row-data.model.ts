export interface RowData {
    coins: Array<Coin>;
}


export interface Coin {
    volume24h?: number;
    rank: Number;
    name: string;
    price: Number;
    sparkLine: Array<number>
    iconUrl: string;
    symbol: string;
    change: number;
}