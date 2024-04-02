import { memo, useCallback } from "react";
import ScrapbookTextEditor from "./generic/ScrapbookTextEditor";
import { TextAreaInput, TextInput } from "./generic/Input";
import { useAtom } from "jotai/react";
import { templatesByIdAtom } from "@/jotai/templates/atoms";
import { updateTemplate } from "@/jotai/templates/utils";

type TemplateEditorProps = { templateId: string };
const TemplateEditor = ({ templateId }: TemplateEditorProps) => {
  const [template] = useAtom(templatesByIdAtom(templateId));

  const handleSetName = useCallback(
    (name: string) => {
      updateTemplate({ templateId, updates: { name } });
    },
    [templateId]
  );

  const setTemplateDescription = useCallback(
    (description: string) => {
      updateTemplate({ templateId, updates: { description } });
    },
    [templateId]
  );

  return (
    <div className="grid grid-cols-4 gap-8 p-4 w-full">
      <div className="col-span-1 p-4">
        <TextInput
          value={template?.name ?? ""}
          onValueChange={handleSetName}
          placeholder="Title"
          className="text-xl"
        />
        <TextAreaInput
          value={template?.description ?? ""}
          onValueChange={setTemplateDescription}
          placeholder="Description"
        />
        {}
      </div>
      <div className="col-span-3">
        <ScrapbookTextEditor id={templateId} type="template" />
      </div>
    </div>
  );
};

export default memo(TemplateEditor);
