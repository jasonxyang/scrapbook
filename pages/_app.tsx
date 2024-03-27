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
          const value = localStorage.getItem(getLocalStorageKey(key));
          if (value) return JSON.parse(value);
        }}
        write={({ diff }) => {
          for (const [key, value] of diff) {
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
