'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { restaurantApi } from '../api/restaurantApi';
import { Restaurant } from '@/types';


export function useRestaurants() {
  return useQuery({
    queryKey: ['restaurants'],
    queryFn: async () => {
      const { data } = await restaurantApi.getRestaurants();
      return data;
    },
  });
}

export function useRestaurant(restaurantId: string) {
  return useQuery({
    queryKey: ['restaurant', restaurantId],
    queryFn: async () => {
      const { data } = await restaurantApi.getRestaurantById(restaurantId);
      return data;
    },
    enabled: !!restaurantId,
  });
}

export function useCreateRestaurant() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (newRestaurant: Partial<Restaurant>) => {
      const { data } = await restaurantApi.createRestaurant(newRestaurant);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['restaurants'] });
    },
  });
}

export function useUpdateRestaurant() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      id, 
      data 
    }: { 
      id: string; 
      data: Partial<Restaurant> 
    }) => {
      const response = await restaurantApi.updateRestaurant(id, data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['restaurant', data.id] });
      queryClient.invalidateQueries({ queryKey: ['restaurants'] });
    },
  });
}