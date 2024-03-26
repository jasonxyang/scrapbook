import { Tone } from "@/types";
import { atom } from "recoil";
import { getLocalStorageKey } from "@/utils/client/localStorage";
import { voidable } from "@recoiljs/refine";
import { syncEffect } from "recoil-sync";
import { toneChecker } from "@/utils/client/checkers";

const TONE_ATOM_KEY = "tone";
const toneAtom = atom<Tone | undefined>({
  key: TONE_ATOM_KEY,
  default: undefined,
  effects: [
    syncEffect({
      itemKey: getLocalStorageKey(TONE_ATOM_KEY),
      refine: voidable(toneChecker()),
    }),
  ],
});

export default toneAtom;
