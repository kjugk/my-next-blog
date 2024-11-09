import { EditPostContainer } from "@/features/post/components/editPostContainer/EditPostContainer";
import { getPost } from "@/features/post/serverFunctions/getPost";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);

  if (post === null) {
    notFound();
  }

  return <EditPostContainer post={post} />;
}
