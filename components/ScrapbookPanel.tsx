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

  // const generateText = () => {
  //   // Update the state to insert text into the editor
  //   // setEditorText("change text to this");
  //   console.log("Generate new text from ChatGPT");
  // };

  const generateText = async () => {
    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions'); // Replace '/api/your-endpoint' with the actual API endpoint URL
      if (!res.ok) {
        throw new Error('Failed to generate text');
      }
      const data = await res.json();
      setEditorText(data.status);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div>
        <Panel key="" title="my title" content="my content" />
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
          onClick={handleInsertText}>
            Copy and Paste
        </button>
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
          onClick={generateText}>
            Change Text
        </button>
    </div>
  );
};

export default memo(ScrapbookPanel);
