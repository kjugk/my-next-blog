"use server";

import prisma from "@/lib/prisma";
import { cacheTags } from "@/services/cache";
import { ServerFunctionResponse } from "@/types";
import { Post } from "@prisma/client";
import { revalidateTag } from "next/cache";

export const deletePost = async (
  id: number,
): Promise<ServerFunctionResponse<Post>> => {
  try {
    const post = await prisma.post.delete({
      where: {
        id,
      },
    });

    revalidateTag(cacheTags.posts);
    revalidateTag(cacheTags.tags);

    return {
      status: "success",
      message: "投稿を削除しました。",
      data: post,
    };
  } catch (e) {
    console.error(e);

    return {
      status: "error",
      message: "投稿の削除が失敗しました",
    };
  }
};
