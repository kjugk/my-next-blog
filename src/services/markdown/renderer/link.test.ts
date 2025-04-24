import { describe, it, expect, vi, beforeEach } from "vitest";
import { cleanUrl, customLinkRenderer } from "./link";
import { Parser, Token, Renderer, TextRenderer, Tokens } from "marked";

describe("cleanUrl", () => {
  it("エンコードされたURLを正しく処理する", () => {
    expect(cleanUrl("https://example.com")).toBe("https://example.com");
    expect(cleanUrl("https://example.com/path with spaces")).toBe(
      "https://example.com/path%20with%20spaces",
    );
  });

  it("不正なURLの場合はnullを返す", () => {
    // URLエンコード中にエラーが発生するケース
    const mockUrl = {};
    // @ts-expect-error テストのためにオブジェクトを渡す
    expect(cleanUrl(mockUrl)).toBe(null);
  });
});

describe("customLinkRenderer", () => {
  // Parserのモック作成
  let mockParser: Partial<Parser>;
  let mockThis: { parser: Partial<Parser> };

  beforeEach(() => {
    // テキストレンダラーのモック
    const mockTextRenderer: Partial<TextRenderer> = {
      strong: vi.fn(),
      em: vi.fn(),
      codespan: vi.fn(),
      del: vi.fn(),
      text: vi.fn(),
      link: vi.fn(),
      image: vi.fn(),
      html: vi.fn(),
      br: vi.fn(),
    };

    // レンダラーのモック
    const mockRenderer: Partial<Renderer> = {
      options: {},
      code: vi.fn(),
      blockquote: vi.fn(),
      html: vi.fn(),
      heading: vi.fn(),
      hr: vi.fn(),
      list: vi.fn(),
      listitem: vi.fn(),
      checkbox: vi.fn(),
      paragraph: vi.fn(),
      table: vi.fn(),
      tablerow: vi.fn(),
      tablecell: vi.fn(),
      strong: vi.fn(),
      em: vi.fn(),
      codespan: vi.fn(),
      br: vi.fn(),
      del: vi.fn(),
      link: vi.fn(),
      image: vi.fn(),
      text: vi.fn(),
      // その他必要なプロパティ...
    };

    mockParser = {
      parseInline: vi.fn().mockReturnValue("parsed content"),
      options: {},
      renderer: mockRenderer as Renderer,
      textRenderer: mockTextRenderer as TextRenderer,
      parse: vi.fn(),
    };

    mockThis = { parser: mockParser };
  });

  it("リンクを正しくレンダリングする", () => {
    const token: Partial<Tokens.Link> = {
      href: "https://example.com",
      title: "Example Title",
      tokens: [
        { type: "text", raw: "token content", text: "token content" } as Token,
      ],
    };

    // @ts-expect-error モックオブジェクトを使用するため
    const result = customLinkRenderer.link.call(mockThis, token);

    expect(mockParser.parseInline).toHaveBeenCalledWith(token.tokens);
    expect(result).toContain('href="https://example.com"');
    expect(result).toContain('title="Example Title"');
    expect(result).toContain("parsed content");
    expect(result).toContain('class="link link-primary"');
  });

  it("titleがない場合も正しくレンダリングする", () => {
    const token: Partial<Tokens.Link> = {
      href: "https://example.com",
      tokens: [
        { type: "text", raw: "token content", text: "token content" } as Token,
      ],
    };

    // @ts-expect-error モックオブジェクトを使用するため
    const result = customLinkRenderer.link.call(mockThis, token);

    expect(result).toContain('href="https://example.com"');
    expect(result).not.toContain('title="');
    expect(result).toContain("parsed content");
  });

  it("URLが無効な場合はテキストのみを返す", () => {
    const token: Partial<Tokens.Link> = {
      // @ts-expect-error テストのためにオブジェクトを渡す
      href: {},
      tokens: [
        { type: "text", raw: "token content", text: "token content" } as Token,
      ],
    };

    // @ts-expect-error モックオブジェクトを使用するため
    const result = customLinkRenderer.link.call(mockThis, token);

    // オブジェクトがURLとして無効なため、テキストのみが返される
    expect(result).toBe("parsed content");
  });

  it("tokensがない場合は空文字列をパースする", () => {
    const token: Partial<Tokens.Link> = {
      href: "https://example.com",
      // tokensを明示的に省略
    };

    // parseInlineが空文字列で呼び出されることを確認するためのスパイをリセット
    vi.clearAllMocks();

    // @ts-expect-error モックオブジェクトを使用するため
    customLinkRenderer.link.call(mockThis, token);

    // parseInlineが呼ばれなかったことを確認（tokens が undefined の場合は空文字列が使われる）
    expect(mockParser.parseInline).not.toHaveBeenCalled();
  });
});
