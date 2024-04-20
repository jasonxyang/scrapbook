import { nanoid } from "nanoid";
import { jotaiStore } from "../../utils/client/jotai";
import { templateIdsAtom, templatesByIdAtom } from "@/jotai/templates/atoms";
import { ScrapbookTemplate } from "@/types";
import { RESET } from "jotai/utils";
import { deleteInspiration } from "../inspirations/utils";

export const createTemplate = () => {
  const { get, set } = jotaiStore();
  const newTemplate: ScrapbookTemplate = {
    id: nanoid(),
    name: "",
    description: "",
    content: "",
    inspirationIds: [],
    generationIds: [],
  };
  const prevTemplateIds = get(templateIdsAtom);
  set(
    templateIdsAtom,
    Array.from(new Set([...prevTemplateIds, newTemplate.id]))
  );
  set(templatesByIdAtom(newTemplate.id), newTemplate);
  return newTemplate.id;
};

export const readTemplate = ({ templateId }: { templateId: string }) => {
  const { get } = jotaiStore();
  return get(templatesByIdAtom(templateId));
};

export const updateTemplate = ({
  templateId,
  updates,
}: {
  templateId: string;
  updates: Partial<ScrapbookTemplate>;
}) => {
  const { set } = jotaiStore();
  const prevTemplate = readTemplate({ templateId });
  if (!prevTemplate) return;
  set(templatesByIdAtom(templateId), {
    ...prevTemplate,
    ...updates,
  });
};

export const deleteTemplate = ({ templateId }: { templateId: string }) => {
  const { get, set } = jotaiStore();
  const prevTemplateIds = get(templateIdsAtom);
  set(
    templateIdsAtom,
    prevTemplateIds.filter((id) => id !== templateId)
  );
  get(templatesByIdAtom(templateId))?.inspirationIds.forEach(
    (inspirationId) => {
      deleteInspiration({ inspirationId });
    }
  );
  set(templatesByIdAtom(templateId), RESET);
};
