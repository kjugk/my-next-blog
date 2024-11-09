"use client";

import React from "react";
import { PostFormSchemaType } from "../../postFormSchema";
import { updatePost } from "../../serverFunctions/editPost";
import { useToast } from "@/hooks/use-toast";
import { useTransition } from "react";
import { useRouter } from "next/router";

export const EditPostContainer = ({ id }: { id: string }) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const { toast } = useToast();

  const handleSubmit = (values: PostFormSchemaType) => {
    startTransition(async () => {
      const res = await updatePost(id, values.title, values.body);

      toast({
        title: res.message,
        variant: res.status === "error" ? "destructive" : "default",
      });

      if (res.status === "success") {
        router.push("/post/list");
      }
    });
  };

  return <div>Edit Post Container</div>;
};
