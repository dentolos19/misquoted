"use client";

import { useRouter } from "next/navigation";
import { getRandomQuote } from "@/lib/api";

export default function Page() {
  const router = useRouter();

  const startHandler = () => {
    getRandomQuote().then((quote) => {
      router.push("/quote/" + quote._id);
    });
  };

  return (
    <main className={"hero is-fullheight"}>
      <div className={"hero-body is-flex is-flex-direction-column is-align-items-center is-justify-content-center"}>
        <div className={"title"}>Misquoted</div>
        <div className={"button"} onClick={startHandler}>
          Start
        </div>
      </div>
    </main>
  );
}