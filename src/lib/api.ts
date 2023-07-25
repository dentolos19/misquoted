export type Author = {
  _id: string;
  bio: string;
  description: string;
  link: string;
  name: string;
  slug: string;
  quoteCount: number;
};

export type Quote = {
  _id: string;
  content: string;
  author: string;
  tags: string[];
  authorSlug: string;
  length: number;
  dateAdded: string;
  dateModified: string;
};

export function getAuthor(slug: string) {
  return fetch(`https://api.quotable.io/authors?slug=${slug}`)
    .then((res) => {
      if (!res.ok) {
        return null;
      }
      return res.json();
    })
    .then((data) => data.results[0] as Author);
}

export function getQuote(id: string) {
  return fetch(`https://api.quotable.io/quotes/${id}`)
    .then((res) => {
      if (!res.ok) {
        return null;
      }
      return res.json();
    })
    .then((data) => data as Quote);
}

export function getRandomQuote() {
  return fetch("https://api.quotable.io/random")
    .then((res) => {
      if (!res.ok) {
        return null;
      }
      return res.json();
    })
    .then((data) => data as Quote);
}

export function getAuthorQuotes(author: Author) {
  return fetch(`https://api.quotable.io/quotes?author=${author.slug}`)
    .then((res) => {
      if (!res.ok) {
        return null;
      }
      return res.json();
    })
    .then((data) => data.results as Quote[]);
}