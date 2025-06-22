import { describe, expect, it } from "vitest";
import { escapeHtml } from "./index";

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

  it("should return empty string for non-string input", () => {
    expect(escapeHtml(null as any)).toBe("");
    expect(escapeHtml(undefined as any)).toBe("");
    expect(escapeHtml(123 as any)).toBe("");
    expect(escapeHtml({} as any)).toBe("");
    expect(escapeHtml([] as any)).toBe("");
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