import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface RichTextEditorProps {
  text: string;
  onTextChange: (newText: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  text,
  onTextChange,
}) => {
  useEffect(() => {
    const editor = document.querySelector(".ql-editor");

    const handleTabKeyPress = (event: KeyboardEvent) => {
      if (
        event.shiftKey &&
        event.code === "BracketRight" && // Code for "]"
        window.getSelection()?.toString() !== ""
      ) {
        event.preventDefault();

        // Show tooltip at cursor position
        // You can replace this with your tooltip logic
        console.log("Tooltip should appear now");
      }
    };

    editor?.addEventListener("keydown", handleTabKeyPress as EventListener);
    return () => {
      editor?.removeEventListener(
        "keydown",
        handleTabKeyPress as EventListener
      );
    };
  }, []);

  const handleChange = (content: string) => {
    onTextChange(content);
  };

  return <ReactQuill value={text} onChange={handleChange} />;
};

export default RichTextEditor;
