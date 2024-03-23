import React, { useState } from "react";
import { STYLES, Style } from "@/types";
import Panel from "./generic/Panel";
import { memo } from "react";
import RichTextEditor from './RichTextEditor';
import { Quill } from "react-quill";

interface ScrapbookPanelProps {
  editorText: string;
  setEditorText: React.Dispatch<React.SetStateAction<string>>;
}

const ScrapbookPanel: React.FC<ScrapbookPanelProps> = ({ editorText, setEditorText }) => {
  const handleInsertText = () => {
    // Update the state to insert text into the editor
    setEditorText("change text to this");
    // console.log("Inserted text:", editorText);
  };

  return (
    <div>
        <Panel key="" title="my title" content="my content" />
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
          onClick={handleInsertText}>
            Copy and Paste
        </button>
    </div>
  );
};

export default memo(ScrapbookPanel);
