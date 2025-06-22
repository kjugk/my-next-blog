/**
 * HTML属性値を安全にエスケープする
 * XSS攻撃を防ぐために危険な文字をHTMLエンティティに変換
 * 
 * @param unsafe エスケープする文字列
 * @returns エスケープされた安全な文字列
 */
export function escapeHtml(unsafe: string): string {
  if (typeof unsafe !== 'string') {
    return '';
  }

  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}