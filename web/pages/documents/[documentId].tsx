import EditDocument from "@/components/EditDocument";
import { useRouter } from "next/router";
import { memo } from "react";

const Documents_DocumentId = () => {
  const router = useRouter();
  const documentId = router.query.documentId;
  const documentIdIsValid = typeof documentId === "string";

  if (!documentIdIsValid) return null;
  return <EditDocument documentId={documentId as string} />;
};

export default memo(Documents_DocumentId);
