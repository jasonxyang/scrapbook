import { ScrapbookRecoilKey } from "@/types";
import {
  AtomFamilyOptions,
  AtomOptions,
  ReadOnlySelectorFamilyOptions,
  ReadOnlySelectorOptions,
  ReadWriteSelectorFamilyOptions,
  ReadWriteSelectorOptions,
  RecoilState,
  SerializableParam,
  atom,
  atomFamily,
  selector,
  selectorFamily,
} from "recoil";

export const recoilAtom = <T>(
  key: ScrapbookRecoilKey,
  options: Omit<AtomOptions<T>, "key">
): RecoilState<T> => {
  return atom<T>({
    key,
    ...options,
  });
};

export const recoilReadWriteSelector = <T>(
  key: ScrapbookRecoilKey,
  options: Omit<ReadWriteSelectorOptions<T>, "key">
) => {
  return selector<T>({
    key,
    ...options,
  });
};

export const recoilReadOnlySelector = <T>(
  key: ScrapbookRecoilKey,
  options: Omit<ReadOnlySelectorOptions<T>, "key">
) => {
  return selector<T>({
    key,
    ...options,
  });
};

export const recoilAtomFamily = <T, P extends SerializableParam>(
  key: ScrapbookRecoilKey,
  options: Omit<AtomFamilyOptions<T, P>, "key">
) => {
  return atomFamily<T, P>({ key, ...options });
};

export const recoilReadOnlySelectorFamily = <T, P extends SerializableParam>(
  key: ScrapbookRecoilKey,
  options: Omit<ReadOnlySelectorFamilyOptions<T, P>, "key">
) => {
  return selectorFamily<T, P>({ key, ...options });
};

export const recoilReadWriteSelectorFamily = <T, P extends SerializableParam>(
  key: ScrapbookRecoilKey,
  options: Omit<ReadWriteSelectorFamilyOptions<T, P>, "key">
) => {
  return selectorFamily<T, P>({ key, ...options });
};
