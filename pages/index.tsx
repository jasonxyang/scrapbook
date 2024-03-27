import DocumentTypeSelect from "@/components/DocumentTypeSelect";
import DocumentTitleInput from "@/components/DocumentTitleInput";
import StyleCheckboxGroup from "@/components/StyleCheckboxGroup";
import ToneCheckboxGroup from "@/components/ToneCheckboxGroup";
import TemplatePanel from "@/components/TemplatePanel";
// import ScrapbookPanel from "@/components/ScrapbookPanel";
import RichTextEditor from "@/components/RichTextEditor";
import { spaceGrotesk, spaceMono } from "@/fonts";
import classNames from "classnames";
import HTMLTemplateSection from "@/components/TemplateSection";
import React, { useState } from "react";

export default function Home() {
  const [editorText, setEditorText] = useState("Initial text");

  return (
    <>
      <main className={classNames(spaceGrotesk.variable, spaceMono.variable)}>
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
            <HTMLTemplateSection />
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
            {/* <ScrapbookPanel /> */}
          </div>
        </div>
      </main>
    </>
  );
}