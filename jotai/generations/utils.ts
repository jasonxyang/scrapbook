import { jotaiStore } from "../../utils/client/jotai";
import {
  ScrapbookGeneration,
  ScrapbookGenerationProgress,
  ScrapbookSentenceGeneration,
} from "@/types";
import { post } from "@/utils/client/fetch";
import {
  GenerateSentenceRequestBody,
  GenerateSentenceResponseData,
} from "@/pages/api/open_ai/generate_sentence";
import {
  generationIdsAtom,
  generationProgressesByGenerationIdAtom,
  generationsByIdAtom,
} from "./atoms";
import { RESET } from "jotai/utils";
import { readTemplate, updateTemplate } from "../templates/utils";
import { readDocument, updateDocument } from "../documents/utils";

export const generateSentence = async ({
  documentId,
  templateId,
  params,
}: {
  documentId: string;
  templateId: string;
  params: ScrapbookSentenceGeneration["params"];
}) => {
  try {
    const response = await post<GenerateSentenceResponseData>(
      "/api/open_ai/generate_sentence",
      {
        documentId,
        templateId,
        params,
      } satisfies GenerateSentenceRequestBody
    );
    if (response.successs && response.data) {
      const generation = response.data;
      createGeneration({ generation });
      return generation.id;
    }
  } catch (error) {
    console.error("generateSentence error", error);
  }
};

export const regenerateSentence = async ({
  generationId,
  params,
}: {
  generationId: string;
  params?: ScrapbookSentenceGeneration["params"];
}) => {
  const { get } = jotaiStore();
  const prevGeneration = get(generationsByIdAtom(generationId));
  if (!prevGeneration)
    throw new Error("Tried to regenerate but generation not found");
  try {
    const response = await post<GenerateSentenceResponseData>(
      "/api/open_ai/generate_sentence",
      {
        ...prevGeneration,
        existingId: generationId,
        params: params ?? prevGeneration.params,
      } satisfies GenerateSentenceRequestBody
    );
    if (response.successs && response.data) {
      const generation = response.data;
      updateGeneration({ generationId, updates: generation });
    }
  } catch (error) {
    console.error("regenerateSentence error", error);
  }
};

export const createGeneration = ({
  generation,
}: {
  generation: ScrapbookGeneration;
}) => {
  const { get, set } = jotaiStore();
  const prevTemplate = readTemplate({ templateId: generation.templateId });
  if (!prevTemplate) throw new Error("Template not found");
  const prevDocument = readDocument({ documentId: generation.documentId });
  if (!prevDocument) throw new Error("Document not found");
  updateTemplate({
    templateId: generation.templateId,
    updates: { generationIds: [...prevTemplate.generationIds, generation.id] },
  });
  updateDocument({
    documentId: generation.documentId,
    updates: { generationIds: [...prevDocument.generationIds, generation.id] },
  });
  const prevGenerationIds = get(generationIdsAtom) ?? [];
  set(generationIdsAtom, [...prevGenerationIds, generation.id]);
  set(generationsByIdAtom(generation.id), generation);
  return generation.id;
};

export const readGeneration = ({ generationId }: { generationId: string }) => {
  const { get } = jotaiStore();
  return get(generationsByIdAtom(generationId));
};

export const updateGeneration = ({
  generationId,
  updates,
}: {
  generationId: string;
  updates: Partial<ScrapbookGeneration>;
}) => {
  const { set } = jotaiStore();
  const prevGeneration = readGeneration({ generationId });
  if (!prevGeneration) return;
  set(generationsByIdAtom(generationId), { ...prevGeneration, ...updates });
};

export const deleteGeneration = ({
  generationId,
}: {
  generationId: string;
}) => {
  const { get, set } = jotaiStore();
  const prevTemplate = readTemplate({ templateId: generationId });
  if (!prevTemplate) throw new Error("Template not found");
  const prevDocument = readDocument({ documentId: generationId });
  if (!prevDocument) throw new Error("Document not found");
  updateTemplate({
    templateId: generationId,
    updates: {
      generationIds: prevTemplate.generationIds.filter(
        (id) => id !== generationId
      ),
    },
  });
  updateDocument({
    documentId: generationId,
    updates: {
      generationIds: prevDocument.generationIds.filter(
        (id) => id !== generationId
      ),
    },
  });
  const prevGenerationIds = get(generationIdsAtom) ?? [];
  set(
    generationIdsAtom,
    prevGenerationIds.filter((id) => id !== generationId)
  );
  set(generationsByIdAtom(generationId), RESET);
};

export const createGenerationProgress = ({
  generationId,
}: {
  generationId: string;
}) => {
  const { set } = jotaiStore();
  set(generationProgressesByGenerationIdAtom(generationId), {
    generationId: generationId,
    status: "pending",
  });
};

export const readGenerationProgress = ({
  generationId,
}: {
  generationId: string;
}) => {
  const { get } = jotaiStore();
  return get(generationProgressesByGenerationIdAtom(generationId));
};

export const updateGenerationProgress = ({
  generationId,
  updates,
}: {
  generationId: string;
  updates: Partial<ScrapbookGenerationProgress>;
}) => {
  const { set } = jotaiStore();
  const prevProgress = readGenerationProgress({ generationId });
  if (!prevProgress) return;
  set(generationProgressesByGenerationIdAtom(generationId), {
    ...prevProgress,
    ...updates,
  });
};

export const deleteGenerationProgress = ({
  generationId,
}: {
  generationId: string;
}) => {
  const { set } = jotaiStore();
  set(generationProgressesByGenerationIdAtom(generationId), RESET);
};
