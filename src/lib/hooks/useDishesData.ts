'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { restaurantApi } from '../api/restaurantApi';
import { Dish } from '@/types';


export function useDishes(restaurantId: string) {
  return useQuery({
    queryKey: ['dishes', restaurantId],
    queryFn: async () => {
      const { data } = await restaurantApi.getDishes(restaurantId);
      return data;
    },
    enabled: !!restaurantId,
  });
}

export function useDish(restaurantId: string, dishId: string) {
  return useQuery({
    queryKey: ['dish', restaurantId, dishId],
    queryFn: async () => {
      const { data } = await restaurantApi.getDishById(restaurantId, dishId);
      return data;
    },
    enabled: !!restaurantId && !!dishId,
  });
}

export function useCreateDish() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      restaurantId, 
      data 
    }: { 
      restaurantId: string; 
      data: Partial<Dish> 
    }) => {
      const response = await restaurantApi.createDish(restaurantId, data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['dishes', data.restaurantId] });
    },
  });
}

export function useUpdateDish() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      restaurantId, 
      dishId, 
      data 
    }: { 
      restaurantId: string; 
      dishId: string; 
      data: Partial<Dish> 
    }) => {
      const response = await restaurantApi.updateDish(restaurantId, dishId, data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['dish', data.restaurantId, data.id] });
      queryClient.invalidateQueries({ queryKey: ['dishes', data.restaurantId] });
    },
  });
}

export function useDeleteDish() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      restaurantId, 
      dishId 
    }: { 
      restaurantId: string; 
      dishId: string 
    }) => {
      const response = await restaurantApi.deleteDish(restaurantId, dishId);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['dishes', data.restaurantId] });
    },
  });
}