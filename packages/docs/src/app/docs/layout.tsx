import { Sidebar } from "@/components/docs/sidebar";
import { TopBar } from "@/components/docs/top-bar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col lg:pl-64">
        <TopBar />
        <main className="flex-1 px-4 py-8 lg:px-8 xl:px-12">
          <div className="mx-auto max-w-3xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
