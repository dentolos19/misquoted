import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getQuote } from "@/lib/api";
import type { Quote } from "@/lib/api";

export default function Page() {
  const router = useRouter();
  const { id } = router.query as { id: string };

  const [quote, setQuote] = useState<Quote | null>(null);

  useEffect(() => {
    const doTask = async () => {
      const quote = await getQuote(id);
      setQuote(quote);
    };
    doTask();
  }, [id]);

  return (
    <main className={"hero is-fullheight"}>
      <div
        className={
          "hero-body is-flex is-flex-direction-column is-align-items-center is-justify-content-center"
        }
      >
        <div className={"columns"}>
          <div className={"column"}></div>
          <div className={"column is-three-fifths"}>
            {quote ? (
              <div className={"card"}>
                <div className={"card-content"}>
                  <p className={"title has-text-centered is-clickable"}>
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
          <div className={"column"}></div>
        </div>
      </div>
    </main>
  );
}