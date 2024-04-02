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
        "bg-gray-100 w-fit py-2 px-4 rounded gap-2 relative",
        inter.className
      )}
    >
      {inspiration.content}
      <div className="cursor-pointer size-4 block absolute right-3 top-3">
        <Cross2Icon onClick={handleDeleteInspiration} />
      </div>
    </div>
  );
};

export default memo(InspirationPill);
