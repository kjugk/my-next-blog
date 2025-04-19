import { PostList } from "@/features/post/components/postList/PostList";
import { Suspense } from "react";

export const metadata = {
  title: "Tags",
  description: "All articles I've posted.",
};

type Params = {
  tagName: string;
};

export default async function Page({ params }: { params: Promise<Params> }) {
  const { tagName } = await params;

  return (
    <main className="container py-8">
      <h1 className="text-4xl font-bold">Tag: {tagName}</h1>
      <p className="mt-2 text-muted-foreground">
        All articles with tag &quot;{tagName}&quot;
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <PostList className="mt-6" tagName={tagName} />
      </Suspense>
    </main>
  );
}
