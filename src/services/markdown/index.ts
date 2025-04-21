import {
  Marked,
  MarkedExtension,
  Lexer,
  Parser,
  Token,
  TokensList,
} from "marked";
import { markedHighlight } from "marked-highlight";

import hljs from "highlight.js/lib/core";
import plaintext from "highlight.js/lib/languages/plaintext";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";

import "highlight.js/styles/panda-syntax-dark.css";

hljs.registerLanguage("plaintext", plaintext);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);

let instance: Marked | undefined = undefined;

function cleanUrl(href: string) {
  try {
    href = encodeURI(href).replace(/%25/g, "%");
  } catch {
    return null;
  }
  return href;
}

// Link トークンの型定義
interface LinkToken {
  href: string;
  title?: string | null;
  text?: string;
  tokens?: Token[] | TokensList;
}

interface MarkedRenderer {
  parser: Parser;
  link(token: LinkToken): string;
}

interface MessageBoxToken {
  type: string;
  raw: string;
  text: string;
  tokens: Token[] | TokensList;
}

interface BlockTokenizerThis {
  lexer: Lexer;
}

const renderer: Partial<MarkedRenderer> = {
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
};

// カスタムメッセージボックス拡張
const messageBoxExtension: MarkedExtension = {
  extensions: [
    {
      name: "message-box",
      level: "block",
      // 未使用の引数を削除
      tokenizer(this: BlockTokenizerThis, src: string) {
        const rule = /^:::message\s*\n([\s\S]*?)\n:::\s*(?:\n|$)/;
        const match = rule.exec(src);
        if (match) {
          const token: MessageBoxToken = {
            type: "message-box",
            raw: match[0],
            text: match[1].trim(),
            tokens: this.lexer.inlineTokens(match[1].trim(), []),
          };
          return token;
        }
        return undefined;
      },
      renderer(this: { parser: Parser }, token: Token) {
        // token が MessageBoxToken として扱えるかチェック
        const messageToken = token as MessageBoxToken;
        if (!messageToken || !messageToken.tokens) {
          return "";
        }
        return `<div class="bg-red-200 rounded p-2">${this.parser.parseInline(messageToken.tokens)}</div>\n`;
      },
    },
  ],
};

export function getMarkedInstance() {
  if (!instance) {
    const _instance = new Marked(
      markedHighlight({
        emptyLangClass: "hljs",
        langPrefix: "hljs language-",
        highlight(code, lang) {
          const language = hljs.getLanguage(lang) ? lang : "plaintext";
          return hljs.highlight(code, { language }).value;
        },
      }),
    );

    _instance.use({ breaks: true, renderer });
    _instance.use(messageBoxExtension);

    instance = _instance;
  }

  return instance;
}
