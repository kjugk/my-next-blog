"use client";

import { FormEvent, useState } from "react";
import { HtmlPreview } from "./HtmlPreview";
import { createPost } from "../../serverFunctions/createPost";

export const PostEditor = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createPost(title, body);
    console.log("submit");
  };

  return (
    <div className="p-4 bg-base-200 h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col h-full">
        <div className="form-control">
          <label className="label" htmlFor="title">
            タイトル
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 flex-1 overflow-hidden">
          <div className="form-control">
            <label className="label" htmlFor="body">
              本文
            </label>
            <textarea
              id="body"
              name="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="textarea textarea-bordered w-full h-full"
            ></textarea>
          </div>

          <HtmlPreview body={body} />
        </div>
      </form>
    </div>
  );
};
