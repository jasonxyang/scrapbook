import { getRecoilAtomLocalStorageKey } from "@/utils/client/localStorage";
import { recoilAtom } from "@/utils/client/recoil";
import { string, voidable } from "@recoiljs/refine";
import { syncEffect } from "recoil-sync";

const selectedDocumentAtom = recoilAtom<string | undefined>(
  "currentDocumentId",
  {
    effects: [
      syncEffect({
        itemKey: getRecoilAtomLocalStorageKey({ key: "currentDocumentId" }),
        refine: voidable(string()),
      }),
    ],
  }
);

export default selectedDocumentAtom;
