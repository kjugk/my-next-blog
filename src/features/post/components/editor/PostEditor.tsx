"use client";

import { HtmlPreview } from "./HtmlPreview";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { postFormSchema, PostFormSchemaType } from "./postFormSchema";
import { Post, Tag } from "@prisma/client";
import { PublishConfirmDialog } from "../publishConfirmDialog";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { ImageUploadButton } from "./ImageUploadButton";

type Props = {
  post?: Post & {
    tags: Tag[];
  };
  mode: "create" | "edit";
  onSubmit: (values: PostFormSchemaType) => void;
};

export const PostEditor = ({ post, mode, onSubmit }: Props) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const form = useForm<PostFormSchemaType>({
    resolver: zodResolver(postFormSchema),
    defaultValues: post
      ? { ...post, tags: post.tags.map((t) => t.name).join(",") }
      : {
          title: "",
          body: "",
          tags: "",
        },
  });
  const body = form.watch("body");

  return (
    <Form {...form}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="h-full">
        <div className="py-4 flex flex-col gap-4 h-full">
          <div className="flex justify-end gap-2">
            <Button type="submit">{post ? "更新" : "下書き保存"}</Button>
            {mode === "edit" && post && (
              <PublishConfirmDialog id={post.id} title={post.title} />
            )}
          </div>

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="p1">
                <FormLabel htmlFor="title">タイトル</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem className="p1">
                <FormLabel htmlFor="title">タグ</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4 flex-1 overflow-hidden p-1">
            <div className="space-y-2">
              <ImageUploadButton
                onUploadCompleted={({ url, fileName }) => {
                  const textarea = textAreaRef.current;
                  if (textarea) {
                    const cursorPosition = textarea.selectionStart || 0;
                    const markdownImage = `![${fileName}](${url})`;
                    const updatedBody =
                      body.slice(0, cursorPosition) +
                      "\n" +
                      markdownImage +
                      "\n" +
                      body.slice(cursorPosition);
                    form.setValue("body", updatedBody);
                  }
                }}
              />
              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem className="h-full flex flex-col ">
                    <FormControl>
                      <Textarea
                        {...field}
                        ref={textAreaRef}
                        className="h-full"
                      ></Textarea>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <HtmlPreview body={body} />
          </div>
        </div>
      </form>
    </Form>
  );
};
