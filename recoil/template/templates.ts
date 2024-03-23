import { Template } from "@/types";
import { atom } from "recoil";

const templates = atom<{ [id: string]: Template } | undefined>({
  key: "templates",
  default: {},
});

export default templates;
