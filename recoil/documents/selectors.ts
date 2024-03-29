import { recoilReadOnlySelector } from "@/utils/client/recoil";
import {
  documentsByIdAtomFamily,
  currentDocumentIdAtom,
  documentIdsAtom,
} from "./atoms";
import { ScrapbookDocument } from "@/types";

export const currentDocumentSelector = recoilReadOnlySelector<
  ScrapbookDocument | undefined
>("currentDocumentSelector", {
  get: ({ get }) => {
    const curentDocumentId = get(currentDocumentIdAtom);
    if (!curentDocumentId) return;
    return get(documentsByIdAtomFamily({ documentId: curentDocumentId }));
  },
});

export const documentsSelector = recoilReadOnlySelector<ScrapbookDocument[]>(
  "documentsSelector",
  {
    get: ({ get }) => {
      const documentIds = get(documentIdsAtom);
      if (!documentIds) return [];
      return documentIds
        .map((documentId) => get(documentsByIdAtomFamily({ documentId })))
        .filter((document) => document !== undefined) as ScrapbookDocument[];
    },
  }
);
