"use server";

import { generateRandomString } from "@/lib/utils";
import { getImageUrlFromS3, putImageToS3 } from "@/services/s3";

export async function uploadImage(file: File): Promise<string> {
  const key = `post-image/${generateRandomString()}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  await putImageToS3(key, buffer);
  return getImageUrlFromS3(key);
}
