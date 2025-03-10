'use client';

import { useQuery } from '@tanstack/react-query';
import { restaurantApi } from '../api/restaurantApi';

export function useRestaurantStats(restaurantId: string) {
  return useQuery({
    queryKey: ['restaurant-stats', restaurantId],
    queryFn: async () => {
      const { data } = await restaurantApi.getRestaurantStats(restaurantId);
      return data;
    },
    enabled: !!restaurantId,
  });
}
