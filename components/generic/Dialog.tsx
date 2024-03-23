import {
  Close,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
} from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { PropsWithChildren, ReactNode, memo } from "react";

type DialogProps = PropsWithChildren<{
  title: string;
  description: string;
  content: ReactNode;
  button?: {
    text: string;
    onClick: () => void;
  };
  onClose?: () => void;
}>;
const Dialog = ({
  children,
  title,
  description,
  content,
  button,
  onClose,
}: DialogProps) => {
  return (
    <Root>
      <Trigger asChild>
        <div>{children}</div>
      </Trigger>

      <Portal>
        <Overlay />
        <Content>
          <Title>{title}</Title>
          {description && <Description>{description}</Description>}
          {content && content}
          {button && (
            <Close asChild>
              <button onClick={button.onClick}>{button.text}</button>
            </Close>
          )}
          <Close asChild>
            <button onClick={onClose}>
              <Cross2Icon />
            </button>
          </Close>
        </Content>
      </Portal>
    </Root>
  );
};
export default memo(Dialog);
