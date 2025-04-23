import { Container } from "@/components/layout/container/Container";

export default function NotFound() {
  return (
    <Container as="main" className="p-8">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
    </Container>
  );
}
