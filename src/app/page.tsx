"use client";

import Loading from "./loading";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getRandomQuote } from "@/lib/api";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    getRandomQuote().then((quote) => {
      router.push("/quote/" + quote._id);
    });
  }, []);

  return <Loading />;
}