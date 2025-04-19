import puppeteer from "puppeteer";
import { getImageUrlFromS3, putImageToS3 } from "../s3";
import { generateRandomString } from "@/lib/utils";

const OGP_BUCKET_NAME = "ogp";

export const getOgpImage = (fileName: string | null) => {
  if (!fileName) return undefined;
  return getImageUrlFromS3(`${OGP_BUCKET_NAME}/${fileName}`);
};

export const generateOgpImage = async (title: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const bgUrl = getOgpImage("ogp-bg");

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
  const fileName = generateRandomString();
  const key = `${OGP_BUCKET_NAME}/${fileName}`;
  await putImageToS3(key, imageBuffer);

  return fileName;
};
