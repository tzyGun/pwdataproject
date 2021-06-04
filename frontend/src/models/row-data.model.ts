import { StringMappingType } from "typescript";

export interface RowData {
    coins: Array<Coin>;
}


export interface Coin {
    volume24h?: number;
    rank: Number;
    name: string;
    amount: Number;
    sparkLine: Array<number>
    iconUrl: string;
    symbol: string;
    change: number;
}