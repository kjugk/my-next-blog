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
import { Post } from "@prisma/client";
import { PublishConfirmDialog } from "../publishConfirmDialog";
import { Button } from "@/components/ui/button";

type Props = {
  post?: Post;
  mode: "create" | "edit";
  onSubmit(values: PostFormSchemaType): void;
};

export const PostEditor = ({ post, mode, onSubmit }: Props) => {
  const form = useForm<PostFormSchemaType>({
    resolver: zodResolver(postFormSchema),
    defaultValues: post
      ? { ...post }
      : {
          title: "",
          body: "",
        },
  });
  const body = form.watch("body");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="py-4 flex flex-col gap-4 h-screen">
          <div className="flex justify-end gap-2">
            <Button type="submit">下書き保存</Button>
            {mode === "edit" && post && <PublishConfirmDialog id={post.id} />}
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

          <div className="grid grid-cols-2 gap-4 flex-1 overflow-hidden p-1">
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem className="h-full flex flex-col ">
                  <FormLabel>本文</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="h-full"></Textarea>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <HtmlPreview body={body} />
          </div>
        </div>
      </form>
    </Form>
  );
};
