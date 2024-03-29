import { memo, useState, useCallback, useMemo, PropsWithChildren } from "react";
import { ScrapbookTemplate } from "@/types";
import ContextMenu, { ContextMenuItemProps } from "./generic/ContextMenu";
import useTemplate from "@/utils/client/useTemplate";

type TemplateNodeType = "inspiration";

const findTextInSection = (query: string, content: string) => {
  const index = content.search(query);
  if (index === -1) return;
  return [index, index + query.length];
};

const splitContentString = (
  str: string,
  indices: {
    type: TemplateNodeType;
    position: number;
    index: number;
  }[]
) => {
  const result: {
    textContent: string;
    types: TemplateNodeType[];
  }[] = [];
  let start = 0;
  let currentTypes: TemplateNodeType[] = [];

  indices.forEach(({ index, position, type }) => {
    if (index > start && index <= str.length) {
      result.push({
        textContent: str.substring(start, index),
        types: currentTypes,
      });
      start = index;
    }
    if (position === 0) currentTypes = [...currentTypes, type];
    if (position === 1) currentTypes = currentTypes.filter((t) => t !== type);
  });
  if (start < str.length) {
    result.push({ textContent: str.substring(start), types: currentTypes });
  }
  return result;
};

const inpsirationDomClassname = {
  base: "bg-yellow-200",
};
const buildClassFromTypes = (types: TemplateNodeType[]) => {
  let className = "";
  if (types.includes("inspiration"))
    className = className.concat(inpsirationDomClassname.base);
  return className;
};

const buildDomNodesFromTemplate = (template: ScrapbookTemplate) => {
  const inspiration = template.inspiration;
  const inspirationData = inspiration.flatMap(({ content }) => {
    const inspirationIndices = findTextInSection(content, template.content);
    return (
      inspirationIndices?.map((index, position) => {
        return {
          type: "inspiration" as TemplateNodeType,
          position,
          index,
        };
      }) ?? []
    );
  });

  const data = [...inspirationData].sort(
    (a, b) => (a?.index ?? 0) - (b?.index ?? 0)
  ) satisfies {
    type: TemplateNodeType;
    position: number;
    index: number;
  }[];

  const nodesData = splitContentString(template.content, data);

  return nodesData.map(({ textContent, types }, index) => {
    return (
      <span key={index} className={buildClassFromTypes(types)}>
        {textContent}
      </span>
    );
  });
};

type TemplateEditorProps = {
  templateId: string;
  onBack?: () => void;
};
const TemplateEditor = ({ templateId }: TemplateEditorProps) => {
  const { template } = useTemplate({ templateId });

  const [selection, setSelection] = useState<string>("");

  const handleUpdateSelection = useCallback(() => {
    const _selection = document.getSelection();
    if (_selection && _selection.rangeCount > 0) {
      const range = _selection.getRangeAt(0);
      const selectedText = range.cloneContents().textContent;

      if (selectedText === null || selectedText !== selection)
        setSelection(selectedText ?? "");
    } else {
      if ("" !== selection) setSelection("");
    }
  }, [selection]);

  if (!template) return null;

  return (
    <div className="flex h-[60vh]">
      <div className="p-4 whitespace-pre-wrap w-96 h-[60vh] overflow-y-scroll flex flex-col gap-4">
        <TemplateEditorContextMenu
          templateId={templateId}
          selection={selection}
        >
          <div onMouseUp={handleUpdateSelection}>
            {buildDomNodesFromTemplate(template)}
          </div>
        </TemplateEditorContextMenu>
      </div>
    </div>
  );
};

type TemplateEditorContextMenuProps = {
  templateId: string;
  selection: string;
};
const TemplateEditorContextMenu = ({
  templateId,
  selection,
  children,
}: PropsWithChildren<TemplateEditorContextMenuProps>) => {
  const { addTemplateInspiration } = useTemplate({
    templateId,
  });

  const contextMenuItems = useMemo((): ContextMenuItemProps[] => {
    return [
      {
        label: "Add inspiration",
        onClick: () => {
          if (!selection) return;
          addTemplateInspiration({ content: selection });
        },
      },
    ];
  }, [addTemplateInspiration, selection]);
  return <ContextMenu items={contextMenuItems}>{children}</ContextMenu>;
};

export default memo(TemplateEditor);
