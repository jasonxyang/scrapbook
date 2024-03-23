import { Template } from "@/types";
import { atom } from "recoil";

const templatesAtom = atom<{ [id: string]: Template }>({
  key: "templates",
  default: {},
});

export default templatesAtom;
