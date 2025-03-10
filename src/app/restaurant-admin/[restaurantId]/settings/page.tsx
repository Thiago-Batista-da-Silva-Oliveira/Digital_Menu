'use client';

import { SettingsForm } from '@/components/restaurant-admin/SettingsForm';
import { useParams } from 'next/navigation';

export default function RestaurantSettings() {
  const params = useParams();
  const restaurantId = params.restaurantId as string;
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Configurações</h1>
      
      <SettingsForm restaurantId={restaurantId} />
    </div>
  );
}