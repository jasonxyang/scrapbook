import { MouseEvent, memo, useCallback } from "react";
import classNames from "classnames";
import Button from "./generic/Button";
import { useScrapbookRouter } from "@/utils/client/useScrapbookRouter";
import { deleteDocument } from "@/jotai/documents/utils";
import { useAtom } from "jotai/react";
import { documentsByIdAtom } from "@/jotai/documents/atoms";

type DocumentCardProps = {
  documentId: string;
};
const DocumentCard = ({ documentId }: DocumentCardProps) => {
  const [document] = useAtom(documentsByIdAtom(documentId));
  const { goToDocument } = useScrapbookRouter();

  const handleDelete = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      e.preventDefault();
      deleteDocument({ documentId });
    },
    [documentId]
  );

  if (!document) return null;

  return (
    <>
      <div
        className={classNames(
          "outline-gray-400 outline-1 outline w-full h-full p-4 rounded-md cursor-pointer"
        )}
        onClick={() => goToDocument(documentId)}
      >
        <h4>{!!document.title ? document.title : "Untitled Document"}</h4>
        <div className="flex gap-2">
          <Button onClick={handleDelete}>Delete</Button>
        </div>
      </div>
    </>
  );
};

export default memo(DocumentCard);
