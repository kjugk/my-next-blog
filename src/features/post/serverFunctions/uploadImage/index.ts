"use server";

import { createS3Client } from "@/services/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export async function uploadFileToS3(file: File): Promise<string> {
  const s3 = createS3Client();
  const key = `post-image/${Date.now()}-${file.name}`;

  // File 型のデータを Buffer に変換
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
