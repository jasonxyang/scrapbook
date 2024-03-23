import DocumentTypeSelect from "@/components/DocumentTypeSelect";
import DocumentTitleInput from "@/components/DocumentTitleInput";
import StyleCheckboxGroup from "@/components/StyleCheckboxGroup";
import ToneCheckboxGroup from "@/components/ToneCheckboxGroup";
import TemplateSidePanel from "@/components/TemplateSidePanel";
import ScrapbookPanel from "@/components/ScrapbookPanel";
import { spaceGrotesk, spaceMono } from "@/fonts";
import classNames from "classnames";
import TemplateSection from "@/components/TemplateSection";

export default function Home() {
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
        </div>
        <hr></hr>
        <div className="flex w-screen">
          <TemplateSidePanel />
          <ScrapbookPanel />
        </div>

        <TemplateSection />
      </main>
    </>
  );
}
