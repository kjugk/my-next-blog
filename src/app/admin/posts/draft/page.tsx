import { Container } from "@/components/layout/container/Container";
import Heading from "@/components/typography/heading/Heading";
import { AdminPostList } from "@/features/post/components/adminPostList/AdminPostList";
import { Suspense } from "react";

export default function Page() {
  return (
    <Container as="main" className="p-8">
      <Heading as="h1" size="3xl">
        下書き一覧
      </Heading>
      <Suspense fallback={<div>Loading...</div>}>
        <AdminPostList className="mt-4" published={false} />
      </Suspense>
    </Container>
  );
}
