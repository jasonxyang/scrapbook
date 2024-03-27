import generationProgressAtom from "@/recoil/generation/generationProgress";
import { GenerationProgress } from "@/types";
import { useMemo } from "react";
import { useRecoilState } from "recoil";

const useGenerationProgress = () => {
  const [
    generationProgressByGenerationId,
    setGenerationProgressByGenerationId,
  ] = useRecoilState(generationProgressAtom);

  return useMemo(() => {
    return {
      getGenerationProgress: ({ generationId }: { generationId: string }) => {
        return generationProgressByGenerationId?.[generationId];
      },
      setGenerationProgress: ({
        generationId,
        isGenerating,
      }: GenerationProgress) => {
        setGenerationProgressByGenerationId((prevProgress) => ({
          ...prevProgress,
          [generationId]: { generationId, isGenerating },
        }));
      },
      deleteGenerationProgress: ({
        generationId,
      }: {
        generationId: string;
      }) => {
        setGenerationProgressByGenerationId((prevProgress) => {
          const newProgress = { ...prevProgress };
          delete newProgress[generationId];
          return newProgress;
        });
      },
    };
  }, [generationProgressByGenerationId, setGenerationProgressByGenerationId]);
};

export default useGenerationProgress;
