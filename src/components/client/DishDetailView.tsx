'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Dish, OrderItem } from '@/types';
import { useClientStore } from '@/store/zustand/useClientStore';


interface DishDetailViewProps {
  dish: Dish;
  onClose: () => void;
}

export const DishDetailView: React.FC<DishDetailViewProps> = ({ dish, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedAdditionals, setSelectedAdditionals] = useState<string[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const addToCart = useClientStore((state) => state.addToCart);
  
  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
  
  const toggleAdditional = (additionalId: string) => {
    setSelectedAdditionals((prev) => {
      if (prev.includes(additionalId)) {
        return prev.filter((id) => id !== additionalId);
      } else {
        return [...prev, additionalId];
      }
    });
  };
  
  const calculateTotalPrice = () => {
    const basePrice = dish.discountedPrice || dish.price;
    const additionalsPrice = selectedAdditionals.reduce((total, additionalId) => {
      const additional = dish.additionalOptions?.find((opt) => opt.id === additionalId);
      return total + (additional?.price || 0);
    }, 0);
    
    return (basePrice + additionalsPrice) * quantity;
  };
  
  const handleAddToCart = () => {
    const selectedAdditionalsObjects = selectedAdditionals.map((additionalId) => {
      const additional = dish.additionalOptions?.find((opt) => opt.id === additionalId);
      return {
        id: additional?.id || '',
        name: additional?.name || '',
        price: additional?.price || 0,
      };
    });
    
    const orderItem: OrderItem = {
      id: `temp-${Date.now()}`,
      dishId: dish.id,
      dish,
      quantity,
      additionalOptions: selectedAdditionalsObjects,
      specialInstructions: specialInstructions || undefined,
      price: calculateTotalPrice(),
    };
    
    addToCart(orderItem);
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col">
      <div className="bg-white rounded-t-xl mt-auto overflow-hidden max-h-screen flex flex-col">
        <div className="relative h-56 bg-gray-200">
          {dish.image && (
            <Image src={dish.image} alt={dish.name} fill className="object-cover" />
          )}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto flex-1">
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">{dish.name}</h2>
              <div>
                {dish.discountPercentage && (
                  <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-semibold mr-2">
                    {dish.discountPercentage}% OFF
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex items-center mt-1">
              {dish.discountedPrice ? (
                <>
                  <span className="text-lg font-bold" style={{ color: 'var(--primary-color)' }}>
                    R$ {dish.discountedPrice.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-400 line-through ml-2">
                    R$ {dish.price.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-lg font-bold" style={{ color: 'var(--primary-color)' }}>
                  R$ {dish.price.toFixed(2)}
                </span>
              )}
            </div>
            
            <p className="text-gray-600 mt-2">{dish.description}</p>
            
            {dish.servesUpTo > 1 && (
              <div className="mt-2 text-sm text-gray-500">
                Serve até {dish.servesUpTo} pessoas
              </div>
            )}
          </div>
          
          {dish.additionalOptions && dish.additionalOptions.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Adicionais</h3>
              <p className="text-sm text-gray-500 mb-3">Escolha até 05 opções</p>
              
              <div className="space-y-3">
                {dish.additionalOptions.map((additional) => (
                  <div 
                    key={additional.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <div className="font-medium">{additional.name}</div>
                      {additional.description && (
                        <div className="text-sm text-gray-500">{additional.description}</div>
                      )}
                    </div>
                    
                    <div className="flex items-center">
                      <div className="mr-3">
                        + R$ {additional.price.toFixed(2)}
                      </div>
                      
                      <button
                        onClick={() => toggleAdditional(additional.id)}
                        className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                          selectedAdditionals.includes(additional.id)
                            ? 'bg-primary-500 border-primary-500 text-white'
                            : 'border-gray-300'
                        }`}
                        style={
                          selectedAdditionals.includes(additional.id)
                            ? { backgroundColor: 'var(--primary-color)', borderColor: 'var(--primary-color)' }
                            : {}
                        }
                      >
                        {selectedAdditionals.includes(additional.id) && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Alguma observação?</h3>
            <textarea
              className="w-full p-3 border rounded-lg text-sm"
              placeholder="Ex: Tirar a cebola, maionese à parte, ponto da carne, etc."
              rows={3}
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              maxLength={150}
            />
            <div className="text-xs text-right text-gray-500">
              {specialInstructions.length}/150
            </div>
          </div>
        </div>
        
        <div className="border-t p-4 bg-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300"
                disabled={quantity <= 1}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
              
              <span className="mx-3 font-medium">{quantity}</span>
              
              <button
                onClick={() => handleQuantityChange(1)}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <button
              onClick={handleAddToCart}
              className="py-3 px-6 rounded-lg text-white font-semibold flex items-center"
              style={{ backgroundColor: 'var(--primary-color)' }}
            >
              <span>Adicionar</span>
              <span className="ml-2">R$ {calculateTotalPrice().toFixed(2)}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};