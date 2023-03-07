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
    const doTask = async () => {
      const author = await getAuthor(slug);
      const quotes = await getQuotesByAuthor(author);
      setAuthor(author);
      setQuotes(quotes);
    };
    doTask();
  }, [slug]);

  return (
    <main className={"hero is-fullheight"}>
      <div
        className={
          "hero-body is-flex is-flex-direction-column is-align-items-center is-justify-content-center"
        }
      >
        {author && quotes ? (
          <div className={"card"}>
            <div className={"card-header"}>
              <div className={"card-header-title"}>{author?.name}</div>
            </div>
            <div className={"card-content"}>
              <div className={"content"}>
                <div className={"pb-2"}>
                  <div className={"tag is-info"}>
                    <span className={"icon-text"}>
                      <span className={"icon"}>
                        <span className={"fa-solid fa-user-tie"}></span>
                      </span>
                      <span>{author.description}</span>
                    </span>
                  </div>
                  <div
                    className={"tag is-link is-clickable ml-1"}
                    onClick={() => {
                      router.push(author.link);
                    }}
                  >
                    <span className={"icon-text"}>
                      <span className={"icon"}>
                        <span className={"fa-solid fa-link"}></span>
                      </span>
                      <span>Wikipedia</span>
                    </span>
                  </div>
                </div>
                <h5>Biography</h5>
                <p>{author.bio}</p>
                <h5>Quotes</h5>
                <ul>
                  {quotes.map((quote) => (
                    <li key={quote._id}>
                      <Link href={"/quote/" + quote._id}>{quote.content}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <progress className={"progress"}></progress>
        )}
      </div>
    </main>
  );
}