import { Tone } from "@/types"
import { atom } from "recoil"

const toneAtom = atom<Tone | undefined>({
    key: "tone",
    default: undefined,
})

export default toneAtom
