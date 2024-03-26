import { DocumentType } from "@/types";
import { documentTypeChecker } from "@/utils/client/checkers";
import { getLocalStorageKey } from "@/utils/client/localStorage";
import { voidable } from "@recoiljs/refine";
import { atom } from "recoil";
import { syncEffect } from "recoil-sync";

const documentTypeAtom = atom<DocumentType | undefined>({
  key: "documentType",
  default: undefined,
  effects: [
    syncEffect({
      itemKey: getLocalStorageKey("documentType"),
      refine: voidable(documentTypeChecker()),
    }),
  ],
});

export default documentTypeAtom;
