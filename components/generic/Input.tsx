import {
  ChangeEvent,
  InputHTMLAttributes,
  forwardRef,
  memo,
  useCallback,
} from "react";

type TextInputProps = {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: InputHTMLAttributes<HTMLInputElement>["placeholder"];
  required?: InputHTMLAttributes<HTMLInputElement>["required"];
};
export const TextInput = memo(
  forwardRef<HTMLInputElement, TextInputProps>(
    ({ required, value, onValueChange, placeholder }, ref) => {
      const handleOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        onValueChange(e.currentTarget.value);
      }, []);

      return (
        <input
          placeholder=""
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
