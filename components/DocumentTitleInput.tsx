import { FocusEvent, memo, useCallback, useState } from "react";
import { TextInput } from "./generic/Input";
import useDocument from "@/utils/client/useDocument";

type DocumentTitleInputProps = { documentId: string };
const DocumentTitleInput = ({ documentId }: DocumentTitleInputProps) => {
  const { documentTitle, setDocumentTitle } = useDocument({ documentId });
  const [title, setTitle] = useState(documentTitle ?? "");
  const handleBlur = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      setDocumentTitle(e.target.value);
    },
    [setDocumentTitle]
  );
  return (
    <div className="inline-block">
      <label className="pr-4 font-bold">Document Title </label>
      <TextInput
        value={title}
        onValueChange={setTitle}
        placeholder="Enter document title"
        onBlur={handleBlur}
      />
    </div>
  );
};

export default memo(DocumentTitleInput);
