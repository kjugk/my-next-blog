"use client";

import { getMarkedInstance } from "@/services/markdown";
import { Post, Tag } from "@prisma/client";
import React, { useEffect } from "react";
import { PostTimeStamp } from "../timestamp/TimeStamp";

const PostContent: React.FC<{ post: Post & { tags: Tag[] } }> = ({ post }) => {
  const marked = getMarkedInstance();

  useEffect(() => {
    const preElements = document.querySelectorAll("pre:has(code)");
    const buttonClassName = "copy-button";

    preElements.forEach((pre) => {
      const button = document.createElement("button");
      button.textContent = "Copy";
      button.className = `${buttonClassName} border rounded border-white px-2 absolute top-2 right-2 text-white hover:cursor-pointer`;

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
    <article className="prose-sm md:prose-base dark:prose-invert">
      <h1 className="mb-0 md:mb-0 font-bold">{post.title}</h1>

      <div className="flex items-center text-sm gap-4 mt-2">
        {post.publishedAt && <PostTimeStamp post={post} />}
        {post.tags.length > 0 && (
          <ul className="m-0! p-0! space-x-2">
            {post.tags.map((tag) => (
              <li key={tag.id} className="inline-block ">
                <a
                  href={`/tags/${tag.name}`}
                  className="text-primary hover:underline underline-offset-3"
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
