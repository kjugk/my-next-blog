import { Parser, Token, Tokens, TokensList } from "marked";

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
 * カスタムリンク用のトークン型定義
 */
export interface LinkToken {
  href: string;
  title?: string | null;
  text?: string;
  tokens?: Token[] | TokensList;
}

/**
 * マークダウンレンダラーのインターフェース
 */
export interface MarkedRenderer {
  parser: Parser;
  link(token: LinkToken): string;
}

/**
 * カスタムリンクレンダラー
 * 標準のリンクをTailwind CSS用のクラスが適用されたリンクにレンダリングする
 */
export const customLinkRenderer = {
  link(this: { parser: Parser }, { href, title, tokens }: LinkToken): string {
    // null または undefined の場合は空文字列を返す
    const text = tokens ? this.parser.parseInline(tokens) : "";
    const cleanHref = cleanUrl(href);
    if (cleanHref === null) {
      return text;
    }
    href = cleanHref;
    let out = '<a class="link link-primary" href="' + href + '"';
    if (title) {
      out += ' title="' + title + '"';
    }
    out += ">" + text + "</a>";
    return out;
  },
  code({ text, lang }: Tokens.Code): string {
    if (text.match(/^sequenceDiagram/) || text.match(/^graph/)) {
      return '<pre class="mermaid">' + text + "</pre>";
    }
    return `<pre><code class="hljs language-${lang}">` + text + "</code></pre>";
  },
};
