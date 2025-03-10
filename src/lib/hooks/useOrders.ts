'use client';

import { useQuery } from '@tanstack/react-query';
import { restaurantApi } from '../api/restaurantApi';

export function useOrders(restaurantId: string) {
  return useQuery({
    queryKey: ['orders', restaurantId],
    queryFn: async () => {
      const { data } = await restaurantApi.getOrders(restaurantId);
      return data;
    },
    enabled: !!restaurantId,
  });
}