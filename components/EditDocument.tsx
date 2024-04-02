import { memo, useCallback, useMemo } from "react";
import DocumentEditor from "./ScrapbookTextEditor/DocumentEditor";
import { TextAreaInput, TextInput } from "./generic/Input";
import { useAtom } from "jotai/react";
import { updateDocument } from "@/jotai/documents/utils";

import InspirationPill from "./InspirationPill";
import { documentsByIdAtom } from "@/jotai/documents/atoms";
import {
  SCRAPBOOK_DOCUMENT_STYLES,
  SCRAPBOOK_DOCUMENT_TONES,
  SCRAPBOOK_DOCUMENT_TYPES,
  ScrapbookDocument,
} from "@/types";
import Select, { SelectItemProps } from "./generic/Select";

type EditDocumentProps = { documentId: string };
const EditDocument = ({ documentId: documentId }: EditDocumentProps) => {
  const [document] = useAtom(documentsByIdAtom(documentId));

  const handleSetTitle = useCallback(
    (title: string) => {
      updateDocument({ documentId, updates: { title } });
    },
    [documentId]
  );

  const handleSetType = useCallback(
    (type: ScrapbookDocument["type"]) => {
      updateDocument({ documentId: documentId, updates: { type } });
    },
    [documentId]
  );

  const handleSetTone = useCallback(
    (tone: ScrapbookDocument["tone"]) => {
      updateDocument({ documentId: documentId, updates: { tone } });
    },
    [documentId]
  );

  const handleSetStyle = useCallback(
    (style: ScrapbookDocument["style"]) => {
      updateDocument({ documentId: documentId, updates: { style } });
    },
    [documentId]
  );

  const typeItems = useMemo((): SelectItemProps[] => {
    return SCRAPBOOK_DOCUMENT_TYPES.map((type) => {
      return {
        value: type,
        label: type,
      };
    });
  }, []);

  const toneItems = useMemo((): SelectItemProps[] => {
    return SCRAPBOOK_DOCUMENT_TONES.map((tone) => {
      return {
        value: tone,
        label: tone,
      };
    });
  }, []);

  const styleItems = useMemo((): SelectItemProps[] => {
    return SCRAPBOOK_DOCUMENT_STYLES.map((style) => {
      return {
        value: style,
        label: style,
      };
    });
  }, []);

  if (!document) return null;

  const { type, tone, style, title } = document;

  return (
    <div className="flex flex-col gap-4 p-4 w-full">
      <TextInput
        value={title}
        onValueChange={handleSetTitle}
        placeholder="Title"
        className="text-xl"
      />
      <div className="grid grid-cols-3 gap-4">
        <Select
          value={type as string}
          onValueChange={handleSetType as (value: string) => void}
          items={typeItems}
          itemType="item"
          label="Type"
        />

        <Select
          value={tone as string}
          onValueChange={handleSetTone as (value: string) => void}
          items={toneItems}
          itemType="item"
          label="Tone"
        />

        <Select
          value={style as string}
          onValueChange={handleSetStyle as (value: string) => void}
          items={styleItems}
          itemType="item"
          label="Style"
        />
      </div>
      <div className="col-span-3">
        <DocumentEditor documentId={documentId} />
      </div>
    </div>
  );
};

export default memo(EditDocument);
