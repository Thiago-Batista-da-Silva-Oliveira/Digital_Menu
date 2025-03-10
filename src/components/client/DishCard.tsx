'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Dish } from '@/types';
import { useClientStore } from '@/store/zustand/useClientStore';

interface DishCardProps {
  dish: Dish;
}

export const DishCard: React.FC<DishCardProps> = ({ dish }) => {
  const toggleFavorite = useClientStore((state) => state.toggleFavorite);
  const favorites = useClientStore((state) => state.favorites);
  const isFavorite = favorites.includes(dish.id);
  
  const formattedOriginalPrice = `R$ ${dish.price.toFixed(2)}`;
  const formattedDiscountedPrice = dish.discountedPrice 
    ? `R$ ${dish.discountedPrice.toFixed(2)}` 
    : null;
  
  return (
    <Link href={`/dish/${dish.id}`}>
      <div className="flex border rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
        <div className="w-1/3 relative">
          <div className="absolute inset-0 bg-gray-200">
            {dish.image && (
              <Image
                src={dish.image}
                alt={dish.name}
                fill
                className="object-cover"
              />
            )}
          </div>
        </div>
        <div className="w-2/3 p-3">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-gray-800">{dish.name}</h3>
            <button 
              className="text-gray-400 hover:text-red-500"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFavorite(dish.id);
              }}
            >
              {isFavorite ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              )}
            </button>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2 mt-1 mb-2">
            {dish.description}
          </p>
          <div className="flex items-center justify-between">
            <div>
              {dish.servesUpTo > 1 && (
                <p className="text-xs text-gray-500">Serve até {dish.servesUpTo} pessoas</p>
              )}
            </div>
            <div className="flex items-center">
              {formattedDiscountedPrice && (
                <>
                  <span className="text-sm text-gray-400 line-through mr-1">
                    {formattedOriginalPrice}
                  </span>
                  <span className="font-semibold" style={{ color: 'var(--primary-color)' }}>
                    {formattedDiscountedPrice}
                  </span>
                </>
              )}
              {!formattedDiscountedPrice && (
                <span className="font-semibold" style={{ color: 'var(--primary-color)' }}>
                  {formattedOriginalPrice}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

