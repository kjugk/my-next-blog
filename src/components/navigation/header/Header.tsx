import { bokor } from "@/app/fonts";
import Link from "next/link";
import React, { ReactElement } from "react";
import { HeaderListItem } from "./HeaderListItem";
import {
  Container,
  ContainerProps,
} from "@/components/layout/container/Container";

type Props = {
  items: ReactElement;
  size?: ContainerProps["size"];
};

const defaultItems = (
  <>
    <HeaderListItem href="/posts" anchor="posts" />
    <HeaderListItem href="/tags" anchor="tags" />
    <HeaderListItem href="/about" anchor="about" />
  </>
);

export const Header = ({ items = defaultItems, size = "md" }: Props) => {
  return (
    <Container as="header" size={size} className="px-8">
      <div className="pt-8 pb-6 flex items-center gap-12">
        <Link href="/">
          <h1 className={`${bokor.className} text-3xl`}>My Next Blog</h1>
        </Link>
        <nav className="flex-1">
          <ul className="flex gap-4">{items}</ul>
        </nav>
      </div>

      <hr />
    </Container>
  );
};
