import { nanoid } from "nanoid";
import { jotaiStore } from "../../utils/client/jotai";
import { documentIdsAtom, documentsByIdAtom } from "@/jotai/documents/atoms";
import { ScrapbookDocument } from "@/types";
import { RESET } from "jotai/utils";
import { deleteGeneration } from "../generations/utils";

export const createDocument = () => {
  const { get, set } = jotaiStore();
  const newDocument: ScrapbookDocument = {
    id: nanoid(),
    tone: "Casual",
    style: "Narrative",
    title: "",
    type: "Other",
    content: "",
    generationIds: [],
  };
  const prevDocumentIds = get(documentIdsAtom);
  set(
    documentIdsAtom,
    Array.from(new Set([...prevDocumentIds, newDocument.id]))
  );
  set(documentsByIdAtom(newDocument.id), newDocument);
  return newDocument.id;
};

export const readDocument = ({ documentId }: { documentId: string }) => {
  const { get } = jotaiStore();
  return get(documentsByIdAtom(documentId));
};

export const updateDocument = ({
  documentId,
  updates,
}: {
  documentId: string;
  updates: Partial<ScrapbookDocument>;
}) => {
  const { set } = jotaiStore();
  const prevDocument = readDocument({ documentId });
  if (!prevDocument) return;
  set(documentsByIdAtom(documentId), {
    ...prevDocument,
    ...updates,
  });
};

export const deleteDocument = ({ documentId }: { documentId: string }) => {
  const { get, set } = jotaiStore();
  const prevDocument = get(documentsByIdAtom(documentId));
  if (!prevDocument) return;
  const prevGenerationIds = prevDocument.generationIds;
  prevGenerationIds.forEach((generationId) => {
    deleteGeneration({ generationId });
  });
  const prevDocumentIds = get(documentIdsAtom);
  set(
    documentIdsAtom,
    prevDocumentIds.filter((id) => id !== documentId)
  );
  set(documentsByIdAtom(documentId), RESET);
};
