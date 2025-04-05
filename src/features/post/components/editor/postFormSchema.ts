import { z } from "zod";

const required = () => z.string().min(1, { message: "必須項目です" });

export const postFormSchema = z.object({
  title: required(),
  body: required(),
  tags: z.string(),
});

export type PostFormSchemaType = z.infer<typeof postFormSchema>;
