import { atom } from "recoil"

const titleAtom = atom<string>({
    key: "title",
    default: "",
})

export default titleAtom