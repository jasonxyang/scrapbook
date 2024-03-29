import { SCRAPBOOK_DOCUMENT_TONES, ScrapbookDocumentTone } from "@/types";
import Checkbox from "./generic/Checkbox";
import { memo, useCallback } from "react";
import useDocument from "@/utils/client/useDocument";

type ToneCheckboxGroupProps = {
  documentId: string;
};
const ToneCheckboxGroup = ({ documentId }: ToneCheckboxGroupProps) => {
  const { documentTone, setDocumentTone } = useDocument({ documentId });

  const handleCheckboxChange = useCallback(
    (tone: ScrapbookDocumentTone) => {
      setDocumentTone(tone);
    },
    [setDocumentTone]
  );

  return SCRAPBOOK_DOCUMENT_TONES.map((tone) => {
    return (
      <Checkbox
        key={tone}
        checked={tone === documentTone}
        onCheckedChange={() => handleCheckboxChange(tone)}
        label={tone}
      />
    );
  });
};

export default memo(ToneCheckboxGroup);
