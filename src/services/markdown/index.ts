import { Marked, Tokens, MarkedExtension } from "marked";
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderer: any = {
  link({ href, title, tokens }: Tokens.Link): string {
    const text = this.parser.parseInline(tokens); // eslint-disable-line
    const cleanHref = cleanUrl(href);
    if (cleanHref === null) {
      return text; // eslint-disable-line
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
      tokenizer(src: string, tokens: any) {
        const rule = /^:::message\s*\n([\s\S]*?)\n:::\s*(?:\n|$)/;
        const match = rule.exec(src);
        if (match) {
          const token = {
            type: "message-box",
            raw: match[0],
            text: match[1].trim(),
            tokens: this.lexer.inlineTokens(match[1].trim(), []),
          };
          return token;
        }
        return undefined;
      },
      renderer(token: any) {
        if (!token || !token.tokens) {
          return "";
        }
        return `<div class="bg-red-200 rounded p-2">${this.parser.parseInline(token.tokens)}</div>\n`;
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

    _instance.use({ breaks: true, renderer }); // eslint-disable-line
    _instance.use(messageBoxExtension);

    instance = _instance;
  }

  return instance;
}
