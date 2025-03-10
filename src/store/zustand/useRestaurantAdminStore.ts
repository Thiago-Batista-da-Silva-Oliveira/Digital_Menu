import { Restaurant } from '@/types';
import { create } from 'zustand';

interface RestaurantAdminState {
  currentRestaurant: Restaurant | null;
  isLoading: boolean;
  setCurrentRestaurant: (restaurant: Restaurant) => void;
  updateRestaurant: (data: Partial<Restaurant>) => void;
}

export const useRestaurantAdminStore = create<RestaurantAdminState>()((set) => ({
  currentRestaurant: null,
  isLoading: false,
  setCurrentRestaurant: (restaurant) => set({ currentRestaurant: restaurant }),
  updateRestaurant: (data) => set((state) => ({
    currentRestaurant: state.currentRestaurant
      ? { ...state.currentRestaurant, ...data }
      : null,
  })),
}));