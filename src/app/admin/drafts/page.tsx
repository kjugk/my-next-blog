import { AdminPostList } from "@/features/post/components/adminPostList/AdminPostList";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold">下書き一覧</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <AdminPostList className="mt-4" published={false} />
      </Suspense>
    </div>
  );
}
