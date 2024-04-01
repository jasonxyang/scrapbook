// import { inspirationIds, inspirationsById } from "@/recoil/inspirations/atoms";
// import { templatesById } from "@/recoil/templates/atoms";
// import { ScrapbookInspiration } from "@/types";
// import { nanoid } from "nanoid";
// import { useCallback, useMemo } from "react";
// import { useRecoilTransaction_UNSTABLE } from "recoil";

// const useInspirations = () => {
//   const _createInspiration = useRecoilTransaction_UNSTABLE(
//     ({ get, set }) =>
//       ({
//         templateId,
//         content,
//         inspirationId,
//       }: {
//         templateId: string;
//         content: string;
//         inspirationId: string;
//       }) => {
//         const newInspiration = {
//           id: inspirationId,
//           templateId,
//           content,
//         } satisfies ScrapbookInspiration;
//         set(
//           inspirationsById({ inspirationId: newInspiration.id }),
//           newInspiration
//         );
//         const prevInspirationIds = get(inspirationIds) ?? [];
//         set(inspirationIds, () => {
//           return [...prevInspirationIds, newInspiration.id];
//         });
//         const prevTemplate = get(templatesById({ templateId }));
//         if (!prevTemplate) return;
//         set(templatesById({ templateId }), () => {
//           return {
//             ...prevTemplate,
//             inspirationIds: [...prevTemplate.inspirationIds, newInspiration.id],
//           };
//         });
//       }
//   );

//   const createInspiration = useCallback(
//     ({
//       templateId,
//       content,
//       inspirationId,
//     }: {
//       templateId: string;
//       content: string;
//       inspirationId?: string;
//     }) => {
//       const newInspirationId = inspirationId ?? nanoid();
//       _createInspiration({
//         templateId,
//         content,
//         inspirationId: newInspirationId,
//       });
//       return newInspirationId;
//     },
//     [_createInspiration]
//   );

//   const updateInspiration = useRecoilTransaction_UNSTABLE(
//     ({ get, set }) =>
//       ({
//         inspirationId,
//         updates,
//       }: {
//         inspirationId: string;
//         updates: Partial<ScrapbookInspiration>;
//       }) => {
//         const prevInspiration = get(inspirationsById({ inspirationId }));
//         if (!prevInspiration) return;
//         set(inspirationsById({ inspirationId }), () => {
//           return {
//             ...prevInspiration,
//             ...updates,
//           };
//         });
//       }
//   );

//   const deleteInspiration = useRecoilTransaction_UNSTABLE(
//     ({ get, set, reset }) =>
//       ({ inspirationId }: { inspirationId: string }) => {
//         const inspiration = get(inspirationsById({ inspirationId }));
//         if (!inspiration) return;
//         const templateId = inspiration.templateId;
//         const prevTemplate = get(templatesById({ templateId }));
//         if (!prevTemplate) return;
//         set(templatesById({ templateId }), () => {
//           return {
//             ...prevTemplate,
//             inspirationIds: prevTemplate.inspirationIds.filter(
//               (id) => id !== inspirationId
//             ),
//           };
//         });
//         const prevInspirationIds = get(inspirationIds) ?? [];
//         set(inspirationIds, () => {
//           return prevInspirationIds.filter((id) => id !== inspirationId);
//         });
//         reset(inspirationsById({ inspirationId }));
//       }
//   );

//   return useMemo(
//     () => ({ createInspiration, updateInspiration, deleteInspiration }),
//     [createInspiration, deleteInspiration, updateInspiration]
//   );
// };

// export default useInspirations;
