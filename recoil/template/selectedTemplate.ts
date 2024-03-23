import { atom } from "recoil";

const selectedTemplateAtom = atom<string | undefined>({
  key: "selectedTemplate",
  default: undefined,
});

export default selectedTemplateAtom;
