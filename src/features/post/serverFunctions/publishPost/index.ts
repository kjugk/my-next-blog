"use server";

import prisma from "@/lib/prisma";
import { ServerFunctionResponse } from "@/types";
import { Post } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const publishPost = async (
  id: number,
): Promise<ServerFunctionResponse<Post>> => {
  try {
    const post = await prisma.post.update({
      where: {
        id: Number(id),
      },
      data: {
        published: true,
        publishedAt: new Date(),
      },
    });

    revalidatePath("/post/drafts");

    return {
      status: "success",
      message: "Postを公開しました",
      data: post,
    };
  } catch (e) {
    console.error(e);

    return {
      status: "error",
      message: "Postの公開が失敗しました",
    };
  }
};
