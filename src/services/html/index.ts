/**
 * HTML属性値を安全にエスケープする
 * XSS攻撃を防ぐために危険な文字をHTMLエンティティに変換
 *
 * @param unsafe エスケープする文字列
 * @returns エスケープされた安全な文字列
 */
export function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

/**
 * テキストをURL安全なslugに変換する
 * セキュリティを考慮してHTML属性として安全な文字列を生成
 *
 * @param text 変換するテキスト
 * @returns URL安全なslug文字列
 */
export function createSlug(text: string): string {
  // HTMLエンティティをデコードしてからエンコード
  const cleanText = text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'");

  // percent encodeして、さらにHTML属性として危険な文字をフィルタ
  return encodeURIComponent(cleanText)
    .replace(/['"<>]/g, "") // HTML属性として危険な文字を除去
    .substring(0, 100); // 長さ制限
}
