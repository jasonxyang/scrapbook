import { Template, isTemplate } from "@/types";
import { getLocalStorageKey } from "@/utils.ts/client/localStorage";
import { custom } from "@recoiljs/refine";
import { atom } from "recoil";
import { syncEffect } from "recoil-sync";

const templatesAtom = atom<{ [id: string]: Template }>({
  key: "templates",
  default: {},
  // effects: [
  //   syncEffect({
  //     itemKey: getLocalStorageKey("generations"),
  //     refine: custom((value) =>
  //       Object.values(value as { [id: string]: Template }).every((template) =>
  //         isTemplate(template)
  //       )
  //         ? (value as { [id: string]: Template })
  //         : {}
  //     ),
  //   }),
  // ],
});

export default templatesAtom;
