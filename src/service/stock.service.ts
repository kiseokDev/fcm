import { Stock } from "./stock/stock.interface";

export class StockApi {
  private algorithm!: Stock;
  constructor() {}

  setAlgorithm(algorithm: Stock) {
    this.algorithm = algorithm;
  }
  getFundamentalData(): Promise<any> {
    return this.algorithm.getFundamentalData();
  }
}
