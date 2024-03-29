import { SCRAPBOOK_DOCUMENT_TYPES } from "@/types";
import { memo, useMemo } from "react";
import Select, { SelectItemProps } from "./generic/Select";
import useDocument from "@/utils/client/useDocument";

type DocumentTypeSelectProps = { documentId: string };
const DocumentTypeSelect = ({ documentId }: DocumentTypeSelectProps) => {
  const { documentType, setDocumentType } = useDocument({ documentId });
  const items = useMemo((): SelectItemProps[] => {
    return SCRAPBOOK_DOCUMENT_TYPES.map((documentType) => {
      return {
        value: documentType,
        label: documentType,
      };
    });
  }, []);
  return (
    <div className="inline-block px-5">
      <label className="pr-4 font-bold">Document Type</label>
      <Select
        value={documentType as string}
        onValueChange={setDocumentType as (value: string) => void}
        items={items}
        itemType="item"
      />
    </div>
  );
};

export default memo(DocumentTypeSelect);
