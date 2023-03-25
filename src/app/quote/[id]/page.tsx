"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";
import { getQuote, getRandomQuote } from "@/lib/api";
import copy from "copy-to-clipboard";

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

  const copyHandler = () => {
    copy("“" + quote.content + "” — " + quote.author);
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
        <div className={"mt-6"}>
          <div className={"button"} onClick={nextHandler}>
            Next
          </div>
          <div className={"button ml-2"} onClick={copyHandler}>
            Copy
          </div>
        </div>
        <div className={"mt-4"}>
          <Link className={"tag is-dark"} href={"https://github.com/dentolos19/Misquoted"}>
            <span className={"icon-text"}>
              <span className={"icon"}>
                <span className={"fa-brands fa-github"}></span>
              </span>
              <span>View source code on GitHub</span>
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}