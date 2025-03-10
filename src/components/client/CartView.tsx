/* eslint-disable react/no-unescaped-entities */
'use client';

import React from 'react';
import Link from 'next/link';
import { useClientStore } from '@/store/zustand/useClientStore';

export const CartView: React.FC = () => {
  const cart = useClientStore((state) => state.cart);
  const removeFromCart = useClientStore((state) => state.removeFromCart);
  const updateCartItemQuantity = useClientStore((state) => state.updateCartItemQuantity);
  const getCartTotal = useClientStore((state) => state.getCartTotal);
  
  if (cart.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mb-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
        </svg>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Seu carrinho está vazio</h3>
        <p className="text-gray-500 text-center mb-6">Adicione itens ao carrinho para continuar.</p>
        <Link href="/" className="py-2 px-4 bg-primary-500 text-white rounded-lg">
          <span style={{ color: 'var(--primary-color)' }}>Ver cardápio</span>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-lg font-bold">Seu pedido</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="border rounded-lg p-3">
              <div className="flex justify-between">
                <div className="flex items-start">
                  <div className="font-medium">{item.quantity}x</div>
                  <div className="ml-2">
                    <div className="font-medium">{item.dish.name}</div>
                    {item.additionalOptions.length > 0 && (
                      <div className="mt-1 text-sm text-gray-500">
                        {item.additionalOptions.map((opt) => (
                          <div key={opt.id}>+ {opt.name}</div>
                        ))}
                      </div>
                    )}
                    {item.specialInstructions && (
                      <div className="mt-1 text-sm text-gray-500 italic">
                        "{item.specialInstructions}"
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col items-end">
                  <div className="font-semibold">
                    R$ {item.price.toFixed(2)}
                  </div>
                  <div className="mt-2 flex space-x-2">
                    <button
                      onClick={() => {
                        if (item.quantity > 1) {
                          updateCartItemQuantity(item.id, item.quantity - 1);
                        } else {
                          removeFromCart(item.id);
                        }
                      }}
                      className="text-gray-400 hover:text-gray-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button
                      onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                      className="text-gray-400 hover:text-gray-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="border-t p-4 bg-white">
        <div className="flex justify-between items-center mb-2">
          <span>Subtotal</span>
          <span>R$ {getCartTotal().toFixed(2)}</span>
        </div>
        <button
          className="w-full py-3 rounded-lg text-white font-semibold"
          style={{ backgroundColor: 'var(--primary-color)' }}
        >
          Continuar (R$ {getCartTotal().toFixed(2)})
        </button>
      </div>
    </div>
  );
};