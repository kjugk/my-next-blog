import prisma from "@/lib/prisma";

export const getPosts = async () => {
  const posts = await prisma.post.findMany();

  return posts;
};
