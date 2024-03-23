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
}: SelectProps) => {
  const renderContent = useCallback(() => {
    if (itemType === "group")
      return items.map((itemGroupProps) => (
        <SelectItemGroup key={itemGroupProps.label} {...itemGroupProps} />
      ));
    return items.map((itemProps) => (
      <SelectItem key={itemProps.label} {...itemProps} />
    ));
  }, []);
  return (
    <Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
    >
      <Trigger>
        <Value placeholder={placeholder ?? "Select a value..."} />
        <Icon>
          <ChevronDownIcon />
        </Icon>
      </Trigger>
      <Portal>
        <Content>
          <ScrollUpButton>
            <ChevronUpIcon />
          </ScrollUpButton>
          <Viewport>{renderContent()}</Viewport>
        </Content>
      </Portal>
    </Root>
  );
};

export type SelectItemProps = {
  value: string;
  label: string;
};
const SelectItem = memo(
  forwardRef<HTMLDivElement, SelectItemProps>(({ value, label }, ref) => {
    return (
      <Item value={value} ref={ref}>
        <ItemText>{label}</ItemText>
        <ItemIndicator className="SelectItemIndicator">
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
