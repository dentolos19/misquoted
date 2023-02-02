import Link from "next/link";
import { useEffect, useState } from "react";
import type { Quote } from "@/lib/api";

export default function Page() {
  const [history, setHistory] = useState<Quote[] | null>();

  useEffect(() => {
    const history = JSON.parse(
      localStorage.getItem("history") || "[]"
    ) as Quote[];
    setHistory(history.reverse());
  }, []);

  return (
    <main>
      <h1>History</h1>
      <ul>
        {history?.map((quote) => (
          <li key={quote._id}>
            <Link href={"/quote/" + quote._id}>{quote.content}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}