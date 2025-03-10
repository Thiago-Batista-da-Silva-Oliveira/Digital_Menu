'use client';

import RouteGuard from './RouteGuard';

// Proteção para rotas que exigem qualquer usuário autenticado
export function AuthRouteGuard({ children }: { children: React.ReactNode }) {
  return <RouteGuard requiredAuth="auth">{children}</RouteGuard>;
}

// Proteção para rotas que são apenas para visitantes (login, registro)
export function GuestRouteGuard({ children }: { children: React.ReactNode }) {
  return <RouteGuard requiredAuth="guest">{children}</RouteGuard>;
}

// Proteção para rotas de administrador master
export function AdminRouteGuard({ children }: { children: React.ReactNode }) {
  return <RouteGuard requiredAuth="admin">{children}</RouteGuard>;
}

// Proteção para rotas de administrador de restaurante
export function RestaurantAdminRouteGuard({ children }: { children: React.ReactNode }) {
  return <RouteGuard requiredAuth="restaurantAdmin">{children}</RouteGuard>;
}