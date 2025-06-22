import { Marked } from "marked";
import { customCodeExtension } from "./extensions/code";
import { messageBoxExtension } from "./extensions/messageBox";
import { customLinkExtension } from "./extensions/link";
import { customHeadingExtension } from "./extensions/heading";

let instance: Marked | undefined = undefined;

/**
 * Marked.jsのインスタンスを取得する
 * シングルトンパターンでインスタンスを管理し、一度作成したインスタンスを再利用する
 */
export function getMarkedInstance() {
  if (!instance) {
    const _instance = new Marked();
    _instance.use(customLinkExtension);
    _instance.use(customCodeExtension);
    _instance.use(customHeadingExtension);
    _instance.use({
      extensions: [messageBoxExtension],
    });

    instance = _instance;
  }

  return instance;
}
