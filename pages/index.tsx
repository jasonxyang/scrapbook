import StyleCheckboxGroup from "@/components/StyleCheckboxGroup";
import Checkbox from "@/components/generic/checkbox";
import { spaceGrotesk, spaceMono } from "@/fonts";
import classNames from "classnames";

export default function Home() {
  return (
    <>
      <main className={classNames(spaceGrotesk.variable, spaceMono.variable)}>
        <h2>Style</h2>
        <StyleCheckboxGroup />
      </main>
    </>
  );
}
