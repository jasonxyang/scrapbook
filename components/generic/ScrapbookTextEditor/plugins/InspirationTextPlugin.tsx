import { memo, useEffect, useMemo } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { readInspiration, updateInspiration } from "@/jotai/inspirations/utils";
import { useAtom } from "jotai/react";
import { templatesByIdAtom } from "@/jotai/templates/atoms";
import { $getNodeByKey } from "lexical";
import { InspirationTextNode } from "../nodes/InspirationTextNode";

type InspirationTextPluginProps = { templateId: string };
const InspirationTextPlugin = ({ templateId }: InspirationTextPluginProps) => {
  const [template] = useAtom(templatesByIdAtom(templateId));
  const inspirations = useMemo(() => {
    if (!template) return [];
    return template.inspirationIds.map((inspirationId) =>
      readInspiration({ inspirationId })
    );
  }, [template]);

  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerMutationListener(
      InspirationTextNode,
      (mutatedNodes) => {
        for (let [nodeKey, mutation] of mutatedNodes) {
          switch (mutation) {
            case "destroyed": {
              console.log(`node ${nodeKey} destroyed`);
              const inspirationsWithNodeKey = inspirations.filter(
                (inspiration) =>
                  inspiration?.nodeKeys.some((key) => key === nodeKey)
              );
              inspirationsWithNodeKey.forEach((inspiration) => {
                if (inspiration) {
                  updateInspiration({
                    inspirationId: inspiration.id,
                    updates: {
                      nodeKeys: inspiration.nodeKeys.filter(
                        (key) => key !== nodeKey
                      ),
                    },
                  });
                }
              });
              break;
            }
            case "updated": {
              console.log(`node ${nodeKey} updated`);
              const inspirationsWithNodeKey = inspirations.filter(
                (inspiration) =>
                  inspiration?.nodeKeys.some((key) => key === nodeKey)
              );
              inspirationsWithNodeKey.forEach((inspiration) => {
                if (inspiration) {
                  let newInspirationContent = "";
                  editor.getEditorState().read(() => {
                    inspiration.nodeKeys.forEach(
                      (key) =>
                        (newInspirationContent +=
                          $getNodeByKey(key)?.getTextContent())
                    );
                  });
                  updateInspiration({
                    inspirationId: inspiration.id,
                    updates: {
                      content: newInspirationContent,
                    },
                  });
                }
              });
              break;
            }
          }
        }
      }
    );
  }, [editor, inspirations]);

  return null;
};

export default memo(InspirationTextPlugin);
