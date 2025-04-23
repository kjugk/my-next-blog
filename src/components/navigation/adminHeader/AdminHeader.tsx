import { bokor } from "@/app/fonts";
import Link from "next/link";
import React from "react";
import { HeaderListItem } from "../header/HeaderListItem";
import { Container } from "@/components/layout/container/Container";

export const AdminHeader = () => {
  return (
    <Container as="header" size="xl" className="px-8">
      <div className="pt-8 pb-6 flex items-center gap-12">
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

      <hr />
    </Container>
  );
};
