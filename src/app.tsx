import "@/app.scss";
import AuthorPage from "@/pages/author";
import ErrorBoundary from "@/pages/error";
import QuotePage from "@/pages/quote";
import React from "react";
import ReactDOM from "react-dom/client";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={"/"} errorElement={<ErrorBoundary />}>
      <Route element={<AuthorPage />} path={"/author/:id"} />
      <Route element={<QuotePage />} index />
      <Route element={<QuotePage />} path={"/quote"} />
      <Route element={<QuotePage />} path={"/quote/:id"} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);