import selectedTemplateAtom from "@/recoil/template/selectedTemplate";
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
import { useRecoilState, useSetRecoilState } from "recoil";
import Dialog from "./generic/Dialog";
import { FileInput } from "./generic/Input";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Template } from "@/types";

const TemplateSection = () => {
  const [currentTemplate, setCurrentTemplate] =
    useRecoilState(selectedTemplateAtom);
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
    const setTemplates = useSetRecoilState(templatesAtom);

    const [stringifiedDocument, setStringifiedDocument] = useState<string>();

    const createNewTemplate = useCallback(() => {
      if (stringifiedDocument) processStringifiedDocument(stringifiedDocument);
    }, [stringifiedDocument]);

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

const processStringifiedDocument = (stringifiedDocument: string) => {
  console.info(stringifiedDocument);
};

export default memo(TemplateSection);
