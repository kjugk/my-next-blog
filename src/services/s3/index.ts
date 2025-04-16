import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

// 共通のAWSクライアント初期化関数
export const createS3Client = () => {
  return new S3Client({
    forcePathStyle: true,
    region: process.env.AWS_REGION || "",
    endpoint: process.env.AWS_ENDPOINT || "",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
  });
};

export const putImageToS3 = async (
  key: string,
  imageBuffer: Uint8Array<ArrayBufferLike>,
): Promise<void> => {
  const s3 = createS3Client();

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME || "",
    Key: key,
    Body: imageBuffer,
    ContentType: "image/png", // TODO: 画像の種類に応じて変更する
  });

  await s3.send(command);
};

export const getImageUrlFromS3 = (key: string): string => {
  const domain = process.env.AWS_ENDPOINT;
  return `${domain}/${process.env.AWS_BUCKET_NAME}/${key}`;
};
