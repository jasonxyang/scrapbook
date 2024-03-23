import { DOCUMENT_TYPES } from "@/types";
import { memo, useMemo } from "react";
import Select, { SelectItemProps } from "./generic/Select";
import { useRecoilState } from "recoil";
import documentTypeAtom from "@/recoil/documentType";

const DocumentTypeSelect = () => {
  const [currentDocumentType, setCurrentDocumentType] =
    useRecoilState(documentTypeAtom);
  const items = useMemo((): SelectItemProps[] => {
    return DOCUMENT_TYPES.map((documentType) => {
      return {
        value: documentType,
        label: documentType,
      };
    });
  }, []);
  return (
    <Select
      value={currentDocumentType as string}
      onValueChange={setCurrentDocumentType as (value: string) => void}
      items={items}
      itemType="item"
    />
  );
};

export default memo(DocumentTypeSelect);
