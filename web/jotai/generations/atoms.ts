import { ScrapbookGeneration, ScrapbookGenerationProgress } from "@/types";
import { jotaiAtom, jotaiAtomFamily } from "@/utils/client/jotai";

export const generationIdsAtom = jotaiAtom<string[]>("generationIds", []);

export const generationsByIdAtom = jotaiAtomFamily<
  ScrapbookGeneration | undefined
>("generationsById", undefined);

export const generationProgressesByGenerationIdAtom = jotaiAtomFamily<
  ScrapbookGenerationProgress | undefined
>("generationProgressesByGenerationId", undefined);
