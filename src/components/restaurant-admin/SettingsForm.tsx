'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRestaurantAdminStore } from '@/store/zustand/useRestaurantAdminStore';
import { useUpdateRestaurant } from '@/lib/hooks/useRestaurantData';
import { Restaurant } from '@/types';


interface SettingsFormProps {
  restaurantId: string;
}

export const SettingsForm: React.FC<SettingsFormProps> = ({ restaurantId }) => {
  const restaurant = useRestaurantAdminStore((state) => state.currentRestaurant);
  const updateRestaurant = useRestaurantAdminStore((state) => state.updateRestaurant);
  const updateRestaurantMutation = useUpdateRestaurant();
  
  const [formData, setFormData] = useState<Partial<Restaurant>>(
    restaurant || {
      name: '',
      description: '',
      logo: '',
      address: '',
      phone: '',
      email: '',
      website: '',
      primaryColor: '#FF6B00',
      secondaryColor: '#F5F5F5',
      minimumOrderAmount: 0,
      deliveryFee: 0,
      freeDeliveryThreshold: 0,
    }
  );
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'number') {
      setFormData((prev) => ({ ...prev, [name]: parseFloat(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);
    
    try {
      await updateRestaurantMutation.mutateAsync({
        id: restaurantId,
        data: formData,
      });
      
      // Update local store
      updateRestaurant(formData);
      
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error updating restaurant:', error);
    } finally {
      setIsSaving(false);
    }
  };
  
  if (!restaurant) {
    return <div className="p-4">Carregando configurações...</div>;
  }
  
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Configurações</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-2">
            <h3 className="text-md font-medium mb-3">Informações Básicas</h3>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome do Restaurante
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
          
          <div className="row-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Logo (URL)
            </label>
            <div className="mb-3">
              <input
                type="text"
                name="logo"
                value={formData.logo}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            {formData.logo && (
              <div className="mt-2 border rounded-md p-4 bg-gray-50">
                <div className="relative w-32 h-32 mx-auto">
                  <Image
                    src={formData.logo}
                    alt="Logo preview"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div className="col-span-2 border-t pt-4 mt-2">
            <h3 className="text-md font-medium mb-3">Informações de Contato</h3>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Endereço
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Telefone
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Website
            </label>
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div className="col-span-2 border-t pt-4 mt-2">
            <h3 className="text-md font-medium mb-3">Configurações de Pedido</h3>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Valor Mínimo para Pedido (R$)
            </label>
            <input
              type="number"
              name="minimumOrderAmount"
              min="0"
              step="0.01"
              value={formData.minimumOrderAmount}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Taxa de Entrega (R$)
            </label>
            <input
              type="number"
              name="deliveryFee"
              min="0"
              step="0.01"
              value={formData.deliveryFee}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Entrega Grátis Acima de (R$)
            </label>
            <input
              type="number"
              name="freeDeliveryThreshold"
              min="0"
              step="0.01"
              value={formData.freeDeliveryThreshold}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div className="col-span-2 border-t pt-4 mt-2">
            <h3 className="text-md font-medium mb-3">Aparência</h3>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cor Primária
            </label>
            <div className="flex items-center">
              <input
                type="color"
                name="primaryColor"
                value={formData.primaryColor}
                onChange={handleInputChange}
                className="w-10 h-10 p-1 border border-gray-300 rounded-md mr-2"
              />
              <input
                type="text"
                name="primaryColor"
                value={formData.primaryColor}
                onChange={handleInputChange}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cor Secundária
            </label>
            <div className="flex items-center">
              <input
                type="color"
                name="secondaryColor"
                value={formData.secondaryColor}
                onChange={handleInputChange}
                className="w-10 h-10 p-1 border border-gray-300 rounded-md mr-2"
              />
              <input
                type="text"
                name="secondaryColor"
                value={formData.secondaryColor}
                onChange={handleInputChange}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isSaving ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>
        
        {saveSuccess && (
          <div className="mt-3 text-sm text-green-600">
            Alterações salvas com sucesso!
          </div>
        )}
      </form>
    </div>
  );
};