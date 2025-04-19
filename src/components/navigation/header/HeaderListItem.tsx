"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const HeaderListItem = ({
  href,
  anchor,
}: {
  href: string;
  anchor: string;
}) => {
  const pathName = usePathname();

  return (
    <li>
      <Link
        href={href}
        className={` underline-offset-4 ${
          pathName === href
            ? "text-primary underline"
            : "hover:text-primary hover:underline"
        }`}
      >
        {anchor}
      </Link>
    </li>
  );
};
