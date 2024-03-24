import templatesAtom from "@/recoil/template/templates";
import {
  ReactNode,
  SyntheticEvent,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import Dialog from "./generic/Dialog";
import { FileInput } from "./generic/Input";
import { Template, TemplateSection } from "@/types";
import { nanoid } from "nanoid";
import TemplateCard from "./TemplateCard";

const TemplateSection = () => {
  const templates = useRecoilValue(templatesAtom);

  const hasTemplates = useMemo(() => {
    return !!Object.keys(templates).length;
  }, [templates]);

  const renderEmptyState = useCallback(() => {
    return (
      <div>
        <h3>No templates found</h3>
      </div>
    );
  }, []);

  const renderTemplates = useCallback(() => {
    if (!templates) return null;
    return Object.keys(templates).map((templateId) => (
      <TemplateCard key={templateId} id={templateId} />
    ));
  }, [templates]);

  return (
    <section>
      {hasTemplates ? renderTemplates() : renderEmptyState()}
      <CreateTemplateDialog>
        <button>Create template</button>
      </CreateTemplateDialog>
    </section>
  );
};

const CreateTemplateDialog = memo(({ children }: { children: ReactNode }) => {
  const [templates, setTemplates] = useRecoilState(templatesAtom);

  const [stringifiedDocument, setStringifiedDocument] = useState<string>("");

  const processStringifiedDocumentIntoTemplate = useCallback(
    (stringifiedDocument: string) => {
      const sections = stringifiedDocument.split("\n\n").map(
        (section) =>
          ({
            title: "",
            keywords: [],
            keySentences: [],
            content: section,
          } satisfies TemplateSection)
      );
      const template = {
        id: nanoid(),
        name: "",
        sections,
        content: stringifiedDocument,
      } satisfies Template;

      return template;
    },
    []
  );

  const handleTextAreaChange = useCallback(
    (e: SyntheticEvent<HTMLTextAreaElement, Event>) => {
      setStringifiedDocument((e.target as HTMLTextAreaElement).value);
    },
    []
  );

  const createNewTemplate = useCallback(() => {
    if (stringifiedDocument) {
      const newTemplate =
        processStringifiedDocumentIntoTemplate(stringifiedDocument);
      setTemplates({
        ...templates,
        [newTemplate.id]: newTemplate,
      });
    }
  }, [
    processStringifiedDocumentIntoTemplate,
    setTemplates,
    stringifiedDocument,
    templates,
  ]);

  const onFileUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setStringifiedDocument(e.target?.result as string);
    };
    reader.readAsText(file);
  }, []);

  const clearFile = useCallback(() => {
    setStringifiedDocument("");
  }, []);

  useEffect(
    function clearFileOnUnmount() {
      return () => {
        clearFile();
      };
    },
    [clearFile]
  );

  const content = useCallback(() => {
    return (
      <div className="flex-col">
        <FileInput onFileUpload={onFileUpload} onFileClear={clearFile} />
        <div> or copy and paste content here:</div>
        <textarea
          onChange={handleTextAreaChange}
          value={stringifiedDocument}
          className="bg-white w-full h-40"
        />
      </div>
    );
  }, [onFileUpload, clearFile, handleTextAreaChange, stringifiedDocument]);

  const button = useMemo(() => {
    return {
      text: "Create Template",
      onClick: createNewTemplate,
    };
  }, [createNewTemplate]);

  return (
    <Dialog title="Upload file" content={content()} button={button}>
      {children}
    </Dialog>
  );
});

CreateTemplateDialog.displayName = "DocumentFileUpoadDialog";

export default memo(TemplateSection);
