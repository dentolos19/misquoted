"use client";

import Link from "next/link";
import { use } from "react";
import { useRouter } from "next/navigation";
import { getQuote, getRandomQuote } from "@/lib/api";

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();

  const nextHandler = async () => {
    const quote = await getRandomQuote();
    router.push("/quote/" + quote._id);
  };

  const quote = use(getQuote(params.id));

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
          <span className={"button"} onClick={nextHandler}>
            Next
          </span>
        </div>
      </div>
    </main>
  );
}