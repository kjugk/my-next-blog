import { Tokens } from "marked";

/**
 * URLをクリーンアップして安全な形式にエンコードする
 */
export function cleanUrl(href: string) {
  // 文字列以外が渡された場合はnullを返す
  if (typeof href !== "string") {
    return null;
  }

  try {
    href = encodeURI(href).replace(/%25/g, "%");
  } catch {
    return null;
  }
  return href;
}

/**
 * カスタムリンクレンダラー
 * 標準のリンクをTailwind CSS用のクラスが適用されたリンクにレンダリングする
 */
export const customLinkRenderer = {
  link({ text, href, title }: Tokens.Link): string {
    // null または undefined の場合は空文字列を返す
    const cleanHref = cleanUrl(href);
    if (cleanHref === null) {
      return text;
    }

    href = cleanHref;
    let out =
      '<a class="link text-primary underline-offset-4" href="' + href + '"';
    if (title) {
      out += ' title="' + title + '"';
    }
    out += ">" + text + "</a>";
    return out;
  },
};
