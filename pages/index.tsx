import { useScrapbookRouter } from "@/utils/client/useScrapbookRouter";
import React from "react";

export default function Home() {
  const router = useScrapbookRouter();
  return (
    <>
      <div onClick={() => router.push("/templates")}>Templates</div>
      <div onClick={() => router.push("/documents")}>Documents</div>
    </>
  );
}
