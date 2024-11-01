"use client";

import { useState } from "react";
import { HtmlPreview } from "./HtmlPreview";

export const PostEditor = () => {
  const [body, setBody] = useState("");

  return (
    <div className="grid grid-cols-2 gap-4 p-4 bg-base-200 h-screen">
      <form>
        <textarea
          name="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="textarea textarea-bordered w-full h-full"
        ></textarea>
      </form>

      <HtmlPreview body={body} />
    </div>
  );
};
