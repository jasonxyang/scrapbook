import { nanoid } from "nanoid";
import { jotaiStore } from "../../utils/client/jotai";
import { ScrapbookInspiration } from "@/types";
import { RESET } from "jotai/utils";
import { inspirationIdsAtom, inspirationsByIdAtom } from "./atoms";
import { readTemplate, updateTemplate } from "../templates/utils";

export const createInspiration = ({
  prevInspirationId,
  content,
  templateId,
  nodeKeys,
}: Pick<ScrapbookInspiration, "content" | "templateId" | "nodeKeys"> & {
  prevInspirationId?: string;
}) => {
  const { set } = jotaiStore();
  const newInspiration: ScrapbookInspiration = {
    id: prevInspirationId ?? nanoid(),
    content,
    templateId,
    nodeKeys,
  };
  set(inspirationIdsAtom, (prev) => [...prev, newInspiration.id]);
  const prevTemplate = readTemplate({ templateId });
  if (!prevTemplate) return;
  updateTemplate({
    templateId,
    updates: {
      inspirationIds: [...prevTemplate.inspirationIds, newInspiration.id],
    },
  });
  set(inspirationsByIdAtom(newInspiration.id), newInspiration);
  return newInspiration.id;
};

export const readInspiration = ({
  inspirationId,
}: {
  inspirationId: string;
}) => {
  const { get } = jotaiStore();
  return get(inspirationsByIdAtom(inspirationId));
};

export const updateInspiration = ({
  inspirationId,
  updates,
}: {
  inspirationId: string;
  updates: Partial<ScrapbookInspiration>;
}) => {
  const { set } = jotaiStore();
  // if there are no node keys in the update, delete the inspiration
  if (updates.nodeKeys !== undefined && !updates.nodeKeys.length) {
    console.log(`updateInspiration: deleting inspiration ${inspirationId}`);
    deleteInspiration({ inspirationId });
    return;
  }
  const prevInspiration = readInspiration({ inspirationId });
  if (!prevInspiration) return;
  set(inspirationsByIdAtom(inspirationId), () => {
    return { ...prevInspiration, ...updates };
  });
};

export const deleteInspiration = ({
  inspirationId,
}: {
  inspirationId: string;
}) => {
  const { get, set } = jotaiStore();
  set(inspirationIdsAtom, (prev) => prev.filter((id) => id !== inspirationId));
  const templateId = get(inspirationsByIdAtom(inspirationId))?.templateId;
  if (templateId) {
    const prevTemplate = readTemplate({ templateId });
    if (!prevTemplate) return;
    updateTemplate({
      templateId,
      updates: {
        inspirationIds: prevTemplate.inspirationIds.filter(
          (id) => id !== inspirationId
        ),
      },
    });
  }
  set(inspirationsByIdAtom(inspirationId), RESET);
};
