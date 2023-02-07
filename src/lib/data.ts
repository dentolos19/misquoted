import type { Quote } from "./api";

export function getHistory() {
  const json = localStorage.getItem("history");
  if (!json) return [];
  return JSON.parse(json) as Quote[];
}

export function addHistory(quote: Quote) {
  const json = localStorage.getItem("history");
  if (!json) {
    localStorage.setItem("history", JSON.stringify([quote]));
    return;
  }
  let history = JSON.parse(json) as Quote[];
  history.push(quote);
  if (history.length > 30) {
    history = history.slice(history.length - 30);
  }
  localStorage.setItem("history", JSON.stringify(history));
}