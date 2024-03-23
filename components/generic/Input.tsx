import {
  ChangeEventHandler,
  InputHTMLAttributes,
  forwardRef,
  memo,
} from "react";

type TextInputProps = {
  value: string;
  onValueChange: ChangeEventHandler<HTMLInputElement>;
  required?: InputHTMLAttributes<HTMLInputElement>["required"];
};
export const TextInput = memo(
  forwardRef<HTMLInputElement, TextInputProps>(
    ({ required, value, onValueChange }, ref) => {
      return (
        <input
          value={value}
          onChange={onValueChange}
          type="text"
          ref={ref}
          required={required}
        />
      );
    }
  )
);
