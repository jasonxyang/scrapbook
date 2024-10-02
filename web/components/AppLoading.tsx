import { inter } from "@/fonts";
import classNames from "classnames";
import { memo } from "react";

const AppLoading = () => {
  return (
    <main className="w-[100vw] h-[100vh] flex items-center justify-center">
      <div className={classNames(inter.className)}>Loading...</div>
    </main>
  );
};

export default memo(AppLoading);
