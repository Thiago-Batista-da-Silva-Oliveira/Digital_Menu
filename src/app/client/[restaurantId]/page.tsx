'use client';


import { CategorySection } from '@/components/client/CategorySection';
import { DishDetailView } from '@/components/client/DishDetailView';
import { useDishes } from '@/lib/hooks/useDishesData';
import { Dish } from '@/types';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function ClientHome() {
  const params = useParams();
  const restaurantId = params.restaurantId as string;
  
  const { data: dishes, isLoading } = useDishes(restaurantId);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  
  if (isLoading) {
    return <div className="p-4">Carregando cardápio...</div>;
  }
  
  if (!dishes || dishes.length === 0) {
    return <div className="p-4">Nenhum item encontrado no cardápio.</div>;
  }
  
  // Group dishes by category
  const highlightedDishes = dishes.filter(dish => dish.isHighlighted && dish.isAvailable && !dish.isOutOfStock);
  const entreeDishes = dishes.filter(dish => dish.category === 'ENTREE' && dish.isAvailable && !dish.isOutOfStock);
  const mainDishes = dishes.filter(dish => dish.category === 'MAIN' && dish.isAvailable && !dish.isOutOfStock);
  const sideDishes = dishes.filter(dish => dish.category === 'SIDE' && dish.isAvailable && !dish.isOutOfStock);
  const dessertDishes = dishes.filter(dish => dish.category === 'DESSERT' && dish.isAvailable && !dish.isOutOfStock);
  const beverageDishes = dishes.filter(dish => dish.category === 'BEVERAGE' && dish.isAvailable && !dish.isOutOfStock);
  
  return (
    <div>
      {highlightedDishes.length > 0 && (
        <CategorySection title="Destaques" dishes={highlightedDishes} />
      )}
      
      {entreeDishes.length > 0 && (
        <CategorySection title="Entradas" dishes={entreeDishes} />
      )}
      
      {mainDishes.length > 0 && (
        <CategorySection title="Pratos Principais" dishes={mainDishes} />
      )}
      
      {sideDishes.length > 0 && (
        <CategorySection title="Acompanhamentos" dishes={sideDishes} />
      )}
      
      {dessertDishes.length > 0 && (
        <CategorySection title="Sobremesas" dishes={dessertDishes} />
      )}
      
      {beverageDishes.length > 0 && (
        <CategorySection title="Bebidas" dishes={beverageDishes} />
      )}
      
      {selectedDish && (
        <DishDetailView
          dish={selectedDish}
          onClose={() => setSelectedDish(null)}
        />
      )}
    </div>
  );
}