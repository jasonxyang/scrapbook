import { templatesByIdAtomFamily } from "@/recoil/templates/atoms";
import { ScrapbookTemplateInspiration } from "@/types";
import { useCallback, useMemo } from "react";
import { useRecoilState } from "recoil";

type UseTemplateParams = {
  templateId: string;
};
const useTemplate = ({ templateId }: UseTemplateParams) => {
  const [template, setTemplate] = useRecoilState(
    templatesByIdAtomFamily({ templateId })
  );

  const setTemplateName = useCallback(
    (name: string) => {
      setTemplate((prevTemplate) => {
        if (!prevTemplate) return;
        return {
          ...prevTemplate,
          name,
        };
      });
    },
    [setTemplate]
  );

  const setTemplateDescription = useCallback(
    (description: string) => {
      setTemplate((prevTemplate) => {
        if (!prevTemplate) return;
        return {
          ...prevTemplate,
          description,
        };
      });
    },
    [setTemplate]
  );

  const addTemplateInspiration = useCallback(
    (inspiration: ScrapbookTemplateInspiration) => {
      setTemplate((prevTemplate) => {
        if (!prevTemplate) return;
        if (
          prevTemplate.inspiration.some(
            (prevInspiration) => prevInspiration.content === inspiration.content
          )
        )
          return prevTemplate;
        return {
          ...prevTemplate,
          inspiration: [...prevTemplate.inspiration, inspiration],
        };
      });
    },
    [setTemplate]
  );

  const removeTemplateInspiration = useCallback(
    (inspiration: ScrapbookTemplateInspiration) => {
      setTemplate((prevTemplate) => {
        if (!prevTemplate) return;
        return {
          ...prevTemplate,
          inspiration: prevTemplate.inspiration.filter(
            (prevInspiration) => prevInspiration.content !== inspiration.content
          ),
        };
      });
    },
    [setTemplate]
  );

  const setTemplateContent = useCallback(
    (content: string) => {
      setTemplate((prevTemplate) => {
        if (!prevTemplate) return;
        return {
          ...prevTemplate,
          content,
        };
      });
    },
    [setTemplate]
  );

  return useMemo(
    () => ({
      template,
      name: template?.name,
      description: template?.description,
      inspiration: template?.inspiration,
      content: template?.content,
      generationIds: template?.generationIds,
      setTemplateName,
      setTemplateDescription,
      setTemplateContent,
      addTemplateInspiration,
      removeTemplateInspiration,
    }),
    [
      addTemplateInspiration,
      removeTemplateInspiration,
      setTemplateContent,
      setTemplateDescription,
      setTemplateName,
      template,
    ]
  );
};

export default useTemplate;
