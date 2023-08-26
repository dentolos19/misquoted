"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  const backHandler = () => {
    router.back();
  };

  return (
    <main className={"hero is-fullheight"}>
      <div className={"hero-body is-flex is-flex-direction-column is-align-items-center is-justify-content-center"}>
        <div className={"title"}>404</div>
        <div className={"block"}>The page that you're looking for does not exist.</div>
        <div className={"button"} onClick={backHandler}>
          Back
        </div>
      </div>
    </main>
  );
}