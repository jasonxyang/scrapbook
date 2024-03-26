import { Template } from "@/types";
import { templateChecker } from "@/utils/client/checkers";
import { getLocalStorageKey } from "@/utils/client/localStorage";
import { custom, voidable } from "@recoiljs/refine";
import { atom } from "recoil";
import { syncEffect } from "recoil-sync";

const TEMPLATES_ATOM_KEY = "templates";
const templatesAtom = atom<{ [id: string]: Template } | undefined>({
  key: TEMPLATES_ATOM_KEY,
  default: undefined,
  effects: [
    syncEffect({
      itemKey: getLocalStorageKey(TEMPLATES_ATOM_KEY),
      refine: voidable(
        custom((value) =>
          value === undefined ||
          Object.values(value as { [id: string]: Template }).every(
            (template) => templateChecker()(template).type === "success"
          )
            ? (value as { [id: string]: Template })
            : null
        )
      ),
    }),
  ],
});

export default templatesAtom;
