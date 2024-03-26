import { Style } from "@/types";
import { atom } from "recoil";
import { getLocalStorageKey } from "@/utils/client/localStorage";
import { voidable } from "@recoiljs/refine";
import { syncEffect } from "recoil-sync";
import { styleChecker } from "@/utils/client/checkers";

const STYLE_ATOM_KEY = "style";
const styleAtom = atom<Style | undefined>({
  key: STYLE_ATOM_KEY,
  default: undefined,
  effects: [
    syncEffect({
      itemKey: getLocalStorageKey(STYLE_ATOM_KEY),
      refine: voidable(styleChecker()),
    }),
  ],
});

export default styleAtom;
