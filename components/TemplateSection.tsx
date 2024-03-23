import templatesAtom from "@/recoil/template/templates";
import {
  ReactNode,
  memo,
  use,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRecoilState } from "recoil";
import Dialog from "./generic/Dialog";
import { FileInput } from "./generic/Input";
import { Template, TemplateSection } from "@/types";
import { nanoid } from "nanoid";

const TemplateSection = () => {
  const [templates, setTemplates] = useRecoilState(templatesAtom);

  const renderEmptyState = useCallback(() => {
    return (
      <div>
        <h3>No templates found</h3>
        <DocumentFileUpoadDialog>
          <button>Create template</button>
        </DocumentFileUpoadDialog>
      </div>
    );
  }, []);
  return <section>{!templates?.length && renderEmptyState()}</section>;
};

const DocumentFileUpoadDialog = memo(
  ({ children }: { children: ReactNode }) => {
    const [templates, setTemplates] = useRecoilState(templatesAtom);

    const [stringifiedDocument, setStringifiedDocument] = useState<string>();

    const createNewTemplate = useCallback(() => {
      if (stringifiedDocument) {
        const newTemplate =
          processStringifiedDocumentIntoTemplate(stringifiedDocument);
        setTemplates({
          ...templates,
          [newTemplate.id]: newTemplate,
        });
      }
    }, [setTemplates, stringifiedDocument, templates]);

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
        <div>
          <FileInput onFileUpload={onFileUpload} onFileClear={clearFile} />
          {!!stringifiedDocument && <div>{stringifiedDocument}</div>}
        </div>
      );
    }, [clearFile, onFileUpload, stringifiedDocument]);

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
  }
);

DocumentFileUpoadDialog.displayName = "DocumentFileUpoadDialog";

const processStringifiedDocumentIntoTemplate = (
  stringifiedDocument: string
) => {
  // split strings into sections by double newline
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
    sections,
    content: stringifiedDocument,
  } satisfies Template;

  return template;
};

export default memo(TemplateSection);
