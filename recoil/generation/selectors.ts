import { DefaultValue, selectorFamily } from "recoil";
import generationsAtom from "./generations";
import selectedTemplateAtom from "../template/selectedTemplate";
import { GenerationType } from "@/types";

type SelectedTemplateGenerationSelectorParams = {
  type: GenerationType;
};
export const selectedTemplateGenerationsSelector = selectorFamily({
  key: "selectedTemplateGenerationsSelector",
  get:
    ({ type }: SelectedTemplateGenerationSelectorParams) =>
    ({ get }) => {
      const selectedTemplateId = get(selectedTemplateAtom);
      const generations = get(generationsAtom);
      return selectedTemplateId
        ? generations?.[selectedTemplateId]?.[type]
        : undefined;
    },
  set:
    ({ type }: SelectedTemplateGenerationSelectorParams) =>
    ({ get, set }, newValue) => {
      if (newValue instanceof DefaultValue || newValue === undefined) {
        set(generationsAtom, newValue);
        return;
      }
      const selectedTemplateId = get(selectedTemplateAtom);
      if (!selectedTemplateId) return;
      const prevGenerations = get(generationsAtom);

      set(generationsAtom, {
        ...prevGenerations,
        [selectedTemplateId]: {
          ...prevGenerations?.[selectedTemplateId],
          [type]: newValue,
        },
      });
    },
});

type GenerationSelectorParams = {
  templateId: string;
  sectionIndex: number;
  type: GenerationType;
};
export const generationSelector = selectorFamily({
  key: "generationSelector",
  get:
    ({ templateId, sectionIndex, type }: GenerationSelectorParams) =>
    ({ get }) => {
      const generations = get(generationsAtom);
      return generations?.[templateId]?.[type]?.[sectionIndex];
    },
  set:
    ({ templateId, sectionIndex, type }: GenerationSelectorParams) =>
    ({ get, set }, newValue) => {
      if (newValue instanceof DefaultValue || newValue === undefined) {
        set(generationsAtom, newValue);
        return;
      }
      const prevGenerations = get(generationsAtom);
      set(generationsAtom, {
        ...prevGenerations,
        [templateId]: {
          ...prevGenerations?.[templateId],
          [type]: prevGenerations?.[templateId]?.[type]?.map(
            (sectionGenerations, index) => {
              return index === sectionIndex ? newValue : sectionGenerations;
            }
          ),
        },
      });
    },
});
