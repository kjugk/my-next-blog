import prisma from "@/lib/prisma";

export const getPosts = async () => {
  return await prisma.post.findMany();
};
