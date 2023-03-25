"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { use } from "react";
import { getQuote, getRandomQuote } from "@/lib/api";

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();

  const quote = use(getQuote(params.id));

  const nextHandler = () => {
    getRandomQuote().then((quote) => {
      router.push("/quote/" + quote._id);
    });
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