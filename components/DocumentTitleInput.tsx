import { memo } from "react";
import { TextInput } from "./generic/Input";
import { useRecoilState } from "recoil";
import titleAtom from "@/recoil/document/title";

const DocumentTitleInput = () => {
  const [currentTitle, setCurrentTitle] = useRecoilState(titleAtom);
  return (
    <div className="inline-block">
      <label className="pr-4 font-bold">Document Title </label>
      <TextInput
        value={currentTitle ?? ""}
        onValueChange={setCurrentTitle}
        placeholder="Enter document title"
      />
    </div>
  );
};

export default memo(DocumentTitleInput);
