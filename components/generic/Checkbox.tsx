import { Root, Indicator } from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { memo } from "react";

type CheckboxProps = {
  defaultChecked?: boolean;
  checked: boolean;
  onCheckedChange: () => void;
  label?: string;
};
const Checkbox = ({
  checked,
  onCheckedChange,
  defaultChecked,
  label,
}: CheckboxProps) => {
  return (
    <Root
      checked={checked}
      onCheckedChange={onCheckedChange}
      defaultChecked={defaultChecked}
    >
      <Indicator>
        <CheckIcon />
      </Indicator>
      {label && <span>{label}</span>}
    </Root>
  );
};

export default memo(Checkbox);
