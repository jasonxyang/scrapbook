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
  description?: string;
  content?: ReactNode;
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
        <Overlay className="fixed top-0 left-0 bg-black bg-opacity-50 w-full h-full" />
        <Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white text-black p-4">
          <div></div>
          <Title>{title}</Title>
          {description && <Description>{description}</Description>}
          {content && content}
          {button && (
            <Close asChild>
              <button onClick={button.onClick}>{button.text}</button>
            </Close>
          )}
          <Close asChild className="absolute top-2 right-2">
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
