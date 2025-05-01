import prisma from "@/lib/prisma";
import { cacheTags } from "@/services/cache";
import { unstable_cache } from "next/cache";

export const getTags = unstable_cache(
  async () => {
    const tags = await prisma.tag.findMany({
      where: {
        posts: {
          some: {
            published: true,
          }, // Ensures the tag is associated with at least one post
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    return tags;
  },
  [],
  { tags: [cacheTags.tags], revalidate: 3600 },
);
