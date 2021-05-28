import { StringMappingType } from "typescript";

export interface RowData {
    coins: Array<Coin>;
}


export interface Coin {
    rank: Number;
    name: string;
    amount: Number;
    sparkLine: Array<number>
    coinIconUrl: string;
}