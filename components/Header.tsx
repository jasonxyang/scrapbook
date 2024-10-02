import { memo } from "react";
import { Root, List, Link } from "@radix-ui/react-navigation-menu";
import { inter } from "@/fonts";
import classNames from "classnames";

const Header = () => {
  return (
    <Root className="flex w-full justify-between px-4 py-2">
      <div className={classNames(inter.className, "font-semibold text-lg")}>
        Scrapbook
      </div>
      <List className="flex gap-4">
        <Link href="/documents" className={classNames(inter.className)}>
          Documents
        </Link>
        <Link href="/templates" className={inter.className}>
          Templates
        </Link>
      </List>
    </Root>
  );
};

export default memo(Header);
