import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  COMMAND_PRIORITY_NORMAL,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import { memo, useLayoutEffect } from "react";

type OnSelectPluginProps = {
  onSelect?: (selection: string) => void;
};
const OnSelectPlugin = ({ onSelect }: OnSelectPluginProps) => {
  const [editor] = useLexicalComposerContext();

  useLayoutEffect(() => {
    if (onSelect) {
      return editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          const selection = $getSelection()?.getTextContent();
          if (selection) onSelect(selection);
          return true;
        },
        COMMAND_PRIORITY_NORMAL
      );
    }
  }, [editor, onSelect]);

  return null;
};

export default memo(OnSelectPlugin);
