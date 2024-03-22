import { spaceGrotesk, spaceMono } from "@/fonts";
import classNames from "classnames";

export default function Home() {
  return (
    <>
      <main className={classNames(spaceGrotesk.variable, spaceMono.variable)}>
        <h1>Hello world</h1>
      </main>
    </>
  );
}
