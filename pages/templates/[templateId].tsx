import EditTemplate from "@/components/EditTemplate";
import { useRouter } from "next/router";
import { memo } from "react";

const Templates_TemplateId = () => {
  const router = useRouter();
  const templateId = router.query.templateId;
  const templateIdIsValid = typeof templateId === "string";

  if (!templateIdIsValid) return null;
  return <EditTemplate templateId={templateId as string} />;
};

export default memo(Templates_TemplateId);
