import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getAuthor, getQuotesByAuthor } from "@/lib/api";
import type { Author, Quote } from "@/lib/api";

export default function Page() {
  const router = useRouter();
  const { slug } = router.query;

  const [author, setAuthor] = useState<Author>();
  const [quotes, setQuotes] = useState<Quote[]>();

  useEffect(() => {
    async function doStuff() {
      const author = await getAuthor(slug as string);
      const quotes = await getQuotesByAuthor(slug as string);
      setAuthor(author);
      setQuotes(quotes);
    }
    doStuff();
  });

  return (
    <main>
      <h1>{author?.name}</h1>
      <p>{author?.bio}</p>
      <ul>
        {quotes?.map((quote) => (
          <li key={quote._id}>
            <p>{quote.content}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}