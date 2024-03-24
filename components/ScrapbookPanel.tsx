import React, { useEffect, useState } from "react";
import { STYLES, Style } from "@/types";
import Panel from "./generic/Panel";
import { memo } from "react";
import RichTextEditor from './RichTextEditor';
import { Quill } from "react-quill";
import OpenAI from "openai";

interface ScrapbookPanelProps {
  editorText: string;
  setEditorText: React.Dispatch<React.SetStateAction<string>>;
}

const ScrapbookPanel: React.FC<ScrapbookPanelProps> = ({ editorText, setEditorText }) => {
  const handleInsertText = () => {
    // Update the state to insert text into the editor
    setEditorText(finalData);
    // console.log("Inserted text:", editorText);
  };

  const generateText = () => {
    // Update the state to insert text into the editor
    // setEditorText("change text to this");
    console.log("Generate new text from ChatGPT");
  };


  const [finalData, setFinalData] = useState("Loading...");

const openai = new OpenAI({ apiKey: 'API-KEY', dangerouslyAllowBrowser: true });

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "Make a sentence based on but not needing to use all the following keywords: in conclusion, studies show, indicate, potential, computer science" }],
    model: "gpt-3.5-turbo",
  });

  // console.log(completion.choices[0]);
  console.log(completion.choices[0]['message']['content']);
  return completion;
}

useEffect(() => {
  main().then((completion) => {
    const content = completion.choices[0]['message']['content'];
    setFinalData(content || ''); // Ensure that content is not null
  }).catch((error) => {
    console.error('Error:', error);
    setFinalData('Failed to fetch data');
  });
}, []);


  return (
    <div>
        {/* <Panel key="" title="my title" content="my content" /> */}
        <p>{finalData}</p>
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
          onClick={handleInsertText}>
            Copy and Paste
        </button>
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={main}>
            Change Text
        </button>
    </div>
  );
};

export default memo(ScrapbookPanel);
