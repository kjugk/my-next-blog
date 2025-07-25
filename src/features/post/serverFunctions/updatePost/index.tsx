"use server";

import prisma from "@/lib/prisma";
import { cacheTags } from "@/services/cache";
import { ServerFunctionResponse } from "@/types";
import { Post } from "@prisma/client";
import { revalidateTag } from "next/cache";

export const updatePost = async (
  id: number,
  title: string,
  body: string,
  tags: string[],
): Promise<ServerFunctionResponse<Post>> => {
  try {
    const post = await prisma.post.update({
      where: {
        id: Number(id),
      },
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
    });

    revalidateTag(cacheTags.posts);
    revalidateTag(cacheTags.tags);

    return {
      status: "success",
      message: "Postを更新しました",
      data: post,
    };
  } catch (e) {
    console.error(e);

    return {
      status: "error",
      message: "Postの更新が失敗しました",
    };
  }
};
