import { OrderItem } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ClientState {
  restaurantId: string | null;
  cart: OrderItem[];
  favorites: string[]; // Dish IDs
  deliveryAddress: string | null;
  
  setRestaurant: (id: string) => void;
  addToCart: (item: OrderItem) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItemQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  
  toggleFavorite: (dishId: string) => void;
  setDeliveryAddress: (address: string) => void;
  
  getCartTotal: () => number;
}

export const useClientStore = create<ClientState>()(
  persist(
    (set, get) => ({
      restaurantId: null,
      cart: [],
      favorites: [],
      deliveryAddress: null,
      
      setRestaurant: (id) => set({ restaurantId: id }),
      
      addToCart: (item) => set((state) => {
        const existingItemIndex = state.cart.findIndex(
          (cartItem) => cartItem.dishId === item.dishId
        );
        
        if (existingItemIndex >= 0) {
          const updatedCart = [...state.cart];
          updatedCart[existingItemIndex].quantity += item.quantity;
          return { cart: updatedCart };
        }
        
        return { cart: [...state.cart, item] };
      }),
      
      removeFromCart: (itemId) => set((state) => ({
        cart: state.cart.filter((item) => item.id !== itemId),
      })),
      
      updateCartItemQuantity: (itemId, quantity) => set((state) => ({
        cart: state.cart.map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        ),
      })),
      
      clearCart: () => set({ cart: [] }),
      
      toggleFavorite: (dishId) => set((state) => {
        if (state.favorites.includes(dishId)) {
          return {
            favorites: state.favorites.filter((id) => id !== dishId),
          };
        } else {
          return { favorites: [...state.favorites, dishId] };
        }
      }),
      
      setDeliveryAddress: (address) => set({ deliveryAddress: address }),
      
      getCartTotal: () => {
        return get().cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: 'client-storage',
    }
  )
);