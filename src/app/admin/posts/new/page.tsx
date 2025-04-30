import { Container } from "@/components/layout/container/Container";
import { CreatePostContainer } from "@/features/post/components/createPostContainer/CreatePostContainer";

export default function Page() {
  return (
    <Container as="main" size="xl" className="px-8">
      <CreatePostContainer />
    </Container>
  );
}
