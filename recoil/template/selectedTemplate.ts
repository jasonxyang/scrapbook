import { getLocalStorageKey } from "@/utils.ts/client/localStorage";
import { string } from "@recoiljs/refine";
import { atom } from "recoil";
import { syncEffect } from "recoil-sync";

const selectedTemplateAtom = atom<string>({
  key: "selectedTemplate",
  default: "",
  // effects: [
  //   syncEffect({
  //     itemKey: getLocalStorageKey("style"),
  //     refine: string(),
  //   }),
  // ],
});

export default selectedTemplateAtom;
