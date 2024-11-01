import { PostEditor } from "@/features/post/editor/PostEditor";

export default function Page() {
  return (
    <div>
      <h1>New Post</h1>

      <button className="btn btn-primary">Create</button>

      <PostEditor />
    </div>
  );
}
