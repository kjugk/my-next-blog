"use server";

import prisma from "@/lib/prisma";

type Params = {
  tagName: string;
};

export const getPostsByTagName = async ({ tagName }: Params) => {
  return await prisma.post.findMany({
    where: {
      published: true,
      tags: {
        some: {
          name: decodeURIComponent(tagName),
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
