import { Coin } from '../models/row-data.model'
export default class MockData {

    static getInitialCoins = () => {
        const parseSparkLine = (sparkLines: Array<string>): Array<number> => {
            return sparkLines.map(sparkLine => parseFloat(sparkLine))
        }
        const coins: Array<Coin> = [{
            rank: 1,
            amount: 10,
            name: "bitcoin",
            sparkLine: parseSparkLine(MockData.getMockSparkLines()),
            coinIconUrl: 'https://cdn.coinranking.com/bOabBYkcX/bitcoin_btc.svg'
        },
        {
            rank: 2,
            amount: 15,
            name: "bitcoin",
            sparkLine: [],
            coinIconUrl: 'https://cdn.coinranking.com/bOabBYkcX/bitcoin_btc.svg'
        }]
        return coins;
    };

    static getMockSparkLines = () => {
        return ["48121.48483135035029351326",
            "47680.53858679600719235244",
            "48363.56523278616068368839",
            "48547.2249512731716192729",
            "48600.68095521068515406288",
            "47867.01860299033202525132",
            "47313.78751502263220988798",
            "47705.20653715832878873714",
            "48135.84226539024826131598",
            "48248.90108849445470098487",
            "48292.63898319552541734948",
            "48327.98116447038348587492",
            "48469.01320208769617189259",
            "49183.96868989059700892347",
            "49109.4865405254377944505",
            "49059.22910241027652704515",
            "49430.5228999390130752474",
            "49659.9610417944210137561",
            "49467.61462382282509885858",
            "49102.70547826240853393093",
            "48924.5702112945445245131",
            "48763.21645728770164001951",
            "48159.55221947218685386965",
            "47662.404264526723439679",
            "47014.14955772720869414904",
            "46783.42960858551741566763",
            "46605.15802439004179893254"]
    }
}


