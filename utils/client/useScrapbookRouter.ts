import { ScrapbookPageRoute } from "@/types";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
export const useScrapbookRouter = () => {
  const router = useRouter();
  const push = useCallback(
    (route: ScrapbookPageRoute) => {
      router.push(route);
    },
    [router]
  );

  return useMemo(
    () => ({
      push,
    }),
    [push]
  );
};
