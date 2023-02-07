import Link from "next/link";
import Router from "next/router";
import { useEffect, useState } from "react";
import { getRandomQuote } from "@/lib/api";
import { addHistory } from "@/lib/data";
import type { Quote } from "@/lib/api";

export default function Page() {
  const [quote, setQuote] = useState<Quote | null>(null);

  const generateHandler = async () => {
    const quote = await getRandomQuote();
    addHistory(quote);
    setQuote(quote);
  };
  const historyHandler = async () => {
    Router.push("/history");
  };

  useEffect(() => {
    generateHandler();
  }, []);

  return (
    <main
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <div className={"quote"}>
          <Link className={"content"} href={"/quote/" + quote?._id}>
            {quote?.content}
          </Link>
          <Link className={"author"} href={"/author/" + quote?.authorSlug}>
            {quote?.author}
          </Link>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "16px",
            justifyContent: "center",
            gap: "4px",
          }}
        >
          <button onClick={generateHandler}>Generate</button>
          <button onClick={historyHandler}>History</button>
        </div>
      </div>
    </main>
  );
}