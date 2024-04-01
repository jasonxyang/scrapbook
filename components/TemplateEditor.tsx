import { memo } from "react";
import ScrapbookTextEditor from "./generic/ScrapbookTextEditor";
import useTemplate from "@/utils/client/useTemplate";
import { TextAreaInput, TextInput } from "./generic/Input";

type TemplateEditorProps = { templateId: string };
const TemplateEditor = ({ templateId }: TemplateEditorProps) => {
  const { template, setTemplateName, setTemplateDescription } = useTemplate({
    templateId,
  });

  return (
    <div className="grid grid-cols-4 gap-8 p-4 w-full">
      <div className="col-span-1 p-4">
        <TextInput
          value={template?.name ?? ""}
          onValueChange={setTemplateName}
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
