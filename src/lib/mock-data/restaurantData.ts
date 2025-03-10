// src/lib/mock-data/restaurantData.ts

import { Dish, Order, OrderItem, Restaurant, TableStatus, User } from "@/types";

// Mock Dishes
export const mockDishes: Dish[] = [
  {
    id: 'dish-1',
    restaurantId: 'restaurant-1',
    name: 'Batata crinkle + cheddar e bacon',
    description: 'Batata frisada frita, temperada com nosso temperinho secreto, coberta por muitooo cheddar cremoso e bacon em cubos...',
    price: 40.00,
    discountedPrice: 32.00,
    discountPercentage: 20,
    image: '/images/dish-batata.jpg',
    category: 'SIDE',
    isHighlighted: true,
    isAvailable: true,
    isOutOfStock: false,
    servesUpTo: 2,
    additionalOptions: [
      {
        id: 'additional-1',
        name: 'Creme de cheddar artesanal',
        price: 5.00,
        description: 'Feito na casa',
      },
      {
        id: 'additional-2',
        name: 'Maionese de alho',
        price: 3.00,
        description: 'Feita na casa',
      },
      {
        id: 'additional-3',
        name: 'Cream cheese',
        price: 4.50,
        description: 'Aplicado direto na batata',
      },
      {
        id: 'additional-4',
        name: 'Barbecue',
        price: 2.00,
        description: 'Aplicado direto na batata',
      },
      {
        id: 'additional-5',
        name: 'Parmesão ralado',
        price: 4.00,
        description: 'Aplicado direto na batata',
      },
    ],
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z',
  },
  {
    id: 'dish-2',
    restaurantId: 'restaurant-1',
    name: 'Queijo gouda empanado',
    description: 'Para um paladar refinado a combinação perfeita entre gouda e geleia de pimentas.',
    price: 30.00,
    image: '/images/dish-queijo.jpg',
    category: 'ENTREE',
    isHighlighted: false,
    isAvailable: true,
    isOutOfStock: false,
    servesUpTo: 2,
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z',
  },
  {
    id: 'dish-3',
    restaurantId: 'restaurant-1',
    name: 'Onion rings',
    description: 'Tradicional nas melhores hamburgerias! Estes deliciosos anéis de cebola empanada acompanhada da clássica maionese barbecue, esse dupla combina.',
    price: 30.00,
    image: '/images/dish-onion.jpg',
    category: 'ENTREE',
    isHighlighted: false,
    isAvailable: true,
    isOutOfStock: false,
    servesUpTo: 2,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'dish-4',
    restaurantId: 'restaurant-2',
    name: 'Combinado 20 peças',
    description: 'Mix de sushi e sashimi com 20 peças variadas.',
    price: 75.00,
    image: '/images/dish-sushi.jpg',
    category: 'MAIN',
    isHighlighted: true,
    isAvailable: true,
    isOutOfStock: false,
    servesUpTo: 2,
    createdAt: '2024-01-20T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z',
  }
]

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Master Admin',
    email: 'admin@menuapp.com',
    role: 'MASTER_ADMIN',
  },
  {
    id: 'user-2',
    name: 'Restaurant Owner',
    email: 'owner@example.com',
    role: 'RESTAURANT_ADMIN',
  },
  {
    id: 'user-3',
    name: 'John Doe',
    email: 'client@example.com',
    role: 'CLIENT',
  },
];

// Mock Restaurants
export const mockRestaurants: Restaurant[] = [
  {
    id: 'restaurant-1',
    name: 'To no X Hamburgeria',
    logo: '/images/restaurant-1-logo.png',
    description: 'Hamburgers and more',
    address: 'Rua das Flores, 123',
    phone: '+55 11 98765-4321',
    email: 'contato@tonox.com',
    website: 'tonox.com',
    primaryColor: '#FF6B00',
    secondaryColor: '#F5F5F5',
    minimumOrderAmount: 22.00,
    deliveryFee: 5.00,
    freeDeliveryThreshold: 50.00,
    rating: 4.8,
    totalReviews: 199,
    ownerId: 'user-2',
    isActive: true,
    createdAt: '2024-01-20T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z',
  },
];

// Mock Order Items
const createOrderItems = (orderId: string, restaurantId: string): OrderItem[] => {
  if (restaurantId === 'restaurant-1') {
    return [
      {
        id: `order-item-${orderId}-1`,
        dishId: 'dish-1',
        dish: mockDishes.find(d => d.id === 'dish-1')!,
        quantity: 1,
        additionalOptions: [
          {
            id: 'additional-1',
            name: 'Creme de cheddar artesanal',
            price: 5.00,
          },
        ],
        price: 45.00, // 40 + 5 for additional
      },
      {
        id: `order-item-${orderId}-2`,
        dishId: 'dish-2',
        dish: mockDishes.find(d => d.id === 'dish-2')!,
        quantity: 1,
        additionalOptions: [],
        price: 30.00,
      },
    ];
  } else {
    return [
      {
        id: `order-item-${orderId}-1`,
        dishId: 'dish-4',
        dish: mockDishes.find(d => d.id === 'dish-4')!,
        quantity: 1,
        additionalOptions: [],
        price: 75.00,
      },
    ];
  }
};

// Mock Orders
export const mockOrders: Order[] = [
  {
    id: 'order-1',
    restaurantId: 'restaurant-1',
    tableId: 'table-1',
    clientId: 'user-3',
    items: createOrderItems('order-1', 'restaurant-1'),
    status: 'DELIVERED',
    totalAmount: 75.00, // 45 + 30
    paymentMethod: 'CREDIT_CARD',
    createdAt: '2024-03-01T12:30:00Z',
    updatedAt: '2024-03-01T13:15:00Z',
  },
  {
    id: 'order-2',
    restaurantId: 'restaurant-1',
    clientId: 'user-3',
    items: createOrderItems('order-2', 'restaurant-1'),
    status: 'DELIVERED',
    totalAmount: 75.00,
    paymentMethod: 'CASH',
    deliveryAddress: 'Rua das Margaridas, 789',
    createdAt: '2024-03-02T19:45:00Z',
    updatedAt: '2024-03-02T20:30:00Z',
  },
  {
    id: 'order-3',
    restaurantId: 'restaurant-2',
    clientId: 'user-3',
    items: createOrderItems('order-3', 'restaurant-2'),
    status: 'DELIVERED',
    totalAmount: 75.00,
    paymentMethod: 'PIX',
    deliveryAddress: 'Rua das Margaridas, 789',
    createdAt: '2024-03-05T20:15:00Z',
    updatedAt: '2024-03-05T21:00:00Z',
  },
  {
    id: 'order-4',
    restaurantId: 'restaurant-1',
    tableId: 'table-3',
    items: createOrderItems('order-4', 'restaurant-1'),
    status: 'PREPARING',
    totalAmount: 75.00,
    createdAt: '2024-03-09T13:00:00Z',
    updatedAt: '2024-03-09T13:00:00Z',
  },
];

// Mock Tables
export const mockTables: {
    id: string;
    restaurantId: string;
    number: number;
    capacity: number;
    status: TableStatus;
    currentOrderId?: string;
} []
 = [
  {
    id: 'table-1',
    restaurantId: 'restaurant-1',
    number: 1,
    capacity: 4,
    status: 'AVAILABLE',
  },
  {
    id: 'table-2',
    restaurantId: 'restaurant-1',
    number: 2,
    capacity: 2,
    status: 'AVAILABLE',
  },
  {
    id: 'table-3',
    restaurantId: 'restaurant-1',
    number: 3,
    capacity: 6,
    status: 'WAITING_FOOD',
    currentOrderId: 'order-4',
  },
  {
    id: 'table-4',
    restaurantId: 'restaurant-2',
    number: 1,
    capacity: 4,
    status: 'AVAILABLE',
  },
]
