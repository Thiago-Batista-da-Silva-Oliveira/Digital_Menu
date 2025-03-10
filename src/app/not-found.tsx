// Este é o arquivo oficial de not-found do Next.js para o App Router.
// O arquivo deve estar exatamente na pasta src/app/ para ser reconhecido globalmente.

"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/zustand/useAuthStore";

export default function NotFound() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);
  const { user, isAuthenticated } = useAuthStore();

  const handleUseRedirect = useCallback(() => {
    if (isAuthenticated) {
        if (user?.role === 'MASTER_ADMIN') {
            router.push('/master-admin/dashboard');
          } else if (user?.role === 'RESTAURANT_ADMIN') {
            router.push(`/restaurant-admin/restaurant-${user.id}/dashboard`);
          } else {
            router.push('/landing');
          }
    } else {
      router.push("/landing");
    }
  }, [isAuthenticated, user?.role, user?.id, router]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCount) => Math.max(0, prevCount - 1));
    }, 1000);

    const redirectTimer = setTimeout(() => {
      handleUseRedirect();
    }, 3000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimer);
    };
  }, [handleUseRedirect, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <div className="text-blue-500 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">404</h1>
        <h2 className="text-xl font-bold text-gray-700 mb-4">
          Página não encontrada
        </h2>
        <p className="text-gray-600 mb-6">
          A página que você está procurando não existe ou foi movida.
        </p>

        <div className="bg-gray-100 rounded-md py-3 mb-6">
          <p className="text-gray-600">
            Redirecionando para a página inicial em{" "}
            <span className="font-bold text-blue-600">{countdown}</span>{" "}
            segundos...
          </p>
        </div>

        <button
          onClick={handleUseRedirect}
          className="block w-full py-2 px-4 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
        >
          Voltar para a página inicial
        </button>
      </div>
    </div>
  );
}
