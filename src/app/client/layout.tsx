import { Providers } from "../provider";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <div className="min-h-screen bg-gray-100 flex">
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </Providers>
  );
}