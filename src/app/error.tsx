"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <main className={"hero is-fullheight"}>
      <div className={"hero-body is-flex is-flex-direction-column is-align-items-center is-justify-content-center"}>
        <div className={"title"}>An unexcepted error had occurred!</div>
        <div className={"block"}>{error.message}</div>
        <div className={"button"} onClick={reset}>
          Refresh
        </div>
      </div>
    </main>
  );
}