import { Container } from "@/components/layout/container/Container";
import PostContent from "@/features/post/components/postContent/PostContent";
import { getPost } from "@/features/post/serverFunctions/getPost";
import { Suspense } from "react";

const PostPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <Container>
      <Suspense fallback={<div>Loading post...</div>}>
        <PostContent post={post} />
      </Suspense>
    </Container>
  );
};

export default PostPage;
