import { memo, useMemo } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HeadingNode } from "@lexical/rich-text";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { EditorState, LexicalEditor, ParagraphNode } from "lexical";
import { useCallback } from "react";
import TreeViewPlugin from "./plugins/TreeViewPlugin";
import OnSelectPlugin from "./plugins/OnSelectPlugin";
import classNames from "classnames";
import { inter } from "@/fonts";
import { useAtom } from "jotai/react";
import { documentsByIdAtom } from "@/jotai/documents/atoms";
import { updateDocument } from "@/jotai/documents/utils";

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

type DocumentEditorProps = {
  documentId: string;
};

const DocumentEditor = ({ documentId }: DocumentEditorProps) => {
  const [document] = useAtom(documentsByIdAtom(documentId));

  const initEditor = useCallback(
    (editor: LexicalEditor) => {
      editor.update(() => {
        if (document?.content)
          editor.setEditorState(
            editor.parseEditorState(JSON.parse(document.content))
          );
      });
    },
    [document?.content]
  );

  const onChange = useCallback(
    (editorState: EditorState) => {
      editorState.read(() => {
        updateDocument({
          documentId,
          updates: { content: JSON.stringify(editorState.toJSON()) },
        });
      });
    },
    [documentId]
  );

  const editorConfig = useMemo(
    () => ({
      editorState: initEditor,
      namespace: `document-${documentId}`,
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
      nodes: [HeadingNode, ParagraphNode],
    }),
    [documentId, initEditor]
  );

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="relative p-4">
        {/* <TemplateContextMenu templateId={documentId}> */}
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
        {/* </TemplateContextMenu> */}
        {/* <InspirationTextPlugin templateId={documentId} /> */}
      </div>

      <HistoryPlugin />
      <OnChangePlugin onChange={onChange} />
      <OnSelectPlugin onSelect={() => {}} />
      <TreeViewPlugin />
    </LexicalComposer>
  );
};

export default memo(DocumentEditor);
