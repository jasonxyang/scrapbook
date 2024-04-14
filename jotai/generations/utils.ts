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
import { readInspiration } from "../inspirations/utils";
import { isEqual } from "lodash";
import { createHeadlessEditor } from "@lexical/headless";

export const generationIsStale = ({
  generationId,
}: {
  generationId: string;
}) => {
  const { get } = jotaiStore();
  const generation = get(generationsByIdAtom(generationId));
  if (!generation) return false;
  const template = readTemplate({ templateId: generation.templateId });
  if (!template) return false;
  const document = readDocument({ documentId: generation.documentId });
  if (!document) return false;

  const { params } = generation;
  const documentParamsIsStale =
    document.tone !== params.tone ||
    document.style !== params.style ||
    document.title !== params.title ||
    document.type !== params.type;

  if (documentParamsIsStale) return true;

  switch (generation.type) {
    case "sentence": {
      const { inspirationIds, params } = generation;
      const inspirationsIdsAreStale = !isEqual(
        new Set(inspirationIds),
        new Set(template.inspirationIds)
      );

      if (inspirationsIdsAreStale) return true;

      const generationInspirationContent = new Set(params.inspiration);
      const templateInspirationContent = new Set(
        template.inspirationIds.map(
          (id) => readInspiration({ inspirationId: id })?.content
        )
      );
      if (!isEqual(generationInspirationContent, templateInspirationContent))
        return true;
      return false;
    }
  }
};

export const generateSentence = async ({
  documentId,
  templateId,
  inspirationIds,
  params,
}: {
  documentId: string;
  templateId: string;
  inspirationIds: string[];
  params: ScrapbookSentenceGeneration["params"];
}) => {
  try {
    const response = await post<GenerateSentenceResponseData>(
      "/api/open_ai/generate_sentence",
      {
        documentId,
        templateId,
        inspirationIds,
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
  if (!prevGeneration) return;
  if (prevGeneration.type !== "sentence") return;
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
  if (!prevTemplate) return;
  const prevDocument = readDocument({ documentId: generation.documentId });
  if (!prevDocument) return;
  updateTemplate({
    templateId: generation.templateId,
    updates: {
      generationIds: Array.from(
        new Set([...prevTemplate.generationIds, generation.id])
      ),
    },
  });
  updateDocument({
    documentId: generation.documentId,
    updates: {
      generationIds: Array.from(
        new Set([...prevDocument.generationIds, generation.id])
      ),
    },
  });
  const prevGenerationIds = get(generationIdsAtom) ?? [];
  set(
    generationIdsAtom,
    Array.from(new Set([...prevGenerationIds, generation.id]))
  );
  set(generationsByIdAtom(generation.id), generation);
  return generation.id;
};

export const readGeneration = ({ generationId }: { generationId: string }) => {
  const { get } = jotaiStore();
  return get(generationsByIdAtom(generationId));
};

export const updateGeneration = <GenerationType>({
  generationId,
  updates,
}: {
  generationId: string;
  updates: Partial<GenerationType>;
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
  const prevGeneration = get(generationsByIdAtom(generationId));
  if (!prevGeneration) return;
  const prevTemplate = readTemplate({ templateId: prevGeneration.templateId });
  if (!prevTemplate) return;
  const prevDocument = readDocument({ documentId: prevGeneration.documentId });
  if (!prevDocument) return;
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

export const lexicalSerializedStateToTextContent = ({
  destination,
  serializedLexicalState,
}: {
  destination: { content: string };
  serializedLexicalState: string;
}) => {
  if (!serializedLexicalState) return "";
  const headlessEditor = createHeadlessEditor({
    nodes: [],
    onError: () => {},
  });

  headlessEditor.setEditorState(
    headlessEditor.parseEditorState(JSON.parse(serializedLexicalState))
  );

  headlessEditor.update(() => {
    console.log(serializedLexicalState);
    console.log(headlessEditor.getRootElement()?.textContent ?? "");
    destination.content = headlessEditor.getRootElement()?.textContent ?? "";
  });
};
