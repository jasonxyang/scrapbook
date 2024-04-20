import { documentIdsAtom } from "@/jotai/documents/atoms";
import { createDocument } from "@/jotai/documents/utils";
import { useScrapbookRouter } from "@/utils/client/useScrapbookRouter";
import { useAtom } from "jotai/react";
import { memo, useCallback } from "react";
import DocumentCard from "./DocumentCard";
import Button from "./generic/Button";

const DocumentsHome = () => {
  const [documentIds] = useAtom(documentIdsAtom);

  const { goToDocument } = useScrapbookRouter();

  const handleCreateDocument = useCallback(() => {
    const newDocumentId = createDocument();
    goToDocument(newDocumentId);
  }, [goToDocument]);

  if (!documentIds.length)
    return (
      <div className="w-full flex flex-col items-center justify-center">
        No documents found.
        <Button onClick={handleCreateDocument}>Create new Document</Button>
      </div>
    );

  return (
    <div className="p-2 flex flex-col gap-4">
      <div>
        <Button onClick={handleCreateDocument}>Create new Document</Button>
      </div>
      <div className=" grid grid-cols-5 w-full gap-4">
        {documentIds.map((documentId, index) => {
          return <DocumentCard key={index} documentId={documentId} />;
        })}
      </div>
    </div>
  );
};
export default memo(DocumentsHome);
