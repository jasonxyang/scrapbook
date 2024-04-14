import { documentsByIdAtom } from "@/jotai/documents/atoms";
import {
  generationIdsAtom,
  generationsByIdAtom,
} from "@/jotai/generations/atoms";
import {
  generateSentence,
  generationIsStale,
  readGeneration,
  regenerateSentence,
} from "@/jotai/generations/utils";
import { getInspirationContent } from "@/jotai/inspirations/utils";
import { templatesByIdAtom } from "@/jotai/templates/atoms";
import { ScrapbookGeneration } from "@/types";
import { jotaiStore } from "@/utils/client/jotai";
import { useAtom } from "jotai/react";
import { memo, useEffect, useMemo } from "react";

type GenerationsMonitorProps = {
  documentId: string;
  templateId: string;
};
const GenerationsMonitor = ({
  documentId,
  templateId,
}: GenerationsMonitorProps) => {
  const [document] = useAtom(documentsByIdAtom(documentId));
  const [template] = useAtom(templatesByIdAtom(templateId));
  const [generationIds] = useAtom(generationIdsAtom);

  const {
    generationsByType,
    generationsByDocumentId,
    generationSubscriptions,
  } = useMemo(() => {
    const generationsByDocumentId = generationIds.reduce<{
      [generationId: string]: ScrapbookGeneration[] | undefined;
    }>((result, generationId) => {
      const generation = readGeneration({ generationId });
      if (!generation?.documentId) return result;
      return {
        ...result,
        [generation.documentId]: [
          ...(result[generation.documentId] ?? []),
          generation,
        ],
      };
    }, {});

    const generationsByType = generationIds.reduce<{
      [generationId: string]: ScrapbookGeneration[] | undefined;
    }>((result, generationId) => {
      const generation = readGeneration({ generationId });
      if (!generation?.type) return result;
      return {
        ...result,
        [generation.type]: [...(result[generation.type] ?? []), generation],
      };
    }, {});
    const generationSubscriptions = generationIds.map((generationId) =>
      jotaiStore().sub(generationsByIdAtom(generationId), () => {
        const generation = readGeneration({ generationId });
        (window as any).jotai.generationsById[generationId] = generation;
      })
    );
    return {
      generationsByDocumentId,
      generationSubscriptions,
      generationsByType,
    };
  }, [generationIds]);

  useEffect(
    function generateSentencesIfNeeded() {
      (async () => {
        if (!document || !template) return;
        // case 1 no generations: create generations
        if (!generationsByDocumentId[documentId]?.length) {
          Array.from({ length: 3 }).forEach(async () => {
            await generateSentence({
              documentId,
              templateId,
              inspirationIds: template.inspirationIds,
              params: {
                title: document.title,
                type: document.type,
                tone: document.tone,
                style: document.style,
                inspiration: template.inspirationIds.map((id) =>
                  getInspirationContent({ inspirationId: id })
                ),
              },
            });
          });
        }

        // case 2 generations exist
        else {
          const generationIds = document.generationIds;
          generationIds.forEach(async (generationId) => {
            const isStale = generationIsStale({ generationId });
            if (isStale) {
              await regenerateSentence({
                generationId,
                params: {
                  title: document.title,
                  type: document.type,
                  tone: document.tone,
                  style: document.style,
                  inspiration: template.inspirationIds.map((id) =>
                    getInspirationContent({ inspirationId: id })
                  ),
                },
              });
            }
          });
        }
      })();
    },
    [document, documentId, generationsByDocumentId, template, templateId]
  );

  useEffect(
    function cleanupSubscriptions() {
      return () => {
        generationSubscriptions.forEach((unsubscribe) => unsubscribe());
      };
    },
    [generationSubscriptions]
  );

  return null;
};

export default memo(GenerationsMonitor);
