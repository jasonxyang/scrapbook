import { DocumentType } from "@/types"
import { atom } from "recoil"

const documentTypeAtom = atom<DocumentType | undefined>({
    key: "documentType",
    default: undefined,
})

export default documentTypeAtom
