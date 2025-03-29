import puppeteer from "puppeteer";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const createKey = (title: string) => {
  return `ogp/${encodeURIComponent(title)}.png`;
};

export const getOgpUrl = (title: string) => {
  const key = createKey(title);
  return `https://${process.env.AWS_BUCKET_DOMAIN}/${key}`;
};

export const generateOgpImage = async (title: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const bgUrl = getOgpUrl("ogp-bg");

  await page.setViewport({ width: 1200, height: 630 });

  await page.setContent(`
    <html>
      <body style="margin:0; background-image: url(${bgUrl}); background-size: contain; display:flex; align-items:center; justify-content:center; text-wrap: balance; border-radius: 10px; overflow:hidden;">
        <h1 style="color:black; font-size:60px; text-align:center;">${title}</h1>
      </body>
    </html>
  `);

  const buffer = await page.screenshot({ type: "png" });
  await browser.close();

  return buffer;
};

export const uploadOgpImage = async (
  imageBuffer: Uint8Array<ArrayBufferLike>,
  title: string,
) => {
  const key = createKey(title);
  const s3Client = new S3Client({
    region: process.env.AWS_REGION || "",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
  });

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME || "",
    Key: key,
    Body: imageBuffer,
    ContentType: "image/png",
  });

  await s3Client.send(command);

  return getOgpUrl(title);
};
