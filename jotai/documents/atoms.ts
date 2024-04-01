import { ScrapbookDocument } from "@/types";

import { jotaiAtom, jotaiAtomFamily } from "@/utils/client/jotai";

export const documentIdsAtom = jotaiAtom<string[]>("documentIds", []);

export const documentsByIdAtomFamily = jotaiAtomFamily<
  ScrapbookDocument | undefined
>("documentsById", undefined);
