import { atom } from "recoil";
import { getLocalStorageKey } from "@/utils.ts/client/localStorage";
import { custom, string } from "@recoiljs/refine";
import { syncEffect } from "recoil-sync";

const titleAtom = atom<string>({
  key: "title",
  default: "",
  //   effects: [
  //     syncEffect({
  //       itemKey: getLocalStorageKey("title"),
  //       refine: custom((value) =>
  //         string()(value).type === "success" ? (value as string) : ""
  //       ),
  //     }),
  //   ],
});

export default titleAtom;
