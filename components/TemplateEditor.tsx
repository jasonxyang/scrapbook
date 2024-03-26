import { templateSelector } from "@/recoil/template/selectors";
import { memo, useState, useCallback, useMemo, PropsWithChildren } from "react";
import { useRecoilState } from "recoil";
import { TextInput } from "./generic/Input";
import { TemplateSection } from "@/types";
import classNames from "classnames";
import ContextMenu, { ContextMenuItemProps } from "./generic/ContextMenu";
import { Cross2Icon } from "@radix-ui/react-icons";

type TemplateSectionContentNodeType = "title" | "keyword" | "key sentence";

const findTextInSection = (query: string, content: string) => {
  const index = content.search(query);
  if (index === -1) return;
  return [index, index + query.length];
};

const splitContentString = (
  str: string,
  indices: {
    type: TemplateSectionContentNodeType;
    position: number;
    index: number;
  }[]
) => {
  const result: {
    textContent: string;
    types: TemplateSectionContentNodeType[];
  }[] = [];
  let start = 0;
  let currentTypes: TemplateSectionContentNodeType[] = [];

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

const buildClassFromTypes = (types: TemplateSectionContentNodeType[]) => {
  let className = "";
  if (types.includes("title")) className = className.concat("bg-red-200");
  if (types.includes("keyword")) className = className.concat(" bg-green-200");
  if (types.includes("key sentence"))
    className = className.concat(" bg-yellow-200");
  return className;
};

const buildDomNodesFromSection = (section: TemplateSection) => {
  const title = section.title;
  const titleIndices = findTextInSection(title, section.content);
  const titleData =
    titleIndices?.map((index, position) => {
      return {
        type: "title" as TemplateSectionContentNodeType,
        position,
        index,
      };
    }) ?? [];

  const keywords = section.keywords;
  const keywordData = keywords.flatMap((keyword) => {
    const keywordIndices = findTextInSection(keyword, section.content);
    return (
      keywordIndices?.map((index, position) => {
        return {
          type: "keyword" as TemplateSectionContentNodeType,
          position,
          index,
        };
      }) ?? []
    );
  });

  const data = [...titleData, ...keywordData].sort(
    (a, b) => (a?.index ?? 0) - (b?.index ?? 0)
  ) satisfies {
    type: TemplateSectionContentNodeType;
    position: number;
    index: number;
  }[];

  const nodesData = splitContentString(section.content, data);

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
  const [template, setTemplate] = useRecoilState(
    templateSelector({ templateId })
  );

  const [selectedSectionIndex, setSelectedSectionIndex] = useState<
    number | null | undefined
  >();

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

  return (
    <div className="flex h-[60vh]">
      <div className="flex flex-col gap-4 h-full overflow-y-scroll p-1">
        {template?.sections.map((_, index) => {
          return (
            <TemplateSectionInputGroup
              key={index}
              templateId={templateId}
              sectionIndex={index}
              setSelectedSectionIndex={setSelectedSectionIndex}
              isSelected={selectedSectionIndex === index}
            />
          );
        })}
      </div>

      <div className="p-4 whitespace-pre-wrap w-96 h-80 overflow-y-scroll">
        {template?.sections.map((section, index) => {
          return (
            <TemplateEditorContextMenu
              key={index}
              sectionIndex={index}
              templateId={templateId}
              selection={selection}
            >
              <div
                className={classNames({
                  ["bg-gray-100"]: selectedSectionIndex === index,
                })}
                onMouseDown={() => setSelectedSectionIndex(index)}
                onMouseUp={handleUpdateSelection}
              >
                {buildDomNodesFromSection(section)}
              </div>
            </TemplateEditorContextMenu>
          );
        })}
      </div>
    </div>
  );
};

type TemplateEditorContextMenuProps = {
  templateId: string;
  sectionIndex: number;
  selection: string;
};
const TemplateEditorContextMenu = ({
  templateId,
  sectionIndex,
  selection,
  children,
}: PropsWithChildren<TemplateEditorContextMenuProps>) => {
  const { section, setTitle, setKeywords, setKeySentences } =
    useTemplateSection({
      templateId,
      sectionIndex: sectionIndex,
    });

  const contextMenuItems = useMemo((): ContextMenuItemProps[] => {
    return [
      {
        label: "Set as title",
        onClick: () => {
          if (!selection) return;
          setTitle(selection);
        },
      },
      {
        label: "Add keyword",
        onClick: () => {
          if (!selection) return;
          const keywords = [...(section?.keywords ?? []), selection];
          setKeywords(keywords);
        },
      },
      {
        label: "Add key sentence",
        onClick: () => {
          if (!selection) return;
          const sentences = [...(section?.keySentences ?? []), selection];
          setKeySentences(sentences);
        },
      },
    ];
  }, [
    section?.keySentences,
    section?.keywords,
    selection,
    setKeySentences,
    setKeywords,
    setTitle,
  ]);
  return <ContextMenu items={contextMenuItems}>{children}</ContextMenu>;
};

type TemplateSectionInputGroupProps = {
  templateId: string;
  sectionIndex: number;
  setSelectedSectionIndex: (index: number) => void;
  isSelected?: boolean;
};
const TemplateSectionInputGroup = memo(
  ({
    templateId,
    sectionIndex,
    setSelectedSectionIndex,
    isSelected,
  }: TemplateSectionInputGroupProps) => {
    const { section, setTitle, setKeywords } = useTemplateSection({
      templateId,
      sectionIndex,
    });

    const handleOnFocus = useCallback(() => {
      setSelectedSectionIndex(sectionIndex);
    }, [sectionIndex, setSelectedSectionIndex]);

    const renderTitleInput = useCallback(() => {
      return (
        <TextInput
          value={section?.title ?? ""}
          onValueChange={setTitle}
          label="Title"
          onFocus={handleOnFocus}
        />
      );
    }, [handleOnFocus, section?.title, setTitle]);

    const deleteKeywordCallbacks = useMemo(() => {
      return section?.keywords.map((_, index) => {
        return () => {
          setKeywords(section.keywords.filter((_, i) => i !== index));
        };
      });
    }, [section?.keywords, setKeywords]);

    const renderKeywords = useCallback(() => {
      return (
        <div>
          <div className="font-semibold">Keywords</div>
          <div className="flex">
            {section?.keywords.map((keyword, index) => (
              <span key={index}>
                {keyword}{" "}
                <button onClick={deleteKeywordCallbacks?.[index]}>
                  <Cross2Icon />
                </button>
              </span>
            ))}
          </div>
        </div>
      );
    }, [deleteKeywordCallbacks, section?.keywords]);

    const deleteKeySentenceCallbacks = useMemo(() => {
      return section?.keywords.map((_, index) => {
        return () => {
          setKeywords(section?.keywords.filter((_, i) => i !== index));
        };
      });
    }, [section?.keywords, setKeywords]);

    const renderKeySentences = useCallback(() => {
      return (
        <div>
          <div className="font-semibold">Key Sentences</div>
          <div className="flex">
            {section?.keySentences.map((keySentence, index) => (
              <div key={index}>
                {keySentence}{" "}
                <button onClick={deleteKeySentenceCallbacks?.[index]}>
                  <Cross2Icon />
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    }, [deleteKeySentenceCallbacks, section?.keySentences]);

    return (
      <div
        className={classNames(
          "outline outline-1 rounded-md flex flex-col gap-2 p-2 w-[300px]",
          {
            ["outline-black"]: isSelected,
            ["outline-gray-200"]: !isSelected,
          }
        )}
      >
        <div className="font-semibold">Section {sectionIndex + 1}</div>
        {renderTitleInput()}
        {renderKeywords()}
        {renderKeySentences()}
      </div>
    );
  }
);
TemplateSectionInputGroup.displayName = "TemplateSectionInputGroup";

type UseTemplateSectionParams = {
  templateId: string;
  sectionIndex: number;
};
const useTemplateSection = ({
  templateId,
  sectionIndex,
}: UseTemplateSectionParams) => {
  const [template, setTemplate] = useRecoilState(
    templateSelector({ templateId })
  );
  const { section, setSection } = useMemo(() => {
    return {
      section: template?.sections[sectionIndex],
      setSection: (sectionUpdates: Partial<TemplateSection>) => {
        if (!template) return;
        setTemplate({
          ...template,
          sections: template?.sections.map((section, index) => {
            if (index === sectionIndex)
              return { ...section, ...sectionUpdates };
            return section;
          }),
        });
      },
    };
  }, [sectionIndex, setTemplate, template]);

  const { setTitle, setKeywords, setKeySentences } = useMemo(() => {
    return {
      setTitle: (title: string) => {
        setSection({ title });
      },
      setKeywords: (keywords: string[]) => {
        setSection({ keywords });
      },
      setKeySentences: (keySentences: string[]) => {
        setSection({ keySentences });
      },
    };
  }, [setSection]);

  return useMemo(
    () => ({
      section,
      setSection,
      setTitle,
      setKeywords,
      setKeySentences,
    }),
    [section, setKeySentences, setKeywords, setSection, setTitle]
  );
};

export default memo(TemplateEditor);
