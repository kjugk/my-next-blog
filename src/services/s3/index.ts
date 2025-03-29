import { S3Client } from "@aws-sdk/client-s3";

// 共通のAWSクライアント初期化関数
export const createS3Client = () => {
  return new S3Client({
    region: process.env.AWS_REGION || "",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
  });
};
