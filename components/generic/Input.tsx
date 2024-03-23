import { showAlert } from "@/utils.ts/client/errorHandling";
import {
  ChangeEvent,
  InputHTMLAttributes,
  forwardRef,
  memo,
  useCallback,
  useState,
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
  onFileChange: (file: File) => void;
  required?: InputHTMLAttributes<HTMLInputElement>["required"];
  multiple?: InputHTMLAttributes<HTMLInputElement>["multiple"];
};

export const FileInput = memo(
  forwardRef<HTMLInputElement, FileInputProps>(
    ({ required, multiple, onFileChange }, ref) => {
      const [file, setFile] = useState<File | null | undefined>(null);

      const handleFileChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
          const files = e.target.files;
          const firstFile = files?.[0];
          try {
            if (!firstFile) throw new Error("Error: No files uploaded");
            setFile(firstFile);
            onFileChange(firstFile);
          } catch (error) {
            console.error(error);
            showAlert((error as any).message);
          }
        },
        []
      );
      return (
        <>
          <input
            onChange={handleFileChange}
            type="file"
            accept=".txt"
            ref={ref}
            required={required}
            multiple={multiple}
          />
        </>
      );
    }
  )
);
