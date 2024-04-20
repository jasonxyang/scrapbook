import { memo } from "react";
import { Root, List, Link } from "@radix-ui/react-navigation-menu";
import { inter } from "@/fonts";
import classNames from "classnames";
import Button from "./generic/Button";
import { createSession } from "@/utils/client/sessions";
import { signIn } from "next-auth/react";

const Header = () => {
  return (
    <Root className="flex w-full justify-between px-4 py-2">
      <div className={classNames(inter.className, "font-semibold text-lg")}>
        Scrapbook
      </div>
      <List className="flex gap-4 items-center">
        <Link href="/documents" className={classNames(inter.className)}>
          Documents
        </Link>
        <Link href="/templates" className={inter.className}>
          Templates
        </Link>
        <Button onClick={() => signIn()}>Login</Button>
      </List>
    </Root>
  );
};

export default memo(Header);
