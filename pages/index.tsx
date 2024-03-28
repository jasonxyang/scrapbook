import DocumentTypeSelect from "@/components/DocumentTypeSelect";
import DocumentTitleInput from "@/components/DocumentTitleInput";
import StyleCheckboxGroup from "@/components/StyleCheckboxGroup";
import ToneCheckboxGroup from "@/components/ToneCheckboxGroup";
import TemplatePanel from "@/components/TemplatePanel";
import GenerationPanel from "@/components/GenerationPanel";
import RichTextEditor from "@/components/RichTextEditor";
import TemplateSection from "@/components/TemplateSection";
import React, { useState } from "react";
import GenerationsMonitor from "@/components/GenerationsMonitor";

export default function Home() {
  const [editorText, setEditorText] = useState("Initial text");

  return (
    <>
      <GenerationsMonitor />
      <div className="px-5 py-5">
        <DocumentTitleInput />
        <DocumentTypeSelect />
        <div className="block py-2">
          <label className="font-bold inline-block">Style</label>
          <StyleCheckboxGroup />
        </div>
        <div className="block py-2">
          <label className="font-bold inline-block">Tone</label>
          <ToneCheckboxGroup />
        </div>
        <div className="block py-2">
          <TemplateSection />
        </div>
      </div>
      <hr></hr>
      <div className="flex w-full gap-4">
        <div className="w-[20%]">
          <TemplatePanel />
        </div>
        <div className="w-[60%]">
          <RichTextEditor text={editorText} onTextChange={setEditorText} />
        </div>
        <div className="w-[20%]">
          <GenerationPanel />
        </div>
      </div>
    </>
  );
}
