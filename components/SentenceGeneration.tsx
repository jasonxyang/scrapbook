import { generationsByIdAtom } from "@/jotai/generations/atoms";
import { regenerateSentence } from "@/jotai/generations/utils";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import { useAtom } from "jotai/react";
import { memo, useCallback, useEffect, useRef, useState } from "react";

type SentenceGenerationProps = {
  generationId: string;
};
const SentenceGeneration = ({ generationId }: SentenceGenerationProps) => {
  const [generation] = useAtom(generationsByIdAtom(generationId));
  const [showCopySuccess, setShowCopySuccess] = useState(false);

  const handleCopy = useCallback(() => {
    if (!generation) return;
    navigator.clipboard.writeText(generation.content);
    regenerateSentence({ generationId });
    setShowCopySuccess(true);
    setTimeout(() => {
      setShowCopySuccess(false);
    }, 2000);
  }, [generation, generationId]);

  if (!generation) return null;
  return (
    <div className="bg-gray-100 w-fit py-2 px-2 rounded gap-2 flex">
      <button
        className="cursor-pointer w-fit h-fit block p-1 hover:bg-gray-300 transition-all rounded"
        onClick={handleCopy}
      >
        {showCopySuccess ? <CheckIcon /> : <CopyIcon />}
      </button>
      {generation.content}
    </div>
  );
};

export default memo(SentenceGeneration);
