import { getLocalStorageKey } from "@/utils/client/localStorage";
import { string, voidable } from "@recoiljs/refine";
import { atom } from "recoil";
import { syncEffect } from "recoil-sync";

const SELECTED_TEMPLATE_ATOM_KEY = "selectedTemplate";
const selectedTemplateAtom = atom<string | undefined>({
  key: SELECTED_TEMPLATE_ATOM_KEY,
  default: undefined,
  effects: [
    syncEffect({
      itemKey: getLocalStorageKey(SELECTED_TEMPLATE_ATOM_KEY),
      refine: voidable(string()),
    }),
  ],
});

export default selectedTemplateAtom;
