import Link from "next/link";
import Router from "next/router";
import { useEffect, useState } from "react";
import { getAuthor, getQuotesByAuthor } from "@/lib/api";
import type { Author, Quote } from "@/lib/api";

export default function Page() {
  const [author, setAuthor] = useState<Author | null>(null);
  const [quotes, setQuotes] = useState<Quote[] | null>(null);

  useEffect(() => {
    const doTask = async () => {
      const { slug } = Router.query as { slug: string };
      const author = await getAuthor(slug);
      const quotes = await getQuotesByAuthor(author);
      setAuthor(author);
      setQuotes(quotes);
    };
    doTask();
  }, []);

  return (
    <main>
      <div>
        <h1>{author?.name}</h1>
        <p>{author?.bio}</p>
      </div>
      <ul>
        {quotes?.map((quote) => (
          <li key={quote._id}>
            <Link href={"/quote/" + quote._id}>{quote.content}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}