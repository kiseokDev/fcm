import Link from "next/link";

export default async function Home() {
  return (
    <>
      <ul>
        <li>
          <Link href={"stock/America"}>America</Link>
        </li>
        <li>
          <Link href={"stock/Korea"}>Korea</Link>
        </li>
      </ul>

      <h1>
        <Link href={"fcm-back"}>FCM-back</Link>
      </h1>
      <h1>
        <Link href={"fcm-foreground"}>FCM-foreground</Link>
      </h1>
    </>
  );
}
