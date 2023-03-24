import Link from "next/link";
import { use } from "react";
import { getAuthor, getAuthorQuotes } from "@/lib/api";

export default function Page({ params }: { params: { slug: string } }) {
  const author = use(getAuthor(params.slug));
  const quotes = use(getAuthorQuotes(author));
  return (
    <main className={"hero is-fullheight"}>
      <div className={"hero-body is-flex is-flex-direction-column is-align-items-center is-justify-content-center"}>
        <div className={"card"}>
          <div className={"card-header"}>
            <div className={"card-header-title"}>{author?.name}</div>
          </div>
          <div className={"card-content"}>
            <div className={"content"}>
              <div className={"pb-4"}>
                <div className={"tag is-info"}>
                  <span className={"icon-text"}>
                    <span className={"icon"}>
                      <span className={"fa-solid fa-user-tie"}></span>
                    </span>
                    <span>{author.description}</span>
                  </span>
                </div>
                <a className={"tag is-link is-clickable ml-1"} href={author.link}>
                  <span className={"icon-text"}>
                    <span className={"icon"}>
                      <span className={"fa-solid fa-link"}></span>
                    </span>
                    <span>Wikipedia</span>
                  </span>
                </a>
              </div>
              <h5>Biography</h5>
              <p>{author.bio}</p>
              <h5>Quotes</h5>
              <ul>
                {quotes.map((quote) => (
                  <li key={quote._id}>
                    <Link href={"/quote/" + quote._id}>{quote.content}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}