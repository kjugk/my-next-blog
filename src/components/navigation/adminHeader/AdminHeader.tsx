import { bokor } from "@/app/fonts";
import Link from "next/link";
import React from "react";
import { HeaderListItem } from "../header/HeaderListItem";

export const AdminHeader = () => {
  return (
    <header>
      <div className="container pt-8 pb-6 flex items-center gap-12">
        <Link href="/admin/posts/draft">
          <h1 className={`${bokor.className} text-3xl`}>My Next Blog</h1>
        </Link>
        <nav className="flex-1">
          <ul className="flex gap-4">
            <HeaderListItem href="/admin/posts/draft" anchor="drafts" />
            <HeaderListItem href="/admin/posts/published" anchor="published" />
          </ul>
        </nav>
      </div>

      <div className="container">
        <hr />
      </div>
    </header>
  );
};
