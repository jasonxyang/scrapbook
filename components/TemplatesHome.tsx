import { templateIdsAtom } from "@/jotai/templates/atoms";
import { createTemplate } from "@/jotai/templates/utils";
import { useScrapbookRouter } from "@/utils/client/useScrapbookRouter";
import { useAtom } from "jotai/react";
import { memo, useCallback } from "react";
import TemplateCard from "./TemplateCard";
import Button from "./generic/Button";

const TemplatesHome = () => {
  const [templateIds] = useAtom(templateIdsAtom);

  const { goToTemplate } = useScrapbookRouter();

  const handleCreateTemplate = useCallback(() => {
    const newTemplateId = createTemplate();
    goToTemplate(newTemplateId);
  }, [goToTemplate]);

  if (!templateIds.length)
    return (
      <div className="w-full flex items-center justify-center">
        No templates found.
        <Button onClick={handleCreateTemplate}>Create new Template</Button>
      </div>
    );

  return (
    <div className="p-2 flex flex-col gap-4">
      <div>
        <Button onClick={handleCreateTemplate}>Create new Template</Button>
      </div>
      <div className=" grid grid-cols-5 w-full gap-4">
        {templateIds.map((templateId, index) => {
          return <TemplateCard key={index} templateId={templateId} />;
        })}
      </div>
    </div>
  );
};
export default memo(TemplatesHome);
