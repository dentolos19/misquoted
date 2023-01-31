import { getRandomQuote } from "@/lib/api";
import { useState } from "react";

export default function Page() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  const generateQuote = async () => {
    const quote = await getRandomQuote();
    setQuote(quote.content);
    setAuthor(quote.author);
  };

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
        <h1>
          {'"'}
          {quote}
          {'"'}
        </h1>
        <p>{author}</p>
        <button onClick={generateQuote}>Generate</button>
      </div>
    </main>
  );
}