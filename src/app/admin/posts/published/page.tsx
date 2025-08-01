import { Container } from "@/components/layout/container/Container";
import Heading from "@/components/typography/heading/Heading";
import { AdminPostList } from "@/features/post/components/adminPostList/AdminPostList";
import { Suspense } from "react";

export default function Page() {
  return (
    <Container as="main" size="xl" className="p-8">
      <Heading size="3xl">公開済投稿一覧</Heading>
      <Suspense fallback={<div>Loading...</div>}>
        <AdminPostList className="mt-6" published />
      </Suspense>
    </Container>
  );
}
