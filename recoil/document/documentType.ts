import { DocumentType, isDocumentType } from "@/types";
import { getLocalStorageKey } from "@/utils.ts/client/localStorage";
import { custom, voidable } from "@recoiljs/refine";
import { atom } from "recoil";
import { syncEffect } from "recoil-sync";

const documentTypeAtom = atom<DocumentType | undefined>({
  key: "documentType",
  default: undefined,
  effects: [
    syncEffect({
      itemKey: getLocalStorageKey("documentType"),
      refine: voidable(
        custom((value) => (isDocumentType(value) ? value : null))
      ),
    }),
  ],
});

export default documentTypeAtom;
