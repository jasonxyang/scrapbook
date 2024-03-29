import { SCRAPBOOK_DOCUMENT_STYLES, ScrapbookDocumentStyle } from "@/types";
import Checkbox from "./generic/Checkbox";
import { memo, useCallback } from "react";
import useDocument from "@/utils/client/useDocument";

type StyleCheckboxGroupProps = {
  documentId: string;
};
const StyleCheckboxGroup = ({ documentId }: StyleCheckboxGroupProps) => {
  const { documentStyle, setDocumentStyle } = useDocument({ documentId });

  const handleCheckboxChange = useCallback(
    (style: ScrapbookDocumentStyle) => {
      setDocumentStyle(style);
    },
    [setDocumentStyle]
  );

  return SCRAPBOOK_DOCUMENT_STYLES.map((style) => {
    return (
      <Checkbox
        key={style}
        checked={style === documentStyle}
        onCheckedChange={() => handleCheckboxChange(style)}
        label={style}
      />
    );
  });
};

export default memo(StyleCheckboxGroup);
