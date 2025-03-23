import { Container } from "@/components/layout/container/Container";
import { getMarkedInstance } from "@/services/markdown";
import { Post } from "@prisma/client";
import React from "react";

const PostContent: React.FC<{ post: Post }> = ({ post }) => {
  const marked = getMarkedInstance();

  return (
    <Container>
      <article className="py-8">
        <h1 className="text-4xl font-bold">{post.title}</h1>
        {post.publishedAt && (
          <time className="mt-4">
            {new Date(post.publishedAt).toLocaleDateString()}
          </time>
        )}

        <div className="prose dark:prose-invert">
          <div dangerouslySetInnerHTML={{ __html: marked.parse(post.body) }} />
        </div>
      </article>
    </Container>
  );
};

export default PostContent;
