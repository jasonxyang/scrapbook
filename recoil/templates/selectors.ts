import { ScrapbookTemplate } from "@/types";
import { currentDocumentSelector } from "../documents/selectors";
import { templateIdsAtom, templatesByIdAtomFamily } from "./atoms";
import { recoilReadOnlySelector } from "@/utils/client/recoil";

export const currentTemplateSelector = recoilReadOnlySelector(
  "currentTemplateSelector",
  {
    get: ({ get }) => {
      const currentDocument = get(currentDocumentSelector);
      const currentTemplateId = currentDocument?.templateId;
      if (!currentTemplateId) return;
      return get(templatesByIdAtomFamily({ templateId: currentTemplateId }));
    },
  }
);

export const templatesSelector = recoilReadOnlySelector<ScrapbookTemplate[]>(
  "templatesSelector",
  {
    get: ({ get }) => {
      const templateIds = get(templateIdsAtom);
      if (!templateIds) return [];
      return templateIds
        .map((templateId) => get(templatesByIdAtomFamily({ templateId })))
        .filter((template) => template !== undefined) as ScrapbookTemplate[];
    },
  }
);
