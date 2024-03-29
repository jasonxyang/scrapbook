import {
  GenerateSentenceResponseData,
  GenerateSentenceRequestBody,
} from "@/pages/api/open_ai/generate_sentence";
import { selectedTemplateGenerationsSelector } from "@/recoil/generations/selectors";
import {
  ScrapbookGeneration,
  ScrapbookDocumentParams,
  ScrapbookTemplateParams,
  ScrapbookTemplate,
} from "@/types";
import { isEqual } from "lodash";
import { nanoid } from "nanoid";
import { useMemo, useCallback } from "react";
import { useRecoilState } from "recoil";
import { showAlert } from "./errorHandling";
import { post } from "./fetch";
import useGenerationProgress from "./useGenerationProgress";

const SENTENCE_GENERATIONS_PER_SECTION = 2;

const needsRegenerate = ({
  documentParams,
  sectionParams,
  generation,
}: {
  generation: ScrapbookGeneration;
  documentParams: ScrapbookDocumentParams;
  sectionParams: ScrapbookTemplateParams;
}) => {
  const {
    documentType,
    tone,
    style,
    title: documentTitle,
  } = generation.documentParams;
  const {
    title: sectionTitle,
    keySentences,
    keywords,
  } = generation.templateParams;

  return (
    documentType !== documentParams.type ||
    tone !== documentParams.tone ||
    style !== documentParams.style ||
    documentTitle !== documentParams.title ||
    sectionTitle !== sectionParams.title ||
    !isEqual(keySentences, sectionParams.keySentences) ||
    !isEqual(keywords, sectionParams.keywords)
  );
};

const generateSentence = async ({
  generationId,
  documentParams,
  sectionParams,
  prevGeneration,
  isRegeneration,
}: {
  generationId?: string;
  prevGeneration?: ScrapbookGeneration;
  documentParams: ScrapbookDocumentParams;
  sectionParams: ScrapbookTemplateParams;
  isRegeneration?: boolean;
}) => {
  const shouldGenerate =
    !prevGeneration ||
    needsRegenerate({
      generation: prevGeneration,
      documentParams: documentParams as ScrapbookDocumentParams,
      sectionParams,
    }) ||
    (prevGeneration && isRegeneration);

  if (!shouldGenerate) return prevGeneration;

  try {
    const generation = await post<GenerateSentenceResponseData>(
      "/api/open_ai/generate_sentence",
      {
        generationId: generationId,
        documentTitle: documentParams.title,
        documentStyle: documentParams.style,
        documentTone: documentParams.tone,
        documentType: documentParams.type,
        sectionTitle: sectionParams.title,
        sectionKeywords: sectionParams.keywords,
        sectionKeySentences: sectionParams.keySentences,
        sectionId: sectionParams.id,
      } satisfies GenerateSentenceRequestBody
    );
    return generation.data;
  } catch (error) {
    showAlert((error as any).message);
  }
};

const useGenerations = () => {
  const [selectedTemplateGenerations, setSelectedTemplateGenerations] =
    useRecoilState(selectedTemplateGenerationsSelector({ type: "sentence" }));

  const {
    getGenerationProgress,
    setGenerationProgress,
    deleteGenerationProgress,
  } = useGenerationProgress();

  const setGeneration = useCallback(
    ({
      sectionId,
      generationId,
      generation,
    }: {
      sectionId: string;
      generationId: string;
      generation: ScrapbookGeneration;
    }) => {
      setSelectedTemplateGenerations((prevGenerations) => ({
        ...prevGenerations,
        [sectionId]: {
          ...prevGenerations?.[sectionId],
          [generationId]: generation,
        },
      }));
    },
    [setSelectedTemplateGenerations]
  );

  const generateSentenceIfNeeded = useCallback(
    ({
      generationId,
      prevGeneration,
      sectionParams,
      documentParams,
      isRegeneration,
    }: {
      sectionParams: ScrapbookTemplateParams;
      documentParams: ScrapbookDocumentParams;
      generationId: string;
      prevGeneration?: ScrapbookGeneration;
      isRegeneration: boolean;
    }) => {
      const generationProgress = getGenerationProgress({ generationId });

      if (generationProgress?.isGenerating) {
        console.log(`Generation ${generationId} is already in progress`);
        return;
      }

      setGenerationProgress({
        generationId,
        isGenerating: true,
      });

      console.log(`Generating ${generationId}`);

      generateSentence({
        generationId,
        prevGeneration,
        documentParams,
        sectionParams,
        isRegeneration,
      }).then((generation) => {
        if (generation && generation.content !== prevGeneration?.content)
          setGeneration({
            sectionId: sectionParams.id,
            generationId: generation.id,
            generation,
          });
        console.log(`Generation for ${generationId} is complete.`);
        deleteGenerationProgress({ generationId });
      });
    },
    [
      deleteGenerationProgress,
      getGenerationProgress,
      setGeneration,
      setGenerationProgress,
    ]
  );

  const regenerateSentencesIfNeeded = useCallback(
    ({
      documentParams,
      template,
    }: {
      documentParams: ScrapbookDocumentParams;
      template: ScrapbookTemplate;
    }) => {
      Object.values(template.sections).map(async (section) => {
        const { content, ...sectionParams } = section;
        const prevSectionGenerations =
          selectedTemplateGenerations?.[section.id];
        if (prevSectionGenerations) {
          Object.values(prevSectionGenerations).map((generation) => {
            generateSentenceIfNeeded({
              generationId: generation.id,
              prevGeneration: generation,
              sectionParams,
              documentParams,
              isRegeneration: true,
            });
          });
        }
      });
    },
    [generateSentenceIfNeeded, selectedTemplateGenerations]
  );

  const generateSentencesIfNeeded = useCallback(
    ({
      template,
      documentParams,
    }: {
      template: ScrapbookTemplate;
      documentParams: ScrapbookDocumentParams;
    }) => {
      Object.values(template.sections).map((section) => {
        const prevSectionGenerations =
          selectedTemplateGenerations?.[section.id];
        if (
          prevSectionGenerations &&
          Object.values(prevSectionGenerations).length >=
            SENTENCE_GENERATIONS_PER_SECTION
        )
          return;
        const { content, ...sectionParams } = section;
        Array.from({ length: SENTENCE_GENERATIONS_PER_SECTION }).map(() => {
          const generationId = nanoid();
          generateSentenceIfNeeded({
            generationId: generationId,
            sectionParams,
            documentParams,
            isRegeneration: false,
          });
        });
      });
    },
    [generateSentenceIfNeeded, selectedTemplateGenerations]
  );

  return useMemo(
    () => ({
      generations: selectedTemplateGenerations,
      regenerateSentencesIfNeeded,
      generateSentencesIfNeeded,
      generateSentenceIfNeeded,
    }),
    [
      selectedTemplateGenerations,
      regenerateSentencesIfNeeded,
      generateSentencesIfNeeded,
      generateSentenceIfNeeded,
    ]
  );
};

export default useGenerations;
