/* eslint-disable */
// filepath: /Users/uegakikouji/project/my-next-blog/src/services/markdown/extensions/__tests__/messageBox.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { messageBoxExtension } from "../messageBox";
import { TokenizerAndRendererExtension } from "marked";

describe("messageBoxExtension", () => {
  it("エクステンションの構造が正しい", () => {
    expect(messageBoxExtension).toHaveProperty("extensions");
    expect(Array.isArray(messageBoxExtension.extensions)).toBe(true);

    // extensionsがnullまたはundefinedでないことを確認
    if (!messageBoxExtension.extensions) {
      throw new Error("messageBoxExtension.extensions is null or undefined");
    }

    const extension = messageBoxExtension.extensions[0] as any;
    expect(extension).toHaveProperty("name", "message-box");
    expect(extension).toHaveProperty("level", "block");
    expect(typeof extension.tokenizer).toBe("function");
    expect(typeof extension.renderer).toBe("function");
  });

  describe("tokenizer", () => {
    const mockLexer = {
      inlineTokens: vi.fn().mockReturnValue(["mockToken"]),
    };
    const mockThis = { lexer: mockLexer };

    // extensionsがnullまたはundefinedでないことを確認し、型アサーションを使用
    const tokenizer = (messageBoxExtension.extensions?.[0] as any)?.tokenizer;

    it("メッセージボックス構文を正しく解析する", () => {
      const src = ":::message\nTest message content\n:::\n";
      const result = tokenizer.call(mockThis, src);

      expect(mockLexer.inlineTokens).toHaveBeenCalledWith(
        "Test message content",
        [],
      );
      expect(result).toEqual({
        type: "message-box",
        raw: ":::message\nTest message content\n:::\n",
        text: "Test message content",
        tokens: ["mockToken"],
      });
    });

    it("メッセージボックス構文でない場合はundefinedを返す", () => {
      const src = "# This is not a message box\n";
      const result = tokenizer.call(mockThis, src);

      expect(result).toBeUndefined();
    });

    it("複数行のメッセージ内容を処理できる", () => {
      const src = ":::message\nFirst line\nSecond line\nThird line\n:::\n";
      const result = tokenizer.call(mockThis, src);

      expect(mockLexer.inlineTokens).toHaveBeenCalledWith(
        "First line\nSecond line\nThird line",
        [],
      );
      expect(result.text).toBe("First line\nSecond line\nThird line");
    });
  });

  describe("renderer", () => {
    const mockParser = {
      parseInline: vi.fn().mockReturnValue("<p>Rendered content</p>"),
    };
    const mockThis = { parser: mockParser };

    // extensionsがnullまたはundefinedでないことを確認し、型アサーションを使用
    const renderer = (messageBoxExtension.extensions?.[0] as any)?.renderer;

    it("メッセージボックストークンを正しくレンダリングする", () => {
      const token = {
        type: "message-box",
        raw: ":::message\nTest content\n:::",
        text: "Test content",
        tokens: ["mockToken"],
      };

      const result = renderer.call(mockThis, token);

      expect(mockParser.parseInline).toHaveBeenCalledWith(token.tokens);
      expect(result).toContain('<div class="bg-red-200 rounded p-2">');
      expect(result).toContain("<p>Rendered content</p>");
      expect(result).toContain("</div>");
    });

    it("tokensがない場合は空文字列を返す", () => {
      const token = {
        type: "message-box",
        raw: ":::message\n:::",
      };

      const result = renderer.call(mockThis, token);

      expect(result).toBe("");
    });
  });
});
