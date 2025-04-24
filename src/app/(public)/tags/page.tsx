import { Container } from "@/components/layout/container/Container";
import Heading from "@/components/typography/heading/Heading";
import { TagList } from "@/features/tag/components/tagList/TagList";
import { Suspense } from "react";

export const metadata = {
  title: "Tags",
  description: "All tags used in the blog.",
};

export default function Page() {
  return (
    <Container as="main" className="p-8">
      <Heading as="h1" size="3xl">
        Tags
      </Heading>
      <p className="mt-2 text-muted-foreground">All tags used in the blog.</p>

      <Suspense fallback={<div>Loading...</div>}>
        <TagList />
      </Suspense>
    </Container>
  );
}
