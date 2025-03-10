'use client';


import { DishCard } from '@/components/client/DishCard';
import { useDishes } from '@/lib/hooks/useDishesData';
import { useClientStore } from '@/store/zustand/useClientStore';
import { useParams } from 'next/navigation';


export default function ClientFavorites() {
  const params = useParams();
  const restaurantId = params.restaurantId as string;
  
  const { data: dishes, isLoading } = useDishes(restaurantId);
  const favorites = useClientStore((state) => state.favorites);
  
  if (isLoading) {
    return <div className="p-4">Carregando favoritos...</div>;
  }
  
  if (!dishes) {
    return <div className="p-4">Erro ao carregar pratos.</div>;
  }
  
  const favoriteDishes = dishes.filter(dish => favorites.includes(dish.id));
  
  if (favoriteDishes.length === 0) {
    return (
      <div className="text-center py-12">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        <h2 className="text-xl font-semibold mb-2">Nenhum favorito ainda</h2>
        <p className="text-gray-500 mb-6">Marque seus pratos favoritos para encontrá-los facilmente.</p>
        <a href={`/${restaurantId}`} className="text-blue-600 hover:text-blue-800">
          Voltar para o cardápio
        </a>
      </div>
    );
  }
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Seus Favoritos</h1>
      
      <div className="space-y-4">
        {favoriteDishes.map((dish) => (
          <DishCard key={dish.id} dish={dish} />
        ))}
      </div>
    </div>
  );
}