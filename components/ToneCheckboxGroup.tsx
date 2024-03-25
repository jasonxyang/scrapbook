import { useRecoilState } from "recoil";
import { TONES, Tone } from "@/types";
import Checkbox from "./generic/Checkbox";
import { memo, useCallback } from "react";
import toneAtom from "@/recoil/document/tone";

const ToneCheckboxGroup = () => {
  const [selectedTone, setSelectedTone] = useRecoilState(toneAtom);

  const handleCheckboxChange = useCallback(
    (tone: Tone) => {
      if (tone === selectedTone) setSelectedTone(undefined);
      else setSelectedTone(tone);
    },
    [selectedTone, setSelectedTone]
  );

  return TONES.map((tone) => {
    return (
      <Checkbox
        key={tone}
        checked={tone === selectedTone}
        onCheckedChange={() => handleCheckboxChange(tone)}
        label={tone}
      />
    );
  });
};

export default memo(ToneCheckboxGroup);
