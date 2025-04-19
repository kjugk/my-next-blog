import Heading from "@/components/typography/heading/Heading";
import { PostList } from "@/features/post/components/postList/PostList";
import { Suspense } from "react";

export const metadata = {
  title: "Posts",
  description: "All articles I've posted.",
};

export default function Page() {
  return (
    <main className="container py-8">
      <Heading as="h1" size="3xl">
        Posts
      </Heading>
      <p className="mt-2 text-muted-foreground">
        All articles I&apos;ve posted.
      </p>
      <Suspense fallback={<div>Loading...</div>}>
        <PostList className="mt-6" />
      </Suspense>
    </main>
  );
}
