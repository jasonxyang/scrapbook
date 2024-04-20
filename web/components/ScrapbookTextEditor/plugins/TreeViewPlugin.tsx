import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { TreeView } from "@lexical/react/LexicalTreeView";
import * as React from "react";
import { memo } from "react";

const TreeViewPlugin = () => {
  const [editor] = useLexicalComposerContext();
  return (
    <TreeView
      viewClassName="bg-gray-100"
      treeTypeButtonClassName=""
      timeTravelPanelClassName=""
      timeTravelButtonClassName=""
      timeTravelPanelSliderClassName=""
      timeTravelPanelButtonClassName=""
      editor={editor}
    />
  );
};

export default memo(TreeViewPlugin);
