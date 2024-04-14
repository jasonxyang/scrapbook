import { memo, useCallback, useMemo, useState } from "react";
import DocumentEditor from "./ScrapbookTextEditor/DocumentEditor";
import { TextInput } from "./generic/Input";
import { useAtom } from "jotai/react";
import { updateDocument } from "@/jotai/documents/utils";

import { documentsByIdAtom } from "@/jotai/documents/atoms";
import {
  SCRAPBOOK_DOCUMENT_STYLES,
  SCRAPBOOK_DOCUMENT_TONES,
  SCRAPBOOK_DOCUMENT_TYPES,
  ScrapbookDocument,
} from "@/types";
import Select, { SelectItemProps } from "./generic/Select";
import TemplateEditor from "./ScrapbookTextEditor/TemplateEditor";
import { templateIdsAtom, templatesByIdAtom } from "@/jotai/templates/atoms";
import SentenceGeneration from "./SentenceGeneration";
import GenerationsMonitor from "./GenerationsMonitor";

type EditDocumentProps = { documentId: string };
const EditDocument = ({ documentId: documentId }: EditDocumentProps) => {
  const [document] = useAtom(documentsByIdAtom(documentId));
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    null
  );
  const [templateIds] = useAtom(templateIdsAtom);

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
    <>
      {selectedTemplateId && (
        <GenerationsMonitor
          documentId={documentId}
          templateId={selectedTemplateId}
        />
      )}
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
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1">
            Templates
            {templateIds.map((templateId, index) => {
              return (
                <TemplateItem
                  key={index}
                  templateId={templateId}
                  onClick={() => setSelectedTemplateId(templateId)}
                />
              );
            })}
            {selectedTemplateId && (
              <TemplateEditor
                templateId={selectedTemplateId}
                editable={false}
              />
            )}
          </div>
          <div className="col-span-1">
            <DocumentEditor
              documentId={documentId}
              selectedTemplateId={selectedTemplateId}
            />
          </div>
          <div className="col-span-1 flex flex-col gap-3">
            {document.generationIds.map((generationId, index) => (
              <SentenceGeneration generationId={generationId} key={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

type TemplateItemProps = { templateId: string; onClick?: () => void };
const TemplateItem = memo(({ templateId, onClick }: TemplateItemProps) => {
  const [template] = useAtom(templatesByIdAtom(templateId));
  if (!template) return null;
  return (
    <div
      onClick={onClick}
      className="py-2 px-4 rounded bg-gray-100 cursor-pointer"
    >
      {template.name}
    </div>
  );
});

TemplateItem.displayName = "TemplateItem";

export default memo(EditDocument);
