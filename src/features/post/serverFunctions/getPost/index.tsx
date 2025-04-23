import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getPost = async (id: string) => {
  try {
    return prisma.post.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        tags: true,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientValidationError) {
      return undefined;
    }

    throw error;
  }
};
