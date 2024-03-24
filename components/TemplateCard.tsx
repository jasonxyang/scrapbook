import templatesAtom from "@/recoil/template/templates";
import { PropsWithChildren, memo, useCallback } from "react";
import { useRecoilState } from "recoil";
import Dialog from "./generic/Dialog";
import { templateSelector } from "@/recoil/template/selectors";
import TemplateEditor from "./TemplateEditor";

type TemplateCardProps = {
  id: string;
};
const TemplateCard = ({ id }: TemplateCardProps) => {
  const [templates, setTemplates] = useRecoilState(templatesAtom);
  const template = templates?.[id];
  const handleDelete = useCallback(() => {
    setTemplates((prevTemplates) => {
      const newTemplates = { ...prevTemplates };
      delete newTemplates[id];
      return newTemplates;
    });
  }, [id, setTemplates]);

  if (!template) return null;
  return (
    <div>
      <h2>{template.name}</h2>
      <p>id: {template.id}</p>
      <EditTemplateDialog id={template.id}>
        <button>Edit</button>
      </EditTemplateDialog>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

type EditTemplateDialogProps = {
  id: string;
};
export const EditTemplateDialog = memo(
  ({ id, children }: PropsWithChildren<EditTemplateDialogProps>) => {
    const [template, setTemplate] = useRecoilState(
      templateSelector({ templateId: id })
    );

    const content = useCallback(
      () => <TemplateEditor templateId={id} />,

      [id]
    );

    return (
      <Dialog title="Edit Template" content={content()}>
        {children}
      </Dialog>
    );
  }
);
EditTemplateDialog.displayName = "EditTemplateDialog";

export default memo(TemplateCard);
