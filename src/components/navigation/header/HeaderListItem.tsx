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
    <li className="group">
      <Link
        href={href}
        className={` underline-offset-4 ${
          pathName === href
            ? "text-primary underline"
            : "group-hover:text-primary"
        }`}
      >
        {anchor}
      </Link>
    </li>
  );
};
