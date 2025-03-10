import { GuestRouteGuard } from "@/components/auth/RouteGuards";
import { Providers } from "../provider";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
        <GuestRouteGuard>
          {children}
        </GuestRouteGuard>
    </Providers>
  );
}