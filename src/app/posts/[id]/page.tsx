import PostContent from "@/features/post/components/postContent/PostContent";
import { getPost } from "@/features/post/serverFunctions/getPost";

const PostPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    return <div>Post not found</div>;
  }

  return <PostContent post={post} />;
};

export default PostPage;
