'use client';

import { TableManagementView } from '@/components/restaurant-admin/TableManagementView';
import { useParams } from 'next/navigation';

export default function RestaurantTables() {
  const params = useParams();
  const restaurantId = params.restaurantId as string;
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Gerenciar Mesas</h1>
      
      <TableManagementView restaurantId={restaurantId} />
    </div>
  );
}