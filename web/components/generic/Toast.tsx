import { memo } from "react";
import { Description, Provider, Root, Title } from "@radix-ui/react-toast";

type ToastProps = {
  title: string;
  description: string;
  type: "error" | "success" | "warning" | "info";
};
const Toast = ({ title, description }: ToastProps) => {
  return (
    <Provider>
      <Root>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Root>
    </Provider>
  );
};

export default memo(Toast);
