import templatesAtom from "@/recoil/templates/templates";
import { PropsWithChildren, memo, useCallback } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import Dialog from "./generic/Dialog";
import TemplateEditor from "./TemplateEditor";
import selectedTemplateAtom from "@/recoil/templates/selectedTemplate";
import classNames from "classnames";
import { selectedTemplateGenerationsSelector } from "@/recoil/generations/selectors";

type TemplateCardProps = {
  id: string;
};
const TemplateCard = ({ id }: TemplateCardProps) => {
  const [templates, setTemplates] = useRecoilState(templatesAtom);
  const [selectedTemplateId, setSelectedTemplateId] =
    useRecoilState(selectedTemplateAtom);
  const setSelectedTemplateGenerations = useSetRecoilState(
    selectedTemplateGenerationsSelector({ type: "sentence" })
  );
  const isSelected = id === selectedTemplateId;
  const template = templates?.[id];
  const handleDelete = useCallback(() => {
    setTemplates((prevTemplates) => {
      const newTemplates = { ...prevTemplates };
      delete newTemplates[id];
      return newTemplates;
    });
    setSelectedTemplateGenerations(undefined);
  }, [id, setSelectedTemplateGenerations, setTemplates]);

  const handleUseTemplate = useCallback(async () => {
    if (selectedTemplateId === id) setSelectedTemplateId(undefined);
    else {
      setSelectedTemplateId(id);
    }
  }, [id, selectedTemplateId, setSelectedTemplateId]);

  if (!template) return null;
  return (
    <div
      className={classNames(
        "outline-gray-400 outline-1 outline w-fit h-fit p-4 rounded-md",
        { ["outline-blue-800"]: isSelected }
      )}
    >
      <h4>{!!template.name ? template.name : "Template Draft"}</h4>
      <p>
        {!!template.description ? template.description : "Add a description..."}
      </p>
      <div className="flex gap-2">
        <EditTemplateDialog id={template.id}>
          <button className="outline-black outline-1 outline w-fit h-fit px-2 py-1 rounded-sm">
            Edit
          </button>
        </EditTemplateDialog>
        <button
          onClick={handleDelete}
          className="outline-black outline-1 outline w-fit h-fit px-2 py-1 rounded-sm"
        >
          Delete
        </button>
        <button
          onClick={handleUseTemplate}
          className="outline-black outline-1 outline w-fit h-fit px-2 py-1 rounded-sm"
        >
          Use template
        </button>
      </div>
    </div>
  );
};

type EditTemplateDialogProps = {
  id: string;
};
export const EditTemplateDialog = memo(
  ({ id, children }: PropsWithChildren<EditTemplateDialogProps>) => {
    const content = useCallback(() => <TemplateEditor templateId={id} />, [id]);

    return (
      <Dialog title="Edit Template" content={content()}>
        {children}
      </Dialog>
    );
  }
);
EditTemplateDialog.displayName = "EditTemplateDialog";

export default memo(TemplateCard);
