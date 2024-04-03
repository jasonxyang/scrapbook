import { inter } from "@/fonts";
import { inspirationsByIdAtom } from "@/jotai/inspirations/atoms";
import { deleteInspiration } from "@/jotai/inspirations/utils";
import { Cross2Icon } from "@radix-ui/react-icons";
import classNames from "classnames";
import { useAtom } from "jotai/react";
import { memo, useCallback } from "react";

type InspirationPillProps = { inspirationId: string };

const InspirationPill = ({ inspirationId }: InspirationPillProps) => {
  const [inspiration] = useAtom(inspirationsByIdAtom(inspirationId));

  const handleDeleteInspiration = useCallback(() => {
    deleteInspiration({ inspirationId });
  }, [inspirationId]);

  if (!inspiration) return null;

  return (
    <div
      className={classNames(
        "bg-gray-100 w-fit py-2 px-2 rounded gap-2 flex",
        inter.className
      )}
    >
      <button
        className="cursor-pointer w-fit h-fit block p-1"
        onClick={handleDeleteInspiration}
      >
        <Cross2Icon />
      </button>
      {inspiration.content}
    </div>
  );
};

export default memo(InspirationPill);
