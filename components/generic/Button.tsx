import { inter } from "@/fonts";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import {
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
  forwardRef,
  memo,
} from "react";

type ButtonProps = PropsWithChildren<
  {
    icon?: ReactNode;
    disabled?: boolean;
  } & HTMLAttributes<HTMLButtonElement>
>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, onClick, icon, disabled, ...buttonProps }, ref) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        {...buttonProps}
        className={twMerge(
          classNames(
            inter.className,
            buttonClassName.base,
            buttonClassName.hover,
            { [buttonClassName.disabled]: disabled }
          )
        )}
      >
        {icon}
        {children}
      </button>
    );
  }
);

export const buttonClassName = {
  base: "text-white bg-violet-600 px-4 py-2 flex items-center gap-2 rounded-md text-sm transition-colors cursor-pointer",
  hover: "hover:bg-violet-700 point",
  disabled: "bg-violet-400 bg pointer-events-none",
};

Button.displayName = "Button";

export default memo(Button);
