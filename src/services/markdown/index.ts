import { Marked, Tokens } from "marked";
import { markedHighlight } from "marked-highlight";

import hljs from "highlight.js/lib/core";
import plaintext from "highlight.js/lib/languages/plaintext";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";

import "highlight.js/styles/monokai.css";

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
    const text = this.parser.parseInline(tokens);
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

    instance = _instance;
  }

  return instance;
}
