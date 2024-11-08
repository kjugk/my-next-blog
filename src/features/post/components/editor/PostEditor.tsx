"use client";

import { useTransition } from "react";
import { HtmlPreview } from "./HtmlPreview";
import { createPost } from "../../serverFunctions/createPost";
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
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { postFormSchema, PostFormSchemaType } from "../../postFormSchema";

export const PostEditor = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const form = useForm<PostFormSchemaType>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: "",
      body: "",
    },
  });
  const body = form.watch("body");

  const handleSubmit = (values: PostFormSchemaType) => {
    const { title, body } = values;

    startTransition(async () => {
      const res = await createPost(title, body);

      toast({
        title: res.message,
        variant: res.status === "error" ? "destructive" : "default",
      });

      router.push("/post/list");
    });
  };

  return (
    <div className="p-4 bg-base-200 h-screen">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
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
