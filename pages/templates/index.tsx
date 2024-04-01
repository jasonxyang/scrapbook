import TemplateCard from "@/components/TemplateCard";
import Button from "@/components/generic/Button";
import { templateIdsAtom } from "@/jotai/templates/atoms";
import { createTemplate } from "@/jotai/templates/utils";
import { useScrapbookRouter } from "@/utils/client/useScrapbookRouter";
import { useAtom } from "jotai/react";
import { memo, useCallback } from "react";

const Templates_Home = () => {
  const [templateIds] = useAtom(templateIdsAtom);

  const { goToTemplate } = useScrapbookRouter();

  const handleCreateTemplate = useCallback(() => {
    const newTemplateId = createTemplate();
    goToTemplate(newTemplateId);
  }, [goToTemplate]);

  return (
    <div>
      Templates home
      <Button onClick={handleCreateTemplate}>Create new Template</Button>
      {templateIds.map((templateId, index) => {
        return <TemplateCard key={index} templateId={templateId} />;
      })}
    </div>
  );
};

export default memo(Templates_Home);
