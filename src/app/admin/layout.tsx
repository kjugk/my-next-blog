import { Header } from "@/components/navigation/header/Header";
import { LogoutButton } from "@/features/auth/components/LogoutButton";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-dvh flex flex-col">
      <Header
        size="xl"
        menuItems={[
          {
            href: "/admin/posts/draft",
            label: "drafts",
          },
          {
            href: "/admin/posts/published",
            label: "published",
          },
          {
            href: "/admin/posts/new",
            label: "new",
          },
        ]}
      >
        <LogoutButton />
      </Header>
      {children}
    </div>
  );
}
