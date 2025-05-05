import { Container } from "@/components/layout/container/Container";
import Heading from "@/components/typography/heading/Heading";
import { PostList } from "@/features/post/components/postList/PostList";
import { Suspense } from "react";

export const metadata = {
  title: "Tags",
  description: "All articles I've posted.",
};

type Params = {
  tagName: string;
};

export default async function Page({ params }: { params: Promise<Params> }) {
  const { tagName } = await params;
  const decodedTagName = decodeURIComponent(tagName);

  return (
    <Container as="main" className="p-8">
      <Heading as="h1" size="3xl">
        Tag: {decodedTagName}
      </Heading>
      <p className="mt-2 text-muted-foreground">
        All articles with tag &quot;{decodedTagName}&quot;
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <PostList className="mt-6" tagName={decodedTagName} />
      </Suspense>
    </Container>
  );
}
