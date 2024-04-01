// import React, { useCallback } from "react";
// import { memo } from "react";
// import { selectedTemplateSelector } from "@/recoil/templates/selectors";
// import { useRecoilValue } from "recoil";
// import { ScrapbookTemplate } from "@/types";

// const TemplatePanel = () => {
//   const selectedTemplate = useRecoilValue(selectedTemplateSelector);

//   const renderEmptyState = useCallback(() => {
//     return <div>No template selected</div>;
//   }, []);

//   return (
//     <div>
//       {!selectedTemplate ? (
//         renderEmptyState()
//       ) : (
//         <TemplateOutline template={selectedTemplate} />
//       )}
//     </div>
//   );
// };

// type TemplateOutlineProps = {
//   template: ScrapbookTemplate;
// };

// const TemplateOutline = memo(({ template }: TemplateOutlineProps) => {
//   return (
//     <div>
//       <h4>{template.name}</h4>
//       <div className="flex flex-col gap-4"></div>
//     </div>
//   );
// });
// TemplateOutline.displayName = "TemplateOutline";
// export default memo(TemplatePanel);
