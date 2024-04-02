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
      <div>
        No templates found.
        <Button onClick={handleCreateTemplate}>Create new Template</Button>
      </div>
    );

  return (
    <div className="px-4 py-2 grid grid-cols-5 w-full">
      {templateIds.map((templateId, index) => {
        return <TemplateCard key={index} templateId={templateId} />;
      })}
    </div>
  );
};
export default memo(TemplatesHome);
