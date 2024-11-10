import prisma from "@/lib/prisma";

type Params = {
  published?: boolean;
};

export const getPosts = async ({ published = true }: Params) => {
  return await prisma.post.findMany({
    where: {
      published,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
