import Link from "next/link";
import { useEffect, useState } from "react";
import { getRandomQuote } from "@/lib/api";
import type { Quote } from "@/lib/api";

export default function Page() {
  const [quote, setQuote] = useState<Quote>();

  const generateQuote = async () => {
    const quote = await getRandomQuote();
    setQuote(quote);
  };

  useEffect(() => {
    generateQuote();
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
      <div
        style={{
          textAlign: "center",
        }}
      >
        <h1>
          {'"'}
          {quote?.content}
          {'"'}
        </h1>
        <p>
          <Link href={"/author/" + quote?.authorSlug}>{quote?.author}</Link>
        </p>
        <button onClick={generateQuote}>Generate</button>
      </div>
    </main>
  );
}