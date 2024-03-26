import {
  ResponseData,
  GenerateSentenceParams,
} from "@/pages/api/open_ai/generate_sentence";
import { documentSelector } from "@/recoil/document/selectors";
import { selectedTemplateSelector } from "@/recoil/template/selectors";
import {
  Generation,
  Style,
  Tone,
  isDocumentType,
  isStyle,
  isTone,
} from "@/types";
import { useMemo, useCallback } from "react";
import { useRecoilValue } from "recoil";
import { showAlert } from "./errorHandling";
import { post } from "./fetch";

const isValidDocumentParams = (documentParams: {
  tone: Tone | undefined;
  style: Style | undefined;
  title: string | undefined;
  documentType: DocumentType | string | undefined;
}): documentParams is {
  tone: Tone;
  style: Style;
  title: string;
  documentType: DocumentType;
} => {
  return (
    isTone(documentParams.tone) &&
    isStyle(documentParams.style) &&
    !!documentParams.title &&
    isDocumentType(documentParams.documentType)
  );
};

export const useGenerations = () => {
  const selectedTemplate = useRecoilValue(selectedTemplateSelector);
  const { tone, documentType, style, title } = useRecoilValue(documentSelector);

  const documentParams = useMemo(() => {
    return { tone, documentType, style, title };
  }, [documentType, style, title, tone]);

  const isMissingDocumentParams = !isValidDocumentParams(documentParams);
  const isMissingTemplateParams = !selectedTemplate;

  const generateSentences = useCallback(async (): Promise<Generation[][]> => {
    if (isMissingDocumentParams || isMissingTemplateParams) return [];
    try {
      const generationsPromises = selectedTemplate.sections.map((section) =>
        post<ResponseData>("/api/open_ai/generate_sentence", {
          documentTitle: documentParams.title,
          documentStyle: documentParams.style,
          documentTone: documentParams.tone,
          documentType: documentParams.documentType,
          sectionTitle: section.title,
          sectionKeywords: section.keywords,
          sectionKeySentences: section.keySentences,
        } satisfies GenerateSentenceParams)
      );
      const generationsResponses = await Promise.all(generationsPromises);
      return generationsResponses
        .filter((response) => !!response.data && response.successs)
        .map((response) => [response.data as Generation]);
    } catch (error) {
      showAlert((error as any).message);
      return [];
    }
  }, [
    documentParams.documentType,
    documentParams.style,
    documentParams.title,
    documentParams.tone,
    isMissingDocumentParams,
    isMissingTemplateParams,
    selectedTemplate?.sections,
  ]);

  return useMemo(
    () => ({
      isMissingDocumentParams,
      isMissingTemplateParams,
      generateSentences,
    }),
    [generateSentences, isMissingDocumentParams, isMissingTemplateParams]
  );
};
