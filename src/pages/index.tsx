import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getRandomQuote } from "@/lib/api";
import type { Quote } from "@/lib/api";

let history: Quote[] = [];

export default function Page() {
  const router = useRouter();

  const [quote, setQuote] = useState<Quote>();

  const generateHandler = async () => {
    const quote = await getRandomQuote();
    history.push(quote);
    localStorage.setItem("history", JSON.stringify(history));
    setQuote(quote);
  };

  const historyHandler = () => {
    router.push("/history");
  };

  const shareHandler = () => {
    router.push("/quote/" + quote?._id);
  };

  useEffect(() => {
    history = JSON.parse(localStorage.getItem("history") || "[]") as Quote[];
    generateHandler();
  }, []);

  return (
    <main
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          textAlign: "center",
        }}
      >
        <div className={"quote"}>
          <Link className={"content"} href={"/quote/" + quote?._id}>
            {quote?.content}
          </Link>
          <br />
          <Link className={"author"} href={"/author/" + quote?.authorSlug}>
            {quote?.author}
          </Link>
        </div>
        <div
          style={{
            display: "flex",
            gap: "4px",
            justifyContent: "center",
          }}
        >
          <button className={"button"} onClick={generateHandler}>
            Generate
          </button>
          <button className={"button"} onClick={historyHandler}>
            History
          </button>
          <button className={"button"} onClick={shareHandler}>
            Share
          </button>
        </div>
      </div>
    </main>
  );
}