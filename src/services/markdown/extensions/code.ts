import { MarkedExtension, Tokens } from "marked";
import { markedHighlight } from "marked-highlight";

import hljs from "highlight.js/lib/core";
import plaintext from "highlight.js/lib/languages/plaintext";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";

import "highlight.js/styles/panda-syntax-dark.css";

// ハイライト表示用の言語を登録
hljs.registerLanguage("plaintext", plaintext);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);

export const customCodeExtension: MarkedExtension = {
  ...markedHighlight({
    emptyLangClass: "hljs",
    langPrefix: "hljs language-",
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  }),

  renderer: {
    code({ text, lang }: Tokens.Code): string {
      return (
        `<pre><code class="hljs language-${lang}">` + text + "</code></pre>"
      );
    },
  },
};
