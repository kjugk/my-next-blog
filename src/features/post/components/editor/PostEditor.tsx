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
import { postFormSchema, PostFormSchemaType } from "../../postFormSchema";
import { Post } from "@prisma/client";

type Props = {
  post?: Post;
  onSubmit(values: PostFormSchemaType): void;
};

export const PostEditor = ({ post, onSubmit }: Props) => {
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
    <div className="p-4 bg-base-200 h-screen">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col h-full space-y-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="title">タイトル</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4 flex-1 overflow-hidden">
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem className="h-full flex flex-col p-1">
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
        </form>
      </Form>
    </div>
  );
};
