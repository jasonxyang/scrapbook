import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "../recoil.config";
import { useEffect, useState } from "react";
import AppLoading from "@/components/AppLoading";
import Header from "@/components/Header";

export default function App({ Component, pageProps }: AppProps) {
  const [isSSR, setIsSSR] = useState(true);
  useEffect(() => {
    setIsSSR(false);
  }, []);
  if (isSSR) return <AppLoading />;

  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}
