import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { RecoilSync } from "recoil-sync";
import "../recoil";
import { getLocalStorageKey } from "@/utils.ts/client/localStorage";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <RecoilSync
        read={(itemKey) => {
          if (typeof window === "undefined") return;
          const value = localStorage.getItem(getLocalStorageKey(itemKey));
          if (value) return JSON.parse(value);
        }}
        write={({ diff }) => {
          if (typeof window === "undefined") return;
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
