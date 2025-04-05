"use client";

import React from "react";
import { PostFormSchemaType } from "../editor/postFormSchema";
import { updatePost } from "../../serverFunctions/editPost";
import { useToast } from "@/hooks/use-toast";
import { useTransition } from "react";
import { PostEditor } from "../editor/PostEditor";
import { Post, Tag } from "@prisma/client";
import { useRouter } from "next/navigation";

export const EditPostContainer = ({
  post,
}: {
  post: Post & { tags: Tag[] };
}) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const { toast } = useToast();

  const handleSubmit = (values: PostFormSchemaType) => {
    startTransition(async () => {
      const res = await updatePost(
        post.id,
        values.title,
        values.body,
        values.tags
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t !== ""),
      );

      toast({
        title: res.message,
        variant: res.status === "error" ? "destructive" : "default",
      });

      if (res.status === "success") {
        router.push("/admin/drafts");
      }
    });
  };

  return <PostEditor post={post} onSubmit={handleSubmit} mode="edit" />;
};
