import { selector } from "recoil";
import toneAtom from "./tone";
import documentTypeAtom from "./documentType";
import styleAtom from "./style";
import titleAtom from "./title";
import { documentParamsChecker } from "@/utils/client/checkers";
import { DocumentParams } from "@/types";

export const documentParamsSelector = selector({
  key: "documentParamsSelector",
  get: ({ get }) => {
    const tone = get(toneAtom);
    const style = get(styleAtom);
    const documentType = get(documentTypeAtom);
    const title = get(titleAtom);
    const params = { tone, style, documentType, title };

    return documentParamsChecker()(params).type === "success"
      ? (params as DocumentParams)
      : undefined;
  },
});
