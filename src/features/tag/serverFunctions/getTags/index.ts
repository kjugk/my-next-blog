import prisma from "@/lib/prisma";

export const getTags = async () => {
  try {
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
  } catch (error) {
    console.error("Error fetching tags:", error);
    throw error;
  }
};
