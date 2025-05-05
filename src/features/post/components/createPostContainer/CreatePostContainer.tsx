"use client";

import React from "react";
import { PostFormSchemaType } from "../editor/postFormSchema";
import { useToast } from "@/hooks/use-toast";
import { useTransition } from "react";
import { createPost } from "../../serverFunctions/createPost";
import { PostEditor } from "../editor/PostEditor";
import { useRouter } from "next/navigation";

export const CreatePostContainer = () => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const { toast } = useToast();

  const handleSubmit = (values: PostFormSchemaType) => {
    startTransition(async () => {
      const { message, status, data } = await createPost(
        values.title,
        values.body,
        values.tags
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t !== ""),
      );

      toast({
        title: message,
        variant: status === "error" ? "destructive" : "default",
      });

      if (status === "success") {
        router.push(`/admin/posts/${data.id}/edit`);
      }
    });
  };

  return <PostEditor onSubmit={handleSubmit} mode="create" />;
};
