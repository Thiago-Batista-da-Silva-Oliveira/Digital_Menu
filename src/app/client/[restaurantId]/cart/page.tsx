'use client';

import { CartView } from "@/components/client/CartView";



export default function ClientCart() {
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Seu Carrinho</h1>
      
      <CartView />
    </div>
  );
}
