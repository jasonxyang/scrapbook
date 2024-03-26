import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { RecoilSync } from "recoil-sync";
import "../recoil";
import { getLocalStorageKey } from "@/utils/client/localStorage";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [isSSR, setIsSSR] = useState(true);
  useEffect(() => {
    setIsSSR(false);
  }, []);
  if (isSSR) return <div>Loading...</div>;
  return (
    <RecoilRoot>
      <RecoilSync
        read={(key) => {
          console.log("reading item key", key);
          const value = localStorage.getItem(getLocalStorageKey(key));
          if (value) return JSON.parse(value);
        }}
        write={({ diff }) => {
          console.log(diff);
          for (const [key, value] of diff) {
            console.log("writing item key", key, value);
            localStorage.setItem(
              getLocalStorageKey(key),
              JSON.stringify(value)
            );
          }
        }}
      >
        <Component {...pageProps} />
      </RecoilSync>
    </RecoilRoot>
  );
}
