import { Style, isStyle } from "@/types";
import { atom } from "recoil";
import { getLocalStorageKey } from "@/utils/client/localStorage";
import { custom, voidable } from "@recoiljs/refine";
import { syncEffect } from "recoil-sync";

const styleAtom = atom<Style | undefined>({
  key: "style",
  default: undefined,
  effects: [
    syncEffect({
      itemKey: getLocalStorageKey("style"),
      refine: voidable(
        custom((value) =>
          value === undefined || isStyle(value) ? value : null
        )
      ),
    }),
  ],
});

export default styleAtom;
