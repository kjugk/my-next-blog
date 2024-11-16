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
      const res = await createPost(values.title, values.body);

      toast({
        title: res.message,
        variant: res.status === "error" ? "destructive" : "default",
      });

      if (res.status === "success") {
        router.push("/admin/drafts");
      }
    });
  };

  return <PostEditor onSubmit={handleSubmit} />;
};
