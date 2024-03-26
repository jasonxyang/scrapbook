import styleAtom from "@/recoil/document/style";
import { useRecoilState } from "recoil";
import { STYLES, Style } from "@/types";
import Checkbox from "./generic/Checkbox";
import { memo, useCallback } from "react";

const StyleCheckboxGroup = () => {
  const [selectedStyle, setSelectedStyle] = useRecoilState(styleAtom);

  const handleCheckboxChange = useCallback(
    (style: Style) => {
      setSelectedStyle((prevStyle) =>
        prevStyle === style ? undefined : style
      );
    },
    [setSelectedStyle]
  );

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
