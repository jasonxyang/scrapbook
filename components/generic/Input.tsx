import {
  ChangeEvent,
  ChangeEventHandler,
  InputHTMLAttributes,
  forwardRef,
  memo,
  useCallback,
} from "react";

type TextInputProps = {
  value: string;
  onValueChange: (value: string) => void;
  required?: InputHTMLAttributes<HTMLInputElement>["required"];
};
export const TextInput = memo(
  forwardRef<HTMLInputElement, TextInputProps>(
    ({ required, value, onValueChange }, ref) => {
      const handleOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        onValueChange(e.currentTarget.value);
      }, []);

      return (
        <input
          value={value}
          onChange={handleOnChange}
          type="text"
          ref={ref}
          required={required}
        />
      );
    }
  )
);
