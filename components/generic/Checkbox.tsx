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
      className="mx-3 inline-flex items-center border border-gray-300 rounded px-2 py-1"
      checked={checked}
      onCheckedChange={onCheckedChange}
      defaultChecked={defaultChecked}
    >
      <Indicator className="px-1">
        <CheckIcon />
      </Indicator>
      {label && <span>{label}</span>}
    </Root>
  );
};

export default memo(Checkbox);
