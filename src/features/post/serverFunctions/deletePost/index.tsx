"use server";

import prisma from "@/lib/prisma";
import { ServerFunctionResponse } from "@/types";
import { Post } from "@prisma/client";

export const deletePost = async (
  id: number,
): Promise<ServerFunctionResponse<Post>> => {
  try {
    const post = await prisma.post.delete({
      where: {
        id,
      },
    });

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
