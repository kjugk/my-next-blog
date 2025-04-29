import { EditPostContainer } from "@/features/post/components/editPostContainer/EditPostContainer";
import { getPost } from "@/features/post/serverFunctions/getPost";
import { notFound } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const post = await getPost(params.id);

  if (!post) {
    notFound();
  }

  return <EditPostContainer post={post} />;
}
