import { Style } from "@/types"
import { atom } from "recoil"

const styleAtom = atom<Style | undefined>({
    key: "style",
    default: undefined,
})

export default styleAtom
