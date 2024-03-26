import { selectedTemplateGenerationsSelector } from "@/recoil/generation/selectors";
import { selectedTemplateSelector } from "@/recoil/template/selectors";
import { useGenerations } from "@/utils/client/generations";
import React, { useCallback, useEffect, useState } from "react";
import { memo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

const ScrapbookPanel = () => {
  const [isLoading, setIsLoading] = useState(true);
  const selectedTemplate = useRecoilValue(selectedTemplateSelector);
  const [generations, setGenerations] = useRecoilState(
    selectedTemplateGenerationsSelector({ type: "sentence" })
  );

  const {
    generateSentences,
    isMissingDocumentParams,
    isMissingTemplateParams,
  } = useGenerations();

  useEffect(
    function generateSentencesOnMount() {
      (async () => {
        setGenerations(await generateSentences());
        setIsLoading(false);
      })();
      generateSentences();
    },
    [generateSentences, setGenerations]
  );

  const renderSentenceGenerations = useCallback(() => {
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
      {renderSentenceGenerations()}
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
