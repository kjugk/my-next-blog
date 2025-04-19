import { TagList } from "@/features/tag/components/tagList/TagList";
import { Suspense } from "react";

export const metadata = {
  title: "Tags",
  description: "All tags used in the blog.",
};

export default function Page() {
  return (
    <main className="container py-8">
      <h1 className="text-4xl font-bold">Tags</h1>
      <p className="mt-2 text-muted-foreground">All tags used in the blog.</p>

      <Suspense fallback={<div>Loading...</div>}>
        <TagList />
      </Suspense>
    </main>
  );
}
