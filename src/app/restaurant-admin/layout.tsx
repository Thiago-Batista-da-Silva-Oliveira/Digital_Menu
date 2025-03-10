'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { Providers } from '../provider';
import { useRestaurantAdminStore } from '@/store/zustand/useRestaurantAdminStore';
import { useRestaurant } from '@/lib/hooks/useRestaurantData';
import { Sidebar } from '@/components/restaurant-admin/Sidebar';
import { RestaurantAdminRouteGuard } from '@/components/auth/RouteGuards';

export default function RestaurantAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const restaurantId = params.restaurantId as string;
  
  const { data: restaurant, isLoading } = useRestaurant(restaurantId);
  const setCurrentRestaurant = useRestaurantAdminStore((state) => state.setCurrentRestaurant);
  
  useEffect(() => {
    if (restaurant) {
      setCurrentRestaurant(restaurant);
    }
  }, [restaurant, setCurrentRestaurant]);
  
  return (
    <Providers>
     <RestaurantAdminRouteGuard>
     <div className="min-h-screen bg-gray-100 flex">
        {!isLoading && restaurant && (
          <Sidebar restaurantId={restaurantId} />
        )}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
     </RestaurantAdminRouteGuard>
    </Providers>
  );
}