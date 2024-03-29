import { ScrapbookRecoilKey } from "@/types";

export const LOCAL_STORAGE_KEY = "scrapbook";

type GetRecoilAtomLocalStorageKeyParams = {
  key: ScrapbookRecoilKey;
};
export const getRecoilAtomLocalStorageKey = ({
  key,
}: GetRecoilAtomLocalStorageKeyParams) => {
  return `${LOCAL_STORAGE_KEY}_${key}`;
};

type GetRecoilAtomFamilyLocalStorageKeyParams = {
  key: ScrapbookRecoilKey;
  param: string;
};
export const getRecoilAtomFamilyLocalStorageKey = ({
  key,
  param,
}: GetRecoilAtomFamilyLocalStorageKeyParams) => {
  return `${LOCAL_STORAGE_KEY}_${key}_${param}`;
};
