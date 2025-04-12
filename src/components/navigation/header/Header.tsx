import { bokor } from "@/app/fonts";
import Link from "next/link";
import React from "react";
import { HeaderListItem } from "./HeaderListItem";

export const Header = () => {
  return (
    <header>
      <div className="container py-5 flex items-center gap-12">
        <Link href="/">
          <h1 className={`${bokor.className} text-3xl`}>My Next Blog</h1>
        </Link>
        <nav className="flex-1">
          <ul className="flex gap-4">
            <HeaderListItem href="/posts" anchor="posts" />
            <HeaderListItem href="/tags" anchor="tags" />
            <HeaderListItem href="/about" anchor="about" />
          </ul>
        </nav>
      </div>

      <div className="container">
        <hr />
      </div>
    </header>
  );
};
