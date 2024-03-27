import {
  GenerateSentenceResponseData,
  GenerateSentenceRequestBody,
} from "@/pages/api/open_ai/generate_sentence";
import { documentSelector } from "@/recoil/document/selectors";
import { selectedTemplateGenerationsSelector } from "@/recoil/generation/selectors";
import { selectedTemplateSelector } from "@/recoil/template/selectors";
import { Generation, DocumentParams, SectionParams, Template } from "@/types";
import { isEqual } from "lodash";
import { nanoid } from "nanoid";
import { useMemo, useCallback } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { documentParamsChecker } from "./checkers";
import { showAlert } from "./errorHandling";
import { post } from "./fetch";
import useGenerationProgress from "./useGenerationProgress";

const SENTENCE_GENERATIONS_PER_SECTION = 2;

const needsRegenerate = ({
  documentParams,
  sectionParams,
  generation,
}: {
  generation: Generation;
  documentParams: DocumentParams;
  sectionParams: SectionParams;
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
  } = generation.sectionParams;

  return (
    documentType !== documentParams.documentType ||
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
  prevGeneration?: Generation;
  documentParams: DocumentParams;
  sectionParams: SectionParams;
  isRegeneration?: boolean;
}) => {
  const shouldGenerate =
    !prevGeneration ||
    needsRegenerate({
      generation: prevGeneration,
      documentParams: documentParams as DocumentParams,
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
        documentType: documentParams.documentType,
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
  const selectedTemplate = useRecoilValue(selectedTemplateSelector);
  const [selectedTemplateGenerations, setSelectedTemplateGenerations] =
    useRecoilState(selectedTemplateGenerationsSelector({ type: "sentence" }));
  const { tone, documentType, style, title } = useRecoilValue(documentSelector);

  const {
    getGenerationProgress,
    setGenerationProgress,
    deleteGenerationProgress,
  } = useGenerationProgress();

  const documentParams = useMemo(() => {
    return { tone, documentType, style, title };
  }, [documentType, style, title, tone]);

  const isMissingDocumentParams =
    documentParamsChecker()(documentParams).type === "failure";
  const isMissingTemplateParams = !selectedTemplate?.sections;

  const setGeneration = useCallback(
    ({
      sectionId,
      generationId,
      generation,
    }: {
      sectionId: string;
      generationId: string;
      generation: Generation;
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
    async ({
      template,
      sectionId,
      generationId,
      prevGeneration,
    }: {
      template: Template;
      sectionId: string;
      generationId: string;
      prevGeneration?: Generation;
    }) => {
      if (isMissingTemplateParams || isMissingDocumentParams) return;
      const generationProgress = getGenerationProgress({ generationId });

      if (generationProgress?.isGenerating) {
        console.log(`Generation ${generationId} is already in progress`);
        return;
      }

      console.log(`Generating ${generationId}`);

      const { content, ...sectionParams } = template.sections[sectionId];

      const generation = await generateSentence({
        generationId,
        prevGeneration,
        documentParams: documentParams as DocumentParams,
        sectionParams,
      });

      if (generation && generation.content !== prevGeneration?.content)
        setGeneration({ sectionId, generationId: generation.id, generation });
      console.log(`Generation for ${generationId} is complete.`);
      deleteGenerationProgress({ generationId });
    },
    [
      deleteGenerationProgress,
      documentParams,
      getGenerationProgress,
      isMissingDocumentParams,
      isMissingTemplateParams,
      setGeneration,
    ]
  );

  const regenerateSentencesIfNeeded = useCallback(() => {
    if (!selectedTemplate) return;
    Object.values(selectedTemplate.sections).map(async (section) => {
      const prevSectionGenerations = selectedTemplateGenerations?.[section.id];
      if (prevSectionGenerations) {
        Object.values(prevSectionGenerations).map((generation) => {
          setGenerationProgress({
            generationId: generation.id,
            isGenerating: true,
          });
          generateSentenceIfNeeded({
            template: selectedTemplate,
            generationId: generation.id,
            prevGeneration: generation,
            sectionId: section.id,
          });
        });
      }
    });
  }, [
    generateSentenceIfNeeded,
    selectedTemplate,
    selectedTemplateGenerations,
    setGenerationProgress,
  ]);

  const generateSentencesIfNeeded = useCallback(
    ({ template }: { template: Template }) => {
      Object.values(template.sections).map((section) => {
        const prevSectionGenerations =
          selectedTemplateGenerations?.[section.id];
        if (
          prevSectionGenerations &&
          Object.values(prevSectionGenerations).length >=
            SENTENCE_GENERATIONS_PER_SECTION
        )
          return;
        Array.from({ length: SENTENCE_GENERATIONS_PER_SECTION }).map(() => {
          const generationId = nanoid();
          setGenerationProgress({
            generationId,
            isGenerating: true,
          });
          generateSentenceIfNeeded({
            template,
            generationId: generationId,
            sectionId: section.id,
          });
        });
      });
    },
    [
      generateSentenceIfNeeded,
      selectedTemplateGenerations,
      setGenerationProgress,
    ]
  );

  return useMemo(
    () => ({
      generations: selectedTemplateGenerations,
      isMissingDocumentParams,
      isMissingTemplateParams,
      regenerateSentencesIfNeeded,
      generateSentencesIfNeeded,
      generateSentenceIfNeeded,
    }),
    [
      selectedTemplateGenerations,
      isMissingDocumentParams,
      isMissingTemplateParams,
      regenerateSentencesIfNeeded,
      generateSentencesIfNeeded,
      generateSentenceIfNeeded,
    ]
  );
};

export default useGenerations;
