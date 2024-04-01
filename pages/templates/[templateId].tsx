import TemplateEditor from "@/components/TemplateEditor";
import { string } from "@recoiljs/refine";
import { useRouter } from "next/router";
import { memo } from "react";

const Templates_TemplateId = () => {
  const router = useRouter();
  const templateId = router.query.templateId;
  const templateIdIsValid = string()(templateId).type === "success";

  if (!templateIdIsValid) return null;
  return <TemplateEditor templateId={templateId as string} />;
};

export default memo(Templates_TemplateId);
