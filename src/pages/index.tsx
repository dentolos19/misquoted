import Router from "next/router";
import { useEffect, useState } from "react";
import { getRandomQuote } from "@/lib/api";
import type { Quote } from "@/lib/api";

export default function Page() {
  const [quote, setQuote] = useState<Quote | null>(null);

  const generateHandler = async () => {
    setQuote(null);
    const quote = await getRandomQuote();
    setQuote(quote);
  };

  useEffect(() => {
    generateHandler();
  }, []);

  return (
    <main className={"hero is-fullheight"}>
      <div
        className={
          "hero-body is-flex is-flex-direction-column is-align-items-center is-justify-content-center"
        }
      >
        {quote ? (
          <div className={"card"}>
            <div className={"card-content"}>
              <p
                className={"title is-clickable"}
                onClick={() => {
                  Router.push("/quote/" + quote._id);
                }}
              >
                {"“" + quote.content + "”"}
              </p>
              <p
                className={"subtitle is-clickable"}
                onClick={() => {
                  Router.push("/author/" + quote.authorSlug);
                }}
              >
                {"— " + quote.author}
              </p>
            </div>
          </div>
        ) : (
          <progress className={"progress"}></progress>
        )}
        <div className={"pt-6"}>
          <button className={"button"} onClick={generateHandler}>
            Generate
          </button>
        </div>
      </div>
    </main>
  );
}