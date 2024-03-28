import { inter } from "@/fonts";
import classNames from "classnames";
import {
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
  forwardRef,
  memo,
} from "react";

type ButtonProps = PropsWithChildren<
  {
    onClick?: () => void;
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
        className={classNames(
          inter.className,
          buttonClassname.base,
          buttonClassname.hover,
          { [buttonClassname.disabled]: disabled }
        )}
      >
        {icon}
        {children}
      </button>
    );
  }
);

const buttonClassname = {
  base: "text-white bg-violet-600 px-4 py-2 flex items-center gap-2 rounded-md text-sm transition-colors",
  hover: "hover:bg-violet-700",
  disabled: "!bg-violet-400 bg !pointer-events-none",
};

Button.displayName = "Button";

export default memo(Button);
