import { GuestRouteGuard } from "../../components/auth/RouteGuards";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GuestRouteGuard>
      {children}
    </GuestRouteGuard>
  );
}