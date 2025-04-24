import { Tokens } from "marked";

export const customCodeRenderer = {
  code({ text, lang }: Tokens.Code): string {
    if (text.match(/^sequenceDiagram/) || text.match(/^graph/)) {
      return '<pre class="mermaid">' + text + "</pre>";
    }
    return `<pre><code class="hljs language-${lang}">` + text + "</code></pre>";
  },
};
