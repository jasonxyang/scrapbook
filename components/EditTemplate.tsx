import { memo, useCallback, useMemo } from "react";
import TemplateEditor from "./ScrapbookTextEditor/TemplateEditor";
import { TextAreaInput, TextInput } from "./generic/Input";
import { useAtom } from "jotai/react";
import { templatesByIdAtom } from "@/jotai/templates/atoms";
import { updateTemplate } from "@/jotai/templates/utils";
import { readInspiration } from "@/jotai/inspirations/utils";
import { inspirationsByIdAtom } from "@/jotai/inspirations/atoms";
import InspirationPill from "./InspirationPill";

type EditTemplateProps = { templateId: string };
const EditTemplate = ({ templateId }: EditTemplateProps) => {
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
        <div className="flex flex-col gap-2">
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
          <div className="flex gap-2 flex-wrap">
            {template?.inspirationIds.map((inspirationId, index) => (
              <InspirationPill inspirationId={inspirationId} key={index} />
            ))}
          </div>
        </div>
      </div>
      <div className="col-span-3">
        <TemplateEditor templateId={templateId} />
      </div>
    </div>
  );
};

export default memo(EditTemplate);
