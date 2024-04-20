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
  const { get, set } = jotaiStore();
  const newInspiration: ScrapbookInspiration = {
    id: prevInspirationId ?? nanoid(),
    content,
    templateId,
    nodeKeys,
  };
  const prevTemplate = readTemplate({ templateId });
  if (!prevTemplate) return;
  updateTemplate({
    templateId,
    updates: {
      inspirationIds: Array.from(
        new Set([...prevTemplate.inspirationIds, newInspiration.id])
      ),
    },
  });
  set(inspirationsByIdAtom(newInspiration.id), newInspiration);
  const prevInspirations = get(inspirationIdsAtom);
  set(
    inspirationIdsAtom,
    Array.from(new Set([...prevInspirations, newInspiration.id]))
  );
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
    deleteInspiration({ inspirationId });
    return;
  }
  const prevInspiration = readInspiration({ inspirationId });
  if (!prevInspiration) return;
  set(inspirationsByIdAtom(inspirationId), { ...prevInspiration, ...updates });
};

export const deleteInspiration = ({
  inspirationId,
}: {
  inspirationId: string;
}) => {
  const { get, set } = jotaiStore();

  const prevInspiration = get(inspirationsByIdAtom(inspirationId));
  if (!prevInspiration) return;

  const prevTemplate = readTemplate({ templateId: prevInspiration.templateId });
  if (!prevTemplate) return;

  updateTemplate({
    templateId: prevInspiration.templateId,
    updates: {
      inspirationIds: prevTemplate.inspirationIds.filter(
        (id) => id !== inspirationId
      ),
    },
  });
  set(inspirationsByIdAtom(inspirationId), RESET);
  const prevInspirationIds = get(inspirationIdsAtom);
  set(
    inspirationIdsAtom,
    prevInspirationIds.filter((id) => id !== inspirationId)
  );
};

export const getInspirationContent = ({
  inspirationId,
}: {
  inspirationId: string;
}) => {
  const inspiration = readInspiration({ inspirationId });
  if (!inspiration) return "";
  return inspiration.content;
};
