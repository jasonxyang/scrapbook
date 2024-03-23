import React from "react";
import { STYLES, Style } from "@/types";
import Panel from "./generic/Panel";
import { memo } from "react";

const TemplateSidePanel = () => {
  return (
    <div>
        <Panel key="" title="my title" content="my content" />
    </div>
  );
};

export default memo(TemplateSidePanel);
