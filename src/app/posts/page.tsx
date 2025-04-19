import { PostList } from "@/features/post/components/postList/PostList";
import { Suspense } from "react";

export const metadata = {
  title: "Posts",
  description: "All articles I've posted.",
};

export default function Page() {
  return (
    <main className="container py-8">
      <h1 className="text-4xl font-bold">Posts</h1>
      <p className="mt-2 text-muted-foreground">All articles I've posted.</p>
      <Suspense fallback={<div>Loading...</div>}>
        <PostList className="mt-6" />
      </Suspense>
    </main>
  );
}
