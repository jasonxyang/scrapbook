import { documentParamsSelector } from "@/recoil/documents/selectors";
import { selectedTemplateSelector } from "@/recoil/templates/selectors";
import useGenerations from "@/utils/client/useGenerations";
import { memo, useEffect } from "react";
import { useRecoilValue } from "recoil";

const GenerationsMonitor = () => {
  const { generateSentencesIfNeeded, regenerateSentencesIfNeeded } =
    useGenerations();
  const selectedTemplate = useRecoilValue(selectedTemplateSelector);
  const documentParams = useRecoilValue(documentParamsSelector);
  useEffect(
    function generateSentencesIfNeededOnSelectedTemplatChange() {
      if (!selectedTemplate || !documentParams) return;
      generateSentencesIfNeeded({ template: selectedTemplate, documentParams });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedTemplate, documentParams]
  );

  useEffect(
    function regenerateSentencesIfNeededOnDocumentChange() {
      if (!selectedTemplate || !documentParams) return;
      regenerateSentencesIfNeeded({
        documentParams,
        template: selectedTemplate,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedTemplate, documentParams]
  );

  return null;
};

export default memo(GenerationsMonitor);
