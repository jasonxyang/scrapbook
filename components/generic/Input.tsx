import { inter } from "@/fonts";
import { showAlert } from "@/utils/client/errorHandling";
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
  TextareaHTMLAttributes,
} from "react";
import { buttonClassName } from "./Button";

const textInputClassName = {
  base: "block appearance-none border-b border-gray-200 py-2 px-2 leading-5 focus:outline-none text-base w-full text-ellipsis whitespace-nowrap overflow-hidden",
  focus: "focus:border-violet-400",
};

type TextInputProps = {
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;
export const TextInput = memo(
  forwardRef<HTMLInputElement, TextInputProps>(
    ({ value, onValueChange, className, ...inputProps }, ref) => {
      const handleOnChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
          onValueChange(e.currentTarget.value);
        },
        [onValueChange]
      );

      return (
        <>
          <input
            className={classNames(
              textInputClassName.base,
              textInputClassName.focus,
              inter.className,
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

const textAreaInputClassName = {
  base: "block appearance-none border-b border-gray-200 py-2 px-2 leading-5 focus:outline-none resize-none overflow-hidden text-base w-full text-ellipsis",
  focus: "focus:border-violet-400",
};
type TextAreaInputProps = {
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;
export const TextAreaInput = memo(
  forwardRef<HTMLTextAreaElement, TextAreaInputProps>(
    ({ value, onValueChange, className, ...inputProps }, ref) => {
      const [internalRef, setInternalRef] =
        useState<HTMLTextAreaElement | null>(null);

      const handleSetTextAreaHeight = useCallback(() => {
        if (!internalRef) return;
        internalRef.style.height = "auto";
        internalRef.style.height = `${internalRef.scrollHeight}px`;
      }, [internalRef]);

      const handleOnChange = useCallback(
        (e: ChangeEvent<HTMLTextAreaElement>) => {
          onValueChange(e.currentTarget.value);
          handleSetTextAreaHeight();
        },

        [handleSetTextAreaHeight, onValueChange]
      );

      return (
        <textarea
          className={classNames(
            textAreaInputClassName.base,
            textAreaInputClassName.focus,
            inter.className,
            className
          )}
          rows={1}
          value={value}
          onChange={handleOnChange}
          ref={(node) => {
            setInternalRef(node);
          }}
          {...inputProps}
        />
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
          <label
            className={classNames(
              buttonClassName.base,
              buttonClassName.hover,
              "w-full !block text-center"
            )}
          >
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
