import { Generation } from "@/types";
import useGenerationProgress from "@/utils/client/useGenerationProgress";
import useGenerations from "@/utils/client/useGenerations";
import React, { useCallback, useState } from "react";
import { memo } from "react";

const GenerationPanel = () => {
  const { generations } = useGenerations();

  const renderSentenceGenerations = useCallback(() => {
    if (!generations) return null;
    return Object.values(generations).map((sectionGenerations, index) => (
      <div key={index}>
        <div className="p-2 bg-gray-100">Section {index + 1} Generations</div>
        <div className="">
          {Object.values(sectionGenerations).map((generation, index) => {
            return <SentenceGeneration generation={generation} key={index} />;
          })}
        </div>
      </div>
    ));
  }, [generations]);

  const renderEmpty = useCallback(() => {}, []);

  return (
    <div className="p-2">
      <div className="flex flex-col gap-4">{renderSentenceGenerations()}</div>
    </div>
  );
};

type SentenceGenerationProps = {
  generation: Generation;
};

const SentenceGeneration = memo(({ generation }: SentenceGenerationProps) => {
  const { getGenerationProgress } = useGenerationProgress();
  const generationProgress = getGenerationProgress({
    generationId: generation.id,
  });
  const isGenerating = generationProgress?.isGenerating;
  return (
    <div className="flex flex-col gap-2">
      {isGenerating ? (
        <div>generating sentence...</div>
      ) : (
        <>
          <div>{generation.content}</div>
          <div className="flex">
            <button className="outline-black outline-1 outline w-fit h-fit px-2 py-1 rounded-sm">
              Regenerate
            </button>
            <button className="outline-black outline-1 outline w-fit h-fit px-2 py-1 rounded-sm">
              Copy
            </button>
          </div>
        </>
      )}
    </div>
  );
});
SentenceGeneration.displayName = "SentenceGeneration";
export default memo(GenerationPanel);
