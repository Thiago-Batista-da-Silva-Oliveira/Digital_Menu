'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Dish } from '@/types';
import { MenuListView } from '@/components/restaurant-admin/MenuListView';
import { DishFormModal } from '@/components/restaurant-admin/DishFormModal';

export default function RestaurantMenu() {
  const params = useParams();
  const restaurantId = params.restaurantId as string;
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<Dish | undefined>(undefined);
  
  const handleEditDish = (dish: Dish) => {
    setSelectedDish(dish);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDish(undefined);
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Gerenciar Cardápio</h1>
      
      <MenuListView restaurantId={restaurantId} onEditDish={handleEditDish} />
      
      {isModalOpen && (
        <DishFormModal 
          dish={selectedDish} 
          restaurantId={restaurantId} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
}
