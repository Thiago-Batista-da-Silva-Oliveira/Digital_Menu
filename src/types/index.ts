// src/types/index.ts

import { StaticImageData } from "next/image";

export type Role = 'MASTER_ADMIN' | 'RESTAURANT_ADMIN' | 'CLIENT';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface Restaurant {
  id: string;
  name: string;
  logo: string | StaticImageData;
  description: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  primaryColor: string;
  secondaryColor: string;
  minimumOrderAmount: number;
  deliveryFee: number;
  freeDeliveryThreshold?: number;
  rating: number;
  totalReviews: number;
  ownerId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type DishCategory = 
  | 'HIGHLIGHT' 
  | 'ENTREE' 
  | 'MAIN' 
  | 'SIDE' 
  | 'DESSERT' 
  | 'BEVERAGE' 
  | 'COMBO';

export interface Dish {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  discountedPrice?: number;
  discountPercentage?: number;
  image: string | StaticImageData;
  category: DishCategory;
  isHighlighted: boolean;
  isAvailable: boolean;
  isOutOfStock: boolean;
  servesUpTo: number;
  preparationTime?: number;
  additionalOptions?: DishAdditional[];
  createdAt: string;
  updatedAt: string;
}

export interface DishAdditional {
  id: string;
  name: string;
  price: number;
  description?: string;
  category?: string;
}

export type TableStatus = 'AVAILABLE' | 'OCCUPIED' | 'RESERVED' | 'WAITING_FOOD' | 'FINISHED';

export interface Table {
  id: string;
  restaurantId: string;
  number: number;
  capacity: number;
  status: TableStatus;
  currentOrderId?: string;
}

export type OrderStatus = 'PENDING' | 'PREPARING' | 'READY' | 'DELIVERED' | 'CANCELLED';

export interface OrderItem {
  id: string;
  dishId: string;
  dish: Dish;
  quantity: number;
  additionalOptions: {
    id: string;
    name: string;
    price: number;
  }[];
  specialInstructions?: string;
  price: number;
}

export interface Order {
  id: string;
  restaurantId: string;
  tableId?: string;
  clientId?: string;
  items: OrderItem[];
  status: OrderStatus;
  totalAmount: number;
  paymentMethod?: string;
  deliveryAddress?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Client {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string[];
  favorites: string[]; // Array of dish IDs
}

export interface RestaurantStats {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  topDishes: {
    dishId: string;
    dishName: string;
    count: number;
    revenue: number;
  }[];
  recentOrders: Order[];
}