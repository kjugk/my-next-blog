import prisma from "@/lib/prisma";

export const getPost = async (id: string) => {
  return await prisma.post.findUnique({
    where: {
      id: Number(id),
    },
  });
};
