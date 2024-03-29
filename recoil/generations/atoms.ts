import { ScrapbookGeneration, ScrapbookGenerationProgress } from "@/types";
import { recoilAtom, recoilAtomFamily } from "@/utils/client/recoil";

export const generationIds = recoilAtom<readonly string[] | undefined>(
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
