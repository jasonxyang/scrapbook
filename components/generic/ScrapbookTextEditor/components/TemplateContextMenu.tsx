import {
  PropsWithChildren,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import ContextMenu, { ContextMenuItemProps } from "../../ContextMenu";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection } from "lexical";
import {
  $setSelectionInspirationId,
  $unsetSelectionInspirationId,
} from "../utils";
import { InspirationTextNode } from "../nodes/InspirationTextNode";

type TemplateContextMenuProps = {
  templateId: string;
};
const TemplateContextMenu = ({
  templateId,
  children,
}: PropsWithChildren<TemplateContextMenuProps>) => {
  const [editor] = useLexicalComposerContext();
  const [selectionHasInspirationNode, setSelectionHasInspirationNode] =
    useState(false);
  const [allNodesAreInspirationNodes, setAllNodesAreInspirationNodes] =
    useState(false);

  useEffect(() => {
    editor.getEditorState().read(() => {
      const selection = $getSelection();
      if (!selection) return;
      setSelectionHasInspirationNode(
        selection
          .getNodes()
          .some(
            (node) =>
              node instanceof InspirationTextNode &&
              node.getInspirationIds().length
          )
      );
      setAllNodesAreInspirationNodes(
        selection
          .getNodes()
          .every(
            (node) =>
              node instanceof InspirationTextNode &&
              node.getInspirationIds().length
          )
      );
    });
  });

  const handleDeleteInspiration = useCallback(() => {
    editor.update(() => {
      const selection = $getSelection();
      if (!selection) return;
      $unsetSelectionInspirationId(selection);
    });
  }, [editor]);

  const handleCreateInspiration = useCallback(() => {
    editor.update(() => {
      const selection = $getSelection();
      if (!selection) return;
      $setSelectionInspirationId(selection, templateId);
    });
  }, [editor, templateId]);

  const contextMenuItems = useMemo((): ContextMenuItemProps[] => {
    const items = [];
    if (!allNodesAreInspirationNodes)
      items.push({
        label: "Add inspiration",
        onClick: handleCreateInspiration,
      });

    if (selectionHasInspirationNode)
      items.push({
        label: "Delete inspiration",
        onClick: handleDeleteInspiration,
      });
    return items;
  }, [
    allNodesAreInspirationNodes,
    handleCreateInspiration,
    handleDeleteInspiration,
    selectionHasInspirationNode,
  ]);

  if (!templateId) return null;
  return <ContextMenu items={contextMenuItems}>{children}</ContextMenu>;
};

export default memo(TemplateContextMenu);
