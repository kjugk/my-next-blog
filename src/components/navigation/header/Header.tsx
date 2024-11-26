import { bokor } from "@/app/fonts";
import Link from "next/link";
import React from "react";

export const Header = () => {
  return (
    <header>
      <div className="px-4 py-5 flex items-center gap-12">
        <h1 className={`${bokor.className} font-bokor font-bold text-3xl`}>
          My Next Blog
        </h1>
        <nav className="flex-1">
          <ul className="flex gap-4">
            <li>
              <Link href="/posts">posts</Link>
            </li>
            <li>
              <Link href="/tags">tags</Link>
            </li>
            <li>
              <Link href="/about">about</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="px-4">
        <hr />
      </div>
    </header>
  );
};
