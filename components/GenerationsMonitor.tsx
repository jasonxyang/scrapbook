import { documentsByIdAtom } from "@/jotai/documents/atoms";
import {
  generateSentence,
  generationIsStale,
  regenerateSentence,
} from "@/jotai/generations/utils";
import { getInspirationContent } from "@/jotai/inspirations/utils";
import { templatesByIdAtom } from "@/jotai/templates/atoms";
import { useAtom } from "jotai/react";
import { memo, useEffect } from "react";

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

  useEffect(() => {
    if (!document || !template) return;

    // case 1 no generations: create generations
    if (!document.generationIds.length) {
      Array.from({ length: 3 }).forEach(() => {
        generateSentence({
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
      generationIds.forEach((generationId) => {
        const isStale = generationIsStale({ generationId });
        if (isStale) {
          regenerateSentence({
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
  }, [document, documentId, template, templateId]);

  return null;
};

export default memo(GenerationsMonitor);
