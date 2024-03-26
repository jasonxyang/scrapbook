import { DefaultValue, selector, selectorFamily } from "recoil";
import selectedTemplateAtom from "./selectedTemplate";
import templatesAtom from "./templates";

export const selectedTemplateSelector = selector({
  key: "selectedTemplateSelector",
  get: ({ get }) => {
    const selectedTemplate = get(selectedTemplateAtom);
    const templates = get(templatesAtom);
    return selectedTemplate ? templates?.[selectedTemplate] : undefined;
  },
});

type TemplateSelectorParams = {
  templateId: string;
};
export const templateSelector = selectorFamily({
  key: "templateSelector",
  get:
    ({ templateId }: TemplateSelectorParams) =>
    ({ get }) => {
      const templates = get(templatesAtom);
      const template = templates?.[templateId];
      return template;
    },
  set:
    ({ templateId }: TemplateSelectorParams) =>
    ({ get, set }, newValue) => {
      if (newValue instanceof DefaultValue || newValue === undefined) {
        set(templatesAtom, newValue);
        return;
      }
      const templates = get(templatesAtom);
      set(templatesAtom, { ...templates, [templateId]: newValue });
    },
});
