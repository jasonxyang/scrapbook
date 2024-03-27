import templatesAtom from "@/recoil/template/templates";
import {
  ReactNode,
  SyntheticEvent,
  memo,
  useCallback,
  useMemo,
  useState,
} from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import Dialog from "./generic/Dialog";
import { FileInput, TextInput } from "./generic/Input";
import { Template, TemplateSection } from "@/types";
import { nanoid } from "nanoid";
import TemplateCard from "./TemplateCard";

const TemplateSection = () => {
  const templates = useRecoilValue(templatesAtom);

  const hasTemplates = useMemo(() => {
    if (!templates) return false;
    return !!Object.keys(templates).length;
  }, [templates]);

  const renderEmptyState = useCallback(() => {
    return (
      <div>
        <h4>No templates found</h4>
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
    <section className="flex items-center gap-4 overflow-x-scroll p-2">
      <CreateTemplateDialog>
        <button className="outline-black outline-1 outline w-fit h-fit px-2 py-1 rounded-sm">
          Create template
        </button>
      </CreateTemplateDialog>
      {hasTemplates ? renderTemplates() : renderEmptyState()}
    </section>
  );
};

const CreateTemplateDialog = memo(({ children }: { children: ReactNode }) => {
  const [name, setName] = useState<string>("Untitled Template");
  const [description, setDescription] = useState<string>("");
  const [templates, setTemplates] = useRecoilState(templatesAtom);
  const [stringifiedDocument, setStringifiedDocument] = useState<string>("");

  const clear = useCallback(() => {
    setName("Untitled Template");
    setDescription("");
    setStringifiedDocument("");
  }, []);

  const processStringifiedDocumentIntoTemplate = useCallback(
    (stringifiedDocument: string) => {
      const sections = stringifiedDocument
        .split("\n\n")
        .reduce((result, section) => {
          const sectionId = nanoid();
          return {
            ...result,
            [sectionId]: {
              id: sectionId,
              title: "",
              keywords: [],
              keySentences: [],
              content: section,
            } satisfies TemplateSection,
          };
        }, {});
      const template = {
        id: nanoid(),
        name,
        description,
        sections,
        content: stringifiedDocument,
      } satisfies Template;

      return template;
    },
    [description, name]
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
      clear();
    }
  }, [
    clear,
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

  const content = useCallback(() => {
    return (
      <div className="flex-col w-[500px] ">
        <TextInput
          value={name}
          onValueChange={setName}
          label="Name"
          className="w-full"
        />
        <TextInput
          value={description}
          onValueChange={setDescription}
          label="Description"
          className="w-full"
        />
        {!stringifiedDocument && (
          <FileInput
            onFileUpload={onFileUpload}
            onFileClear={clearFile}
            accept=".txt"
          />
        )}
        {!stringifiedDocument && <div> or copy and paste content here:</div>}
        <textarea
          onChange={handleTextAreaChange}
          value={stringifiedDocument}
          className="bg-white w-full h-40 outline outline-1 outline-gray-200 rounded-md p-4"
        />
      </div>
    );
  }, [
    name,
    description,
    onFileUpload,
    clearFile,
    handleTextAreaChange,
    stringifiedDocument,
  ]);

  const button = useMemo(() => {
    if (!stringifiedDocument) return;
    return {
      text: "Create Template",
      onClick: createNewTemplate,
    };
  }, [createNewTemplate, stringifiedDocument]);

  return (
    <Dialog
      title="Upload file"
      content={content()}
      button={button}
      onClose={clear}
    >
      {children}
    </Dialog>
  );
});

CreateTemplateDialog.displayName = "DocumentFileUpoadDialog";

export default memo(TemplateSection);
