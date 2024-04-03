import { documentIdsAtom, documentsByIdAtom } from "@/jotai/documents/atoms";
import { readDocument } from "@/jotai/documents/utils";
import {
  generationIdsAtom,
  generationsByIdAtom,
} from "@/jotai/generations/atoms";
import { readGeneration } from "@/jotai/generations/utils";
import {
  inspirationIdsAtom,
  inspirationsByIdAtom,
} from "@/jotai/inspirations/atoms";
import { readInspiration } from "@/jotai/inspirations/utils";
import { templateIdsAtom, templatesByIdAtom } from "@/jotai/templates/atoms";
import { readTemplate } from "@/jotai/templates/utils";
import {
  ScrapbookDocument,
  ScrapbookGeneration,
  ScrapbookInspiration,
  ScrapbookTemplate,
} from "@/types";
import { jotaiStore } from "@/utils/client/jotai";
import { useAtom } from "jotai/react";
import { memo, useEffect, useMemo } from "react";

const JotaiDebugger = () => {
  const [documentIds] = useAtom(documentIdsAtom);
  const [templateIds] = useAtom(templateIdsAtom);
  const [inspirationIds] = useAtom(inspirationIdsAtom);
  const [generationIds] = useAtom(generationIdsAtom);

  const { documentsById, documentSubscriptions } = useMemo(() => {
    const documentsById = documentIds.reduce<{
      [documentId: string]: ScrapbookDocument | undefined;
    }>((result, documentId) => {
      const document = readDocument({ documentId });
      return { ...result, [documentId]: document };
    }, {});
    const documentSubscriptions = documentIds.map((documentId) =>
      jotaiStore().sub(documentsByIdAtom(documentId), () => {
        const document = readDocument({ documentId });
        (window as any).jotai.documentsById[documentId] = document;
      })
    );
    return { documentsById, documentSubscriptions };
  }, [documentIds]);

  const { templatesById, templateSubscriptions } = useMemo(() => {
    const templatesById = templateIds.reduce<{
      [templateId: string]: ScrapbookTemplate | undefined;
    }>((result, templateId) => {
      const template = readTemplate({ templateId });
      return { ...result, [templateId]: template };
    }, {});
    const templateSubscriptions = templateIds.map((templateId) =>
      jotaiStore().sub(templatesByIdAtom(templateId), () => {
        const template = readTemplate({ templateId });
        (window as any).jotai.templatesById[templateId] = template;
      })
    );
    return { templatesById, templateSubscriptions };
  }, [templateIds]);

  const { inspirationsById, inspirationsSubscriptions } = useMemo(() => {
    const inspirationsById = inspirationIds.reduce<{
      [inspirationId: string]: ScrapbookInspiration | undefined;
    }>((result, inspirationId) => {
      const inspiration = readInspiration({ inspirationId });
      return { ...result, [inspirationId]: inspiration };
    }, {});
    const inspirationsSubscriptions = inspirationIds.map((inspirationId) =>
      jotaiStore().sub(inspirationsByIdAtom(inspirationId), () => {
        const inspiration = readInspiration({ inspirationId });
        (window as any).jotai.inspirationsById[inspirationId] = inspiration;
      })
    );

    return { inspirationsById, inspirationsSubscriptions };
  }, [inspirationIds]);

  const { generationsById, generationSubscriptions } = useMemo(() => {
    const generationsById = generationIds.reduce<{
      [generationId: string]: ScrapbookGeneration | undefined;
    }>((result, generationId) => {
      const generation = readGeneration({ generationId });
      return { ...result, [generationId]: generation };
    }, {});
    const generationSubscriptions = generationIds.map((generationId) =>
      jotaiStore().sub(generationsByIdAtom(generationId), () => {
        const generation = readGeneration({ generationId });
        (window as any).jotai.generationsById[generationId] = generation;
      })
    );
    return { generationsById, generationSubscriptions };
  }, [generationIds]);

  useEffect(() => {
    (window as any).jotai = {
      documentIds,
      templateIds,
      inspirationIds,
      generationIds,
      generationsById,
      inspirationsById,
      templatesById,
      documentsById,
    };
    return () => {
      generationSubscriptions.forEach((unsubscribe) => unsubscribe());
      inspirationsSubscriptions.forEach((unsubscribe) => unsubscribe());
      templateSubscriptions.forEach((unsubscribe) => unsubscribe());
      documentSubscriptions.forEach((unsubscribe) => unsubscribe());
    };
  }, [
    documentIds,
    documentSubscriptions,
    documentsById,
    generationIds,
    generationSubscriptions,
    generationsById,
    inspirationIds,
    inspirationsById,
    inspirationsSubscriptions,
    templateIds,
    templateSubscriptions,
    templatesById,
  ]);
  return null;
};

export default memo(JotaiDebugger);
