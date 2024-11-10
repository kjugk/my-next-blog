import { DraftList } from "@/features/post/components/draftList/DraftList";
import { getPosts } from "@/features/post/serverFunctions/getPosts";

export default async function Page() {
  const posts = await getPosts({ published: false });

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold">下書き一覧</h1>
      <DraftList drafts={posts} className="mt-4" />
    </div>
  );
}
