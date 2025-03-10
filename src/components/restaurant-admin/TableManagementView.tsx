'use client';

import { mockTables } from '@/lib/mock-data/restaurantData';
import { TableStatus } from '@/types';
import React, { useState } from 'react';

interface TableManagementViewProps {
  restaurantId: string;
}

export const TableManagementView: React.FC<TableManagementViewProps> = ({ restaurantId }) => {
  const [tables, setTables] = useState(
    mockTables.filter((table) => table.restaurantId === restaurantId)
  );
  
  const getStatusClassName = (status: TableStatus) => {
    switch (status) {
      case 'AVAILABLE':
        return 'bg-green-100 text-green-800';
      case 'OCCUPIED':
        return 'bg-blue-100 text-blue-800';
      case 'RESERVED':
        return 'bg-purple-100 text-purple-800';
      case 'WAITING_FOOD':
        return 'bg-yellow-100 text-yellow-800';
      case 'FINISHED':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusText = (status: TableStatus) => {
    switch (status) {
      case 'AVAILABLE':
        return 'Disponível';
      case 'OCCUPIED':
        return 'Ocupada';
      case 'RESERVED':
        return 'Reservada';
      case 'WAITING_FOOD':
        return 'Aguardando Pedido';
      case 'FINISHED':
        return 'Finalizada';
      default:
        return status;
    }
  };
  
  const handleChangeStatus = (tableId: string, newStatus: TableStatus) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === tableId ? { ...table, status: newStatus } : table
      )
    );
  };
  
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Gerenciamento de Mesas</h2>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tables.map((table) => (
            <div key={table.id} className="border rounded-lg overflow-hidden">
              <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">Mesa {table.number}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClassName(table.status)}`}>
                    {getStatusText(table.status)}
                  </span>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Capacidade: {table.capacity} pessoas
                </div>
              </div>
              
              <div className="p-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Alterar status:
                </label>
                <select
                  value={table.status}
                  onChange={(e) => handleChangeStatus(table.id, e.target.value as TableStatus)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="AVAILABLE">Disponível</option>
                  <option value="OCCUPIED">Ocupada</option>
                  <option value="RESERVED">Reservada</option>
                  <option value="WAITING_FOOD">Aguardando Pedido</option>
                  <option value="FINISHED">Finalizada</option>
                </select>
                
                {table.currentOrderId && (
                  <div className="mt-3 text-sm">
                    <div className="font-medium">Pedido atual:</div>
                    <div className="text-blue-600">#{table.currentOrderId.split('-')[1]}</div>
                  </div>
                )}
              </div>
              
              <div className="p-4 bg-gray-50 border-t">
                <div className="flex justify-between">
                  <button
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    onClick={() => {
                      // In a real app, this would open a modal to create a new order
                      alert(`Criar pedido para mesa ${table.number}`);
                    }}
                  >
                    Criar Pedido
                  </button>
                  <button
                    className={`text-sm font-medium ${
                      table.status === 'FINISHED'
                        ? 'text-green-600 hover:text-green-800'
                        : 'text-gray-400 cursor-not-allowed'
                    }`}
                    disabled={table.status !== 'FINISHED'}
                    onClick={() => {
                      if (table.status === 'FINISHED') {
                        handleChangeStatus(table.id, 'AVAILABLE');
                      }
                    }}
                  >
                    Liberar Mesa
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
