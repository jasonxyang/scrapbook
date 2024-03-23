import { Root, Indicator } from "@radix-ui/react-checkbox";
import { memo } from "react";

type CheckboxProps = {
  defaultChecked?: boolean;
  checked: boolean;
  onCheckedChange: () => boolean;
};
const Checkbox = ({
  checked,
  onCheckedChange,
  defaultChecked,
}: CheckboxProps) => {
  return (
    <Root
      checked={checked}
      onCheckedChange={onCheckedChange}
      defaultChecked={defaultChecked}
    >
      <Indicator />
    </Root>
  );
};

export default memo(Checkbox);
