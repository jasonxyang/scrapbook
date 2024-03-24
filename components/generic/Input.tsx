import { showAlert } from "@/utils.ts/client/errorHandling";
import { Cross2Icon } from "@radix-ui/react-icons";
import {
  ChangeEvent,
  InputHTMLAttributes,
  forwardRef,
  memo,
  useCallback,
  useRef,
  useEffect,
} from "react";

type TextInputProps = {
  value: string;
  onValueChange: (value: string) => void;
  label?: string;
} & InputHTMLAttributes<HTMLInputElement>;
export const TextInput = memo(
  forwardRef<HTMLInputElement, TextInputProps>(
    ({ value, onValueChange, label, ...inputProps }, ref) => {
      const handleOnChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
          onValueChange(e.currentTarget.value);
        },
        [onValueChange]
      );

      return (
        <>
          {label && <div>{label}</div>}
          <input
            className="appearance-none border rounded pl-2 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
            value={value}
            onChange={handleOnChange}
            type="text"
            ref={ref}
            {...inputProps}
          />
        </>
      );
    }
  )
);

type FileInputProps = {
  onFileUpload: (file: File) => void;
  onFileClear: () => void;
} & InputHTMLAttributes<HTMLInputElement>;

export const FileInput = memo(
  forwardRef<HTMLInputElement, FileInputProps>(
    ({ onFileUpload, onFileClear, ...inputProps }, ref) => {
      const innerRef = useRef<HTMLInputElement>(null);

      useEffect(
        function setInnerRef() {
          if (!ref) return;
          if (typeof ref === "function") {
            ref(innerRef.current);
          } else {
            ref.current = innerRef.current;
          }
        },
        [ref]
      );

      const handleClearInput = useCallback(() => {
        if (innerRef.current) innerRef.current.value = "";
        onFileClear();
      }, [onFileClear]);

      const handleFileChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
          const files = e.target.files;
          const firstFile = files?.[0];
          try {
            if (!firstFile) throw new Error("Error: No files uploaded");
            onFileUpload(firstFile);
            e.currentTarget.value = "";
          } catch (error) {
            console.error(error);
            showAlert((error as any).message);
          }
        },
        [onFileUpload]
      );

      return (
        <div className="flex">
          <input
            onClick={handleClearInput}
            onChange={handleFileChange}
            type="file"
            accept=".txt"
            ref={innerRef}
            {...inputProps}
            className="block"
          />
          <button onClick={handleClearInput}>
            <Cross2Icon />
          </button>
        </div>
      );
    }
  )
);
