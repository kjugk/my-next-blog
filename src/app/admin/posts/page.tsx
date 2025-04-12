import { AdminPostList } from "@/features/post/components/adminPostList/AdminPostList";
import { Suspense } from "react";

export default function Page() {
  return (
    <main className="container py-8">
      <h1 className="text-4xl font-bold">公開済投稿一覧</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <AdminPostList className="mt-6" published />
      </Suspense>
    </main>
  );
}
