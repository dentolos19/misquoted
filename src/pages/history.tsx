import Link from "next/link";
import { useEffect, useState } from "react";
import { getHistory } from "@/lib/data";
import type { Quote } from "@/lib/api";

export default function Page() {
  const [history, setHistory] = useState<Quote[] | null>(null);

  useEffect(() => {
    const quotes = getHistory().reverse();
    setHistory(quotes);
  }, []);

  return (
    <main>
      <div>
        <h1>History</h1>
        <p>History is limited to 30 quotes.</p>
      </div>
      <ul>
        {history?.map((quote) => (
          <li key={quote._id} className={"quote-history"}>
            <Link className={"content"} href={"/quote/" + quote._id}>
              {quote.content}
            </Link>
            <Link className={"author"} href={"/author/" + quote.authorSlug}>
              — {quote.author}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}