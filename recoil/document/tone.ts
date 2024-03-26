import { Tone, isTone } from "@/types";
import { atom } from "recoil";
import { getLocalStorageKey } from "@/utils/client/localStorage";
import { custom, voidable } from "@recoiljs/refine";
import { syncEffect } from "recoil-sync";

const toneAtom = atom<Tone | undefined>({
  key: "tone",
  default: undefined,
  // effects: [
  //   syncEffect({
  //     itemKey: getLocalStorageKey("tone"),
  //     refine: voidable(
  //       custom((value) => (value === undefined || isTone(value) ? value : null))
  //     ),
  //   }),
  // ],
});

export default toneAtom;
