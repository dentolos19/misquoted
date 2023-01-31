import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getAuthor, getQuotesByAuthor } from "@/lib/api";
import type { Author, Quote } from "@/lib/api";

export default function Page() {
  const router = useRouter();
  const { slug } = router.query as { slug: string };

  const [author, setAuthor] = useState<Author | null>(null);
  const [quotes, setQuotes] = useState<Quote[] | null>(null);

  useEffect(() => {
    async function doStuff() {
      const author = await getAuthor(slug);
      const quotes = await getQuotesByAuthor(slug);
      setAuthor(author);
      setQuotes(quotes);
    }
    doStuff();
  }, [slug]);

  if (author === undefined || quotes === undefined) {
    return (
      <main
        style={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>404</h1>
      </main>
    );
  }

  return (
    <main>
      <h1>{author?.name}</h1>
      <p>{author?.bio}</p>
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