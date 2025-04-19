import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTags = async () => {
  try {
    const tags = await prisma.tag.findMany({
      where: {
        posts: {
          some: {}, // Ensures the tag is associated with at least one post
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    console.log("Fetched tags:", tags);

    return tags;
  } catch (error) {
    console.error("Error fetching tags:", error);
    throw error;
  }
};
