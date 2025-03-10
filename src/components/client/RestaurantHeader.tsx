// src/components/client/RestaurantHeader.tsx
'use client';

import { Restaurant } from '@/types';
import Image from 'next/image';
import React from 'react';

interface RestaurantHeaderProps {
  restaurant: Restaurant;
}

export const RestaurantHeader: React.FC<RestaurantHeaderProps> = ({ restaurant }) => {  
  React.useEffect(() => {
    if (restaurant) {
      document.documentElement.style.setProperty('--primary-color', restaurant.primaryColor);
      document.documentElement.style.setProperty('--secondary-color', restaurant.secondaryColor);
    }
  }, [restaurant]);
  
  return (
    <header className="bg-white shadow-md">
      <div className="px-4 py-3 flex items-center gap-3">
        <div className="w-10 h-10 relative rounded-full overflow-hidden bg-gray-200">
          {restaurant.logo && (
            <Image 
              src={restaurant.logo} 
              alt={restaurant.name} 
              fill 
              className="object-cover"
            />
          )}
        </div>
        <div className="flex-1">
          <h1 className="text-lg font-semibold">{restaurant.name}</h1>
          <div className="flex items-center text-sm">
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="ml-1">{restaurant.rating}</span>
            </span>
            <span className="mx-2 text-gray-400">•</span>
            <span>{restaurant.totalReviews} avaliações</span>
          </div>
        </div>
      </div>
      <div className="px-4 py-1 flex text-sm items-center text-gray-600">
        <span>
          {restaurant.minimumOrderAmount > 0 && (
            <>Pedido mínimo R$ {restaurant.minimumOrderAmount.toFixed(2)}</>
          )}
        </span>
        <span className="mx-2 text-gray-400">•</span>
        <span className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {restaurant.freeDeliveryThreshold && restaurant.deliveryFee > 0 ? (
            <>
              Entrega grátis a partir de R$ {restaurant.freeDeliveryThreshold.toFixed(2)}
            </>
          ) : (
            <>
              {restaurant.deliveryFee > 0 ? (
                <>Entrega R$ {restaurant.deliveryFee.toFixed(2)}</>
              ) : (
                <>Entrega grátis</>
              )}
            </>
          )}
        </span>
      </div>
      <div className="border-t">
        <div className="px-4 py-3">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input 
              type="text" 
              placeholder="Buscar no cardápio" 
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-100 placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </div>
      <div className="border-t px-4 py-2 flex justify-between">
        <button className="flex items-center text-gray-700 font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>Hoje</span>
        </button>
        <button className="flex items-center text-gray-700 px-2 py-1 border border-gray-300 rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          </svg>
          <span>Entrega</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </header>
  );
};
