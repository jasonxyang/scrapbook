import { forwardRef, memo, useCallback } from "react";
import {
  Content,
  Group,
  Icon,
  Item,
  ItemIndicator,
  ItemText,
  Label,
  Portal,
  Root,
  ScrollUpButton,
  Trigger,
  Value,
  Viewport,
} from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";

type SelectProps = {
  defaultValue?: string;
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  label?: string;
} & (
  | {
      items: SelectItemGroupProps[];
      itemType: "group";
    }
  | {
      items: SelectItemProps[];
      itemType: "item";
    }
);

export const Select = ({
  items,
  defaultValue,
  value,
  onValueChange,
  itemType,
  placeholder,
  label,
}: SelectProps) => {
  const renderContent = useCallback(() => {
    if (itemType === "group")
      return items.map((itemGroupProps) => (
        <SelectItemGroup key={itemGroupProps.label} {...itemGroupProps} />
      ));
    return items.map((itemProps) => (
      <SelectItem key={itemProps.label} {...itemProps} />
    ));
  }, [itemType, items]);
  return (
    <div>
      {label && <label className="font-semibold text-sm">Tone</label>}
      <Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
      >
        <Trigger className="flex items-center justify-between border border-gray-300 rounded px-3 py-2 bg-white text-sm leading-4 text-gray-600 focus:outline-none focus:border-blue-500 focus:ring-blue-500 w-full">
          <Value placeholder={placeholder ?? "Select a value..."} />
          <Icon>
            <ChevronDownIcon />
          </Icon>
        </Trigger>
        <Portal>
          <Content className="border border-gray-300 rounded p-2 bg-white text-sm leading-4 text-gray-600">
            <ScrollUpButton>
              <ChevronUpIcon />
            </ScrollUpButton>
            <Viewport>{renderContent()}</Viewport>
          </Content>
        </Portal>
      </Root>
    </div>
  );
};

export type SelectItemProps = {
  value: string;
  label: string;
};
const SelectItem = memo(
  forwardRef<HTMLDivElement, SelectItemProps>(({ value, label }, ref) => {
    return (
      <Item
        value={value}
        ref={ref}
        className="p-2 rounded bg-white flex w-full justify-between cursor-pointer hover:bg-gray-100 transition-all"
      >
        <ItemText>{label}</ItemText>
        <ItemIndicator>
          <CheckIcon />
        </ItemIndicator>
      </Item>
    );
  })
);

export type SelectItemGroupProps = {
  label: string;
  items: SelectItemProps[];
};
const SelectItemGroup = memo(
  forwardRef<HTMLDivElement, SelectItemGroupProps>(({ label, items }, ref) => {
    return (
      <Group ref={ref}>
        <Label>{label}</Label>
        {items.map((itemProps) => (
          <SelectItem key={itemProps.value} {...itemProps}></SelectItem>
        ))}
      </Group>
    );
  })
);

export default memo(Select);
