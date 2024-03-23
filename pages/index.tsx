import DocumentTitleInput from "@/components/DocumentTitleInput";
import StyleCheckboxGroup from "@/components/StyleCheckboxGroup";
import ToneCheckboxGroup from "@/components/ToneCheckboxGroup";
import { spaceGrotesk, spaceMono } from "@/fonts";
import classNames from "classnames";

export default function Home() {
  return (
    <>
      <main className={classNames(spaceGrotesk.variable, spaceMono.variable)}>
        <DocumentTitleInput />
        <h2>Style</h2>
        <StyleCheckboxGroup />
        <h2>Tone</h2>
        <ToneCheckboxGroup />
      </main>
    </>
  );
}
