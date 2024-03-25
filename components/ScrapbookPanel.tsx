import {
  GenerateSentenceParams,
  ResponseData,
} from "@/pages/api/open_ai/generate_sentence";
import { documentSelector } from "@/recoil/document/selectors";
import { selectedTemplateGenerationsSelector } from "@/recoil/generation/selectors";
import { selectedTemplateSelector } from "@/recoil/template/selectors";
import { DocumentType, Generation, Style, Tone } from "@/types";
import { showAlert } from "@/utils.ts/client/errorHandling";
import { post } from "@/utils.ts/client/fetch";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { memo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

const isValidDocumentParams = (documentParams: {
  tone: Tone | undefined;
  style: Style | undefined;
  title: string;
  documentType: DocumentType | undefined;
}): documentParams is {
  tone: Tone;
  style: Style;
  title: string;
  documentType: DocumentType;
} => {
  return (
    !!documentParams.tone &&
    !!documentParams.style &&
    !!documentParams.title &&
    !!documentParams.documentType
  );
};

const ScrapbookPanel = () => {
  const [isLoading, setIsLoading] = useState(true);
  const selectedTemplate = useRecoilValue(selectedTemplateSelector);
  const { tone, documentType, style, title } = useRecoilValue(documentSelector);
  const [generations, setGenerations] = useRecoilState(
    selectedTemplateGenerationsSelector
  );

  const documentParams = useMemo(() => {
    return { tone, documentType, style, title };
  }, [documentType, style, title, tone]);

  const isMissingDocumentParams = !isValidDocumentParams(documentParams);
  const isMissingTemplateParams = !selectedTemplate;

  useEffect(
    function generateSentences() {
      if (!isMissingDocumentParams && !isMissingTemplateParams) {
        try {
          (async () => {
            const generationsPromises = selectedTemplate.sections.map(
              (section) =>
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
            setGenerations([
              generationsResponses
                .filter((response) => !!response.data && response.successs)
                .map((response) => response.data as Generation),
            ]);
          })();
        } catch (error) {
          showAlert((error as any).message);
        }
      }

      setIsLoading(false);
    },
    [
      documentParams,
      documentType,
      isMissingDocumentParams,
      isMissingTemplateParams,
      selectedTemplate,
      setGenerations,
      style,
      title,
      tone,
    ]
  );

  const renderGenerations = useCallback(() => {
    if (!generations) return null;
    return generations.map((sectionGenerations, index) => (
      <div key={index}>
        <div>
          {!!selectedTemplate?.sections[index].title
            ? selectedTemplate?.sections[index].title
            : `Section ${index + 1} Generations`}
        </div>
        <div>
          {sectionGenerations.map((generation, index) => {
            return <div key={index}>{generation.content}</div>;
          })}
        </div>
      </div>
    ));
  }, [generations, selectedTemplate?.sections]);

  const renderEmpty = useCallback(() => {}, []);

  const renderLoading = useCallback(() => {
    return <div>Loading generations...</div>;
  }, []);

  const renderMissingParams = useCallback(() => {
    if (isMissingDocumentParams && isMissingTemplateParams)
      return <div>Missing document and template params.</div>;
    if (isMissingDocumentParams) return <div>Missing document params.</div>;
    if (isMissingTemplateParams) return <div>Missing template params.</div>;
    return null;
  }, [isMissingDocumentParams, isMissingTemplateParams]);
  return (
    <div>
      {isLoading && renderLoading()}
      {(isMissingDocumentParams || isMissingTemplateParams) &&
        renderMissingParams()}
      {renderGenerations()}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        // onClick={handleInsertText}
      >
        Copy and Paste
      </button>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Change Text
      </button>
    </div>
  );
};

export default memo(ScrapbookPanel);
