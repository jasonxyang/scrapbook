import {
  Root,
  Trigger,
  Portal,
  Content,
  Item,
} from "@radix-ui/react-context-menu";
import { PropsWithChildren, forwardRef, memo, MouseEvent } from "react";

type ContextMenuProps = {
  items: ContextMenuItemProps[];
};
const ContextMenu = ({
  children,
  items,
}: PropsWithChildren<ContextMenuProps>) => {
  return (
    <Root>
      <Trigger>
        <div>{children}</div>
      </Trigger>
      <Portal>
        <Content>
          {items.map((item, index) => (
            <ContextMenuItem key={index} {...item} />
          ))}
        </Content>
      </Portal>
    </Root>
  );
};

export type ContextMenuItemProps = {
  label: string;
  onClick: (e?: MouseEvent<HTMLDivElement>) => void;
};

const ContextMenuItem = memo(
  forwardRef<HTMLDivElement, ContextMenuItemProps>(
    ({ label, onClick }, ref) => {
      return (
        <Item ref={ref} onClick={onClick}>
          {label}
        </Item>
      );
    }
  )
);
ContextMenuItem.displayName = "ContextMenuItem";
export default memo(ContextMenu);
