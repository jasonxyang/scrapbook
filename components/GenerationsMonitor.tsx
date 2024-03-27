import { documentSelector } from "@/recoil/document/selectors";
import { selectedTemplateSelector } from "@/recoil/template/selectors";
import useGenerations from "@/utils/client/useGenerations";
import { memo, useEffect } from "react";
import { useRecoilValue } from "recoil";

const GenerationsMonitor = () => {
  const { generateSentencesIfNeeded, regenerateSentencesIfNeeded } =
    useGenerations();
  const selectedTemplate = useRecoilValue(selectedTemplateSelector);
  const document = useRecoilValue(documentSelector);
  useEffect(() => {
    if (!selectedTemplate) return;
    generateSentencesIfNeeded({ template: selectedTemplate });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTemplate]);

  useEffect(() => {
    regenerateSentencesIfNeeded();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [document, selectedTemplate]);

  return null;
};

export default memo(GenerationsMonitor);
