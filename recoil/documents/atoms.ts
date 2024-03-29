import { ScrapbookDocument } from "@/types";
import { scrapbookDocumentChecker } from "@/utils/client/checkers";
import {
  getRecoilAtomFamilyLocalStorageKey,
  getRecoilAtomLocalStorageKey,
} from "@/utils/client/localStorage";
import { recoilAtom, recoilAtomFamily } from "@/utils/client/recoil";
import { voidable, string, array } from "@recoiljs/refine";
import { syncEffect } from "recoil-sync";

export const documentIdsAtom = recoilAtom<readonly string[] | undefined>(
  "documentIds",
  {
    effects: [
      syncEffect({
        itemKey: getRecoilAtomLocalStorageKey({
          key: "documentIds",
        }),
        refine: voidable(array(string())),
      }),
    ],
  }
);

export const documentsByIdAtomFamily = recoilAtomFamily<
  ScrapbookDocument | undefined,
  { documentId: string }
>("documentsById", {
  effects: (param) => [
    syncEffect({
      itemKey: getRecoilAtomFamilyLocalStorageKey({
        key: "documentsById",
        param: param.documentId,
      }),
      refine: voidable(scrapbookDocumentChecker()),
    }),
  ],
});

export const currentDocumentIdAtom = recoilAtom<string | undefined>(
  "currentDocumentId",
  {
    effects: [
      syncEffect({
        itemKey: getRecoilAtomLocalStorageKey({
          key: "currentDocumentId",
        }),
        refine: voidable(string()),
      }),
    ],
  }
);
