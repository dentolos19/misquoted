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

export async function getRandomQuote() {
  return await fetch("https://api.quotable.io/random")
    .then((res) => res.json())
    .then((data) => data as Quote);
}