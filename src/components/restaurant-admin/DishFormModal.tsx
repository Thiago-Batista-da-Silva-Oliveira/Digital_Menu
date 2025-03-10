'use client';

import { useCreateDish, useUpdateDish } from '@/lib/hooks/useDishesData';
import { Dish, DishAdditional, DishCategory } from '@/types';
import React, { useState } from 'react';

interface DishFormModalProps {
  dish?: Dish;
  restaurantId: string;
  onClose: () => void;
}

export const DishFormModal: React.FC<DishFormModalProps> = ({
  dish,
  restaurantId,
  onClose,
}) => {
  const isEditing = !!dish?.id;
  const [formData, setFormData] = useState<Partial<Dish>>({
    name: '',
    description: '',
    price: 0,
    category: 'MAIN',
    isHighlighted: false,
    isAvailable: true,
    isOutOfStock: false,
    servesUpTo: 1,
    additionalOptions: [],
    ...dish,
  });
  
  const [additionals, setAdditionals] = useState<DishAdditional[]>(
    dish?.additionalOptions || []
  );
  
  const [newAdditional, setNewAdditional] = useState<DishAdditional>({
    id: '',
    name: '',
    price: 0,
    description: '',
  });
  
  const createDishMutation = useCreateDish();
  const updateDishMutation = useUpdateDish();
  
  const categoryOptions: { value: DishCategory, label: string }[] = [
    { value: 'HIGHLIGHT', label: 'Destaques' },
    { value: 'ENTREE', label: 'Entradas' },
    { value: 'MAIN', label: 'Pratos Principais' },
    { value: 'SIDE', label: 'Acompanhamentos' },
    { value: 'DESSERT', label: 'Sobremesas' },
    { value: 'BEVERAGE', label: 'Bebidas' },
    { value: 'COMBO', label: 'Combos' },
  ];
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData((prev) => ({ ...prev, [name]: parseFloat(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  
  const handleAddAdditional = () => {
    if (newAdditional.name && newAdditional.price > 0) {
      const additional = {
        ...newAdditional,
        id: `additional-${Date.now()}`,
      };
      
      setAdditionals((prev) => [...prev, additional]);
      setNewAdditional({
        id: '',
        name: '',
        price: 0,
        description: '',
      });
    }
  };
  
  const handleRemoveAdditional = (id: string) => {
    setAdditionals((prev) => prev.filter((item) => item.id !== id));
  };
  
  const handleNewAdditionalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'number') {
      setNewAdditional((prev) => ({ ...prev, [name]: parseFloat(value) }));
    } else {
      setNewAdditional((prev) => ({ ...prev, [name]: value }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const dishData = {
      ...formData,
      restaurantId,
      additionalOptions: additionals,
    };
    
    try {
      if (isEditing && dish.id) {
        await updateDishMutation.mutateAsync({
          restaurantId,
          dishId: dish.id,
          data: dishData,
        });
      } else {
        await createDishMutation.mutateAsync({
          restaurantId,
          data: dishData,
        });
      }
      
      onClose();
    } catch (error) {
      console.error('Error saving dish:', error);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-screen overflow-auto">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">
            {isEditing ? 'Editar Prato' : 'Novo Prato'}
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome do Prato
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descrição
              </label>
              <textarea
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preço (R$)
              </label>
              <input
                type="number"
                name="price"
                min="0"
                step="0.01"
                required
                value={formData.price}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preço Promocional (R$)
              </label>
              <input
                type="number"
                name="discountedPrice"
                min="0"
                step="0.01"
                value={formData.discountedPrice}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categoria
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                {categoryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Serve até (pessoas)
              </label>
              <input
                type="number"
                name="servesUpTo"
                min="1"
                value={formData.servesUpTo}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Imagem (URL)
              </label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div className="col-span-2 space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isHighlighted"
                  name="isHighlighted"
                  checked={formData.isHighlighted}
                  onChange={(e) => setFormData({ ...formData, isHighlighted: e.target.checked })}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label htmlFor="isHighlighted" className="ml-2 text-sm text-gray-700">
                  Destacar prato
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isAvailable"
                  name="isAvailable"
                  checked={formData.isAvailable}
                  onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label htmlFor="isAvailable" className="ml-2 text-sm text-gray-700">
                  Disponível
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isOutOfStock"
                  name="isOutOfStock"
                  checked={formData.isOutOfStock}
                  onChange={(e) => setFormData({ ...formData, isOutOfStock: e.target.checked })}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label htmlFor="isOutOfStock" className="ml-2 text-sm text-gray-700">
                  Esgotado
                </label>
              </div>
            </div>
            
            <div className="col-span-2 border-t pt-4 mt-2">
              <h3 className="text-md font-medium mb-3">Adicionais</h3>
              
              {additionals.length > 0 && (
                <div className="mb-4 space-y-2">
                  {additionals.map((additional) => (
                    <div key={additional.id} className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <div className="font-medium">{additional.name}</div>
                        {additional.description && (
                          <div className="text-sm text-gray-500">{additional.description}</div>
                        )}
                      </div>
                      <div className="flex items-center">
                        <div className="mr-3">R$ {additional.price.toFixed(2)}</div>
                        <button
                          type="button"
                          onClick={() => handleRemoveAdditional(additional.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-5">
                  <input
                    type="text"
                    placeholder="Nome do adicional"
                    name="name"
                    value={newAdditional.name}
                    onChange={handleNewAdditionalChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div className="col-span-3">
                  <input
                    type="number"
                    placeholder="Preço (R$)"
                    name="price"
                    min="0"
                    step="0.01"
                    value={newAdditional.price}
                    onChange={handleNewAdditionalChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div className="col-span-3">
                  <input
                    type="text"
                    placeholder="Descrição (opcional)"
                    name="description"
                    value={newAdditional.description}
                    onChange={handleNewAdditionalChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div className="col-span-1">
                  <button
                    type="button"
                    onClick={handleAddAdditional}
                    className="w-full h-full flex items-center justify-center bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isEditing ? 'Salvar Alterações' : 'Criar Prato'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
