import yahooFinance from "yahoo-finance2";
import { Stock } from "./stock.interface";

interface YahhoFinanceData {
  symbol: string;
  pegRatio: number;
}

export class YahooFinance implements Stock {
  constructor() {}
  async getFundamentalData(): Promise<any> {
    const symbolFundementalData = await Promise.all(
      symbols.map(async (symbol) => {
        const data = await yahooFinance.quoteSummary(symbol, {
          modules: ["defaultKeyStatistics"],
        });

        const sharesHolersEquity =
          (data?.defaultKeyStatistics?.bookValue ?? 0) *
          (data?.defaultKeyStatistics?.sharesOutstanding ?? 0);
        const roe =
          data?.defaultKeyStatistics?.netIncomeToCommon ??
          0 / sharesHolersEquity;
        const formattedRoe = (roe / 1000000000).toFixed(1);
        console.log(Number(formattedRoe));
        return { ...data.defaultKeyStatistics, symbol, roe: formattedRoe };
      })
    );
    const sortByPbr = symbolFundementalData.sort((a, b) => {
      if (a.pegRatio && b.pegRatio && a.pegRatio < b.pegRatio) {
        return -1;
      }
      if (a.pegRatio && b.pegRatio && a.pegRatio > b.pegRatio) {
        return 1;
      }
      return 0;
    });

    return sortByPbr;
  }
  async sortBypegRatio(symbolFundementalData: any) {
    return symbolFundementalData.sort(
      (a: YahhoFinanceData, b: YahhoFinanceData) => {
        if (a.pegRatio && b.pegRatio && a.pegRatio < b.pegRatio) {
          return -1;
        }
        if (a.pegRatio && b.pegRatio && a.pegRatio > b.pegRatio) {
          return 1;
        }
        return 0;
      }
    );
  }
}

const symbols = [
  "MMM",
  "AXP",
  "AMGN",
  "AAPL",
  "BA",
  "CAT",
  "CVX",
  "CSCO",
  "KO",
  "DOW",
  "GS",
  "HD",
  "HON",
  "IBM",
  "INTC",
  "JNJ",
  "JPM",
  "MCD",
  "MRK",
  "MSFT",
  "NKE",
  "PG",
  "CRM",
  "TRV",
  "UNH",
  "VZ",
  "V",
  "WBA",
  "WMT",
  "DIS",
];
