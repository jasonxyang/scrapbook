import { nanoid } from "nanoid";
import { jotaiStore } from "../../utils/client/jotai";
import { documentIdsAtom, documentsByIdAtom } from "@/jotai/documents/atoms";
import { ScrapbookDocument } from "@/types";
import { RESET } from "jotai/utils";

export const createDocument = () => {
  const { set } = jotaiStore();
  const newDocument: ScrapbookDocument = {
    id: nanoid(),
    tone: "Casual",
    style: "Narrative",
    title: "",
    type: "Other",
    content: "",
  };
  set(documentIdsAtom, (prev) => [...prev, newDocument.id]);
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
  set(documentsByIdAtom(documentId), () => {
    return {
      ...prevDocument,
      ...updates,
    };
  });
};

export const deleteDocument = ({ documentId }: { documentId: string }) => {
  const { set } = jotaiStore();
  set(documentIdsAtom, (prev) => prev.filter((id) => id !== documentId));
  set(documentsByIdAtom(documentId), RESET);
};
