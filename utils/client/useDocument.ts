// import { documentsByIdAtomFamily } from "@/recoil/documents/atoms";
// import {
//   ScrapbookDocumentStyle,
//   ScrapbookDocumentTone,
//   ScrapbookDocumentType,
// } from "@/types";
// import { useCallback, useMemo } from "react";
// import { useRecoilState } from "recoil";

// type UseDocumentParams = { documentId: string };
// const useDocument = ({ documentId }: UseDocumentParams) => {
//   const [document, setDocument] = useRecoilState(
//     documentsByIdAtomFamily({ documentId })
//   );

//   const setDocumentTitle = useCallback(
//     (title: string) => {
//       setDocument((prevDocument) => {
//         if (!prevDocument) return;
//         return {
//           ...prevDocument,
//           title,
//         };
//       });
//     },
//     [setDocument]
//   );

//   const setDocumentTone = useCallback(
//     (tone: ScrapbookDocumentTone) => {
//       setDocument((prevDocument) => {
//         if (!prevDocument) return;
//         return {
//           ...prevDocument,
//           tone,
//         };
//       });
//     },
//     [setDocument]
//   );

//   const setDocumentStyle = useCallback(
//     (style: ScrapbookDocumentStyle) => {
//       setDocument((prevDocument) => {
//         if (!prevDocument) return;
//         return {
//           ...prevDocument,
//           style,
//         };
//       });
//     },
//     [setDocument]
//   );

//   const setDocumentType = useCallback(
//     (type: ScrapbookDocumentType) => {
//       setDocument((prevDocument) => {
//         if (!prevDocument) return;
//         return {
//           ...prevDocument,
//           type,
//         };
//       });
//     },
//     [setDocument]
//   );

//   const setDocumentContent = useCallback(
//     (content: string) => {
//       setDocument((prevDocument) => {
//         if (!prevDocument) return;
//         return {
//           ...prevDocument,
//           content,
//         };
//       });
//     },
//     [setDocument]
//   );

//   return useMemo(
//     () => ({
//       document,
//       setDocument,
//       documentTitle: document?.title,
//       documentStyle: document?.style,
//       documentTone: document?.tone,
//       documentType: document?.type,
//       documentContent: document?.content,
//       setDocumentTitle,
//       setDocumentTone,
//       setDocumentStyle,
//       setDocumentType,
//       setDocumentContent,
//     }),
//     [
//       document,
//       setDocument,
//       setDocumentContent,
//       setDocumentStyle,
//       setDocumentTitle,
//       setDocumentTone,
//       setDocumentType,
//     ]
//   );
// };

// export default useDocument;
