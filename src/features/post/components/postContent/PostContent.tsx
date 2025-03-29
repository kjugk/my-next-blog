"use client";

import { getMarkedInstance } from "@/services/markdown";
import { Post } from "@prisma/client";
import React, { useEffect } from "react";

const PostContent: React.FC<{ post: Post }> = ({ post }) => {
  const marked = getMarkedInstance();

  useEffect(() => {
    const preElements = document.querySelectorAll("pre:has(code)");
    const buttonClassName = "copy-button";

    preElements.forEach((pre) => {
      const button = document.createElement("button");
      button.textContent = "Copy";
      button.className = `${buttonClassName} border rounded border-white px-2`;
      button.style.marginLeft = "8px";

      button.addEventListener("click", () => {
        const code = pre.querySelector("code")?.textContent || "";
        navigator.clipboard.writeText(code).then(() => {
          button.textContent = "Copied!";
          setTimeout(() => (button.textContent = "Copy"), 2000);
        });
      });

      if (!pre.querySelector(`.${buttonClassName}`)) {
        pre.appendChild(button);
      }
    });

    return () => {
      preElements.forEach((pre) => {
        const button = pre.querySelector(`.${buttonClassName}`);
        if (button) {
          button.remove();
        }
      });
    };
  }, [post.body]);

  return (
    <article className="py-8 prose dark:prose-invert">
      <h1>{post.title}</h1>

      {post.publishedAt && (
        <time>{new Date(post.publishedAt).toLocaleDateString()}</time>
      )}

      <div dangerouslySetInnerHTML={{ __html: marked.parse(post.body) }} />
    </article>
  );
};

export default PostContent;
