import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { RecoilSync } from "recoil-sync";
import "../recoil.config";
import { getRecoilAtomLocalStorageKey } from "@/utils/client/localStorage";
import { useEffect, useState } from "react";
import AppLoading from "@/components/AppLoading";
import { ScrapbookRecoilKey } from "@/types";

export default function App({ Component, pageProps }: AppProps) {
  const [isSSR, setIsSSR] = useState(true);
  useEffect(() => {
    setIsSSR(false);
  }, []);
  if (isSSR) return <AppLoading />;

  return (
    <RecoilRoot>
      <RecoilSync
        read={(key) => {
          const value = localStorage.getItem(
            getRecoilAtomLocalStorageKey({ key: key as ScrapbookRecoilKey })
          );
          if (value) return JSON.parse(value);
        }}
        write={({ diff }) => {
          for (const [key, value] of diff) {
            localStorage.setItem(
              getRecoilAtomLocalStorageKey({ key: key as ScrapbookRecoilKey }),
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
