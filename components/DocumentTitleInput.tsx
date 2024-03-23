import { ChangeEvent, memo, useCallback } from "react";
import { TextInput } from "./generic/Input";
import { useRecoilState } from "recoil";
import titleAtom from "@/recoil/title";

const DocumentTitleInput = () => {
  const [currentTitle, setCurrentTitle] = useRecoilState(titleAtom);
  return (
    <div>
      Document Title
      <TextInput value={currentTitle} onValueChange={setCurrentTitle} />
    </div>
  );
};

export default memo(DocumentTitleInput);
