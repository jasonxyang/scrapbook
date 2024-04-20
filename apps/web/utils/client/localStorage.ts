import { ScrapbookJotaiKey } from "@/types";

export const LOCAL_STORAGE_KEY = "scrapbook";

type GetJotaiAtomLocalStorageKeyParams = {
  key: ScrapbookJotaiKey;
};
export const getJotaiAtomLocalStorageKey = ({
  key,
}: GetJotaiAtomLocalStorageKeyParams) => {
  return `${LOCAL_STORAGE_KEY}_${key}`;
};

type GetJotaiAtomFamilyLocalStorageKeyParams = {
  key: ScrapbookJotaiKey;
  param: string;
};
export const getJotaiAtomFamilyLocalStorageKey = ({
  key,
  param,
}: GetJotaiAtomFamilyLocalStorageKeyParams) => {
  return `${LOCAL_STORAGE_KEY}_${key}_${param}`;
};
