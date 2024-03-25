import styleAtom from "@/recoil/document/style";
import { useRecoilState } from "recoil";
import { STYLES, Style } from "@/types";
import Checkbox from "./generic/Checkbox";
import { memo, useCallback } from "react";

const StyleCheckboxGroup = () => {
  const [selectedStyle, setSelectedStyle] = useRecoilState(styleAtom);

  const handleCheckboxChange = useCallback((style: Style) => {
    if (style === selectedStyle) setSelectedStyle(undefined);
    else setSelectedStyle(style);
  }, []);

  return STYLES.map((style) => {
    return (
      <Checkbox
        key={style}
        checked={style === selectedStyle}
        onCheckedChange={() => handleCheckboxChange(style)}
        label={style}
      />
    );
  });
};

export default memo(StyleCheckboxGroup);
