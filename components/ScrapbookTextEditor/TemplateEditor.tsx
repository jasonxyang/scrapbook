import { memo, useMemo } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HeadingNode } from "@lexical/rich-text";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { EditorState, LexicalEditor, ParagraphNode, TextNode } from "lexical";
import { useCallback } from "react";
import TreeViewPlugin from "./plugins/TreeViewPlugin";
import OnSelectPlugin from "./plugins/OnSelectPlugin";
import TemplateContextMenu from "./components/TemplateContextMenu";
import classNames from "classnames";
import { inter } from "@/fonts";
import { InspirationTextNode } from "./nodes/InspirationTextNode";
import InspirationTextPlugin from "./plugins/InspirationTextPlugin";
import { useAtom } from "jotai/react";
import { templatesByIdAtom } from "@/jotai/templates/atoms";
import { updateTemplate } from "@/jotai/templates/utils";

const richTextEditorClassName = {
  h1: "",
  h2: "",
  h3: "",
  h4: "",
  h5: "",
};

const exampleTheme = {
  ltr: "ltr",
  rtl: "rtl",
  placeholder: "editor-placeholder",
  paragraph: "editor-paragraph",
  quote: "editor-quote",
  heading: {
    h1: richTextEditorClassName.h1,
    h2: richTextEditorClassName.h2,
    h3: richTextEditorClassName.h3,
    h4: richTextEditorClassName.h4,
    h5: richTextEditorClassName.h5,
  },
};

type ScrapbookTextEditorProps = {
  templateId: string;
  editable?: boolean;
};

const TemplateEditor = ({ templateId, editable }: ScrapbookTextEditorProps) => {
  const [template] = useAtom(templatesByIdAtom(templateId));

  const initEditor = useCallback(
    (editor: LexicalEditor) => {
      editor.update(() => {
        if (template?.content)
          editor.setEditorState(
            editor.parseEditorState(JSON.parse(template.content))
          );
      });
    },
    [template?.content]
  );

  const onChange = useCallback(
    (editorState: EditorState, editor: LexicalEditor) => {
      editorState.read(() => {
        updateTemplate({
          templateId,
          updates: { content: JSON.stringify(editorState.toJSON()) },
        });
      });
    },
    [templateId]
  );

  const editorConfig = useMemo(
    () => ({
      editorState: initEditor,
      editable,
      namespace: `template-${templateId}`,
      // The editor theme
      theme: {
        heading: {
          // h1: styles.h1,
          // h2: styles.h2,
          // h3: styles.h3,
        },
        paragraph: "",
        list: {
          // ol: styles.ol,
          // ul: styles.ul,
          // listitem: styles.listItem,
        },
        text: {
          // bold: styles.bold,
          // italic: styles.italic,
          // underline: styles.underline,
          // strikethrough: styles.strikethrough,
          // underlineStrikethrough: styles.underlineStrikethrough,
        },
      },
      // Handling of errors during update
      onError(error: any) {
        throw error;
      },
      // Any custom nodes go here
      nodes: [
        HeadingNode,
        ParagraphNode,
        InspirationTextNode,
        {
          replace: TextNode,
          with: (node: TextNode) =>
            new InspirationTextNode(node.getTextContent(), templateId, []),
        },
      ],
    }),
    [initEditor, editable, templateId]
  );

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="relative p-4">
        <TemplateContextMenu templateId={templateId}>
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className={classNames(inter.className, "outline-none")}
              />
            }
            placeholder={
              <div
                className={classNames(
                  inter.className,
                  "absolute top-0 left-0 pointer-events-none p-4 text-gray-400"
                )}
              >
                Copy and paste your inspiration...
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        </TemplateContextMenu>
      </div>

      {editable && <InspirationTextPlugin templateId={templateId} />}
      {editable && <HistoryPlugin />}
      {editable && <OnChangePlugin onChange={onChange} />}
      {editable && <TreeViewPlugin />}
    </LexicalComposer>
  );
};

export default memo(TemplateEditor);
