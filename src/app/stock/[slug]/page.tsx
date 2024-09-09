// export default async function Home({ params }: { params: { slug: string } }) {
//   return (
//     <ul>
//       <li>National Name: {params.slug}</li>
//     </ul>
//   );
// }
import Image from "next/image";
import { symbols } from "../../api/stock/[slug]/route";

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 60;

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true; // or false, to 404 on unknown paths

export async function generateStaticParams() {
  const category = ["America", "Korea"];

  return category.map((region) => ({
    id: region,
  }));
}

interface StockData {
  symbol: string;
  pegRatio: number;
  forwardPE: number;
  bookValue: number;
  roe: number;
}

const fetchStockDataList = async (region: string) => {
  const datas = await fetch(`http://localhost:3000/api/stock/${region}`, {
    cache: "no-store",
  });
  return datas.json();
};

export default async function Home({ params }: { params: { slug: string } }) {
  const datas: StockData[] = await fetchStockDataList(params.slug);
  return (
    <>
      <h1>{params.slug}</h1>
      <h1>Dow Jones {symbols.length}</h1>
      <table className="hover:table-fixed">
        <thead>
          <tr>
            <th>no</th>
            <th>symbol</th>
            <th>PegRatio</th>
            <th>forwardPE</th>
            <th>bookValue(PBR)</th>
            <th>ROE</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((data, idx) => (
            <tr key={data.symbol}>
              <th>{idx + 1}</th>
              <th>{data.symbol}</th>
              <th>{data.pegRatio}</th>
              <th>{data.forwardPE}</th>
              <th>{data.bookValue}</th>
              <th>{data.roe}</th>
            </tr>
          ))}
        </tbody>
      </table>
      <span></span>
    </>
  );
}
