import Link from "next/link";
import Router from "next/router";
import { useEffect, useState } from "react";
import { getQuote } from "@/lib/api";
import type { Quote } from "@/lib/api";

export default function Page() {
  const [quote, setQuote] = useState<Quote | null>(null);

  useEffect(() => {
    const doTask = async () => {
      const { id } = Router.query as { id: string };
      const quote = await getQuote(id);
      setQuote(quote);
    };
    doTask();
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
      <div className={"quote"}>
        <div className={"content"}>{quote?.content}</div>
        <Link className={"author"} href={"/author/" + quote?.authorSlug}>
          {quote?.author}
        </Link>
      </div>
    </main>
  );
}