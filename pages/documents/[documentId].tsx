import EditDocument from "@/components/EditDocument";
import { string } from "@recoiljs/refine";
import { useRouter } from "next/router";
import { memo } from "react";

const Documents_DocumentId = () => {
  const router = useRouter();
  const documentId = router.query.documentId;
  const documentIdIsValid = string()(documentId).type === "success";

  if (!documentIdIsValid) return null;
  return <EditDocument documentId={documentId as string} />;
};

export default memo(Documents_DocumentId);
