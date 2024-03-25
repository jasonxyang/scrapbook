import { DocumentType, isDocumentType } from "@/types";
import { getLocalStorageKey } from "@/utils.ts/client/localStorage";
import { custom } from "@recoiljs/refine";
import { atom } from "recoil";
import { syncEffect } from "recoil-sync";

const documentTypeAtom = atom<DocumentType | undefined>({
  key: "documentType",
  default: undefined,
  //   effects: [
  //     syncEffect({
  //       itemKey: getLocalStorageKey("documentType"),
  //       refine: custom((value) => (isDocumentType(value) ? value : undefined)),
  //     }),
  //   ],
});

export default documentTypeAtom;
