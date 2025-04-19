import PostContent from "@/features/post/components/postContent/PostContent";
import { getPost } from "@/features/post/serverFunctions/getPost";
import { getOgpImage } from "@/services/ogp";
import { Suspense } from "react";
import { Metadata } from "next";

type Params = {
  id: string;
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<Params>;
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
      images: getOgpImage(post.ogImageFilename),
    },
  };
};

const PostPage = async ({ params }: { params: Promise<Params> }) => {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <main className="container py-8">
      <Suspense fallback={<div>Loading post...</div>}>
        <PostContent post={post} />
      </Suspense>
    </main>
  );
};

export default PostPage;
