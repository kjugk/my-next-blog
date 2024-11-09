"use server";

import prisma from "@/lib/prisma";
import { ServerFunctionResponse } from "@/types";
import { Post } from "@prisma/client";

export const updatePost = async (
  id: string,
  title: string,
  body: string,
): Promise<ServerFunctionResponse<Post>> => {
  try {
    const post = await prisma.post.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        body,
      },
    });

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
