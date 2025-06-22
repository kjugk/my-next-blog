import { describe, expect, it } from "vitest";
import { escapeHtml, createSlug } from "./index";

describe("escapeHtml", () => {
  it("should escape basic HTML characters", () => {
    const input = '<script>alert("xss")</script>';
    const expected = '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;';
    expect(escapeHtml(input)).toBe(expected);
  });

  it("should escape ampersand characters", () => {
    const input = "Tom & Jerry";
    const expected = "Tom &amp; Jerry";
    expect(escapeHtml(input)).toBe(expected);
  });

  it("should escape quotes", () => {
    const input = `He said "Hello" and she said 'Hi'`;
    const expected = "He said &quot;Hello&quot; and she said &#x27;Hi&#x27;";
    expect(escapeHtml(input)).toBe(expected);
  });

  it("should escape all dangerous characters together", () => {
    const input = `<div class="test" data-value='&"'>Content</div>`;
    const expected = `&lt;div class=&quot;test&quot; data-value=&#x27;&amp;&quot;&#x27;&gt;Content&lt;/div&gt;`;
    expect(escapeHtml(input)).toBe(expected);
  });


  it("should handle empty string", () => {
    expect(escapeHtml("")).toBe("");
  });

  it("should handle normal text without special characters", () => {
    const input = "Hello World";
    expect(escapeHtml(input)).toBe("Hello World");
  });

  it("should handle text with numbers and symbols", () => {
    const input = "Price: $100 + tax";
    expect(escapeHtml(input)).toBe("Price: $100 + tax");
  });

  it("should escape multiple instances of the same character", () => {
    const input = '"""&&&<<<>>>';
    const expected = '&quot;&quot;&quot;&amp;&amp;&amp;&lt;&lt;&lt;&gt;&gt;&gt;';
    expect(escapeHtml(input)).toBe(expected);
  });

  it("should handle potential XSS attack vectors", () => {
    const xssAttempts = [
      '<img src="x" onerror="alert(1)">',
      'javascript:alert("xss")',
      '<svg onload="alert(1)">',
      '"><script>alert("xss")</script>',
      "';alert('xss');//"
    ];

    xssAttempts.forEach(xss => {
      const result = escapeHtml(xss);
      expect(result).not.toContain('<');
      expect(result).not.toContain('>');
      expect(result).not.toContain('"');
      expect(result).not.toContain("'");
    });
  });
});

describe("createSlug", () => {
  it("should create basic slug from simple text", () => {
    expect(createSlug("Hello World")).toBe("Hello%20World");
  });

  it("should handle Japanese text", () => {
    const input = "こんにちは世界";
    const result = createSlug(input);
    expect(result).toBe(encodeURIComponent(input));
  });

  it("should decode HTML entities before encoding", () => {
    const input = "&amp;Hello&lt;World&gt;";
    const result = createSlug(input);
    // &amp; -> & -> %26, &lt; -> < -> %3C (then filtered), &gt; -> > -> %3E (then filtered)
    expect(result).toBe("%26Hello%3CWorld%3E");
  });

  it("should remove dangerous HTML characters", () => {
    const input = 'Hello "World" & <script>';
    const result = createSlug(input);
    expect(result).not.toContain('"');
    expect(result).not.toContain("'");
    expect(result).not.toContain('<');
    expect(result).not.toContain('>');
  });

  it("should handle all HTML entities", () => {
    const input = "&amp;&lt;&gt;&quot;&#x27;";
    const result = createSlug(input);
    // Entities are decoded first: & < > " '
    // Then encoded: %26 %3C %3E %22 '
    // Then dangerous chars filtered: %26%3C%3E%22 (single quote ' removed)
    expect(result).toBe("%26%3C%3E%22");
  });

  it("should limit length to 100 characters", () => {
    const longText = "a".repeat(200);
    const result = createSlug(longText);
    expect(result.length).toBeLessThanOrEqual(100);
  });

  it("should handle empty string", () => {
    expect(createSlug("")).toBe("");
  });


  it("should handle special characters and symbols", () => {
    const input = "Hello@World#Test$";
    const result = createSlug(input);
    expect(result).toBe("Hello%40World%23Test%24");
  });

  it("should handle mixed content", () => {
    const input = "記事タイトル - Article Title (2024)";
    const result = createSlug(input);
    expect(result).toContain("%E8%A8%98%E4%BA%8B"); // 記事の一部
    expect(result).toContain("Article");
    expect(result).toContain("Title");
    expect(result).toContain("2024");
  });

  it("should create consistent slugs for same input", () => {
    const input = "Test Heading";
    const result1 = createSlug(input);
    const result2 = createSlug(input);
    expect(result1).toBe(result2);
  });

  it("should handle potential XSS in slug context", () => {
    const xssAttempts = [
      'javascript:alert("xss")',
      '<img src="x" onerror="alert(1)">',
      '"><script>alert("xss")</script>',
      "';alert('xss');//"
    ];

    xssAttempts.forEach(xss => {
      const result = createSlug(xss);
      expect(result).not.toContain('<');
      expect(result).not.toContain('>');
      expect(result).not.toContain('"');
      expect(result).not.toContain("'");
    });
  });
});