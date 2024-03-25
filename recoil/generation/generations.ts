import { Generation, isGeneration } from "@/types";
import { getLocalStorageKey } from "@/utils.ts/client/localStorage";
import { custom, voidable } from "@recoiljs/refine";
import { atom } from "recoil";
import { syncEffect } from "recoil-sync";

const generationsAtom = atom<
  | {
      [templateId: string]: Generation[][];
    }
  | undefined
>({
  key: "generations",
  default: {},
  effects: [
    syncEffect({
      itemKey: getLocalStorageKey("generations"),
      refine: voidable(
        custom((value) =>
          Object.values(
            value as { [templateId: string]: Generation[][] }
          ).every((sectionGenerations) =>
            sectionGenerations.every(isGeneration)
          )
            ? (value as { [templateId: string]: Generation[][] })
            : null
        )
      ),
    }),
  ],
});

export default generationsAtom;
