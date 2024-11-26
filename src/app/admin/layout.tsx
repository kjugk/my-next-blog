import { Container } from "@/components/layout/container/Container";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Container className="py-8 px-4">{children}</Container>;
}
