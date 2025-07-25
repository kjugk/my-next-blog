import {
  Lexer,
  Parser,
  Token,
  TokensList,
  TokenizerAndRendererExtension,
} from "marked";

interface MessageBoxToken {
  type: string;
  raw: string;
  text: string;
  tokens: Token[] | TokensList;
}

interface BlockTokenizerThis {
  lexer: Lexer;
}

/**
 * カスタムメッセージボックス拡張
 * :::message
 * メッセージ内容
 * :::
 * という形式のマークダウンを赤背景のメッセージボックスにレンダリングする
 */
export const messageBoxExtension: TokenizerAndRendererExtension = {
  name: "message-box",
  level: "block",
  tokenizer(this: BlockTokenizerThis, src: string) {
    const rule = /^:::message\s*\n([\s\S]*?)\n:::\s*(?:\n|$)/;
    const match = rule.exec(src);
    if (match) {
      const token: MessageBoxToken = {
        type: "message-box",
        raw: match[0],
        text: match[1].trim(),
        tokens: this.lexer.blockTokens(match[1].trim()), // ブロックトークンとして解釈
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
    return `<div class="bg-red-200 rounded p-2">${this.parser.parse(messageToken.tokens)}</div>\n`;
  },
};
