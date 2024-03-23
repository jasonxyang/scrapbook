import { showAlert } from "@/utils.ts/client/errorHandling";
import { Cross2Icon } from "@radix-ui/react-icons";
import {
  MouseEvent,
  ChangeEvent,
  InputHTMLAttributes,
  forwardRef,
  memo,
  useCallback,
  useState,
  useRef,
  useEffect,
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
      const handleOnChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
          onValueChange(e.currentTarget.value);
        },
        [onValueChange]
      );

      return (
        <input
          className="appearance-none border rounded pl-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder={placeholder}
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

type FileInputProps = {
  onFileUpload: (file: File) => void;
  onFileClear: () => void;
  required?: InputHTMLAttributes<HTMLInputElement>["required"];
  multiple?: InputHTMLAttributes<HTMLInputElement>["multiple"];
};

export const FileInput = memo(
  forwardRef<HTMLInputElement, FileInputProps>(
    ({ required, multiple, onFileUpload, onFileClear }, ref) => {
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
        <>
          <input
            onClick={handleClearInput}
            onChange={handleFileChange}
            type="file"
            accept=".txt"
            ref={innerRef}
            required={required}
            multiple={multiple}
          />
          <button onClick={handleClearInput}>
            <Cross2Icon />
          </button>
        </>
      );
    }
  )
);
