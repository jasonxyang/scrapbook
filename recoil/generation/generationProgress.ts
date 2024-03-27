import { GenerationProgress } from "@/types";
import { atom } from "recoil";

const generationProgressAtom = atom<
  | {
      [generationId: string]: GenerationProgress;
    }
  | undefined
>({
  key: "generationProgress",
  default: {},
});

export default generationProgressAtom;
