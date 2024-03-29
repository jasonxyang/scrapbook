import { currentTemplateSelector } from "../templates/selectors";
import { recoilReadOnlySelector } from "@/utils/client/recoil";
import { generationsByIdAtomFamily } from "./atoms";
import { ScrapbookGeneration } from "@/types";

export const currentGenerationsSelector = recoilReadOnlySelector<
  ScrapbookGeneration[] | undefined
>("currentGenerationsSelector", {
  get: ({ get }) => {
    const currentTemplate = get(currentTemplateSelector);
    if (!currentTemplate) return;
    return currentTemplate.generationIds
      .map((generationId) => get(generationsByIdAtomFamily({ generationId })))
      .filter(
        (generation) => generation !== undefined
      ) as ScrapbookGeneration[];
  },
});
