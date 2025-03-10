'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Dish, DishCategory } from '@/types';
import { useDishes } from '@/lib/hooks/useDishesData';
;

interface MenuListViewProps {
  restaurantId: string;
  onEditDish: (dish: Dish) => void;
}

export const MenuListView: React.FC<MenuListViewProps> = ({ restaurantId, onEditDish }) => {
  const { data: dishes, isLoading, error } = useDishes(restaurantId);
  const [categoryFilter, setCategoryFilter] = useState<DishCategory | 'ALL'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  
  if (isLoading) {
    return <div className="p-4">Carregando cardápio...</div>;
  }
  
  if (error || !dishes) {
    return <div className="p-4 text-red-500">Erro ao carregar cardápio</div>;
  }
  
  const categoryOptions: { value: DishCategory | 'ALL', label: string }[] = [
    { value: 'ALL', label: 'Todos' },
    { value: 'HIGHLIGHT', label: 'Destaques' },
    { value: 'ENTREE', label: 'Entradas' },
    { value: 'MAIN', label: 'Pratos Principais' },
    { value: 'SIDE', label: 'Acompanhamentos' },
    { value: 'DESSERT', label: 'Sobremesas' },
    { value: 'BEVERAGE', label: 'Bebidas' },
    { value: 'COMBO', label: 'Combos' },
  ];
  
  const filteredDishes = dishes.filter((dish) => {
    const matchesCategory = categoryFilter === 'ALL' || dish.category === categoryFilter;
    const matchesSearch = searchTerm === '' || 
      dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dish.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });
  
  const getStatusBadge = (dish: Dish) => {
    if (dish.isOutOfStock) {
      return (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
          Esgotado
        </span>
      );
    }
    
    if (!dish.isAvailable) {
      return (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          Indisponível
        </span>
      );
    }
    
    return null;
  };
  
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Buscar prato..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <label htmlFor="category-filter" className="text-sm font-medium text-gray-700">
              Categoria:
            </label>
            <select
              id="category-filter"
              className="border border-gray-300 rounded-md px-3 py-2"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as DishCategory | 'ALL')}
            >
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <button
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => onEditDish({} as Dish)} // Pass empty dish for new item
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Novo Prato
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Prato
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Categoria
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Preço
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Destaque
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredDishes.map((dish) => (
              <tr key={dish.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 mr-3 bg-gray-100 rounded-md overflow-hidden">
                      {dish.image && (
                        <Image
                          src={dish.image}
                          alt={dish.name}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{dish.name}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {dish.description}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {categoryOptions.find(opt => opt.value === dish.category)?.label || dish.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    R$ {dish.price.toFixed(2)}
                  </div>
                  {dish.discountedPrice && (
                    <div className="text-xs text-green-600">
                      Promoção: R$ {dish.discountedPrice.toFixed(2)}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(dish) || (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Disponível
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {dish.isHighlighted ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onEditDish(dish)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};