import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";

import hljs from "highlight.js/lib/core";
import plaintext from "highlight.js/lib/languages/plaintext";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";

import "highlight.js/styles/panda-syntax-dark.css";

import { messageBoxExtension } from "./extensions/messageBox";
import { customLinkRenderer } from "./renderer/link";
import { customCodeRenderer } from "./renderer/code";

// ハイライト表示用の言語を登録
hljs.registerLanguage("plaintext", plaintext);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);

let instance: Marked | undefined = undefined;

/**
 * Marked.jsのインスタンスを取得する
 * シングルトンパターンでインスタンスを管理し、一度作成したインスタンスを再利用する
 */
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

    // カスタムリンクレンダラーと改行の有効化を設定
    _instance.use({ breaks: true, renderer: customLinkRenderer });
    _instance.use({ breaks: true, renderer: customCodeRenderer });

    // カスタムメッセージボックス拡張を設定
    _instance.use(messageBoxExtension);

    instance = _instance;
  }

  return instance;
}
