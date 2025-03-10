import { Sidebar } from "@/components/master-admin/Sidebar";
import { Providers } from "../provider";
import { AdminRouteGuard } from "@/components/auth/RouteGuards";

export default function MasterAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <AdminRouteGuard>
      <div className="min-h-screen bg-gray-100 flex">
        <Sidebar />
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
      </AdminRouteGuard>
    </Providers>
  );
}