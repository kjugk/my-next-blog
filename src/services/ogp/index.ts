import puppeteer from "puppeteer";
import { getImageUrlFromS3, putImageToS3 } from "../s3";
import { generateRandomString } from "@/lib/utils";

// TODO: DB に保存できるようにしたら削除する
export const getOgpUrl = (title: string) => {
  const key = `ogp/${encodeURIComponent(title.replace(/\s+/g, ""))}.png`;
  const domain = process.env.AWS_ENDPOINT;
  return `${domain}/${process.env.AWS_BUCKET_NAME}/${key}`;
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
): Promise<string> => {
  const key = `ogp/${generateRandomString()}.png`;
  await putImageToS3(key, imageBuffer);

  return getImageUrlFromS3(key);
};
