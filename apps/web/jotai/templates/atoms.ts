import { ScrapbookTemplate } from "@/types";
import { jotaiAtom, jotaiAtomFamily } from "@/utils/client/jotai";

export const templateIdsAtom = jotaiAtom<string[]>("templateIds", []);
export const templatesByIdAtom = jotaiAtomFamily<ScrapbookTemplate | undefined>(
  "templatesById",
  undefined
);
