import { ScrapbookJotaiKey } from "@/types";
import { atomWithStorage, atomFamily } from "jotai/utils";
import {
  getJotaiAtomFamilyLocalStorageKey,
  getJotaiAtomLocalStorageKey,
} from "./localStorage";
import { getDefaultStore } from "jotai/vanilla";

export const jotaiAtom = <Value>(
  key: ScrapbookJotaiKey,
  initialValue: Value
) => {
  return atomWithStorage<Value>(
    getJotaiAtomLocalStorageKey({ key }),
    initialValue
  );
};

export const jotaiAtomFamily = <Value>(
  key: ScrapbookJotaiKey,
  defaultValue: Value
) => {
  return atomFamily((param: string) =>
    atomWithStorage<Value>(
      getJotaiAtomFamilyLocalStorageKey({ key, param }),
      defaultValue
    )
  );
};

export const jotaiStore = getDefaultStore;
