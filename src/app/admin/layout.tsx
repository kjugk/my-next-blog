import { Header } from "@/components/navigation/header/Header";
import { HeaderListItem } from "@/components/navigation/header/HeaderListItem";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-dvh flex flex-col">
      <Header
        size="xl"
        items={
          <>
            <HeaderListItem href="/admin/posts/draft" anchor="drafts" />
            <HeaderListItem href="/admin/posts/published" anchor="published" />
          </>
        }
      />
      {children}
    </div>
  );
}
