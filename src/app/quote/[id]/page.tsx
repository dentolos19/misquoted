"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";
import { getQuote, getRandomQuote } from "@/lib/api";

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();

  const quote = use(getQuote(params.id));

  useEffect(() => {
    getRandomQuote().then((quote) => {
      localStorage.setItem("nextQuoteId", quote._id);
    });
  }, []);

  const nextHandler = () => {
    const nextQuoteId = localStorage.getItem("nextQuoteId");
    if (nextQuoteId) {
      router.push("/quote/" + nextQuoteId);
    } else {
      getRandomQuote().then((quote) => {
        router.push("/quote/" + quote._id);
      });
    }
  };

  return (
    <main className={"hero is-fullheight"}>
      <div className={"hero-body is-flex is-flex-direction-column is-align-items-center is-justify-content-center"}>
        <div className={"card"}>
          <div className={"card-content"}>
            <div className={"title has-text-centered"}>{"“" + quote.content + "”"}</div>
            <div className={"subtitle has-text-centered"}>
              <Link className={"has-text-grey"} href={"/author/" + quote.authorSlug}>
                {"— " + quote.author}
              </Link>
            </div>
          </div>
        </div>
        <div className={"button mt-6"} onClick={nextHandler}>
          Next
        </div>
      </div>
    </main>
  );
}