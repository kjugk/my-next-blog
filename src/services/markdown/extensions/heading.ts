import { MarkedExtension, Tokens } from "marked";

/**
 * テキストをURL安全なslugに変換する
 * セキュリティを考慮してHTML属性として安全な文字列を生成
 */
function createSlug(text: string): string {
  // HTMLエンティティをデコードしてからエンコード
  const cleanText = text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'");
  
  // percent encodeして、さらにHTML属性として危険な文字をフィルタ
  return encodeURIComponent(cleanText)
    .replace(/['"<>]/g, '') // HTML属性として危険な文字を除去
    .substring(0, 100); // 長さ制限
}

/**
 * カスタムヘディングレンダラー
 * ホバー時にアンカーリンクを表示するヘディングを生成する
 */
/**
 * HTML属性値を安全にエスケープ
 */
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

export const customHeadingExtension: MarkedExtension = {
  renderer: {
    heading({ text, depth }: Tokens.Heading): string {
      const slug = createSlug(text);
      const tag = `h${depth}`;
      const escapedSlug = escapeHtml(slug);
      
      return `
        <${tag} id="${escapedSlug}" class="heading-with-anchor group relative">
          ${text}
          <a href="#${escapedSlug}" class="anchor-link opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute -left-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary no-underline" aria-label="この見出しへのリンク">
            #
          </a>
        </${tag}>
      `;
    },
  },
};