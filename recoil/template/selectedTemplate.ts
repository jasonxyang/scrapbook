import { getLocalStorageKey } from "@/utils/client/localStorage";
import { string, voidable } from "@recoiljs/refine";
import { atom } from "recoil";
import { syncEffect } from "recoil-sync";

const selectedTemplateAtom = atom<string | undefined>({
  key: "selectedTemplate",
  default: undefined,
  effects: [
    syncEffect({
      itemKey: getLocalStorageKey("style"),
      refine: voidable(string()),
    }),
  ],
});

export default selectedTemplateAtom;
