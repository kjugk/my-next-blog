import { bokor } from "@/app/fonts";
import Link from "next/link";
import React, { PropsWithChildren } from "react";
import { HeaderListItem } from "./HeaderListItem";
import {
  Container,
  ContainerProps,
} from "@/components/layout/container/Container";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";

type MenuItem = {
  href: string;
  label: string;
};

type Props = PropsWithChildren<{
  menuItems?: MenuItem[];
  size?: ContainerProps["size"];
}>;

const defaultMenuItems: MenuItem[] = [
  { href: "/posts", label: "posts" },
  { href: "/tags", label: "tags" },
  { href: "/about", label: "about" },
];

export const Header = ({
  menuItems = defaultMenuItems,
  size = "md",
  children,
}: Props) => {
  return (
    <Container as="header" size={size} className="px-8">
      <div className="pt-8 pb-6 flex items-center gap-12">
        <Link href="/">
          <h1 className={`${bokor.className} text-3xl`}>My Next Blog</h1>
        </Link>
        <nav className="flex-1">
          {/* Desktop navigation */}
          <ul className="hidden sm:flex gap-4">
            {menuItems.map((item) => (
              <HeaderListItem
                key={item.href}
                href={item.href}
                anchor={item.label}
              />
            ))}
          </ul>

          {/* Mobile dropdown menu */}
          <div className="sm:hidden flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 hover:bg-gray-100 rounded-md">
                  <Menu className="h-5 w-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {menuItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href} className="w-full">
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
                {children && (
                  <DropdownMenuItem asChild>
                    <div className="w-full">{children}</div>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>

        {/* Desktop children */}
        <div className="hidden sm:block">{children}</div>
      </div>

      <hr />
    </Container>
  );
};
