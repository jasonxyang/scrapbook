import { atom } from "recoil";
import { getLocalStorageKey } from "@/utils/client/localStorage";
import { string, voidable } from "@recoiljs/refine";
import { syncEffect } from "recoil-sync";

const TITLE_ATOM_KEY = "title";
const titleAtom = atom<string | undefined>({
  key: TITLE_ATOM_KEY,
  default: "",
  effects: [
    syncEffect({
      itemKey: getLocalStorageKey(TITLE_ATOM_KEY),
      refine: voidable(string()),
    }),
  ],
});

export default titleAtom;
