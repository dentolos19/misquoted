"use client";

import Link from "next/link";
import { use } from "react";
import { getRandomQuote } from "@/lib/api";

export default function Page() {
  const initialQuoteId = use(getRandomQuote())._id;

  return (
    <main className={"hero is-fullheight"}>
      <div className={"hero-body is-flex is-flex-direction-column is-align-items-center is-justify-content-center"}>
        <div className={"title"}>Misquoted</div>
        <Link className={"button"} href={"/quote/" + initialQuoteId}>
          Start
        </Link>
      </div>
    </main>
  );
}