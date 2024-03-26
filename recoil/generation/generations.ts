import { Generation, GenerationType } from "@/types";
import { atom } from "recoil";

const generationsAtom = atom<
  | {
      [templateId: string]: { [type in GenerationType]?: Generation[][] };
    }
  | undefined
>({
  key: "generations",
  default: {},
});

export default generationsAtom;
