import { ScrapbookTemplate } from "@/types";
import { scrapbookTemplateChecker } from "@/utils/client/checkers";
import {
  getRecoilAtomFamilyLocalStorageKey,
  getRecoilAtomLocalStorageKey,
} from "@/utils/client/localStorage";
import { recoilAtom, recoilAtomFamily } from "@/utils/client/recoil";
import { array, string, voidable } from "@recoiljs/refine";
import { syncEffect } from "recoil-sync";

export const templateIdsAtom = recoilAtom<readonly string[] | undefined>(
  "templateIds",
  {
    effects: [
      syncEffect({
        itemKey: getRecoilAtomLocalStorageKey({
          key: "templateIds",
        }),
        refine: voidable(array(string())),
      }),
    ],
  }
);
export const templatesByIdAtomFamily = recoilAtomFamily<
  ScrapbookTemplate | undefined,
  { templateId: string }
>("templatesById", {
  effects: (param) => [
    syncEffect({
      itemKey: getRecoilAtomFamilyLocalStorageKey({
        key: "templatesById",
        param: param.templateId,
      }),
      refine: voidable(scrapbookTemplateChecker()),
    }),
  ],
});
