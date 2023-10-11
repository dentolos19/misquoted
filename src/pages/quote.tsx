import CenteredContainer from "@/components/centered-container";
import { Quote, getQuote, getRandomQuote } from "@/lib/api";
import ErrorBoundary from "@/pages/error";
import LoadingBoundary from "@/pages/loading";
import copy from "copy-to-clipboard";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function QuotePage() {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [quote, setQuote] = useState<Quote>();

  const generateQuote = () => {
    setLoading(true);
    getRandomQuote().then((quote) => {
      setQuote(quote);
      navigate(`/quote/${quote._id}`, { replace: false, state: { quote } });
      setLoading(false);
    });
  };

  window.onpopstate = () => {
    if (!quote || !params.id) return;
    if (quote._id === params.id) return;
    setLoading(true);
    getQuote(params.id).then((quote) => {
      setQuote(quote);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (quote) return;
    if (params.id) {
      getQuote(params.id).then((quote) => {
        setQuote(quote);
        setLoading(false);
      });
    } else {
      generateQuote();
    }
  }, []);

  if (loading) return <LoadingBoundary />;
  if (quote === undefined) return <ErrorBoundary />;

  const handleNext = () => {
    generateQuote();
  };

  const handleCopy = () => {
    copy("“" + quote.content + "” — " + quote.author);
  };

  return (
    <CenteredContainer>
      <div className={"card"}>
        <div className={"card-content"}>
          <div className={"title has-text-centered"}>{"“" + quote.content + "”"}</div>
          <a href={`/author/${quote.authorSlug}`}>
            <div className={"subtitle has-text-centered"}>{quote.author}</div>
          </a>
        </div>
      </div>
      <div className={"mt-4"}>
        <button className={"button"} onClick={handleNext}>
          Next
        </button>
        <button className={"button ml-2"} onClick={handleCopy}>
          Copy
        </button>
      </div>
    </CenteredContainer>
  );
}