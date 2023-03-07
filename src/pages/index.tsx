import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getRandomQuote } from "@/lib/api";
import type { Quote } from "@/lib/api";

export default function Page() {
  const router = useRouter();

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
        <div>
          {quote ? (
            <div className={"card"}>
              <div className={"card-content"}>
                <p
                  className={"title has-text-centered is-clickable"}
                  onClick={() => {
                    router.push("/quote/" + quote._id);
                  }}
                >
                  {"“" + quote.content + "”"}
                </p>
                <p
                  className={"subtitle has-text-centered is-clickable"}
                  onClick={() => {
                    router.push("/author/" + quote.authorSlug);
                  }}
                >
                  {"— " + quote.author}
                </p>
              </div>
            </div>
          ) : (
            <progress className={"progress"}></progress>
          )}
        </div>
        <div className={"pt-6"}>
          <button className={"button"} onClick={generateHandler}>
            Generate
          </button>
        </div>
      </div>
    </main>
  );
}