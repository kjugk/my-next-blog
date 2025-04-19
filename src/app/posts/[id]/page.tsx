import PostContent from "@/features/post/components/postContent/PostContent";
import { getPost } from "@/features/post/serverFunctions/getPost";
import { getOgpImage } from "@/services/ogp";
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
    return (
      <main className="container py-8">
        <div>404: Post not found</div>
      </main>
    );
  }

  return (
    <main className="container py-8">
      <PostContent post={post} />
    </main>
  );
};

export default PostPage;
