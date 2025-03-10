'use client';

import { AdminDashboardStats } from '@/components/master-admin/AdminDashboardStats';
import { RestaurantFormModal } from '@/components/master-admin/RestaurantFormModal';
import { RestaurantList } from '@/components/master-admin/RestaurantList';
import { Restaurant } from '@/types';
import { useState } from 'react';

export default function MasterAdminDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | undefined>(undefined);
  
  const handleEditRestaurant = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRestaurant(undefined);
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <AdminDashboardStats />
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Restaurantes</h2>
        <RestaurantList onEditRestaurant={handleEditRestaurant} />
      </div>
      
      {isModalOpen && (
        <RestaurantFormModal 
          restaurant={selectedRestaurant} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
}