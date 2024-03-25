import { Template, isTemplate } from "@/types";
import { getLocalStorageKey } from "@/utils.ts/client/localStorage";
import { custom, voidable } from "@recoiljs/refine";
import { atom } from "recoil";
import { syncEffect } from "recoil-sync";

const templatesAtom = atom<{ [id: string]: Template } | undefined>({
  key: "templates",
  default: undefined,
  effects: [
    syncEffect({
      itemKey: getLocalStorageKey("generations"),
      refine: voidable(
        custom((value) =>
          Object.values(value as { [id: string]: Template }).every((template) =>
            isTemplate(template)
          )
            ? (value as { [id: string]: Template })
            : null
        )
      ),
    }),
  ],
});

export default templatesAtom;
