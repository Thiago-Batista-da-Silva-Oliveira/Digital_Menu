'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { Providers } from '../../provider';
import { useRestaurant } from '@/lib/hooks/useRestaurantData';
import { useClientStore } from '@/store/zustand/useClientStore';
import { ThemeProvider } from '@/store/context/ThemeContext';
import { RestaurantHeader } from '@/components/client/RestaurantHeader';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const restaurantId = params.restaurantId as string;
  
  const { data: restaurant } = useRestaurant(restaurantId);
  const setRestaurant = useClientStore((state) => state.setRestaurant);
  
  useEffect(() => {
    if (restaurant) {
      setRestaurant(restaurantId);
    }
  }, [restaurant, restaurantId, setRestaurant]);
  
  return (
    <Providers>
      {restaurant && (
        <ThemeProvider
          initialPrimaryColor={restaurant.primaryColor}
          initialSecondaryColor={restaurant.secondaryColor}
        >
          <div className="min-h-screen bg-gray-100 flex flex-col">
            <RestaurantHeader restaurant={restaurant} />
            <main className="flex-1 px-4 py-6">
              {children}
            </main>
            <footer className="bg-white py-4 border-t">
              <div className="container mx-auto px-4 flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  © 2024 {restaurant.name}. Todos os direitos reservados.
                </div>
                <div className="flex items-center space-x-6">
                  <a href="#" className="text-gray-500 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </a>
                </div>
              </div>
            </footer>
            
            <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex items-center justify-around py-2">
              <a href="#" className="flex flex-col items-center text-gray-500 px-3 py-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="text-xs mt-1">Início</span>
              </a>
              <a href="#" className="flex flex-col items-center text-gray-500 px-3 py-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="text-xs mt-1">Buscar</span>
              </a>
              <a href="#" className="flex flex-col items-center text-gray-500 px-3 py-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-xs mt-1">Carrinho</span>
              </a>
              <a href="#" className="flex flex-col items-center text-gray-500 px-3 py-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="text-xs mt-1">Favoritos</span>
              </a>
              <a href="#" className="flex flex-col items-center text-gray-500 px-3 py-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-xs mt-1">Perfil</span>
              </a>
            </nav>
          </div>
        </ThemeProvider>
      )}
    </Providers>
  );
}