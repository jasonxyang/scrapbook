import {
  documentIdsAtom,
  documentsByIdAtomFamily,
} from "@/recoil/documents/atoms";
import { documentsSelector } from "@/recoil/documents/selectors";
import { ScrapbookDocument } from "@/types";
import { useMemo } from "react";
import { useRecoilCallback, useRecoilValue } from "recoil";

const useDocuments = () => {
  const documents = useRecoilValue(documentsSelector);

  const addDocument = useRecoilCallback(
    ({ set }) =>
      ({ document }: { document: ScrapbookDocument }) => {
        set(documentIdsAtom, (prevDocumentIds) => {
          return [...(prevDocumentIds ?? []), document.id];
        });
        set(documentsByIdAtomFamily({ documentId: document.id }), document);
      }
  );

  const deleteDocument = useRecoilCallback(
    ({ set, reset }) =>
      ({ documentId }: { documentId: string }) => {
        set(documentIdsAtom, (prevDocumentIds) => {
          return prevDocumentIds?.filter((id) => id !== documentId) ?? [];
        });
        reset(documentsByIdAtomFamily({ documentId }));
      }
  );

  return useMemo(
    () => ({
      documents,
      addDocument,
      deleteDocument,
    }),
    [addDocument, deleteDocument, documents]
  );
};

export default useDocuments;
