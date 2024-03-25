import { selector } from "recoil";
import toneAtom from "./tone";
import documentTypeAtom from "./documentType";
import styleAtom from "./style";
import titleAtom from "./title";

export const documentSelector = selector({
  key: "documentSelector",
  get: ({ get }) => {
    const tone = get(toneAtom);
    const style = get(styleAtom);
    const documentType = get(documentTypeAtom);
    const title = get(titleAtom);

    return { tone, style, documentType, title };
  },
});
