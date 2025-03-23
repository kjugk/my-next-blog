import { Container } from "@/components/layout/container/Container";
import { PostList } from "@/features/post/components/postList/PostList";
import { Suspense } from "react";

export default async function Page() {
  return (
    <div className="container mx-auto">
      <Container>
        <h1 className="text-4xl font-bold">Articles</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <PostList className="mt-4" />
        </Suspense>
      </Container>
    </div>
  );
}
