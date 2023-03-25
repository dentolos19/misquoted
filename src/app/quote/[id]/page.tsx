"use client";

import Link from "next/link";
import { use } from "react";
import { getQuote, getRandomQuote } from "@/lib/api";

export default function Page({ params }: { params: { id: string } }) {
  const quote = use(getQuote(params.id));
  const nextQuoteId = use(getRandomQuote())._id;

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
        <Link className={"button mt-6"} href={"/quote/" + nextQuoteId}>
          Next
        </Link>
      </div>
    </main>
  );
}