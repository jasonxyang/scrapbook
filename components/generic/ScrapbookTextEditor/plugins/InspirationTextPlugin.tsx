import { memo, useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { readInspiration, updateInspiration } from "@/jotai/inspirations/utils";
import { $getNodeByKey } from "lexical";
import { InspirationTextNode } from "../nodes/InspirationTextNode";
import { readTemplate } from "@/jotai/templates/utils";

type InspirationTextPluginProps = { templateId: string };
const InspirationTextPlugin = ({ templateId }: InspirationTextPluginProps) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerMutationListener(
      InspirationTextNode,
      (mutatedNodes) => {
        for (let [nodeKey, mutation] of mutatedNodes) {
          const template = readTemplate({ templateId });
          if (!template) throw new Error("Template not found");
          const inspirations = template.inspirationIds.map((id) =>
            readInspiration({ inspirationId: id })
          );
          const inspirationsWithNodeKey = inspirations.filter((inspiration) =>
            inspiration?.nodeKeys.some((key) => key === nodeKey)
          );
          switch (mutation) {
            case "destroyed": {
              inspirationsWithNodeKey.forEach((inspiration) => {
                if (inspiration) {
                  console.log(
                    `node ${nodeKey} destroy handler:  removing node ${nodeKey} from inspiration ${inspiration?.id}`
                  );
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
              inspirationsWithNodeKey.forEach((inspiration) => {
                if (inspiration) {
                  let newInspirationContent = "";
                  editor.getEditorState().read(() => {
                    const nodes = inspiration.nodeKeys.map((key) =>
                      $getNodeByKey(key)
                    );
                    const sortedNodes = nodes.sort((a, b) => {
                      if (!a || !b) throw new Error("node not found");
                      return a.isBefore(b) ? -1 : 1;
                    });
                    sortedNodes.forEach(
                      (node) =>
                        (newInspirationContent += node?.getTextContent())
                    );
                  });
                  console.log(
                    `node ${nodeKey} update handler: updating inspiration ${inspiration?.id} with content ${newInspirationContent}`
                  );
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
  }, [editor, templateId]);

  return null;
};

export default memo(InspirationTextPlugin);
