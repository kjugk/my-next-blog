import { Container } from "@/components/layout/container/Container";
import PostContent from "@/features/post/components/postContent/PostContent";
import { getPost } from "@/features/post/serverFunctions/getPost";
import { getOgpImage } from "@/services/ogp";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextResponse } from "next/server";

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
      title: "404: Post not found",
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
    notFound();
  }

  return (
    <Container as="main" className="p-8">
      <PostContent post={post} />
    </Container>
  );
};

export default PostPage;
