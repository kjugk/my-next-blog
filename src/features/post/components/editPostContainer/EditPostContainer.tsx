"use client";

import React from "react";
import { PostFormSchemaType } from "../../postFormSchema";
import { updatePost } from "../../serverFunctions/editPost";
import { useToast } from "@/hooks/use-toast";
import { useTransition } from "react";
import { PostEditor } from "../editor/PostEditor";
import { Post } from "@prisma/client";
import { useRouter } from "next/navigation";

export const EditPostContainer = ({ post }: { post: Post }) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const { toast } = useToast();

  const handleSubmit = (values: PostFormSchemaType) => {
    startTransition(async () => {
      const res = await updatePost(post.id, values.title, values.body);

      toast({
        title: res.message,
        variant: res.status === "error" ? "destructive" : "default",
      });

      if (res.status === "success") {
        router.push("/post/list");
      }
    });
  };

  return <PostEditor post={post} onSubmit={handleSubmit} />;
};
