import React, { useCallback } from "react";

import Panel from "./generic/Panel";
import { memo } from "react";
import { selectedTemplateSelector } from "@/recoil/template/selectors";
import { useRecoilValue } from "recoil";
import { Template } from "@/types";

const TemplatePanel = () => {
  const selectedTemplate = useRecoilValue(selectedTemplateSelector);
  console.log(selectedTemplate);

  const renderEmptyState = useCallback(() => {
    return <div>No template selected</div>;
  }, []);

  return (
    <div>
      {!selectedTemplate ? (
        renderEmptyState()
      ) : (
        <TemplateOutline template={selectedTemplate} />
      )}
    </div>
  );
};

type TemplateOutlineProps = {
  template: Template;
};
const TemplateOutline = memo(({ template }: TemplateOutlineProps) => {
  return (
    <div>
      <div>{template.name}</div>
      {template.sections.map((section, index) => (
        <div key={index}>{section.title}</div>
      ))}
    </div>
  );
});
TemplateOutline.displayName = "TemplateOutline";
export default memo(TemplatePanel);
