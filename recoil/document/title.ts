import { atom } from "recoil";
import { getLocalStorageKey } from "@/utils/client/localStorage";
import { string, voidable } from "@recoiljs/refine";
import { syncEffect } from "recoil-sync";

const titleAtom = atom<string | undefined>({
  key: "title",
  default: "",
  effects: [
    syncEffect({
      itemKey: getLocalStorageKey("title"),
      refine: voidable(string()),
    }),
  ],
});

export default titleAtom;
