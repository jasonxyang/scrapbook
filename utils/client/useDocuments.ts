// import {
//   documentIdsAtom,
//   documentsByIdAtomFamily,
// } from "@/recoil/documents/atoms";
// import { ScrapbookDocument } from "@/types";
// import { useMemo } from "react";
// import { useRecoilTransaction_UNSTABLE } from "recoil";

// const useDocuments = () => {
//   const createDocument = useRecoilTransaction_UNSTABLE(
//     ({ set }) =>
//       ({ document }: { document: ScrapbookDocument }) => {
//         set(documentIdsAtom, (prevDocumentIds) => {
//           return [...(prevDocumentIds ?? []), document.id];
//         });
//         set(documentsByIdAtomFamily({ documentId: document.id }), document);
//       }
//   );

//   const deleteDocument = useRecoilTransaction_UNSTABLE(
//     ({ set, reset }) =>
//       ({ documentId }: { documentId: string }) => {
//         set(documentIdsAtom, (prevDocumentIds) => {
//           return prevDocumentIds?.filter((id) => id !== documentId) ?? [];
//         });
//         reset(documentsByIdAtomFamily({ documentId }));
//       }
//   );

//   return useMemo(
//     () => ({
//       createDocument,
//       deleteDocument,
//     }),
//     [createDocument, deleteDocument]
//   );
// };

// export default useDocuments;
