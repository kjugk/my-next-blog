import { Container } from "@/components/layout/container/Container";
import { LoginForm } from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <Container as="main" size="xl" className="px-8">
      <LoginForm />
    </Container>
  );
}
