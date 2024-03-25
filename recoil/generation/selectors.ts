import { DefaultValue, selector, selectorFamily } from "recoil";
import generationsAtom from "./generations";
import selectedTemplateAtom from "../template/selectedTemplate";

export const selectedTemplateGenerationsSelector = selector({
  key: "selectedTemplateGenerationsSelector",
  get: ({ get }) => {
    const selectedTemplateId = get(selectedTemplateAtom);
    const generations = get(generationsAtom);
    return selectedTemplateId ? generations[selectedTemplateId] : undefined;
  },
  set: ({ get, set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      set(generationsAtom, newValue);
      return;
    }
    const selectedTemplateId = get(selectedTemplateAtom);
    if (!selectedTemplateId || !newValue) return;
    const generations = { ...get(generationsAtom) };
    generations[selectedTemplateId] = newValue;
    set(generationsAtom, generations);
  },
});

type GenerationSelectorParams = {
  templateId: string;
  sectionIndex: number;
};
export const generationSelector = selectorFamily({
  key: "generationSelector",
  get:
    ({ templateId, sectionIndex }: GenerationSelectorParams) =>
    ({ get }) => {
      const generations = get(generationsAtom);
      return generations[templateId][sectionIndex];
    },
  set:
    ({ templateId, sectionIndex }: GenerationSelectorParams) =>
    ({ get, set }, newValue) => {
      if (newValue instanceof DefaultValue) {
        set(generationsAtom, newValue);
        return;
      }
      const generations = { ...get(generationsAtom) };
      generations[templateId][sectionIndex] = newValue;
      set(generationsAtom, generations);
    },
});
