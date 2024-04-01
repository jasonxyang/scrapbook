import { ScrapbookGeneration, ScrapbookGenerationProgress } from "@/types";
import { jotaiAtom, recoilAtomFamily } from "@/utils/client/jotai";

export const generationIds = jotaiAtom<readonly string[] | undefined>(
  "generationIds",
  {}
);

export const generationsByIdAtomFamily = recoilAtomFamily<
  ScrapbookGeneration | undefined,
  { generationId: string }
>("generationsById", {});

export const generationProgressesAtomFamily = recoilAtomFamily<
  ScrapbookGenerationProgress | undefined,
  { generationId: string }
>("generationProgressesByGenerationId", {});
