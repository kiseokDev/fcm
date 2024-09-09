import { StockApi } from "@/service/stock.service";
import { KoreanFinance } from "@/service/stock/KoreanStock.service";
import { YahooFinance } from "@/service/stock/yahooNpm.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const stockApi = new StockApi();
  if (params.slug === "America") {
    stockApi.setAlgorithm(new YahooFinance());
  }
  if (params.slug === "Korea") {
    stockApi.setAlgorithm(new KoreanFinance());
  }
  const financeData = await stockApi.getFundamentalData();
  return NextResponse.json(financeData);
}

export const symbols = [
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
