"use client";

import { getMarkedInstance } from "@/services/markdown";
import { Post, Tag } from "@prisma/client";
import React, { useEffect } from "react";

const PostContent: React.FC<{ post: Post & { tags: Tag[] } }> = ({ post }) => {
  const marked = getMarkedInstance();

  useEffect(() => {
    const preElements = document.querySelectorAll("pre:has(code)");
    const buttonClassName = "copy-button";

    preElements.forEach((pre) => {
      const button = document.createElement("button");
      button.textContent = "Copy";
      button.className = `${buttonClassName} border rounded border-white px-2`;
      button.style.marginLeft = "8px";

      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      button.addEventListener("click", async () => {
        const code = pre.querySelector("code")?.textContent || "";
        await navigator.clipboard.writeText(code);
        button.textContent = "Copied!";
        setTimeout(() => (button.textContent = "Copy"), 2000);
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
      <h1 className="mb-0">{post.title}</h1>

      <div className="flex justify-between items-center text-sm">
        {post.publishedAt && (
          <time>{new Date(post.publishedAt).toLocaleDateString()}</time>
        )}
        {post.tags.length > 0 && (
          <ul className="m-0 p-0">
            {post.tags.map((tag) => (
              <li key={tag.id} className="inline-block mr-2">
                <a
                  href={`/tags/${tag.name}`}
                  className="text-primary underline-offset-2"
                >
                  #{tag.name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div dangerouslySetInnerHTML={{ __html: marked.parse(post.body) }} />
    </article>
  );
};

export default PostContent;
