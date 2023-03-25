"use client";

import Loading from "./loading";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getRandomQuote } from "@/lib/api";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    getRandomQuote().then((quote) => {
      router.push("/quote/" + quote._id);
    });
  });

  return <Loading />;
}