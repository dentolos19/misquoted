import CenteredContainer from "@/components/centered-container";
import { Author, Quote, getAuthor, getAuthorQuotes } from "@/lib/api";
import ErrorBoundary from "@/pages/error";
import LoadingBoundary from "@/pages/loading";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function AuthorPage() {
  const params = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [author, setAuthor] = useState<Author>();
  const [quotes, setQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    if (!params.id) return;
    getAuthor(params.id).then((author) => {
      setAuthor(author);
      getAuthorQuotes(author).then((quotes) => {
        setQuotes(quotes);
        setLoading(false);
      });
    });
  }, []);

  if (loading) return <LoadingBoundary />;
  if (!author || !(quotes.length > 0)) return <ErrorBoundary />;

  return (
    <CenteredContainer>
      <div className={"card"}>
        <div className={"card-header"}>
          <div className={"card-header-title"}>{author.name}</div>
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
                  <Link to={"/quote/" + quote._id}>{quote.content}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </CenteredContainer>
  );
}