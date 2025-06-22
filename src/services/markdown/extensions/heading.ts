import { MarkedExtension, Tokens } from "marked";
import { escapeHtml, createSlug } from "../../html";

/**
 * カスタムヘディングレンダラー
 * ホバー時にアンカーリンクを表示するヘディングを生成する
 */

export const customHeadingExtension: MarkedExtension = {
  renderer: {
    heading({ text, depth }: Tokens.Heading): string {
      const tag = `h${depth}`;
      const slug = createSlug(text);
      const escapedSlug = escapeHtml(slug);

      return `
        <${tag} id="${escapedSlug}" class="group relative before:content-[''] before:absolute before:-left-8 before:top-0 before:w-8 before:h-full">
          ${text}
          <a href="#${escapedSlug}" class="opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity duration-200 absolute -left-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary no-underline text-sm font-normal" aria-label="この見出しへのリンク">
            #
          </a>
        </${tag}>
      `;
    },
  },
};
