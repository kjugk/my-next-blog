"use server";

import prisma from "@/lib/prisma";
import { cacheTags } from "@/services/cache";
import { ServerFunctionResponse } from "@/types";
import { Post, Tag } from "@prisma/client";
import { revalidateTag } from "next/cache";

export const createPost = async (
  title: string,
  body: string,
  tags: string[],
): Promise<ServerFunctionResponse<Post & { tags: Tag[] }>> => {
  try {
    const post = await prisma.post.create({
      data: {
        title,
        body,
        tags: {
          connectOrCreate: tags.map((tag) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },
      include: {
        tags: true,
      },
    });

    revalidateTag(cacheTags.posts);
    revalidateTag(cacheTags.tags);

    return {
      status: "success",
      message: "投稿に成功しました",
      data: post,
    };
  } catch (e) {
    console.error(e);

    return {
      status: "error",
      message: "投稿に失敗しました",
    };
  }
};
