import { showAlert } from "@/utils.ts/client/errorHandling";
import { Cross2Icon } from "@radix-ui/react-icons";
import classNames from "classnames";
import {
  ChangeEvent,
  InputHTMLAttributes,
  forwardRef,
  memo,
  useCallback,
  useRef,
  useEffect,
  useState,
} from "react";

type TextInputProps = {
  value: string;
  onValueChange: (value: string) => void;
  label?: string;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;
export const TextInput = memo(
  forwardRef<HTMLInputElement, TextInputProps>(
    ({ value, onValueChange, label, className, ...inputProps }, ref) => {
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
            className={classNames(
              "appearance-none border rounded pl-2 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-100",
              className
            )}
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
      const [file, setFile] = useState<File | null>(null);
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
        setFile(null);
      }, [onFileClear]);

      const handleFileChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
          const files = e.target.files;
          const firstFile = files?.[0];
          try {
            if (!firstFile) throw new Error("Error: No files uploaded");
            onFileUpload(firstFile);
            setFile(firstFile);
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
          <label className="cursor-pointer p-4 outline outline-black outline-1 rounded-md">
            Upload a file
            <input
              onClick={handleClearInput}
              onChange={handleFileChange}
              type="file"
              ref={innerRef}
              {...inputProps}
              className="hidden"
            />
          </label>

          {file && (
            <button onClick={handleClearInput}>
              <Cross2Icon />
            </button>
          )}
        </div>
      );
    }
  )
);
