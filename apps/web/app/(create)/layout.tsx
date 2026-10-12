import { SiteHeader } from "@/components/site-header";

export default function CreateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
