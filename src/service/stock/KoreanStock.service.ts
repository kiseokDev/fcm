import { StockApi } from "../stock.service";
import { Stock } from "./stock.interface";

export class KoreanFinance implements Stock {
  getFundamentalData(): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve({ financeData: "Korean" });
    });
  }
}
