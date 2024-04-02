import { MouseEvent, memo, useCallback } from "react";
import classNames from "classnames";
import Button from "./generic/Button";
import { useScrapbookRouter } from "@/utils/client/useScrapbookRouter";
import { deleteTemplate } from "@/jotai/templates/utils";
import { useAtom } from "jotai/react";
import { templatesByIdAtom } from "@/jotai/templates/atoms";

type TemplateCardProps = {
  templateId: string;
};
const TemplateCard = ({ templateId }: TemplateCardProps) => {
  const [template] = useAtom(templatesByIdAtom(templateId));
  const { goToTemplate } = useScrapbookRouter();

  const handleDelete = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      e.preventDefault();
      deleteTemplate({ templateId });
    },
    [templateId]
  );

  if (!template) return null;

  return (
    <>
      <div
        className={classNames(
          "outline-gray-400 outline-1 outline w-fit h-fit p-4 rounded-md cursor-pointer"
        )}
        onClick={() => goToTemplate(templateId)}
      >
        <h4>{!!template.name ? template.name : "Untitled Template"}</h4>
        <p>
          {!!template.description
            ? template.description
            : "Add a description..."}
        </p>
        <div className="flex gap-2">
          <Button onClick={handleDelete}>Delete</Button>
        </div>
      </div>
    </>
  );
};

export default memo(TemplateCard);
