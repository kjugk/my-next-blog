"use server";

import prisma from "@/lib/prisma";
import { generateOgpImage, uploadOgpImage } from "@/services/ogp";
import { ServerFunctionResponse } from "@/types";
import { Post } from "@prisma/client";
import { revalidateTag } from "next/cache";

export const publishPost = async (
  id: number,
  title: string,
): Promise<ServerFunctionResponse<Post>> => {
  const ogpImage = await generateOgpImage(title);
  const fileName = await uploadOgpImage(ogpImage);

  try {
    const post = await prisma.post.update({
      where: {
        id: Number(id),
      },
      data: {
        published: true,
        publishedAt: new Date(),
        ogImageFilename: fileName,
      },
    });

    revalidateTag("posts"); // published posts のキャッシュを無効化

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
