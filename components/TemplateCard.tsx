import templatesAtom from "@/recoil/template/templates";
import { memo, useCallback } from "react";
import { useRecoilState } from "recoil";

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
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default memo(TemplateCard);
