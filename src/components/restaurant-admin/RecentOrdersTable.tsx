'use client';

import { useRestaurantStats } from '@/lib/hooks/useRestaurantStats';
import React from 'react';

interface TopDishesChartProps {
  restaurantId: string;
}

export const TopDishesChart: React.FC<TopDishesChartProps> = ({ restaurantId }) => {
  const { data: stats, isLoading, error } = useRestaurantStats(restaurantId);
  
  if (isLoading) {
    return <div className="p-4">Carregando pratos mais vendidos...</div>;
  }
  
  if (error || !stats) {
    return <div className="p-4 text-red-500">Erro ao carregar pratos mais vendidos</div>;
  }
  
  // Find the max count for scaling bars
  const maxCount = Math.max(...stats.topDishes.map(dish => dish.count));
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Pratos Mais Vendidos</h2>
      
      <div className="space-y-4">
        {stats.topDishes.map((dish) => {
          const percentage = (dish.count / maxCount) * 100;
          
          return (
            <div key={dish.dishId}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">{dish.dishName}</span>
                <span className="text-sm font-medium">{dish.count} vendas</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <div className="text-xs text-right mt-1 text-gray-500">
                R$ {dish.revenue.toFixed(2)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};