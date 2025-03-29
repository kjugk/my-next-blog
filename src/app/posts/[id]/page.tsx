import { Container } from "@/components/layout/container/Container";
import PostContent from "@/features/post/components/postContent/PostContent";
import { getPost } from "@/features/post/serverFunctions/getPost";
import { getOgpUrl } from "@/services/ogp";
import { Suspense } from "react";
import { Metadata } from "next";

type Params = {
  id: string;
};

export const generateMetadata = async ({
  params,
}: {
  params: Params;
}): Promise<Metadata> => {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  return {
    title: post.title,
    openGraph: {
      title: post.title,
      images: getOgpUrl(post.title),
    },
  };
};

const PostPage = async ({ params }: { params: Params }) => {
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
