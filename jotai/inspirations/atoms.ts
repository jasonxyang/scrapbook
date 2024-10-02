import { ScrapbookInspiration } from "@/types";

import { jotaiAtom, jotaiAtomFamily } from "@/utils/client/jotai";

export const inspirationIdsAtom = jotaiAtom<string[]>("inspirationIds", []);

export const inspirationsByIdAtom = jotaiAtomFamily<
  ScrapbookInspiration | undefined
>("inspirationsById", undefined);
