export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="py-8 px-4 flex-1">{children}</div>;
}
