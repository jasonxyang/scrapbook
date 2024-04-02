import { memo, useMemo } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HeadingNode } from "@lexical/rich-text";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { $generateHtmlFromNodes } from "@lexical/html";
import {
  $getRoot,
  EditorState,
  LexicalEditor,
  ParagraphNode,
  TextNode,
} from "lexical";
import { useCallback } from "react";
import { $generateNodesFromDOM } from "@lexical/html";
import { HeadingTagType } from "@lexical/rich-text";
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
  list: {
    nested: {
      listitem: "editor-nested-listitem",
    },
    ol: "editor-list-ol",
    ul: "editor-list-ul",
    listitem: "editor-listitem",
  },
  image: "editor-image",
  link: "editor-link",
  text: {
    bold: "editor-text-bold",
    italic: "editor-text-italic",
    overflowed: "editor-text-overflowed",
    hashtag: "editor-text-hashtag",
    underline: "editor-text-underline",
    strikethrough: "editor-text-strikethrough",
    underlineStrikethrough: "editor-text-underlineStrikethrough",
    code: "editor-text-code",
  },
  code: "editor-code",
  codeHighlight: {
    atrule: "editor-tokenAttr",
    attr: "editor-tokenAttr",
    boolean: "editor-tokenProperty",
    builtin: "editor-tokenSelector",
    cdata: "editor-tokenComment",
    char: "editor-tokenSelector",
    class: "editor-tokenFunction",
    "class-name": "editor-tokenFunction",
    comment: "editor-tokenComment",
    constant: "editor-tokenProperty",
    deleted: "editor-tokenProperty",
    doctype: "editor-tokenComment",
    entity: "editor-tokenOperator",
    function: "editor-tokenFunction",
    important: "editor-tokenVariable",
    inserted: "editor-tokenSelector",
    keyword: "editor-tokenAttr",
    namespace: "editor-tokenVariable",
    number: "editor-tokenProperty",
    operator: "editor-tokenOperator",
    prolog: "editor-tokenComment",
    property: "editor-tokenProperty",
    punctuation: "editor-tokenPunctuation",
    regex: "editor-tokenVariable",
    selector: "editor-tokenSelector",
    string: "editor-tokenSelector",
    symbol: "editor-tokenProperty",
    tag: "editor-tokenProperty",
    url: "editor-tokenOperator",
    variable: "editor-tokenVariable",
  },
};

type ScrapbookTextEditorProps = {
  id: string;
  type: "template" | "document";
};

const ScrapbookTextEditor = ({ id, type }: ScrapbookTextEditorProps) => {
  const templateId = type === "template" ? id : "";
  const documentId = type === "document" ? id : "";
  const [template] = useAtom(templatesByIdAtom(templateId));

  const initialState = useMemo(() => {
    if (type === "template" && template) return template.content;
    // if (type === "document" && document) return document.content;
  }, [template, type]);

  const initEditor = useCallback(
    (editor: LexicalEditor) => {
      editor.update(() => {
        if (initialState)
          editor.setEditorState(
            editor.parseEditorState(JSON.parse(initialState))
          );
      });
    },
    [initialState]
  );

  const onChange = useCallback(
    (editorState: EditorState, editor: LexicalEditor) => {
      editorState.read(() => {
        if (type === "template")
          updateTemplate({
            templateId,
            updates: { content: JSON.stringify(editorState.toJSON()) },
          });
        // if (type === "document")
        //   setDocumentContent(JSON.stringify(editorState.toJSON()));
      });
    },
    [templateId, type]
  );

  const editorConfig = useMemo(
    () => ({
      editorState: initEditor,
      namespace: `${type}-${id}`,
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
    [id, initEditor, templateId, type]
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
        <InspirationTextPlugin templateId={templateId} />
      </div>

      <HistoryPlugin />
      <OnChangePlugin onChange={onChange} />
      <OnSelectPlugin onSelect={() => {}} />
      <TreeViewPlugin />
    </LexicalComposer>
  );
};

export default memo(ScrapbookTextEditor);
