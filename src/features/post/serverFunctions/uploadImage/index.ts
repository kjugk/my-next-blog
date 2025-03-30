"use server";

import { createS3Client } from "@/services/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export async function uploadFileToS3(file: File): Promise<string> {
  const s3 = createS3Client();
  // TODO: uuid を使うか検討する
  const key = `post-image/${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME || "",
    Key: key,
    Body: buffer,
    ContentType: file.type,
  });

  await s3.send(command);

  const domain = process.env.AWS_ENDPOINT;
  return `${domain}/${process.env.AWS_BUCKET_NAME}/${key}`;
}
