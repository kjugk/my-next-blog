"use server";

import prisma from "@/lib/prisma";
import { cacheTags } from "@/services/cache";
import { generateOgpImage, uploadOgpImage } from "@/services/ogp";
import { ServerFunctionResponse } from "@/types";
import { Post } from "@prisma/client";
import { revalidateTag } from "next/cache";

const getOgpImageFileName = async (title: string): Promise<string> => {
  const ogpImage = await generateOgpImage(title);
  return uploadOgpImage(ogpImage);
};

export const changePostPublication = async (
  id: number,
  title: string,
  publish: boolean,
): Promise<ServerFunctionResponse<Post>> => {
  try {
    const post = await prisma.post.update({
      where: {
        id: Number(id),
      },
      data: {
        published: publish,
        publishedAt: publish ? new Date() : null,
        // TODO: title が変更されている場合のみ OGP画像を生成する
        ...(publish && { ogImageFilename: await getOgpImageFileName(title) }),
      },
    });

    revalidateTag(cacheTags.posts); // published posts のキャッシュを無効化

    return {
      status: "success",
      message: publish ? "Postを公開しました" : "Postを非公開にしました",
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
