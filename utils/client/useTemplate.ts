import { templatesByIdAtom } from "@/jotai/templates/atoms";
import { useAtom } from "jotai/react";
import { useCallback, useMemo } from "react";

type UseTemplateParams = {
  templateId: string;
};
const useTemplate = ({ templateId }: UseTemplateParams) => {
  const [template, setTemplate] = useAtom(templatesByIdAtom(templateId));

  const setTemplateName = useCallback(
    (name: string) => {
      if (!template) return;
      setTemplate(() => {
        return {
          ...template,
          name,
        };
      });
    },
    [setTemplate, template]
  );

  const setTemplateDescription = useCallback(
    (description: string) => {
      if (!template) return;
      setTemplate(() => {
        return {
          ...template,
          description,
        };
      });
    },
    [setTemplate, template]
  );

  const setTemplateContent = useCallback(
    (content: string) => {
      if (!template) return;
      setTemplate(() => {
        return {
          ...template,
          content,
        };
      });
    },
    [setTemplate, template]
  );

  return useMemo(
    () => ({
      template,
      setTemplateName,
      setTemplateDescription,
      setTemplateContent,
    }),
    [setTemplateContent, setTemplateDescription, setTemplateName, template]
  );
};

export default useTemplate;
