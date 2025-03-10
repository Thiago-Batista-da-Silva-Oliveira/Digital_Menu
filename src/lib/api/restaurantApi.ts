import { Dish, Restaurant, RestaurantStats } from '@/types';
import { mockDishes, mockOrders, mockRestaurants } from '../mock-data/restaurantData';

// In a real app, this would call the actual API
// For now, we'll use mock data

export const restaurantApi = {
  // Restaurant CRUD
  getRestaurants: async () => {
    // Mock implementation
    return Promise.resolve({ data: mockRestaurants });
    // Real implementation would be:
    // return apiClient.get('/restaurants');
  },
  
  getRestaurantById: async (id: string) => {
    // Mock implementation
    const restaurant = mockRestaurants.find(r => r.id === id);
    return Promise.resolve({ data: restaurant });
    // Real implementation:
    // return apiClient.get(`/restaurants/${id}`);
  },
  
  createRestaurant: async (data: Partial<Restaurant>) => {
    // Mock implementation
    const newRestaurant = {
      ...data,
      id: `restaurant-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as Restaurant;
    
    mockRestaurants.push(newRestaurant);
    return Promise.resolve({ data: newRestaurant });
    // Real implementation:
    // return apiClient.post('/restaurants', data);
  },
  
  updateRestaurant: async (id: string, data: Partial<Restaurant>) => {
    // Mock implementation
    const index = mockRestaurants.findIndex(r => r.id === id);
    if (index >= 0) {
      mockRestaurants[index] = {
        ...mockRestaurants[index],
        ...data,
        updatedAt: new Date().toISOString(),
      };
      return Promise.resolve({ data: mockRestaurants[index] });
    }
    return Promise.reject(new Error('Restaurant not found'));
    // Real implementation:
    // return apiClient.put(`/restaurants/${id}`, data);
  },
  
  // Dish CRUD
  getDishes: async (restaurantId: string) => {
    // Mock implementation
    const dishes = mockDishes.filter(dish => dish.restaurantId === restaurantId);
    return Promise.resolve({ data: dishes });
    // Real implementation:
    // return apiClient.get(`/restaurants/${restaurantId}/dishes`);
  },
  
  getDishById: async (restaurantId: string, dishId: string) => {
    // Mock implementation
    const dish = mockDishes.find(
      dish => dish.restaurantId === restaurantId && dish.id === dishId
    );
    return Promise.resolve({ data: dish });
    // Real implementation:
    // return apiClient.get(`/restaurants/${restaurantId}/dishes/${dishId}`);
  },
  
  createDish: async (restaurantId: string, data: Partial<Dish>) => {
    // Mock implementation
    const newDish = {
      ...data,
      restaurantId,
      id: `dish-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as Dish;
    
    mockDishes.push(newDish);
    return Promise.resolve({ data: newDish });
    // Real implementation:
    // return apiClient.post(`/restaurants/${restaurantId}/dishes`, data);
  },
  
  updateDish: async (restaurantId: string, dishId: string, data: Partial<Dish>) => {
    // Mock implementation
    const index = mockDishes.findIndex(
      dish => dish.restaurantId === restaurantId && dish.id === dishId
    );
    
    if (index >= 0) {
      mockDishes[index] = {
        ...mockDishes[index],
        ...data,
        updatedAt: new Date().toISOString(),
      };
      return Promise.resolve({ data: mockDishes[index] });
    }
    return Promise.reject(new Error('Dish not found'));
    // Real implementation:
    // return apiClient.put(`/restaurants/${restaurantId}/dishes/${dishId}`, data);
  },
  
  deleteDish: async (restaurantId: string, dishId: string) => {
    // Mock implementation
    const index = mockDishes.findIndex(
      dish => dish.restaurantId === restaurantId && dish.id === dishId
    );
    
    if (index >= 0) {
      const deleted = mockDishes.splice(index, 1)[0];
      return Promise.resolve({ data: deleted });
    }
    return Promise.reject(new Error('Dish not found'));
    // Real implementation:
    // return apiClient.delete(`/restaurants/${restaurantId}/dishes/${dishId}`);
  },
  
  // Orders
  getOrders: async (restaurantId: string) => {
    // Mock implementation
    const orders = mockOrders.filter(order => order.restaurantId === restaurantId);
    return Promise.resolve({ data: orders });
    // Real implementation:
    // return apiClient.get(`/restaurants/${restaurantId}/orders`);
  },
  
  // Restaurant stats
  getRestaurantStats: async (restaurantId: string) => {
    // Mock implementation
    const restaurantOrders = mockOrders.filter(
      order => order.restaurantId === restaurantId
    );
    
    // Calculate total revenue
    const totalRevenue = restaurantOrders.reduce(
      (sum, order) => sum + order.totalAmount, 
      0
    );
    
    // Calculate average order value
    const averageOrderValue = 
      restaurantOrders.length > 0 
        ? totalRevenue / restaurantOrders.length 
        : 0;
    
    // Calculate top dishes
    const dishCountMap = new Map<string, { count: number; revenue: number; name: string }>();
    
    restaurantOrders.forEach(order => {
      order.items.forEach(item => {
        const existingDish = dishCountMap.get(item.dishId);
        
        if (existingDish) {
          dishCountMap.set(item.dishId, {
            count: existingDish.count + item.quantity,
            revenue: existingDish.revenue + (item.price * item.quantity),
            name: item.dish.name
          });
        } else {
          dishCountMap.set(item.dishId, {
            count: item.quantity,
            revenue: item.price * item.quantity,
            name: item.dish.name
          });
        }
      });
    });
    
    const topDishes = Array.from(dishCountMap.entries())
      .map(([dishId, { count, revenue, name }]) => ({
        dishId,
        dishName: name,
        count,
        revenue
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
    
    // Get recent orders
    const recentOrders = [...restaurantOrders]
      .sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 10);
    
    const stats: RestaurantStats = {
      totalOrders: restaurantOrders.length,
      totalRevenue,
      averageOrderValue,
      topDishes,
      recentOrders,
    };
    
    return Promise.resolve({ data: stats });
    // Real implementation:
    // return apiClient.get(`/restaurants/${restaurantId}/stats`);
  },
};
