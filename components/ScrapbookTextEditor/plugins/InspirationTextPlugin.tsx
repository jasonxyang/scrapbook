import { memo, useEffect, useMemo, useRef } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { readInspiration, updateInspiration } from "@/jotai/inspirations/utils";
import {
  $getNodeByKey,
  LexicalCommand,
  createCommand,
  COMMAND_PRIORITY_LOW,
} from "lexical";
import {
  $isInspirationTextNode,
  InspirationTextNode,
} from "../nodes/InspirationTextNode";
import { readTemplate } from "@/jotai/templates/utils";
import { useAtom } from "jotai/react";
import { templatesByIdAtom } from "@/jotai/templates/atoms";
import { ScrapbookInspiration } from "@/types";

const DELETE_INSPIRATION_COMMAND: LexicalCommand<{
  inspirationId: string;
  nodeKeys: string[];
}> = createCommand("DELETE_INSPIRATION_COMMAND");

type InspirationTextPluginProps = { templateId: string };
const InspirationTextPlugin = ({ templateId }: InspirationTextPluginProps) => {
  const [editor] = useLexicalComposerContext();
  const [template] = useAtom(templatesByIdAtom(templateId));
  const inspirationsById = useMemo(
    () =>
      (template?.inspirationIds ?? []).reduce<{
        [id: string]: ScrapbookInspiration;
      }>((result, id) => {
        const inspiration = readInspiration({ inspirationId: id });
        if (!inspiration) return result;
        return { ...result, [id]: inspiration };
      }, {}),
    [template?.inspirationIds]
  );
  const prevInspirationsById = useRef(inspirationsById);

  useEffect(() => {
    return editor.registerCommand(
      DELETE_INSPIRATION_COMMAND,
      ({ inspirationId, nodeKeys }) => {
        editor.update(() => {
          nodeKeys.forEach((key) => {
            const node = $getNodeByKey(key);
            if (!node) return;
            if (!$isInspirationTextNode(node)) return;
            node.removeInspirationId(inspirationId);
          });
        });
        return false;
      },
      COMMAND_PRIORITY_LOW
    );
  }, [editor]);

  useEffect(
    function onTemplateInspirationChange() {
      Object.entries(prevInspirationsById.current).forEach(
        ([id, inspiration]) => {
          if (inspirationsById[id]) return;
          editor.dispatchCommand(DELETE_INSPIRATION_COMMAND, {
            nodeKeys: inspiration.nodeKeys,
            inspirationId: inspiration.id,
          });
        }
      );

      prevInspirationsById.current = inspirationsById;
    },
    [editor, inspirationsById]
  );

  useEffect(
    function onInspirationTextNodeMutation() {
      return editor.registerMutationListener(
        InspirationTextNode,
        (mutatedNodes) => {
          for (let [nodeKey, mutation] of mutatedNodes) {
            const template = readTemplate({ templateId });
            if (!template) return;
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
                      const sortedNodes = nodes
                        .filter((node) => !!node)
                        .sort((a, b) => {
                          if (!a || !b) throw new Error("node not found");
                          return a.isBefore(b) ? -1 : 1;
                        });
                      sortedNodes.forEach(
                        (node) =>
                          (newInspirationContent += node?.getTextContent())
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
    },
    [editor, templateId]
  );

  return null;
};

export default memo(InspirationTextPlugin);
