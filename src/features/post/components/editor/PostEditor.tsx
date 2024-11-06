"use client";

import { FormEvent, useState } from "react";
import { HtmlPreview } from "./HtmlPreview";
import { createPost } from "../../serverFunctions/createPost";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export const PostEditor = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await createPost(title, body);

    toast({
      title: res.message,
      variant: res.status === "error" ? "destructive" : "default",
    });

    router.push("/post/list");
  };

  return (
    <div className="p-4 bg-base-200 h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col h-full space-y-4">
        <FormItem>
          <Label htmlFor="title">タイトル</Label>
          <Input
            id="title"
            name="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormItem>

        <div className="grid grid-cols-2 gap-4 flex-1 overflow-hidden">
          <FormItem className="h-full flex flex-col p-1">
            <Label htmlFor="body">本文</Label>
            <Textarea
              id="body"
              name="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="flex-1"
            ></Textarea>
          </FormItem>

          <HtmlPreview body={body} />
        </div>
      </form>
    </div>
  );
};
