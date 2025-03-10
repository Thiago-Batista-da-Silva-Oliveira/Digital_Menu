'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/zustand/useAuthStore';
import LoadingScreen from '../ui/LoadingScreen';

// Definir os tipos de proteção de rota
type RouteType = 'auth' | 'guest' | 'admin' | 'restaurantAdmin';

interface RouteGuardProps {
  children: React.ReactNode;
  requiredAuth: RouteType;
}

export default function RouteGuard({ children, requiredAuth }: RouteGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, user } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Obter o caminho completo atual
    const path = pathname;
    let redirectNeeded = false;
    let redirectPath = '';

    // Verificar o tipo de proteção da rota
    switch (requiredAuth) {
      case 'auth':
        // Rotas que requerem autenticação (qualquer usuário logado)
        if (!isAuthenticated) {
          redirectNeeded = true;
          redirectPath = `/login?callbackUrl=${encodeURIComponent(path)}`;
        }
        break;

      case 'guest':
        // Rotas apenas para visitantes (não autenticados)
        if (isAuthenticated) {
          redirectNeeded = true;
          // Redirecionar usuário autenticado com base em sua função
          if (user?.role === 'MASTER_ADMIN') {
            redirectPath = '/master-admin/dashboard';
          } else if (user?.role === 'RESTAURANT_ADMIN') {
            redirectPath = `/restaurant-admin/restaurant-${user.id}/dashboard`;
          } else {
            redirectPath = '/';
          }
        }
        break;

      case 'admin':
        // Rotas apenas para administradores master
        if (!isAuthenticated) {
          redirectNeeded = true;
          redirectPath = `/login?callbackUrl=${encodeURIComponent(path)}`;
        } else if (user?.role !== 'MASTER_ADMIN') {
          redirectNeeded = true;
          redirectPath = '/unauthorized';
        }
        break;

      case 'restaurantAdmin':
        // Rotas apenas para administradores de restaurante
        if (!isAuthenticated) {
          redirectNeeded = true;
          redirectPath = `/login?callbackUrl=${encodeURIComponent(path)}`;
        } else if (user?.role !== 'RESTAURANT_ADMIN') {
          redirectNeeded = true;
          redirectPath = '/unauthorized';
        }
        break;

      default:
        // Sem restrição
        break;
    }

    // Realizamos o redirecionamento se necessário
    if (redirectNeeded) {
      router.push(redirectPath);
    } else {
      // Se não precisar redirecionar, marcamos a verificação como concluída
      setIsChecking(false);
    }
  }, [isAuthenticated, user, router, pathname, requiredAuth]);

  // Mostrar tela de carregamento enquanto verifica
  if (isChecking) {
    return <LoadingScreen message="Verificando acesso..." />;
  }

  // Renderizar o conteúdo da página
  return <>{children}</>;
}