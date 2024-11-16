import { DraftList } from "@/features/post/components/draftList/DraftList";
import { Suspense } from "react";

export default async function Page() {
  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold">下書き一覧</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <DraftList className="mt-4" />
      </Suspense>
    </div>
  );
}
