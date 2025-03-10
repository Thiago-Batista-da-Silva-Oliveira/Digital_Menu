'use client';

import { Dish } from '@/src/types';
import React from 'react';
import { DishCard } from './DishCard';

interface CategorySectionProps {
  title: string;
  dishes: Dish[];
}

export const CategorySection: React.FC<CategorySectionProps> = ({ title, dishes }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="space-y-4">
        {dishes.map((dish) => (
          <DishCard key={dish.id} dish={dish} />
        ))}
      </div>
    </div>
  );
};