"use server";

import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";

type Params = {
  published?: boolean;
};

export const getPosts = unstable_cache(
  async ({ published = true }: Params) => {
    return await prisma.post.findMany({
      where: {
        published,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },
  [],
  { tags: ["posts"], revalidate: 3600 },
);
