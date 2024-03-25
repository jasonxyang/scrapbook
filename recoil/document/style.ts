import { Style, isStyle } from "@/types";
import { atom } from "recoil";
import { getLocalStorageKey } from "@/utils.ts/client/localStorage";
import { custom, nullable } from "@recoiljs/refine";
import { syncEffect } from "recoil-sync";

const styleAtom = atom<Style | undefined>({
  key: "style",
  default: undefined,
  //   effects: [
  //     syncEffect({
  //       itemKey: getLocalStorageKey("style"),
  //       refine: nullable(
  //         custom<Style>((value) => (isStyle(value) ? value : null))
  //       ),
  //     }),
  //   ],
});

export default styleAtom;
