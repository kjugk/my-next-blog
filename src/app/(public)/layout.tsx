import { Header } from "@/components/navigation/header/Header";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-dvh flex flex-col">
      <Header />
      {children}
    </div>
  );
}
