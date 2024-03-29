import {
  templateIdsAtom,
  templatesByIdAtomFamily,
} from "@/recoil/templates/atoms";
import { templatesSelector } from "@/recoil/templates/selectors";
import { ScrapbookTemplate } from "@/types";
import { useMemo } from "react";
import { useRecoilCallback, useRecoilValue } from "recoil";

const useTemplates = () => {
  const templates = useRecoilValue(templatesSelector);

  const addTemplate = useRecoilCallback(
    ({ set }) =>
      (template: ScrapbookTemplate) => {
        set(templateIdsAtom, (prevTemplateIds) => {
          return [...(prevTemplateIds ?? []), template.id];
        });
        set(templatesByIdAtomFamily({ templateId: template.id }), template);
      }
  );

  const deleteTemplate = useRecoilCallback(
    ({ set, reset }) =>
      (templateId: string) => {
        set(templateIdsAtom, (prevTemplateIds) => {
          return prevTemplateIds?.filter((id) => id !== templateId) ?? [];
        });
        reset(templatesByIdAtomFamily({ templateId }));
      }
  );

  return useMemo(
    () => ({
      templates,
      addTemplate,
      deleteTemplate,
    }),
    [addTemplate, deleteTemplate, templates]
  );
};

export default useTemplates;
