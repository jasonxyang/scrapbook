export const LOCAL_STORAGE_KEY = "scrapbook";

export const getLocalStorageKey = (key: string) => {
  return `${LOCAL_STORAGE_KEY}_${key}`;
};
